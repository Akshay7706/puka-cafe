import { Compass, ShieldCheck, Heart, Coffee, Star, MapPin } from 'lucide-react';
import { PUKA_IMAGES } from '../data';

export default function AboutView() {
  const milestoneTimeline = [
    {
      year: '2015',
      title: 'Our First Bench',
      location: 'Alappuzha Bypass',
      doc: 'Started as a tiny roadside brick-walled stall with just white puttu, black tea, and two heavy wooden benches. It instantly became the focal point of late-night travel banter.'
    },
    {
      year: '2019',
      title: 'Brewing Kaichoondi',
      location: 'Alappuzha Kaichoondi',
      doc: 'Opened our first full-scale heritage Chayakkada in Kaichoondi, serving over 1,000 frothy cups of Biryani Chaya every single weekend.'
    },
    {
      year: '2023',
      title: 'Spanning New Horizons',
      location: 'SRM University Chennai',
      doc: 'We took our authentic Kerala flavours across state borders to Tamil Nadu, opening a branch near SRM main gate. College students quickly adopted it as their late-night study hub.'
    },
    {
      year: '2026',
      title: 'The Modern Digital Standard',
      location: 'Expansion Blueprint',
      doc: 'With multiple branches operating seamlessly and thousands of loyal patrons, we are ready to invite franchise partners to expand Chayakkada culture across the country.'
    }
  ];

  return (
    <div id="about-view" className="bg-puka-bg font-sans pb-24 min-h-screen">
      
      {/* Premium Hero Banner */}
      <div className="relative bg-[#111111] text-white overflow-hidden pt-36 pb-20 mb-16 flex items-center justify-center border-b border-puka-gold/20">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/puka_hero_chaya_puttu_1780713067104.png" 
            alt="Where Kerala Meets Over Chaya, Stories & Steam" 
            className="w-full h-full object-cover object-center opacity-30 filter brightness-[35%] contrast-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/45" />
        </div>
        
        {/* Banner Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="text-puka-gold font-mono text-[10px] uppercase tracking-[0.3em] font-bold mb-3 block">
            Our Roots
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-3xl font-display font-medium text-white tracking-tight mb-4">
            Where Kerala Meets Over Chaya
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            From the slow-cooked spicy chicken kondattom to the iconic rhythm of stretching black tea. Re-living traditional hospitality in a digital era.
          </p>
          <div className="w-16 h-[2px] bg-puka-gold/40 mx-auto mt-6 rounded-full" />
        </div>
      </div>

      {/* Origin Story Segment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 text-left">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-puka-gold uppercase tracking-widest text-xs font-bold font-mono">Our Beginnings</span>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-puka-black leading-tight">
            Built From Memory, Spiced With <span className="text-puka-accent italic font-bold">Tradition</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            In Kerala’s coastal town of Alappuzha, the local tea shop—the <em>Chayakkada</em>—is the heartbeat of community life. Our founders missed the warm wooden benches, the smell of roasted coconut, and the clattering steel tumblers of their hometowns.
          </p>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            So they built PuKa to celebrate those values. The name <strong>PuKa (Steam)</strong> represents the gentle steam rising from cylindrical puttu pots and hot kettles, serving as an invitation to slow down, share stories, and connect over authentic food.
          </p>

          <div className="bg-puka-gold/15 p-5 rounded-2xl border-l-4 border-puka-gold space-y-2">
            <h4 className="font-display font-bold text-puka-brown text-sm">Direct Spice Sourcing Guarantee</h4>
            <p className="text-gray-600 text-xs leading-relaxed">
              We travel directly to small family-owned organic plantations in Cardamom Hills (Idukki) and Wayanad to pick spices, completely cutting out wholesale middlemen.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative border-8 border-white rounded-3xl overflow-hidden shadow-xl aspect-[16/11]">
            <img 
              src={PUKA_IMAGES.cozyChayakkada} 
              alt="Story" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-puka-black text-white py-24 mb-24 border-t border-b border-puka-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight">
            Chayakkada Chronicles <span className="text-puka-gold italic">Timeline</span>
          </h2>
          <p className="text-gray-400 mt-3 text-xs sm:text-sm">
            How we evolved from single roadside bench to regional favorite.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Vertical center divider line layout */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-4 bottom-4 w-[2px] bg-puka-gold/20 hidden md:block" />

          <div className="space-y-12">
            {milestoneTimeline.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={item.year} 
                  className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 relative ${
                    isEven ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  
                  {/* Left Column (Content) */}
                  <div className="w-full md:w-[45%] text-left bg-white/5 border border-white/10 p-6 rounded-2xl relative group hover:border-puka-gold/40 transition-all shadow-md">
                    <span className="text-puka-gold font-mono font-bold text-sm tracking-widest uppercase block mb-1">
                      {item.location}
                    </span>
                    <h3 className="font-display font-medium text-xl text-white group-hover:text-puka-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed mt-3">
                      {item.doc}
                    </p>
                  </div>

                  {/* Year marker */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-puka-gold text-puka-black font-mono font-bold text-lg flex items-center justify-center shrink-0 border-4 border-puka-black shadow-lg">
                    {item.year}
                  </div>

                  {/* Empty matching right spacer Column */}
                  <div className="w-full md:w-[45%] hidden md:block" />

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* The Chaya Master's Manifesto */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm relative">
        <div className="absolute top-8 left-12 text-puka-gold/15 text-9xl font-serif select-none pointer-events-none">
          “
        </div>
        <div className="relative z-10 space-y-6">
          <Coffee className="w-12 h-12 text-puka-gold mx-auto animate-pulse" />
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-puka-black italic">
            "A cup of tea stretched to a meter carries decades of patience."
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto">
            At PuKa, we decline simple powdered substitutes or microwave shortcuts. Milk is slow-boiled using traditional bronze vessels; tea is pulled back and forth multiple times with perfect height streams to incorporate natural ambient air. This physical process makes your Chaya taste rich, frothy, and deeply satisfying.
          </p>
          <div className="h-[1px] w-24 bg-gray-200 mx-auto" />
          <div>
            <h5 className="font-display font-bold text-puka-black text-sm">Prakashan S.</h5>
            <p className="text-gray-400 text-[10px] uppercase font-mono tracking-widest">Head Brewmaster & Quality Supervisor</p>
          </div>
        </div>
      </section>

    </div>
  );
}
