import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AnalysisPreview from "./components/AnalysisPreview";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-[#05070d]">
      <Navbar />
      <Hero/>
      <AnalysisPreview/>
      <Features/>
      <HowItWorks/>
      <CTA/>
      <Footer/>
    </div>
  );
}

export default App;