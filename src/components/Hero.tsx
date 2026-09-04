import React from "react";
import { Compass, TrendingUp, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { Language } from "../types";
import { translations } from "../data/translations";

interface HeroProps {
  currentLang: Language;
  onOpenChatWithTopic?: (topic: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onOpenChatWithTopic }) => {
  const t = translations[currentLang];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-800">
      {/* Subtle geometric background accents */}
      <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-red-600 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-amber-500 blur-3xl opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bilateral Tag Badge */}
        <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs sm:text-sm font-medium text-slate-300 mb-6 backdrop-blur-sm shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{t.hero.badge}</span>
          <span className="text-slate-500">|</span>
          <span className="text-amber-300 flex items-center gap-1 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            CETA & SPA Active
          </span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {t.hero.title}
          </h1>
          <p className="mt-5 text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl">
            {t.hero.subtitle}
          </p>
        </div>

        {/* Main CTA Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
          <button
            onClick={() => scrollToSection("visit")}
            className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <Compass className="w-4 h-4" />
            {t.hero.ctaVisit}
          </button>

          <button
            onClick={() => scrollToSection("invest")}
            className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <TrendingUp className="w-4 h-4" />
            {t.hero.ctaInvest}
          </button>

          <button
            onClick={() => onOpenChatWithTopic?.(currentLang === "fr" ? "Comment se déroule le partenariat entre le Canada et l'UE ?" : "How does the partnership between Canada and the EU work?")}
            className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 transition-all shadow-sm active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            {t.hero.ctaChat}
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Bilateral Stats Bento Row */}
        <div className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {t.hero.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 sm:p-5 backdrop-blur-sm hover:border-slate-600 transition-all"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {stat.value}
              </span>
              <h2 className="text-sm font-semibold text-blue-300 mt-1">
                {stat.label}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
