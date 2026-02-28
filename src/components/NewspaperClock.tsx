import React, { useState, useEffect } from 'react';
import { Wrench, Hammer } from 'lucide-react';

export function NewspaperClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 text-xs md:text-sm font-serif uppercase tracking-widest border-y-2 border-ink py-2 my-4 bg-[#F9F7F2] print:hidden">
      <style>{`
        @keyframes strike {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-45deg); }
        }
        .animate-strike {
          animation: strike 1s ease-in-out infinite;
          transform-origin: bottom right;
        }
        @keyframes gear {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-gear {
          animation: gear 4s linear infinite;
        }
      `}</style>
      <span className="hidden md:inline">Vol. I — No. 1</span>
      <span className="hidden md:inline">•</span>
      <span>{time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
      <span>•</span>
      <div className="flex items-center gap-2 bg-ink text-parchment px-3 py-1 rounded-sm shadow-inner" title="Time is constantly being maintained">
        <Wrench size={12} className="animate-gear" />
        <span className="font-mono font-bold tracking-widest w-[60px] text-center">
          {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
        </span>
        <Hammer size={12} className="animate-strike" />
      </div>
      <span>•</span>
      <span className="hidden md:inline">Free Edition</span>
    </div>
  );
}
