import express, { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { translations } from "./src/data/translations";
import { STATIC_NEWS_ITEMS } from "./src/data/news";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "1mb" }));

// Server-side Gemini client (lazy initialized)
let geminiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY is not configured in server environment.",
      );
    }
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

const SYSTEM_INSTRUCTION = `You are the AI assistant for the Canada-EU Bridge platform.

YOUR SCOPE IS STRICTLY CONFINED TO THREE TOPICS:
1. Visit Canada
2. Invest in Canada (CETA, etc.)
3. Canada-EU Partnership

CRITICAL INSTRUCTION - STRICT GROUNDING:
You MUST base your answers STRICTLY and EXCLUSIVELY on the actual site content provided below in the "SITE DATA CONTEXT". 
DO NOT invent details, hallucinate information, or pull from your general knowledge base outside of the context provided, especially for time-sensitive news, trade information, or statistics.
If a user asks about something that is not explicitly covered in the "SITE DATA CONTEXT", you MUST explicitly state that the information is not available in the current portal data, and decline to answer.

SITE DATA CONTEXT (English):
${JSON.stringify(translations.en, null, 2)}

SITE DATA CONTEXT (French):
${JSON.stringify(translations.fr, null, 2)}

SITE NEWS HIGHLIGHTS:
${JSON.stringify(STATIC_NEWS_ITEMS, null, 2)}

LANGUAGE INSTRUCTION:
- Respond in the language used by the user or as indicated by the active site language (English or French).
- Maintain a diplomatic, articulate, helpful, and welcoming tone.
- Format responses cleanly using markdown (concise paragraphs, bullet points for lists, and bold headings where suitable).`;

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "Canada-EU Bridge API",
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Proxy Chat Endpoint
const chatLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 30, // Limit each IP to 30 chat requests per window (to control Gemini API costs)
  message: {
    error: {
      message:
        "Too many requests from this IP. Please try again after an hour.",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.post("/api/chat", chatLimiter, async (req: Request, res: Response) => {
  try {
    const { messages, userMessage, language } = req.body;

    if (!userMessage && (!messages || messages.length === 0)) {
      return res.status(400).json({
        error: { message: "No message was provided in the request body." },
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      const isFr = language === "fr";
      return res.status(503).json({
        error: {
          code: "MISSING_API_KEY",
          message: isFr
            ? "La clé API Gemini n'est pas encore configurée sur le serveur. Veuillez l'ajouter dans Paramètres > Secrets."
            : "The Gemini API key is not yet configured on the server. Please attach it in Settings > Secrets.",
        },
      });
    }

    const ai = getGeminiClient();

    // Prepare contents formatted for gemini-3.6-flash
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> =
      [];

    if (Array.isArray(messages)) {
      // Add previous chat turns
      for (const msg of messages) {
        const role =
          msg.role === "assistant" || msg.role === "model" ? "model" : "user";
        const text = msg.content || msg.text || "";
        if (text.trim()) {
          contents.push({
            role,
            parts: [{ text }],
          });
        }
      }
    }

    // Append current user message if not already included in messages array
    if (userMessage) {
      const lastContent = contents[contents.length - 1];
      if (
        !lastContent ||
        lastContent.role !== "user" ||
        lastContent.parts[0]?.text !== userMessage
      ) {
        contents.push({
          role: "user",
          parts: [{ text: userMessage }],
        });
      }
    }

    const langDirective =
      language === "fr"
        ? "\nNote: User's UI language is currently set to French. Please respond in French unless they explicitly asked in English."
        : "\nNote: User's UI language is currently set to English. Please respond in English unless they explicitly asked in French.";

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL_NAME || "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + langDirective,
        temperature: 0.6,
      },
    });

    const reply =
      response.text ||
      (language === "fr"
        ? "Désolé, aucune réponse n'a été générée."
        : "I'm sorry, no response could be generated.");

    return res.json({ reply });
  } catch (error: any) {
    console.error("Backend Gemini Proxy Error:", error);
    const errorMessage =
      error?.message ||
      "Internal server error occurred while communicating with Gemini.";
    return res.status(500).json({
      error: {
        message: errorMessage,
      },
    });
  }
});

// Simple in-memory cache for news to avoid hitting API limits
interface NewsCache {
  en: { timestamp: number; data: any; } | null;
  fr: { timestamp: number; data: any; } | null;
}
let newsCache: NewsCache = { en: null, fr: null };
const NEWS_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// News API Proxy Endpoint
app.get("/api/news", async (req: Request, res: Response) => {
  try {
    const lang = (req.query.lang as string) === 'fr' ? 'fr' : 'en';
    const cacheEntry = newsCache[lang];

    if (cacheEntry && Date.now() - cacheEntry.timestamp < NEWS_CACHE_DURATION) {
      return res.json({ articles: cacheEntry.data });
    }

    const getFallbackArticles = () => STATIC_NEWS_ITEMS.map(item => ({
      title: lang === 'fr' ? item.titleFr : item.titleEn,
      description: lang === 'fr' ? item.summaryFr : item.summaryEn,
      publishedAt: new Date().toISOString(),
      source: { name: item.source },
      url: "#"
    }));

    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      return res.json({ articles: getFallbackArticles() });
    }

    // French query uses "Canada" and French terms like "UE", "Union Européenne", "AECG", "commerce", "investissement", "tourisme"
    const searchQuery = lang === 'fr' 
      ? encodeURIComponent('"Canada" AND ("AECG" OR "Union Européenne" OR "UE" OR "Europe") AND ("commerce" OR "investissement" OR "tourisme" OR "partenariat")')
      : encodeURIComponent('"Canada" AND ("CETA" OR "European Union" OR "EU" OR "Europe") AND ("trade" OR "investment" OR "tourism" OR "partnership")');
      
    const url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=${lang}&max=4&apikey=${apiKey}`;

    const response = await fetch(url);
    let data;
    try {
      data = await response.json();
    } catch (e) {
      console.warn("Failed to parse JSON from GNews API, falling back to static news");
      return res.json({ articles: getFallbackArticles() });
    }

    if (data && data.articles && Array.isArray(data.articles)) {
      newsCache[lang] = {
        timestamp: Date.now(),
        data: data.articles,
      };
      return res.json({ articles: data.articles });
    } else {
      console.warn("GNews API warning/error (falling back to static):", data);
      return res.json({ articles: getFallbackArticles() });
    }
  } catch (error: any) {
    console.error("Backend News API Proxy Error:", error);
    // Final safety fallback
    const lang = (req.query.lang as string) === 'fr' ? 'fr' : 'en';
    const fallbackArticles = STATIC_NEWS_ITEMS.map(item => ({
      title: lang === 'fr' ? item.titleFr : item.titleEn,
      description: lang === 'fr' ? item.summaryFr : item.summaryEn,
      publishedAt: new Date().toISOString(),
      source: { name: item.source },
      url: "#"
    }));
    return res.json({ articles: fallbackArticles });
  }
});

// Vite Integration & Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Canada-EU Bridge server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
