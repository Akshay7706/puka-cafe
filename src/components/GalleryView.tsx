import { useState, useMemo, useEffect, MouseEvent } from 'react';
import { Heart, Search, Camera, Sparkles, Compass } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';

export default function GalleryView() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulated premium delay to highlight aesthetic loading skeleton
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 550);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const categories = [
    { label: 'All Photos', id: 'all' },
    { label: 'The Craft', id: 'The Craft' },
    { label: 'Our Plates', id: 'Our Plates' },
    { label: 'Ambiance', id: 'Ambiance' },
    { label: 'Preparation', id: 'Preparation' },
  ];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return items;
    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  const handleLike = (e: MouseEvent, itemId: string) => {
    e.stopPropagation(); // Avoid triggering lightbox clicks
    
    if (likedIds.includes(itemId)) {
      // Dislike helper
      setLikedIds(likedIds.filter(id => id !== itemId));
      setItems(prev => prev.map(item => item.id === itemId ? { ...item, likes: item.likes - 1 } : item));
    } else {
      // Like helper
      setLikedIds([...likedIds, itemId]);
      setItems(prev => prev.map(item => item.id === itemId ? { ...item, likes: item.likes + 1 } : item));
    }
  };

  return (
    <div id="gallery-view" className="bg-puka-bg font-sans pb-24 min-h-screen">
      
      {/* Premium Hero Banner */}
      <div className="relative bg-[#111111] text-white overflow-hidden pt-36 pb-20 mb-12 flex items-center justify-center border-b border-puka-gold/20">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/puka_hero_chaya_puttu_1780713067104.png" 
            alt="The PuKa Gallery, Stories & Steam" 
            className="w-full h-full object-cover object-center opacity-30 filter brightness-[35%] contrast-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/45" />
        </div>
        
        {/* Banner Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="text-puka-gold font-mono text-[10px] uppercase tracking-[0.3em] font-bold mb-3 block">
            Visual Heritage
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-3xl font-display font-medium text-white tracking-tight mb-4">
            The PuKa Gallery
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            Moments of bubbling tea steam, friendly laughs over traditional wooden panels, and the culinary craft that defines us.
          </p>
          <div className="w-16 h-[2px] bg-puka-gold/40 mx-auto mt-6 rounded-full" />
        </div>
      </div>

      {/* Toolbar Filter Buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-center">
        <div className="bg-white p-2.5 rounded-full border border-gray-100 shadow-sm flex flex-nowrap items-center gap-1 overflow-x-auto max-w-full py-1.5 scrollbar-none no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all focus:outline-none ${

                activeCategory === cat.id
                  ? 'bg-puka-black text-puka-gold shadow'
                  : 'bg-transparent text-gray-500 hover:text-puka-black hover:bg-gray-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Photo Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {Array.from({ length: 6 }).map((_, index) => {
              // Varying heights for realistic masonry skeleton effect
              const heights = ["h-64", "h-80", "h-56", "h-96", "h-72", "h-60"];
              const randomHeight = heights[index % heights.length];
              return (
                <div
                  key={`gallery-skeleton-${index}`}
                  className="break-inside-avoid bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm p-3 flex flex-col space-y-4 animate-pulse mb-6"
                >
                  <div className={`w-full ${randomHeight} bg-gray-200/85 rounded-xl`} />
                  <div className="p-1 flex items-center justify-between">
                    <div className="space-y-2 w-2/3">
                      <div className="h-3 bg-gray-200 rounded w-1/3" />
                      <div className="h-4 bg-gray-200 rounded w-5/6" />
                    </div>
                    <div className="h-8 bg-gray-100 rounded-full w-12" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item) => {
              const hasLiked = likedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  id={`gallery-item-${item.id}`}
                  onClick={() => setActiveLightbox(item)}
                  className="break-inside-avoid bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-puka-gold/30 transition-all duration-300 group cursor-pointer relative"
                >
                  
                  {/* Photo Thumbnail */}
                  <div className="relative overflow-hidden bg-gray-50">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {/* Dense gradient hover layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left text-white" />
                  </div>

                  {/* Always-visible static banner or info frame */}
                  <div className="p-4 flex items-center justify-between border-t border-gray-50 bg-white">
                    <div className="text-left">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-puka-accent font-bold">
                        {item.category}
                      </span>
                      <h3 className="text-puka-black font-display font-bold text-sm sm:text-base leading-tight mt-0.5">
                        {item.title}
                      </h3>
                    </div>

                    {/* Likes Interactive Trigger */}
                    <button
                      onClick={(e) => handleLike(e, item.id)}
                      className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-gray-100 hover:border-puka-gold/30 transition-all text-xs text-gray-500 hover:text-puka-accent focus:outline-none"
                      id={`btn-like-${item.id}`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-puka-accent text-puka-accent' : ''}`} />
                      <span className="font-mono text-xs">{item.likes}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX POP-UP */}
      {activeLightbox && (
        <div id="lightbox-overlay" className="fixed inset-0 bg-puka-black/95 z-50 flex items-center justify-center p-4" onClick={() => setActiveLightbox(null)}>
          <div className="relative max-w-4xl w-full text-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute -top-12 right-0 text-white hover:text-puka-gold font-bold text-lg focus:outline-none"
              id="lightbox-close"
            >
              ✕ Close
            </button>
            <div className="bg-puka-black p-2 rounded-2xl overflow-hidden aspect-video max-h-[75vh]">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Meta info block */}
            <div className="text-center text-white mt-4 space-y-1 py-1">
              <span className="text-xs font-mono text-puka-gold tracking-widest uppercase block">
                {activeLightbox.category}
              </span>
              <h2 className="text-xl sm:text-3xl font-display font-medium text-white">
                {activeLightbox.title}
              </h2>
              <div className="flex items-center justify-center space-x-2 text-gray-400 mt-2 text-xs">
                <Camera className="w-4 h-4 text-puka-gold" />
                <span>Captured Premium Handcrafted Asset</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
