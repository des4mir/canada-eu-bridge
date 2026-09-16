import React, { useState, useEffect } from "react";
import { Newspaper, Calendar, ExternalLink, ArrowUpRight, AlertTriangle, Loader2 } from "lucide-react";
import { Language } from "../types";
import { translations } from "../data/translations";

interface NewsSectionProps {
  currentLang: Language;
  onAskAboutNews?: (title: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ currentLang, onAskAboutNews }) => {
  const t = translations[currentLang];
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/news?lang=${currentLang}`);
        let data;
        const responseText = await res.text();
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error("Failed to parse JSON for news. Response text:", responseText.substring(0, 200));
          if (!res.ok) {
            throw new Error(`Server returned status ${res.status}`);
          }
          throw new Error("Invalid response format from server");
        }
        if (!res.ok) {
          throw new Error(data?.error || "Failed to fetch news");
        }
        if (data.articles) {
          setArticles(data.articles);
        } else {
          setArticles([]);
        }
      } catch (err) {
        console.error(err);
        setError(currentLang === "en" ? "Unable to load live news feed at this time." : "Impossible de charger le fil d'actualités en direct pour le moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentLang]);

  return (
    <section id="news" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-sm font-semibold uppercase tracking-wider mb-2">
              <Newspaper className="w-3.5 h-3.5" />
              {t.news.title}
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              {currentLang === "en" ? "Live Updates" : "Mises à jour en direct"}
            </h2>
            <p className="text-base sm:text-base text-slate-600 mt-1 max-w-2xl">
              {currentLang === "en" 
                ? "Latest headlines on Canada tourism, trade, and investment." 
                : "Derniers titres sur le tourisme, le commerce et l'investissement au Canada."}
            </p>
          </div>
          
          <div className="text-sm text-slate-500 flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-xs">
             <span className="font-semibold tracking-wide uppercase text-slate-700">Powered by GNews</span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mb-3 text-purple-600" />
            <p>{currentLang === "en" ? "Fetching live headlines..." : "Récupération des titres en direct..."}</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <AlertTriangle className="w-8 h-8 mb-2 opacity-80" />
            <p className="font-medium">{error}</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p>{currentLang === "en" ? "No recent news found." : "Aucune actualité récente trouvée."}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article, idx) => {
              const pubDate = new Date(article.publishedAt).toLocaleDateString(
                currentLang === "en" ? "en-CA" : "fr-CA",
                { year: "numeric", month: "short", day: "numeric" }
              );
              
              return (
                <article
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:-translate-y-0.5 hover:shadow-sm hover:border-purple-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full border bg-slate-100 text-slate-700 border-slate-200">
                        {article.source.name}
                      </span>
                      <div className="flex items-center gap-1.5 text-sm text-slate-500">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{pubDate}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-medium text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-base text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                      {article.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-base min-w-0">
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      <span>{currentLang === "en" ? "Read full article" : "Lire l'article complet"}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    {onAskAboutNews && (
                      <button
                        onClick={() => onAskAboutNews(article.title)}
                        className="inline-flex items-center justify-center gap-1 font-semibold text-purple-700 hover:text-purple-900 transition-colors shrink-0"
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
        )}
      </div>
    </section>
  );
};
