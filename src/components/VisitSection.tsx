import React, { useState } from "react";
import { Compass, Plane, FileText, CheckCircle2, AlertCircle, MapPin, Sparkles, Sun, Snowflake, Leaf } from "lucide-react";
import { Language } from "../types";
import { translations } from "../data/translations";
import { AffiliateLink } from "./AffiliateLink";

interface VisitSectionProps {
  currentLang: Language;
  onAskAboutTravel?: (query: string) => void;
}

export const VisitSection: React.FC<VisitSectionProps> = ({ currentLang, onAskAboutTravel }) => {
  const t = translations[currentLang].visit;
  const [activeTab, setActiveTab] = useState<"destinations" | "eta" | "tips">("destinations");

  return (
    <section id="visit" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-sm font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            {t.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-emerald-800 font-medium mt-1">
            {t.tagline}
          </p>
          <p className="text-base sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t.overview}
          </p>
        </div>

        {/* Navigation Tabs for Visit Section */}
        <div className="flex overflow-x-auto hide-scrollbar flex-nowrap border-b border-slate-200 gap-4 sm:gap-8 mb-8 pb-1">
          <button
            onClick={() => setActiveTab("destinations")}
            className={`flex items-center gap-2 pb-3 text-base font-semibold border-b-2 transition-all whitespace-nowrap shrink-0 ${
              activeTab === "destinations"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
            }`}
          >
            <MapPin className="w-4 h-4" />
            {currentLang === "en" ? "Iconic Destinations & Regions" : "Destinations et Régions Phares"}
          </button>
          <button
            onClick={() => setActiveTab("eta")}
            className={`flex items-center gap-2 pb-3 text-base font-semibold border-b-2 transition-all whitespace-nowrap shrink-0 ${
              activeTab === "eta"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
            }`}
          >
            <FileText className="w-4 h-4" />
            {currentLang === "en" ? "eTA Entry Guide for EU Citizens" : "Guide AVE pour Citoyens de l'UE"}
          </button>
          <button
            onClick={() => setActiveTab("tips")}
            className={`flex items-center gap-2 pb-3 text-base font-semibold border-b-2 transition-all whitespace-nowrap shrink-0 ${
              activeTab === "tips"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
            }`}
          >
            <Plane className="w-4 h-4" />
            {currentLang === "en" ? "Flight Corridors & Practical Tips" : "Liaisons Aériennes & Conseils"}
          </button>
        </div>

        {/* Tab 1: Iconic Destinations */}
        {activeTab === "destinations" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.destinations.map((dest, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200/90 p-6 hover:-translate-y-0.5 hover:shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200">
                      {dest.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mt-2">
                    {dest.region}
                  </h3>
                  <p className="text-sm font-semibold text-emerald-700 mt-0.5">
                    {dest.places}
                  </p>
                  <p className="text-base text-slate-600 mt-3 leading-relaxed">
                    {dest.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => onAskAboutTravel?.(`${currentLang === "fr" ? "Parle-moi de la visite dans la région : " : "Tell me about traveling to "} ${dest.region}`)}
                    className="text-sm font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{currentLang === "en" ? "Ask Assistant" : "Poser une question"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: eTA Entry Guide */}
        {activeTab === "eta" && (
          <div className="bg-gradient-to-br from-emerald-50/70 to-slate-50 rounded-2xl border border-emerald-200/80 p-6 sm:p-8 shadow-xs">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-emerald-800 font-medium text-lg mb-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <h3>{t.etaBox.title}</h3>
              </div>
              <p className="text-base text-slate-700 leading-relaxed">
                {t.etaBox.summary}
              </p>
            </div>

            {/* 4 Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {t.etaBox.steps.map((stepItem, sIdx) => (
                <div key={sIdx} className="bg-white rounded-xl p-4 border border-emerald-100 shadow-2xs">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-medium text-sm flex items-center justify-center mb-2">
                    {stepItem.step}
                  </div>
                  <h4 className="text-base font-medium text-slate-900">
                    {stepItem.title}
                  </h4>
                  <p className="text-sm text-slate-600 mt-1">
                    {stepItem.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Important Warning Notice */}
            <div className="mt-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm sm:text-base text-amber-900">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>{currentLang === "en" ? "Important Official Requirement: " : "Remarque officielle essentielle : "}</strong>
                {t.etaBox.warning}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-sm sm:text-base font-semibold transition-all shadow-xs"
              >
                <span>{currentLang === "en" ? "Official Government eTA Portal" : "Portail Officiel AVE du Canada"}</span>
                <Compass className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => onAskAboutTravel?.(currentLang === "fr" ? "Quelles sont les formalités de l'AVE pour un citoyen français ou européen ?" : "What are the exact eTA requirements for an EU citizen traveling to Canada?")}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-sm sm:text-base font-semibold transition-all shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{currentLang === "en" ? "Ask Assistant about eTA" : "Interroger l'assistant sur l'AVE"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Flight Corridors & Practical Tips */}
        {activeTab === "tips" && (
          <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.tips.map((tip, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
                    {idx === 0 ? <Plane className="w-5 h-5" /> : idx === 1 ? <CheckCircle2 className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  </div>
                  <h3 className="text-base font-medium text-slate-900">
                    {tip.title}
                  </h3>
                  <p className="text-base text-slate-600 mt-2 leading-relaxed">
                    {tip.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200">
                  <button
                    onClick={() => onAskAboutTravel?.(tip.title)}
                    className="text-sm font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{currentLang === "en" ? "Ask Assistant" : "Poser une question"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 flex-1 w-full">
              <h4 className="font-medium text-emerald-900 mb-2">{currentLang === "en" ? "Travel Partners" : "Partenaires de voyage"}</h4>
              <p className="text-base text-emerald-800 mb-4">{currentLang === "en" ? "Ready to plan your trip? Compare flights and accommodation:" : "Prêt à planifier votre voyage ? Comparez les vols et l'hébergement :" }</p>
              <div className="flex flex-wrap gap-4">
                <AffiliateLink url="https://www.booking.com/" partnerName="Booking.com" buttonText={currentLang === "en" ? "Check Hotel Prices" : "Voir les prix des hôtels"} />
                <AffiliateLink url="https://www.skyscanner.com/" partnerName="Skyscanner" buttonText={currentLang === "en" ? "Compare Flights" : "Comparer les vols"} />
              </div>
            </div>
          </div>
          </>
        )}

      </div>
    </section>
  );
};
