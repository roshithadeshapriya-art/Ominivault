import React, { useState } from "react";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { AdContainer } from "../components/AdContainer";
import { QRCodeSVG } from "qrcode.react";
import Barcode from "react-barcode";
import { Download, Printer, RefreshCw, CheckSquare, Square, Copy, CheckCircle2, Trash2 } from "lucide-react";

// --- MOCK DATA FOR PERSONAL DATA GENERATOR ---
const AVAILABLE_FIELDS = [
  { id: "fullName", label: "Full Name" },
  { id: "email", label: "Email Address" },
  { id: "phone", label: "Phone Number" },
  { id: "address", label: "Address" },
  { id: "company", label: "Company" },
  { id: "jobTitle", label: "Job Title" },
  { id: "uuid", label: "UUID" },
  { id: "username", label: "Username" },
  { id: "password", label: "Password" },
  { id: "birthdate", label: "Birthdate" },
  { id: "gender", label: "Gender" },
  { id: "country", label: "Country" },
  { id: "state", label: "State" },
  { id: "zipCode", label: "ZIP Code" },
  { id: "creditCardNumber", label: "Credit Card Number" },
  { id: "creditCardIssuer", label: "Card Issuer" },
  { id: "cvv", label: "CVV" },
  { id: "ipAddress", label: "IP Address" },
  { id: "macAddress", label: "MAC Address" },
  { id: "website", label: "Website" },
  { id: "color", label: "Favorite Color" },
  { id: "currency", label: "Currency" },
  { id: "bitcoinAddress", label: "Bitcoin Address" },
  { id: "vehicle", label: "Vehicle" },
  { id: "department", label: "Department" },
  { id: "product", label: "Product" },
  { id: "isbn", label: "ISBN" },
  { id: "iban", label: "IBAN" },
  { id: "passportNo", label: "Passport No" },
  { id: "ssn", label: "SSN" },
];

const MOCK_DATA = {
  firstNames: ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"],
  lastNames: ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"],
  domains: ["example.com", "test.net", "demo.org", "mail.com", "omnivault.app", "fake.co"],
  streets: ["Main St", "Oak Ave", "Pine Ln", "Maple Dr", "Cedar Ct", "Elm St", "Washington Blvd", "Lake Rd", "Hill St", "Park Ave"],
  cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"],
  companies: ["Acme Corp", "Globex", "Soylent", "Initech", "Umbrella Corp", "Massive Dynamic", "Stark Industries", "Wayne Enterprises", "Cyberdyne", "Hooli"],
  jobs: ["Engineer", "Manager", "Director", "Analyst", "Consultant", "Designer", "Developer", "Architect", "Specialist", "Coordinator"],
  countries: ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Japan", "Brazil", "India", "South Africa"],
  states: ["California", "Texas", "New York", "Florida", "Illinois", "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"],
  genders: ["Male", "Female", "Non-binary", "Prefer not to say"],
  cardIssuers: ["Visa", "MasterCard", "American Express", "Discover", "JCB"],
  colors: ["Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Black", "White", "Gray", "Pink"],
  currencies: ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "BRL"],
  vehicles: ["Toyota Camry", "Honda Civic", "Ford F-150", "Tesla Model 3", "Chevrolet Silverado", "BMW 3 Series", "Audi A4", "Mercedes-Benz C-Class"],
  departments: ["Sales", "Marketing", "Engineering", "Human Resources", "Finance", "Customer Support", "Legal", "Operations"],
  products: ["Laptop", "Smartphone", "Headphones", "Monitor", "Keyboard", "Mouse", "Tablet", "Smartwatch", "Camera", "Speaker"]
};

