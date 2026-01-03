import { practitioners } from "../data/booking";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Users, Award, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function PractitionersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lavender-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Users className="w-16 h-16" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our Expert Team
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Our licensed therapists and counselors are dedicated to supporting
              your mental health journey with compassion and expertise
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">6</div>
              <div className="text-sm text-gray-600">
                Licensed Practitioners
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">15+</div>
              <div className="text-sm text-gray-600">
                Years Average Experience
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">1000+</div>
              <div className="text-sm text-gray-600">Clients Helped</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">12+</div>
              <div className="text-sm text-gray-600">Specializations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Practitioners Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Practitioners
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each member of our team brings unique expertise and a genuine
              commitment to your wellbeing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practitioners.map((practitioner) => (
              <div
                key={practitioner.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={practitioner.image}
                  alt={practitioner.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-3 sm:p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {practitioner.name}
                  </h3>
                  <p className="text-green-600 font-medium mb-3">
                    {practitioner.title}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {practitioner.bio}
                  </p>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Award className="w-4 h-4 text-green-600" />
                      <span>{practitioner.experience} of experience</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Specializations:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {practitioner.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    to="/book"
                    className="block w-full text-center bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 active:bg-green-800 transition-colors"
                  >
                    Book Session
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Choose a practitioner that resonates with you and take the first
            step towards better mental health
          </p>
          <a
            href="/book"
            className="inline-block bg-white text-green-700 px-8 py-4 rounded-full font-semibold hover:bg-green-50 active:bg-green-100 transition-colors shadow-lg"
          >
            Schedule Your First Session
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
