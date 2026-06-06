import { Mail, Phone, Clock, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  setView: (view: string) => void;
}

export default function Footer({ setView }: FooterProps) {
  const handleNavClick = (viewId: string) => {
    setView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-puka-black text-gray-400 border-t border-puka-gold/20 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center text-left">
            <div className="w-36 h-auto block">
              <Logo showSubtitle={true} lightMode={false} />
            </div>
          </div>
          <p className="text-gray-300 max-w-sm text-sm leading-relaxed font-heading text-lg italic">
            "Puttum Kattanum, Stories & Steam." Since 2015, brewing nostalgia, forging connections, and preserving traditional culinary secrets.
          </p>
          
          {/* Social Icons */}
          <div className="flex space-x-3 pt-2">
            <a
              href="https://instagram.com/pukateashop"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-puka-gold hover:text-puka-black hover:border-puka-gold text-puka-gold transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com/pukateashop"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-puka-gold hover:text-puka-black hover:border-puka-gold text-puka-gold transition-all duration-300"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com/pukateashop"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-puka-gold hover:text-puka-black hover:border-puka-gold text-puka-gold transition-all duration-300"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-4 border-l-2 border-puka-gold pl-3">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => handleNavClick('menu')}
                className="hover:text-puka-gold transition-colors text-left"
              >
                Our Menu
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('gallery')}
                className="hover:text-puka-gold transition-colors text-left"
              >
                Food Gallery
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('blog')}
                className="hover:text-puka-gold transition-colors text-left"
              >
                Chayakkada Chronicles (Blog)
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('about')}
                className="hover:text-puka-gold transition-colors text-left"
              >
                Our Story & Heritage
              </button>
            </li>
          </ul>
        </div>

        {/* Branches & Franchise */}
        <div>
          <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-4 border-l-2 border-puka-gold pl-3">
            Locations
          </h3>
          <ul className="space-y-2 text-sm mb-6">
            <li>
              <button
                onClick={() => handleNavClick('locations')}
                className="hover:text-puka-gold transition-colors text-left"
              >
                Kaichoondi, Alappuzha
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('locations')}
                className="hover:text-puka-gold transition-colors text-left"
              >
                Punnapra, Alappuzha
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('locations')}
                className="hover:text-puka-gold transition-colors text-left"
              >
                SRM University, Chennai
              </button>
            </li>
          </ul>

          <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-4 border-l-2 border-puka-gold pl-3">
            Franchise
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => handleNavClick('franchise')}
                className="hover:text-puka-gold transition-colors text-left"
              >
                Become a Partner
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-4 border-l-2 border-puka-gold pl-3">
            Contact Us
          </h3>
          <div className="flex items-start space-x-3 text-sm">
            <Phone className="w-5 h-5 text-puka-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-300">Call Reservations</p>
              <a href="tel:+919037713344" className="hover:text-puka-gold transition-colors">
                +91 90377 13344
              </a>
            </div>
          </div>
          <div className="flex items-start space-x-3 text-sm">
            <Mail className="w-5 h-5 text-puka-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-300">Email Enquiries</p>
              <a href="mailto:hello@pukateashop.com" className="hover:text-puka-gold transition-colors">
                hello@pukateashop.com
              </a>
            </div>
          </div>
          <div className="flex items-start space-x-3 text-sm">
            <Clock className="w-5 h-5 text-puka-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-300">Opening Hours</p>
              <p>10:00 AM – 1:00 AM</p>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <div>
          <p>© 2026 PuKa Teashop. All Rights Reserved.</p>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => handleNavClick('contact')} className="hover:text-puka-gold">Support</button>
          <span>•</span>
          <button onClick={() => handleNavClick('contact')} className="hover:text-puka-gold">Privacy Policy</button>
          <span>•</span>
          <button onClick={() => handleNavClick('contact')} className="hover:text-puka-gold">Terms of Service</button>
        </div>
        <div>
          <p>Designed with <span className="text-puka-accent font-bold">♥</span> in Kerala</p>
        </div>
      </div>
    </footer>
  );
}
