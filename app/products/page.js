/**
 * @file app/products/page.js
 * @description Products page displaying the catalog of Avdaitha Foods artisanal pickles.
 * Implements filtering, sorting, and responsive layout.
 * Clean code applied: Extracted components, removed cart/pricing per requirements.
 */

'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';

// Constants extracted to avoid magic strings and improve maintainability
const FILTER_ALL = 'All';
const SORT_FEATURED = 'Featured';
const SORT_TOP_RATED = 'Top Rated';
const DISPLAY_WEIGHT = 'min 250g - 2kg';

import { ALL_PRODUCTS as FALLBACK_PRODUCTS } from '@/components/productsData';

const CATEGORIES = [
  FILTER_ALL,
  'Prepared Foods',
  'Ready-to-eat savouries',
  'Salts, spices, soups',
  'Indian Sweets & Snacks'
];

const SORT_OPTIONS = [SORT_FEATURED, SORT_TOP_RATED]; // Removed price sort options since price is removed



/**
 * Filter and sort logic moved to a helper function.
 * Separates business logic from UI rendering.
 * Supports filtering by the 4 authentic Adhvaitha Foods product types.
 */
function getFilteredAndSortedProducts(products, category, sortBy, searchQuery = '', productTypeFilters = []) {
  let filtered = products.filter((p) => {
    // If specific product types are selected via sidebar filter, filter by them
    if (productTypeFilters && productTypeFilters.length > 0) {
      if (!productTypeFilters.includes(p.category)) {
        return false;
      }
    } else if (category !== FILTER_ALL && p.category !== category) {
      // Otherwise filter by active category tab if selected
      return false;
    }

    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchName = p.name && p.name.toLowerCase().includes(q);
      const matchDesc = p.desc && p.desc.toLowerCase().includes(q);
      const matchCategory = p.category && p.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCategory) return false;
    }

    return true;
  });

  if (sortBy === 'A - Z') {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'Most Popular' || sortBy === SORT_TOP_RATED) {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  }

  return filtered;
}

// ─── Sub-components extracted for better readability ────────────────

/**
 * Renders an individual product card matching the specific bold yellow 'Recipe' design.
 */
// Warm Indian spices palette for rotating background designs
const CARD_BG_COLORS = [
  '#C0392B', // Vibrant Chilli Red
  '#D35400', // Warm Amber Ochre
  '#E67E22', // Golden Saffron / Turmeric
  '#2E7D32', // Rich Curry Green
  '#00838F', // Deep Peacock Teal
  '#8E24AA', // Royal Plum
];

function CardBackgroundDesign({ color, isHovered }) {
  // When not hovered: soft muted translucent warm beige/cream matching the user's reference
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
        width: '310px',
        height: '310px',
        marginTop: '-155px',
        marginLeft: '-155px',
        pointerEvents: 'none',
        zIndex: 1,
        transition: 'transform 0.85s cubic-bezier(0.2, 0.9, 0.3, 1)',
        transform: isHovered ? 'rotate(180deg) scale(1.08)' : 'rotate(0deg) scale(1)',
      }}
    >
      <svg viewBox="0 0 240 240" width="100%" height="100%" style={{ overflow: 'visible' }}>
        <g fill={petalFill} style={{ transition: 'fill 0.4s ease, opacity 0.4s ease', opacity: petalOpacity }}>
          {/* 16 Organic Rounded Petals matching Brar\'s silhouette */}
          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg) => (
            <path
              key={`petal-${deg}`}
              d="M 120 12 C 132 12, 142 58, 120 74 C 98 58, 108 12, 120 12 Z"
              transform={`rotate(${deg} 120 120)`}
            />
          ))}
          {/* Interleaved secondary diamond flares */}
          {[11.25, 33.75, 56.25, 78.75, 101.25, 123.75, 146.25, 168.75, 191.25, 213.75, 236.25, 258.75, 281.25, 303.75, 326.25, 348.75].map((deg) => (
            <polygon
              key={`flare-${deg}`}
              points="120,28 129,82 120,72 111,82"
              transform={`rotate(${deg} 120 120)`}
            />
          ))}
          {/* Center disk */}
          <circle cx="120" cy="120" r="68" fill={petalFill} />
          {/* Inner decorative dotted ring */}
          <circle cx="120" cy="120" r="102" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 6" opacity={isHovered ? 0.7 : 0.35} />
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

