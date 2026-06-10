'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingCart, SlidersHorizontal, X } from 'lucide-react';

const allProducts = [
  { id: 'mango-avakaya', name: 'Raw Mango Avakaya', category: '16 - Prepared Foods', price: 199, weight: '250g', rating: 5, reviews: 1240, spice: 4, badge: 'Bestseller', badgeClass: 'badge-bestseller', emoji: '🥭', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop', desc: 'Bold, spicy and sun-kissed — the crown jewel of Andhra pickles. Stone-ground spices, cold-pressed sesame oil.' },
  { id: 'mango-500', name: 'Raw Mango Avakaya', category: '16 - Prepared Foods', price: 349, weight: '500g', rating: 5, reviews: 1240, spice: 4, badge: 'Value Pack', badgeClass: 'badge-bestseller', emoji: '🥭', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop', desc: 'Same bold Avakaya, bigger jar. Best value for avid pickle fans.' },
  { id: 'gongura', name: 'Gongura Pickle', category: '15 - Ready-to-eat savouries', price: 179, weight: '250g', rating: 5, reviews: 890, spice: 3, badge: 'Most Loved', badgeClass: 'badge-most-loved', emoji: '🌿', img: 'https://images.unsplash.com/photo-1592663527359-cf664edbcaf9?q=80&w=600&auto=format&fit=crop', desc: 'Tangy sorrel leaves in a rich sesame oil base — unmistakably Andhra.' },
  { id: 'green-chili', name: 'Green Chili Pickle', category: '04 - Fruits, veg, nuts', price: 159, weight: '250g', rating: 4, reviews: 670, spice: 5, badge: 'Spicy', badgeClass: 'badge-spicy', emoji: '🌶️', img: 'https://images.unsplash.com/photo-1589255474136-22a00cb0b230?q=80&w=600&auto=format&fit=crop', desc: 'Whole tender green chilies marinated in aromatic spiced sesame oil.' },
  { id: 'lemon', name: 'Lemon Pickle', category: '04 - Fruits, veg, nuts', price: 149, weight: '250g', rating: 4, reviews: 540, spice: 2, badge: 'New Arrival', badgeClass: 'badge-new', emoji: '🍋', img: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=600&auto=format&fit=crop', desc: 'Preserved lemons with turmeric, rock salt and red Kashmiri chili.' },
  { id: 'garlic', name: 'Garlic Pickle', category: '12 - Salts, spices, soups', price: 169, weight: '250g', rating: 5, reviews: 420, spice: 3, badge: null, badgeClass: '', emoji: '🧄', img: 'https://images.unsplash.com/photo-1606850780554-b55ea44f45ce?q=80&w=600&auto=format&fit=crop', desc: 'Bold garlic cloves slow-pickled in sesame oil with mustard seeds.' },
  { id: 'mixed-veg', name: 'Mixed Vegetable', category: '16 - Prepared Foods', price: 189, weight: '500g', rating: 4, reviews: 380, spice: 2, badge: null, badgeClass: '', emoji: '🥕', img: 'https://images.unsplash.com/photo-1627464983056-11f8e13d5cf5?q=80&w=600&auto=format&fit=crop', desc: 'Seasonal vegetables pickled in authentic Andhra spice blend.' },
  { id: 'combo', name: 'Combo Pack — 4 Jars', category: '18 - Indian Sweets & Snacks', price: 599, weight: '4×250g', rating: 5, reviews: 760, spice: 3, badge: 'Best Value', badgeClass: 'badge-bestseller', emoji: '🎁', img: 'https://images.unsplash.com/photo-1615486171448-4ffdc9481977?q=80&w=600&auto=format&fit=crop', desc: 'Mango, Gongura, Lemon & Chili — the perfect family sampler set.' },
];

const categories = [
  'All',
  '16 - Prepared Foods',
  '15 - Ready-to-eat savouries',
  '12 - Salts, spices, soups',
  '18 - Indian Sweets & Snacks',
  '01 - Dairy analogues',
  '04 - Fruits, veg, nuts',
  '14 - Beverages'
];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];
const spiceLevels = [
  { level: 0, label: 'All', emoji: '' },
  { level: 1, label: 'Mild', emoji: '🌶️' },
  { level: 2, label: 'Medium', emoji: '🌶️🌶️' },
  { level: 3, label: 'Hot', emoji: '🌶️🌶️🌶️' },
  { level: 4, label: 'Very Hot', emoji: '🌶️🌶️🌶️🌶️' },
  { level: 5, label: 'Extreme', emoji: '🌶️🌶️🌶️🌶️🌶️' },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [spiceFilter, setSpiceFilter] = useState(0);
  const [sortBy, setSortBy] = useState('Featured');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  let filtered = allProducts.filter(p => {
    const catMatch = activeCategory === 'All' || p.category === activeCategory;
    const spiceMatch = spiceFilter === 0 || p.spice >= spiceFilter;
    return catMatch && spiceMatch;
  });

  if (sortBy === 'Price: Low to High') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'Price: High to Low') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === 'Top Rated') filtered = [...filtered].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);

  return (
    <>
      <Navbar />
      <main>

        {/* ── Cinematic Hero ─────────────────────────────────────── */}
        <section id="products-hero" style={{
          position: 'relative', overflow: 'hidden',
          minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Background Image */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2000&auto=format&fit=crop" alt="Pickles collection" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,10,3,0.8), rgba(26,10,3,0.95))' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 2rem' }} className="reveal">
            <span style={{
              fontFamily: 'Lato, sans-serif', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase',
              color: 'var(--turmeric)', display: 'block', marginBottom: '1.5rem',
            }}>The Avdaitha Collection</span>

            <h1 style={{
              fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3.5rem, 8vw, 6rem)',
              fontWeight: 900, color: 'var(--ivory)', marginBottom: '1.5rem', lineHeight: 1
            }}>
              Pure. Natural.<br />
              <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>Authentic.</em>
            </h1>

            <p style={{
              fontFamily: 'Lato, sans-serif', fontSize: '1.2rem', color: 'rgba(250,240,220,0.8)',
              maxWidth: '600px', margin: '0 auto', lineHeight: 1.8
            }}>
              Explore our curated selection of hand-crafted artisan pickles, made exactly the way our grandmothers made them.
            </p>
          </div>
        </section>

        {/* ── Advanced Sidebar Layout ──────────────────────── */}
        <section style={{ background: 'var(--cream)', minHeight: '80vh', padding: '4rem 2rem 10rem' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '4rem', flexDirection: 'row' }} className="products-layout">

            {/* ── Official Sidebar ── */}
            <aside style={{ width: '300px', flexShrink: 0 }} className="sidebar-hide-mobile">
              <div style={{ position: 'sticky', top: '100px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 900, color: 'var(--rich-brown)', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid rgba(139,94,60,0.1)' }}>
                  FSSAI Categories
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        textAlign: 'left',
                        fontFamily: 'Lato, sans-serif', fontWeight: activeCategory === cat ? 900 : 700,
                        fontSize: '0.85rem', padding: '1rem', borderRadius: '12px',
                        border: 'none',
                        background: activeCategory === cat ? '#fff' : 'transparent',
                        color: activeCategory === cat ? 'var(--terracotta)' : 'var(--aged-wood)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: activeCategory === cat ? '0 10px 20px rgba(61,31,10,0.05)' : 'none',
                        borderLeft: activeCategory === cat ? '4px solid var(--terracotta)' : '4px solid transparent'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 900, color: 'var(--rich-brown)', margin: '3rem 0 1.5rem', paddingBottom: '1rem', borderBottom: '2px solid rgba(139,94,60,0.1)' }}>
                  Spice Level
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {spiceLevels.map(opt => (
                    <button
                      key={opt.level}
                      onClick={() => setSpiceFilter(opt.level)}
                      style={{
                        textAlign: 'left', display: 'flex', justifyContent: 'space-between',
                        fontFamily: 'Lato, sans-serif', fontSize: '0.85rem', fontWeight: spiceFilter === opt.level ? 900 : 700,
                        padding: '0.8rem 1rem', borderRadius: '12px',
                        border: 'none',
                        background: spiceFilter === opt.level ? 'rgba(196,96,58,0.1)' : 'transparent',
                        color: spiceFilter === opt.level ? 'var(--terracotta)' : 'var(--aged-wood)',
                        cursor: 'pointer', transition: 'all 0.2s ease',
                      }}
                    >
                      <span>{opt.label}</span> <span>{opt.emoji}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* ── Main Products Grid ── */}
            <div style={{ flex: 1 }}>
              {/* Toolbar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '2px', background: 'var(--terracotta)' }} />
                  <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.85rem', fontWeight: 900, color: 'var(--aged-wood)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    Showing {filtered.length} Artisanal Pickles
                  </p>
                </div>

                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  style={{
                    fontFamily: 'Lato, sans-serif', fontWeight: 700,
                    fontSize: '0.85rem', color: 'var(--rich-brown)',
                    border: '1px solid rgba(139,94,60,0.2)',
                    borderRadius: '8px', padding: '0.75rem 1.25rem',
                    background: '#fff', cursor: 'pointer', outline: 'none',
                  }}
                >
                  {sortOptions.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>

              {/* Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '3rem' }}>
                {filtered.map((p, i) => (
                  <div key={p.id} id={`product-${p.id}`} className="reveal" style={{
                    background: 'var(--ivory)', borderRadius: '24px', overflow: 'hidden',
                    border: '1px solid rgba(139,94,60,0.08)',
                    boxShadow: '0 20px 40px rgba(61,31,10,0.03)',
                    transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease',
                    animationDelay: `${i * 0.05}s`
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 30px 60px rgba(61,31,10,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(61,31,10,0.03)'; }}
                  >
                    {/* Image Block */}
                    <div style={{ position: 'relative', height: '300px', overflow: 'hidden', background: '#f8f5f0' }}>
                      <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                      />

                      {/* Dark gradient at bottom of image for contrast */}
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, rgba(26,10,3,0.5), transparent)', pointerEvents: 'none' }} />

                      {p.badge && (
                        <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
                          <span style={{
                            fontFamily: 'Lato, sans-serif', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase',
                            background: p.badgeClass === 'badge-bestseller' ? 'var(--turmeric)' : p.badgeClass === 'badge-new' ? 'var(--terracotta)' : 'var(--forest-green)',
                            color: p.badgeClass === 'badge-bestseller' ? 'var(--rich-brown)' : 'var(--ivory)',
                            padding: '0.5rem 1rem', borderRadius: '4px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                          }}>{p.badge}</span>
                        </div>
                      )}

                      <div style={{ position: 'absolute', bottom: '1rem', right: '1.5rem', fontSize: '1rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                        {'🌶️'.repeat(p.spice)}
                      </div>
                    </div>

                    {/* Content Block */}
                    <div style={{ padding: '2rem' }}>
                      {/* Rating */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--turmeric)', fontSize: '1rem', letterSpacing: '2px' }}>{'★'.repeat(p.rating)}{'☆'.repeat(5 - p.rating)}</span>
                        <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.8rem', fontWeight: 700, color: 'var(--aged-wood)' }}>({p.reviews.toLocaleString()} Reviews)</span>
                      </div>

                      <h3 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '1.75rem', fontWeight: 900,
                        color: 'var(--rich-brown)', marginBottom: '0.75rem', lineHeight: 1.2,
                      }}>{p.name}</h3>

                      <p style={{
                        fontFamily: 'Lato, sans-serif', fontSize: '1rem', color: 'var(--aged-wood)',
                        marginBottom: '1.5rem', lineHeight: 1.6, minHeight: '3.2rem'
                      }}>{p.desc}</p>

                      {/* Price + weight */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(139,94,60,0.1)' }}>
                        <div>
                          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 900, color: 'var(--terracotta)' }}>₹{p.price}</span>
                          <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--aged-wood)', marginLeft: '0.5rem' }}>/ {p.weight}</span>
                        </div>
                        <span style={{
                          fontFamily: 'Lato, sans-serif', fontSize: '0.7rem', fontWeight: 900,
                          letterSpacing: '0.15em', textTransform: 'uppercase',
                          color: 'var(--forest-green)',
                          background: 'rgba(45,90,39,0.08)',
                          padding: '0.4rem 0.75rem', borderRadius: '4px',
                        }}>In Stock</span>
                      </div>

                      <button
                        id={`cart-${p.id}`}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                          background: 'var(--terracotta)', color: 'var(--ivory)',
                          fontFamily: 'Lato, sans-serif', fontSize: '0.9rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase',
                          padding: '1.25rem', borderRadius: '8px', border: 'none', cursor: 'pointer',
                          transition: 'background 0.3s ease, transform 0.2s ease',
                        }}
                        onMouseOver={e => e.currentTarget.style.background = '#a64f2d'}
                        onMouseOut={e => e.currentTarget.style.background = 'var(--terracotta)'}
                        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                        onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <ShoppingCart size={18} /> Add to Cart
                      </button>
                    </div>
                  </div>
                ))}

                {filtered.length === 0 && (
                  <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '8rem 2rem', background: 'var(--ivory)', borderRadius: '24px', border: '1px dashed rgba(139,94,60,0.2)' }}>
                    <div style={{ fontSize: '5rem', marginBottom: '1.5rem', opacity: 0.5 }}>🫙</div>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 900, color: 'var(--rich-brown)', marginBottom: '1rem' }}>No Pickles Found</h3>
                    <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.15rem', color: 'var(--aged-wood)', marginBottom: '2.5rem' }}>Our pantry doesn't have anything matching those specific filters right now.</p>
                    <button onClick={() => { setActiveCategory('All'); setSpiceFilter(0); }}
                      style={{
                        background: 'transparent', border: '2px solid var(--forest-green)', color: 'var(--forest-green)',
                        fontFamily: 'Lato, sans-serif', fontSize: '0.9rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase',
                        padding: '1rem 2rem', borderRadius: '8px', cursor: 'pointer'
                      }}
                    >Clear Filters</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Cinematic CTA ─────────────────────────────────────── */}
        <section style={{ position: 'relative', overflow: 'hidden', padding: '10rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <img src="https://images.unsplash.com/photo-1606850780554-b55ea44f45ce?q=80&w=2000&auto=format&fit=crop" alt="Grinding spices" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(45,90,39,0.9), rgba(26,10,3,0.95))' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }} className="reveal">
            <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--turmeric)', display: 'block', marginBottom: '1.5rem' }}>
              The Ultimate Experience
            </span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 900, color: 'var(--ivory)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Can't Decide? Try Our<br /><em style={{ color: 'var(--turmeric)', fontStyle: 'italic' }}>Signature Combo Pack</em>
            </h2>
            <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.25rem', color: 'rgba(250,240,220,0.8)', marginBottom: '3rem', lineHeight: 1.8 }}>
              4 of our best-selling artisan jars in one beautifully packaged box. The perfect way to discover your new favorite flavor or gift a piece of Andhra heritage.
            </p>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: '1rem',
              background: 'var(--turmeric)', color: 'var(--rich-brown)',
              fontFamily: 'Lato, sans-serif', fontSize: '1rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase',
              padding: '1.25rem 3.5rem', borderRadius: '50px', border: 'none', cursor: 'pointer',
              transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
              boxShadow: '0 10px 30px rgba(232,168,32,0.3)'
            }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(232,168,32,0.4)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(232,168,32,0.3)'; }}
            >
              <ShoppingCart size={18} /> Get Combo Pack — ₹599
            </button>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 900px) {
          .products-layout { flexDirection: column !important; }
          .sidebar-hide-mobile { display: none; }
        }
      `}</style>
    </>
  );
}
