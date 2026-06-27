/**
 * @file app/products/page.js
 * @description Products page displaying the catalog of Avdaitha Foods artisanal pickles.
 * Implements filtering, sorting, and responsive layout.
 * Clean code applied: Extracted components, removed cart/pricing per requirements.
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
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
 * This separates business logic from UI rendering.
 */
function getFilteredAndSortedProducts(products, category, sortBy) {
  let filtered = products.filter((p) => {
    const matchesCategory = category === FILTER_ALL || p.category === category;
    return matchesCategory;
  });

  if (sortBy === SORT_TOP_RATED) {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  }

  return filtered;
}

// ─── Sub-components extracted for better readability ────────────────

/**
 * Renders an individual product card.
 */
function ProductCard({ product, index }) {
  return (
    <div
      id={`product-${product.id}`}
      className="product-card-reveal"
      style={{
        background: 'var(--ivory)',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(139,94,60,0.08)',
        boxShadow: '0 20px 40px rgba(61,31,10,0.03)',
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease',
        animationDelay: `${Math.min(index, 8) * 0.06}s`,
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = '0 30px 60px rgba(61,31,10,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(61,31,10,0.03)';
      }}
    >
      {/* Product Image Area */}
      <div style={{ position: 'relative', height: '300px', overflow: 'hidden', background: '#f8f5f0' }}>
        <img
          src={product.img}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to top, rgba(26,10,3,0.5), transparent)',
            pointerEvents: 'none',
          }}
        />

        {product.badge && (
          <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
            <span
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '0.7rem',
                fontWeight: 900,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                background:
                  product.badgeClass === 'badge-bestseller'
                    ? 'var(--turmeric)'
                    : product.badgeClass === 'badge-new'
                    ? 'var(--terracotta)'
                    : 'var(--forest-green)',
                color: product.badgeClass === 'badge-bestseller' ? 'var(--rich-brown)' : 'var(--ivory)',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              {product.badge}
            </span>
          </div>
        )}


      </div>

      {/* Product Details Area */}
      <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span style={{ color: 'var(--turmeric)', fontSize: '1rem', letterSpacing: '2px' }}>
            {'★'.repeat(product.rating || 5)}
            {'☆'.repeat(5 - (product.rating || 5))}
          </span>
          <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.8rem', fontWeight: 700, color: 'var(--aged-wood)' }}>
            ({(product.reviews || 0).toLocaleString()} Reviews)
          </span>
        </div>

        <h3
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.75rem',
            fontWeight: 900,
            color: 'var(--rich-brown)',
            marginBottom: '0.75rem',
            lineHeight: 1.2,
          }}
        >
          {product.name}
        </h3>

        <p
          style={{
            fontFamily: 'Lato, sans-serif',
            fontSize: '1rem',
            color: 'var(--aged-wood)',
            marginBottom: '1rem',
            lineHeight: 1.6,
            flex: 1,
          }}
        >
          {product.desc}
        </p>

        {/* Display weight requirement */}
        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(139,94,60,0.1)' }}>
          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--terracotta)' }}>
            Weight: {DISPLAY_WEIGHT}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Sidebar for category and spice filtering.
 */
function FilterSidebar({ activeCategory, setActiveCategory }) {
  return (
    <aside style={{ width: '300px', flexShrink: 0 }} className="sidebar-hide-mobile">
      <div style={{ position: 'sticky', top: '100px' }}>
        {/* Categories Section */}
        <h3
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.4rem',
            fontWeight: 900,
            color: 'var(--rich-brown)',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '2px solid rgba(139,94,60,0.1)',
          }}
        >
          FSSAI Categories
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  textAlign: 'left',
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: isActive ? 900 : 700,
                  fontSize: '0.85rem',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: isActive ? '#fff' : 'transparent',
                  color: isActive ? 'var(--terracotta)' : 'var(--aged-wood)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isActive ? '0 10px 20px rgba(61,31,10,0.05)' : 'none',
                  borderLeft: isActive ? '4px solid var(--terracotta)' : '4px solid transparent',
                }}
              >
                {cat}
              </button>
            );
          })}
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

