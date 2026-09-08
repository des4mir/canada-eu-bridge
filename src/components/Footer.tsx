import React, { useState } from "react";
import { ExternalLink, ShieldCheck, Globe } from "lucide-react";
import { Language } from "../types";
import { translations } from "../data/translations";
import { DisclaimerBanner } from "./DisclaimerBanner";
import { AdSlot } from "./AdSlot";
import { PrivacyPolicy } from "./PrivacyPolicy";

interface FooterProps {
  currentLang: Language;
  onToggleLang: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onToggleLang }) => {
  const t = translations[currentLang].footer;
  const navT = translations[currentLang].nav;
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-base border-t border-slate-800 relative z-10">
      <DisclaimerBanner currentLang={currentLang} variant="dark" />
      
      {/* Footer Ad Slot */}
      <div className="border-b border-slate-900 bg-slate-900/30">
        <AdSlot format="leaderboard" className="hidden md:flex !my-4" />
        <AdSlot format="banner" className="flex md:hidden !my-4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="" className="w-8 h-8 object-contain" />
              <span className="font-bold text-lg text-white">
                {currentLang === "en" ? "Canada-EU Bridge" : "Pont Canada-UE"}
              </span>
            </div>
            
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-md">
              {t.brandDesc}
            </p>
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300 min-w-0">
              <span className="flex flex-wrap items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                CETA & SPA Information Compliant
              </span>
              <button
                onClick={onToggleLang}
                className="hover:text-white underline underline-offset-2 flex items-center gap-1 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                {currentLang === "en" ? "Version Française" : "English Version"}
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-3">
              {t.sections}
            </h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <button onClick={() => scrollTo("visit")} className="hover:text-white transition-colors">
                  {navT.visit}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("invest")} className="hover:text-white transition-colors">
                  {navT.invest}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("partnership")} className="hover:text-white transition-colors">
                  {navT.partnership}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("news")} className="hover:text-white transition-colors">
                  {navT.news}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-3">
              {t.links}
            </h4>
            <ul className="space-y-2 text-sm">
              {t.linksList.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-wrap items-center justify-center gap-1.5 hover:text-white transition-colors group"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button 
                  onClick={() => setIsPrivacyOpen(true)}
                  className="inline-flex flex-wrap items-center justify-center gap-1.5 text-slate-300 hover:text-white transition-colors group underline underline-offset-2"
                >
                  {currentLang === 'en' ? "Privacy Policy & Disclosures" : "Confidentialité et Divulgations"}
                </button>
              </li>
              <li className="pt-2">
                <button 
                  onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
                  className="inline-flex flex-wrap items-center justify-center gap-1.5 text-slate-300 hover:text-white transition-colors group underline underline-offset-2"
                >
                  {currentLang === 'en' ? "Cookie Settings" : "Paramètres des cookies"}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p className="max-w-3xl text-center md:text-left">{t.legal}</p>
          <p className="whitespace-nowrap">© {new Date().getFullYear()} Canada-EU Bridge | Pont Canada-UE.</p>
        </div>
      </div>
      
      <PrivacyPolicy 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
        currentLang={currentLang} 
      />
    </footer>
  );
};
