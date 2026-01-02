import { homepageData } from "../data/homepage";

const iconMap: Record<string, string> = {
  "badge-check": "checkmark-badge-01",
  calendar: "calendar-01",
  heart: "favourite",
  "shield-check": "security-check",
  "book-open": "book-open-01",
  users: "user-multiple",
};

export const WhyChooseUs = () => {
  const { benefits } = homepageData;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Our Practice?
          </h2>
          <p className="text-xl text-gray-600">
            Experience compassionate, professional care tailored to your unique
            needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:gap-8 gap-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-violet-50 active:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[200px] flex flex-col"
            >
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform min-h-[44px] min-w-[44px]">
                <i
                  className={`hgi-stroke hgi-${
                    iconMap[benefit.icon]
                  } text-white text-2xl`}
                ></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
