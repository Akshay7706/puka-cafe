import { useState, useMemo, useEffect } from 'react';
import { Search, Flame, Coffee, Sparkles, Check, Info } from 'lucide-react';
import { MENU_ITEMS, PUKA_IMAGES } from '../data';
import { MenuItem } from '../types';

export default function MenuView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItemDetail, setSelectedItemDetail] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate premium network delay on loading/filtering to highlight skeleton loadings
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  const categories = [
    { label: 'All Items', id: 'all' },
    { label: 'Breakfast', id: 'breakfast' },
    { label: 'Tea & Warmers', id: 'tea' },
    { label: 'Coffee', id: 'coffee' },
    { label: 'Tea Snacks', id: 'snacks' },
    { label: 'Specials', id: 'specials' },
    { label: 'Meals & Gravies', id: 'meals' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
      // Search match
      const searchMatch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div id="menu-view" className="bg-puka-bg font-sans pb-24 min-h-screen">
      
      {/* Premium Hero Banner */}
      <div className="relative bg-[#111111] text-white overflow-hidden pt-36 pb-20 mb-12 flex items-center justify-center border-b border-puka-gold/20">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={PUKA_IMAGES.heroChayaPuttu} 
            alt="The PuKa Menu, Stories & Steam" 
            className="w-full h-full object-cover object-center opacity-30 filter brightness-[35%] contrast-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/45" />
        </div>
        
        {/* Banner Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="text-puka-gold font-mono text-[10px] uppercase tracking-[0.3em] font-bold mb-3 block">
            Our Offerings
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-3xl font-display font-medium text-white tracking-tight mb-4">
            The PuKa Menu
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            From the steamed magic of warm Puttu to the frothy depths of spice-laden Biryani Chaya. Handcrafted daily with authentic ingredients.
          </p>
          <div className="w-16 h-[2px] bg-puka-gold/40 mx-auto mt-6 rounded-full" />
        </div>
      </div>

      {/* Interactive Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          
          {/* Categories Tab Swiper */}
          <div className="flex flex-nowrap items-center gap-2 overflow-x-auto w-full md:w-auto py-1 scrollbar-none no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all focus:outline-none ${

                  selectedCategory === cat.id
                    ? 'bg-puka-black text-puka-gold shadow-md'
                    : 'bg-puka-bg text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              id="menu-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, drinks..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-puka-gold focus:ring-1 focus:ring-puka-gold bg-puka-bg text-sm text-gray-800 transition-all font-sans"
            />
          </div>

        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={`menu-skeleton-${index}`}
                className="bg-white rounded-3xl border border-gray-100 p-3 sm:p-4 shadow-sm flex flex-col relative animate-pulse"
              >
                {/* Image card skeleton */}
                <div className="relative aspect-[4/3] w-full rounded-2xl bg-gray-200 mb-3 sm:mb-4 shrink-0" />
                
                {/* Content skeleton */}
                <div className="flex-grow flex flex-col justify-between p-1 space-y-4">
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded-md w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                    <div className="h-3 bg-gray-100 rounded w-5/6" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-gray-50 pt-3 sm:pt-4 mt-3 sm:mt-4 gap-1 sm:gap-2">
                    <div className="h-6 bg-gray-300 rounded w-12" />
                    <div className="h-8 bg-gray-200 rounded-full w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <Coffee className="w-12 h-12 text-gray-300 mx-auto mb-4 animate-bounce" />
            <h3 className="text-lg font-display font-semibold text-gray-700">No dishes found</h3>
            <p className="text-gray-400 text-sm mt-1 max-w-sm mx-auto">
              We couldn't match your query. Try resetting filters or searching for our signature 'Puttu' or 'Chaya'.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-6 bg-puka-gold text-puka-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-puka-gold-light transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                id={`menu-card-${item.id}`}
                className="bg-white rounded-3xl border border-gray-100 p-3 sm:p-4 shadow-sm hover:shadow-xl hover:border-puka-gold/30 transition-all duration-300 flex flex-col group relative"
              >
                {/* Signature Tag */}
                {item.isSignature && (
                  <span className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 bg-puka-gold text-puka-black text-[8px] sm:text-[9px] uppercase tracking-widest font-extrabold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-puka-gold-light shadow-md flex items-center space-x-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Signature</span>
                  </span>
                )}

                {/* Card Thumbnail */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-50 mb-3 sm:mb-4 shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-2 sm:p-4 flex justify-end">
                    {item.spicyLevel && item.spicyLevel > 0 && (
                      <span className="bg-puka-accent text-white font-mono text-[8px] sm:text-[9px] uppercase font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm">
                        {'🌶'.repeat(item.spicyLevel)} SPICY
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col justify-between p-1">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-gray-900 font-display font-bold text-sm sm:text-lg leading-snug group-hover:text-puka-accent transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-gray-500 text-[11px] sm:text-xs mt-1 sm:mt-2 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-gray-50 pt-3 sm:pt-4 mt-3 sm:mt-4 gap-2">
                    <span className="text-sm sm:text-lg font-bold font-mono text-puka-brown">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={() => setSelectedItemDetail(item)}
                      className="bg-puka-bg hover:bg-puka-gold hover:text-puka-black text-gray-600 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-1 sm:space-x-1.5 focus:outline-none"
                    >
                      <span>Recipe Info</span>
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* DETAIL MODAL PANEL */}
      {selectedItemDetail && (
        <div id="recipe-modal" className="fixed inset-0 bg-puka-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-puka-gold/20 shadow-2xl relative animate-scaleIn select-none max-h-[90vh] overflow-y-auto">
            
            <button
              id="recipe-modal-close"
              onClick={() => setSelectedItemDetail(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-puka-bg hover:bg-puka-gold hover:text-puka-black text-gray-500 flex items-center justify-center transition-all focus:outline-none z-10"
            >
              ✕
            </button>

            {/* Modal Image */}
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gray-100 mb-6 relative">
              <img
                src={selectedItemDetail.image}
                alt={selectedItemDetail.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {selectedItemDetail.isSignature && (
                <span className="absolute top-4 left-4 bg-puka-gold text-puka-black text-[9px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full border border-puka-gold-light shadow-md flex items-center space-x-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Signature Specials</span>
                </span>
              )}
            </div>

            {/* Details */}
            <div className="text-left space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-puka-accent font-bold">
                  Category: {selectedItemDetail.category}
                </span>
                <span className="text-xl font-bold font-mono text-puka-brown">
                  ₹{selectedItemDetail.price}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-puka-black">
                {selectedItemDetail.name}
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed">
                {selectedItemDetail.description}
              </p>

              {/* Dynamic specific recipe stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="bg-puka-bg p-3.5 rounded-xl text-left border border-gray-100">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase">Prep Style</span>
                  <span className="text-xs font-bold text-puka-black mt-0.5 block flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-puka-gold" />
                    <span>Traditional Pot</span>
                  </span>
                </div>
                <div className="bg-puka-bg p-3.5 rounded-xl text-left border border-gray-100">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase">Spicy scale</span>
                  <span className="text-xs font-bold text-puka-black mt-0.5 block flex items-center gap-1">
                    <span>{selectedItemDetail.spicyLevel ? '🌶️'.repeat(selectedItemDetail.spicyLevel) : 'None'}</span>
                  </span>
                </div>
              </div>

              {/* Serving Note */}
              <div className="bg-puka-gold/10 p-4 rounded-2xl border border-puka-gold/20 flex items-start space-x-3 text-xs text-puka-brown leading-relaxed">
                <Coffee className="w-5 h-5 text-puka-gold shrink-0 mt-0.5" />
                <p>
                  <strong>Chef’s Best Recommendation:</strong> Enjoy this delicious recipe fresh out of the kitchen along with our frothy cup of hot <strong>Biryani Chaya</strong> for the ultimate authentic Chayakkada dining experience.
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
