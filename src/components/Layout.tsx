import React from "react";
import { NavLink, Outlet } from "react-router";
import { AdContainer } from "./AdContainer";
import { NewspaperClock } from "./NewspaperClock";
import { monetizationConfig } from "../monetizationConfig";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-ink selection:text-parchment">
      <header className="sticky top-0 z-50 bg-[#F9F7F2]/80 backdrop-blur-md border-b-4 border-ink print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-4 md:h-20 gap-4 md:gap-0">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-serif font-black text-3xl tracking-tighter uppercase">OmniVault</span>
            </div>
            <nav className="flex flex-wrap justify-center space-x-4 md:space-x-8">
              <NavLink to="/" className={({isActive}) => `font-serif font-bold text-sm uppercase tracking-widest ${isActive ? 'underline decoration-2 underline-offset-4' : 'hover:underline decoration-1 underline-offset-4'}`} end>Temporary Email</NavLink>
              <NavLink to="/global-briefing" className={({isActive}) => `font-serif font-bold text-sm uppercase tracking-widest ${isActive ? 'underline decoration-2 underline-offset-4' : 'hover:underline decoration-1 underline-offset-4'}`}>Global Briefing</NavLink>
              <NavLink to="/test-lab" className={({isActive}) => `font-serif font-bold text-sm uppercase tracking-widest ${isActive ? 'underline decoration-2 underline-offset-4' : 'hover:underline decoration-1 underline-offset-4'}`}>Card Testing Lab</NavLink>
              <NavLink to="/code-studio" className={({isActive}) => `font-serif font-bold text-sm uppercase tracking-widest ${isActive ? 'underline decoration-2 underline-offset-4' : 'hover:underline decoration-1 underline-offset-4'}`}>QR & Barcode Studio</NavLink>
              <NavLink to="/data-generator" className={({isActive}) => `font-serif font-bold text-sm uppercase tracking-widest ${isActive ? 'underline decoration-2 underline-offset-4' : 'hover:underline decoration-1 underline-offset-4'}`}>Public Records</NavLink>
              <NavLink to="/earn-center" className={({isActive}) => `font-serif font-bold text-sm uppercase tracking-widest ${isActive ? 'underline decoration-2 underline-offset-4' : 'hover:underline decoration-1 underline-offset-4'}`}>Earn Credits</NavLink>
            </nav>
          </div>
          <NewspaperClock />
        </div>
      </header>
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
        
        <aside className="hidden lg:block w-[300px] shrink-0 print:hidden">
          <div className="sticky top-28">
            <AdContainer 
              slotId={monetizationConfig.SIDEBAR_AD_SLOT_ID}
              className="w-[300px] h-[600px]" 
              label="Sponsorship"
              responsive={false}
            />
          </div>
        </aside>
      </main>
      
      <footer className="border-t-4 border-ink mt-12 py-8 text-center bg-white/30 print:hidden">
        <div className="max-w-4xl mx-auto px-4">
          <AdContainer className="h-24 w-full mb-8" format="auto" />
          
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-6">
              <NavLink to="/privacy" className="font-serif text-sm uppercase tracking-widest hover:underline decoration-1 underline-offset-4">Privacy Policy</NavLink>
              <span className="text-ink/30">•</span>
              <NavLink to="/terms" className="font-serif text-sm uppercase tracking-widest hover:underline decoration-1 underline-offset-4">Terms of Service</NavLink>
            </div>
            <p className="font-serif text-xs uppercase tracking-widest opacity-70">© 2026 OmniVault - A Sri Lankan Digital Exchange Publication.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
