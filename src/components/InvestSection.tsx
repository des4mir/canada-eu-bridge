import React, { useState } from "react";
import { TrendingUp, ShieldCheck, Zap, Cpu, BatteryCharging, Dna, Briefcase, Award, Sparkles, Building2 } from "lucide-react";
import { Language } from "../types";
import { translations } from "../data/translations";

interface InvestSectionProps {
  currentLang: Language;
  onAskAboutInvest?: (query: string) => void;
}

export const InvestSection: React.FC<InvestSectionProps> = ({ currentLang, onAskAboutInvest }) => {
  const t = translations[currentLang].invest;
  const [activeTab, setActiveTab] = useState<"sectors" | "ceta" | "advantages">("sectors");

  const sectorIcons = [
    <Zap className="w-5 h-5 text-amber-500" />,
    <Cpu className="w-5 h-5 text-blue-500" />,
    <BatteryCharging className="w-5 h-5 text-emerald-500" />,
    <Dna className="w-5 h-5 text-rose-500" />,
  ];

  return (
    <section id="invest" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            {t.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-blue-800 font-medium mt-1">
            {t.tagline}
          </p>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t.overview}
          </p>
        </div>

        {/* Sub-navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-4 sm:gap-8 mb-8 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab("sectors")}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeTab === "sectors"
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
            }`}
          >
            <Building2 className="w-4 h-4" />
            {currentLang === "en" ? "Strategic Investment Sectors" : "Secteurs d'Investissement Stratégiques"}
          </button>
          <button
            onClick={() => setActiveTab("ceta")}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeTab === "ceta"
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            {currentLang === "en" ? "CETA Protections & Trade Privileges" : "Avantages et Garanties de l'AECG"}
          </button>
          <button
            onClick={() => setActiveTab("advantages")}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeTab === "advantages"
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
            }`}
          >
            <Award className="w-4 h-4" />
            {currentLang === "en" ? "G7 Advantages & Incentives" : "Avantages Comparatifs du G7 & Aides"}
          </button>
        </div>

        {/* Tab 1: Strategic Sectors */}
        {activeTab === "sectors" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.sectors.map((sec, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      {sectorIcons[idx % sectorIcons.length]}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-100">
                      {sec.stats}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    {sec.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {sec.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    {currentLang === "en" ? "CETA-aligned priority sector" : "Secteur prioritaire sous l'AECG"}
                  </span>
                  <button
                    onClick={() => onAskAboutInvest?.(`${currentLang === "fr" ? "Quelles sont les opportunités d'investissement dans : " : "What are the investment opportunities in "} ${sec.title}?`)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{currentLang === "en" ? "Ask Assistant" : "Interroger l'assistant"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: CETA Protections & Trade Privileges */}
        {activeTab === "ceta" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {t.cetaBenefits.map((benefit, bIdx) => (
              <div
                key={bIdx}
                className="bg-white rounded-2xl border border-blue-200/80 p-6 shadow-xs hover:border-blue-400 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm mb-3">
                  0{bIdx + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {benefit.desc}
                </p>
                <button
                  onClick={() => onAskAboutInvest?.(benefit.title)}
                  className="mt-4 text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentLang === "en" ? "Learn more via Assistant" : "En savoir plus avec l'assistant"}</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: G7 Advantages & Incentives */}
        {activeTab === "advantages" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.advantages.map((adv, aIdx) => (
              <div
                key={aIdx}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 font-bold mb-4">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {adv.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {adv.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onAskAboutInvest?.(adv.title)}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{currentLang === "en" ? "Ask Assistant" : "Poser une question"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Federal Agency Partner Footer Box */}
        <div className="mt-10 bg-blue-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="text-lg font-bold">
              {currentLang === "en" ? "Ready to expand to Canada under CETA?" : "Prêt à vous implanter au Canada grâce à l'AECG ?"}
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 mt-1 max-w-xl">
              {currentLang === "en"
                ? "Access confidential, custom site-selection advisory, incentive structuring, and regulatory navigation from Invest in Canada."
                : "Bénéficiez de conseils personnalisés et confidentiels pour l'implantation, la fiscalité et les programmes incitatifs avec Investir au Canada."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="https://www.investcanada.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-sm"
            >
              {currentLang === "en" ? "Visit Invest in Canada" : "Consulter Investir au Canada"}
            </a>
            <button
              onClick={() => onAskAboutInvest?.(currentLang === "fr" ? "Quelles sont les démarches pour implanter une entreprise européenne au Canada ?" : "What are the exact steps for an EU company to establish operations in Canada?")}
              className="px-4 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all border border-blue-700"
            >
              {currentLang === "en" ? "Ask AI Assistant" : "Demander à l'assistant"}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
