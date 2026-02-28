import React from "react";
import { motion } from "motion/react";

export function AboutUs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto space-y-12 pb-16"
    >
      <header className="border-b-4 border-ink pb-8 mb-12">
        <h1 className="font-serif font-black text-5xl md:text-7xl tracking-tighter uppercase mb-4 text-blue-600">
          About Us
        </h1>
        <p className="font-serif text-xl md:text-2xl italic text-ink/80 leading-relaxed">
          The intersection of global news and technical precision.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="font-serif font-bold text-2xl uppercase tracking-widest border-b-2 border-ink/20 pb-2">
          The Vision
        </h2>
        <p className="font-sans text-lg leading-relaxed text-ink/90">
          The Temporary is a digital intersection for the modern engineer, blending global news with technical precision.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="font-serif font-bold text-2xl uppercase tracking-widest border-b-2 border-ink/20 pb-2">
          The Founder
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3 shrink-0">
            <div className="aspect-[3/4] bg-ink/5 border-2 border-ink p-2 relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src="https://picsum.photos/seed/bibi-engineer/600/800?grayscale" 
                alt="Roshitha - Founder of The Temporary" 
                className="w-full h-full object-cover filter contrast-125"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm border border-ink p-2 z-20">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-center">CODE NAME: Beekeeper</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            <p className="font-sans text-lg leading-relaxed text-ink/90">
              Founded by <strong className="font-serif font-bold text-blue-600">Roshitha</strong>, an Electronics Engineering student transitioning from Sri Lanka to China in March 2026.
            </p>
            <p className="font-sans text-lg leading-relaxed text-ink/90">
              Driven by a passion for hardware architecture and global connectivity, Roshitha recognized the need for a unified platform that caters to the specific daily requirements of an engineering student navigating international borders.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-serif font-bold text-2xl uppercase tracking-widest border-b-2 border-ink/20 pb-2">
          The Purpose
        </h2>
        <p className="font-sans text-lg leading-relaxed text-ink/90">
          This site was built to solve a personal need: tracking international news, local weather, and currency exchange (LKR to CNY) while providing essential engineering laboratory tools in one place.
        </p>
        <p className="font-sans text-lg leading-relaxed text-ink/90">
          What started as a personal dashboard has evolved into a public utility, offering temporary email services, data generation, and technical testing environments alongside curated global briefings.
        </p>
      </section>

      <section className="space-y-6 bg-ink text-white p-8 md:p-12 border-l-8 border-blue-600">
        <h2 className="font-serif font-bold text-2xl uppercase tracking-widest border-b-2 border-white/20 pb-2 mb-6">
          The Commitment
        </h2>
        <blockquote className="font-serif text-2xl md:text-3xl italic leading-snug">
          "We believe that information should be as precise as a circuit diagram and as timely as a breaking headline."
        </blockquote>
      </section>
    </motion.div>
  );
}
