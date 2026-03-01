import React, { useState } from "react";
import { motion } from "motion/react";
import { AdContainer } from "../components/AdContainer";
import { Helmet } from "react-helmet-async";
import { Copy, CheckCircle2, Download, Trash2 } from "lucide-react";

export function EngineeringLab() {
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");
  const [copiedOhms, setCopiedOhms] = useState(false);

  const [band1, setBand1] = useState("1");
  const [band2, setBand2] = useState("0");
  const [multiplier, setMultiplier] = useState("100");
  const [tolerance, setTolerance] = useState("5");
  const [copiedResistor, setCopiedResistor] = useState(false);

  const calculateResistor = () => {
    const value = (parseInt(band1) * 10 + parseInt(band2)) * parseFloat(multiplier);
    let displayValue = value.toString();
    if (value >= 1000000) {
      displayValue = (value / 1000000).toFixed(1).replace(/\.0$/, '') + " MΩ";
    } else if (value >= 1000) {
      displayValue = (value / 1000).toFixed(1).replace(/\.0$/, '') + " kΩ";
    } else {
      displayValue = value.toString() + " Ω";
    }
    return `${displayValue} ±${tolerance}%`;
  };

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

  const copyOhmsLaw = () => {
    const text = `Ohm's Law Calculation:\nVoltage: ${voltage || '?'} V\nCurrent: ${current || '?'} A\nResistance: ${resistance || '?'} Ω`;
    navigator.clipboard.writeText(text);
    setCopiedOhms(true);
    setTimeout(() => setCopiedOhms(false), 2000);
  };

  const exportOhmsLaw = () => {
    const text = `Voltage,Current,Resistance\n${voltage || ''},${current || ''},${resistance || ''}`;
    const blob = new Blob([text], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ohms-law.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearResistor = () => {
    setBand1("1");
    setBand2("0");
    setMultiplier("100");
    setTolerance("5");
  };

  const copyResistor = () => {
    navigator.clipboard.writeText(`Resistor Value: ${calculateResistor()}`);
    setCopiedResistor(true);
    setTimeout(() => setCopiedResistor(false), 2000);
  };

  const exportResistor = () => {
    const text = `Band 1,Band 2,Multiplier,Tolerance,Value\n${band1},${band2},${multiplier},${tolerance},${calculateResistor()}`;
    const blob = new Blob([text], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resistor.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <Helmet>
        <title>The Temporary | Engineering Lab</title>
        <meta name="description" content="Precision engineering tools, Ohm's law calculators, and component references for hardware design and global transition." />
      </Helmet>
      <div className="border-b-4 border-ink pb-6 mb-8 text-center relative">
        <h1 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tighter mb-2 mt-4 text-ink">Engineering Lab</h1>
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
                  className="w-full border-2 border-ink p-2 font-mono bg-white focus:outline-none focus:ring-2 focus:ring-ink"
                  placeholder="Volts"
                />
              </div>
              <div>
                <label className="block font-serif text-sm font-bold uppercase tracking-widest mb-2">Current (I)</label>
                <input 
                  type="number" 
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  className="w-full border-2 border-ink p-2 font-mono bg-white focus:outline-none focus:ring-2 focus:ring-ink"
                  placeholder="Amps"
                />
              </div>
              <div>
                <label className="block font-serif text-sm font-bold uppercase tracking-widest mb-2">Resistance (R)</label>
                <input 
                  type="number" 
                  value={resistance}
                  onChange={(e) => setResistance(e.target.value)}
                  className="w-full border-2 border-ink p-2 font-mono bg-white focus:outline-none focus:ring-2 focus:ring-ink"
                  placeholder="Ohms"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center justify-between border-t-2 border-ink/20 pt-4">
              <button 
                onClick={calculateOhmsLaw}
                className="bg-ink text-white font-serif font-bold uppercase tracking-widest px-6 py-2 hover:bg-ink/80 transition-colors"
              >
                Calculate
              </button>
              <div className="flex flex-wrap gap-2">
                <button onClick={clearOhmsLaw} className="border-2 border-ink px-3 py-1 font-serif font-bold uppercase tracking-widest text-xs flex items-center gap-1 hover:bg-ink hover:text-white transition-colors">
                  <Trash2 size={12} /> Clear
                </button>
                <button onClick={copyOhmsLaw} className="border-2 border-ink px-3 py-1 font-serif font-bold uppercase tracking-widest text-xs flex items-center gap-1 hover:bg-ink hover:text-white transition-colors">
                  {copiedOhms ? <CheckCircle2 size={12} /> : <Copy size={12} />} {copiedOhms ? "Copied" : "Copy"}
                </button>
                <button onClick={exportOhmsLaw} className="border-2 border-ink px-3 py-1 font-serif font-bold uppercase tracking-widest text-xs flex items-center gap-1 hover:bg-ink hover:text-white transition-colors">
                  <Download size={12} /> Export
                </button>
              </div>
            </div>
          </div>

          {/* Resistor Color Code Calculator */}
          <div className="border border-ink p-6 bg-white/50 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
            <h3 className="text-xl font-black font-serif uppercase tracking-tighter mb-2">Resistor Color Code (4-Band)</h3>
            <p className="font-sans text-sm text-ink/80 mb-4">Select colors to determine resistance value.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block font-serif text-xs font-bold uppercase tracking-widest mb-2">Band 1</label>
                <select 
                  value={band1}
                  onChange={(e) => setBand1(e.target.value)}
                  className="w-full border-2 border-ink p-2 font-mono text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ink"
                >
                  <option value="0">Black (0)</option>
                  <option value="1">Brown (1)</option>
                  <option value="2">Red (2)</option>
                  <option value="3">Orange (3)</option>
                  <option value="4">Yellow (4)</option>
                  <option value="5">Green (5)</option>
                  <option value="6">Blue (6)</option>
                  <option value="7">Violet (7)</option>
                  <option value="8">Gray (8)</option>
                  <option value="9">White (9)</option>
                </select>
              </div>
              <div>
                <label className="block font-serif text-xs font-bold uppercase tracking-widest mb-2">Band 2</label>
                <select 
                  value={band2}
                  onChange={(e) => setBand2(e.target.value)}
                  className="w-full border-2 border-ink p-2 font-mono text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ink"
                >
                  <option value="0">Black (0)</option>
                  <option value="1">Brown (1)</option>
                  <option value="2">Red (2)</option>
                  <option value="3">Orange (3)</option>
                  <option value="4">Yellow (4)</option>
                  <option value="5">Green (5)</option>
                  <option value="6">Blue (6)</option>
                  <option value="7">Violet (7)</option>
                  <option value="8">Gray (8)</option>
                  <option value="9">White (9)</option>
                </select>
              </div>
              <div>
                <label className="block font-serif text-xs font-bold uppercase tracking-widest mb-2">Multiplier</label>
                <select 
                  value={multiplier}
                  onChange={(e) => setMultiplier(e.target.value)}
                  className="w-full border-2 border-ink p-2 font-mono text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ink"
                >
                  <option value="1">Black (x1)</option>
                  <option value="10">Brown (x10)</option>
                  <option value="100">Red (x100)</option>
                  <option value="1000">Orange (x1k)</option>
                  <option value="10000">Yellow (x10k)</option>
                  <option value="100000">Green (x100k)</option>
                  <option value="1000000">Blue (x1M)</option>
                  <option value="0.1">Gold (x0.1)</option>
                  <option value="0.01">Silver (x0.01)</option>
                </select>
              </div>
              <div>
                <label className="block font-serif text-xs font-bold uppercase tracking-widest mb-2">Tolerance</label>
                <select 
                  value={tolerance}
                  onChange={(e) => setTolerance(e.target.value)}
                  className="w-full border-2 border-ink p-2 font-mono text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ink"
                >
                  <option value="1">Brown (±1%)</option>
                  <option value="2">Red (±2%)</option>
                  <option value="0.5">Green (±0.5%)</option>
                  <option value="0.25">Blue (±0.25%)</option>
                  <option value="0.1">Violet (±0.1%)</option>
                  <option value="5">Gold (±5%)</option>
                  <option value="10">Silver (±10%)</option>
                </select>
              </div>
            </div>
            
            <div className="bg-ink/5 border-2 border-ink p-4 text-center mb-4">
              <div className="font-mono text-2xl font-bold">
                {calculateResistor()}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-end border-t-2 border-ink/20 pt-4">
              <button onClick={clearResistor} className="border-2 border-ink px-3 py-1 font-serif font-bold uppercase tracking-widest text-xs flex items-center gap-1 hover:bg-ink hover:text-white transition-colors">
                <Trash2 size={12} /> Clear
              </button>
              <button onClick={copyResistor} className="border-2 border-ink px-3 py-1 font-serif font-bold uppercase tracking-widest text-xs flex items-center gap-1 hover:bg-ink hover:text-white transition-colors">
                {copiedResistor ? <CheckCircle2 size={12} /> : <Copy size={12} />} {copiedResistor ? "Copied" : "Copy"}
              </button>
              <button onClick={exportResistor} className="border-2 border-ink px-3 py-1 font-serif font-bold uppercase tracking-widest text-xs flex items-center gap-1 hover:bg-ink hover:text-white transition-colors">
                <Download size={12} /> Export
              </button>
            </div>
          </div>

          <div className="my-8 text-center text-xs font-mono text-ink/50 border border-dashed border-ink/30 p-4">
            AD_SPACE_OPTIMIZED
          </div>

          {/* Article */}
          <div className="border border-ink p-6 bg-white/50 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
            <h2 className="text-2xl font-black font-serif uppercase tracking-tighter mb-4 text-ink">
              Precision Design: Moving from Theory to the Breadboard
            </h2>
            <p className="font-sans text-lg leading-relaxed text-ink/90 mb-4">
              Theoretical calculations often assume ideal components, but real-world engineering requires accounting for tolerances. A 1kΩ resistor with a 5% tolerance can measure anywhere from 950Ω to 1050Ω. In sensitive analog circuits, this margin of error can drastically shift operating points. Similarly, electrolytic capacitors can have tolerances as loose as ±20%, affecting timing circuits and filter cutoffs. Always measure critical components before soldering and design with worst-case scenarios in mind.
            </p>
            <div className="bg-ink/5 border-l-4 border-ink p-4 mt-4">
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
