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

  const containerStyles = "bg-amber-100/95 backdrop-blur-sm border border-amber-300 text-amber-950 px-4 sm:px-5 py-3 sm:py-4 rounded-xl shadow-sm mb-8 w-full max-w-4xl";
  const iconStyles = "text-amber-700";
  const btnStyles = "hover:bg-amber-200 text-amber-800 hover:text-amber-950";

  return (
    <div className={containerStyles}>
      <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0 text-base font-medium">
          <AlertTriangle className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5 sm:mt-0 ${iconStyles}`} strokeWidth={2.5} />
          <p className="leading-relaxed flex-1">
            <strong className="font-bold uppercase tracking-wide mr-1.5">
              {currentLang === "en" ? "Unofficial Project:" : "Projet Non Officiel :"}
            </strong>
            {t.text}
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className={`p-1.5 sm:p-2 rounded-lg transition-colors shrink-0 ${btnStyles}`}
          aria-label={t.dismiss}
          title={t.dismiss}
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
