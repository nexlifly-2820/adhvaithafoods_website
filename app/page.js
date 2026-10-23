'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/HeroCarousel';
import SignatureSection from '@/components/SignatureSection';
import AdhvaithaPromise from '@/components/AdhvaithaPromise';
import { ShoppingCart, ArrowRight, ChevronRight } from 'lucide-react';

/* ── Scroll-reveal hook ───────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

import { ALL_PRODUCTS } from '@/components/productsData';

// Dynamic featured products will be fetched inside the component

const DEFAULT_INGREDIENTS = [
  { name: 'Raw Green Mangoes', source: 'Andhra Orchards', img: '/images/ing_mango.png', bg: 'rgba(74,124,64,0.12)' },
  { name: 'Red Kashmiri Chilies', source: 'Sun-dried 7 days', img: '/images/ing_chili.png', bg: 'rgba(185,28,28,0.1)' },
  { name: 'Cold-Pressed Sesame Oil', source: 'Wooden press', img: '/images/ing_oil.png', bg: 'rgba(217,119,6,0.1)' },
  { name: 'Mustard Seeds', source: 'Stone-ground fresh', img: '/images/ing_mustard.png', bg: 'rgba(120,53,15,0.1)' },
  { name: 'Himalayan Rock Salt', source: 'Pure & unprocessed', img: '/images/ing_salt.png', bg: 'rgba(100,116,139,0.1)' },
  { name: 'Fresh Curry Leaves', source: 'Handpicked daily', img: '/images/ing_leaves.png', bg: 'rgba(21,128,61,0.1)' },
  { name: 'Fresh Garlic', source: 'Peeled by hand', img: '/images/ing_garlic_real.png', bg: 'rgba(245,245,220,0.3)' },
  { name: 'Whole Coriander', source: 'Aromatic & earthy', img: '/images/ing_coriander_real.png', bg: 'rgba(217,119,6,0.1)' },
];

const testimonials = [
  { text: 'Exactly like my naani used to make! The mango avakaya is absolutely perfect — the right amount of spice and oil. Will never buy from a supermarket again.', author: 'Priya Sharma', city: 'Hyderabad' },
  { text: 'Ordered the combo pack and finished it in a week! The gongura pickle is outstanding. Pure authentic Andhra taste. Fast delivery too.', author: 'Ravi Kumar', city: 'Bangalore' },
  { text: 'My mother cried when she tasted the lemon pickle — said it reminded her of her mother\'s recipe. That says everything. Thank you Avdaitha Foods.', author: 'Meena Reddy', city: 'Chennai' },
  { text: 'The red chilli pickle is incredible! It has that authentic smoky heat and richness that you just can\'t find anywhere else. Absolutely love it.', author: 'Sanjay Patel', city: 'Mumbai' },
];

const trustBadges = ['🌿 100% Natural', '🚫 No Preservatives', '👵 Family Recipe Since 1970', '🏺 Traditional Method', '📦 Pan India Delivery', '☀️ Sun-Dried Always', '🪨 Stone-Ground Spices', '🫙 Glass Jars Only'];

const FALLBACK_RECIPES = [
  { id: 'allam-velluli-pickle-recipe', name: 'Allam Velluli Pickle Rice', time: '10 min', emoji: '🍚', color: '#C4603A', desc: 'Hot rice tossed with our traditional Allam Velluli Pickle, sesame seeds, and a drizzle of ghee.' },
  { id: 'crispy-allu-chips', name: 'Crispy Allu Chips', time: '20 min', emoji: '🥔', color: '#E8A820', desc: 'Make perfectly crispy, golden potato chips at home with this simple traditional method.' },
  { id: 'daniya-powder-rasam', name: 'Daniya Powder Rasam', time: '20 min', emoji: '🥣', color: '#2D5A27', desc: 'A comforting, deeply aromatic rasam made using freshly ground Daniya Powder.' },
  { id: 'millets-kheer', name: 'Millets Laddu Kheer', time: '15 min', emoji: '🍨', color: '#8B5E3C', desc: 'Comforting, creamy kheer made by crumbling Millets Laddu into warm milk.' },
];

/* ══ PRODUCT CARD MANDALA DESIGN (Brar's Style) ══ */
const HOME_CARD_BG_COLORS = [
  '#C4603A', // Rich Terracotta / Clay
  '#2E7D32', // Rich Curry Green
  '#D35400', // Warm Amber Ochre
  '#E67E22', // Golden Saffron / Turmeric
  '#C0392B', // Vibrant Chilli Red
  '#00838F', // Deep Peacock Teal
];

const HOME_CATEGORY_ROWS = [
  {
    id: 'pickles',
    name: 'Authentic Pickles',
    eyebrow: 'TRADITIONAL TELUGU AVAKAYA',
    categoryKey: 'Prepared Foods',
    defaultNames: ['Mango Pickle', 'Allam Avakaya', 'Usiri Pickle', 'Pandu Mirchi']
  },
  {
    id: 'podis',
    name: 'Stone-Ground Podis',
    eyebrow: 'AROMATIC SPICE POWDERS',
    categoryKey: 'Salts, spices, soups',
    defaultNames: ['Karvepaku Karam', 'Special Kura Karam', 'Allam Velluli Karam', 'Daniya Powder']
  },
  {
    id: 'snacks',
    name: 'Crispy Savouries',
    eyebrow: 'CRUNCHY TEA-TIME SNACKS',
    categoryKey: 'Ready-to-eat savouries',
    defaultNames: ['Muthyala Chudwa', 'Allu Chips', 'Chakinalu', 'Bundhi']
  },
  {
    id: 'sweets',
    name: 'Traditional Sweets',
    eyebrow: 'PURE GHEE & JAGGERY DELIGHTS',
    categoryKey: 'Indian Sweets & Snacks',
    defaultNames: ['Sunnunda Laddu', 'Dry Fruits Laddu', 'Millets Laddu', 'Palli Patti']
  }
];

function HomeCardBackgroundDesign({ color, isHovered }) {
  // When not hovered: soft muted translucent warm beige/cream matching products page
  // When hovered: vibrant spice color with dynamic rotation and scale
  const petalFill = isHovered ? color : '#E7DDCF';
  const petalOpacity = isHovered ? 0.98 : 0.65;

  return (
    <div
      className="product-card-mandala"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '300px',
        height: '300px',
        marginTop: '-150px',
        marginLeft: '-150px',
        pointerEvents: 'none',
        zIndex: 1,
        transition: 'transform 0.85s cubic-bezier(0.2, 0.9, 0.3, 1)',
        transform: isHovered ? 'rotate(180deg) scale(1.08)' : 'rotate(0deg) scale(1)',
      }}
    >
      <svg viewBox="0 0 240 240" width="100%" height="100%" style={{ overflow: 'visible' }}>
        <g fill={petalFill} style={{ transition: 'fill 0.4s ease, opacity 0.4s ease', opacity: petalOpacity }}>
          {/* 16 Organic Rounded Petals matching Brar's silhouette */}
          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg) => (
            <path
              key={`home-petal-${deg}`}
              d="M 120 12 C 132 12, 142 58, 120 74 C 98 58, 108 12, 120 12 Z"
              transform={`rotate(${deg} 120 120)`}
            />
          ))}
          {/* Interleaved secondary flares */}
          {[11.25, 33.75, 56.25, 78.75, 101.25, 123.75, 146.25, 168.75, 191.25, 213.75, 236.25, 258.75, 281.25, 303.75, 326.25, 348.75].map((deg) => (
            <polygon
              key={`home-flare-${deg}`}
              points="120,28 129,82 120,72 111,82"
              transform={`rotate(${deg} 120 120)`}
            />
          ))}
          {/* Center disk */}
          <circle cx="120" cy="120" r="68" fill={petalFill} style={{ transition: 'fill 0.4s ease' }} />
          {/* Inner decorative dotted ring */}
          <circle cx="120" cy="120" r="102" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 6" opacity={isHovered ? 0.7 : 0.35} style={{ transition: 'opacity 0.4s ease' }} />
        </g>
      </svg>
    </div>
  );
}

