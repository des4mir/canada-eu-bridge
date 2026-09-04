import React, { useState } from "react";
import { Newspaper, Calendar, ArrowUpRight, CheckCircle2, FileCode2 } from "lucide-react";
import { Language, NewsItem } from "../types";
import { translations } from "../data/translations";
import { STATIC_NEWS_ITEMS } from "../data/news";

interface NewsSectionProps {
  currentLang: Language;
  onAskAboutNews?: (title: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ currentLang, onAskAboutNews }) => {
  const t = translations[currentLang];
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const newsItems = STATIC_NEWS_ITEMS;

  const categories = [
    { id: "all", label: currentLang === "en" ? "All Updates" : "Toutes les actualités" },
    { id: "trade", label: currentLang === "en" ? "Trade & CETA" : "Commerce & AECG" },
    { id: "science", label: currentLang === "en" ? "Science & Tech" : "Science & Innovation" },
    { id: "travel", label: currentLang === "en" ? "Travel & Flights" : "Voyage & Liaisons" },
    { id: "green", label: currentLang === "en" ? "Green Transition" : "Transition Écologique" },
  ];

  const filteredItems = newsItems.filter((item) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "trade") return item.categoryEn.includes("Trade") || item.categoryFr.includes("Commerce");
    if (selectedCategory === "science") return item.categoryEn.includes("Science") || item.categoryFr.includes("Innovation");
    if (selectedCategory === "travel") return item.categoryEn.includes("Travel") || item.categoryFr.includes("Voyage");
    if (selectedCategory === "green") return item.categoryEn.includes("Green") || item.categoryFr.includes("Écologique");
    return true;
  });

  return (
    <section id="news" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with clear static content notice */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider mb-2">
              <Newspaper className="w-3.5 h-3.5" />
              {t.news.title}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.news.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              {t.news.subtitle}
            </p>
          </div>

          {/* Static Content Edit Indicator badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 shadow-xs text-xs text-slate-600">
            <FileCode2 className="w-4 h-4 text-purple-600 shrink-0" />
            <span>
              <strong className="text-slate-800 font-semibold">{currentLang === "en" ? "Static Data File:" : "Fichier de données statiques :"}</strong>{" "}
              <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px] font-mono text-slate-700">src/data/news.ts</code>
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-purple-700 text-white shadow-xs"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item: NewsItem) => {
            const title = currentLang === "en" ? item.titleEn : item.titleFr;
            const category = currentLang === "en" ? item.categoryEn : item.categoryFr;
            const summary = currentLang === "en" ? item.summaryEn : item.summaryFr;
            const highlights = currentLang === "en" ? item.highlightsEn : item.highlightsFr;

            return (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md hover:border-purple-200 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category & Date Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${item.badgeColor || "bg-slate-100 text-slate-700 border-slate-200"}`}>
                      {category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    {title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {summary}
                  </p>

                  {/* Key Highlights Bullet points */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    <p className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                      {t.news.readMore}:
                    </p>
                    {highlights.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer source & Ask Assistant link */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs min-w-0">
                  <span className="text-slate-500 italic break-words min-w-0 flex-1">
                    {item.source}
                  </span>
                  {onAskAboutNews && (
                    <button
                      onClick={() => onAskAboutNews(title)}
                      className="inline-flex flex-wrap items-center justify-center gap-1 font-semibold text-purple-700 hover:text-purple-900 transition-colors shrink-0"
                    >
                      <span>{currentLang === "en" ? "Ask AI Assistant" : "Interroger l'assistant"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
