import { homepageData } from "../data/homepage";
import { ArrowRight, CheckCircle } from "lucide-react";

export const Hero = () => {
  const { hero } = homepageData;

  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 py-16 md:py-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-purple-700 shadow-sm">
              <CheckCircle size={16} className="text-purple-600" />
              {hero.trustSignal}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              {hero.headline}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              {hero.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-purple-600 text-white px-8 py-4 rounded-full active:bg-purple-800 active:scale-95 transition-all shadow-lg hover:shadow-xl font-semibold flex items-center justify-center gap-2 min-h-[44px]">
                {hero.primaryCTA}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button className="bg-white text-purple-700 px-8 py-4 rounded-full active:bg-purple-50 active:scale-95 transition-all shadow-md font-semibold border-2 border-purple-600 min-h-[44px]">
                {hero.secondaryCTA}
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={hero.image}
                alt="Serene therapy office with peaceful interior"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">500+</p>
                  <p className="text-sm text-gray-600">Clients Helped</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
