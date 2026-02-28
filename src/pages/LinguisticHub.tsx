import React, { useState } from "react";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { AdContainer } from "../components/AdContainer";
import { GoogleGenAI } from "@google/genai";
import { RefreshCw, Copy, CheckCircle2, Wand2, Type } from "lucide-react";

export function LinguisticHub() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<"Academic" | "Creative" | "Technical">("Academic");
  const [targetWordCount, setTargetWordCount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const charCount = inputText.length;
  
  const outputWordCount = outputText.trim() ? outputText.trim().split(/\s+/).length : 0;

  const handleProcess = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      let prompt = "";
      if (targetWordCount && parseInt(targetWordCount) > 0) {
        prompt = `You are an expert editor. Rewrite the following text to be EXACTLY ${targetWordCount} words long. Maintain the original meaning as much as possible. \n\nText to rewrite:\n${inputText}`;
      } else {
        let styleInstruction = "";
        if (mode === "Academic") styleInstruction = "formal, academic, and objective";
        if (mode === "Creative") styleInstruction = "flowery, engaging, and creative";
        if (mode === "Technical") styleInstruction = "precise, concise, and technical";
        
        prompt = `You are an expert editor. Paraphrase the following text in a ${styleInstruction} style. \n\nText to paraphrase:\n${inputText}`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setOutputText(response.text || "");
    } catch (error) {
      console.error("Error processing text:", error);
      setOutputText("An error occurred while processing your request. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const copyData = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <Helmet>
        <title>The Temporary | Linguistic Hub</title>
        <meta name="description" content="AI-powered paraphrasing, word counting, and smart-tweak text generation for precise communication." />
      </Helmet>
      
      <div className="border-b-4 border-ink pb-6 mb-8 text-center relative">
        <h1 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tighter mb-2 mt-4 text-ink">Linguistic Hub</h1>
        <p className="font-serif italic text-xl">The AI Editor & Word Counter</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-8">
          
          {/* Tool: AI Editor */}
          <div className="border border-ink p-6 bg-white/50 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-black font-serif uppercase tracking-tighter">AI Paraphraser & Smart-Tweak</h2>
              
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setMode("Academic")}
                  className={`px-3 py-1 font-serif text-xs font-bold uppercase tracking-widest border-2 border-ink transition-colors ${mode === "Academic" ? "bg-ink text-white" : "bg-white text-ink hover:bg-ink/5"}`}
                >
                  Academic
                </button>
                <button 
                  onClick={() => setMode("Creative")}
                  className={`px-3 py-1 font-serif text-xs font-bold uppercase tracking-widest border-2 border-ink transition-colors ${mode === "Creative" ? "bg-ink text-white" : "bg-white text-ink hover:bg-ink/5"}`}
                >
                  Creative
                </button>
                <button 
                  onClick={() => setMode("Technical")}
                  className={`px-3 py-1 font-serif text-xs font-bold uppercase tracking-widest border-2 border-ink transition-colors ${mode === "Technical" ? "bg-ink text-white" : "bg-white text-ink hover:bg-ink/5"}`}
                >
                  Technical
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Input Area */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-serif text-sm font-bold uppercase tracking-widest">Original Text</label>
                  <div className="font-mono text-xs text-ink/60">
                    {wordCount} words | {charCount} chars
                  </div>
                </div>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full h-64 border-2 border-ink p-4 font-sans text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                  placeholder="Enter text to paraphrase or tweak..."
                />
              </div>

              {/* Output Area */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-serif text-sm font-bold uppercase tracking-widest">AI Output</label>
                  {outputText && (
                    <div className="font-mono text-xs text-ink/60">
                      {outputWordCount} words
                    </div>
                  )}
                </div>
                <div className="relative">
                  <textarea
                    value={outputText}
                    readOnly
                    className="w-full h-64 border-2 border-ink p-4 font-sans text-sm bg-ink/5 focus:outline-none resize-none"
                    placeholder="AI generated text will appear here..."
                  />
                  {outputText && (
                    <button 
                      onClick={copyData}
                      className="absolute bottom-4 right-4 bg-white border-2 border-ink px-3 py-1 font-serif font-bold uppercase tracking-widest text-xs flex items-center gap-1 hover:bg-ink hover:text-white transition-colors"
                    >
                      {copied ? <CheckCircle2 size={12} /> : <Copy size={12} />} {copied ? "Copied" : "Copy"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-end border-t-2 border-ink/20 pt-6">
              <div className="flex-1 w-full">
                <label className="block font-serif text-xs font-bold uppercase tracking-widest mb-2 text-blue-600">Smart-Tweak: Target Word Count (Optional)</label>
                <div className="flex items-center gap-2">
                  <Type size={16} className="text-ink/50" />
                  <input 
                    type="number" 
                    value={targetWordCount}
                    onChange={(e) => setTargetWordCount(e.target.value)}
                    className="w-full border-b-2 border-ink p-2 font-mono text-sm bg-transparent focus:outline-none focus:border-blue-600"
                    placeholder="e.g. 250 (Overrides mode)"
                  />
                </div>
              </div>
              <button
                onClick={handleProcess}
                disabled={isProcessing || !inputText.trim()}
                className="w-full sm:w-auto bg-ink text-white font-serif font-bold uppercase tracking-widest px-8 py-3 hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
              >
                {isProcessing ? <RefreshCw size={18} className="animate-spin" /> : <Wand2 size={18} />}
                {isProcessing ? "Processing..." : "Process Text"}
              </button>
            </div>
          </div>

          <div className="my-8 text-center text-xs font-mono text-ink/50 border border-dashed border-ink/30 p-4">
            AD_SPACE_OPTIMIZED
          </div>

          {/* Article */}
          <div className="border border-ink p-6 bg-white/50 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
            <h2 className="text-2xl font-black font-serif uppercase tracking-tighter mb-4 text-blue-600">
              Computational Linguistics: Mastering Word-Count Precision
            </h2>
            <p className="font-sans text-lg leading-relaxed text-ink/90 mb-4">
              In academic publishing, grant writing, and technical documentation, word counts are not mere suggestions—they are hard constraints. A 500-word abstract that runs to 505 words might be automatically rejected by submission portals. Historically, editing text to meet exact length requirements involved tedious manual trimming or padding, often compromising the flow and impact of the writing.
            </p>
            <p className="font-sans text-lg leading-relaxed text-ink/90 mb-4">
              Modern computational linguistics and Large Language Models (LLMs) have revolutionized this process. By utilizing advanced tokenization and semantic restructuring algorithms, AI can rephrase entire paragraphs to hit specific length targets while preserving the core message. The "Smart-Tweak" feature leverages these capabilities, allowing engineers and researchers to focus on the substance of their work rather than the character limits of their forms.
            </p>
            <div className="bg-red-100 border-l-4 border-red-600 p-4 mt-4">
              <p className="font-serif text-sm font-bold text-ink">
                Safety Warning: How NOT to use: Not for life-critical, medical, or illegal activities.
              </p>
            </div>
          </div>

        </div>

        <div className="lg:col-span-4">
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
    </motion.div>
  );
}
