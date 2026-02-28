import React, { useState } from "react";
import { Download, Printer, RefreshCw, CheckSquare, Square, Copy, CheckCircle2, Trash2 } from "lucide-react";
import { AdContainer } from "../components/AdContainer";

const AVAILABLE_FIELDS = [
  { id: "fullName", label: "Full Name" },
  { id: "email", label: "Email Address" },
  { id: "phone", label: "Phone Number" },
  { id: "address", label: "Address" },
  { id: "company", label: "Company" },
  { id: "jobTitle", label: "Job Title" },
  { id: "uuid", label: "UUID" },
];

const MOCK_DATA = {
  firstNames: ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"],
  lastNames: ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"],
  domains: ["example.com", "test.net", "demo.org", "mail.com", "omnivault.app", "fake.co"],
  streets: ["Main St", "Oak Ave", "Pine Ln", "Maple Dr", "Cedar Ct", "Elm St", "Washington Blvd", "Lake Rd", "Hill St", "Park Ave"],
  cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"],
  companies: ["Acme Corp", "Globex", "Soylent", "Initech", "Umbrella Corp", "Massive Dynamic", "Stark Industries", "Wayne Enterprises", "Cyberdyne", "Hooli"],
  jobs: ["Engineer", "Manager", "Director", "Analyst", "Consultant", "Designer", "Developer", "Architect", "Specialist", "Coordinator"]
};

export function DataGenerator() {
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
      
      if (selectedFields.includes("fullName")) {
        row.fullName = `${firstName} ${lastName}`;
      }
      if (selectedFields.includes("email")) {
        const domain = MOCK_DATA.domains[Math.floor(Math.random() * MOCK_DATA.domains.length)];
        row.email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@${domain}`;
      }
      if (selectedFields.includes("phone")) {
        row.phone = `(${Math.floor(Math.random() * 800) + 200}) ${Math.floor(Math.random() * 800) + 200}-${Math.floor(Math.random() * 9000) + 1000}`;
      }
      if (selectedFields.includes("address")) {
        const street = MOCK_DATA.streets[Math.floor(Math.random() * MOCK_DATA.streets.length)];
        const city = MOCK_DATA.cities[Math.floor(Math.random() * MOCK_DATA.cities.length)];
        row.address = `${Math.floor(Math.random() * 9999) + 1} ${street}, ${city}`;
      }
      if (selectedFields.includes("company")) {
        row.company = MOCK_DATA.companies[Math.floor(Math.random() * MOCK_DATA.companies.length)];
      }
      if (selectedFields.includes("jobTitle")) {
        row.jobTitle = MOCK_DATA.jobs[Math.floor(Math.random() * MOCK_DATA.jobs.length)];
      }
      if (selectedFields.includes("uuid")) {
        row.uuid = crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
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
    link.download = `omnivault-data.${extension}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const printData = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      <div className="border-b-4 border-ink pb-6 mb-8 text-center print:hidden">
        <h1 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tighter mb-2">Public Records</h1>
        <p className="font-serif italic text-xl">Synthetic Identity Forge</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:block">
        <div className="lg:col-span-1 space-y-8 print:hidden">
          <div className="border-newspaper p-6 bg-white/50">
            <h2 className="text-2xl font-serif font-bold uppercase tracking-widest mb-6 border-b border-ink pb-2">Data Parameters</h2>
            
            <div className="space-y-4 mb-8">
              <h3 className="font-serif font-bold text-sm uppercase tracking-widest text-ink/70">Select Fields</h3>
              <div className="space-y-2">
                {AVAILABLE_FIELDS.map(field => (
                  <button
                    key={field.id}
                    onClick={() => toggleField(field.id)}
                    className="w-full flex items-center gap-3 p-2 hover:bg-ink/5 transition-colors text-left"
                  >
                    {selectedFields.includes(field.id) ? (
                      <CheckSquare className="text-ink" size={20} />
                    ) : (
                      <Square className="text-ink/40" size={20} />
                    )}
                    <span className="font-mono text-sm">{field.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <label className="block font-serif font-bold text-sm uppercase tracking-widest text-ink/70">
                Number of Records
              </label>
              <input
                type="number"
                min="1"
                max="1000"
                value={rowCount}
                onChange={(e) => setRowCount(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-full bg-transparent border border-ink px-4 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-ink"
              />
            </div>

            <button
              onClick={generateRandomData}
              disabled={selectedFields.length === 0}
              className="w-full ink-press border-newspaper-thick px-6 py-4 font-serif font-black uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} />
              Generate Records
            </button>
          </div>
          
          <AdContainer className="h-[250px] w-full" />
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="border-newspaper p-6 bg-white/50 min-h-[600px] flex flex-col print:border-none print:bg-transparent print:p-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-ink pb-4 gap-4 print:hidden">
              <h2 className="text-2xl font-serif font-bold uppercase tracking-widest">Generated Output</h2>
              
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value as any)}
                  className="bg-transparent border border-ink font-serif px-3 py-2 focus:outline-none text-sm"
                >
                  <option value="csv">CSV Format</option>
                  <option value="json">JSON Format</option>
                  <option value="txt">Text Format</option>
                </select>
                <button
                  onClick={copyData}
                  disabled={generatedData.length === 0}
                  className="ink-press border-newspaper px-4 py-2 font-serif font-bold uppercase tracking-widest text-xs flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  onClick={exportData}
                  disabled={generatedData.length === 0}
                  className="ink-press border-newspaper px-4 py-2 font-serif font-bold uppercase tracking-widest text-xs flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download size={14} />
                  Export
                </button>
                <button
                  onClick={printData}
                  disabled={generatedData.length === 0}
                  className="ink-press border-newspaper px-4 py-2 font-serif font-bold uppercase tracking-widest text-xs flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Printer size={14} />
                  Print
                </button>
                <button
                  onClick={() => setGeneratedData([])}
                  disabled={generatedData.length === 0}
                  className="ink-press border-newspaper px-4 py-2 font-serif font-bold uppercase tracking-widest text-xs flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 size={14} />
                  Clear
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-x-auto">
              {generatedData.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      {selectedFields.map(fieldId => (
                        <th key={fieldId} className="border-b-2 border-ink py-3 px-4 font-serif font-bold uppercase tracking-widest text-xs whitespace-nowrap">
                          {AVAILABLE_FIELDS.find(f => f.id === fieldId)?.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {generatedData.map((row, idx) => (
                      <tr key={idx} className="border-b border-ink/20 hover:bg-ink/5 transition-colors">
                        {selectedFields.map(fieldId => (
                          <td key={fieldId} className="py-3 px-4 font-mono text-sm whitespace-nowrap">
                            {row[fieldId]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-ink/40 font-serif italic py-20 print:hidden">
                  <RefreshCw size={48} className="mb-4 opacity-20" />
                  <p>Configure parameters and generate records to view output.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
