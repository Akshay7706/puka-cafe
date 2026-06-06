import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Send, CheckCircle2, Award, ClipboardList, ShieldAlert, Sparkles } from 'lucide-react';
import { FranchiseEnquiry } from '../types';

export default function FranchiseView() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    investmentRange: '10-20-lakhs',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [submittedRequests, setSubmittedRequests] = useState<FranchiseEnquiry[]>([]);

  // Load from localStorage for state persistence
  useEffect(() => {
    const saved = localStorage.getItem('puka_franchise_enquiries');
    if (saved) {
      try {
        setSubmittedRequests(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.city) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newEnquiry: FranchiseEnquiry = {
        id: 'fe_' + Date.now(),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        investmentRange: formData.investmentRange,
        message: formData.message,
        submittedAt: new Date().toLocaleDateString('en-IN', {
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const updated = [newEnquiry, ...submittedRequests];
      setSubmittedRequests(updated);
      localStorage.setItem('puka_franchise_enquiries', JSON.stringify(updated));

      setIsSubmitting(false);
      setSuccessMessage(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        investmentRange: '10-20-lakhs',
        message: ''
      });

      // Close success window after 5 seconds
      setTimeout(() => {
        setSuccessMessage(false);
      }, 5000);
    }, 1500);
  };

  const investmentTiers = [
    {
      tier: 'Express Kiosk',
      space: '150 - 300 sq.ft.',
      investment: '₹10 - ₹12 Lakhs',
      focus: 'Takeaway, Signature Puttu, Bottled Chaya, Quick Service',
      royalty: '4% monthly'
    },
    {
      tier: 'Standard Cafe',
      space: '500 - 800 sq.ft.',
      investment: '₹15 - ₹18 Lakhs',
      focus: 'Dine-in Benches, Full Breakfast, Evening Snacks, All Special Teas',
      royalty: '5% monthly'
    },
    {
      tier: 'Flagship Bistro',
      space: '1000+ sq.ft.',
      investment: '₹25+ Lakhs',
      focus: 'Premium Family Dining, Multi-Category Food Menu, Live Chaya Kitchen',
      royalty: '5% monthly'
    }
  ];

  return (
    <div id="franchise-view" className="bg-puka-bg font-sans pb-24 min-h-screen">
      
      {/* Premium Hero Banner */}
      <div className="relative bg-[#111111] text-white overflow-hidden pt-36 pb-20 mb-12 flex items-center justify-center border-b border-puka-gold/20">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/puka_hero_chaya_puttu_1780713067104.png" 
            alt="Bring PuKa to Your City, Stories & Steam" 
            className="w-full h-full object-cover object-center opacity-30 filter brightness-[35%] contrast-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/45" />
        </div>
        
        {/* Banner Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="text-puka-gold font-mono text-[10px] uppercase tracking-[0.3em] font-bold mb-3 block">
            Partner with Us
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-3xl font-display font-medium text-white tracking-tight mb-4">
            Bring PuKa to <span className="text-puka-gold font-bold italic">Your City</span>
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            Capitalize on the heavy demand for authentic regional snacking. Join our expanding family and operate a high-returns culinary hotspot.
          </p>
          <div className="w-16 h-[2px] bg-puka-gold/40 mx-auto mt-6 rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
        
        {/* Left Column: Investment Info & Tiers */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Brand benefits */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-2xl font-display font-bold text-puka-black">
              Why Invest in a PuKa Franchise?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2.5 text-puka-gold">
                  <Award className="w-5 h-5 shrink-0" />
                  <h4 className="font-display font-bold text-puka-black text-sm">Proven Customer Loyalty</h4>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Our existing branches in Alappuzha & Chennai carry highly rated reviews and witness lines of customers weekly.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2.5 text-puka-gold">
                  <ClipboardList className="w-5 h-5 shrink-0" />
                  <h4 className="font-display font-bold text-puka-black text-sm">Standardized Recipes</h4>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  No dependency on specialist master chefs. Our spice blends are direct-packed to guarantee absolute consistency across cities.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2.5 text-puka-gold">
                  <Send className="w-5 h-5 shrink-0" />
                  <h4 className="font-display font-bold text-puka-black text-sm">Strong Supply Channels</h4>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Enjoy regional supply pipelines for organic plantation cardamoms, specialized tea dusts, and custom-ground red wheat.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2.5 text-puka-gold">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <h4 className="font-display font-bold text-puka-black text-sm">Marketing & Store Design</h4>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Complete support with local launch plans, cozy wooden interior layout designs, and national brand identity campaigns.
                </p>
              </div>
            </div>
          </div>

          {/* Investment Tables */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-2xl font-display font-bold text-puka-black">
              Franchise Models & Tiers
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-3 font-mono text-gray-400 uppercase tracking-wider font-bold">Model Tier</th>
                    <th className="py-3 font-mono text-gray-400 uppercase tracking-wider font-bold">Space Required</th>
                    <th className="py-3 font-mono text-gray-400 uppercase tracking-wider font-bold">Investment</th>
                    <th className="py-3 font-mono text-gray-400 uppercase tracking-wider font-bold">Target Setup</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-gray-600">
                  {investmentTiers.map((tier) => (
                    <tr key={tier.tier} className="hover:bg-puka-bg/20 transition-all">
                      <td className="py-4 font-display font-bold text-puka-black">{tier.tier}</td>
                      <td className="py-4 font-mono">{tier.space}</td>
                      <td className="py-4 font-mono font-bold text-puka-accent">{tier.investment}</td>
                      <td className="py-4 text-xs leading-relaxed">{tier.focus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Lead Collection Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-puka-black text-white p-6 sm:p-8 rounded-3xl border border-puka-gold/20 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-puka-gold/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-2 border-b border-white/5 pb-4 mb-6">
              <span className="text-puka-gold font-mono text-xs font-bold uppercase tracking-widest block">Inquiry Form</span>
              <h3 className="text-2xl font-display font-bold">Launch a Branch</h3>
              <p className="text-gray-400 text-xs">Fill out your profile credentials and local budget to receive complete layout prospectus sheets.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Your Full Name *</label>
                <input
                  type="text"
                  required
                  name="name"
                  id="franchise-input-name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Anand Sharma"
                  className="w-full bg-puka-bg/5 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-puka-gold font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    id="franchise-input-phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-puka-bg/5 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-puka-gold font-sans"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    required
                    name="email"
                    id="franchise-input-email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. anand@email.com"
                    className="w-full bg-puka-bg/5 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-puka-gold font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Target City *</label>
                  <input
                    type="text"
                    required
                    name="city"
                    id="franchise-input-city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Bangalore, Kochi"
                    className="w-full bg-puka-bg/5 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-puka-gold font-sans"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Budget Available</label>
                  <select
                    name="investmentRange"
                    id="franchise-input-budget"
                    value={formData.investmentRange}
                    onChange={handleInputChange}
                    className="w-full bg-puka-bg/10 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-puka-gold font-sans font-medium"
                  >
                    <option value="10-15-lakhs" className="text-puka-black">₹10 Lakhs - ₹15 Lakhs</option>
                    <option value="15-25-lakhs" className="text-puka-black">₹15 Lakhs - ₹25 Lakhs</option>
                    <option value="25-lakhs-plus" className="text-puka-black">₹25 Lakhs +</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Introduce Yourself / Space Details</label>
                <textarea
                  name="message"
                  id="franchise-input-desc"
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your background and any potential site/location properties..."
                  className="w-full bg-puka-bg/5 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-puka-gold font-sans"
                />
              </div>

              {/* Form success banner overlay popup */}
              {successMessage && (
                <div id="enquiry-success" className="bg-puka-gold text-puka-black p-4 rounded-xl font-sans text-xs flex items-start gap-2.5 border border-puka-gold-light shadow-lg">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold uppercase tracking-wider">Inquiry Submitted Successfully!</h5>
                    <p className="mt-0.5 leading-relaxed">Thank you. Our dedicated Franchise Manager will contact you at your provided details within 24 working hours.</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                id="franchise-form-submit"
                disabled={isSubmitting}
                className="w-full bg-puka-gold hover:bg-puka-gold-light text-puka-black font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow border-b-2 border-puka-gold-light disabled:opacity-50"
              >
                {isSubmitting ? 'Registering...' : 'Submit Inquiry'}
              </button>

            </form>
          </div>

          {/* Submitted leads list (rendered directly in UI for debug and complete transparency) */}
          {submittedRequests.length > 0 && (
            <div id="enquiry-board" className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-left space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-puka-accent font-bold block">
                Active Enquiries board (Session-Saved)
              </span>
              <div className="space-y-2 max-h-[220px] overflow-y-auto">
                {submittedRequests.map((req) => (
                  <div key={req.id} className="p-3 bg-puka-bg border border-gray-100 rounded-xl text-xs space-y-1 flex items-start justify-between">
                    <div>
                      <h5 className="font-bold text-puka-black mb-0.5">{req.name}</h5>
                      <p className="text-gray-500 font-mono text-[10px]">{req.city} • Budget: {req.investmentRange}</p>
                    </div>
                    <span className="text-[9px] font-mono text-gray-400 bg-gray-200/50 px-1.5 py-0.5 rounded">
                      {req.submittedAt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