const getBustedUrl = (url) => {
  if (!url) return '/images/products/mango-pickle-real.jpg?v=20261022v2';
  if (url.startsWith('/images/')) {
    return url.includes('?') ? url : `${url}?v=20261022v2`;
  }
  return url;
};

function FeaturedProductCard({ product, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(getBustedUrl(product.img));
  const bgColor = HOME_CARD_BG_COLORS[index % HOME_CARD_BG_COLORS.length];
  const floatDelay = `${(index % 4) * 0.75}s`;

  useEffect(() => {
    setImgSrc(getBustedUrl(product.img));
  }, [product.img]);

  return (
    <div
      key={product.id}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'transparent',
        padding: '0 0.5rem 2rem 0.5rem',
        marginTop: '10px',
        animationDelay: `${index * 0.1}s`,
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/products?search=${encodeURIComponent(product.name)}`}
        style={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Product Image Stage with Rolling Background Design */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '240px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
            overflow: 'visible',
          }}
        >
          {/* Rolling Background Mandala Design */}
          <HomeCardBackgroundDesign color={bgColor} isHovered={isHovered} />

          {/* Floating Jar/Packaging Container with Zoom-In on Hover */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              animation: 'homeProductFloat 3.8s ease-in-out infinite alternate',
              animationDelay: floatDelay,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '210px',
                height: '210px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.55s cubic-bezier(0.2, 0.9, 0.3, 1), filter 0.55s ease',
                transform: isHovered ? 'scale(1.14)' : 'scale(1)',
                filter: isHovered
                  ? 'drop-shadow(0 22px 28px rgba(0,0,0,0.36))'
                  : 'drop-shadow(0 10px 16px rgba(0,0,0,0.2))',
              }}
            >
              <img
                src={imgSrc}
                alt={product.name}
                onError={() => {
                  if (imgSrc !== getBustedUrl(product.fallbackImg) && product.fallbackImg) {
                    setImgSrc(getBustedUrl(product.fallbackImg));
                  } else if (imgSrc !== getBustedUrl('/images/products/mango-pickle-real.jpg')) {
                    setImgSrc(getBustedUrl('/images/products/mango-pickle-real.jpg'));
                  }
                }}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  borderRadius: '16px',
                }}
              />
            </div>
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.4rem',
            fontWeight: 900,
            color: '#111',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: '0.75rem',
            minHeight: '3.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: '-0.01em',
          }}
        >
          {product.name}
        </h3>

        {/* Stats Pill / Badge */}
        <div
          style={{
            backgroundColor: '#111',
            padding: '0.35rem 0.9rem',
            marginBottom: '1rem',
            borderRadius: '999px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: '0.72rem',
              fontWeight: 800,
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            ✓ {product.tag || 'AUTHENTIC'} • MIN 250G - 2KG
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontSize: '0.88rem',
            fontWeight: 500,
            color: '#555',
            textAlign: 'center',
            lineHeight: 1.55,
            marginBottom: '0',
            flex: 1,
            maxWidth: '92%',
          }}
        >
          {product.desc}
        </p>
      </Link>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HOMEPAGE
═══════════════════════════════════════════════════ */
const FALLBACK_HERO_IMAGES = [
  '/images/hero-1-pickle.jpg',
  '/images/hero-2-powder.jpg',
  '/images/hero-3-laddu.jpg',
];

const MICHA_SLIDES = [
  { bgColor: '#E3242B', label: 'MANGO PICKLE', img: '/images/products/1000298812 - Edited.png', particles: ['🥭', '🌶️', '🌿', '🥭', '✨', '🌶️'], fontFamily: 'var(--font-lilita), system-ui, sans-serif' },
  { bgColor: '#83B748', label: 'USIRI PICKLE', img: '/images/products/1000298817 - Edited.png', particles: ['🍏', '🍃', '✨', '🍏', '🌿', '🍃'], fontFamily: 'var(--font-yellowtail), cursive' },
  { bgColor: '#F23D69', label: 'SPICY MANGO', img: '/images/products/1000298812 - Edited.png', particles: ['🌶️', '🔥', '🥭', '🌶️', '✨', '🔥'], fontFamily: 'var(--font-lilita), system-ui, sans-serif' },
  { bgColor: '#8F2090', label: 'SWEET USIRI', img: '/images/products/1000298817 - Edited.png', particles: ['🍯', '🍏', '✨', '🍯', '🌿', '🍏'], fontFamily: 'var(--font-yellowtail), cursive' }
];

const MICHA_BACKDROPS = [
  // Slide 0: Mango Pickle (Pink/Red)
  (
    <>
      <div style={{ position: 'absolute', width: '100%', height: '100%', animation: 'fly-in-left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '15%', left: '10%', width: '25vh', height: '25vh', animation: 'spin-in-place-slow 40s linear infinite' }}>
          <path fill="#7D62AB" d="M50,30 C50,10 20,10 20,35 C20,60 50,85 50,85 C50,85 80,60 80,35 C80,10 50,10 50,30 Z" transform="rotate(-30 50 50)" />
          <circle cx="35" cy="40" r="2" fill="#FCE300" />
          <circle cx="45" cy="30" r="2" fill="#FCE300" />
          <circle cx="55" cy="45" r="2" fill="#FCE300" />
          <circle cx="40" cy="55" r="2" fill="#FCE300" />
        </svg>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '30%', left: '15%', width: '35vh', height: '35vh', animation: 'spin-in-place-slow 35s linear infinite reverse' }}>
          <circle cx="50" cy="50" r="40" fill="#CC0044" />
          <path d="M10,50 L5,50 M90,50 L95,50 M50,10 L50,5 M50,90 L50,95" stroke="#CC0044" strokeWidth="4" />
          <path d="M22,22 L18,18 M78,78 L82,82 M22,78 L18,82 M78,22 L82,18" stroke="#CC0044" strokeWidth="4" />
          <path d="M40,30 Q42,32 40,34 M60,40 Q62,42 60,44 M35,60 Q37,62 35,64 M65,65 Q67,67 65,69 M50,50 Q52,52 50,54" stroke="#FF6699" fill="none" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div style={{ position: 'absolute', width: '100%', height: '100%', animation: 'fly-in-right 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '60%', left: '15%', width: '30vh', height: '30vh', animation: 'spin-in-place-slow 25s linear infinite' }}>
          <circle cx="50" cy="50" r="45" fill="#FCE300" />
          <circle cx="50" cy="50" r="40" fill="#FF4400" />
          <path d="M50,10 L50,90 M10,50 L90,50 M22,22 L78,78 M22,78 L78,22" stroke="#FCE300" strokeWidth="3" />
        </svg>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '15%', left: '30%', width: '40vh', height: '40vh', animation: 'spin-in-place-slow 30s linear infinite reverse' }}>
          <path fill="#EE2233" d="M50,5 C70,-5 95,20 90,45 C105,65 80,95 55,90 C35,105 5,80 10,55 C-5,35 20,5 50,5 Z" />
          <path fill="#CC1122" d="M50,15 C65,5 85,25 80,45 C95,60 75,85 55,80 C40,95 15,75 20,55 C5,40 25,15 50,15 Z" />
        </svg>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '55%', left: '30%', width: '35vh', height: '35vh', animation: 'spin-in-place-slow 20s linear infinite' }}>
          <path fill="#7D62AB" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(0 50 50)" />
          <path fill="#7D62AB" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(45 50 50)" />
          <path fill="#7D62AB" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(90 50 50)" />
          <path fill="#7D62AB" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(135 50 50)" />
          <path fill="#7D62AB" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(180 50 50)" />
          <path fill="#7D62AB" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(225 50 50)" />
          <path fill="#7D62AB" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(270 50 50)" />
          <path fill="#7D62AB" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(315 50 50)" />
          <circle cx="50" cy="50" r="15" fill="#5C4585" />
        </svg>
      </div>
    </>
  ),
  // Slide 1: Usiri Pickle (Green)
  (
    <>
      <div style={{ position: 'absolute', width: '100%', height: '100%', animation: 'fly-in-left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '15%', left: '15%', width: '35vh', height: '35vh', animation: 'spin-in-place-slow 35s linear infinite' }}>
          <path fill="#FFF" d="M50,0 C70,0 100,30 100,50 C100,70 70,100 50,100 C30,100 0,70 0,50 C0,30 30,0 50,0 Z" />
        </svg>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '50%', left: '10%', width: '30vh', height: '30vh', animation: 'spin-in-place-slow 25s linear infinite reverse' }}>
          <circle cx="50" cy="50" r="45" fill="#FFC107" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#FFF" strokeWidth="3" strokeDasharray="10 10" />
        </svg>
      </div>
      <div style={{ position: 'absolute', width: '100%', height: '100%', animation: 'fly-in-right 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '10%', left: '35%', width: '45vh', height: '45vh', animation: 'spin-in-place-slow 40s linear infinite reverse' }}>
          <path fill="#4CAF50" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(0 50 50)" />
          <path fill="#4CAF50" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(72 50 50)" />
          <path fill="#4CAF50" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(144 50 50)" />
          <path fill="#4CAF50" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(216 50 50)" />
          <path fill="#4CAF50" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(288 50 50)" />
        </svg>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '60%', left: '40%', width: '30vh', height: '30vh', animation: 'spin-in-place-slow 20s linear infinite' }}>
          <circle cx="50" cy="50" r="40" fill="#CDDC39" />
          <circle cx="50" cy="50" r="20" fill="#FFF" />
        </svg>
      </div>
    </>
  ),
  // Slide 2: Spicy Mango (Pink/Red)
  (
    <>
      <div style={{ position: 'absolute', width: '100%', height: '100%', animation: 'fly-in-left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '20%', left: '10%', width: '40vh', height: '40vh', animation: 'spin-in-place-slow 35s linear infinite' }}>
          <path fill="#FF5722" d="M50,0 C80,30 100,50 50,100 C0,50 20,30 50,0 Z" />
        </svg>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '55%', left: '15%', width: '25vh', height: '25vh', animation: 'spin-in-place-slow 20s linear infinite reverse' }}>
          <circle cx="50" cy="50" r="45" fill="#FFEB3B" />
          <path d="M50,5 L50,95 M5,50 L95,50 M15,15 L85,85 M15,85 L85,15" stroke="#FF5722" strokeWidth="4" />
        </svg>
      </div>
      <div style={{ position: 'absolute', width: '100%', height: '100%', animation: 'fly-in-right 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '10%', left: '35%', width: '35vh', height: '35vh', animation: 'spin-in-place-slow 25s linear infinite reverse' }}>
          <circle cx="50" cy="50" r="40" fill="#E91E63" />
          <circle cx="50" cy="50" r="10" fill="#FFF" />
          <circle cx="30" cy="30" r="5" fill="#FFF" />
          <circle cx="70" cy="30" r="5" fill="#FFF" />
          <circle cx="30" cy="70" r="5" fill="#FFF" />
          <circle cx="70" cy="70" r="5" fill="#FFF" />
        </svg>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '65%', left: '30%', width: '35vh', height: '35vh', animation: 'spin-in-place-slow 40s linear infinite' }}>
          <path fill="#FF9800" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(0 50 50)" />
          <path fill="#FF9800" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(90 50 50)" />
          <path fill="#FF9800" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(180 50 50)" />
          <path fill="#FF9800" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(270 50 50)" />
        </svg>
      </div>
    </>
  ),
  // Slide 3: Sweet Usiri (Purple)
  (
    <>
      <div style={{ position: 'absolute', width: '100%', height: '100%', animation: 'fly-in-left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '15%', left: '15%', width: '30vh', height: '30vh', animation: 'spin-in-place-slow 30s linear infinite' }}>
          <circle cx="50" cy="50" r="45" fill="#00BCD4" />
          <circle cx="50" cy="50" r="25" fill="#FFF" />
        </svg>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '50%', left: '5%', width: '40vh', height: '40vh', animation: 'spin-in-place-slow 40s linear infinite reverse' }}>
          <path fill="#E040FB" d="M50,0 C70,0 80,30 50,50 C20,30 30,0 50,0 Z" transform="rotate(0 50 50)" />
          <path fill="#E040FB" d="M50,0 C70,0 80,30 50,50 C20,30 30,0 50,0 Z" transform="rotate(72 50 50)" />
          <path fill="#E040FB" d="M50,0 C70,0 80,30 50,50 C20,30 30,0 50,0 Z" transform="rotate(144 50 50)" />
          <path fill="#E040FB" d="M50,0 C70,0 80,30 50,50 C20,30 30,0 50,0 Z" transform="rotate(216 50 50)" />
          <path fill="#E040FB" d="M50,0 C70,0 80,30 50,50 C20,30 30,0 50,0 Z" transform="rotate(288 50 50)" />
        </svg>
      </div>
      <div style={{ position: 'absolute', width: '100%', height: '100%', animation: 'fly-in-right 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '10%', left: '35%', width: '35vh', height: '35vh', animation: 'spin-in-place-slow 25s linear infinite' }}>
          <path fill="#FFEB3B" d="M50,5 C70,-5 95,20 90,45 C105,65 80,95 55,90 C35,105 5,80 10,55 C-5,35 20,5 50,5 Z" />
        </svg>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '65%', left: '30%', width: '30vh', height: '30vh', animation: 'spin-in-place-slow 20s linear infinite reverse' }}>
          <circle cx="50" cy="50" r="45" fill="#FF4081" />
          <circle cx="30" cy="50" r="10" fill="#FFF" />
          <circle cx="70" cy="50" r="10" fill="#FFF" />
          <circle cx="50" cy="30" r="10" fill="#FFF" />
          <circle cx="50" cy="70" r="10" fill="#FFF" />
        </svg>
      </div>
    </>
  )
];

/* ══ BANH MI WORLD STYLE STAMP SIGNATURE CARD ══ */
const SIGNATURE_STAMP_CARDS = [
  {
    title: 'Avakaya',
    desc: 'Sun-dried raw mangoes, cold-pressed sesame oil, heirloom spices.',
    tags: ['#SPICY', '#ANDHRA_SPECIAL'],
    img: '/images/products/mango-pickle.jpg',
    cardBg: '#C85228',       // Terracotta warm orange
    stampBorder: '#8A2D14',  // Deep rich terracotta edge
    stampHoles: '#FBF5E8',   // Match page cream background
  },
  {
    title: 'Gongura',
    desc: 'Tangy sorrel leaves slow-cooked with roasted red chillies.',
    tags: ['#TANGY', '#HERITAGE'],
    img: '/images/hero/gongura.png',
    cardBg: '#376843',       // Olive forest green
    stampBorder: '#1F4229',  // Dark pine green edge
    stampHoles: '#FBF5E8',
  },
  {
    title: 'Allam Pickle',
    desc: 'Golden sun-cured ginger & garlic with rich jaggery undertones.',
    tags: ['#WARMTH', '#HOMEMADE'],
    img: '/images/products/allam-velluli-pickle.jpg',
    cardBg: '#E06B26',       // Bright turmeric orange
    stampBorder: '#A6410A',  // Deep burnt orange edge
    stampHoles: '#FBF5E8',
  },
  {
    title: 'Chilli Podi',
    desc: 'Slow stone-ground red chillies and roasted aromatic pulses.',
    tags: ['#CRUNCHY', '#FIERY_HEAT'],
    img: '/images/products/allam-velluli-karam.jpg',
    cardBg: '#5A3825',       // Heritage dark brown
    stampBorder: '#361E11',  // Espresso deep edge
    stampHoles: '#FBF5E8',
  },
];

function StampSignatureCard({ item, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.25rem 1rem 2rem 1rem',
        borderRadius: '16px',
        background: item.cardBg,
        boxShadow: isHovered 
          ? '0 24px 45px rgba(0,0,0,0.22)' 
          : '0 12px 28px rgba(0,0,0,0.12)',
        transition: 'transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1), box-shadow 0.45s ease',
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        cursor: 'pointer',
        overflow: 'hidden',
        minHeight: '440px',
        border: `8px solid ${item.stampBorder}`,
        outline: '1px solid rgba(0,0,0,0.06)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative Scalloped Stamp Holes around Border (Banh Mi World stamp effect) */}
      <div 
        style={{
          position: 'absolute',
          inset: '-8px',
          pointerEvents: 'none',
          backgroundImage: `
            radial-gradient(circle at 10px 0, ${item.stampHoles} 7px, transparent 8px),
            radial-gradient(circle at 10px 100%, ${item.stampHoles} 7px, transparent 8px),
            radial-gradient(circle at 0 10px, ${item.stampHoles} 7px, transparent 8px),
            radial-gradient(circle at 100% 10px, ${item.stampHoles} 7px, transparent 8px)
          `,
          backgroundSize: '24px 100%, 24px 100%, 100% 24px, 100% 24px',
          backgroundPosition: '0 0, 0 100%, 0 0, 100% 0',
          backgroundRepeat: 'repeat-x, repeat-x, repeat-y, repeat-y',
          zIndex: 1,
        }}
      />

      {/* Product Image Stage */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '210px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '185px',
            height: '185px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.5s cubic-bezier(0.2, 0.9, 0.3, 1), filter 0.5s ease',
            transform: isHovered ? 'scale(1.12)' : 'scale(1)',
            filter: isHovered 
              ? 'drop-shadow(0 16px 22px rgba(0,0,0,0.45))' 
              : 'drop-shadow(0 8px 14px rgba(0,0,0,0.3))',
          }}
        >
          <img
            src={item.img}
            alt={item.title}
            onError={(e) => { e.target.onerror = null; e.target.src = '/images/products/mango-pickle.jpg'; }}
            style={{
              maxWidth: '92%',
              maxHeight: '92%',
              objectFit: 'contain',
              borderRadius: '16px',
            }}
          />
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: '"Montserrat", "Arial Black", sans-serif',
          fontSize: '1.9rem',
          fontWeight: 900,
          color: '#FFFFFF',
          textAlign: 'center',
          lineHeight: 1.1,
          marginBottom: '0.65rem',
          letterSpacing: '-0.02em',
          zIndex: 2,
        }}
      >
        {item.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '0.9rem',
          lineHeight: 1.45,
          color: 'rgba(255,255,255,0.92)',
          textAlign: 'center',
          fontWeight: 500,
          marginBottom: '1.5rem',
          padding: '0 0.5rem',
          flex: 1,
          zIndex: 2,
        }}
      >
        {item.desc}
      </p>

      {/* Hashtags Bottom */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          zIndex: 2,
          paddingTop: '0.5rem',
        }}
      >
        {item.tags.map((tag, tIdx) => (
          <span
            key={tIdx}
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.85)',
              textTransform: 'uppercase',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  useReveal();
  const [cmsData, setCmsData] = useState(null);
  const [ingredients, setIngredients] = useState(DEFAULT_INGREDIENTS);
  const [heroImages, setHeroImages] = useState(FALLBACK_HERO_IMAGES);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [categorySections, setCategorySections] = useState(() => {
    return HOME_CATEGORY_ROWS.map(cat => ({
      ...cat,
      products: cat.defaultNames.map(name => {
        const found = ALL_PRODUCTS.find(p => p.name.toLowerCase() === name.toLowerCase()) || ALL_PRODUCTS[0];
        return {
          ...found,
          tag: found.badge || 'AUTHENTIC',
          tagCls: found.badgeClass || '',
          accent: '#C4603A'
        };
      })
    }));
  });
  const [featuredRecipes, setFeaturedRecipes] = useState(FALLBACK_RECIPES);

  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        const res = await fetch('/api/web-data?doc_id=homepage_web');
        const text = await res.text();
        const json = text ? JSON.parse(text) : null;
        if (json && json.success && json.data) {
          const cmsData = json.data.data ? json.data.data : json.data;
          if (cmsData.ingredients && Array.isArray(cmsData.ingredients)) {
             setIngredients(cmsData.ingredients);
          }
        }
      } catch (err) {
        console.error('Failed to fetch CMS data', err);
      }
    };
    fetchCmsData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/web-products', { cache: 'no-store' });
        let apiProducts = [];
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            apiProducts = data.map(p => {
              const productName = p.productName || p.name || 'Unnamed Product';
              const cleanName = productName.toLowerCase().replace(/[^a-z0-9]/g, '');
              const fallbackItem = ALL_PRODUCTS.find(fp => fp.id === p.id || fp.name.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanName)
                || ALL_PRODUCTS.find(fp => {
                  const fpClean = fp.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                  return cleanName.includes(fpClean) || fpClean.includes(cleanName);
                });
              const fallbackImg = fallbackItem ? fallbackItem.img : '/images/products/mango-pickle-real.jpg';
              const remoteImg = (p.images && p.images.length > 0 && p.images[0]) ? p.images[0] : p.img;
              const chosenImg = (fallbackItem && fallbackItem.img) ? fallbackItem.img : (remoteImg || fallbackImg);
              return {
                ...p,
                id: p.id || Math.random().toString(),
                name: productName,
                desc: p.productDescription || p.desc || (fallbackItem ? fallbackItem.desc : ''),
                img: chosenImg,
                fallbackImg: fallbackImg,
                rating: p.rating || 5,
                reviews: p.reviews || Math.floor(Math.random() * 100) + 10,
                updatedAt: p.updatedAt || p.createdAt || 0
              };
            });
          }
        }

        // Combine API products and local ALL_PRODUCTS (API products take precedence if same id)
        const combinedProducts = [...apiProducts];
        for (const localP of ALL_PRODUCTS) {
          if (!combinedProducts.find(p => p.id === localP.id || p.name === localP.name)) {
            combinedProducts.push(localP);
          }
        }

        const normalize = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

        const updatedCategorySections = HOME_CATEGORY_ROWS.map(cat => {
          const normalizedCat = normalize(cat.categoryKey);

          // Find products matching this category
          const catProducts = combinedProducts.filter(p => {
            const pCat = normalize(p.category);
            return pCat === normalizedCat || pCat.includes(normalizedCat) || normalizedCat.includes(pCat);
          });

          // Sort by recent / updated
          catProducts.sort((a, b) => {
            const dateA = new Date(a.updatedAt || 0).getTime();
            const dateB = new Date(b.updatedAt || 0).getTime();
            return dateB - dateA;
          });

          const rowProducts = [];
          // 1. Prioritize signature items in defaultNames
          for (const defName of cat.defaultNames) {
            const cleanDef = normalize(defName);
            const found = catProducts.find(p => normalize(p.name) === cleanDef) ||
                          combinedProducts.find(p => normalize(p.name) === cleanDef) ||
                          ALL_PRODUCTS.find(p => normalize(p.name) === cleanDef);
            if (found && !rowProducts.find(sp => sp.id === found.id || normalize(sp.name) === normalize(found.name))) {
              rowProducts.push({
                ...found,
                tag: found.badge || 'AUTHENTIC',
                tagCls: found.badgeClass || '',
                accent: '#C4603A'
              });
            }
          }

          // 2. Fill remaining slots up to 4 items from catProducts
          for (const p of catProducts) {
            if (rowProducts.length >= 4) break;
            if (!rowProducts.find(sp => sp.id === p.id || normalize(sp.name) === normalize(p.name))) {
              rowProducts.push({
                ...p,
                tag: p.badge || 'AUTHENTIC',
                tagCls: p.badgeClass || '',
                accent: '#C4603A'
              });
            }
          }

          return {
            ...cat,
            products: rowProducts.slice(0, 4)
          };
        });

        setCategorySections(updatedCategorySections);

      } catch (error) {
        console.error('Error fetching products:', error);
        const defaultSections = HOME_CATEGORY_ROWS.map(cat => ({
          ...cat,
          products: cat.defaultNames.map(name => {
            const found = ALL_PRODUCTS.find(p => p.name.toLowerCase() === name.toLowerCase()) || ALL_PRODUCTS[0];
            return {
              ...found,
              tag: found.badge || 'AUTHENTIC',
              tagCls: found.badgeClass || '',
              accent: '#C4603A'
            };
          })
        }));
        setCategorySections(defaultSections);
      }
    };

    const fetchRecipes = async () => {
      try {
        const res = await fetch('/api/web-recipes');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            // Sort by updatedAt descending
            const sortedRecipes = data.sort((a, b) => {
              const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
              const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
              return dateB - dateA;
            });

            const apiRecipes = sortedRecipes.map(r => ({
              id: r.id || Math.random().toString(),
              name: r.recipeName || r.name || 'Unnamed Recipe',
              desc: r.recipeDescription || r.desc || '',
              time: (r.makingTime && r.makingTime.value) ? `${r.makingTime.value} ${r.makingTime.unit || 'min'}` : (r.time || '15 min'),
              color: r.color || '#C4603A',
              img: (r.images && r.images.length > 0) ? r.images[0] : (r.img || null),
              emoji: r.emoji || '🥘'
            }));

            // If less than 4, fill from fallback
            if (apiRecipes.length < 4) {
              const remaining = FALLBACK_RECIPES.filter(r => !apiRecipes.find(ar => ar.name === r.name));
              for (let i = 0; apiRecipes.length < 4 && i < remaining.length; i++) {
                apiRecipes.push(remaining[i]);
              }
            }
            setFeaturedRecipes(apiRecipes.slice(0, 4));
          }
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchProducts();
    fetchRecipes();
  }, []);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/web-data?doc_id=homepage_web');
        const text = await res.text();
        const json = text ? JSON.parse(text) : null;
        if (json && json.success && json.data) {
          const cmsData = json.data.data ? json.data.data : json.data;
          setCmsData(cmsData);
          if (cmsData.heroImages && Array.isArray(cmsData.heroImages) && cmsData.heroImages.length > 0) {
            setHeroImages(cmsData.heroImages);
          } else {
            setHeroImages(FALLBACK_HERO_IMAGES);
          }
        } else {
          setHeroImages(FALLBACK_HERO_IMAGES);
        }
      } catch (err) {
        console.error('Failed to fetch gallery images:', err);
        // Keep default FALLBACK_HERO_IMAGES on error
        setHeroImages(FALLBACK_HERO_IMAGES);
      }
    };
    fetchGallery();
  }, []);

  // Auto-scroll removed as requested by the user.

  const activeSlides = (cmsData && cmsData.michaSlides && cmsData.michaSlides.length > 0) ? cmsData.michaSlides : MICHA_SLIDES;
  const currentSlide = activeSlides[currentHeroIndex % activeSlides.length];
  const activeTestimonials = (cmsData && cmsData.testimonials && cmsData.testimonials.length > 0) ? cmsData.testimonials : testimonials;

  return (
    <>
      <Navbar />
      <main>

        {/* ══ HERO CAROUSEL ══════════════════════════════ */}
        <HeroCarousel />

        {/* ══ SIGNATURE PICKLES (Banh Mi World Style) ════════════ */}
        <SignatureSection />


        {/* ══ THE ADHVAITHA PROMISE (SUCKERPUNCH STYLE DUAL BLOCK) ════════════ */}
        <AdhvaithaPromise />

                {/* ══ PRODUCTS ═══════════════════════════════ */}
        <section id="featured-products" className="section-pad-xl" style={{ background: 'var(--cream)', paddingBottom: '6rem' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '6rem' }} className="reveal">
              <span className="eyebrow" style={{ color: '#C4603A', fontWeight: 900, letterSpacing: '0.2em', display: 'inline-block', marginBottom: '1rem' }}>
                {cmsData?.productsHeader?.eyebrow || 'IN OUR COLLECTION'}
              </span>
              <h2 style={{
                fontFamily: "'Oswald', 'Bebas Neue', system-ui, sans-serif",
                fontSize: 'clamp(2.8rem, 5.5vw, 4.6rem)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                lineHeight: 1.05,
                color: '#134027',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {cmsData?.productsHeader?.titlePart1 || 'OUR BELOVED'}<br/>
                <span style={{ color: '#C4603A' }}>{cmsData?.productsHeader?.titlePart2 || 'COLLECTIONS'}</span>
              </h2>
              <p style={{
                maxWidth: '960px',
                margin: '0 auto',
                fontSize: 'clamp(0.95rem, 1.2vw, 1.12rem)',
                color: '#444',
                lineHeight: 1.5,
                textAlign: 'center'
              }}>
                {cmsData?.productsHeader?.description || 'Every jar tells a story of love and tradition — transforming simple meals into celebrations.'}
              </p>
            </div>

            <style>{`
              .featured-products-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 1.5rem;
                padding: 0 0.5rem;
                max-width: 1280px;
                margin: 0 auto;
              }
              @media (max-width: 1024px) {
                .featured-products-grid {
                  grid-template-columns: repeat(2, 1fr);
                  gap: 2rem;
                }
              }
              @media (max-width: 580px) {
                .featured-products-grid {
                  grid-template-columns: 1fr;
                  gap: 2rem;
                }
              }
            `}</style>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>
              {categorySections.map((catSection, sectionIdx) => (
                <div key={catSection.id} style={{ position: 'relative' }}>
                  {/* Category Row Header */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    borderBottom: '2px solid #EFE6D8',
                    paddingBottom: '1rem',
                    marginBottom: '2.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#C4603A',
                        color: '#FFF',
                        fontFamily: '"Inter", sans-serif',
                        fontSize: '0.82rem',
                        fontWeight: 800
                      }}>
                        {sectionIdx + 1}
                      </span>
                      <div>
                        <span style={{
                          fontFamily: '"Inter", system-ui, sans-serif',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          letterSpacing: '0.18em',
                          color: '#C4603A',
                          textTransform: 'uppercase',
                          display: 'block',
                          marginBottom: '0.2rem'
                        }}>
                          {catSection.eyebrow}
                        </span>
                        <h3 style={{
                          fontFamily: 'Playfair Display, serif',
                          fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)',
                          fontWeight: 900,
                          color: '#111',
                          margin: 0,
                          letterSpacing: '-0.01em'
                        }}>
                          {catSection.name}
                        </h3>
                      </div>
                    </div>
                    <Link
                      href={`/products?category=${encodeURIComponent(catSection.categoryKey)}`}
                      style={{
                        fontFamily: '"Inter", system-ui, sans-serif',
                        fontSize: '0.84rem',
                        fontWeight: 800,
                        letterSpacing: '0.06em',
                        color: '#C4603A',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'transform 0.2s ease, color 0.2s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#9E4322'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#C4603A'; e.currentTarget.style.transform = 'translateX(0)'; }}
                    >
                      View All {catSection.name} &rarr;
                    </Link>
                  </div>

                  {/* 4 Cards in Single Row */}
                  <div className="featured-products-grid">
                    {catSection.products.map((p, i) => (
                      <FeaturedProductCard
                        key={p.id || `${catSection.id}-${i}`}
                        product={p}
                        index={sectionIdx * 4 + i}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '5rem' }}>
              <Link href="/products" className="terry-btn">
                SEE ALL PRODUCTS
              </Link>
            </div>
          </div>
        </section>

        {/* ══ STICKY SCROLL - HIGHLIGHT OF THE MONTH ════════════════════════════════ */}
        <section id="process-section" style={{ position: 'relative', height: '550vh', backgroundColor: '#CC0044' }}>

          {/* Sticky Center Text */}
          <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>

            <span style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: '1rem',
              fontWeight: 800,
              letterSpacing: '0.3em',
              color: '#FCE300',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              textShadow: '2px 2px 0 rgba(0,0,0,0.2)'
            }}>
              Highlight of the Month
            </span>

            <h2 style={{
              fontFamily: 'var(--font-playfair), serif',
              fontWeight: 900,
              fontSize: 'clamp(4rem, 12vw, 12rem)',
              color: '#FFF',
              textAlign: 'center',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              textShadow: '8px 8px 0 rgba(0,0,0,0.15)',
              margin: 0
            }}>
              The Classic<br />Mango<br />Avakaya.
            </h2>
          </div>

          {/* Floating Yellow Cards Container */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }}>

            <style>{`
              .seasonal-card {
                background: #FCE300;
                border: 4px solid #111;
                padding: 1.5rem 2.5rem;
                width: 380px;
                max-width: 90vw;
                color: #111;
                font-weight: 800;
                font-size: 1.4rem;
                font-family: 'Inter', system-ui, sans-serif;
                position: absolute;
                box-shadow: 12px 12px 0 rgba(0,0,0,1);
                pointer-events: auto;
                line-height: 1.35;
                transition: transform 0.3s ease;
              }
              .seasonal-card:hover {
                transform: translateY(-5px);
              }
              .seasonal-card-circle {
                position: absolute;
                bottom: -35px;
                left: -35px;
                width: 90px;
                height: 90px;
                border-radius: 50%;
                border: 4px solid #111;
                background: #FFF;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                box-shadow: 6px 6px 0 rgba(0,0,0,1);
                transform: rotate(-10deg);
                pointer-events: none;
              }
              @media (max-width: 768px) {
                .seasonal-card {
                  width: calc(100vw - 2rem) !important;
                  left: 1rem !important;
                  right: auto !important;
                  padding: 1rem 1.5rem !important;
                  font-size: 1.1rem !important;
                  box-shadow: 6px 6px 0 rgba(0,0,0,1) !important;
                }
                .seasonal-card-circle {
                  left: -10px !important;
                  bottom: -15px !important;
                  width: 60px !important;
                  height: 60px !important;
                  border: 3px solid #111 !important;
                  box-shadow: 4px 4px 0 rgba(0,0,0,1) !important;
                }
              }
            `}</style>

            {/* Card 1 */}
            <div className="seasonal-card" style={{ top: '120vh', left: '10%' }}>
              This Month's Star! The absolute crowd favorite.
              <div className="seasonal-card-circle" style={{ overflow: 'hidden' }}>
                <Image src="/images/cards/star.png" alt="Star" width={90} height={90} style={{ objectFit: 'cover' }} />
              </div>
            </div>

            {/* Card 2 */}
            <div className="seasonal-card" style={{ top: '180vh', right: '10%' }}>
              Made with the first catch of crunchy summer mangoes.
              <div className="seasonal-card-circle" style={{ overflow: 'hidden' }}>
                <Image src="/images/cards/mango.png" alt="Mango" width={90} height={90} style={{ objectFit: 'cover' }} />
              </div>
            </div>

            {/* Card 3 */}
            <div className="seasonal-card" style={{ top: '240vh', left: '15%' }}>
              Blended with pure, fiery Guntur chillies for authentic kick.
              <div className="seasonal-card-circle" style={{ overflow: 'hidden' }}>
                <Image src="/images/cards/chili.png" alt="Chili" width={90} height={90} style={{ objectFit: 'cover' }} />
              </div>
            </div>

            {/* Card 4 */}
            <div className="seasonal-card" style={{ top: '300vh', right: '15%' }}>
              A timeless explosion of Grandma's traditional spice!
              <div className="seasonal-card-circle" style={{ overflow: 'hidden' }}>
                <Image src="/images/cards/jar.png" alt="Jar" width={90} height={90} style={{ objectFit: 'cover' }} />
              </div>
            </div>

            {/* Card 5 */}
            <div className="seasonal-card" style={{ top: '360vh', left: '12%' }}>
              Marinated in rich, cold-pressed groundnut oil.
              <div className="seasonal-card-circle" style={{ overflow: 'hidden' }}>
                <Image src="/images/cards/oil.png" alt="Oil" width={90} height={90} style={{ objectFit: 'cover' }} />
              </div>
            </div>

            {/* Card 6 */}
            <div className="seasonal-card" style={{ top: '420vh', right: '12%' }}>
              The absolute perfect companion for hot rice and melted ghee!
              <div className="seasonal-card-circle" style={{ overflow: 'hidden' }}>
                <Image src="/images/cards/rice.png" alt="Rice" width={90} height={90} style={{ objectFit: 'cover' }} />
              </div>
            </div>

          </div>
        </section>

        {/* ══ TESTIMONIALS ═══════════════════════════ */}
        <section id="testimonials" className="section-pad-xl" style={{ background: '#f8f0e2' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '5.5rem' }} className="reveal">
              <h2 style={{
                fontFamily: '"Arial Black", system-ui, sans-serif',
                fontSize: 'clamp(3rem, 6vw, 5rem)', // Slightly smaller max size since the text is longer
                fontWeight: 900,
                color: '#134027', // Deep dark green
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                margin: 0
              }}>
                What Our Pickle Lovers Say
              </h2>
            </div>

            <div className="mobile-testimonials-grid" style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1.5rem'
            }}>
              {activeTestimonials.map((t, i) => {
                  const colors = ['#f5b89c', '#a5da71', '#ffc745', '#9cd5f5'];
                  const darkColors = ['#eb7952', '#86c646', '#f3aa00', '#5bbef0'];
                  const textColors = ['#ffffff', '#1c402c', '#1c402c', '#1c402c'];
                  
                  // Extract dynamically from CMS, fallback to defaults
                  const pName = t.product || 'TRADITIONAL PICKLE';
                  const pImg = t.productImg || '/images/ing_mango.png';

                  return (
                  <div key={t.author} className="mobile-testimonial-card" style={{
                    animationDelay: `${i * 0.12}s`,
                    width: '280px', // Reduced from 320px
                    minHeight: '340px', // Reduced from 380px
                    background: colors[i % colors.length],
                    border: '1px solid #1c402c', // Thin dark green/black border
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                  }}>
                    {/* Top Quote Section */}
                    <div className="mobile-testimonial-quote-container" style={{ padding: '1.5rem 1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <p className="mobile-testimonial-quote" style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '1.25rem', // Reduced from 1.5rem
                        lineHeight: 1.3,
                        color: '#1c402c',
                        textAlign: 'center',
                        marginBottom: '1.5rem'
                      }}>"{t.text}"</p>

                      <div className="mobile-testimonial-author" style={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        fontWeight: 400,
                        fontSize: '0.9rem',
                        color: '#1c402c',
                      }}>
                        {t.author}
                      </div>
                    </div>

                    {/* Bottom Product Box */}
                    <div className="mobile-testimonial-product-box" style={{
                      display: 'flex',
                      background: darkColors[i % darkColors.length],
                      border: '1px solid #1c402c',
                      borderRadius: '8px',
                      height: '80px',
                      margin: '0 12px 12px 12px', // Floating inside the card
                      overflow: 'hidden'
                    }}>
                      {/* Product Image */}
                      <div className="mobile-testimonial-product-img-container" style={{
                        width: '70px',
                        borderRight: '1px solid #1c402c',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255,255,255,0.1)'
                      }}>
                        <div className="mobile-testimonial-product-img" style={{ width: '100%', height: '100%', position: 'relative' }}>
                          <Image src={pImg} alt={pName} fill sizes="60px" style={{ objectFit: 'cover', borderRadius: '4px' }} />
                        </div>
                      </div>

                      {/* Product Info & Button */}
                      <div className="mobile-testimonial-product-info" style={{
                        flex: 1,
                        padding: '0 12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px'
                      }}>
                        <div className="mobile-testimonial-product-name" style={{
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          color: textColors[i % textColors.length],
                          lineHeight: 1.2,
                          letterSpacing: '0.02em',
                          maxWidth: '90px' // Force wrapping to look like reference
                        }}>
                          {pName}
                        </div>

                        <a href="#" className="mobile-testimonial-shop-btn" style={{
                          background: '#ffffff',
                          border: '1px solid #1c402c',
                          borderRadius: '24px',
                          padding: '0.3rem 0.6rem',
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: '#1c402c',
                          textDecoration: 'none',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.3rem',
                          whiteSpace: 'nowrap'
                        }}>
                          <svg viewBox="0 0 24 24" width="14" height="14" style={{ flexShrink: 0, display: 'block' }} xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.3,2.4C4.1,2.5,4,2.8,4,3.1v17.7c0,0.3,0.1,0.6,0.3,0.7l0.1,0.1l9.9-9.9v-0.2L4.4,2.3L4.3,2.4z" fill="#00e676"/>
                            <path d="M18.8,14.6l-3.2-3.2v-0.2l3.2-3.2l0.1,0.1l3.8,2.1c1,0.6,1,1.5,0,2.1l-3.8,2.1L18.8,14.6z" fill="#ffc107"/>
                            <path d="M14.4,11.3l-10-10C4.3,1.1,4.1,1.1,4,1.3l10.3,10.3L14.4,11.3z" fill="#ff3d00"/>
                            <path d="M14.4,12.7l-0.1,0.1L4,23.1c0.1,0.1,0.3,0.1,0.5,0l10-10L14.4,12.7z" fill="#29b6f6"/>
                          </svg>
                          Get App
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* ══ RECIPES (CAULDRON FOODS POP-ORGANIC DESIGN) ════════════ */}
        <section id="recipes" style={{
          backgroundColor: '#00BFA5', // Vibrant teal outer frame like Cauldron
          padding: 'clamp(24px, 3.5vw, 48px) clamp(16px, 2.5vw, 36px)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Inner Purple Container with Organic Magenta Waves & Rounded Edges */}
          <div style={{
            position: 'relative',
            backgroundColor: '#3E104A', // Deep Cauldron plum purple
            borderRadius: '40px',
            overflow: 'hidden',
            padding: 'clamp(48px, 6vw, 80px) 0 clamp(44px, 5vw, 68px)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.22)'
          }}>

            {/* Wavy Organic Pink/Magenta Curves */}
            <svg
              viewBox="0 0 1440 900"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                overflow: 'hidden'
              }}
              preserveAspectRatio="none"
            >
              {/* Top-left sweeping organic curve */}
              <path
                d="M -100 -50 C 180 30, 360 200, 240 460 C 140 680, -20 560, -100 500 Z"
                fill="#F0006E"
                opacity="0.95"
              />
              {/* Top-right down to right-edge huge swooping wave */}
              <path
                d="M 920 -50 C 880 180, 1080 260, 1240 450 C 1420 660, 1520 800, 1550 960 L 1550 -50 Z"
                fill="#F0006E"
                opacity="0.95"
              />
              {/* Bottom organic petal accent */}
              <path
                d="M -50 720 C 110 740, 240 840, 200 960 L -50 960 Z"
                fill="#F0006E"
                opacity="0.92"
              />
            </svg>

            {/* Header Content */}
            <div style={{ position: 'relative', zIndex: 2, padding: '0 1.5rem', marginBottom: 'clamp(2.5rem, 4.5vw, 4rem)', textAlign: 'center' }}>
              <h2 style={{
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 5.2vw, 4.2rem)',
                color: '#FFFFFF',
                margin: 0,
                letterSpacing: '-0.02em',
                lineHeight: 1.08
              }}>
                Cook with our pickles
              </h2>
              <p style={{
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 500,
                fontSize: 'clamp(1rem, 1.35vw, 1.25rem)',
                color: 'rgba(255, 255, 255, 0.94)',
                maxWidth: '740px',
                margin: '1.25rem auto 0',
                lineHeight: 1.5
              }}>
                Grandmother's pickles aren't just condiments — they're the hero ingredient that transforms simple meals into celebrations.
              </p>
            </div>

            {/* Horizontally Scrolling Marquee (Interactive & Smooth) */}
            <div
              className="cauldron-recipes-marquee-wrap"
              style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                overflow: 'hidden',
                padding: '12px 0 20px'
              }}
            >
              <div
                className="cauldron-recipes-track"
                style={{
                  display: 'flex',
                  gap: '36px',
                  width: 'fit-content',
                  animation: 'recipe-marquee 32s linear infinite'
                }}
              >
                {[...featuredRecipes, ...featuredRecipes, ...featuredRecipes, ...featuredRecipes].map((r, i) => {
                  const colors = ['#00C49F', '#7BC644', '#D2446A', '#00A8FF', '#B47FE3', '#FF5757'];
                  const textColors = ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'];

                  const getGraphic = (item) => {
                    const name = (item.name || '').toLowerCase();
                    const id = (item.id || '').toLowerCase();
                    if (id.includes('allam') || name.includes('allam') || name.includes('garlic')) return '/images/real_garlic_cutout.png';
                    if (id.includes('allu') || id.includes('potato') || name.includes('allu') || name.includes('chips')) return '/images/real_chips_cutout.png';
                    if (id.includes('daniya') || id.includes('rasam') || name.includes('daniya') || name.includes('coriander') || name.includes('rasam')) return '/images/real_coriander_cutout.png';
                    if (id.includes('millet') || id.includes('laddu') || name.includes('millet') || name.includes('kheer') || name.includes('laddu')) return '/images/real_laddu_cutout.png';
                    if (id.includes('mango') || name.includes('mango') || name.includes('avakaya')) return '/images/product_mango.png';
                    if (id.includes('chili') || name.includes('chili') || name.includes('mirchi')) return '/images/product_chili.png';
                    if (item.img && !item.img.includes('placeholder')) return item.img;
                    return '/images/real_garlic_cutout.png';
                  };
                  const graphicSrc = getGraphic(r);

                  return (
                    <div
                      key={`recipe-pack-${r.id}-${i}`}
                      style={{
                        position: 'relative',
                        width: '240px',
                        height: '430px',
                        flexShrink: 0,
                        marginRight: '28px'
                      }}
                      className="cauldron-recipe-item"
                    >
                      {/* The Recipe Text Card (Staggered Vertically like before) */}
                      <Link href="/recipes" style={{ textDecoration: 'none' }}>
                        <div
                          className="cauldron-text-card"
                          style={{
                            position: 'absolute',
                            top: i % 2 === 0 ? '0px' : '45px',
                            left: '15px',
                            width: '210px',
                            height: '210px',
                            backgroundColor: colors[i % colors.length],
                            borderRadius: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1.25rem',
                            zIndex: 2,
                            overflow: 'hidden',
                            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.35)',
                            border: '2px solid rgba(255, 255, 255, 0.25)',
                            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease'
                          }}
                        >
                          <p style={{
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            fontSize: '0.82rem',
                            lineHeight: 1.35,
                            color: textColors[i % textColors.length],
                            textAlign: 'center',
                            marginBottom: '0.75rem',
                            whiteSpace: 'normal',
                            fontWeight: 800,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            "{r.desc}"
                          </p>

                          <div style={{
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            fontWeight: 900,
                            fontSize: '0.68rem',
                            letterSpacing: '0.08em',
                            color: textColors[i % textColors.length],
                            textTransform: 'uppercase',
                            textAlign: 'center',
                            whiteSpace: 'normal'
                          }}>
                            {r.name}
                          </div>
                        </div>
                      </Link>

                      {/* The Real Food Cutout Image (Floating completely below with clear gap) */}
                      <div
                        className="cauldron-floating-graphic"
                        style={{
                          position: 'absolute',
                          width: '165px',
                          height: '165px',
                          top: i % 2 === 0 ? '228px' : '272px',
                          left: i % 2 === 0 ? '60px' : '18px',
                          zIndex: 1,
                          filter: 'drop-shadow(0 14px 22px rgba(0, 0, 0, 0.45))',
                          transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                      >
                        <img
                          src={graphicSrc}
                          alt={`${r.name} Real Cutout`}
                          onError={(e) => { e.currentTarget.src = '/images/real_garlic_cutout.png'; }}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Button ("Show me more!") */}
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginTop: 'clamp(2.5rem, 4.5vw, 3.8rem)' }}>
              <Link
                href="/recipes"
                className="cauldron-show-more-btn"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#FFD200', // Sunshine yellow like Cauldron
                  color: '#3B104A', // Deep purple text
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontWeight: 900,
                  fontSize: '1.2rem',
                  padding: '1.05rem 3.2rem',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.3)',
                  transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease'
                }}
              >
                Show me more!
              </Link>
            </div>

            <style>{`
              @keyframes recipe-marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .cauldron-recipes-marquee-wrap:hover .cauldron-recipes-track {
                animation-play-state: paused;
              }
              .cauldron-recipe-item:hover .cauldron-text-card {
                transform: translateY(-8px) scale(1.04);
                box-shadow: 0 20px 32px rgba(0, 0, 0, 0.45);
              }
              .cauldron-recipe-item:hover .cauldron-floating-graphic {
                transform: scale(1.1) rotate(6deg);
              }
              .cauldron-show-more-btn:hover {
                transform: scale(1.06);
                box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
              }
            `}</style>
          </div>
        </section>


        {/* ══ CAULDRON-STYLE APP MISSION BANNER (Like Reference Screenshot) ════════════════════════ */}
        <section id="download-app" style={{
          backgroundColor: '#00B59B', // Vibrant Cauldron Teal
          padding: 'clamp(2.5rem, 5vw, 5rem) clamp(1rem, 3vw, 2.5rem)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@800;900&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap');

            .cauldron-mission-card {
              max-width: 1360px;
              margin: 0 auto;
              display: grid;
              grid-template-columns: 1fr 1fr;
              border-radius: 44px;
              overflow: hidden;
              box-shadow: 0 24px 60px rgba(0, 95, 80, 0.28);
              background: #E82674;
            }

            .cauldron-text-col {
              background-color: #E82674; /* Vibrant Cauldron Magenta / Hot Pink */
              padding: clamp(3.5rem, 5.5vw, 5.5rem) clamp(2rem, 4.5vw, 4.5rem);
              color: #FFFFFF;
              display: flex;
              flex-direction: column;
              justify-content: center;
              font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
            }

            .cauldron-mission-title {
              font-family: 'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif;
              font-size: clamp(3.2rem, 5.2vw, 5rem);
              font-weight: 900;
              line-height: 0.92;
              letter-spacing: -0.035em;
              color: #FFFFFF;
              margin: 0 0 1.8rem 0;
            }

            .cauldron-mission-sub {
              font-size: clamp(1.2rem, 1.8vw, 1.45rem);
              font-weight: 700;
              line-height: 1.25;
              color: #FFFFFF;
              margin: 0 0 1rem 0;
              opacity: 0.96;
            }

            .cauldron-mission-body {
              font-size: clamp(1rem, 1.2vw, 1.15rem);
              font-weight: 500;
              line-height: 1.6;
              color: rgba(255, 255, 255, 0.93);
              margin: 0 0 2.2rem 0;
              max-width: 520px;
            }

            .cauldron-play-btn {
              display: inline-flex;
              align-items: center;
              gap: 0.85rem;
              background-color: #111111;
              color: #FFFFFF;
              padding: 0.85rem 1.7rem;
              border-radius: 14px;
              text-decoration: none;
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
              transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
              width: fit-content;
            }

            .cauldron-play-btn:hover {
              transform: translateY(-3px) scale(1.02);
              box-shadow: 0 14px 32px rgba(0, 0, 0, 0.35);
              background-color: #000000;
            }

            .cauldron-img-col {
              position: relative;
              width: 100%;
              min-height: 480px;
              overflow: hidden;
              background: #00B59B;
            }

            .cauldron-img-col img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
              transition: transform 0.7s cubic-bezier(0.25, 1, 0.5, 1);
            }

            .cauldron-mission-card:hover .cauldron-img-col img {
              transform: scale(1.04);
            }

            @media (max-width: 960px) {
              .cauldron-mission-card {
                grid-template-columns: 1fr;
                border-radius: 28px;
              }
              .cauldron-img-col {
                min-height: 380px;
                order: 2;
              }
              .cauldron-text-col {
                order: 1;
              }
            }
          `}</style>

          <div className="cauldron-mission-card">
            
            {/* Left: Magenta Card with Punchy Cauldron Typography */}
            <div className="cauldron-text-col">
              <h2 className="cauldron-mission-title">
                Download<br />our app<br />to order...
              </h2>
              <h3 className="cauldron-mission-sub">
                Authentic Indian Pickles for Families & Foodies
              </h3>
              <p className="cauldron-mission-body">
                A mission to bring pure Telugu nostalgia and heirloom recipes straight from grandmother's kitchen to your dining table! Download our app from the Play Store to order handcrafted pickles, podis, and snacks delivered to your door.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cauldron-play-btn"
                  aria-label="Download Adhvaitha Foods App on Google Play"
                >
                  <svg viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.3,2.4C4.1,2.5,4,2.8,4,3.1v17.7c0,0.3,0.1,0.6,0.3,0.7l0.1,0.1l9.9-9.9v-0.2L4.4,2.3L4.3,2.4z" fill="#00e676"/>
                    <path d="M18.8,14.6l-3.2-3.2v-0.2l3.2-3.2l0.1,0.1l3.8,2.1c1,0.6,1,1.5,0,2.1l-3.8,2.1L18.8,14.6z" fill="#ffc107"/>
                    <path d="M14.4,11.3l-10-10C4.3,1.1,4.1,1.1,4,1.3l10.3,10.3L14.4,11.3z" fill="#ff3d00"/>
                    <path d="M14.4,12.7l-0.1,0.1L4,23.1c0.1,0.1,0.3,0.1,0.5,0l10-10L14.4,12.7z" fill="#29b6f6"/>
                  </svg>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: '1', color: 'rgba(255,255,255,0.75)' }}>GET IT ON</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'system-ui, sans-serif', lineHeight: '1.1', marginTop: '2px' }}>Google Play</div>
                  </div>
                </a>

                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.88)', letterSpacing: '0.02em' }}>
                  * Available exclusively on Android
                </span>
              </div>
            </div>

            {/* Right: Rich Overhead Flatlay Photo of Adhvaitha Products & Greens */}
            <div className="cauldron-img-col">
              <img
                src="/images/app_banner_flatlay.jpg"
                alt="Adhvaitha Foods Authentic Pickles and Traditional Snacks"
              />
            </div>

          </div>
        </section>

      </main>

      <Footer />

      <style>{`
        @keyframes homeProductFloat {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-9px);
          }
          100% {
            transform: translateY(2px);
          }
        }

        @media (max-width: 768px) {
          .hide-mobile-doodle { display: none !important; }
        }

        @media (max-width: 900px) {
          .hero-grid       { grid-template-columns: 1fr !important; }
          .split-grid      { grid-template-columns: 1fr !important; }
          .recipes-header  { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .heritage-img-wrapper { transform: none !important; margin-bottom: -2rem; padding-bottom: 75% !important; }
          .heritage-text-card { transform: none !important; margin: 0 1rem; }
          .process-flow-row { flexDirection: column !important; gap: 4rem !important; }

          /* CTA Banner Mobile Overrides */
          .cta-banner-grid { grid-template-columns: 1fr !important; text-align: center; }
          .cta-banner-text-block { padding: 3rem 1rem 1rem 1rem !important; }
          .cta-banner-title { font-size: 2.8rem !important; }
          .cta-banner-subtitle { font-size: 1.4rem !important; }
          .cta-banner-img-block img { width: 100% !important; margin: 0 !important; max-height: none !important; }
        }

      `}</style>
    </>
  );
}
