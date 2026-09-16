import React, { useState } from "react";
import { Handshake, Scale, Shield, Globe2, Sparkles, Clock, CheckCircle } from "lucide-react";
import { Language } from "../types";
import { translations } from "../data/translations";

interface PartnershipSectionProps {
  currentLang: Language;
  onAskAboutPartnership?: (query: string) => void;
}

export const PartnershipSection: React.FC<PartnershipSectionProps> = ({ currentLang, onAskAboutPartnership }) => {
  const t = translations[currentLang].partnership;
  const [activeTab, setActiveTab] = useState<"pillars" | "milestones">("pillars");

  return (
    <section id="partnership" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-800 text-sm font-semibold uppercase tracking-wider mb-3">
            <Handshake className="w-3.5 h-3.5" />
            {t.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-indigo-900 font-medium mt-1">
            {t.tagline}
          </p>
          <p className="text-base sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t.overview}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar flex-nowrap border-b border-slate-200 gap-4 sm:gap-8 mb-8 pb-1">
          <button
            onClick={() => setActiveTab("pillars")}
            className={`flex items-center gap-2 pb-3 text-base font-semibold border-b-2 transition-all whitespace-nowrap shrink-0 ${
              activeTab === "pillars"
                ? "border-indigo-600 text-indigo-700"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
            }`}
          >
            <Shield className="w-4 h-4" />
            {currentLang === "en" ? "Strategic Pillars & Joint Agreements" : "Piliers Stratégiques & Accords Conjoints"}
          </button>
          <button
            onClick={() => setActiveTab("milestones")}
            className={`flex items-center gap-2 pb-3 text-base font-semibold border-b-2 transition-all whitespace-nowrap shrink-0 ${
              activeTab === "milestones"
                ? "border-indigo-600 text-indigo-700"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
            }`}
          >
            <Clock className="w-4 h-4" />
            {currentLang === "en" ? "Historical Milestones Timeline" : "Chronologie des Jalons Historiques"}
          </button>
        </div>

        {/* Tab 1: Strategic Pillars */}
        {activeTab === "pillars" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.pillars.map((pillar, pIdx) => (
              <div
                key={pIdx}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7 hover:-translate-y-0.5 hover:shadow-sm hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
                      {pIdx === 0 ? <Scale className="w-5 h-5" /> : pIdx === 1 ? <Globe2 className="w-5 h-5" /> : pIdx === 2 ? <Sparkles className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-base text-slate-600 leading-relaxed mt-2">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-sm text-indigo-800 font-medium">
                    {currentLang === "en" ? "Bilateral Commitment" : "Engagement bilatéral"}
                  </span>
                  <button
                    onClick={() => onAskAboutPartnership?.(pillar.title)}
                    className="text-sm font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{currentLang === "en" ? "Ask Assistant" : "Interroger l'assistant"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Historical Milestones Timeline */}
        {activeTab === "milestones" && (
          <div className="relative border-l-2 border-indigo-200 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8 py-2">
            {t.milestones.map((milestone, mIdx) => (
              <div key={mIdx} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full bg-white border-4 border-indigo-600 group-hover:scale-125 transition-transform" />
                
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 hover:shadow-xs hover:border-indigo-300 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold px-3 py-1 rounded-full bg-indigo-600 text-white shadow-2xs">
                      {milestone.year}
                    </span>
                    <h3 className="text-base sm:text-lg font-medium text-slate-900">
                      {milestone.title}
                    </h3>
                  </div>
                  <p className="text-base text-slate-600 mt-2 leading-relaxed">
                    {milestone.desc}
                  </p>
                  <button
                    onClick={() => onAskAboutPartnership?.(`${currentLang === "fr" ? "Explique le jalon historique : " : "Explain the historical milestone: "} ${milestone.year} - ${milestone.title}`)}
                    className="mt-3 text-sm font-semibold text-indigo-700 hover:text-indigo-900 inline-flex items-center justify-center gap-1 transition-colors"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{currentLang === "en" ? "Explore details via Assistant" : "Explorer les détails avec l'assistant"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Shared Values Callout */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-indigo-800/40">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">
                {currentLang === "en" ? "Grounded in Democratic Values & International Law" : "Fondé sur les valeurs démocratiques et le droit international"}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 mt-1 leading-relaxed max-w-3xl">
                {currentLang === "en"
                  ? "Canada and the EU stand as premier multilateral partners defending sovereignty, human rights, fair trade, gender equality, and sustainable climate stewardship on the global stage."
                  : "Le Canada et l'UE se positionnent comme des partenaires multilatéraux majeurs défendant la souveraineté, les droits fondamentaux, le commerce équitable et la transition climatique responsable sur la scène internationale."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
