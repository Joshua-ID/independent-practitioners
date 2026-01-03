import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { Journey } from "./components/Journey";
import { ServicesGrid } from "./components/ServicesGrid";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { BookingPage } from "./pages/BookingPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import PractitionersPage from "./pages/PractitionersPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CookiesAlert from "./components/CookiesAlert";

function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <WhyChooseUs />
        <Journey />
        <ServicesGrid />
        <CTASection />
        <CookiesAlert />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/practitioners" element={<PractitionersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
