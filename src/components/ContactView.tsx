import { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle } from 'lucide-react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Save contact submission locally for feedback
      const key = 'puka_contact_messages';
      const existing = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : [];
      const newMsg = {
        id: 'msg_' + Date.now(),
        ...formData,
        date: new Date().toLocaleString()
      };
      localStorage.setItem(key, JSON.stringify([newMsg, ...existing]));

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: 'general',
        message: ''
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1200);
  };

  return (
    <div id="contact-view" className="bg-puka-bg font-sans pb-24 min-h-screen">
      
      {/* Premium Hero Banner */}
      <div className="relative bg-[#111111] text-white overflow-hidden pt-36 pb-20 mb-12 flex items-center justify-center border-b border-puka-gold/20">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/puka_hero_chaya_puttu_1780713067104.png" 
            alt="Get in Touch, Stories & Steam" 
            className="w-full h-full object-cover object-center opacity-30 filter brightness-[35%] contrast-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/45" />
        </div>
        
        {/* Banner Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="text-puka-gold font-mono text-[10px] uppercase tracking-[0.3em] font-bold mb-3 block">
            Connect
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-3xl font-display font-medium text-white tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            Questions about dietary recipes, reservations, catering events, or general support? Reach out and we will address your note.
          </p>
          <div className="w-16 h-[2px] bg-puka-gold/40 mx-auto mt-6 rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
        
        {/* Left Column: Direct channels list */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
            <h3 className="font-display font-bold text-xl text-puka-black border-b border-gray-100 pb-3">
              Direct Channels
            </h3>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-puka-gold/15 text-puka-gold rounded-2xl shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-gray-900 text-sm">Customer Support & Table Booking</h4>
                <a href="tel:+919037713344" className="text-puka-accent font-mono text-base font-bold block mt-1 hover:underline">
                  +91 90377 13344
                </a>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">Available from 10:00 AM – 1:00 AM daily. Pre-orders accepted.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-puka-gold/15 text-puka-gold rounded-2xl shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-gray-900 text-sm">Corporate & Franchise Office</h4>
                <a href="mailto:hello@pukateashop.com" className="text-puka-accent font-mono text-base font-bold block mt-1 hover:underline">
                  hello@pukateashop.com
                </a>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">For business tie-ups, marketing campaigns, and press relations.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-puka-gold/15 text-puka-gold rounded-2xl shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-gray-900 text-sm">Registered Office Address</h4>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                  Kaichoondi Junction, National Highway Bypass, Alappuzha, Kerala - 688006
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-puka-gold/15 text-puka-gold rounded-2xl shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-gray-900 text-sm">General Operating Hours</h4>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed font-bold text-puka-brown">
                  Mon – Sun: 10:00 AM – 1:00 AM
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Interaction form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-md space-y-6">
            <div className="space-y-1.5 border-b border-gray-100 pb-4">
              <div className="flex items-center space-x-2 text-puka-gold">
                <MessageSquare className="w-5 h-5" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest">Feed messaging</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-puka-black">Send a Message</h3>
              <p className="text-gray-500 text-xs mt-0.5">Please share your comments and details below and our team will get in touch with you shortly.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Your Name *</label>
                  <input
                    type="text"
                    required
                    name="name"
                    id="contact-input-name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full bg-puka-bg border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-puka-gold font-sans"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Email Address *</label>
                  <input
                    type="email"
                    required
                    name="email"
                    id="contact-input-email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. ramesh@email.com"
                    className="w-full bg-puka-bg border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-puka-gold font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Inquiry Category</label>
                <select
                  name="subject"
                  id="contact-input-topic"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-puka-bg border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 font-medium focus:outline-none focus:border-puka-gold font-sans"
                >
                  <option value="general">General Enquiries & Feedback</option>
                  <option value="catering">Party Catering & Large Events</option>
                  <option value="complaint">Service Complaint</option>
                  <option value="careers">Hiring & Careers</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  name="message"
                  id="contact-input-desc"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Share details of your request here..."
                  className="w-full bg-puka-bg border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-puka-gold font-sans"
                />
              </div>

              {submitSuccess && (
                <div id="contact-success" className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-4 rounded-xl text-xs flex items-start gap-2.5 shadow-sm font-sans">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold uppercase tracking-wider">Message Dispatched!</h5>
                    <p className="mt-0.5 leading-relaxed">Thank you. Your message has been saved successfully. We appreciate your interest in PuKa Teashop.</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                id="contact-form-submit"
                disabled={isSubmitting}
                className="w-full bg-puka-black text-puka-gold hover:text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow disabled:opacity-50"
              >
                {isSubmitting ? 'Sending Message...' : 'Submit Message'}
              </button>

            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
