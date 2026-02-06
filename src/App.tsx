import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Problem from "./components/sections/Problem";
import HowItWorks from "./components/sections/HowItWorks";
import Offer from "./components/sections/Offer";
import Results from "./components/sections/Results";
import Testimonials from "./components/sections/Testimonials";
import WhoIsFor from "./components/sections/WhoIsFor";
import FAQ from "./components/sections/FAQ";
import FinalCTA from "./components/sections/FinalCTA";

export default function App() {
  return (
    <div className="min-h-screen bg-navy">
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Offer />
      <Results />
      <Testimonials />
      <WhoIsFor />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
