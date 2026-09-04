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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="Canada-EU Bridge Home"
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 via-indigo-900 to-red-600 p-0.5 shadow-sm ring-1 ring-white/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden">
              <span className="text-amber-400 font-bold text-xs tracking-tighter">EU</span>
              <span className="text-slate-500 font-bold text-xs mx-0.5">·</span>
              <span className="text-red-500 font-bold text-xs tracking-tighter">CA</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-blue-300 transition-colors">
                {currentLang === "en" ? "Canada-EU Bridge" : "Pont Canada-UE"}
              </span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                CETA · SPA
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              {currentLang === "en" ? "Bilateral Gateway & Assistant" : "Passerelle & Assistant Bilatéral"}
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            onClick={() => scrollToSection("visit")}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all"
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            {t.nav.visit}
          </button>
          <button
            onClick={() => scrollToSection("invest")}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all"
          >
            <TrendingUp className="w-4 h-4 text-amber-400" />
            {t.nav.invest}
          </button>
          <button
            onClick={() => scrollToSection("partnership")}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all"
          >
            <Handshake className="w-4 h-4 text-blue-400" />
            {t.nav.partnership}
          </button>
          <button
            onClick={() => scrollToSection("news")}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all"
          >
            <Newspaper className="w-4 h-4 text-purple-400" />
            {t.nav.news}
          </button>
        </nav>

        {/* Action Controls: Language Toggle + Assistant Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Switcher Button */}
          <button
            id="language-switcher-btn"
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
            title={currentLang === "en" ? "Passer en Français" : "Switch to English"}
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4 text-blue-400" />
            <span className={currentLang === "en" ? "text-amber-400 font-bold" : "text-slate-400"}>EN</span>
            <span className="text-slate-600">/</span>
            <span className={currentLang === "fr" ? "text-amber-400 font-bold" : "text-slate-400"}>FR</span>
          </button>

          {/* Chat Assistant Trigger */}
          <button
            id="header-chat-btn"
            onClick={onOpenChat}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-sm hover:shadow transition-all focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            <MessageSquare className="w-4 h-4 text-white" />
            <span className="hidden sm:inline">{t.nav.chat}</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          <button
            onClick={() => scrollToSection("visit")}
            className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            <Compass className="w-5 h-5 text-emerald-400" />
            {t.nav.visit}
          </button>
          <button
            onClick={() => scrollToSection("invest")}
            className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            <TrendingUp className="w-5 h-5 text-amber-400" />
            {t.nav.invest}
          </button>
          <button
            onClick={() => scrollToSection("partnership")}
            className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            <Handshake className="w-5 h-5 text-blue-400" />
            {t.nav.partnership}
          </button>
          <button
            onClick={() => scrollToSection("news")}
            className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            <Newspaper className="w-5 h-5 text-purple-400" />
            {t.nav.news}
          </button>
        </div>
      )}
    </header>
  );
};
