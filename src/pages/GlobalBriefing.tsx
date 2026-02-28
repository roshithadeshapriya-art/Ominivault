import React, { useState, useEffect } from "react";
import { ExternalLink, RefreshCw, AlertTriangle } from "lucide-react";
import { AdContainer } from "../components/AdContainer";
import { fetchNews, Article } from "../services/newsService";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <title>The Temporary | Global Briefing</title>
        <meta name="description" content="Global news, weather conditions, and currency exchange rates tailored for the international engineering student's global transition." />
      </Helmet>
      <div className="border-b-4 border-ink pb-6 mb-8 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4">
          <span className="text-ink font-serif font-bold tracking-widest text-sm uppercase">Latest Edition</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tighter mb-2 mt-4 text-ink">Global Briefing</h1>
        <p className="font-serif italic text-xl">Technology, Business, Government & Privacy</p>
      </div>

      {/* Weather Widget */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 border-y-2 border-ink py-2 px-4 bg-white/50 gap-4">
        <div className="font-serif text-sm uppercase tracking-widest font-bold">
          Local Conditions
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 font-mono text-sm">
          <div className="flex space-x-4">
            <span className="font-bold text-blue-600">Colombo:</span>
            <span>88°F</span>
            <span>Hum: 78%</span>
          </div>
          <div className="flex space-x-4">
            <span className="font-bold text-blue-600">Hangzhou:</span>
            <span>62°F</span>
            <span>Hum: 55%</span>
          </div>
        </div>
      </div>

      <div className="my-8 text-center text-xs font-mono text-ink/50 border border-dashed border-ink/30 p-4">
        AD_SPACE_OPTIMIZED
      </div>

      <div className="border border-ink p-6 bg-white/50 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)] mb-8">
        <h2 className="text-2xl font-black font-serif uppercase tracking-tighter mb-4 text-blue-600">
          Climatology & Hardware: Why Weather Data Matters in the Lab
        </h2>
        <p className="font-sans text-lg leading-relaxed text-ink/90 mb-4">
          Environmental factors play a crucial role in electronic design and testing. High humidity can lead to moisture absorption in PCB substrates, affecting impedance and potentially causing short circuits in high-density designs. Conversely, extremely low humidity increases the risk of Electrostatic Discharge (ESD), which can instantly destroy sensitive CMOS components. Temperature fluctuations also impact the performance of TTL logic gates and can cause thermal runaway in power components. Monitoring local conditions is an essential first step before powering up any experimental breadboard.
        </p>
        <div className="bg-red-100 border-l-4 border-red-600 p-4 mt-4">
          <p className="font-serif text-sm font-bold text-ink">
            Safety Warning: How NOT to use: Not for life-critical, medical, or illegal activities.
          </p>
        </div>
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

            <div className="border border-ink p-5 bg-white shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
              <h3 className="font-serif font-black uppercase tracking-widest text-lg border-b-2 border-ink pb-2 mb-4 text-center text-blue-600">
                Tech Market Pulse
              </h3>
              <ul className="space-y-3 font-mono text-sm">
                <li className="flex justify-between border-b border-ink/20 pb-2">
                  <span className="text-ink/80">NVIDIA (NVDA)</span>
                  <span className="font-bold text-ink">▲ 1.2%</span>
                </li>
                <li className="flex justify-between border-b border-ink/20 pb-2">
                  <span className="text-ink/80">TSMC (TSM)</span>
                  <span className="font-bold text-green-600">▲ 0.8%</span>
                </li>
                <li className="flex justify-between border-b border-ink/20 pb-2">
                  <span>Silicon Wafers (300mm)</span>
                  <span className="font-bold text-ink">▲ $124.50</span>
                </li>
                <li className="flex justify-between border-b border-ink/20 pb-2">
                  <span>NAND Flash (per GB)</span>
                  <span className="font-bold text-green-600">▼ $0.04</span>
                </li>
                <li className="flex justify-between border-b border-ink/20 pb-2">
                  <span>Lithium (per kg)</span>
                  <span className="font-bold text-green-600">▼ $14.20</span>
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
            <div className="sticky top-32 border border-ink p-4 bg-white/30">
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

      {/* Global Exchange Table */}
      {!loading && !error && articles.length > 0 && (
        <div className="mt-12 border-t-4 border-ink pt-8">
          <h3 className="text-3xl font-black font-serif uppercase tracking-tighter mb-6 text-center">Global Exchange</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            <div className="lg:col-span-9 overflow-x-auto">
              <table className="w-full text-left border-collapse border border-ink bg-white/50 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
                <thead>
                  <tr className="bg-ink text-white font-serif uppercase tracking-widest text-sm">
                    <th className="border border-ink p-3">Currency</th>
                    <th className="border border-ink p-3">Symbol</th>
                    <th className="border border-ink p-3">Rate (vs USD)</th>
                    <th className="border border-ink p-3">Trend</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-sm">
                  <tr className="hover:bg-white transition-colors">
                    <td className="border border-ink p-3">US Dollar</td>
                    <td className="border border-ink p-3">USD</td>
                    <td className="border border-ink p-3">1.0000</td>
                    <td className="border border-ink p-3 text-gray-500">-</td>
                  </tr>
                  <tr className="hover:bg-white transition-colors">
                    <td className="border border-ink p-3">Euro</td>
                    <td className="border border-ink p-3">EUR</td>
                    <td className="border border-ink p-3">0.9245</td>
                    <td className="border border-ink p-3 text-red-600">▲ +0.0012</td>
                  </tr>
                  <tr className="hover:bg-white transition-colors">
                    <td className="border border-ink p-3">British Pound</td>
                    <td className="border border-ink p-3">GBP</td>
                    <td className="border border-ink p-3">0.7850</td>
                    <td className="border border-ink p-3 text-red-600">▲ +0.0021</td>
                  </tr>
                  <tr className="hover:bg-white transition-colors">
                    <td className="border border-ink p-3">Japanese Yen</td>
                    <td className="border border-ink p-3">JPY</td>
                    <td className="border border-ink p-3">150.25</td>
                    <td className="border border-ink p-3 text-green-600">▼ -0.15</td>
                  </tr>
                  <tr className="hover:bg-white transition-colors">
                    <td className="border border-ink p-3">Australian Dollar</td>
                    <td className="border border-ink p-3">AUD</td>
                    <td className="border border-ink p-3">1.5230</td>
                    <td className="border border-ink p-3 text-red-600">▲ +0.0045</td>
                  </tr>
                  <tr className="hover:bg-white transition-colors">
                    <td className="border border-ink p-3">Canadian Dollar</td>
                    <td className="border border-ink p-3">CAD</td>
                    <td className="border border-ink p-3">1.3540</td>
                    <td className="border border-ink p-3 text-green-600">▼ -0.0010</td>
                  </tr>
                  <tr className="hover:bg-white transition-colors">
                    <td className="border border-ink p-3">Swiss Franc</td>
                    <td className="border border-ink p-3">CHF</td>
                    <td className="border border-ink p-3">0.8820</td>
                    <td className="border border-ink p-3 text-red-600">▲ +0.0005</td>
                  </tr>
                  <tr className="hover:bg-white transition-colors">
                    <td className="border border-ink p-3">Indian Rupee</td>
                    <td className="border border-ink p-3">INR</td>
                    <td className="border border-ink p-3">82.90</td>
                    <td className="border border-ink p-3 text-gray-500">-</td>
                  </tr>
                  <tr className="hover:bg-white transition-colors">
                    <td className="border border-ink p-3">Singapore Dollar</td>
                    <td className="border border-ink p-3">SGD</td>
                    <td className="border border-ink p-3">1.3410</td>
                    <td className="border border-ink p-3 text-green-600">▼ -0.0020</td>
                  </tr>
                  <tr className="hover:bg-white transition-colors">
                    <td className="border border-ink p-3">Sri Lankan Rupee</td>
                    <td className="border border-ink p-3">LKR</td>
                    <td className="border border-ink p-3">305.50</td>
                    <td className="border border-ink p-3 text-green-600">▼ -0.50</td>
                  </tr>
                  <tr className="hover:bg-white transition-colors">
                    <td className="border border-ink p-3">Chinese Yuan</td>
                    <td className="border border-ink p-3">CNY</td>
                    <td className="border border-ink p-3">7.2340</td>
                    <td className="border border-ink p-3 text-red-600">▲ +0.0150</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="lg:col-span-3">
              <div className="border border-ink p-4 bg-white/30 h-full min-h-[400px] flex flex-col">
                <div className="text-[10px] uppercase tracking-widest font-serif font-bold border-b border-ink/30 pb-1 mb-3 text-center opacity-60">
                  Sponsored Content
                </div>
                <AdContainer 
                  className="w-full flex-1 min-h-[300px]" 
                  format="vertical" 
                  label="" 
                />
              </div>
            </div>
          </div>

          <div className="my-8 text-center text-xs font-mono text-ink/50 border border-dashed border-ink/30 p-4">
            AD_SPACE_OPTIMIZED
          </div>

          <div className="border border-ink p-6 bg-white/50 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)] mb-8">
            <h2 className="text-2xl font-black font-serif uppercase tracking-tighter mb-4 text-blue-600">
              The International Engineer's Guide to Forex
            </h2>
            <p className="font-sans text-lg leading-relaxed text-ink/90 mb-4">
              Sourcing components globally requires a keen understanding of currency fluctuations. When purchasing bulk semiconductors or custom PCBs from Shenzhen, transactions are often negotiated in USD but settled based on the CNY exchange rate. A slight shift in the USD/CNY pair can significantly impact the BOM (Bill of Materials) cost for a production run. Similarly, European components (EUR) or local assembly in Sri Lanka (LKR) require constant monitoring to optimize procurement strategies and maintain project budgets.
            </p>
            <div className="bg-red-100 border-l-4 border-red-600 p-4 mt-4">
              <p className="font-serif text-sm font-bold text-red-800">
                Safety Warning: How NOT to use: Not for life-critical, medical, or illegal activities.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
