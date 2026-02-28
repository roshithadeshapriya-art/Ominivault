import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import Barcode from "react-barcode";
import { Download, QrCode, AlignLeft, Copy, CheckCircle2, Trash2 } from "lucide-react";
import { AdContainer } from "../components/AdContainer";
import { jsPDF } from "jspdf";

export function CodeStudio() {
  const [text, setText] = useState("https://omnivault.app");
  const [activeTab, setActiveTab] = useState<"qr" | "barcode">("qr");
  const [downloadFormat, setDownloadFormat] = useState<"png" | "jpeg" | "svg" | "pdf">("png");
  const [copied, setCopied] = useState(false);
  
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const barcodeContainerRef = useRef<HTMLDivElement>(null);

  const downloadFile = () => {
    const container = activeTab === "qr" ? qrContainerRef.current : barcodeContainerRef.current;
    if (!container) return;
    
    const svg = container.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    
    if (downloadFormat === "svg") {
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.download = `omnivault-${activeTab}.svg`;
      downloadLink.href = url;
      downloadLink.click();
      URL.revokeObjectURL(url);
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.fillStyle = "#F9F7F2"; // Parchment background for the stamp
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        if (downloadFormat === "pdf") {
          const pdf = new jsPDF({
            orientation: img.width > img.height ? "landscape" : "portrait",
            unit: "px",
            format: [img.width, img.height]
          });
          const imgData = canvas.toDataURL("image/jpeg", 1.0);
          pdf.addImage(imgData, "JPEG", 0, 0, img.width, img.height);
          pdf.save(`omnivault-${activeTab}.pdf`);
        } else {
          const mimeType = downloadFormat === "jpeg" ? "image/jpeg" : "image/png";
          const fileData = canvas.toDataURL(mimeType);
          const downloadLink = document.createElement("a");
          downloadLink.download = `omnivault-${activeTab}.${downloadFormat}`;
          downloadLink.href = fileData;
          downloadLink.click();
        }
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const copyImage = () => {
    const container = activeTab === "qr" ? qrContainerRef.current : barcodeContainerRef.current;
    if (!container) return;
    
    const svg = container.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.fillStyle = "#F9F7F2";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            try {
              navigator.clipboard.write([
                new ClipboardItem({ "image/png": blob })
              ]).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              });
            } catch (err) {
              console.error("Clipboard API not supported or failed", err);
            }
          }
        }, "image/png");
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="space-y-8">
      <div className="border-b-4 border-ink pb-6 mb-8 text-center">
        <h1 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tighter mb-2">The Press</h1>
        <p className="font-serif italic text-xl">Optical Data Encoding</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="border-newspaper p-8 bg-white/50">
            <div className="space-y-8">
              <div>
                <label className="block font-serif font-bold uppercase tracking-widest text-sm mb-2">
                  Input Text or URL
                </label>
                <textarea
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text to encode..."
                  className="w-full bg-white border-newspaper px-4 py-3 font-mono focus:outline-none focus:ring-2 focus:ring-ink resize-y"
                />
              </div>

              <div className="flex border-newspaper bg-white">
                <button
                  onClick={() => setActiveTab("qr")}
                  className={`flex-1 py-3 font-serif font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-colors ${activeTab === "qr" ? "bg-ink text-parchment" : "hover:bg-ink/5"}`}
                >
                  <QrCode size={18} />
                  QR Matrix
                </button>
                <div className="w-px bg-ink"></div>
                <button
                  onClick={() => setActiveTab("barcode")}
                  className={`flex-1 py-3 font-serif font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-colors ${activeTab === "barcode" ? "bg-ink text-parchment" : "hover:bg-ink/5"}`}
                >
                  <AlignLeft size={18} />
                  Linear Barcode
                </button>
              </div>

              <div className="border-newspaper-thick bg-white p-12 flex flex-col items-center justify-center min-h-[400px] relative">
                {/* Stamp border effect */}
                <div className="absolute inset-2 border-2 border-dashed border-ink/30 pointer-events-none"></div>
                
                {text ? (
                  activeTab === "qr" ? (
                    <div className="bg-white p-4" ref={qrContainerRef}>
                      <QRCodeSVG
                        value={text}
                        size={240}
                        level="H"
                        includeMargin={true}
                        fgColor="#111111"
                        bgColor="#ffffff"
                      />
                    </div>
                  ) : (
                    <div className="bg-white p-4 overflow-hidden max-w-full" ref={barcodeContainerRef}>
                      <Barcode
                        value={text}
                        width={2}
                        height={120}
                        displayValue={true}
                        background="#ffffff"
                        lineColor="#111111"
                        margin={10}
                        font="monospace"
                      />
                    </div>
                  )
                ) : (
                  <div className="text-ink/30 flex flex-col items-center font-serif italic">
                    <QrCode size={64} className="mb-4" />
                    <p>Awaiting input for encoding...</p>
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4">
                <select
                  value={downloadFormat}
                  onChange={(e) => setDownloadFormat(e.target.value as any)}
                  className="bg-transparent border border-ink font-serif px-4 py-4 focus:outline-none text-sm uppercase tracking-widest font-bold"
                >
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="svg">SVG</option>
                  <option value="pdf">PDF</option>
                </select>
                <button
                  onClick={copyImage}
                  disabled={!text}
                  className="ink-press border-newspaper-thick px-8 py-4 font-serif font-black uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  onClick={downloadFile}
                  disabled={!text}
                  className="ink-press border-newspaper-thick px-8 py-4 font-serif font-black uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  <Download size={20} />
                  Export
                </button>
                <button
                  onClick={() => setText("")}
                  disabled={!text}
                  className="ink-press border-newspaper-thick px-6 py-4 font-serif font-black uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  <Trash2 size={20} />
                  Clear
                </button>
              </div>
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
