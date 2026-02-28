import React, { useState } from "react";
import { Copy, RefreshCw, Trash2 } from "lucide-react";
import { AdContainer } from "../components/AdContainer";

export function TestLab() {
  const cardTypes = [
    { id: "visa", name: "Visa", prefix: "4", length: 16, format: [4, 4, 4, 4] },
    { id: "mastercard", name: "Mastercard", prefix: "51", length: 16, format: [4, 4, 4, 4] },
    { id: "amex", name: "American Express", prefix: "34", length: 15, format: [4, 6, 5] },
    { id: "discover", name: "Discover", prefix: "6011", length: 16, format: [4, 4, 4, 4] },
    { id: "jcb", name: "JCB", prefix: "35", length: 16, format: [4, 4, 4, 4] },
    { id: "diners", name: "Diners Club", prefix: "36", length: 14, format: [4, 6, 4] },
    { id: "unionpay", name: "UnionPay", prefix: "62", length: 16, format: [4, 4, 4, 4] },
    { id: "maestro", name: "Maestro", prefix: "5018", length: 16, format: [4, 4, 4, 4] },
    { id: "rupay", name: "RuPay", prefix: "60", length: 16, format: [4, 4, 4, 4] },
    { id: "mir", name: "Mir", prefix: "2200", length: 16, format: [4, 4, 4, 4] },
    { id: "elo", name: "Elo", prefix: "4011", length: 16, format: [4, 4, 4, 4] },
    { id: "troy", name: "Troy", prefix: "9792", length: 16, format: [4, 4, 4, 4] },
    { id: "alipay", name: "Alipay (Mock)", prefix: "88", length: 16, format: [4, 4, 4, 4] },
    { id: "wechat", name: "WeChat Pay (Mock)", prefix: "99", length: 16, format: [4, 4, 4, 4] },
  ];

  const [selectedType, setSelectedType] = useState(cardTypes[0].id);
  const [card, setCard] = useState({ number: "", exp: "", cvv: "" });
  const [copied, setCopied] = useState(false);

  const generateLuhnCard = (prefix: string, length: number) => {
    let num = prefix;
    while (num.length < length - 1) {
      num += Math.floor(Math.random() * 10).toString();
    }

    let sum = 0;
    let isEven = true;
    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num.charAt(i), 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }

    const checkDigit = (10 - (sum % 10)) % 10;
    return num + checkDigit;
  };

  const generateCard = () => {
    const typeDef = cardTypes.find(t => t.id === selectedType) || cardTypes[0];
    const number = generateLuhnCard(typeDef.prefix, typeDef.length);
    const expMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
    const expYear = String(new Date().getFullYear() + Math.floor(Math.random() * 5)).slice(-2);
    
    const cvvLength = typeDef.id === "amex" ? 4 : 3;
    const cvv = cvvLength === 4 
      ? String(Math.floor(Math.random() * 9000) + 1000)
      : String(Math.floor(Math.random() * 900) + 100);

    let formattedNumber = "";
    let currentIndex = 0;
    typeDef.format.forEach((len, i) => {
      formattedNumber += number.substring(currentIndex, currentIndex + len);
      if (i < typeDef.format.length - 1) formattedNumber += " ";
      currentIndex += len;
    });

    setCard({
      number: formattedNumber,
      exp: `${expMonth}/${expYear}`,
      cvv,
    });
  };

  const handleCopy = () => {
    if (!card.number) return;
    navigator.clipboard.writeText(`${card.number} | ${card.exp} | ${card.cvv}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="border-b-4 border-ink pb-6 mb-8 text-center">
        <h1 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tighter mb-2">Card Testing Lab</h1>
        <p className="font-serif italic text-xl">Experimental Financial Instruments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="border-newspaper p-8 bg-white/50">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 border-b border-ink pb-4 gap-4">
              <h2 className="text-2xl font-serif font-bold uppercase tracking-widest">Luhn Generator</h2>
              <div className="flex items-center gap-4">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-transparent border border-ink font-serif px-3 py-2 focus:outline-none"
                >
                  {cardTypes.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
                <button
                  onClick={generateCard}
                  className="ink-press border-newspaper px-6 py-2 font-serif font-bold uppercase tracking-widest text-sm flex items-center gap-2"
                >
                  <RefreshCw size={16} />
                  Fabricate
                </button>
                <button
                  onClick={() => setCard({ number: "", exp: "", cvv: "" })}
                  disabled={!card.number}
                  className="ink-press border-newspaper px-4 py-2 font-serif font-bold uppercase tracking-widest text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 size={16} />
                  Clear
                </button>
              </div>
            </div>

            <div className="border-newspaper-thick p-8 bg-white max-w-md mx-auto relative overflow-hidden mb-8">
              {/* Newspaper style card */}
              <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #F9F7F2 25%, #F9F7F2 75%, #000 75%, #000)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>
              
              <div className="text-center font-serif font-black uppercase tracking-widest text-xl border-b-2 border-ink pb-2 mb-8">
                Bank of OmniVault
              </div>

              <div className="space-y-6">
                <div className="text-2xl md:text-3xl tracking-widest font-mono text-center font-bold">
                  {card.number || "•••• •••• •••• ••••"}
                </div>
                
                <div className="flex justify-between items-end border-t border-ink pt-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest font-serif font-bold">Bearer</div>
                    <div className="font-serif italic text-lg">John Doe</div>
                  </div>
                  <div className="flex gap-6 text-right">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-serif font-bold">Expires</div>
                      <div className="font-mono font-bold">{card.exp || "MM/YY"}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-serif font-bold">Code</div>
                      <div className="font-mono font-bold">{card.cvv || "•••"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleCopy}
                disabled={!card.number}
                className="ink-press border-newspaper-thick px-12 py-4 font-serif font-black uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
              >
                <Copy size={20} />
                {copied ? "Copied to Clipboard" : "Copy Details"}
              </button>
            </div>
            
            <div className="mt-8 border-t border-ink pt-4 text-center font-serif italic text-sm">
              Notice: These numerical sequences are fabricated using the Luhn algorithm for testing purposes only. They possess no real-world monetary value.
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <AdContainer className="h-[250px] w-full" />
          <AdContainer className="h-[250px] w-full" />
        </div>
      </div>
    </div>
  );
}
