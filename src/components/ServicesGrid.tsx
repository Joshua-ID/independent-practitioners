import { homepageData } from "../data/homepage";

const iconMap: Record<string, string> = {
  user: "user",
  "heart-handshake": "heart-check",
  sparkles: "star",
  shield: "shield-01",
  compass: "label",
  "users-round": "user-group",
};

export const ServicesGrid = () => {
  const { services } = homepageData;

  return (
    <section
      id="services"
      className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-green-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Specialized Services
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive therapy solutions designed to support every aspect of
            your wellbeing
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:gap-8 gap-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-3 sm:p-5 md:p-8 rounded-2xl shadow-md active:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-95 sm:hover:scale-100 border-2 border-transparent hover:border-green-600 min-h-[280px] flex flex-col"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-violet-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform min-h-[44px] min-w-[44px]">
                <i
                  className={`hgi-stroke hgi-${
                    iconMap[service.icon]
                  } text-green-600 text-3xl`}
                ></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
