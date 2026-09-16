import React from "react";
import { Compass, TrendingUp, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { Language } from "../types";
import { DisclaimerBanner } from "./DisclaimerBanner";
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
    <section className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-20 lg:pt-24 lg:pb-32 border-b border-slate-900">
      {/* Subtle geometric background accents */}
      

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <DisclaimerBanner currentLang={currentLang} />

        {/* Bilateral Tag Badge */}
        <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-sm sm:text-base font-medium text-slate-300 mb-6 backdrop-blur-sm shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{t.hero.badge}</span>
          <span className="text-slate-500">|</span>
          <span className="text-amber-300 flex items-center gap-1 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            {currentLang === "en" ? "CETA & SPA — Informational Overview" : "AECG et PSA — Aperçu informatif"}
          </span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {t.hero.title}
          </h1>
          <p className="mt-5 text-base sm:text-xl text-slate-300 font-medium leading-relaxed max-w-3xl">
            {t.hero.subtitle}
          </p>
        </div>

        {/* Main CTA Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <button
            onClick={() => scrollToSection("visit")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <Compass className="w-4 h-4" />
            {t.hero.ctaVisit}
          </button>

          <button
            onClick={() => scrollToSection("invest")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <TrendingUp className="w-4 h-4" />
            {t.hero.ctaInvest}
          </button>

          <button
            onClick={() => onOpenChatWithTopic?.(currentLang === "fr" ? "Comment se déroule le partenariat entre le Canada et l'UE ?" : "How does the partnership between Canada and the EU work?")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-base transition-all shadow-sm active:scale-95 text-center leading-snug"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            {t.hero.ctaChat}
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Bilateral Stats Bento Row */}
        <div className="mt-16 lg:mt-24 grid grid-cols-2 md:grid-cols-4 border-t border-slate-800/60 pt-8 gap-y-8">
          {t.hero.stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-start ${idx !== 0 && idx !== 2 ? 'md:pl-8 md:border-l border-slate-800/60' : ''} ${idx % 2 !== 0 ? 'pl-6 border-l border-slate-800/60 md:border-l-0 md:pl-0' : ''}`}
            >
              <span className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-light text-white tracking-tight font-serif mb-3 leading-none md:leading-tight">
                {stat.value}
              </span>
              <div>
                <h2 className="text-xs sm:text-sm font-semibold text-slate-200 uppercase tracking-widest mb-1">
                  {stat.label}
                </h2>
                <p className="text-sm text-slate-400">
                  {stat.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
