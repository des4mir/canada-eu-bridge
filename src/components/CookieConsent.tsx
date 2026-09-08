import React, { useState, useEffect } from 'react';

export const CookieConsent: React.FC<{ currentLang: string }> = ({ currentLang }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check initial status
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    } else if (consent === 'accepted') {
      injectScripts();
    }

    // Listen for custom event to reopen settings
    const handleOpenSettings = () => setIsVisible(true);
    window.addEventListener('open-cookie-settings', handleOpenSettings);
    
    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
  }, []);

  const injectScripts = () => {
    // Avoid double injection
    if (document.getElementById('ga-script')) return;

    // Inject GA
    const gaScript = document.createElement('script');
    gaScript.id = 'ga-script';
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-VML1GJG75Z';
    document.head.appendChild(gaScript);

    const gaInit = document.createElement('script');
    gaInit.id = 'ga-init';
    gaInit.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-VML1GJG75Z');
    `;
    document.head.appendChild(gaInit);

    // Inject AdSense (global tag) if needed
    // In a real AdSense implementation, you would dynamically inject the AdSense script here:
    // const adsenseScript = document.createElement('script');
    // adsenseScript.async = true;
    // adsenseScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX";
    // adsenseScript.crossOrigin = "anonymous";
    // document.head.appendChild(adsenseScript);
  };

  const removeScripts = () => {
    const ga1 = document.getElementById('ga-script');
    const ga2 = document.getElementById('ga-init');
    if (ga1) ga1.remove();
    if (ga2) ga2.remove();
    // A full page reload is often the cleanest way to clear GA tracking state, 
    // but simple removal works for the DOM. 
  };

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    localStorage.setItem('cookie_consent_timestamp', Date.now().toString());
    injectScripts();
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    localStorage.setItem('cookie_consent_timestamp', Date.now().toString());
    removeScripts();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-slate-200 p-4 sm:p-6 z-50 shadow-2xl border-t border-slate-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-base flex-1">
          <p className="font-semibold text-white mb-2 text-lg">
             {currentLang === 'en' ? "Cookie & Privacy Consent" : "Consentement aux cookies et à la confidentialité"}
          </p>
          <p className="text-slate-400 text-base leading-relaxed">
            {currentLang === 'en' 
              ? "We use cookies to personalize content, serve targeted advertisements (via Google AdSense), and analyze our traffic. By clicking 'Accept All', you consent to our use of cookies in accordance with our Privacy Policy." 
              : "Nous utilisons des cookies pour personnaliser le contenu, diffuser des publicités ciblées (via Google AdSense) et analyser notre trafic. En cliquant sur 'Tout Accepter', vous consentez à notre utilisation des cookies conformément à notre politique de confidentialité."}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
          <button 
            onClick={handleReject} 
            className="whitespace-nowrap bg-transparent border border-slate-600 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-colors w-full sm:w-auto text-base"
          >
            {currentLang === 'en' ? "Reject Non-Essential" : "Refuser non essentiel"}
          </button>
          <button 
            onClick={handleAccept} 
            className="whitespace-nowrap bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium transition-colors w-full sm:w-auto text-base"
          >
            {currentLang === 'en' ? "Accept All" : "Tout Accepter"}
          </button>
        </div>
      </div>
    </div>
  );
};
