import { homepageData } from "../data/homepage";

export const Journey = () => {
  const { journey } = homepageData;

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-green-600 via-[#023e8a] to-green-200 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {journey.headline}
              </h2>
              <p className="text-xl text-green-50">{journey.subheadline}</p>
            </div>

            <div className="space-y-6">
              {journey.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-3 items-start sm:flex-row sm:gap-5   flex-col"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center font-bold text-2xl text-white group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-green-50 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={journey.image}
                alt="Peaceful wellness lifestyle at sunrise"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
