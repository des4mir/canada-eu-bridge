import React from "react";
import { ExternalLink, ShieldCheck, Globe } from "lucide-react";
import { Language } from "../types";
import { translations } from "../data/translations";

interface FooterProps {
  currentLang: Language;
  onToggleLang: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onToggleLang }) => {
  const t = translations[currentLang].footer;
  const navT = translations[currentLang].nav;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Transatlantic Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-700/40 border border-blue-500/30 text-amber-400 font-bold text-xs">
                EU·CA
              </div>
              <span className="font-bold text-lg text-white">
                {currentLang === "en" ? "Canada-EU Bridge" : "Pont Canada-UE"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              {t.brandDesc}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 min-w-0">
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

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              {t.sections}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => scrollTo("visit")}
                  className="hover:text-white transition-colors"
                >
                  {navT.visit}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("invest")}
                  className="hover:text-white transition-colors"
                >
                  {navT.invest}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("partnership")}
                  className="hover:text-white transition-colors"
                >
                  {navT.partnership}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("news")}
                  className="hover:text-white transition-colors"
                >
                  {navT.news}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Resource Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              {t.links}
            </h4>
            <ul className="space-y-2 text-xs">
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
            </ul>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{t.legal}</p>
          <p>© {new Date().getFullYear()} Canada-EU Bridge | Pont Canada-UE.</p>
        </div>
      </div>
    </footer>
  );
};
