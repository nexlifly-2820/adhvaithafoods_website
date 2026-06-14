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

// Constants extracted to avoid magic strings and improve maintainability
const FILTER_ALL = 'All';
const SORT_FEATURED = 'Featured';
const SORT_TOP_RATED = 'Top Rated';
const DISPLAY_WEIGHT = 'min 250g - 2kg';

import { ALL_PRODUCTS } from '@/components/productsData';

const CATEGORIES = [
  FILTER_ALL,
  '16 - Prepared Foods',
  '15 - Ready-to-eat savouries',
  '12 - Salts, spices, soups',
  '18 - Indian Sweets & Snacks',
  '01 - Dairy analogues',
  '04 - Fruits, veg, nuts',
  '14 - Beverages'
];

const SORT_OPTIONS = [SORT_FEATURED, SORT_TOP_RATED]; // Removed price sort options since price is removed

const SPICE_LEVELS = [
  { level: 0, label: 'All', emoji: '' },
  { level: 1, label: 'Mild', emoji: '🌶️' },
  { level: 2, label: 'Medium', emoji: '🌶️🌶️' },
  { level: 3, label: 'Hot', emoji: '🌶️🌶️🌶️' },
  { level: 4, label: 'Very Hot', emoji: '🌶️🌶️🌶️🌶️' },
  { level: 5, label: 'Extreme', emoji: '🌶️🌶️🌶️🌶️🌶️' },
];

/**
 * Filter and sort logic moved to a helper function.
 * This separates business logic from UI rendering.
 */
function getFilteredAndSortedProducts(products, category, spiceFilter, sortBy) {
  let filtered = products.filter((p) => {
    const matchesCategory = category === FILTER_ALL || p.category === category;
    const matchesSpice = spiceFilter === 0 || p.spice >= spiceFilter;
    return matchesCategory && matchesSpice;
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
      className="reveal"
      style={{
        background: 'var(--ivory)',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(139,94,60,0.08)',
        boxShadow: '0 20px 40px rgba(61,31,10,0.03)',
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease',
        animationDelay: `${index * 0.05}s`,
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

        <div style={{ position: 'absolute', bottom: '1rem', right: '1.5rem', fontSize: '1rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
          {'🌶️'.repeat(product.spice)}
        </div>
      </div>

      {/* Product Details Area */}
      <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span style={{ color: 'var(--turmeric)', fontSize: '1rem', letterSpacing: '2px' }}>
            {'★'.repeat(product.rating)}
            {'☆'.repeat(5 - product.rating)}
          </span>
          <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.8rem', fontWeight: 700, color: 'var(--aged-wood)' }}>
            ({product.reviews.toLocaleString()} Reviews)
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
function FilterSidebar({ activeCategory, setActiveCategory, spiceFilter, setSpiceFilter }) {
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

        {/* Spice Level Section */}
        <h3
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.4rem',
            fontWeight: 900,
            color: 'var(--rich-brown)',
            margin: '3rem 0 1.5rem',
            paddingBottom: '1rem',
            borderBottom: '2px solid rgba(139,94,60,0.1)',
          }}
        >
          Spice Level
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {SPICE_LEVELS.map((opt) => {
            const isActive = spiceFilter === opt.level;
            return (
              <button
                key={opt.level}
                onClick={() => setSpiceFilter(opt.level)}
                style={{
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'Lato, sans-serif',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 900 : 700,
                  padding: '0.8rem 1rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: isActive ? 'rgba(196,96,58,0.1)' : 'transparent',
                  color: isActive ? 'var(--terracotta)' : 'var(--aged-wood)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{opt.label}</span> <span>{opt.emoji}</span>
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
        No Pickles Found
      </h3>
      <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.15rem', color: 'var(--aged-wood)', marginBottom: '2.5rem' }}>
        Our pantry doesn't have anything matching those specific filters right now.
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
  const [activeCategory, setActiveCategory] = useState(FILTER_ALL);
  const [spiceFilter, setSpiceFilter] = useState(0);
  const [sortBy, setSortBy] = useState(SORT_FEATURED);

  // Setup intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Memoize filtered products for performance
  const filteredProducts = useMemo(() => {
    return getFilteredAndSortedProducts(ALL_PRODUCTS, activeCategory, spiceFilter, sortBy);
  }, [activeCategory, spiceFilter, sortBy]);

  const handleClearFilters = () => {
    setActiveCategory(FILTER_ALL);
    setSpiceFilter(0);
  };

  return (
    <>
      <Navbar />
      <main>
        {/* ── Cinematic Hero ─────────────────────────────────────── */}
        <section
          id="products-hero"
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Background Image */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2000&auto=format&fit=crop"
              alt="Pickles collection"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,10,3,0.8), rgba(26,10,3,0.95))' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 2rem' }} className="reveal">
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
              The Avdaitha Collection
            </span>

            <h1
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(3.5rem, 8vw, 6rem)',
                fontWeight: 900,
                color: 'var(--ivory)',
                marginBottom: '1.5rem',
                lineHeight: 1,
              }}
            >
              Pure. Natural.<br />
              <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>Authentic.</em>
            </h1>

            <p
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '1.2rem',
                color: 'rgba(250,240,220,0.8)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: 1.8,
              }}
            >
              Explore our curated selection of hand-crafted artisan pickles, made exactly the way our grandmothers made them.
            </p>
          </div>
        </section>

        {/* ── Advanced Sidebar Layout ──────────────────────── */}
        <section style={{ background: 'var(--cream)', minHeight: '80vh', padding: '4rem 2rem 10rem' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '4rem', flexDirection: 'row' }} className="products-layout">
            
            <FilterSidebar 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
              spiceFilter={spiceFilter} 
              setSpiceFilter={setSpiceFilter} 
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

                {filteredProducts.length === 0 && <EmptyState onClearFilters={handleClearFilters} />}
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
