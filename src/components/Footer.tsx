import { homepageData } from "../data/homepage";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

const socialIconMap: Record<string, any> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
};

export const Footer = () => {
  const { footer } = homepageData;

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold text-white mb-4">
              Therapy Consultant
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {footer.description}
            </p>
            <div className="flex gap-4">
              {footer.social.map((social, index) => {
                const Icon = socialIconMap[social.platform];
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center active:bg-green-600 transition-colors min-h-[44px] min-w-[44px]"
                    aria-label={social.platform}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {footer.navigation.services.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="hover:text-green-400 active:text-green-300 transition-colors block py-1 min-h-[44px] flex items-center"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footer.navigation.company.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="hover:text-green-400 active:text-green-300 transition-colors block py-1 min-h-[44px] flex items-center"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {footer.navigation.resources.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="hover:text-green-400 active:text-green-300 transition-colors block py-1 min-h-[44px] flex items-center"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Phone className="text-green-500 flex-shrink-0" size={20} />
              <span>{footer.contact.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-green-500 flex-shrink-0" size={20} />
              <span>{footer.contact.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-green-500 flex-shrink-0" size={20} />
              <span>{footer.contact.address}</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Therapy Consultant. All rights
            reserved. HIPAA Compliant & Confidential.
          </p>
        </div>
      </div>
    </footer>
  );
};
