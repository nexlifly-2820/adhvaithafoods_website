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
/**
 * Renders an individual product card matching the specific bold yellow 'Recipe' design.
 */
function ProductCard({ product, index }) {
  return (
    <div
      id={`product-${product.id}`}
      className="product-card-reveal product-grid-card"
      style={{
        background: '#EBAA03', // Solid golden yellow from the image
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 2rem 2.5rem 2rem', // No top padding since image floats
        marginTop: '90px', // Creates space for the overflowing circle
        transition: 'transform 0.3s ease',
        animationDelay: `${Math.min(index, 8) * 0.06}s`,
        borderRadius: '8px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Circular Floating Image */}
      <div
        className="product-grid-img"
        style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          marginTop: '-90px', // Pulls it up exactly half its height
          border: '3px solid #111',
          boxShadow: '10px 10px 15px rgba(0,0,0,0.5)', // Strong black drop shadow
          overflow: 'hidden',
          backgroundColor: '#fff',
          flexShrink: 0,
          marginBottom: '2rem'
        }}
      >
        <img
          src={product.img}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Title */}
      <h3
        className="product-grid-title"
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.6rem',
          fontWeight: 900,
          color: '#111',
          textAlign: 'center',
          lineHeight: 1.15,
          marginBottom: '1.25rem',
          minHeight: '3.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {product.name}
      </h3>

      {/* Stats Pill */}
      <div className="product-grid-pill" style={{
        backgroundColor: '#fff',
        padding: '0.4rem 1rem',
        marginBottom: '1.25rem',
        borderRadius: '4px'
      }}>
        <span className="product-grid-pill-text" style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: '0.75rem',
          fontWeight: 800,
          color: '#111',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {product.badge || 'AUTHENTIC'} | {DISPLAY_WEIGHT} | ★ {product.rating || 5}
        </span>
      </div>

      {/* Description */}
      <p
        className="product-grid-desc"
        style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: '0.9rem',
          fontWeight: 500,
          color: '#111',
          textAlign: 'center',
          lineHeight: 1.5,
          marginBottom: '0',
          flex: 1
        }}
      >
        {product.desc}
      </p>
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
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, sortBy]);

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
          className="products-hero-section"
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
            className="products-hero-svg"
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
                style={{ animationDelay: '2.7s' }}
              />

              <path
                d="M 110 320 Q 320 280, 580 320 Q 750 350, 900 310"
                fill="none" stroke="#442111" strokeWidth="5"
                className="animated-path"
                style={{ animationDelay: '2.9s' }}
              />

              {/* ── TOP LINE: WE BELIEVE THAT AUTHENTIC ── */}
              <text fontSize="60" className="animated-text" style={{ animationDelay: '3.1s' }}>
                <textPath href="#top-text-arc" startOffset="0%">WE BELIEVE THAT AUTHENTIC</textPath>
              </text>

              {/* ── MIDDLE LINE: FOOD HAS THE POWER ── */}
              {/* FOOD */}
              <text x="100" y="290" fontSize="170" className="animated-text" style={{ animationDelay: '3.2s', letterSpacing: '2px' }}>
                FOOD
              </text>

              {/* HAS THE (Stacked) */}
              <g className="animated-text" style={{ animationDelay: '3.3s' }}>
                <text x="480" y="220" fontSize="40">HAS</text>
                <text x="470" y="280" fontSize="40">THE</text>
              </g>

              {/* POWER */}
              <text x="560" y="270" fontSize="100" transform="rotate(-2, 560, 270)" className="animated-text" style={{ animationDelay: '3.4s' }}>
                POWER
              </text>

              {/* ── BOTTOM LINE: TO CHANGE THE WORLD. ── */}
              {/* TO (with underline) */}
              <g className="animated-text" style={{ animationDelay: '3.5s' }}>
                <text x="140" y="420" fontSize="48">TO</text>
                <path d="M 140 435 Q 165 430, 185 432" fill="none" stroke="#442111" strokeWidth="4" />
              </g>

              {/* CHANGE */}
              <text x="210" y="430" fontSize="105" className="animated-text" style={{ animationDelay: '3.6s' }}>
                CHANGE
              </text>

              {/* THE (Stacked with double underline) */}
              <g className="animated-text" style={{ animationDelay: '3.7s' }}>
                <text x="525" y="375" fontSize="35">THE</text>
                <path d="M 525 390 Q 545 385, 565 390" fill="none" stroke="#442111" strokeWidth="3" />
                <path d="M 528 400 Q 545 395, 562 400" fill="none" stroke="#442111" strokeWidth="3" />
              </g>

              {/* WORLD. */}
              <text x="590" y="430" fontSize="105" transform="rotate(-2, 590, 430)" className="animated-text" style={{ animationDelay: '3.8s' }}>
                WORLD.
              </text>


            </g>
          </svg>

        </section>

        {/* ── Advanced Sidebar Layout ──────────────────────── */}
        <section className="products-main-section" style={{ background: 'var(--cream)', minHeight: '80vh', padding: '4rem 2rem 10rem' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '4rem', flexDirection: 'row' }} className="products-layout">

            <FilterSidebar
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />

            {/* ── Main Products Grid ── */}
            <div className="products-main-content" style={{ flex: 1 }}>
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

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {/* Mobile Category Dropdown (Hidden on Desktop) */}
                  <select
                    className="mobile-category-select"
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
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
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  {/* Sort Dropdown */}
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
            padding: 0 0.5rem 0.5rem 0.5rem !important;
            margin-top: 40px !important;
            min-width: 0 !important; /* Prevents long text from overflowing the column */
            max-width: 100% !important;
            width: 100% !important;
            word-wrap: break-word !important; /* Allows long words to break */
            box-sizing: border-box !important;
          }
          .product-grid-img {
            width: 80px !important;
            height: 80px !important;
            margin-top: -40px !important;
            margin-bottom: 0.5rem !important;
            border-width: 2px !important;
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
