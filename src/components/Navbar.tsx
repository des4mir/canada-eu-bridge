import React, { useState } from "react";
import { Globe, MessageSquare, Menu, X, Compass, TrendingUp, Handshake, Newspaper } from "lucide-react";
import { Language } from "../types";
import { translations } from "../data/translations";

interface NavbarProps {
  currentLang: Language;
  onToggleLang: () => void;
  onOpenChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLang, onToggleLang, onOpenChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">
        
        {/* Brand Logo */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2 xl:gap-3 group focus:outline-none shrink-0"
          aria-label="Canada-EU Bridge Home"
        >
          <div className="relative flex items-center justify-center w-10 h-10 xl:w-11 xl:h-11 rounded-xl bg-gradient-to-br from-blue-700 via-indigo-900 to-red-600 p-0.5 shadow-sm ring-1 ring-white/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden">
              <span className="text-amber-400 font-bold text-sm xl:text-sm tracking-tighter">EU</span>
              <span className="text-slate-500 font-bold text-sm xl:text-sm mx-0.5">·</span>
              <span className="text-red-500 font-bold text-sm xl:text-sm tracking-tighter">CA</span>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5 xl:gap-2">
              <span className="font-bold text-base xl:text-lg tracking-tight text-white group-hover:text-blue-300 transition-colors whitespace-nowrap">
                {currentLang === "en" ? "Canada-EU Bridge" : "Pont Canada-UE"}
              </span>
              <span className="text-sm xl:text-sm font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30 whitespace-nowrap hidden md:inline-block">
                CETA · SPA
              </span>
            </div>
            <p className="text-sm xl:text-sm text-slate-400 font-medium hidden md:block whitespace-nowrap">
              {currentLang === "en" ? "Bilateral Gateway & Assistant" : "Passerelle & Assistant Bilatéral"}
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 xl:gap-2 min-w-0">
          <button
            onClick={() => scrollToSection("visit")}
            className="flex items-center gap-1.5 px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all whitespace-nowrap"
          >
            <Compass className="w-4 h-4 text-emerald-400 shrink-0" />
            {t.nav.visit}
          </button>
          <button
            onClick={() => scrollToSection("invest")}
            className="flex items-center gap-1.5 px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all whitespace-nowrap"
          >
            <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
            {t.nav.invest}
          </button>
          <button
            onClick={() => scrollToSection("partnership")}
            className="flex items-center gap-1.5 px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all whitespace-nowrap"
          >
            <Handshake className="w-4 h-4 text-blue-400 shrink-0" />
            {t.nav.partnership}
          </button>
          <button
            onClick={() => scrollToSection("news")}
            className="flex items-center gap-1.5 px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all whitespace-nowrap"
          >
            <Newspaper className="w-4 h-4 text-purple-400 shrink-0" />
            {t.nav.news}
          </button>
        </nav>

        {/* Action Controls: Language Toggle + Assistant Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-3 shrink-0">
          
          {/* Language Switcher Button */}
          <button
            id="language-switcher-btn"
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 text-sm xl:text-base font-semibold rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none whitespace-nowrap"
            title={currentLang === "en" ? "Passer en Français" : "Switch to English"}
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-blue-400 shrink-0" />
            <span className={currentLang === "en" ? "text-amber-400 font-bold" : "text-slate-400"}>EN</span>
            <span className="text-slate-600">/</span>
            <span className={currentLang === "fr" ? "text-amber-400 font-bold" : "text-slate-400"}>FR</span>
          </button>

          {/* Chat Assistant Trigger */}
          <button
            id="header-chat-btn"
            onClick={onOpenChat}
            className="flex items-center gap-1.5 xl:gap-2 px-3 xl:px-3.5 py-1.5 text-sm xl:text-base font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-sm hover:shadow transition-all focus:ring-2 focus:ring-indigo-400 focus:outline-none whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-white shrink-0" />
            <span className="hidden sm:inline">{t.nav.chat}</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          <button
            onClick={() => scrollToSection("visit")}
            className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            <Compass className="w-5 h-5 text-emerald-400" />
            {t.nav.visit}
          </button>
          <button
            onClick={() => scrollToSection("invest")}
            className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            <TrendingUp className="w-5 h-5 text-amber-400" />
            {t.nav.invest}
          </button>
          <button
            onClick={() => scrollToSection("partnership")}
            className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            <Handshake className="w-5 h-5 text-blue-400" />
            {t.nav.partnership}
          </button>
          <button
            onClick={() => scrollToSection("news")}
            className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            <Newspaper className="w-5 h-5 text-purple-400" />
            {t.nav.news}
          </button>
        </div>
      )}
    </header>
  );
};