export default function ProductsPage() {
  console.log("ProductsPage re-rendering with new SVG coordinates...");
  const [activeCategory, setActiveCategory] = useState(FILTER_ALL);
  const [sortBy, setSortBy] = useState(SORT_FEATURED);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Use a dynamic API URL from environment variables, fallback to localhost for development
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/dashboard/website/api/get-website-products`);
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          const mappedProducts = json.data.map(p => ({
            ...p,
            name: p.productName || p.name || 'Unnamed Product',
            desc: p.productDescription || p.desc || '',
            img: (p.images && p.images.length > 0) ? p.images[0] : (p.img || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80'),
            rating: p.rating || 5,
            reviews: p.reviews || Math.floor(Math.random() * 100) + 10,
          }));
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
    return getFilteredAndSortedProducts(products, activeCategory, sortBy);
  }, [products, activeCategory, sortBy]);

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
  };

  return (
    <>
      <Navbar />
      <main>
        {/* ── Custom Typography Hero perfectly matching the requested image ── */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Caveat+Brush&family=Patrick+Hand+SC&display=swap');

          #products-hero {
            background-color: #F4EFE6; /* Match the textured off-white beige of the image */
          }

          /* Subtle texture overlay */
          .texture-overlay {
            position: absolute;
            inset: 0;
            opacity: 0.4;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            pointer-events: none;
            mix-blend-mode: multiply;
          }

          @keyframes drawLine {
            to { stroke-dashoffset: 0; }
          }
          
          .animated-path {
            stroke-dasharray: 2000;
            stroke-dashoffset: 2000;
            animation: drawLine 2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          .animated-text {
            opacity: 0;
            transform: translateY(10px);
            animation: popIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          @keyframes popIn {
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <section
          id="products-hero"
          style={{
            position: 'relative', overflow: 'hidden',
            minHeight: '100vh', paddingTop: '75px',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
        >
          <div className="texture-overlay" />

          {/* ── SVG Poster perfectly modeled after the reference image ── */}
          <svg
            viewBox="0 0 1000 520"
            xmlns="http://www.w3.org/2000/svg"
            style={{ 
              width: '100%', 
              height: 'auto', 
              maxHeight: '85vh', 
              display: 'block', 
              overflow: 'visible', 
              position: 'relative', 
              zIndex: 1,
              margin: '0 auto' 
            }}
          >
            <defs>
              <path id="top-text-arc" d="M 120 100 Q 450 40, 900 110" />
            </defs>

            <g fontFamily="'Caveat Brush', 'Patrick Hand SC', cursive" fill="#442111" strokeLinecap="round" strokeLinejoin="round">
              
              {/* ── WAVY LINES (Decorative separators) ── */}
              <path 
                d="M 110 150 Q 320 100, 580 160 Q 750 200, 900 150" 
                fill="none" stroke="#442111" strokeWidth="5" 
                className="animated-path" 
                style={{ animationDelay: '0.2s' }}
              />
              
              <path 
                d="M 110 320 Q 320 280, 580 320 Q 750 350, 900 310" 
                fill="none" stroke="#442111" strokeWidth="5" 
                className="animated-path" 
                style={{ animationDelay: '0.4s' }}
              />

              {/* ── TOP LINE: WE BELIEVE THAT AUTHENTIC ── */}
              <text fontSize="60" className="animated-text" style={{ animationDelay: '0.6s' }}>
                <textPath href="#top-text-arc" startOffset="0%">WE BELIEVE THAT AUTHENTIC</textPath>
              </text>

              {/* ── MIDDLE LINE: FOOD HAS THE POWER ── */}
              {/* FOOD */}
              <text x="100" y="290" fontSize="170" className="animated-text" style={{ animationDelay: '0.7s', letterSpacing: '2px' }}>
                FOOD
              </text>
              
              {/* HAS THE (Stacked) */}
              <g className="animated-text" style={{ animationDelay: '0.8s' }}>
                <text x="480" y="220" fontSize="40">HAS</text>
                <text x="470" y="280" fontSize="40">THE</text>
              </g>

              {/* POWER */}
              <text x="560" y="270" fontSize="100" transform="rotate(-2, 560, 270)" className="animated-text" style={{ animationDelay: '0.9s' }}>
                POWER
              </text>

              {/* ── BOTTOM LINE: TO CHANGE THE WORLD. ── */}
              {/* TO (with underline) */}
              <g className="animated-text" style={{ animationDelay: '1.0s' }}>
                <text x="140" y="420" fontSize="48">TO</text>
                <path d="M 140 435 Q 165 430, 185 432" fill="none" stroke="#442111" strokeWidth="4" />
              </g>

              {/* CHANGE */}
              <text x="210" y="430" fontSize="105" className="animated-text" style={{ animationDelay: '1.1s' }}>
                CHANGE
              </text>

              {/* THE (Stacked with double underline) */}
              <g className="animated-text" style={{ animationDelay: '1.2s' }}>
                <text x="525" y="375" fontSize="35">THE</text>
                <path d="M 525 390 Q 545 385, 565 390" fill="none" stroke="#442111" strokeWidth="3" />
                <path d="M 528 400 Q 545 395, 562 400" fill="none" stroke="#442111" strokeWidth="3" />
              </g>

              {/* WORLD. */}
              <text x="590" y="430" fontSize="105" transform="rotate(-2, 590, 430)" className="animated-text" style={{ animationDelay: '1.3s' }}>
                WORLD.
              </text>


            </g>
          </svg>

        </section>

        {/* ── Advanced Sidebar Layout ──────────────────────── */}
        <section style={{ background: 'var(--cream)', minHeight: '80vh', padding: '4rem 2rem 10rem' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '4rem', flexDirection: 'row' }} className="products-layout">
            
            <FilterSidebar 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
            />

            {/* ── Main Products Grid ── */}
            <div style={{ flex: 1 }}>
              {/* Toolbar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '2px', background: 'var(--terracotta)' }} />
                  <p
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      fontSize: '0.85rem',
                      fontWeight: 900,
                      color: 'var(--aged-wood)',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Showing {filteredProducts.length} Artisanal Pickles
                  </p>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: 'var(--rich-brown)',
                    border: '1px solid rgba(139,94,60,0.2)',
                    borderRadius: '8px',
                    padding: '0.75rem 1.25rem',
                    background: '#fff',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              {/* Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '3rem' }}>
                {filteredProducts.map((p, i) => (
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
            </div>
          </div>
        </section>

        {/* ── Cinematic CTA ─────────────────────────────────────── */}
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: '10rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1606850780554-b55ea44f45ce?q=80&w=2000&auto=format&fit=crop"
              alt="Grinding spices"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(45,90,39,0.9), rgba(26,10,3,0.95))' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }} className="reveal">
            <span
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 900,
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: 'var(--turmeric)',
                display: 'block',
                marginBottom: '1.5rem',
              }}
            >
              The Ultimate Experience
            </span>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                fontWeight: 900,
                color: 'var(--ivory)',
                marginBottom: '1.5rem',
                lineHeight: 1.1,
              }}
            >
              Discover the taste of<br />
              <em style={{ color: 'var(--turmeric)', fontStyle: 'italic' }}>Authentic Spices</em>
            </h2>
            <p
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '1.25rem',
                color: 'rgba(250,240,220,0.8)',
                marginBottom: '3rem',
                lineHeight: 1.8,
              }}
            >
              Each jar is a testament to our heritage, crafted with patience and love to bring you the best of traditional flavors.
            </p>
          </div>
        </section>
        
        {/* FAQ SECTION */}
        <FaqAccordion />

      </main>
      <Footer />
      <style>{`
        @media (max-width: 900px) {
          .products-layout { flex-direction: column !important; }
          .sidebar-hide-mobile { display: none; }
        }
      `}</style>
    </>
  );
}
