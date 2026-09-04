import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

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
      throw new Error("GEMINI_API_KEY is not configured in server environment.");
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

const SYSTEM_INSTRUCTION = `You are the official bilingual (English and French) AI assistant for the 'Canada-EU Bridge' (Pont Canada-UE) informational platform.

YOUR SCOPE IS STRICTLY CONFINED TO THREE TOPICS:
1. Visit Canada:
   - Travel regulations for European citizens (e.g., eTA - Electronic Travel Authorization vs. visa exemptions).
   - Practical travel advice: seasonal climate, iconic regions (Rocky Mountains, Atlantic Maritimes, Quebec heritage, Pacific Northwest, Northern territories).
   - National parks, urban centers (Montreal, Toronto, Vancouver, Calgary, Ottawa, Halifax), cultural etiquettes, and transit.

2. Invest in Canada:
   - Economic stability, low corporate tax regimes, and G7 business environment.
   - Comprehensive Economic and Trade Agreement (CETA) advantages for European investors and preferential tariff access.
   - Key strategic industries: Clean Tech, Clean Hydrogen, Artificial Intelligence & Quantum, Aerospace, Critical Minerals, Agri-Food, and Life Sciences.
   - Federal and provincial investment programs, innovation superclusters, and skilled talent immigration streams (e.g., Global Skills Strategy).

3. Canada-EU Partnership:
   - The Strategic Partnership Agreement (SPA) and bilateral diplomatic relations.
   - Comprehensive Economic and Trade Agreement (CETA) bilateral growth and dispute settlement mechanisms.
   - Joint commitments: Transatlantic Green Alliance, raw materials partnership, Horizon Europe research association, climate leadership, democratic values, and global security cooperation.

STRICT GUARDRAIL DIRECTIVE:
If the user asks about ANY TOPIC outside of Visiting Canada, Investing in Canada, or the Canada-EU Partnership (such as general software programming, recipes, unrelated historical events, math homework, third-party countries not related to Canada-EU affairs, sports trivia, etc.), you MUST politely decline and firmly redirect the user back to the three official topics.

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
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { messages, userMessage, language } = req.body;

    if (!userMessage && (!messages || messages.length === 0)) {
      return res.status(400).json({ error: { message: "No message was provided in the request body." } });
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

    // Prepare contents formatted for gemini-3.8-flash
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(messages)) {
      // Add previous chat turns
      for (const msg of messages) {
        const role = msg.role === "assistant" || msg.role === "model" ? "model" : "user";
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
      if (!lastContent || lastContent.role !== "user" || lastContent.parts[0]?.text !== userMessage) {
        contents.push({
          role: "user",
          parts: [{ text: userMessage }],
        });
      }
    }

    const langDirective = language === "fr"
      ? "\nNote: User's UI language is currently set to French. Please respond in French unless they explicitly asked in English."
      : "\nNote: User's UI language is currently set to English. Please respond in English unless they explicitly asked in French.";

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + langDirective,
        temperature: 0.6,
      },
    });

    const reply = response.text || (language === "fr" ? "Désolé, aucune réponse n'a été générée." : "I'm sorry, no response could be generated.");

    return res.json({ reply });
  } catch (error: any) {
    console.error("Backend Gemini Proxy Error:", error);
    const errorMessage = error?.message || "Internal server error occurred while communicating with Gemini.";
    return res.status(500).json({
      error: {
        message: errorMessage,
      },
    });
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
