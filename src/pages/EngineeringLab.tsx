import React, { useState } from "react";
import { motion } from "motion/react";
import { AdContainer } from "../components/AdContainer";

export function EngineeringLab() {
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");

  const calculateOhmsLaw = () => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);
    const r = parseFloat(resistance);

    if (!isNaN(v) && !isNaN(i) && isNaN(r)) {
      setResistance((v / i).toFixed(2));
    } else if (!isNaN(v) && !isNaN(r) && isNaN(i)) {
      setCurrent((v / r).toFixed(2));
    } else if (!isNaN(i) && !isNaN(r) && isNaN(v)) {
      setVoltage((i * r).toFixed(2));
    }
  };

  const clearOhmsLaw = () => {
    setVoltage("");
    setCurrent("");
    setResistance("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="border-b-4 border-ink pb-6 mb-8 text-center relative">
        <h1 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tighter mb-2 mt-4 text-blue-600">Engineering Lab</h1>
        <p className="font-serif italic text-xl">Precision Tools & Calculators</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-8">
          
          {/* Ohm's Law Calculator */}
          <div className="border border-ink p-6 bg-white/50 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
            <h2 className="text-2xl font-black font-serif uppercase tracking-tighter mb-4">Ohm's Law Calculator</h2>
            <p className="font-sans text-sm text-ink/80 mb-6">Enter any two values to calculate the third.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block font-serif text-sm font-bold uppercase tracking-widest mb-2">Voltage (V)</label>
                <input 
                  type="number" 
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value)}
                  className="w-full border-2 border-ink p-2 font-mono bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Volts"
                />
              </div>
              <div>
                <label className="block font-serif text-sm font-bold uppercase tracking-widest mb-2">Current (I)</label>
                <input 
                  type="number" 
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  className="w-full border-2 border-ink p-2 font-mono bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Amps"
                />
              </div>
              <div>
                <label className="block font-serif text-sm font-bold uppercase tracking-widest mb-2">Resistance (R)</label>
                <input 
                  type="number" 
                  value={resistance}
                  onChange={(e) => setResistance(e.target.value)}
                  className="w-full border-2 border-ink p-2 font-mono bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Ohms"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={calculateOhmsLaw}
                className="bg-ink text-white font-serif font-bold uppercase tracking-widest px-6 py-2 hover:bg-blue-600 transition-colors"
              >
                Calculate
              </button>
              <button 
                onClick={clearOhmsLaw}
                className="border-2 border-ink text-ink font-serif font-bold uppercase tracking-widest px-6 py-2 hover:bg-ink/5 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="my-8 text-center text-xs font-mono text-ink/50 border border-dashed border-ink/30 p-4">
            AD_SPACE_OPTIMIZED
          </div>

          {/* Article */}
          <div className="border border-ink p-6 bg-white/50 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
            <h2 className="text-2xl font-black font-serif uppercase tracking-tighter mb-4 text-blue-600">
              Precision Design: Moving from Theory to the Breadboard
            </h2>
            <p className="font-sans text-lg leading-relaxed text-ink/90 mb-4">
              Theoretical calculations often assume ideal components, but real-world engineering requires accounting for tolerances. A 1kΩ resistor with a 5% tolerance can measure anywhere from 950Ω to 1050Ω. In sensitive analog circuits, this margin of error can drastically shift operating points. Similarly, electrolytic capacitors can have tolerances as loose as ±20%, affecting timing circuits and filter cutoffs. Always measure critical components before soldering and design with worst-case scenarios in mind.
            </p>
            <div className="bg-red-100 border-l-4 border-red-600 p-4 mt-4">
              <p className="font-serif text-sm font-bold text-red-800">
                Safety Warning: How NOT to use: Not for life-critical, medical, or aerospace hardware without manual verification.
              </p>
            </div>
          </div>

          {/* Placeholder for other tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="border border-ink p-6 bg-white/50 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)] opacity-70">
                <h3 className="text-xl font-black font-serif uppercase tracking-tighter mb-2">Resistor Color Code</h3>
                <p className="font-sans text-sm text-ink/80 mb-4">Tool currently undergoing calibration.</p>
                <div className="h-24 bg-ink/5 border border-ink/20 flex items-center justify-center font-mono text-xs">OFFLINE</div>
             </div>
             <div className="border border-ink p-6 bg-white/50 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)] opacity-70">
                <h3 className="text-xl font-black font-serif uppercase tracking-tighter mb-2">Capacitor Code</h3>
                <p className="font-sans text-sm text-ink/80 mb-4">Tool currently undergoing calibration.</p>
                <div className="h-24 bg-ink/5 border border-ink/20 flex items-center justify-center font-mono text-xs">OFFLINE</div>
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
