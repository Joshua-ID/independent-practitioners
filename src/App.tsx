import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { Journey } from "./components/Journey";
import { ServicesGrid } from "./components/ServicesGrid";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <WhyChooseUs />
        <Journey />
        <ServicesGrid />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