function ProductCard({ product, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(getBustedUrl(product.img));
  const bgColor = CARD_BG_COLORS[index % CARD_BG_COLORS.length];
  // Staggered floating wave delay so each card floats gently at its own pace
  const floatDelay = `${(index % 4) * 0.75}s`;

  useEffect(() => {
    setImgSrc(getBustedUrl(product.img));
  }, [product.img]);

  return (
    <div
      id={`product-${product.id}`}
      className="product-card-reveal product-grid-card"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'transparent',
        padding: '0 1rem 2.5rem 1rem',
        marginTop: '10px',
        animationDelay: `${Math.min(index, 8) * 0.06}s`,
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Stage with Rolling Background Design */}
      <div
        className="product-stage"
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
        <CardBackgroundDesign color={bgColor} isHovered={isHovered} />

        {/* Floating Jar/Packaging Container with Zoom-out on Hover */}
        <div
          className="product-floating-anim"
          style={{
            position: 'relative',
            zIndex: 2,
            animation: 'productFloat 3.8s ease-in-out infinite alternate',
            animationDelay: floatDelay,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            className="product-img-wrap"
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
        className="product-grid-title"
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.45rem',
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
        className="product-grid-pill"
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
          className="product-grid-pill-text"
          style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontSize: '0.72rem',
            fontWeight: 800,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          ✓ {product.badge || 'AUTHENTIC'} • {DISPLAY_WEIGHT}
        </span>
      </div>

      {/* Description */}
      <p
        className="product-grid-desc"
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
    </div>
  );
}

/**
 * Sidebar for category and dietary preference filtering matching user reference.
 */
function FilterSidebar({
  searchQuery,
  setSearchQuery,
  dietaryFilters,
  setDietaryFilters,
  onReset,
}) {
  const toggleDietary = (id) => {
    if (dietaryFilters.includes(id)) {
      setDietaryFilters(dietaryFilters.filter((x) => x !== id));
    } else {
      setDietaryFilters([...dietaryFilters, id]);
    }
  };

  return (
    <aside style={{ width: '280px', flexShrink: 0 }} className="sidebar-hide-mobile">
      <div style={{ position: 'sticky', top: '100px' }}>
        {/* Search Box */}
        <div
          style={{
            background: '#F5EFE0',
            borderRadius: '12px',
            padding: '0.85rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
          }}
        >
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              fontFamily: "'Outfit', -apple-system, sans-serif",
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#141414',
              width: '100%',
              outline: 'none',
            }}
          />
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#141414"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Product Type Header Card */}
        <div
          style={{
            background: '#F5EFE0',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            marginBottom: '1.25rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: "'Outfit', -apple-system, sans-serif",
              fontSize: '1.15rem',
              fontWeight: 800,
              color: '#141414',
            }}
          >
            Product Type
          </h3>
        </div>

        {/* Checkbox Options: The Four Types of Products */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem', padding: '0.2rem 0.5rem 1.75rem' }}>
          {[
            { id: 'Prepared Foods', label: 'Prepared Foods' },
            { id: 'Salts, spices, soups', label: 'Salts, Spices, Soups' },
            { id: 'Ready-to-eat savouries', label: 'Ready-to-eat Savouries' },
            { id: 'Indian Sweets & Snacks', label: 'Indian Sweets & Snacks' },
          ].map((item) => {
            const isChecked = dietaryFilters.includes(item.id);
            return (
              <label
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  toggleDietary(item.id);
                }}
              >
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    border: '2.2px solid #141414',
                    borderRadius: '4px',
                    background: isChecked ? '#141414' : '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                    flexShrink: 0,
                  }}
                >
                  {isChecked && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFF"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span
                  style={{
                    fontFamily: "'Outfit', -apple-system, sans-serif",
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#141414',
                  }}
                >
                  {item.label}
                </span>
              </label>
            );
          })}
        </div>

        {/* Action Buttons: Search & Clear all */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('shop');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              background: '#141414',
              color: '#FFFFFF',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: '0.95rem',
              borderRadius: '8px',
              border: 'none',
              padding: '0.65rem 1.6rem',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            }}
          >
            Search
          </button>
          <button
            type="button"
            onClick={onReset}
            style={{
              background: '#FFFFFF',
              color: '#141414',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: '0.95rem',
              borderRadius: '8px',
              border: '1.8px solid #141414',
              padding: '0.65rem 1.25rem',
              cursor: 'pointer',
            }}
          >
            Clear all
          </button>
        </div>


      </div>
    </aside>
  );
}

