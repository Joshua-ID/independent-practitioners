import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Heart, Users, Award, Target, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lavender-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <img
                src="/src/assets/icon.png"
                alt="Logo"
                className=" flex w-30 h-30 bg-linear-65 from-blue-400 to-green-400   rounded-full"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About TherapySpace
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Empowering individuals and families to find balance, healing, and
              growth through compassionate professional care
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-10 h-10 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To provide accessible, high-quality mental health care that
                honors the unique journey of each individual. We believe
                everyone deserves support in navigating life's challenges with
                dignity, compassion, and professional expertise.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-10 h-10 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To create a world where mental health care is universally
                valued, accessible, and free from stigma. We envision
                communities where seeking support is seen as an act of strength
                and self-care is a priority for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
            Our Story
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Founded in 2015, TherapySpace began with a simple yet powerful
              vision: to make quality mental health care accessible to everyone
              who needs it. What started as a small practice with just two
              therapists has grown into a thriving community of six dedicated
              professionals, each bringing unique expertise and compassion to
              their work.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Our journey has been shaped by the stories of the thousands of
              individuals and families we've had the privilege to serve. Every
              triumph, every breakthrough, and every moment of healing has
              reinforced our commitment to this vital work.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Today, we continue to evolve, embracing new therapeutic approaches
              and technologies while staying true to our core values:
              compassion, professional excellence, and unwavering dedication to
              our clients' wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Compassion
              </h3>
              <p className="text-gray-700">
                We approach every client with empathy, understanding, and
                genuine care for their unique circumstances and challenges.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Excellence
              </h3>
              <p className="text-gray-700">
                Our practitioners maintain the highest professional standards
                through ongoing training and evidence-based practices.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Confidentiality
              </h3>
              <p className="text-gray-700">
                We maintain strict privacy standards, ensuring a safe and secure
                environment for open, honest communication.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Inclusivity
              </h3>
              <p className="text-gray-700">
                We welcome and respect all individuals regardless of background,
                identity, or circumstances.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Client-Centered
              </h3>
              <p className="text-gray-700">
                Your goals, needs, and preferences guide every aspect of your
                therapeutic journey with us.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Growth</h3>
              <p className="text-gray-700">
                We believe in the potential for positive change and support your
                journey toward personal growth and healing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Begin Your Journey With Us
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Take the first step toward better mental health and wellbeing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="inline-block bg-white text-green-700 px-8 py-4 rounded-full font-semibold hover:bg-green-50 active:bg-green-100 transition-colors shadow-lg"
            >
              Book a Session
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-green-700 text-white border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 active:bg-green-800 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
