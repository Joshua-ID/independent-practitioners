import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-purple-700">
              Therapy Consultant
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <a
              href="#services"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Services
            </a>
            <a
              href="#practitioners"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Practitioners
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Contact
            </a>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 active:bg-purple-800 active:scale-95 transition-all shadow-md hover:shadow-lg min-h-[44px]">
              Book Your Session
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg active:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <a
              href="#services"
              className="block px-4 py-3 text-gray-700 active:bg-purple-50 rounded-lg min-h-[44px] flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#practitioners"
              className="block px-4 py-3 text-gray-700 active:bg-purple-50 rounded-lg min-h-[44px] flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Practitioners
            </a>
            <a
              href="#about"
              className="block px-4 py-3 text-gray-700 active:bg-purple-50 rounded-lg min-h-[44px] flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#contact"
              className="block px-4 py-3 text-gray-700 active:bg-purple-50 rounded-lg min-h-[44px] flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-full active:bg-purple-800 active:scale-95 transition-all min-h-[44px]">
              Book Your Session
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