/**
 * Empty state when no products match the filters.
 */
function EmptyState({ onClearFilters }) {
  return (
    <div
      style={{
        gridColumn: '1/-1',
        textAlign: 'center',
        padding: '8rem 2rem',
        background: 'var(--ivory)',
        borderRadius: '24px',
        border: '1px dashed rgba(139,94,60,0.2)',
      }}
    >
      <div style={{ fontSize: '5rem', marginBottom: '1.5rem', opacity: 0.5 }}>🫙</div>
      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 900, color: 'var(--rich-brown)', marginBottom: '1rem' }}>
        No foods found under this category
      </h3>
      <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.15rem', color: 'var(--aged-wood)', marginBottom: '2.5rem' }}>
        Our pantry doesn't have any foods under this category right now.
      </p>
      <button
        onClick={onClearFilters}
        style={{
          background: 'transparent',
          border: '2px solid var(--forest-green)',
          color: 'var(--forest-green)',
          fontFamily: 'Lato, sans-serif',
          fontSize: '0.9rem',
          fontWeight: 900,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          padding: '1rem 2rem',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Clear Filters
      </button>
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────

function ProductsContent() {
  console.log("ProductsPage re-rendering with new SVG coordinates...");
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState(queryCategory && CATEGORIES.includes(queryCategory) ? queryCategory : FILTER_ALL);
  const [sortBy, setSortBy] = useState('Default');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilters, setDietaryFilters] = useState([]);

  // Sync category state when URL changes
  useEffect(() => {
    if (queryCategory && CATEGORIES.includes(queryCategory)) {
      setActiveCategory(queryCategory);
    } else if (!queryCategory) {
      setActiveCategory(FILTER_ALL);
    }
  }, [queryCategory]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, sortBy, searchQuery, dietaryFilters]);

  useEffect(() => {
    async function fetchProducts() {
        try {
          const res = await fetch('/api/web-products', { cache: 'no-store' });
          if (!res.ok) throw new Error('Failed to fetch');
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const mappedProducts = data.map(p => {
              const productName = p.productName || p.name || 'Unnamed Product';
              const cleanName = productName.toLowerCase().replace(/[^a-z0-9]/g, '');
              const fallbackItem = FALLBACK_PRODUCTS.find(fp => fp.id === p.id || fp.name.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanName)
                || FALLBACK_PRODUCTS.find(fp => {
                  const fpClean = fp.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                  return cleanName.includes(fpClean) || fpClean.includes(cleanName);
                });
              const fallbackImg = fallbackItem ? fallbackItem.img : '/images/products/mango-pickle-real.jpg';
              const remoteImg = (p.images && p.images.length > 0 && p.images[0]) ? p.images[0] : p.img;
              const chosenImg = (fallbackItem && fallbackItem.img) ? fallbackItem.img : (remoteImg || fallbackImg);
              return {
                ...p,
                name: productName,
                desc: p.productDescription || p.desc || (fallbackItem ? fallbackItem.desc : ''),
                img: chosenImg,
                fallbackImg: fallbackImg,
                rating: p.rating || 5,
                reviews: p.reviews || Math.floor(Math.random() * 100) + 10,
              };
            });
            setProducts(mappedProducts);
          } else {
          setProducts(FALLBACK_PRODUCTS);
        }
      } catch (error) {
        console.error('Error fetching products, falling back to local data:', error);
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Memoize filtered products for performance
  const filteredProducts = useMemo(() => {
    return getFilteredAndSortedProducts(products, activeCategory, sortBy, searchQuery, dietaryFilters);
  }, [products, activeCategory, sortBy, searchQuery, dietaryFilters]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Setup reveal animation for non-product page elements (runs once)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -10px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    // Hero is above-the-fold — trigger it after a brief delay so font can load
    const heroTimer = setTimeout(() => {
      const hero = document.querySelector('.hero-poster');
      if (hero) hero.classList.add('visible');
    }, 200);

    return () => {
      observer.disconnect();
      clearTimeout(heroTimer);
    };
  }, []);

  const handleClearFilters = () => {
    setActiveCategory(FILTER_ALL);
    setSearchQuery('');
    setDietaryFilters([]);
    setSortBy('Default');
  };

  return (
    <>
      <Navbar />
      <main>
        {/* ── FEELING HUNGRY? DISCOVER OUR PRODUCTS Hero matching reference ── */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Titan+One&family=Lilita+One&family=Outfit:wght@500;700;800;900&display=swap');

          .discover-hero-section {
            background-color: #F5B82A;
            position: relative;
            padding-top: clamp(6.5rem, 9vw, 9rem);
            padding-bottom: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            text-align: center;
            overflow: hidden;
          }

          .discover-eyebrow {
            font-family: 'Outfit', -apple-system, sans-serif;
            font-size: clamp(1rem, 1.35vw, 1.3rem);
            font-weight: 900;
            letter-spacing: 0.08em;
            color: #141414;
            text-transform: uppercase;
            margin: 0 0 clamp(0.75rem, 1.2vw, 1.25rem);
          }

          .discover-main-title {
            font-family: 'Titan One', 'Lilita One', cursive, sans-serif;
            font-size: clamp(3.6rem, 8vw, 7.6rem);
            line-height: 0.94;
            color: #141414;
            text-transform: uppercase;
            letter-spacing: -0.01em;
            margin: 0 0 clamp(3rem, 5vw, 4.5rem);
            max-width: 1100px;
            padding: 0 1rem;
          }

          .discover-category-bar-wrapper {
            width: 100%;
            max-width: 1080px;
            margin: 0 auto;
            padding: 0 1rem;
            display: flex;
            justify-content: center;
          }

          .discover-category-bar {
            background-color: #18181A;
            border-radius: 24px 24px 0 0;
            padding: 0.65rem 0.85rem 0.75rem;
            display: flex;
            align-items: center;
            gap: clamp(0.35rem, 0.6vw, 0.65rem);
            flex-wrap: wrap;
            justify-content: center;
            box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.08);
            width: 100%;
          }

          .discover-tab-btn {
            border: none;
            background: transparent;
            font-family: 'Outfit', sans-serif;
            font-size: clamp(0.95rem, 1.1vw, 1.12rem);
            font-weight: 600;
            color: #FFFFFF;
            padding: 0.7rem clamp(0.9rem, 1.4vw, 1.4rem);
            border-radius: 14px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
          }

          .discover-tab-btn:hover {
            background: rgba(255, 255, 255, 0.08);
          }

          .discover-tab-btn.active {
            background-color: #FFFFFF;
            color: #141414;
            font-weight: 800;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.16);
          }

          @media (max-width: 768px) {
            .discover-category-bar {
              border-radius: 20px 20px 0 0;
              padding: 0.5rem;
              gap: 0.35rem;
            }
            .discover-tab-btn {
              padding: 0.55rem 0.85rem;
              font-size: 0.9rem;
            }
          }
        `}</style>

        <section id="products-hero" className="discover-hero-section">
          {/* Eyebrow */}
          <div className="discover-eyebrow">FEELING HUNGRY?</div>

          {/* Chunky Main Title */}
          <h1 className="discover-main-title">
            DISCOVER OUR<br />
            PRODUCTS
          </h1>

          {/* Dark Category Bar Matching Reference */}
          <div className="discover-category-bar-wrapper">
            <div className="discover-category-bar">
              {/* Tab 1: All products with ✦ sparkle */}
              <button
                type="button"
                className={`discover-tab-btn ${activeCategory === FILTER_ALL ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(FILTER_ALL);
                  const el = document.getElementById('shop');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span style={{ fontSize: '1.1rem', color: activeCategory === FILTER_ALL ? '#141414' : '#FFF' }}>✦</span>
                <span>All products</span>
              </button>

              {/* Tab 2: Prepared Foods (Pickles) with Burgundy Starburst */}
              <button
                type="button"
                className={`discover-tab-btn ${activeCategory === 'Prepared Foods' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('Prepared Foods');
                  const el = document.getElementById('shop');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#7E1D3B" style={{ flexShrink: 0 }}>
                  <path d="M12 1.5L13.8 5.2L17.8 4.3L17.9 8.4L22 9.4L20.2 13.1L22.8 16.2L19 17.6L18.9 21.7L14.8 20.8L13 24.5L10.3 21.4L6.4 22.8L6.3 18.7L2.2 17.7L4 14L1.4 10.9L5.2 9.5L5.3 5.4L9.4 6.4L11.2 2.7L12 1.5Z" />
                </svg>
                <span>Prepared Foods</span>
              </button>

              {/* Tab 3: Ready-to-eat savouries with Cyan Starburst */}
              <button
                type="button"
                className={`discover-tab-btn ${activeCategory === 'Ready-to-eat savouries' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('Ready-to-eat savouries');
                  const el = document.getElementById('shop');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#00A3C4" style={{ flexShrink: 0 }}>
                  <path d="M12 1.5L13.8 5.2L17.8 4.3L17.9 8.4L22 9.4L20.2 13.1L22.8 16.2L19 17.6L18.9 21.7L14.8 20.8L13 24.5L10.3 21.4L6.4 22.8L6.3 18.7L2.2 17.7L4 14L1.4 10.9L5.2 9.5L5.3 5.4L9.4 6.4L11.2 2.7L12 1.5Z" />
                </svg>
                <span>Savouries</span>
              </button>

              {/* Tab 4: Salts, spices, soups with Orange Starburst */}
              <button
                type="button"
                className={`discover-tab-btn ${activeCategory === 'Salts, spices, soups' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('Salts, spices, soups');
                  const el = document.getElementById('shop');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#E85D04" style={{ flexShrink: 0 }}>
                  <path d="M12 1.5L13.8 5.2L17.8 4.3L17.9 8.4L22 9.4L20.2 13.1L22.8 16.2L19 17.6L18.9 21.7L14.8 20.8L13 24.5L10.3 21.4L6.4 22.8L6.3 18.7L2.2 17.7L4 14L1.4 10.9L5.2 9.5L5.3 5.4L9.4 6.4L11.2 2.7L12 1.5Z" />
                </svg>
                <span>Spices & Soups</span>
              </button>

              {/* Tab 5: Indian Sweets & Snacks with Tan Starburst */}
              <button
                type="button"
                className={`discover-tab-btn ${activeCategory === 'Indian Sweets & Snacks' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('Indian Sweets & Snacks');
                  const el = document.getElementById('shop');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#C49767" style={{ flexShrink: 0 }}>
                  <path d="M12 1.5L13.8 5.2L17.8 4.3L17.9 8.4L22 9.4L20.2 13.1L22.8 16.2L19 17.6L18.9 21.7L14.8 20.8L13 24.5L10.3 21.4L6.4 22.8L6.3 18.7L2.2 17.7L4 14L1.4 10.9L5.2 9.5L5.3 5.4L9.4 6.4L11.2 2.7L12 1.5Z" />
                </svg>
                <span>Sweets & Snacks</span>
              </button>
            </div>
          </div>
        </section>

        {/* ── Advanced Sidebar Layout ──────────────────────── */}
        <section id="shop" className="products-main-section" style={{ background: 'var(--cream)', minHeight: '80vh', padding: '4rem 2rem 10rem', scrollMarginTop: '120px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '4rem', flexDirection: 'row' }} className="products-layout">

            <FilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              dietaryFilters={dietaryFilters}
              setDietaryFilters={setDietaryFilters}
              onReset={handleClearFilters}
            />

            {/* ── Main Products Grid ── */}
            <div className="products-main-content" style={{ flex: 1 }}>
              {/* Toolbar matching reference screenshot */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    color: '#141414',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    margin: 0,
                  }}
                >
                  Showing {filteredProducts.length} Items
                </p>

                {/* Pill buttons: Default, A - Z, Most Popular */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {[
                    { id: 'Default', label: 'Default' },
                    { id: 'A - Z', label: 'A - Z' },
                    { id: 'Most Popular', label: 'Most Popular' },
                  ].map((opt) => {
                    const isActive = (sortBy === opt.id) || (opt.id === 'Default' && sortBy === SORT_FEATURED);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSortBy(opt.id)}
                        style={{
                          background: isActive ? '#141414' : '#FFFFFF',
                          color: isActive ? '#FFFFFF' : '#141414',
                          border: isActive ? 'none' : '1.8px solid #141414',
                          borderRadius: '8px',
                          padding: '0.6rem 1.35rem',
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 700,
                          fontSize: '0.92rem',
                          cursor: 'pointer',
                          boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.12)' : 'none',
                          transition: 'all 0.18s ease',
                        }}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grid */}
              <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '3rem' }}>
                {paginatedProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}

                {isLoading ? (
                  <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', fontFamily: 'Lato, sans-serif', color: 'var(--aged-wood)' }}>
                    Loading artisanal products...
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <EmptyState onClearFilters={handleClearFilters} />
                ) : null}
              </div>

              {/* Pagination Controls */}
              {!isLoading && totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '4rem', gap: '1.5rem' }}>
                  <button
                    onClick={() => {
                      setCurrentPage(p => Math.max(1, p - 1));
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    disabled={currentPage === 1}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: currentPage === 1 ? 'transparent' : 'var(--terracotta)',
                      color: currentPage === 1 ? 'rgba(139,94,60,0.4)' : '#fff',
                      border: currentPage === 1 ? '1px solid rgba(139,94,60,0.2)' : 'none',
                      borderRadius: '8px',
                      fontFamily: 'Lato, sans-serif',
                      fontWeight: 700,
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Previous
                  </button>

                  <span style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, color: 'var(--rich-brown)' }}>
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => {
                      setCurrentPage(p => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    disabled={currentPage === totalPages}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: currentPage === totalPages ? 'transparent' : 'var(--terracotta)',
                      color: currentPage === totalPages ? 'rgba(139,94,60,0.4)' : '#fff',
                      border: currentPage === totalPages ? '1px solid rgba(139,94,60,0.2)' : 'none',
                      borderRadius: '8px',
                      fontFamily: 'Lato, sans-serif',
                      fontWeight: 700,
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Marquee CTA (Replaces Cinematic) ─────────────────────────────────────── */}
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: '4rem 0',
            backgroundColor: '#E32D3A', // Vibrant red from video
            backgroundImage: 'radial-gradient(circle, rgba(180, 17, 58, 0.4) 4px, transparent 4px)', // Polka dots
            backgroundSize: '40px 40px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee-scroll-fast 35s linear infinite', width: 'fit-content' }}>
            {/* Render 4 sets of the text + flower to ensure seamless looping */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{
                  fontSize: 'clamp(4rem, 8vw, 6.5rem)',
                  fontWeight: 900,
                  fontFamily: '"Arial Black", "Inter", system-ui, sans-serif',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  lineHeight: 1
                }}>
                  DISCOVER THE TASTE, AUTHENTIC SPICES!
                </span>
                <svg viewBox="0 0 100 100" width="85" height="85" style={{ margin: '0 4rem', flexShrink: 0 }}>
                  {/* Dark red background circle */}
                  <circle cx="50" cy="50" r="50" fill="#B4113A" />
                  {/* 8 Pink Petals */}
                  <g fill="#F24E79">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                      <ellipse key={angle} cx="50" cy="22" rx="10" ry="16" transform={`rotate(${angle} 50 50)`} />
                    ))}
                  </g>
                  {/* Center Dot */}
                  <circle cx="50" cy="50" r="14" fill="#B4113A" />
                </svg>
              </div>
            ))}
          </div>
          <style>{`
            @keyframes marquee-scroll-fast {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </section>

        {/* FAQ SECTION */}
        <FaqAccordion />

      </main>
      <Footer />
      <style>{`
        /* Floating motion animation */
        @keyframes productFloat {
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

        /* Desktop */
        @media (min-width: 901px) {
          .mobile-category-select { display: none; }
        }

        /* Mobile */
        @media (max-width: 900px) {
          .products-main-section { padding-left: 1rem !important; padding-right: 1rem !important; overflow-x: hidden; width: 100vw !important; max-width: 100vw !important; box-sizing: border-box !important; }
          .products-layout { flex-direction: column !important; width: 100% !important; max-width: 100% !important; overflow: hidden !important; }
          .products-main-content { width: 100% !important; max-width: 100% !important; overflow: hidden !important; min-width: 0 !important; }
          .sidebar-hide-mobile { display: none; }
          .products-hero-section { min-height: 40vh !important; padding-top: 100px !important; padding-bottom: 2rem !important; }
          .products-hero-svg { width: 100% !important; max-width: 100% !important; margin-left: 0 !important; }

          /* Mobile Overrides for Product Cards (2 per row) */
          .products-grid {
            display: grid !important;
            grid-template-columns: calc(50% - 0.25rem) calc(50% - 0.25rem) !important;
            gap: 0.5rem !important;
            padding-top: 30px !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
          }
          .product-grid-card {
            padding: 0 0.25rem 1rem 0.25rem !important;
            margin-top: 10px !important;
            min-width: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            word-wrap: break-word !important;
            box-sizing: border-box !important;
          }
          .product-stage {
            height: 140px !important;
            margin-bottom: 0.5rem !important;
          }
          .product-card-mandala {
            width: 150px !important;
            height: 150px !important;
            margin-top: -75px !important;
            margin-left: -75px !important;
          }
          .product-img-wrap {
            width: 125px !important;
            height: 125px !important;
          }
          .product-grid-title {
            font-size: 0.8rem !important;
            min-height: 2.2rem !important;
            margin-bottom: 0.5rem !important;
            line-height: 1.1 !important;
            word-break: break-word !important; /* Prevents long title words from breaking layout */
            width: 100% !important;
            max-width: 100% !important;
          }
          .product-grid-pill {
            padding: 0.2rem 0.4rem !important;
            margin-bottom: 0.5rem !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .product-grid-pill-text {
            font-size: 0.45rem !important;
            display: block !important;
            text-align: center !important;
            white-space: normal !important; /* Prevents the pill text from forcing width */
            width: 100% !important;
            max-width: 100% !important;
            word-wrap: break-word !important;
          }
          .product-grid-desc {
            font-size: 0.65rem !important;
            line-height: 1.2 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 3 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', color: 'var(--rich-brown)', fontFamily: 'Lato, sans-serif' }}>
        Loading our delicious foods...
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
