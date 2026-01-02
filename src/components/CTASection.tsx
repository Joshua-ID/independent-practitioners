import { Link } from "react-router-dom";
import { homepageData } from "../data/homepage";
import { ArrowRight, CheckCircle } from "lucide-react";

export const CTASection = () => {
  const { cta } = homepageData;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={cta.image}
                alt="Cozy journal and coffee mindfulness setting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {cta.headline}
              </h2>
              <p className="text-xl text-gray-600">{cta.subheadline}</p>
            </div>

            <div className="space-y-4">
              {cta.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle
                    className="text-green-600 flex-shrink-0 mt-1"
                    size={24}
                  />
                  <p className="text-lg text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/book"
                className="group bg-green-600 text-white px-8 py-4 rounded-full active:bg-green-800 active:scale-95 transition-all shadow-lg hover:shadow-xl font-semibold flex items-center justify-center gap-2 min-h-[44px]"
              >
                {cta.primaryCTA}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                to="/contact"
                className="bg-white text-green-700 px-8 py-4 rounded-full active:bg-green-50 active:scale-95 transition-all shadow-md font-semibold border-2 border-green-600 min-h-[44px]"
              >
                {cta.secondaryCTA}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
