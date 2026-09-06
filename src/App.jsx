import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AnalysisPreview from "./components/AnalysisPreview";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import AnalysisDashboard from "./components/AnalysisDashboard";

function App() {
  const [analysis, setAnalysis] = useState(null);

  return (
    <div className="min-h-screen bg-[#05070d]">
      <Navbar />

      <Hero onAnalysis={setAnalysis} />

      <AnalysisDashboard analysis={analysis} />

      {!analysis && <AnalysisPreview />}
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;