export function DataForge() {
  const [qrText, setQrText] = useState("https://thetemporary.store");
  const [barcodeText, setBarcodeText] = useState("123456789012");
  const [copiedQr, setCopiedQr] = useState(false);
  const [copiedBarcode, setCopiedBarcode] = useState(false);

  const copyQr = () => {
    navigator.clipboard.writeText(qrText);
    setCopiedQr(true);
    setTimeout(() => setCopiedQr(false), 2000);
  };

  const exportQr = () => {
    const blob = new Blob([qrText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyBarcode = () => {
    navigator.clipboard.writeText(barcodeText);
    setCopiedBarcode(true);
    setTimeout(() => setCopiedBarcode(false), 2000);
  };

  const exportBarcode = () => {
    const blob = new Blob([barcodeText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "barcode.txt";
    a.click();
    URL.revokeObjectURL(url);
  };
  
  // Data Generator State
  const [selectedFields, setSelectedFields] = useState<string[]>(["fullName", "email", "phone"]);
  const [rowCount, setRowCount] = useState<number>(10);
  const [generatedData, setGeneratedData] = useState<any[]>([]);
  const [exportFormat, setExportFormat] = useState<"csv" | "json" | "txt">("csv");
  const [copied, setCopied] = useState(false);

  const toggleField = (fieldId: string) => {
    setSelectedFields(prev => 
      prev.includes(fieldId) 
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const generateRandomData = () => {
    if (selectedFields.length === 0) return;

    const newData = [];
    for (let i = 0; i < rowCount; i++) {
      const row: any = {};
      const firstName = MOCK_DATA.firstNames[Math.floor(Math.random() * MOCK_DATA.firstNames.length)];
      const lastName = MOCK_DATA.lastNames[Math.floor(Math.random() * MOCK_DATA.lastNames.length)];
      
      if (selectedFields.includes("fullName")) row.fullName = `${firstName} ${lastName}`;
      if (selectedFields.includes("email")) {
        const domain = MOCK_DATA.domains[Math.floor(Math.random() * MOCK_DATA.domains.length)];
        row.email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@${domain}`;
      }
      if (selectedFields.includes("phone")) row.phone = `(${Math.floor(Math.random() * 800) + 200}) ${Math.floor(Math.random() * 800) + 200}-${Math.floor(Math.random() * 9000) + 1000}`;
      if (selectedFields.includes("address")) {
        const street = MOCK_DATA.streets[Math.floor(Math.random() * MOCK_DATA.streets.length)];
        const city = MOCK_DATA.cities[Math.floor(Math.random() * MOCK_DATA.cities.length)];
        row.address = `${Math.floor(Math.random() * 9999) + 1} ${street}, ${city}`;
      }
      if (selectedFields.includes("company")) row.company = MOCK_DATA.companies[Math.floor(Math.random() * MOCK_DATA.companies.length)];
      if (selectedFields.includes("jobTitle")) row.jobTitle = MOCK_DATA.jobs[Math.floor(Math.random() * MOCK_DATA.jobs.length)];
      if (selectedFields.includes("uuid")) row.uuid = crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8); return v.toString(16); });
      if (selectedFields.includes("username")) row.username = `${firstName.toLowerCase()}${Math.floor(Math.random() * 9999)}`;
      if (selectedFields.includes("password")) row.password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      if (selectedFields.includes("birthdate")) row.birthdate = new Date(Date.now() - Math.random() * 1000000000000 - 500000000000).toISOString().split('T')[0];
      if (selectedFields.includes("gender")) row.gender = MOCK_DATA.genders[Math.floor(Math.random() * MOCK_DATA.genders.length)];
      if (selectedFields.includes("country")) row.country = MOCK_DATA.countries[Math.floor(Math.random() * MOCK_DATA.countries.length)];
      if (selectedFields.includes("state")) row.state = MOCK_DATA.states[Math.floor(Math.random() * MOCK_DATA.states.length)];
      if (selectedFields.includes("zipCode")) row.zipCode = Math.floor(Math.random() * 90000) + 10000;
      if (selectedFields.includes("creditCardNumber")) row.creditCardNumber = `${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`;
      if (selectedFields.includes("creditCardIssuer")) row.creditCardIssuer = MOCK_DATA.cardIssuers[Math.floor(Math.random() * MOCK_DATA.cardIssuers.length)];
      if (selectedFields.includes("cvv")) row.cvv = Math.floor(Math.random() * 900) + 100;
      if (selectedFields.includes("ipAddress")) row.ipAddress = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      if (selectedFields.includes("macAddress")) row.macAddress = Array.from({length: 6}, () => Math.floor(Math.random() * 255).toString(16).padStart(2, '0')).join(':');
      if (selectedFields.includes("website")) {
        const domain = MOCK_DATA.domains[Math.floor(Math.random() * MOCK_DATA.domains.length)];
        row.website = `https://www.${domain}`;
      }
      if (selectedFields.includes("color")) row.color = MOCK_DATA.colors[Math.floor(Math.random() * MOCK_DATA.colors.length)];
      if (selectedFields.includes("currency")) row.currency = MOCK_DATA.currencies[Math.floor(Math.random() * MOCK_DATA.currencies.length)];
      if (selectedFields.includes("bitcoinAddress")) row.bitcoinAddress = "1" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      if (selectedFields.includes("vehicle")) row.vehicle = MOCK_DATA.vehicles[Math.floor(Math.random() * MOCK_DATA.vehicles.length)];
      if (selectedFields.includes("department")) row.department = MOCK_DATA.departments[Math.floor(Math.random() * MOCK_DATA.departments.length)];
      if (selectedFields.includes("product")) row.product = MOCK_DATA.products[Math.floor(Math.random() * MOCK_DATA.products.length)];
      if (selectedFields.includes("isbn")) row.isbn = `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 90000) + 10000}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 10)}`;
      if (selectedFields.includes("iban")) row.iban = `US${Math.floor(Math.random() * 90) + 10}12345678901234567890`;
      if (selectedFields.includes("passportNo")) row.passportNo = `P${Math.floor(Math.random() * 9000000) + 1000000}`;
      if (selectedFields.includes("ssn")) row.ssn = `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 9000) + 1000}`;
      
      newData.push(row);
    }
    setGeneratedData(newData);
  };

  const generateExportContent = (format: string) => {
    let content = "";
    if (format === "csv") {
      const headers = selectedFields.map(id => AVAILABLE_FIELDS.find(f => f.id === id)?.label || id);
      content = headers.join(",") + "\n";
      content += generatedData.map(row => 
        selectedFields.map(field => `"${row[field] || ''}"`).join(",")
      ).join("\n");
    } else if (format === "json") {
      content = JSON.stringify(generatedData, null, 2);
    } else if (format === "txt") {
      const headers = selectedFields.map(id => AVAILABLE_FIELDS.find(f => f.id === id)?.label || id);
      content = headers.join("\t") + "\n";
      content += generatedData.map(row => 
        selectedFields.map(field => row[field] || '').join("\t")
      ).join("\n");
    }
    return content;
  };

  const copyData = () => {
    if (generatedData.length === 0) return;
    const content = generateExportContent(exportFormat);
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportData = () => {
    if (generatedData.length === 0) return;

    const content = generateExportContent(exportFormat);
    let mimeType = "";
    let extension = exportFormat;

    if (exportFormat === "csv") {
      mimeType = "text/csv;charset=utf-8;";
    } else if (exportFormat === "json") {
      mimeType = "application/json;charset=utf-8;";
    } else if (exportFormat === "txt") {
      mimeType = "text/plain;charset=utf-8;";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `data-forge.${extension}`;
    link.click();
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
        <title>The Temporary | Data Forge</title>
        <meta name="description" content="Generate QR codes, barcodes, and synthetic personal data for testing and development." />
      </Helmet>
      
      <div className="border-b-4 border-ink pb-6 mb-8 text-center relative">
        <h1 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tighter mb-2 mt-4 text-ink">Data Forge</h1>
        <p className="font-serif italic text-xl">Synthetic Data & Code Generation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-8">
          
          {/* Tool 1: QR Code Generator */}
          <div className="border border-ink p-6 bg-white/50 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
            <h2 className="text-2xl font-black font-serif uppercase tracking-tighter mb-4">QR Code Generator</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 w-full">
                <label className="block font-serif text-sm font-bold uppercase tracking-widest mb-2">Data / URL</label>
                <input 
                  type="text" 
                  value={qrText}
                  onChange={(e) => setQrText(e.target.value)}
                  className="w-full border-2 border-ink p-2 font-mono bg-white focus:outline-none focus:ring-2 focus:ring-ink mb-4"
                  placeholder="Enter text or URL"
                />
              </div>
              <div className="bg-white p-4 border-2 border-ink inline-block">
                <QRCodeSVG value={qrText || " "} size={128} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-end border-t-2 border-ink/20 pt-4 mt-4">
              <button onClick={() => setQrText("")} className="border-2 border-ink px-3 py-1 font-serif font-bold uppercase tracking-widest text-xs flex items-center gap-1 hover:bg-ink hover:text-white transition-colors">
                <Trash2 size={12} /> Clear
              </button>
              <button onClick={copyQr} className="border-2 border-ink px-3 py-1 font-serif font-bold uppercase tracking-widest text-xs flex items-center gap-1 hover:bg-ink hover:text-white transition-colors">
                {copiedQr ? <CheckCircle2 size={12} /> : <Copy size={12} />} {copiedQr ? "Copied" : "Copy"}
              </button>
              <button onClick={exportQr} className="border-2 border-ink px-3 py-1 font-serif font-bold uppercase tracking-widest text-xs flex items-center gap-1 hover:bg-ink hover:text-white transition-colors">
                <Download size={12} /> Export
              </button>
            </div>
          </div>

          {/* Tool 2: Barcode Generator */}
          <div className="border border-ink p-6 bg-white/50 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
            <h2 className="text-2xl font-black font-serif uppercase tracking-tighter mb-4">Barcode Generator</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 w-full">
                <label className="block font-serif text-sm font-bold uppercase tracking-widest mb-2">Barcode Data (CODE128)</label>
                <input 
                  type="text" 
                  value={barcodeText}
                  onChange={(e) => setBarcodeText(e.target.value)}
                  className="w-full border-2 border-ink p-2 font-mono bg-white focus:outline-none focus:ring-2 focus:ring-ink mb-4"
                  placeholder="Enter barcode data"
                />
              </div>
              <div className="bg-white p-4 border-2 border-ink inline-block overflow-hidden max-w-full">
                {barcodeText ? <Barcode value={barcodeText} width={2} height={60} displayValue={true} /> : <div className="h-[60px] flex items-center justify-center text-ink/50 font-mono text-sm">Enter data</div>}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-end border-t-2 border-ink/20 pt-4 mt-4">
              <button onClick={() => setBarcodeText("")} className="border-2 border-ink px-3 py-1 font-serif font-bold uppercase tracking-widest text-xs flex items-center gap-1 hover:bg-ink hover:text-white transition-colors">
                <Trash2 size={12} /> Clear
              </button>
              <button onClick={copyBarcode} className="border-2 border-ink px-3 py-1 font-serif font-bold uppercase tracking-widest text-xs flex items-center gap-1 hover:bg-ink hover:text-white transition-colors">
                {copiedBarcode ? <CheckCircle2 size={12} /> : <Copy size={12} />} {copiedBarcode ? "Copied" : "Copy"}
              </button>
              <button onClick={exportBarcode} className="border-2 border-ink px-3 py-1 font-serif font-bold uppercase tracking-widest text-xs flex items-center gap-1 hover:bg-ink hover:text-white transition-colors">
                <Download size={12} /> Export
              </button>
            </div>
          </div>

          {/* Tool 3: Personal Data Generator */}
          <div className="border border-ink p-6 bg-white/50 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
            <h2 className="text-2xl font-black font-serif uppercase tracking-tighter mb-4">Personal Data Generator</h2>
            
            <div className="space-y-4 mb-6">
              <h3 className="font-serif font-bold text-sm uppercase tracking-widest text-ink/70">Select Fields</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-[200px] overflow-y-auto border border-ink/20 p-2 bg-white">
                {AVAILABLE_FIELDS.map(field => (
                  <button
                    key={field.id}
                    onClick={() => toggleField(field.id)}
                    className="flex items-center gap-2 p-1 hover:bg-ink/5 transition-colors text-left"
                  >
                    {selectedFields.includes(field.id) ? (
                      <CheckSquare className="text-ink shrink-0" size={16} />
                    ) : (
                      <Square className="text-ink/40 shrink-0" size={16} />
                    )}
                    <span className="font-mono text-xs truncate">{field.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="block font-serif font-bold text-sm uppercase tracking-widest text-ink/70 mb-2">
                  Number of Records
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={rowCount}
                  onChange={(e) => setRowCount(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-full bg-white border-2 border-ink px-4 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-ink"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={generateRandomData}
                  disabled={selectedFields.length === 0}
                  className="bg-ink text-white font-serif font-bold uppercase tracking-widest px-6 py-2 hover:bg-ink/80 transition-colors disabled:opacity-50 h-[44px] flex items-center gap-2"
                >
                  <RefreshCw size={16} /> Generate
                </button>
              </div>
            </div>

            {generatedData.length > 0 && (
              <div className="border-t-2 border-ink pt-4">
                <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                  <h3 className="font-serif font-bold text-sm uppercase tracking-widest">Output</h3>
                  <div className="flex gap-2">
                    <select
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value as any)}
                      className="bg-white border-2 border-ink font-mono px-2 py-1 focus:outline-none text-xs"
                    >
                      <option value="csv">CSV</option>
                      <option value="json">JSON</option>
                      <option value="txt">TXT</option>
                    </select>
                    <button onClick={copyData} className="border-2 border-ink px-3 py-1 font-serif font-bold uppercase tracking-widest text-xs flex items-center gap-1 hover:bg-ink hover:text-white transition-colors">
                      {copied ? <CheckCircle2 size={12} /> : <Copy size={12} />} {copied ? "Copied" : "Copy"}
                    </button>
                    <button onClick={exportData} className="border-2 border-ink px-3 py-1 font-serif font-bold uppercase tracking-widest text-xs flex items-center gap-1 hover:bg-ink hover:text-white transition-colors">
                      <Download size={12} /> Export
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto border border-ink bg-white max-h-[300px]">
                  <table className="w-full text-left border-collapse text-xs font-mono">
                    <thead className="sticky top-0 bg-ink text-white">
                      <tr>
                        {selectedFields.map(fieldId => (
                          <th key={fieldId} className="py-2 px-3 whitespace-nowrap">
                            {AVAILABLE_FIELDS.find(f => f.id === fieldId)?.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {generatedData.map((row, idx) => (
                        <tr key={idx} className="border-b border-ink/20 hover:bg-ink/5">
                          {selectedFields.map(fieldId => (
                            <td key={fieldId} className="py-2 px-3 whitespace-nowrap">
                              {row[fieldId]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="my-8 text-center text-xs font-mono text-ink/50 border border-dashed border-ink/30 p-4">
            AD_SPACE_OPTIMIZED
          </div>

          {/* Article */}
          <div className="border border-ink p-6 bg-white/50 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
            <h2 className="text-2xl font-black font-serif uppercase tracking-tighter mb-4 text-ink">
              The Ethics of Synthetic Data
            </h2>
            <p className="font-sans text-lg leading-relaxed text-ink/90 mb-4">
              In modern software development, testing with real user data is a significant privacy risk and often a violation of regulations like GDPR or CCPA. Synthetic data provides a mathematically and structurally accurate alternative without exposing personally identifiable information (PII). By generating realistic but entirely fake names, addresses, and financial details, engineers can stress-test databases, validate input forms, and train machine learning models safely.
            </p>
            <p className="font-sans text-lg leading-relaxed text-ink/90 mb-4">
              However, the generation of synthetic data must be handled responsibly. It should never be used to deceive systems, bypass verification protocols, or create fraudulent identities. The tools provided here—including QR and Barcode generators—are strictly for development, testing, and educational purposes.
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
