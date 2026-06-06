import React, { useState, useEffect, useRef } from 'react';
import { Menu as MenuIcon, X, MapPin, Coffee, ChevronDown, Calendar, Users, Clock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
}

export default function Navbar({ currentView, setView }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);

  // Booking Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1); // 1 = form, 2 = success page
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    date: '2026-06-06',
    time: '18:00',
    specialReq: '',
  });

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Menu', id: 'menu' },
    { label: 'Locations', id: 'locations' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Our Story', id: 'about' },
    { label: 'Blog', id: 'blog' },
    { label: 'Franchise', id: 'franchise' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if at top
      if (currentScrollY < 40) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }

      // Hide/show navigation on scroll down/up
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down -> hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up -> show navbar
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (viewId: string) => {
    setView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStep(2);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    // Slight delay before reset to keep animations looking smooth
    setTimeout(() => {
      setBookingStep(1);
      setFormData({
        name: '',
        email: '',
        phone: '',
        guests: '2',
        date: '2026-06-06',
        time: '18:00',
        specialReq: '',
      });
    }, 400);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 font-sans transition-all duration-500 ease-in-out ${
        isVisible || mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      } ${
        isAtTop && !mobileMenuOpen
          ? 'bg-transparent py-5 sm:py-6 border-b border-transparent'
          : 'bg-[#111111]/95 backdrop-blur-md py-4 sm:py-4 border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo inside yellow-gold box with cursive text */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center text-left focus:outline-none group relative py-1 focus:ring-0"
              id="nav-logo"
            >
              <Logo showSubtitle={true} className="scale-90 select-none" />
            </button>

            {/* Desktop Navigation Menu (Centered) */}
            <div className="hidden lg:flex items-center space-x-10">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                
                if (item.id === 'menu') {
                  return (
                    <div key={item.id} className="relative group/menu py-2">
                      <button
                        id={`nav-item-${item.id}`}
                        onClick={() => handleNavClick(item.id)}
                        className={`flex items-center space-x-1 text-[13px] uppercase font-semibold tracking-wider transition-colors duration-200 cursor-pointer ${
                          isActive
                            ? 'text-puka-gold'
                            : 'text-gray-300 hover:text-puka-gold'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover/menu:text-puka-gold transition-transform duration-200 group-hover/menu:rotate-180" />
                      </button>
                      
                      {/* Dropdown Options */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#161616] border border-white/10 rounded-xl shadow-2xl py-2 opacity-0 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover/menu:translate-y-0 z-50">
                        {[
                          { label: 'All Delicacies', filter: 'all' },
                          { label: 'Bamboo Puttu Special', filter: 'puttu' },
                          { label: 'Kattan & Hot Brews', filter: 'drinks' },
                          { label: 'Traditional Snacks', filter: 'starters' },
                          { label: 'Gourmet Curry Bowls', filter: 'curries' },
                        ].map((subItem) => (
                          <button
                            key={subItem.label}
                            onClick={() => handleNavClick('menu')}
                            className="w-full text-left px-4_5 py-2.5 hover:bg-white/5 text-gray-300 hover:text-puka-gold text-xs font-sans tracking-wide transition-colors block cursor-pointer"
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-[13px] uppercase font-semibold tracking-wider transition-colors duration-200 py-2 focus:outline-none cursor-pointer relative ${
                      isActive
                        ? 'text-puka-gold'
                        : 'text-gray-300 hover:text-puka-gold'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-[-2px] left-0 right-0 h-[2.5px] bg-puka-gold rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Desktop CTA Button 'Visit PuKa' */}
            <div className="hidden lg:flex items-center">
              <button
                id="nav-cta-visit"
                onClick={() => handleNavClick('locations')}
                className="bg-puka-gold hover:bg-puka-gold-light text-puka-black px-6 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase transition-all duration-300 transform hover:scale-[1.04] shadow-[0_4px_15px_rgba(200,155,60,0.3)] focus:outline-none cursor-pointer flex items-center space-x-2"
              >
                <span>Visit PuKa</span>
                <div className="w-5 h-5 rounded-full bg-puka-black flex items-center justify-center text-puka-gold text-[10px] select-none">&rarr;</div>
              </button>
            </div>

            {/* Mobile Actions (Visit PuKa button + Hamburger) */}
            <div className="flex lg:hidden items-center space-x-3.5 mt-1">
              <button
                id="nav-cta-visit-mobile"
                onClick={() => handleNavClick('locations')}
                style={{ backgroundColor: '#C89B3C' }}
                className="text-puka-black px-4.5 py-2.5 rounded-full font-extrabold text-[10px] tracking-wider uppercase transition-all duration-300 active:scale-95 shadow-md flex items-center space-x-1.5 focus:outline-none cursor-pointer"
              >
                <span>Visit PuKa</span>
                <MapPin className="w-3 h-3 text-puka-black fill-transparent" />
              </button>

              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-puka-gold focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div id="mobile-nav-panel" className="lg:hidden bg-[#111111]/98 border-b border-white/5 pt-2 pb-6 px-4 space-y-1.5 animate-fadeIn">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center w-full px-4 py-3 rounded-xl text-xs uppercase font-extrabold tracking-wider ${
                    isActive
                      ? 'bg-white/5 text-puka-gold'
                      : 'text-gray-300 hover:bg-white/5 hover:text-puka-gold'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 px-2">
              <button
                id="mobile-nav-cta-visit"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick('locations');
                }}
                className="flex items-center justify-center w-full bg-puka-gold text-puka-black py-3.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg focus:outline-none cursor-pointer"
              >
                Visit PuKa
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Elegant Table Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={handleCloseBooking}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="bg-[#121212] border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Highlight accents */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-puka-gold/5 blur-[50px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-puka-gold/5 blur-[50px] pointer-events-none" />

              {/* Close Icon button */}
              <button
                onClick={handleCloseBooking}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white flex items-center justify-center border border-white/5 transition-colors focus:outline-none cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {bookingStep === 1 ? (
                <form onSubmit={handleBookingSubmit} className="p-6 sm:p-8 space-y-6 text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-puka-gold">
                      Premium Dining Experience
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-medium text-white">
                      Book A Table
                    </h3>
                    <p className="text-xs text-gray-400">
                      Reserve a beautiful seating space at our outlets. Authentic Puttu & hot Kattan await you.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-puka-gold transition-colors"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-puka-gold transition-colors"
                      />
                    </div>

                    {/* Phone Number Input */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-puka-gold transition-colors"
                      />
                    </div>

                    {/* Guest selection count */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold">
                        No. of Guests
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-puka-gold transition-colors cursor-pointer"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5 Guests</option>
                        <option value="6">6+ Guests (Party)</option>
                      </select>
                    </div>

                    {/* Choose Reservation Date */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-puka-gold transition-colors text-sans"
                      />
                    </div>

                    {/* Choose Time Slot */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold">
                        Select Time
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-puka-gold transition-colors cursor-pointer"
                      >
                        <option value="08:00">08:00 AM (Breakfast)</option>
                        <option value="11:00">11:00 AM (Brunch)</option>
                        <option value="13:30">01:30 PM (Lunch)</option>
                        <option value="16:30">04:30 PM (Teatime Stretch)</option>
                        <option value="18:30">06:30 PM (Sunset Warm)</option>
                        <option value="20:00">08:00 PM (Dinner Hour)</option>
                        <option value="21:30">09:30 PM (Late Comfort)</option>
                      </select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold">
                      Special Requests / Notes
                    </label>
                    <textarea
                      value={formData.specialReq}
                      onChange={(e) => setFormData({ ...formData, specialReq: e.target.value })}
                      placeholder="e.g. Grated coconut allergy, window desk, birthday, etc..."
                      rows={2}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-puka-gold resize-none"
                    />
                  </div>

                  {/* Submit allocation */}
                  <button
                    type="submit"
                    className="w-full bg-puka-gold hover:bg-puka-gold-light text-puka-black text-xs font-bold uppercase tracking-widest py-4 rounded-xl transition-all shadow-[0_4px_25px_rgba(200,155,60,0.3)] cursor-pointer text-center"
                  >
                    Confirm Reservation
                  </button>
                </form>
              ) : (
                <div className="p-10 text-center space-y-6 flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 text-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/5 animate-pulse">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <div className="space-y-2 text-center">
                    <h3 className="text-xl sm:text-2xl font-display font-medium text-white">
                      Reservation Successful!
                    </h3>
                    <p className="text-gray-300 text-xs max-w-sm mx-auto leading-relaxed">
                      Thank you, <span className="text-puka-gold font-extrabold">{formData.name}</span>. We've booked a tablespace for <span className="text-white font-semibold">{formData.guests} guests</span> on <span className="text-white font-semibold">{formData.date}</span> at <span className="text-white font-semibold">{formData.time}</span>.
                    </p>
                    <p className="text-[10px] text-gray-500 italic max-w-xs mx-auto mt-2 leading-relaxed">
                      Your brass seat tag assignment has been dispatched to {formData.phone || formData.email}. We cannot wait to serve you!
                    </p>
                  </div>

                  <button
                    onClick={handleCloseBooking}
                    className="bg-white/10 hover:bg-white/15 border border-white/10 text-white text-[10px] font-mono uppercase tracking-widest px-6 py-2.5 rounded-full transition-colors cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
