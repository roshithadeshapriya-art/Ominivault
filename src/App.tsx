import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "./components/Layout";
import { EarnCenter } from "./pages/EarnCenter";
import { TempMail } from "./pages/TempMail";
import { GlobalBriefing } from "./pages/GlobalBriefing";
import { TestLab } from "./pages/TestLab";
import { CodeStudio } from "./pages/CodeStudio";
import { DataGenerator } from "./pages/DataGenerator";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TempMail />} />
          <Route path="global-briefing" element={<GlobalBriefing />} />
          <Route path="earn-center" element={<EarnCenter />} />
          <Route path="test-lab" element={<TestLab />} />
          <Route path="code-studio" element={<CodeStudio />} />
          <Route path="data-generator" element={<DataGenerator />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

