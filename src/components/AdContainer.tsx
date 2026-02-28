import React, { useEffect, useRef, useState } from "react";
import { monetizationConfig } from "../monetizationConfig";

interface AdContainerProps {
  slotId?: string;
  format?: "auto" | "fluid" | "rectangle";
  responsive?: boolean;
  className?: string;
  isRewarded?: boolean;
  label?: string;
}

export function AdContainer({ slotId = monetizationConfig.BANNER_AD_SLOT_ID, format = "auto", responsive = true, className = "", isRewarded = false, label }: AdContainerProps) {
  const isPlaceholder = monetizationConfig.ADSENSE_PUB_ID === "ca-pub-XXXXXXXXXXXXXXXX" || !monetizationConfig.ADSENSE_PUB_ID;
  const adInitialized = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isPlaceholder) return;
    
    const container = containerRef.current;
    if (!container) return;

    // Check if the container is currently visible (has dimensions)
    if (container.offsetWidth > 0 && container.offsetHeight > 0) {
      setIsVisible(true);
    } else {
      // If hidden (e.g., mobile sidebar), wait until it becomes visible
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
            setIsVisible(true);
            observer.disconnect();
          }
        }
      });
      
      observer.observe(container);
      return () => observer.disconnect();
    }
  }, [isPlaceholder]);

  useEffect(() => {
    if (isVisible && !adInitialized.current && !isPlaceholder) {
      const timer = setTimeout(() => {
        try {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          adInitialized.current = true;
        } catch (err) {
          console.error("AdSense error", err);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isPlaceholder]);

  return (
    <div ref={containerRef} className={`border-newspaper p-1 bg-[#F9F7F2] relative flex flex-col items-center justify-center overflow-hidden ${className}`}>
      <div className="absolute top-0 left-0 w-full text-center border-b border-ink/30 bg-ink/5 text-[10px] uppercase tracking-widest font-serif py-0.5 z-10">
        {label || (isRewarded ? "Rewarded Advertisement" : "Advertisement")}
      </div>
      <div className="w-full h-full pt-5 flex items-center justify-center min-w-[200px] min-h-[50px]">
        {isPlaceholder ? (
          <div className="text-ink/40 font-serif italic text-sm text-center px-4 flex flex-col items-center justify-center h-full">
            <span className="block mb-1">[Ad Space Reserved]</span>
            <span className="text-xs opacity-70">Configure VITE_ADSENSE_PUBLISHER_ID to display</span>
          </div>
        ) : isVisible ? (
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%", height: "100%", minWidth: "200px", minHeight: "50px" }}
            data-ad-client={monetizationConfig.ADSENSE_PUB_ID}
            data-ad-slot={isRewarded ? monetizationConfig.REWARDED_AD_SLOT_ID : slotId}
            data-ad-format={format}
            data-full-width-responsive={responsive ? "true" : "false"}
          />
        ) : null}
      </div>
    </div>
  );
}
