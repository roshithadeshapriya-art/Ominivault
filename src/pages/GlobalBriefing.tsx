import React, { useState, useEffect } from "react";
import { ExternalLink, RefreshCw, AlertTriangle } from "lucide-react";
import { AdContainer } from "../components/AdContainer";
import { fetchNews, Article } from "../services/newsService";

export function GlobalBriefing() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNews(Date.now().toString());
      setArticles(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch news. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const topStory = articles[0];

  return (
    <div className="space-y-8">
      <div className="border-b-4 border-ink pb-6 mb-8 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4">
          <span className="text-red-700 font-serif font-bold tracking-widest text-sm uppercase">Latest Edition</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tighter mb-2 mt-4">Global Briefing</h1>
        <p className="font-serif italic text-xl">Technology, Business, Government & Privacy</p>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={loadNews}
          disabled={loading}
          className="text-sm font-serif uppercase tracking-widest hover:underline flex items-center gap-1 disabled:opacity-50 disabled:no-underline"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh Press
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-ink/50 font-serif italic">
          <RefreshCw size={48} className="mb-4 opacity-20 animate-spin" />
          <p>Gathering intelligence...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 text-ink font-serif italic border-4 border-ink/20 bg-white/50 p-8 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
          <AlertTriangle size={48} className="mb-4 opacity-50" />
          <p className="text-3xl font-black mb-2 uppercase tracking-widest text-center">The Press is currently offline for maintenance.</p>
          <p className="text-lg opacity-80 text-center">Please check the next edition.</p>
          <p className="text-sm opacity-50 mt-4 font-mono">System Diagnostic: {error}</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-ink/50 font-serif italic">
          <p>No dispatches found. The wire is quiet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main News Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Story (Double Wide) */}
            {topStory && (
              <a href={topStory.url} target="_blank" rel="noopener noreferrer" className="border border-ink p-6 bg-white/50 flex flex-col md:flex-row gap-6 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)] hover:bg-white transition-colors block">
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-widest font-serif font-bold border-b border-ink/30 pb-1 mb-3 inline-block">
                    Breaking News • {new Date(topStory.publishedAt).toLocaleDateString()}
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black font-serif leading-none mb-6 tracking-tighter">
                    {topStory.title}
                  </h2>
                  {topStory.description && (
                    <p className="font-sans text-lg md:text-xl leading-relaxed mb-6 opacity-80">
                      {topStory.description}
                    </p>
                  )}
                  <div className="inline-flex items-center gap-2 font-serif font-bold uppercase tracking-widest text-sm decoration-2 underline-offset-4">
                    Read More <ExternalLink size={14} />
                  </div>
                </div>
                <div className="w-full md:w-2/5 shrink-0">
                  <img 
                    src={topStory.image || "https://picsum.photos/seed/newspaper/800/600?grayscale&blur=2"} 
                    alt={topStory.title}
                    className="w-full h-full object-cover border border-ink grayscale hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </a>
            )}

            {/* All other stories (Masonry Grid) */}
            <div className="columns-1 md:columns-2 gap-6 space-y-6">
              {articles.slice(1).map((article, idx) => {
                const globalIdx = idx + 1; // 1-based index (topStory is 0)
                return (
                  <React.Fragment key={idx}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="break-inside-avoid border border-ink p-5 bg-white/50 flex flex-col shadow-[2px_2px_0px_0px_rgba(20,20,20,1)] hover:bg-white transition-colors block">
                      <img 
                        src={article.image || "https://picsum.photos/seed/newspaper/800/600?grayscale&blur=2"} 
                        alt={article.title}
                        className="w-full h-40 object-cover border border-ink grayscale hover:grayscale-0 transition-all duration-300 mb-4"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-[10px] uppercase tracking-widest font-serif font-bold border-b border-ink/30 pb-1 mb-3 flex justify-between">
                        <span>{article.source.name}</span>
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-2xl font-black font-serif leading-tight mb-3">
                        {article.title}
                      </h3>
                      {article.description && (
                        <p className="font-sans text-sm leading-relaxed mb-4 opacity-80">
                          {article.description}
                        </p>
                      )}
                      <div className="inline-flex items-center gap-2 font-serif font-bold uppercase tracking-widest text-xs decoration-2 underline-offset-4 mt-auto">
                        Read More <ExternalLink size={12} />
                      </div>
                    </a>

                    {/* Ad after 2nd item (globalIdx === 1) */}
                    {globalIdx === 1 && (
                      <div className="break-inside-avoid border border-ink p-4 bg-white/30 my-6">
                        <div className="text-[10px] uppercase tracking-widest font-serif font-bold border-b border-ink/30 pb-1 mb-3 text-center opacity-60">
                          Sponsored
                        </div>
                        <AdContainer 
                          className="w-full h-[250px]" 
                          format="fluid" 
                          label="" 
                        />
                      </div>
                    )}

                    {/* Ad after 5th item (globalIdx === 4) */}
                    {globalIdx === 4 && (
                      <div className="break-inside-avoid border border-ink p-4 bg-white/30 my-6">
                        <div className="text-[10px] uppercase tracking-widest font-serif font-bold border-b border-ink/30 pb-1 mb-3 text-center opacity-60">
                          Sponsored
                        </div>
                        <AdContainer 
                          className="w-full h-[250px]" 
                          format="fluid" 
                          label="" 
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Filler Snippet 1 */}
              <div className="break-inside-avoid border-y-2 border-ink py-4 bg-transparent flex flex-col">
                <h4 className="text-lg font-bold font-serif leading-tight mb-2 italic">
                  Opinion: The Future of Digital Privacy
                </h4>
                <p className="font-serif text-xs leading-relaxed opacity-70 text-justify">
                  As we navigate the complexities of the modern web, the question of who owns our data becomes increasingly paramount. Recent legislative efforts have attempted to curb the voracious appetite of data brokers, yet the technological arms race continues unabated. It is incumbent upon users to remain vigilant.
                </p>
              </div>

              {/* Filler Snippet 2 */}
              <div className="break-inside-avoid border border-ink p-4 bg-ink text-parchment flex flex-col shadow-[2px_2px_0px_0px_rgba(20,20,20,1)]">
                <h4 className="text-md font-bold font-serif leading-tight mb-2 uppercase tracking-widest">
                  Briefly Noted
                </h4>
                <p className="font-serif text-xs leading-relaxed opacity-90 text-justify">
                  Markets rallied late Tuesday following unexpected announcements from the central bank regarding interest rate stabilization. Meanwhile, tech sector layoffs appear to be slowing down after a tumultuous quarter. Analysts remain cautiously optimistic for the upcoming fiscal year.
                </p>
              </div>
            </div>

          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-ink p-5 bg-white shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
              <h3 className="font-serif font-black uppercase tracking-widest text-lg border-b-2 border-ink pb-2 mb-4 text-center">
                Market Intelligence
              </h3>
              <ul className="space-y-3 font-mono text-sm">
                <li className="flex justify-between border-b border-ink/20 pb-2">
                  <span>BTC/USD</span>
                  <span className="font-bold">Loading...</span>
                </li>
                <li className="flex justify-between border-b border-ink/20 pb-2">
                  <span>ETH/USD</span>
                  <span className="font-bold">Loading...</span>
                </li>
                <li className="flex justify-between border-b border-ink/20 pb-2">
                  <span>XMR/USD</span>
                  <span className="font-bold">Loading...</span>
                </li>
              </ul>
            </div>

            {/* Filler Snippet 3 (Sidebar) */}
            <div className="border-y border-ink py-4">
              <h4 className="font-serif font-bold text-sm mb-2 italic">From the Archives</h4>
              <p className="font-serif text-[11px] leading-relaxed opacity-70 text-justify">
                Ten years ago today, the first consumer-grade virtual reality headsets hit the market, promising a revolution in entertainment and communication. While the initial hype has settled into a steady niche, the underlying technology continues to evolve, finding unexpected applications in medical training and remote robotics.
              </p>
            </div>

            {/* Sidebar Ad (Right Sidebar) */}
            <div className="sticky top-28 border border-ink p-4 bg-white/30">
              <div className="text-[10px] uppercase tracking-widest font-serif font-bold border-b border-ink/30 pb-1 mb-3 text-center opacity-60">
                Sponsored Content
              </div>
              <AdContainer 
                className="w-full aspect-square" 
                format="rectangle" 
                label="" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
