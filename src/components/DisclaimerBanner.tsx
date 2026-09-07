import React, { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Language } from "../types";
import { translations } from "../data/translations";

interface DisclaimerBannerProps {
  currentLang: Language;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps & { variant?: "light" | "dark" }> = ({ currentLang, variant = "light" }) => {
  const [isVisible, setIsVisible] = useState(false);
  // @ts-ignore
  const t = translations[currentLang].disclaimer;

  useEffect(() => {
    const isDismissed = sessionStorage.getItem("canada_eu_bridge_disclaimer_dismissed");
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("canada_eu_bridge_disclaimer_dismissed", "true");
  };

  if (!isVisible) return null;

  const containerStyles = variant === "light" 
    ? "bg-amber-100/90 backdrop-blur-sm border-b border-amber-200 text-amber-900 px-4 py-3 relative z-30 shadow-sm" 
    : "bg-slate-900 border-t border-slate-800 text-slate-300 px-4 py-3 relative z-30";
  const iconStyles = variant === "light" ? "text-amber-600" : "text-amber-500";
  const btnStyles = variant === "light" 
    ? "hover:bg-amber-200/50 text-amber-700 hover:text-amber-900" 
    : "hover:bg-slate-800 text-slate-400 hover:text-white";

  return (
    <div className={containerStyles}>
      <div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0 text-xs sm:text-sm">
          <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 sm:mt-0 ${iconStyles}`} />
          <p className="leading-relaxed flex-1">
            <strong className="font-semibold mr-1">
              {currentLang === "en" ? "Unofficial Project:" : "Projet Non Officiel :"}
            </strong>
            {t.text}
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className={`p-1.5 rounded-lg transition-colors shrink-0 ${btnStyles}`}
          aria-label={t.dismiss}
          title={t.dismiss}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
