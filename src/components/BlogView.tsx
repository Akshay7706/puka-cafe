import { useState, useMemo } from 'react';
import { BookOpen, Calendar, Clock, ChevronRight, Share2, CornerDownRight } from 'lucide-react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';

export default function BlogView() {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  // Derive unique tags from BLOG_POSTS
  const allTags = useMemo(() => {
    const list = new Set<string>();
    BLOG_POSTS.forEach((post) => {
      post.tags.forEach((tag) => list.add(tag));
    });
    return ['all', ...Array.from(list)];
  }, []);

  const filteredPosts = useMemo(() => {
    if (selectedTag === 'all') return BLOG_POSTS;
    return BLOG_POSTS.filter((post) => post.tags.includes(selectedTag));
  }, [selectedTag]);

  return (
    <div id="blog-view" className="bg-puka-bg font-sans pb-24 min-h-screen">
      
      {/* Premium Hero Banner */}
      <div className="relative bg-[#111111] text-white overflow-hidden pt-36 pb-20 mb-12 flex items-center justify-center border-b border-puka-gold/20">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/puka_hero_chaya_puttu_1780713067104.png" 
            alt="The PuKa Journal, Stories & Steam" 
            className="w-full h-full object-cover object-center opacity-30 filter brightness-[35%] contrast-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/45" />
        </div>
        
        {/* Banner Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="text-puka-gold font-mono text-[10px] uppercase tracking-[0.3em] font-bold mb-3 block">
            Chayakkada Chronicles
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-3xl font-display font-medium text-white tracking-tight mb-4">
            The PuKa Journal
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            Behind-the-scenes stories, scientific secrets of brewing tea, regional recipes, and exploration of timeless Kerala food heritage.
          </p>
          <div className="w-16 h-[2px] bg-puka-gold/40 mx-auto mt-6 rounded-full" />
        </div>
      </div>

      {/* Tags Filters Swiper bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-center">
        <div className="bg-white p-2 border border-gray-100 rounded-full shadow-sm flex flex-nowrap items-center gap-1 overflow-x-auto max-w-full py-1 scrollbar-none no-scrollbar">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all focus:outline-none ${

                selectedTag === tag
                  ? 'bg-puka-black text-puka-gold shadow-md'
                  : 'bg-transparent text-gray-500 hover:text-puka-black'
              }`}
            >
              {tag === 'all' ? 'All Stories' : tag}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              id={`blog-card-${post.slug}`}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-puka-gold/30 transition-all duration-300 flex flex-col group text-left"
            >
              {/* Card Banner Image */}
              <div className="aspect-[16/10] w-full bg-gray-50 overflow-hidden relative shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Float tag */}
                <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                  {post.tags.slice(0, 1).map((t) => (
                    <span key={t} className="bg-puka-black/85 backdrop-blur-sm text-puka-gold font-mono text-[9px] uppercase font-bold px-2.5 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Content body */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  
                  {/* Meta facts Row */}
                  <div className="flex items-center space-x-3 text-gray-400 font-mono text-[10px] uppercase">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-puka-gold" />
                      <span>{post.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-gray-900 font-display font-bold text-lg sm:text-xl leading-snug group-hover:text-puka-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                </div>

                <div className="border-t border-gray-50 pt-5 mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-gray-200"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-left">
                      <h5 className="font-bold text-puka-black text-[11px] leading-tight">{post.author.name}</h5>
                      <p className="text-gray-400 text-[9px] uppercase font-mono mt-0.5">{post.author.role}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveArticle(post)}
                    className="w-10 h-10 rounded-full bg-puka-bg hover:bg-puka-gold hover:text-puka-black text-gray-600 flex items-center justify-center transition-all focus:outline-none"
                    id={`btn-read-${post.slug}`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* LONG-READING ARTICLE MODAL POPUP */}
      {activeArticle && (
        <div id="article-reader-overlay" className="fixed inset-0 bg-puka-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 border border-puka-gold/20 shadow-2xl relative animate-scaleIn select-none max-h-[90vh] overflow-y-auto text-left">
            
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-puka-bg hover:bg-puka-gold hover:text-puka-black text-gray-500 flex items-center justify-center transition-all focus:outline-none z-10"
              id="btn-close-article"
            >
              ✕
            </button>

            <span className="text-puka-accent font-mono text-[10px] tracking-widest uppercase font-bold block mb-2">
              JOURNAL ARTICLE • {activeArticle.readTime}
            </span>

            <h2 className="text-2xl sm:text-4xl font-display font-medium text-puka-black mb-6 leading-tight">
              {activeArticle.title}
            </h2>

            {/* Author card row */}
            <div className="flex flex-wrap items-center gap-4 bg-puka-bg p-4 rounded-2xl border border-gray-100 mb-8">
              <img
                src={activeArticle.author.avatar}
                alt={activeArticle.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div className="text-left flex-grow">
                <p className="text-xs font-mono text-gray-400 uppercase">COLUMNIST AUTHOR</p>
                <h4 className="font-display font-bold text-puka-black text-base">{activeArticle.author.name}</h4>
                <p className="text-gray-500 text-xs mt-0.5">{activeArticle.author.role}</p>
              </div>
              <div className="text-left text-xs text-gray-400 font-mono hidden sm:block">
                <p className="font-bold text-puka-accent uppercase">RELEASED</p>
                <p>{activeArticle.date}</p>
              </div>
            </div>

            {/* Large banner copy image */}
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gray-100 mb-8">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Typography article body contents */}
            <div className="prose max-w-none text-gray-700 text-sm sm:text-base leading-relaxed space-y-5 font-serif border-b border-gray-100 pb-8">
              <p className="first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:text-puka-accent first-letter:mr-3 first-letter:float-left">
                {activeArticle.content.split('. ')[0]}.
              </p>
              <p>
                {activeArticle.content.split('. ').slice(1).join('. ')}
              </p>
              <p>
                Each branch implements this slow cooking method with great care. Sourced directly from local gardens in Kerala, standard cardamom pods and sun-dried chillies allow the spices inside the food card menu to burst with flavor. It is our absolute promise of quality and heritage.
              </p>
            </div>

            {/* Sharing & tag footnotes column */}
            <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono text-gray-400 uppercase font-bold mr-1">Tags:</span>
                {activeArticle.tags.map((t) => (
                  <span key={t} className="bg-puka-bg border border-gray-200 text-puka-black font-semibold text-[10px] px-2.5 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => alert(`Post link shared to clipboard under tag /blog/${activeArticle.slug}`)}
                className="flex items-center space-x-1.5 bg-puka-bg hover:bg-puka-gold hover:text-puka-black text-gray-600 px-4 py-2 rounded-full text-xs font-bold transition-all focus:outline-none"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Post</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
