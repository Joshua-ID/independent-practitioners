import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const CookiesAlert = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = Cookies.get("cookies-accepted");
    if (!cookiesAccepted) {
      const showTimer = setTimeout(() => setIsVisible(true), 1000);
      const hideTimer = setTimeout(() => setIsVisible(false), 5 * 60 * 1000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookies-accepted", "true", { expires: 30 });
    setIsVisible(false);
  };

  const handleDecline = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Cookie consent banner"
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-3xl border-t border-gray-200 shadow-lg transition-transform duration-500 ease-in-out transform ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl">
        <p className="text-sm text-black text-center sm:text-left">
          We use cookies to enhance your experience. By clicking “Accept”, you
          agree to our use of cookies.
          <a
            href="https://joshuaid.qzz.io"
            className="ml-1 underline text-green-600 hover:text-green-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleDecline}
            className="px-3 py-1.5 text-sm text-black hover:text-gray-900 font-medium rounded border border-gray-300 hover:bg-gray-50 transition"
            aria-label="Decline cookies"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white font-medium rounded shadow-sm transition"
            aria-label="Accept cookies"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiesAlert;
