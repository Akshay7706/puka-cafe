import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  MapPin, 
  Star, 
  Coffee, 
  Sparkles, 
  Heart, 
  Users, 
  Clock, 
  Phone, 
  ChefHat, 
  ChevronRight,
  ChevronLeft,
  Instagram,
  Video,
  Play,
  Volume2,
  VolumeX,
  X,
  Check,
  Award
} from 'lucide-react';
import { MENU_ITEMS, BRANCHES, TESTIMONIALS, GALLERY_ITEMS, PUKA_IMAGES } from '../data';
import { MenuItem, LocationBranch, Testimonial } from '../types';

interface HomeViewProps {
  setView: (view: string) => void;
  setSelectedBranchSlug: (slug: string) => void;
}

const VIDEO_STEPS = [
  {
    title: "1. Spicing the Water",
    subtitle: "INFUSING NATURALS",
    description: "Our brew master hand-crushes premium ginger roots, aromatic cardamom pods, and organic cloves, letting them bubble gently in high-dome brass cauldrons to construct the essential fragrant foundation.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop",
    metric1: "Boil Temp: 98.4°C",
    metric2: "Aroma Index: Ambient High"
  },
  {
    title: "2. Premium Wayanad Dust Drop",
    subtitle: "STRONG KERALA BODY",
    description: "Our signature blend of high-grown black tea dust from the cool valleys of Wayanad is introduced directly into the boiling spiced infusion, turning it into a rich mahogany nectar of deep color.",
    image: "/src/assets/images/puka_hero_chaya_puttu_1780713067104.png",
    metric1: "Steep Time: 4.5 mins",
    metric2: "Dust Grade: Super Fine"
  },
  {
    title: "3. Traditional Meter Stretching",
    subtitle: "THE ORIGINAL FOAM",
    description: "Pulled back and forth in high, flowing meter arcs, the Master aerates the brew between polished brass vessels, cooling it to sweet perfection and forming a legendary silky white head.",
    image: "/src/assets/images/puka_tea_stretching_1780713122585.png",
    metric1: "Arc Height: ~1.2 Meters",
    metric2: "Froth Texture: Velvet Crown"
  },
  {
    title: "4. Bamboo Flour Steaming",
    subtitle: "THE HEART OF PUTTU",
    description: "Stone-ground red rice flour is packed into natural bamboo pipes with layers of fresh-grated sweet coconut, slowly steamed over copper reservoirs until fluffy and fragrant.",
    image: "/src/assets/images/puka_cozy_chayakkada_1780713083652.png",
    metric1: "Vapor pressure: Standard",
    metric2: "Coconut: 100% Organic"
  }
];

