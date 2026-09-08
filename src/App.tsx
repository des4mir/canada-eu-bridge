import React, { useState, useEffect } from "react";
import { MessageSquare, Sparkles } from "lucide-react";
import { Language } from "./types";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { NewsSection } from "./components/NewsSection";
import { VisitSection } from "./components/VisitSection";
import { InvestSection } from "./components/InvestSection";
import { PartnershipSection } from "./components/PartnershipSection";
import { Footer } from "./components/Footer";
import { ChatAssistant } from "./components/ChatAssistant";
import { DisclaimerBanner } from "./components/DisclaimerBanner";
import { translations } from "./data/translations";
import { AdSlot } from "./components/AdSlot";
import { CookieConsent } from "./components/CookieConsent";

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem("canada_eu_bridge_lang");
    if (saved === "fr" || saved === "en") return saved;
    // Auto-detect browser French preference
    if (typeof navigator !== "undefined" && navigator.language && navigator.language.startsWith("fr")) {
      return "fr";
    }
    return "en";
  });

  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [initialChatQuery, setInitialChatQuery] = useState<string | undefined>(undefined);

  useEffect(() => {
    localStorage.setItem("canada_eu_bridge_lang", currentLang);
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const handleToggleLang = () => {
    setCurrentLang((prev) => (prev === "en" ? "fr" : "en"));
  };

  const handleOpenChatWithQuery = (query: string) => {
    setInitialChatQuery(query);
    setIsChatOpen(true);
  };

  const t = translations[currentLang];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        onOpenChat={() => setIsChatOpen(true)}
      />

      <DisclaimerBanner currentLang={currentLang} />

      <main className="flex-1">
        {/* Transatlantic Hero Banner */}
        <Hero
          currentLang={currentLang}
          onOpenChatWithTopic={handleOpenChatWithQuery}
        />

        {/* Section 1: Visit Canada */}
        <VisitSection
          currentLang={currentLang}
          onAskAboutTravel={handleOpenChatWithQuery}
        />

        <div className="bg-slate-50 border-b border-slate-200 py-4"><AdSlot format="leaderboard" className="hidden md:flex" /><AdSlot format="rectangle" className="flex md:hidden" /></div>
        {/* Section 2: Invest in Canada */}
        <InvestSection
          currentLang={currentLang}
          onAskAboutInvest={handleOpenChatWithQuery}
        />

        {/* Section 3: Canada-EU Partnership */}
        <PartnershipSection
          currentLang={currentLang}
          onAskAboutPartnership={handleOpenChatWithQuery}
        />

        {/* Static News Highlights Section */}
        <NewsSection
          currentLang={currentLang}
          onAskAboutNews={(title) =>
            handleOpenChatWithQuery(
              currentLang === "fr"
                ? `Explique-moi cette actualité récente : ${title}`
                : `Explain this recent news highlight: ${title}`
            )
          }
        />
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
      />

      {/* Floating Chat Assistant Trigger Button (when closed) */}
      {!isChatOpen && (
        <button
          id="floating-chat-trigger"
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white font-semibold text-base rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label={t.chat.open}
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-blue-900" />
          </div>
          <span>{t.chat.open}</span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </button>
      )}

      {/* Scoped Gemini Chat Assistant Window */}
      <ChatAssistant
        currentLang={currentLang}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        initialQuery={initialChatQuery}
        onClearInitialQuery={() => setInitialChatQuery(undefined)}
      />
      <CookieConsent currentLang={currentLang} />
    </div>
  );
}
