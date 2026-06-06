import React from 'react';

interface LogoProps {
  showSubtitle?: boolean;
  lightMode?: boolean;
  className?: string;
}

export default function Logo({ showSubtitle = true, lightMode = false, className = '' }: LogoProps) {
  const brandGold = '#C89B3C';
  
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <svg 
        viewBox="0 0 290 85" 
        className="w-full h-auto transition-all duration-300" 
        style={{ maxWidth: '100%' }}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ==================== P ==================== */}
        {/* Vertical Stem */}
        <path 
          d="M24 15 L24 64" 
          stroke={brandGold} 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
        {/* P Outer Loop */}
        <path 
          d="M24 15 C46 15 57 23 57 31 C57 39 46 47 24 47" 
          stroke={brandGold} 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        {/* Left notches */}
        <path d="M14 15 L24 15" stroke={brandGold} strokeWidth="6" strokeLinecap="round" />
        <path d="M14 31 L24 31" stroke={brandGold} strokeWidth="6" strokeLinecap="round" />
        <path d="M14 47 L24 47" stroke={brandGold} strokeWidth="6" strokeLinecap="round" />
        {/* Left hanging dot nodes */}
        <circle cx="9" cy="31" r="3.2" fill={brandGold} />
        <circle cx="9" cy="47" r="3.2" fill={brandGold} />
        {/* Inside loop key-spiral & center point */}
        <path 
          d="M37 31 A5 5 0 1 1 32 35" 
          stroke={brandGold} 
          strokeWidth="3.2" 
          strokeLinecap="round" 
          fill="none" 
        />
        <circle cx="32" cy="31" r="1.8" fill={brandGold} />

        {/* ==================== U ==================== */}
        {/* U Loop Path */}
        <path 
          d="M74 15 L74 46 C74 58 83 64 97 64 C111 64 120 58 120 46 L120 15" 
          stroke={brandGold} 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        {/* U Center Vertical Dot Sequence */}
        <circle cx="97" cy="27" r="2.2" fill={brandGold} />
        <circle cx="97" cy="37" r="3.2" fill={brandGold} />
        <circle cx="97" cy="48" r="4.6" fill={brandGold} />

        {/* ==================== K ==================== */}
        {/* Vertical Stem */}
        <path 
          d="M145 15 L145 64" 
          stroke={brandGold} 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
        {/* K Elegant Flared Top Branch */}
        <path 
          d="M145 41 C159 28 168 20 182 15" 
          stroke={brandGold} 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
        {/* K Elegant Bottom Branch */}
        <path 
          d="M145 41 L182 64" 
          stroke={brandGold} 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
        {/* K Parallel Diagonal Dots sequence */}
        <circle cx="159" cy="38" r="2.2" fill={brandGold} />
        <circle cx="169" cy="47" r="3.2" fill={brandGold} />
        <circle cx="179" cy="56" r="4.6" fill={brandGold} />

        {/* ==================== A ==================== */}
        {/* A Triangle legs */}
        <path 
          d="M232 15 L205 64" 
          stroke={brandGold} 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
        <path 
          d="M232 15 L259 64" 
          stroke={brandGold} 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
        {/* Curved Crossbar */}
        <path 
          d="M217 47 Q232 54 247 47" 
          stroke={brandGold} 
          strokeWidth="5" 
          strokeLinecap="round" 
        />
        {/* Hanging Centered Dot */}
        <circle cx="232" cy="56" r="4.8" fill={brandGold} />

        {/* ==================== SUBTITLE ==================== */}
        {showSubtitle && (
          <text 
            x="142" 
            y="81" 
            textAnchor="middle" 
            fill={brandGold} 
            fontSize="14.5" 
            fontWeight="bold"
            letterSpacing="0.08em"
            style={{ 
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              textTransform: 'uppercase'
            }}
          >
            Puttum Kattanum™
          </text>
        )}
      </svg>
    </div>
  );
}