export default function HomeView({ setView, setSelectedBranchSlug }: HomeViewProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeVideoStep, setActiveVideoStep] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [liveViewers, setLiveViewers] = useState(154);
  const [reactions, setReactions] = useState<{ id: number; type: string; x: number; y: number }[]>([]);
  const [chatMessages, setChatMessages] = useState<{ id: number; name: string; msg: string; avatar: string }[]>([
    { id: 1, name: "Rahul Mon", msg: "The froth on that Kattan Chaya is absolute artwork! ☕", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" },
    { id: 2, name: "Sneha George", msg: "Oh that aroma! Reminds me of monsoon evenings back in Alappuzha.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" },
    { id: 3, name: "Arjun Raveendran", msg: "Is Chicken Kondattom Puttu available today at Kaichoondi? 🔥", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" }
  ]);
  const [userComment, setUserComment] = useState("");
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Live viewer simulation effect
  useEffect(() => {
    if (!isVideoOpen) return;
    const interval = setInterval(() => {
      setLiveViewers(prev => prev + Math.floor(Math.random() * 7) - 3);
    }, 3000);
    return () => clearInterval(interval);
  }, [isVideoOpen]);

  // Handle adding live reactions
  const sendReaction = (type: string) => {
    const newReaction = {
      id: Date.now(),
      type,
      x: 30 + Math.random() * 40, 
      y: 80 - Math.random() * 20  
    };
    setReactions(prev => [...prev, newReaction]);
    
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 1500);
  };

  // Chat message submit handler
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;
    const newMessage = {
      id: Date.now(),
      name: "You (Guest)",
      msg: userComment,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
    };
    setChatMessages(prev => [...prev, newMessage]);
    setUserComment("");
    sendReaction("❤️");
  };

  const handleBranchClick = (slug: string) => {
    setSelectedBranchSlug(slug);
    setView('locations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const signatureDishes = MENU_ITEMS.filter(item => item.isSignature).slice(0, 5);

  const prevTestimonial = () => {
    setActiveTestimonialIdx(prev => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };
  
  const nextTestimonial = () => {
    setActiveTestimonialIdx(prev => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div id="home-view" className="bg-[#FAF7F2] font-sans">
      
      {/* ========================================== */}
      {/* 1. HERO SECTIONS (DESKTOP & MOBILE SPLIT) */}
      {/* ========================================== */}

      {/* 1A. DESKTOP HERO VIEW (lg and up) */}
      <section className="relative min-h-[92vh] hidden lg:flex items-center overflow-hidden bg-puka-black text-white">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={PUKA_IMAGES.heroChayaPuttu} 
            alt="Puttum Kattanum, Stories & Steam" 
            className="w-full h-full object-cover object-center opacity-45 scale-102 filter brightness-[40%] contrast-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-puka-black via-transparent to-puka-black/45" />
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px]" />
        </div>

        {/* Left Vertical Info Rail */}
        <div className="absolute left-8 bottom-32 z-20 hidden xl:flex flex-col items-center space-y-6 select-none pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/50 [writing-mode:vertical-lr] rotate-180">
            SINCE 2015 • STORIES & STEAM
          </span>
          <div className="w-[1.5px] h-14 bg-puka-gold/40" />
        </div>

        {/* Main Central Content Area */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-left w-full flex flex-col justify-center">
          <div className="max-w-2xl mt-8">
            {/* Branding Accent Label */}
            <span className="inline-flex items-center space-x-2 bg-puka-gold/20 border border-puka-gold/40 text-puka-gold-light text-xs uppercase tracking-[0.2em] font-bold px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5 text-puka-gold" />
              <span>Authentic Kerala Experience</span>
            </span>
            
            {/* Headline */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-display font-medium text-white tracking-tight leading-[0.95] mb-6 select-text">
              Puttum <br />
              Kattanum, <br />
              <span className="text-puka-gold font-heading font-normal italic block mt-2 text-5xl sm:text-6xl lg:text-7xl" style={{ fontFamily: 'var(--font-heading), serif' }}>
                Stories & Steam.
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-8 max-w-xl font-sans leading-relaxed">
              Authentic flavours, hot chaya and unforgettable moments. Welcome to Kerala's favourite <strong className="text-puka-gold font-bold">Chayakkada</strong>.
            </p>

            {/* Pill Buttons */}
            <div className="flex items-center gap-4">
              <button
                id="hero-cta-menu-desktop"
                onClick={() => { setView('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-puka-gold hover:bg-puka-gold-light text-puka-black font-bold px-8 py-4 rounded-full text-xs uppercase tracking-widest transition-all duration-300 transform hover:scale-[1.03] shadow-[0_5px_18px_rgba(200,155,60,0.35)] flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4 text-puka-black font-black" />
              </button>
              
              <button
                id="hero-cta-locations-desktop"
                onClick={() => { setView('locations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-4 rounded-full text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-puka-gold" />
                <span>Find A Branch</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll down mouse animation detail */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0 z-20 flex items-center space-x-2.5 text-gray-400 text-[9px] font-mono tracking-[0.2em] uppercase select-none pointer-events-none">
          <div className="w-5 h-9 border border-white/20 rounded-full flex justify-center p-1.5 opacity-70">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-puka-gold rounded-full" 
            />
          </div>
          <span>Scroll Down</span>
        </div>
      </section>

      {/* 1B. MOBILE HERO VIEW (lg and below) */}
      <section className="relative min-h-[85vh] flex lg:hidden items-center justify-center overflow-hidden bg-puka-black text-white px-4 py-16">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={PUKA_IMAGES.heroChayaPuttu} 
            alt="Puka Tea Shop" 
            className="w-full h-full object-cover opacity-40 filter brightness-[35%] contrast-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-puka-black via-transparent to-puka-black/40" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 w-full flex flex-col justify-center items-start text-left space-y-6 pt-12">

          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-puka-gold">The Tea Shop</span>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white leading-tight tracking-tight">
              PUKA <br />
              <span className="text-puka-gold font-heading italic font-light text-3xl sm:text-4xl block mt-1" style={{ fontFamily: 'var(--font-heading), serif' }}>
                Where Kerala Meets Over a Cup Of Chaya
              </span>
            </h1>
          </div>

          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-md">
            Authentic puttu, kattan chaya, unforgettable flavors, and the timeless warmth of Kerala's traditional chayakkada culture.
          </p>

          <div className="w-full flex flex-col sm:flex-row gap-3 pt-2">
            <button
              id="hero-cta-menu-mobile"
              onClick={() => { setView('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full py-3.5 bg-[#C89B3C] text-puka-black rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer shadow-md"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4 text-puka-black" />
            </button>
            <button
              id="hero-cta-locations-mobile"
              onClick={() => { setView('locations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full py-3.5 bg-transparent border border-white/20 text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-puka-gold" />
              <span>Find A Branch</span>
            </button>
          </div>

          {/* HOT CHAYAGOOD VIBES floating element */}
          <div className="absolute right-2 bottom-12 z-20 scale-85 flex flex-col items-center bg-[#C89B3C] text-puka-black font-semibold text-[9px] uppercase tracking-widest px-3.5 py-1.5 rounded-full select-none shadow-md">
            <span>HOT CHAYA</span>
            <span className="text-[8px] font-bold text-white leading-none">GOOD VIBES</span>
          </div>

          {/* Scroll Down */}
          <div className="absolute bottom-1 left-1.2 flex items-center space-x-1.5 text-gray-500 text-[8px] font-mono tracking-widest uppercase z-10">
            <div className="w-4 h-7 border border-white/10 rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-puka-gold rounded-full animate-bounce" />
            </div>
            <span>Scroll Down</span>
          </div>
        </div>
      </section>


      {/* ========================================== */}
      {/* 2. SIGNATURE SECTION (DESKTOP GRID & MOBILE LIST SPLIT) */}
      {/* ========================================== */}

      {/* 2A. DESKTOP SIGNATURE SPECIALS (lg and up) */}
      <section className="py-24 bg-puka-black text-white hidden lg:block border-t border-b border-puka-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
            <div className="text-left">
              <span className="text-puka-gold font-heading text-xl italic font-semibold block mb-0.5" style={{ fontFamily: 'var(--font-heading), serif' }}>
                Signature
              </span>
              <h2 className="text-5xl font-display font-medium text-white tracking-tight leading-none">
                Specials
              </h2>
            </div>
            
            <button 
              id="specials-view-all-desktop"
              onClick={() => { setView('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="font-bold text-xs text-[#DFC285] hover:text-white tracking-widest uppercase transition-colors inline-flex items-center space-x-1.5 border-b border-[#DFC285] hover:border-white pb-1 cursor-pointer"
            >
              <span>View Full Menu</span>
              <ChevronRight className="w-4 h-4 text-puka-gold" />
            </button>
          </div>

          <div className="grid grid-cols-5 gap-6">
            {signatureDishes.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => { setView('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-zinc-900 border border-zinc-800 hover:border-puka-gold/50 rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(200,155,60,0.15)] group transition-all duration-500 flex flex-col overflow-hidden text-left p-4 cursor-pointer"
              >
                {/* Visual Square inside Card */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {item.spicyLevel && item.spicyLevel > 0 && (
                    <div className="absolute top-2.5 right-2.5 bg-puka-accent text-white font-mono text-[8.5px] uppercase font-bold px-1.5 py-0.5 rounded-full shadow-md">
                      {'🌶️'.repeat(item.spicyLevel)}
                    </div>
                  )}
                </div>

                <div className="pt-4 flex-grow flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-white font-display font-medium text-base group-hover:text-puka-gold transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                    <span className="text-base font-extrabold font-mono text-puka-gold">
                      ₹{item.price}
                    </span>
                    <button 
                      className="w-7 h-7 rounded-full border border-zinc-700 bg-zinc-800 shadow-sm flex items-center justify-center text-gray-300 group-hover:bg-puka-gold group-hover:border-puka-gold group-hover:text-puka-black transition-all duration-300 cursor-pointer"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2B. MOBILE SIGNATURE DISHES (lg and below) */}
      <section className="py-16 bg-[#F6F1E7] lg:hidden">
        <div className="px-4">
          <div className="text-center mb-10 space-y-1">
            <span className="text-[#a32626] font-mono text-[10px] font-bold uppercase tracking-[0.25em] block">
              -- Signature Dishes --
            </span>
            <h2 className="text-3xl font-display font-semibold text-puka-black tracking-tight" style={{ fontFamily: 'var(--font-display), serif' }}>
              Crafted from Tradition
            </h2>
          </div>

          {/* Beigy capsules cards */}
          <div className="space-y-4">
            {signatureDishes.slice(0, 4).map((item, index) => (
              <div
                key={item.id}
                onClick={() => { setView('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-white rounded-2xl border border-gray-200/60 p-3.5 flex items-center gap-4 text-left shadow-sm hover:border-puka-gold/50 transition-all cursor-pointer"
              >
                {/* Left image */}
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200/40 relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Right text details */}
                <div className="flex-grow flex flex-col justify-between h-24 py-0.5">
                  <div>
                    <h3 className="font-display font-bold text-gray-900 text-[15px] leading-tight flex items-center justify-between">
                      <span>{item.name}</span>
                    </h3>
                    <p className="text-gray-500 text-[11px] leading-snug line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-sm font-extrabold font-mono text-puka-black">
                      ₹{item.price}
                    </span>
                    <button className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-puka-gold">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================== */}
      {/* 3. OUR STORY SECTION */}
      {/* ========================================== */}

      {/* 3A. DESKTOP STORY SECTION (lg and up) */}
      <section className="bg-white text-puka-black py-24 hidden lg:block border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-16 items-center">
          
          <div className="col-span-5 relative">
            <div className="relative border border-puka-gold/20 p-2.5 bg-[#FAF7F2] rounded-[2rem] shadow-xl overflow-hidden aspect-square">
              {/* Elegant Watercolor Border simulation layer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10 z-10" />
              <img 
                src={PUKA_IMAGES.cozyChayakkada} 
                alt="Cozy Kerala Chayakkada Bench" 
                className="w-full h-full object-cover rounded-[1.8rem] filter contrast-102 brightness-95"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Stamp Card overlay */}
            <div className="absolute -bottom-5 -right-5 bg-puka-black text-white p-5 rounded-2xl shadow-2xl max-w-[170px] border border-puka-gold/30">
              <span className="font-heading italic font-bold text-lg text-puka-gold block leading-none mb-1">Established</span>
              <span className="text-[10px] font-sans uppercase tracking-wider block font-extrabold text-gray-400">Since 2015</span>
            </div>
          </div>

          <div className="col-span-7 space-y-6 text-left">
            <span className="text-[#a32626] font-mono text-xs font-bold uppercase tracking-widest block">Our Story</span>
            <h2 className="text-5xl font-display font-medium text-puka-black tracking-tight leading-tight">
              Inspired by Kerala's <br />
              <span className="text-puka-gold italic font-heading font-normal text-6xl" style={{ fontFamily: 'var(--font-heading), serif' }}>
                Chayakkada Culture
              </span>
            </h2>
            <div className="h-0.5 w-16 bg-puka-gold" />
            
            <p className="text-gray-600 leading-relaxed font-sans text-sm md:text-base">
              PuKa was born from a simple idea: great food and great conversations belong together. 
              In Kerala, the local tea shop—the <span className="text-puka-black font-semibold underline decoration-puka-gold/60 underline-offset-4 decoration-2">Chayakkada</span>—has always been more than a kitchen. It is a town square, an analog sanctuary where news is digested, debates are run, and long-standing friendships are firmed with hot brass tea filters.
            </p>
            <p className="text-gray-500 leading-relaxed font-sans text-xs sm:text-sm">
              We sourced actual vintage tea benches, seasoned copper cauldrons, and rustic visual markers directly from Alappuzha. Our team maintains zero compromise: stone-ground organic grains, fresh country-harvested inputs, and robust dust leaf formulations frothed directly with traditional meter-arcs.
            </p>
            
            <div className="pt-4">
              <button 
                id="brand-story-read-more-desktop"
                onClick={() => { setView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center space-x-2 text-puka-black font-extrabold hover:text-puka-gold border-b border-puka-black hover:border-puka-gold pb-1 transition-colors uppercase text-xs tracking-wider cursor-pointer"
              >
                <span>Know More</span>
                <ArrowRight className="w-4 h-4 text-puka-gold" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3B. MOBILE STORY SECTION (lg and below) */}
      <section className="py-16 bg-white border-t border-b border-gray-100 lg:hidden px-4 text-left">
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-[#a32626] font-mono text-[10px] font-bold uppercase tracking-[0.25em] block">
              -- Our Story --
            </span>
            <h2 className="text-3xl font-display font-semibold text-puka-black tracking-tight mt-1" style={{ fontFamily: 'var(--font-display), serif' }}>
              Inspired By Kerala's Chayakkada Culture
            </h2>
          </div>

          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
            PuKa was born from a simple idea: great food and great conversations belong together. In Kerala's legendary tea shops, visitors sit together, sip hot ginger brews, parse raw news parameters, and build lifelong bonds.
          </p>

          <p className="text-gray-500 text-xs leading-relaxed">
            Inspired by this historic spirit, we recreated that cozy experience, importing seasoned brass filters and copper cauldrons directly from Alappuzha to Chennai. We craft everything from pure, organic local grains.
          </p>

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-200">
            <img 
              src={PUKA_IMAGES.cozyChayakkada} 
              alt="Inside Puka Teashop" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={() => { setView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-7 py-3 border border-puka-brown text-puka-brown rounded-full font-bold text-xs uppercase tracking-widest cursor-pointer hover:bg-puka-brown/5 transition-all w-full sm:w-auto"
            >
              Read Our Story →
            </button>
          </div>
        </div>
      </section>


      {/* ========================================== */}
      {/* 4. THE EXPERIENCE BANNER SECTION (GOLD/DARK) */}
      {/* ========================================== */}

      {/* 4A. DESKTOP EXPERIENCE BANNER (lg and up - GOLD BACKDROP) */}
      <section className="py-16 bg-[#C89B3C] text-puka-black hidden lg:block select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-80 font-bold block">
              The PuKa Experience
            </span>
            <h2 className="text-4xl font-display font-bold text-puka-black tracking-tight" style={{ fontFamily: 'var(--font-display), serif' }}>
              Every Cup Carries Sweet Memories
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-8">
            {/* Box 1 */}
            <div className="space-y-3.5 group">
              <div className="w-16 h-16 rounded-full bg-puka-black text-puka-gold flex items-center justify-center mx-auto transform group-hover:scale-106 transition-transform shadow-md">
                <Coffee className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-semibold text-lg text-puka-black leading-tight">Traditional Brewing</h3>
                <p className="text-puka-black/75 text-xs max-w-[210px] mx-auto leading-relaxed">
                  Brewing tea the classic way, with seasoned copper vessels.
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="space-y-3.5 group">
              <div className="w-16 h-16 rounded-full bg-puka-black text-puka-gold flex items-center justify-center mx-auto transform group-hover:scale-106 transition-transform shadow-md">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-semibold text-lg text-puka-black leading-tight">Fresh Ingredients</h3>
                <p className="text-puka-black/75 text-xs max-w-[210px] mx-auto leading-relaxed">
                  Locally sourced farm grains, country spices, and organic produce.
                </p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="space-y-3.5 group">
              <div className="w-16 h-16 rounded-full bg-puka-black text-puka-gold flex items-center justify-center mx-auto transform group-hover:scale-106 transition-transform shadow-md">
                <ChefHat className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-semibold text-lg text-puka-black leading-tight">Authentic Flavours</h3>
                <p className="text-puka-black/75 text-xs max-w-[210px] mx-auto leading-relaxed">
                  Uncompromised heritage recipes from the heart of Kerala.
                </p>
              </div>
            </div>

            {/* Box 4 */}
            <div className="space-y-3.5 group">
              <div className="w-16 h-16 rounded-full bg-puka-black text-puka-gold flex items-center justify-center mx-auto transform group-hover:scale-106 transition-transform shadow-md">
                <Users className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-semibold text-lg text-puka-black leading-tight">Community Driven</h3>
                <p className="text-puka-black/75 text-xs max-w-[210px] mx-auto leading-relaxed">
                  Reviving the analog teashop wooden bench experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4B. MOBILE EXPERIENCE BANNER (lg and below - OUTLINE DARK BOX) */}
      <section className="py-12 bg-white lg:hidden px-4">
        <div className="bg-puka-black border-2 border-dashed border-puka-gold/40 rounded-2xl p-6 text-center space-y-6 text-white text-left">
          <div className="text-center space-y-1">
            <span className="text-puka-gold font-mono text-[9px] font-bold uppercase tracking-[0.2em] block">
              ✦ The Chayakkada Experience ✦
            </span>
            <h2 className="text-2xl font-display font-semibold text-white tracking-tight" style={{ fontFamily: 'var(--font-display), serif' }}>
              Every Cup Carries a Story
            </h2>
          </div>

          <div className="space-y-5 pt-3">
            {[
              { title: "Traditional Brewing", desc: "Brewing tea the old way, with absolute patience and care.", icon: <Coffee className="w-5 h-5 text-puka-gold" /> },
              { title: "Fresh Ingredients", desc: "Locally sourced farm produce and pure grated coconut, fresh daily.", icon: <Sparkles className="w-5 h-5 text-puka-gold" /> },
              { title: "Authentic Experience", desc: "True flavors of central Kerala in every single bite.", icon: <ChefHat className="w-5 h-5 text-puka-gold" /> },
              { title: "Community Driven", desc: "Recreating the timeworn cozy benches for warm neighbour dialogues.", icon: <Users className="w-5 h-5 text-puka-gold" /> }
            ].map((benefit, bIdx) => (
              <div key={bIdx} className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full bg-white/5 border border-puka-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                  {benefit.icon}
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-display font-bold text-puka-gold text-[13px] tracking-wide">{benefit.title}</h4>
                  <p className="text-gray-400 text-[11px] leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================== */}
      {/* 5. FIND PUKA LOCATIONS SECTION */}
      {/* ========================================== */}

      {/* 5A. DESKTOP LOCATIONS SECTION (lg and up) */}
      <section className="py-24 bg-[#FAF7F2] hidden lg:block border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mb-12">
          <span className="text-[#a32626] font-mono text-xs font-bold uppercase tracking-widest block mb-1">Our Locations</span>
          <h2 className="text-5xl font-display font-medium text-puka-black tracking-tight leading-none text-center">
            Find PuKa Near You
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-12 items-center">
          
          <div className="col-span-6 space-y-4 text-left">
            {[
              { num: '01', name: 'Kaichoondi', loc: 'Alappuzha, Kerala', slug: 'kaichoondi' },
              { num: '02', name: 'Punnapra', loc: 'Alappuzha, Kerala', slug: 'punnapra' },
              { num: '03', name: 'SRM University', loc: 'Chennai, Tamil Nadu', slug: 'srm-chennai' },
            ].map((br) => (
              <button
                key={br.slug}
                onClick={() => handleBranchClick(br.slug)}
                className="w-full text-left bg-white border border-gray-100 hover:border-puka-gold p-5 rounded-2xl flex items-center justify-between transition-all group shadow-[0_4px_12px_rgba(0,0,0,0.015)] cursor-pointer focus:outline-none"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-puka-gold text-puka-black font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {br.num}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-gray-900 text-sm group-hover:text-puka-gold transition-colors leading-tight">
                      {br.name}
                    </h4>
                    <span className="text-gray-500 text-xs font-sans mt-0.5 block">
                      {br.loc}
                    </span>
                  </div>
                </div>
                
                <span className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-puka-black border-b border-puka-black group-hover:text-puka-gold group-hover:border-puka-gold transition-colors pb-0.5">
                  View Branch →
                </span>
              </button>
            ))}

            {/* Coming Soon Row */}
            <div className="w-full bg-zinc-900 text-white border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-md select-none">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-puka-gold/20 border border-puka-gold/40 text-puka-gold font-mono text-xs font-bold flex items-center justify-center shrink-0 animate-pulse">
                  04
                </div>
                <div>
                  <h4 className="font-display font-bold text-puka-gold text-sm leading-tight">
                    More Locations
                  </h4>
                  <span className="text-gray-400 text-xs block mt-0.5">
                    Coming Soon to Kochi & Bangalore
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/55 font-bold">
                Coming Soon →
              </span>
            </div>

            <div className="pt-2 text-left">
              <button
                id="locations-view-all-desktop"
                onClick={() => { setView('locations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full text-center bg-puka-gold hover:bg-puka-gold-light text-puka-black font-extrabold py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-[0_4px_15px_rgba(200,155,60,0.25)] cursor-pointer border-none"
              >
                View All Locations
              </button>
            </div>
          </div>

          <div className="col-span-6 h-full flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-square bg-white border border-gray-100 rounded-3xl p-6 shadow-md overflow-hidden flex flex-col justify-between">
              
              <div className="absolute inset-0 opacity-15 select-none pointer-events-none">
                <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, var(--color-puka-gold) 1px, transparent 1.5px)', backgroundSize: '16px 16px' }} />
              </div>

              {/* Header inside Map container */}
              <div className="relative z-10 flex items-center justify-between border-b border-gray-100 pb-3 text-left">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-[#a32626] rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 font-bold">Coordinate Mapping</span>
                </div>
                <span className="text-[9px] font-mono text-gray-400 uppercase">Interactive Outlets</span>
              </div>

              {/* Vector representation */}
              <div className="relative z-10 flex-grow w-full flex items-center justify-center p-4">
                <svg viewBox="0 0 100 100" className="w-[85%] h-full text-puka-gold/20 fill-current overflow-visible">
                  <path d="M 15 5 C 19 12, 21 18, 25 25 C 30 35, 36 45, 44 55 C 46 58, 50 64, 54 70 C 60 78, 66 84, 72 90 C 75 95, 82 98, 87 99 L 90 99" stroke="#C89B3C" strokeWidth="0.6" strokeDasharray="3,3" fill="none" />
                  <path d="M 12 5 L 90 5 L 90 99 L 85 99 C 80 98, 73 95, 70 90 C 64 84, 58 78, 52 70 C 48 64, 44 58, 42 55 C 34 45, 28 35, 22 25 Z" className="opacity-[0.05] fill-puka-gold" />

                  {/* Branches Coordinates */}
                  {[{ id: 'br_1', name: 'Alappuzha', x: 38, y: 72 }, { id: 'br_3', name: 'Chennai', x: 82, y: 24 }].map((point) => (
                    <g key={point.id} className="cursor-pointer group" onClick={() => handleBranchClick(point.id === 'br_1' ? 'kaichoondi' : 'srm-chennai')}>
                      <circle cx={point.x} cy={point.y} r="5" className="fill-[#a32626]/20 animate-pulse" />
                      <circle cx={point.x} cy={point.y} r="2.5" className="fill-[#a32626] group-hover:fill-puka-gold transition-colors" />
                      <text 
                        x={point.x - 3} 
                        y={point.y - 4} 
                        className="font-mono text-[5.5px] font-bold tracking-widest fill-[#4A2F20] select-none"
                      >
                        📍 {point.name}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Map instructions footer */}
              <div className="relative z-10 border-t border-gray-100 pt-3 flex items-center justify-between text-[10px] font-mono text-gray-400">
                <span>Alappuzha & Chennai Outlets</span>
                <span className="italic">Click pins to route</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5B. MOBILE LOCATIONS SECTION (lg and below) */}
      <section className="py-16 bg-[#FAF7F2] lg:hidden">
        <div className="px-4">
          <div className="text-center mb-10 space-y-1">
            <span className="text-[#a32626] font-mono text-[10px] font-bold uppercase tracking-[0.25em] block">
              -- Our Locations --
            </span>
            <h2 className="text-3xl font-display font-semibold text-puka-black tracking-tight" style={{ fontFamily: 'var(--font-display), serif' }}>
              Find Your Nearest PuKa
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { num: '01', name: 'Kaichoondi', loc: 'Alappuzha, Kerala', slug: 'kaichoondi' },
              { num: '02', name: 'Punnapra', loc: 'Alappuzha, Kerala', slug: 'punnapra' },
              { num: '03', name: 'SRM University', loc: 'Chennai, Tamil Nadu', slug: 'srm-chennai' },
            ].map((br, index) => (
              <div
                key={br.slug}
                onClick={() => handleBranchClick(br.slug)}
                className="bg-white border border-gray-200/60 p-4.5 rounded-2xl flex flex-col justify-between gap-4 text-left shadow-sm cursor-pointer hover:border-puka-gold transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-puka-brown font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-gray-900 text-sm leading-tight">
                      {br.name}
                    </h4>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {br.loc}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="text-[10px] font-mono text-[#a32626] uppercase tracking-wider font-extrabold">
                    View Branch Location
                  </span>
                  <span className="text-xs transition-transform group-hover:translate-x-1">&rarr;</span>
                </div>
              </div>
            ))}

            {/* Coming Soon row */}
            <div className="bg-zinc-900 border border-zinc-800 p-4.5 rounded-2xl flex flex-col justify-between gap-4 text-left shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-zinc-800 text-puka-gold font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  04
                </div>
                <div>
                  <h4 className="font-display font-bold text-puka-gold text-sm leading-tight">
                    Coming Soon
                  </h4>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Stay tuned for Kochi & Bangalore!
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-zinc-800 pt-3 text-white/50 text-[10px] font-mono">
                <span>STAY UPDATED</span>
                <span>&rarr;</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => { setView('locations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full py-4 bg-puka-brown text-white font-extrabold rounded-xl text-xs uppercase tracking-widest cursor-pointer shadow-md"
              >
                View All Locations
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================== */}
      {/* 6. INSTAGRAM CHRONICLES & INSTA GRID SECTION */}
      {/* ========================================== */}

      {/* 6A. DESKTOP GALLERY CONTAINER (lg and up) */}
      <section className="py-24 bg-white text-puka-black hidden lg:block border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-6 text-left">
            <div>
              <span className="text-[#a32626] font-mono text-xs font-bold uppercase tracking-widest block mb-1">Gallery</span>
              <h2 className="text-4xl font-display font-medium text-puka-black tracking-tight leading-none">
                Moments That Make Us PuKa
              </h2>
            </div>
            
            <button 
              onClick={() => { setView('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xs font-bold text-puka-black hover:text-puka-gold tracking-widest uppercase transition-colors inline-flex items-center space-x-1.5 border-b border-puka-black pb-1 cursor-pointer"
            >
              <span>View Gallery</span>
              <ChevronRight className="w-4 h-4 text-puka-gold animate-bounce" />
            </button>
          </div>

          {/* Row of 7 compact squares */}
          <div className="grid grid-cols-7 gap-4">
            {GALLERY_ITEMS.slice(0, 7).map((item, idx) => (
              <div 
                key={item.id} 
                onClick={() => { setView('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-left">
                  <span className="text-[8px] font-mono tracking-widest text-[#DFC285] uppercase mb-0.5">{item.category}</span>
                  <h4 className="text-white font-display text-[11.5px] font-bold leading-tight">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6B. MOBILE GALLERY CONTAINER (lg and below) */}
      <section className="py-16 bg-[#F6F1E7] lg:hidden">
        <div className="px-4 text-center">
          <div className="space-y-1 mb-10">
            <span className="text-[#a32626] font-mono text-[10px] font-bold uppercase tracking-[0.25em] block">
              -- Gallery --
            </span>
            <h2 className="text-3xl font-display font-semibold text-puka-black tracking-tight" style={{ fontFamily: 'var(--font-display), serif' }}>
              A Glimpse of PuKa
            </h2>
          </div>

          {/* 2x4 image grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {GALLERY_ITEMS.slice(0, 6).map((item) => (
              <div
                key={item.id}
                onClick={() => { setView('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="relative aspect-square rounded-2xl overflow-hidden border border-gray-200/50 shadow-sm cursor-pointer"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => { setView('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="w-full py-3 bg-[#4A2F20] text-white font-extrabold rounded-lg text-xs uppercase tracking-widest shadow-md cursor-pointer"
          >
            VIEW FULL GALLERY &rarr;
          </button>
        </div>
      </section>


      {/* ========================================== */}
      {/* 6C. EXTRA: INSTAGRAM MOBILE GRID LAYOUT */}
      {/* ========================================== */}
      <section className="py-16 bg-white lg:hidden">
        <div className="px-4 select-none">
          <div className="text-center mb-10 space-y-1">
            <span className="text-[#a32626] font-mono text-[10px] font-bold uppercase tracking-[0.25em] block">
              -- Instagram --
            </span>
            <h2 className="text-3xl font-display font-semibold text-puka-black tracking-tight" style={{ fontFamily: 'var(--font-display), serif' }}>
              Follow Our Journey
            </h2>
          </div>

          {/* 3x3 layout of Instagram posts */}
          <div className="grid grid-cols-3 gap-2">
            {[
              "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=300&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=300&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=300&auto=format&fit=crop",
              PUKA_IMAGES.teaStretching,
              "https://images.unsplash.com/photo-1594631252845-29fc4589d718?q=80&w=300&auto=format&fit=crop",
              PUKA_IMAGES.cozyChayakkada,
              "https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?q=80&w=300&auto=format&fit=crop",
              PUKA_IMAGES.heroChayaPuttu,
              PUKA_IMAGES.storefrontNight
            ].map((imgUrl, instaIdx) => (
              <div 
                key={instaIdx}
                className="aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-100 relative group"
                onClick={() => window.open('https://instagram.com/pukateashop', '_blank')}
              >
                <img 
                  src={imgUrl} 
                  alt="Insta post" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
              </div>
            ))}
          </div>

          {/* Follow CTA Bar */}
          <div className="mt-8 flex items-center justify-between bg-[#F6F1E7] border border-gray-200/40 p-4 rounded-2xl">
            <div className="flex items-center space-x-2 text-puka-black font-mono text-xs">
              <Instagram className="w-5 h-5 text-[#C89B3C] animate-bounce" />
              <span className="font-extrabold tracking-wide">@pukateashop</span>
            </div>
            
            <a 
              href="https://instagram.com/pukateashop" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#C89B3C] font-extrabold uppercase text-[10px] tracking-widest hover:underline"
            >
              FOLLOW US &rarr;
            </a>
          </div>
        </div>
      </section>


      {/* ========================================== */}
      {/* 7. TESTIMONIAL REVIEWS SECTION */}
      {/* ========================================== */}

      {/* 7A. DESKTOP TESTIMONIALS (lg and up) */}
      <section className="py-24 bg-[#FAF7F2] hidden lg:block border-t border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-12 items-center">
          
          <div className="col-span-8 text-left space-y-12">
            <div className="space-y-1">
              <span className="text-[#a32626] font-mono text-xs font-bold uppercase tracking-widest block mb-1">What People Say</span>
              <h2 className="text-5xl font-display font-medium text-puka-black tracking-tight leading-none">
                Loved by Thousands
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, idx) => (
                <div
                  key={t.id}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative flex flex-col justify-between text-left group hover:border-[#DFC285]/60 transition-all duration-300"
                >
                  <div className="absolute top-5 right-6 text-puka-gold/20 text-4xl font-serif select-none pointer-events-none">
                    “
                  </div>

                  <div>
                    {/* Stars */}
                    <div className="flex space-x-0.5 mb-4 text-[#C89B3C]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 italic">
                      "{t.review}"
                    </p>
                  </div>

                  {/* Author review */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
                    <div className="flex items-center space-x-2.5">
                      <img 
                        src={t.avatar} 
                        alt={t.name} 
                        className="w-8 h-8 rounded-full object-cover border border-gray-100 bg-gray-50"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-display font-bold text-gray-900 text-xs">{t.name}</h4>
                        <span className="text-[9px] text-gray-400 font-mono tracking-wide block uppercase mt-0.5">Google Reviewer</span>
                      </div>
                    </div>

                    <span className="w-5 h-5 rounded-full bg-gray-50 border border-gray-100 text-blue-500 font-sans font-black text-[10px] flex items-center justify-center shadow-sm shrink-0">
                      G
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-4 pl-4 h-full flex items-center justify-center">
            {/* Elegant tea plate presentation image right side */}
            <div className="relative border border-puka-gold/20 p-2.5 bg-white rounded-3xl shadow-lg w-full aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?q=80&w=650&auto=format&fit=crop"
                alt="Kerala Chayakkada Plate Combo" 
                className="w-full h-full object-cover rounded-2xl filter brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl" />
            </div>
          </div>

        </div>
      </section>

      {/* 7B. MOBILE TESTIMONIALS (lg and below - WITH SWIPER NAVIGATOR) */}
      <section className="py-16 bg-white lg:hidden px-4">
        <div className="space-y-6 text-center">
          <div className="space-y-1 mb-8">
            <span className="text-[#a32626] font-mono text-[10px] font-bold uppercase tracking-[0.25em] block">
              -- Testimonials --
            </span>
            <h2 className="text-3xl font-display font-semibold text-puka-black tracking-tight" style={{ fontFamily: 'var(--font-display), serif' }}>
              Loved By Thousands
            </h2>
          </div>

          {/* Testimonial Active Slide Card */}
          <div className="bg-[#F6F1E7] border border-gray-200/50 rounded-2xl p-6 text-left relative min-h-[220px] flex flex-col justify-between shadow-sm">
            <div className="absolute top-4 right-6 text-[#C89B3C]/20 text-5xl font-serif select-none">
              “
            </div>

            <div>
              {/* Star line */}
              <div className="flex space-x-1.5 mb-4 text-[#C89B3C]">
                {[...Array(TESTIMONIALS[activeTestimonialIdx].rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C89B3C]" />
                ))}
              </div>

              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed italic mb-6">
                "{TESTIMONIALS[activeTestimonialIdx].review}"
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center justify-between border-t border-gray-200/60 pt-4 mt-2">
              <div className="flex items-center space-x-3">
                <img 
                  src={TESTIMONIALS[activeTestimonialIdx].avatar} 
                  alt={TESTIMONIALS[activeTestimonialIdx].name} 
                  className="w-9 h-9 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-display font-black text-gray-900 text-xs">{TESTIMONIALS[activeTestimonialIdx].name}</h4>
                  <span className="text-[9px] text-gray-400 font-mono tracking-widest block uppercase">Google Reviewer</span>
                </div>
              </div>

              <span className="w-5 h-5 rounded-full bg-white text-blue-500 font-sans font-black text-[10.5px] flex items-center justify-center shadow-sm shrink-0">
                G
              </span>
            </div>
          </div>

          {/* Carousel Buttons */}
          <div className="flex justify-center items-center space-x-4 pt-2">
            <button 
              onClick={prevTestimonial}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-700 active:scale-90 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            
            {/* Dots */}
            <div className="flex space-x-2">
              {TESTIMONIALS.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${activeTestimonialIdx === index ? 'bg-puka-gold' : 'bg-gray-300'}`}
                />
              ))}
            </div>

            <button 
              onClick={nextTestimonial}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-700 active:scale-90 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        </div>
      </section>


      {/* ========================================== */}
      {/* 8. GRAND FAÇADE CALL-TO-ACTION SECTION */}
      {/* ========================================== */}

      {/* 8A. DESKTOP GRAND CTA SECTION (lg and up) */}
      <section className="relative py-28 overflow-hidden bg-puka-black text-white hidden lg:block">
        <div className="absolute inset-0 z-0">
          <img 
            src={PUKA_IMAGES.storefrontNight} 
            alt="PuKa Cozy Storefront at Night" 
            className="w-full h-full object-cover object-center opacity-25 filter brightness-[45%] contrast-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-5xl font-display font-medium text-white tracking-tight leading-none" style={{ fontFamily: 'var(--font-display), serif' }}>
            Ready for a cup of <br />
            <span className="text-[#DFC285] font-normal italic font-heading text-6xl block mt-2" style={{ fontFamily: 'var(--font-heading), serif' }}>
              Chaya?
            </span>
          </h2>

          <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
            Visit your nearest PuKa branch and experience the warm magic over cozy tea tables.
          </p>

          <div className="pt-4 text-center">
            <button
              id="cta-find-branch-desktop"
              onClick={() => { setView('locations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="bg-puka-gold hover:bg-puka-gold-light text-puka-black font-extrabold px-9 py-4 rounded-full text-xs uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center space-x-2.5 mx-auto cursor-pointer"
            >
              <span>Find A Branch</span>
              <ArrowRight className="w-4 h-4 text-puka-black" />
            </button>
          </div>
        </div>
      </section>

      {/* 8B. MOBILE FRANCHISE & CTA CARD (lg and below - Glasses of tea table mockup) */}
      <section className="py-12 bg-white lg:hidden px-4">
        <div className="relative bg-puka-black rounded-3xl overflow-hidden p-8 shadow-xl text-center select-none text-white">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1594631252845-29fc4589d718?q=80&w=400&auto=format&fit=crop"
              alt="Tea table" 
              className="w-full h-full object-cover opacity-20 filter brightness-40"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/90 to-black" />
          </div>

          <div className="relative z-10 space-y-7">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono tracking-widest text-[#DFC285] uppercase font-bold block">
                ✦ Partner With Us ✦
              </span>
              <h2 className="text-3xl font-display font-semibold text-white tracking-tight leading-none" style={{ fontFamily: 'var(--font-display), serif' }}>
                BRING PUKA <br />
                <span className="text-[#C89B3C]">TO YOUR CITY</span>
              </h2>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed max-w-sm mx-auto">
              Join our growing family and become part of Kerala's most loved tea shop experience in your home town.
            </p>

            <div className="flex flex-col gap-3 max-w-xs mx-auto">
              <button
                onClick={() => { setView('franchise'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full py-3.5 bg-[#C89B3C] text-puka-black font-extrabold rounded-full text-xs uppercase tracking-widest cursor-pointer shadow-md"
              >
                Franchise Inquiry
              </button>
              
              <button
                onClick={() => { setView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full py-3.5 bg-transparent border border-gray-600 text-white font-extrabold rounded-full text-xs uppercase tracking-widest cursor-pointer hover:bg-white/5"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================== */}
      {/* 9. MODALS: INTERACTIVE PLAY VIDEO TELECAST OVERLAY */}
      {/* ========================================== */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-puka-black/95 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setIsVideoOpen(false)}
          >
            {/* Modal Container */}
            <motion.div 
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="bg-[#121212] border border-puka-gold/30 rounded-3xl overflow-hidden w-full max-w-5xl h-[90vh] lg:h-[75vh] shadow-[0_0_50px_rgba(200,155,60,0.15)] flex flex-col lg:grid lg:grid-cols-12"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Column: Video Simulation (7 Cols) */}
              <div className="lg:col-span-7 bg-black relative flex flex-col justify-between h-[45%] lg:h-full border-b lg:border-b-0 lg:border-r border-puka-gold/20 overflow-hidden select-none">
                <div className="absolute inset-0 bg-scanlines opacity-5 pointer-events-none z-10" />
                
                {/* Floating Reaction Bubbles */}
                <div className="absolute inset-x-0 bottom-20 top-20 z-20 pointer-events-none overflow-hidden">
                  {reactions.map((react) => (
                    <motion.div
                      key={react.id}
                      initial={{ opacity: 0, scale: 0.5, y: 150 }}
                      animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1.2, 1, 0.7], y: -100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute text-3xl filter drop-shadow-md select-none"
                      style={{ left: `${react.x}%` }}
                    >
                      {react.type}
                    </motion.div>
                  ))}
                </div>

                {/* Top Overlay metrics */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-none text-left">
                  <div className="flex items-center space-x-2">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-puka-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-puka-accent"></span>
                    </span>
                    <span className="bg-puka-accent/80 backdrop-blur-sm border border-puka-accent/30 text-white font-mono text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      Live Feed
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 bg-black/55 backdrop-blur-sm px-2 py-0.5 rounded tracking-widest border border-white/5">
                      CAM_04_CHAYA_MASTERS
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1.5 bg-black/60 backdrop-blur-sm border border-white/10 px-2.5 py-0.5 rounded text-gray-300 font-mono text-[10px]">
                    <Users className="w-3 h-3 text-puka-gold animate-bounce" />
                    <span>{liveViewers} WATCHING</span>
                  </div>
                </div>

                {/* Video Image Stream */}
                <div className="w-full h-full relative flex items-center justify-center bg-zinc-950 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeVideoStep}
                      src={VIDEO_STEPS[activeVideoStep].image} 
                      alt={VIDEO_STEPS[activeVideoStep].title} 
                      initial={{ opacity: 0, filter: 'brightness(25%) blur(8px)' }}
                      animate={{ opacity: 1, filter: 'brightness(60%) blur(0px)' }}
                      exit={{ opacity: 0, filter: 'brightness(25%) blur(8px)' }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-cover object-center absolute inset-0"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 w-full h-full z-10 pointer-events-none" />

                  {/* Play Center details text */}
                  <div className="relative text-center z-20 max-w-md px-6 select-text pointer-events-auto">
                    <span className="text-[10px] sm:text-xs font-mono text-puka-gold tracking-widest uppercase block mb-1">
                      {VIDEO_STEPS[activeVideoStep].subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-medium text-white mb-2 leading-tight">
                      {VIDEO_STEPS[activeVideoStep].title}
                    </h3>
                  </div>
                </div>

                {/* Timeline control */}
                <div className="absolute bottom-4 inset-x-4 bg-black/60 backdrop-blur-md rounded-xl p-3 border border-white/10 z-20 flex sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 hover:text-puka-gold border border-white/5 flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-puka-gold animate-bounce" />}
                    </button>
                    <div className="text-left">
                      <div className="text-[10px] font-mono font-bold text-gray-300 uppercase">
                        {isMuted ? "Audio Off" : "Ambient Steam Audio Active"}
                      </div>
                      <div className="text-[9px] font-mono text-gray-500">
                        {isMuted ? "Click to play sound effects" : "Sizzling & Steaming loop active"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 font-mono text-[9px] text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span>Auto 1080p Stream</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Process Chat (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between overflow-hidden h-[55%] lg:h-full bg-[#161616]">
                {/* Header */}
                <div className="p-4 border-b border-puka-gold/20 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-left">
                    <Video className="w-4 h-4 text-puka-gold" />
                    <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-puka-gold">
                      Interactive Process Tour
                    </h3>
                  </div>
                  <button 
                    onClick={() => setIsVideoOpen(false)}
                    className="w-7 h-7 rounded-full bg-white/5 hover:bg-puka-accent hover:text-white flex items-center justify-center border border-white/10 transition-colors focus:outline-none cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Process List selections */}
                <div className="p-3 border-b border-puka-gold/10 space-y-1.5 overflow-y-auto no-scrollbar max-h-[35%] shrink-0">
                  {VIDEO_STEPS.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveVideoStep(idx)}
                      className={`w-full text-left p-2 rounded-xl border flex items-center justify-between transition-all group cursor-pointer ${
                        activeVideoStep === idx 
                          ? 'bg-puka-gold/15 border-puka-gold' 
                          : 'bg-white/5 border-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className={`w-5 h-5 rounded-full font-mono text-[10px] font-bold flex items-center justify-center ${
                          activeVideoStep === idx 
                            ? 'bg-puka-gold text-puka-black' 
                            : 'bg-white/10 text-gray-400'
                        }`}>
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className={`text-[11px] font-bold leading-tight ${activeVideoStep === idx ? 'text-puka-gold' : 'text-gray-200 group-hover:text-puka-gold-light'}`}>
                            {step.title.split('. ')[1]}
                          </h4>
                          <span className="text-[9px] text-gray-500 font-mono tracking-wider">{step.subtitle}</span>
                        </div>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeVideoStep === idx ? 'text-puka-gold translate-x-1' : 'text-gray-500'}`} />
                    </button>
                  ))}
                </div>

                {/* Sub-text Metrics details */}
                <div className="p-3 sm:p-4 bg-black/45 border-b border-puka-gold/10 shrink-0 text-left">
                  <div className="grid grid-cols-2 gap-2 mb-2 font-mono text-[9px]">
                    <div className="bg-white/5 border border-white/5 rounded p-1 text-center text-gray-400">
                      🌡️ <span className="font-bold text-gray-200">{VIDEO_STEPS[activeVideoStep].metric1}</span>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded p-1 text-center text-gray-400">
                      🌿 <span className="font-bold text-gray-200">{VIDEO_STEPS[activeVideoStep].metric2}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                    {VIDEO_STEPS[activeVideoStep].description}
                  </p>
                </div>

                {/* Live Community Chat */}
                <div className="flex-grow flex flex-col justify-between overflow-hidden bg-[#131313]">
                  <div className="p-2.5 bg-[#181818] border-b border-puka-gold/5 flex items-center justify-between text-[9px] font-bold text-gray-400 tracking-wider">
                    <span>LIVE KITCHEN CHAT</span>
                    <button 
                      type="button"
                      onClick={() => setChatMessages(prev => prev.slice(0, 1))}
                      className="text-puka-gold hover:underline font-mono text-[8px]"
                    >
                      RESET CHAT
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-grow p-3 space-y-2.5 overflow-y-auto no-scrollbar">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="flex items-start space-x-2 text-left">
                        <img 
                          src={msg.avatar} 
                          alt="Avatar" 
                          className="w-4 h-4 rounded-full object-cover border border-white/10 mt-0.5 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-baseline space-x-1.5">
                            <span className="font-bold text-puka-gold/90 text-[10px]">{msg.name}</span>
                            <span className="text-[7px] text-gray-500">Live</span>
                          </div>
                          <p className="text-gray-300 text-[10px] leading-snug mt-0.5">{msg.msg}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reactions deck */}
                  <div className="px-3 py-1.5 border-t border-puka-gold/5 flex justify-center space-x-4 bg-black/40 text-xs shrink-0 select-none">
                    <button onClick={() => sendReaction("❤️")} className="hover:scale-130 transition-transform">❤️</button>
                    <button onClick={() => sendReaction("🔥")} className="hover:scale-130 transition-transform">🔥</button>
                    <button onClick={() => sendReaction("☕")} className="hover:scale-130 transition-transform">☕</button>
                    <button onClick={() => sendReaction("👍")} className="hover:scale-130 transition-transform">👍</button>
                    <button onClick={() => sendReaction("😍")} className="hover:scale-130 transition-transform">😍</button>
                  </div>

                  {/* Send comment */}
                  <form onSubmit={handleChatSubmit} className="p-2 border-t border-puka-gold/20 flex bg-zinc-950 items-center justify-between gap-1.5 shrink-0">
                    <input 
                      type="text"
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      placeholder="Type a comment..."
                      className="bg-zinc-900 border border-white/10 rounded-full px-3 py-1.5 text-[10px] text-white focus:outline-none focus:border-puka-gold flex-grow"
                    />
                    <button 
                      type="submit"
                      className="bg-puka-gold text-puka-black hover:bg-puka-gold-light px-3 py-1.5 rounded-full text-[9px] font-bold uppercase transition-all"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
