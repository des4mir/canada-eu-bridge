import React, { useLayoutEffect, useRef, useState } from "react";
import { Globe, MessageSquare, Menu, X, Compass, TrendingUp, Handshake, Newspaper } from "lucide-react";
import { Language } from "../types";
import { translations } from "../data/translations";

interface NavbarProps {
  currentLang: Language;
  onToggleLang: () => void;
  onOpenChat: () => void;
}

// Gap (px) reserved between logo / nav / actions groups when measuring available space.
const GROUP_GAP = 24;

export const Navbar: React.FC<NavbarProps> = ({ currentLang, onToggleLang, onOpenChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Whether the full horizontal nav fits; false collapses it into the hamburger menu.
  const [showFullNav, setShowFullNav] = useState(true);
  const t = translations[currentLang];

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const measureNavRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  // Measures the real widths of the logo, nav links and action controls (language toggle +
  // assistant button) and collapses the nav into a hamburger menu whenever they wouldn't all
  // fit on one row. This adapts automatically to language (French labels are longer than
  // English) instead of relying on a single fixed pixel breakpoint.
  useLayoutEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const measureNav = measureNavRef.current;
    const actions = actionsRef.current;
    if (!container || !logo || !measureNav || !actions) return;

    const recalc = () => {
      const available = container.clientWidth;
      const needed = logo.offsetWidth + measureNav.offsetWidth + actions.offsetWidth + GROUP_GAP * 2;
      setShowFullNav(needed <= available);
    };

    recalc();

    const observer = new ResizeObserver(recalc);
    observer.observe(container);
    observer.observe(logo);
    observer.observe(measureNav);
    observer.observe(actions);

    return () => observer.disconnect();
  }, [currentLang]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { id: "visit", label: t.nav.visit, icon: Compass, color: "text-emerald-400" },
    { id: "invest", label: t.nav.invest, icon: TrendingUp, color: "text-amber-400" },
    { id: "partnership", label: t.nav.partnership, icon: Handshake, color: "text-blue-400" },
    { id: "news", label: t.nav.news, icon: Newspaper, color: "text-purple-400" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-md">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 relative">
        
        {/* Brand Logo */}
        <a 
          ref={logoRef}
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2 xl:gap-3 group focus:outline-none shrink-0"
          aria-label="Canada-EU Bridge Home"
        >
          <img src="/logo.svg" alt="Canada-EU Bridge Logo" className="w-11 h-11 sm:w-12 sm:h-12 object-contain" />
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5 xl:gap-2">
              <span className="font-bold text-base xl:text-lg tracking-tight text-white group-hover:text-blue-300 transition-colors whitespace-nowrap">
                {currentLang === "en" ? "Canada-EU Bridge" : "Pont Canada-UE"}
              </span>
              <span className="text-sm xl:text-sm font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30 whitespace-nowrap hidden md:inline-block">
                CETA · SPA
              </span>
            </div>
            <p className="text-sm xl:text-sm text-slate-400 font-medium hidden md:block whitespace-nowrap">
              {currentLang === "en" ? "Bilateral Gateway & Assistant" : "Passerelle & Assistant Bilatéral"}
            </p>
          </div>
        </a>

        {/* Desktop Navigation (only rendered once measured to fit) */}
        {showFullNav && (
          <nav className="flex items-center gap-1 xl:gap-2 min-w-0">
            {navLinks.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="flex items-center gap-1.5 px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all whitespace-nowrap"
              >
                <Icon className={`w-4 h-4 shrink-0 ${color}`} />
                {label}
              </button>
            ))}
          </nav>
        )}

        {/* Hidden clone used only to measure the natural (unwrapped) width of the nav links */}
        <div
          ref={measureNavRef}
          aria-hidden="true"
          className="flex items-center gap-1 xl:gap-2 absolute top-0 left-0 invisible pointer-events-none -z-10"
        >
          {navLinks.map(({ id, label, icon: Icon, color }) => (
            <span key={id} className="flex items-center gap-1.5 px-3 py-2 text-base font-medium whitespace-nowrap">
              <Icon className={`w-4 h-4 shrink-0 ${color}`} />
              {label}
            </span>
          ))}
        </div>

        {/* Action Controls: Language Toggle + Assistant Trigger */}
        <div ref={actionsRef} className="flex items-center gap-1.5 sm:gap-2 xl:gap-3 shrink-0">
          
          {/* Language Switcher Button */}
          <button
            id="language-switcher-btn"
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 text-sm xl:text-base font-semibold rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none whitespace-nowrap"
            title={currentLang === "en" ? "Passer en Français" : "Switch to English"}
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-blue-400 shrink-0" />
            <span className={currentLang === "en" ? "text-amber-400 font-bold" : "text-slate-400"}>EN</span>
            <span className="text-slate-600">/</span>
            <span className={currentLang === "fr" ? "text-amber-400 font-bold" : "text-slate-400"}>FR</span>
          </button>

          {/* Chat Assistant Trigger */}
          <button
            id="header-chat-btn"
            onClick={onOpenChat}
            className="flex items-center gap-1.5 xl:gap-2 px-3 xl:px-3.5 py-1.5 text-sm xl:text-base font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-sm hover:shadow transition-all focus:ring-2 focus:ring-indigo-400 focus:outline-none whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-white shrink-0" />
            <span className="hidden sm:inline">{t.nav.chat}</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Hamburger menu toggle, only shown when the full nav doesn't fit */}
          {!showFullNav && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none shrink-0"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          )}
        </div>
      </div>

      {/* Slide-out Drawer Menu (collapsed nav links) */}
      {!showFullNav && mobileMenuOpen && (
        <div className="bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map(({ id, label, icon: Icon, color }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
            >
              <Icon className={`w-5 h-5 ${color}`} />
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
