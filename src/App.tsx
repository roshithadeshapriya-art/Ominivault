import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import ReactGA from "react-ga4";
import { Layout } from "./components/Layout";
import { EarnCenter } from "./pages/EarnCenter";
import { TempMail } from "./pages/TempMail";
import { GlobalBriefing } from "./pages/GlobalBriefing";
import { TestLab } from "./pages/TestLab";
import { CodeStudio } from "./pages/CodeStudio";
import { DataGenerator } from "./pages/DataGenerator";
import { DataForge } from "./pages/DataForge";
import { LinguisticHub } from "./pages/LinguisticHub";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { AboutUs } from "./pages/AboutUs";
import { EngineeringLab } from "./pages/EngineeringLab";
import { Contact } from "./pages/Contact";
import { HelmetProvider } from "react-helmet-async";

ReactGA.initialize("G-HC28Z5E58K");

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AnalyticsTracker />
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TempMail />} />
          <Route path="global-briefing" element={<GlobalBriefing />} />
          <Route path="earn-center" element={<EarnCenter />} />
          <Route path="test-lab" element={<TestLab />} />
          <Route path="code-studio" element={<CodeStudio />} />
          <Route path="data-generator" element={<DataGenerator />} />
          <Route path="data-forge" element={<DataForge />} />
          <Route path="linguistic-hub" element={<LinguisticHub />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="engineering-lab" element={<EngineeringLab />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </HelmetProvider>
  );
}

