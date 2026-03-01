import React, { useState, useEffect } from "react";
import { RefreshCw, Copy, CheckCircle2, Trash2, Clock, X, MailOpen } from "lucide-react";
import { AdContainer } from "../components/AdContainer";
import { Helmet } from "react-helmet-async";

export function TempMail() {
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [countdown, setCountdown] = useState(600);
  
  const [selectedMail, setSelectedMail] = useState<any>(null);
  const [mailContent, setMailContent] = useState<string>("");
  const [loadingMail, setLoadingMail] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const API_URL = "https://api.mail.gw";

  useEffect(() => {
    const storedEmail = localStorage.getItem("omnivault_email");
    const storedToken = localStorage.getItem("omnivault_token");
    if (storedEmail && storedToken) {
      setEmail(storedEmail);
      setToken(storedToken);
    } else {
      generateEmail();
    }
  }, []);

  const generateEmail = async () => {
    setLoading(true);
    setErrorMsg(null);
    setCountdown(600);
    try {
      const domainsRes = await fetch(`${API_URL}/domains`);
      if (!domainsRes.ok) throw new Error("Failed to fetch domains");
      const domainsData = await domainsRes.json();
      const domain = domainsData['hydra:member'][0].domain;

      const address = `omni_${Math.random().toString(36).substring(2, 10)}@${domain}`;
      const password = "password123";
      
      const accountRes = await fetch(`${API_URL}/accounts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, password }),
      });
      
      if (!accountRes.ok) throw new Error("Failed to create account");

      const tokenRes = await fetch(`${API_URL}/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, password }),
      });
      
      if (!tokenRes.ok) throw new Error("Failed to get token");
      
      const tokenData = await tokenRes.json();
      
      setToken(tokenData.token);
      setEmail(address);
      setMessages([]);
      
      localStorage.setItem("omnivault_email", address);
      localStorage.setItem("omnivault_token", tokenData.token);
    } catch (error: any) {
      console.error("Failed to generate email", error);
      setErrorMsg("Connection failed. Your adblocker or network might be blocking the mail server.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    if (!token) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`${API_URL}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("omnivault_email");
        localStorage.removeItem("omnivault_token");
        generateEmail();
        return;
      }
      
      if (!res.ok) throw new Error("Failed to fetch messages");
      
      const data = await res.json();
      setMessages(data['hydra:member'] || []);
    } catch (error: any) {
      console.error("Failed to fetch messages", error);
      setErrorMsg("Failed to sync messages. Retrying...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    if (!token) return;
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          generateEmail();
          return 600;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [token]);

  const openMail = async (msg: any) => {
    setSelectedMail(msg);
    setLoadingMail(true);
    try {
      const res = await fetch(`${API_URL}/messages/${msg.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setMailContent(data.html ? data.html[0] : data.text);
    } catch (e) {
      setMailContent("Failed to load message.");
    } finally {
      setLoadingMail(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>The Temporary | Anonymous Receiving Station</title>
        <meta name="description" content="Secure, temporary email service for engineers and privacy-conscious users. Part of The Temporary's suite of engineering tools for global transition." />
      </Helmet>
      <div className="text-center border-b-4 border-ink pb-6 mb-8">
        <h1 className="text-6xl md:text-8xl font-black font-serif uppercase tracking-tighter mb-4">The Daily Mail</h1>
        <p className="font-serif italic text-xl">Your Anonymous Receiving Station</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Modal for viewing email */}
        {selectedMail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm p-4">
            <div className="bg-[#F9F7F2] border-4 border-ink p-6 max-w-3xl w-full max-h-[80vh] flex flex-col shadow-2xl relative">
              <div className="flex justify-between items-start border-b-2 border-ink pb-4 mb-4">
                <div className="pr-8">
                  <h2 className="text-2xl font-serif font-bold leading-tight">{selectedMail.subject}</h2>
                  <p className="font-mono text-sm mt-2 opacity-80">From: {selectedMail.from.address}</p>
                  <p className="font-mono text-xs mt-1 opacity-60">{new Date(selectedMail.createdAt).toLocaleString()}</p>
                </div>
                <button onClick={() => setSelectedMail(null)} className="p-2 hover:bg-ink/10 absolute top-4 right-4">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto bg-white border border-ink/30 p-4 font-sans">
                {loadingMail ? (
                  <div className="flex justify-center items-center h-full">
                    <RefreshCw className="animate-spin text-ink/50" size={32} />
                  </div>
                ) : (
                  <iframe 
                    srcDoc={mailContent} 
                    className="w-full h-full border-0 min-h-[400px]" 
                    sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                    title="Email Content"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        <div className="lg:col-span-8 space-y-8">
          <div className="border-newspaper p-8 bg-white/50">
            {errorMsg && (
              <div className="bg-ink/5 border-l-4 border-ink p-4 mb-6">
                <p className="font-serif text-sm font-bold text-ink">{errorMsg}</p>
              </div>
            )}
            <div className="flex flex-col md:flex-row items-stretch gap-0 border-newspaper-thick">
              <div className="flex-1 relative bg-white">
                <input
                  type="text"
                  readOnly
                  value={email || "Establishing connection..."}
                  className="w-full h-full bg-transparent px-6 py-6 text-2xl md:text-3xl font-mono text-center focus:outline-none"
                />
              </div>
              <button
                onClick={handleCopy}
                disabled={!email}
                className="ink-press px-8 py-6 font-serif font-bold uppercase tracking-widest border-l border-ink flex items-center justify-center gap-2"
              >
                {copied ? <CheckCircle2 size={24} /> : <Copy size={24} />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={generateEmail}
                disabled={loading}
                className="ink-press px-8 py-6 font-serif font-bold uppercase tracking-widest border-l border-ink flex flex-col items-center justify-center gap-1 min-w-[140px]"
              >
                <div className="flex items-center gap-2">
                  <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
                  <span>New</span>
                </div>
                {token && (
                  <div className="text-[10px] flex items-center gap-1 opacity-70 mt-1">
                    <Clock size={10} />
                    {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
                  </div>
                )}
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between border-b-2 border-ink pb-2 mb-4">
              <h3 className="text-2xl font-serif font-bold uppercase tracking-widest">Incoming Dispatches</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMessages([])}
                  disabled={messages.length === 0}
                  className="text-sm font-serif uppercase tracking-widest hover:underline flex items-center gap-1 disabled:opacity-50 disabled:no-underline"
                >
                  <Trash2 size={14} />
                  Clear
                </button>
                <button
                  onClick={fetchMessages}
                  disabled={loading || !token}
                  className="text-sm font-serif uppercase tracking-widest hover:underline flex items-center gap-1 disabled:opacity-50 disabled:no-underline"
                >
                  <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                  Refresh
                </button>
              </div>
            </div>
            
            <div className="border-newspaper bg-white/50">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-ink/50 font-serif italic">
                  <p className="text-xl">No dispatches received yet.</p>
                  <p className="text-sm mt-2">Awaiting transmission...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-ink font-serif uppercase tracking-widest text-sm">
                        <th className="p-4 border-r border-ink/30">Sender</th>
                        <th className="p-4 border-r border-ink/30">Subject</th>
                        <th className="p-4 border-r border-ink/30">Time</th>
                        <th className="p-4 w-16 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map((msg, idx) => (
                        <tr key={msg.id} className={`border-b border-ink/30 hover:bg-ink/5 transition-colors ${idx % 2 === 0 ? 'bg-white/30' : ''}`}>
                          <td className="p-4 border-r border-ink/30 font-medium whitespace-nowrap">{msg.from.address}</td>
                          <td className="p-4 border-r border-ink/30">
                            <div className="font-bold font-serif">{msg.subject}</div>
                            <div className="text-sm opacity-70 truncate max-w-xs">{msg.intro}</div>
                          </td>
                          <td className="p-4 border-r border-ink/30 text-sm font-mono whitespace-nowrap">{new Date(msg.createdAt).toLocaleTimeString()}</td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => openMail(msg)}
                                className="p-2 hover:bg-ink/10 rounded transition-colors inline-flex items-center justify-center"
                                title="Open Message"
                              >
                                <MailOpen size={16} />
                              </button>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(`From: ${msg.from.address}\nSubject: ${msg.subject}\n\n${msg.intro}`);
                                  setCopiedMsgId(msg.id);
                                  setTimeout(() => setCopiedMsgId(null), 2000);
                                }}
                                className="p-2 hover:bg-ink/10 rounded transition-colors inline-flex items-center justify-center"
                                title="Copy Message"
                              >
                                {copiedMsgId === msg.id ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="my-8 text-center text-xs font-mono text-ink/50 border border-dashed border-ink/30 p-4">
            AD_SPACE_OPTIMIZED
          </div>

          {/* Article */}
          <div className="border border-ink p-6 bg-white/50 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
            <h2 className="text-2xl font-black font-serif uppercase tracking-tighter mb-4 text-ink">
              The Architecture of Disposable Inboxes
            </h2>
            <p className="font-sans text-lg leading-relaxed text-ink/90 mb-4">
              Temporary email services act as a digital buffer zone. When testing new software integrations, signing up for untrusted services, or isolating communication channels, a disposable inbox prevents primary email addresses from being compromised or flooded with spam. 
            </p>
            <p className="font-sans text-lg leading-relaxed text-ink/90 mb-4">
              These systems typically operate by generating a unique cryptographic hash or random string mapped to a temporary domain. The mail server routes incoming SMTP traffic to this temporary address, storing it in volatile memory or a short-lived database. Once the session expires or the user manually destroys the inbox, all associated data is permanently purged, ensuring zero residual footprint.
            </p>
            <div className="bg-ink/5 border-l-4 border-ink p-4 mt-4">
              <p className="font-serif text-sm font-bold text-ink">
                Safety Warning: How NOT to use: Not for life-critical, medical, or illegal activities.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
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
    </div>
  );
}
