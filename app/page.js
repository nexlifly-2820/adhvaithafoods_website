'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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

/* ── DATA ─────────────────────────────────── */
// Pick 4 featured products from our main catalog
const products = ALL_PRODUCTS.slice(0, 4).map(p => ({
  ...p,
  tag: p.badge,
  tagCls: p.badgeClass,
  accent: '#C4603A' // default accent color
}));

const ingredients = [
  { name: 'Raw Green Mangoes',       source: 'Andhra Orchards',   emoji: '🥭', bg: 'rgba(74,124,64,0.12)'  },
  { name: 'Red Kashmiri Chilies',    source: 'Sun-dried 7 days',  emoji: '🌶️', bg: 'rgba(185,28,28,0.1)'   },
  { name: 'Cold-Pressed Sesame Oil', source: 'Wooden press',      emoji: '🫙',  bg: 'rgba(217,119,6,0.1)'  },
  { name: 'Mustard Seeds',           source: 'Stone-ground fresh', emoji: '🌰', bg: 'rgba(120,53,15,0.1)'  },
  { name: 'Himalayan Rock Salt',     source: 'Pure & unprocessed', emoji: '🧂', bg: 'rgba(100,116,139,0.1)' },
  { name: 'Fresh Curry Leaves',      source: 'Handpicked daily',  emoji: '🍃', bg: 'rgba(21,128,61,0.1)'   },
];

const testimonials = [
  { text: 'Exactly like my naani used to make! The mango avakaya is absolutely perfect — the right amount of spice and oil. Will never buy from a supermarket again.', author: 'Priya Sharma', city: 'Hyderabad' },
  { text: 'Ordered the combo pack and finished it in a week! The gongura pickle is outstanding. Pure authentic Andhra taste. Fast delivery too.', author: 'Ravi Kumar', city: 'Bangalore' },
  { text: 'My mother cried when she tasted the lemon pickle — said it reminded her of her mother\'s recipe. That says everything. Thank you Avdaitha Foods.', author: 'Meena Reddy', city: 'Chennai' },
];

const trustBadges = ['🌿 100% Natural', '🚫 No Preservatives', '👵 Family Recipe Since 1970', '🏺 Traditional Method', '📦 Pan India Delivery', '☀️ Sun-Dried Always', '🪨 Stone-Ground Spices', '🫙 Glass Jars Only'];

const recipes = [
  { id: 'allam-velluli-pickle-recipe',    name: 'Allam Velluli Pickle Rice',    time: '10 min', emoji: '🍚', color: '#C4603A', desc: 'Hot rice tossed with our traditional Allam Velluli Pickle, sesame seeds, and a drizzle of ghee.' },
  { id: 'crispy-allu-chips', name: 'Crispy Allu Chips', time: '20 min', emoji: '🥔', color: '#E8A820', desc: 'Make perfectly crispy, golden potato chips at home with this simple traditional method.' },
  { id: 'daniya-powder-rasam',  name: 'Daniya Powder Rasam',  time: '20 min', emoji: '🥣', color: '#2D5A27', desc: 'A comforting, deeply aromatic rasam made using freshly ground Daniya Powder.' },
  { id: 'millets-kheer', name: 'Millets Laddu Kheer', time: '15 min', emoji: '🍨', color: '#8B5E3C', desc: 'Comforting, creamy kheer made by crumbling Millets Laddu into warm milk.' },
];

/* ═══════════════════════════════════════════════════
   HOMEPAGE
═══════════════════════════════════════════════════ */
const HERO_IMAGES = [
  '/images/hero-1-pickle.jpg',
  '/images/hero-2-powder.jpg',
  '/images/hero-3-laddu.jpg',
];

export default function HomePage() {
  useReveal();
  const [activeProduct, setActiveProduct] = useState(0);
  const [heroScale, setHeroScale] = useState(1);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Start scaling up after scrolling 50px
      if (scrollY < 50) {
        setHeroScale(1);
        setHeroOpacity(1);
      } else if (scrollY < 800) {
        // Scale exponentially
        const scale = 1 + Math.pow((scrollY - 50) / 100, 2);
        setHeroScale(Math.min(scale, 100)); // cap scale
        // Fade out the black mask when scaled very large
        const opacity = 1 - Math.pow((scrollY - 400) / 400, 2);
        setHeroOpacity(Math.max(0, Math.min(1, opacity)));
      } else {
        setHeroScale(100);
        setHeroOpacity(0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <main>

        {/* ══ HERO ══════════════════════════════════════ */}
        {/* ══ "ULTIMATE CLIENT-WOW" HERO ══════════════════════════════════════ */}
        <section id="hero-section" style={{
          position: 'relative',
          height: '200vh', // Extra height to allow scroll
          background: '#0a0502',
          marginTop: '-80px' // Pull up behind navbar
        }}>
          <div style={{
            position: 'sticky', top: 0,
            height: '100vh', width: '100%',
            overflow: 'hidden',
          }}>
            {/* The beautiful background video/image that will be revealed */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              {HERO_IMAGES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Hero ${i + 1}`}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%', objectFit: 'cover',
                    opacity: currentHeroIndex === i ? 1 : 0,
                    transition: 'opacity 1.5s ease-in-out'
                  }}
                />
              ))}
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
            </div>
            
            {/* The Text Mask Layer */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: heroOpacity < 1 ? `rgba(10,5,2,${heroOpacity})` : '#0a0502',
              pointerEvents: 'none',
              transition: 'background 0.1s'
            }}>
              {HERO_IMAGES.map((src, i) => (
                <h1 key={`mask-${src}`} style={{
                  position: 'absolute',
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '18vw', fontWeight: 900,
                  color: '#000',
                  WebkitTextStroke: '2px rgba(255,255,255,0.1)',
                  // The magic mask
                  background: `url('${src}') center/cover`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  transform: `scale(${heroScale})`,
                  transformOrigin: '50% 50%',
                  transition: 'transform 0.1s cubic-bezier(0.1, 0.5, 0.9, 0.5), opacity 1.5s ease-in-out',
                  whiteSpace: 'nowrap',
                  opacity: currentHeroIndex === i && heroOpacity > 0 ? 1 : 0
                }}>
                  AVDAITHA
                </h1>
              ))}
            </div>

            {/* Scroll Indicator */}
            {heroScale < 2 && (
              <div style={{ 
                position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', 
                zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                opacity: 1 - ((heroScale - 1) * 2)
              }}>
                <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.2em', color: '#fff', textTransform: 'uppercase' }}>Scroll To Enter</span>
                <div style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#fff', animation: 'scrollDown 2s infinite' }} />
                </div>
              </div>
            )}
          </div>
        </section>



        {/* ══ MARQUEE TRUST BAR ══════════════════════ */}
        <div style={{
          background: 'var(--forest-green)',
          borderTop: '1px solid rgba(232,168,32,0.18)',
          borderBottom: '1px solid rgba(232,168,32,0.18)',
          padding: '0.85rem 0', overflow: 'hidden',
        }}>
          <div className="marquee-track">
            {[...trustBadges, ...trustBadges].map((item, i) => (
              <span key={i} className="label" style={{
                color: 'var(--ivory)', padding: '0 2.5rem',
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                fontSize: '0.78rem',
              }}>
                {item} <span style={{ color: 'var(--turmeric)', opacity: 0.5, marginLeft: '0.5rem' }}>✦</span>
              </span>
            ))}
          </div>
        </div>



        {/* ══ PRODUCTS ═══════════════════════════════ */}
        <section id="featured-products" className="section-pad-xl" style={{ background: 'var(--cream)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }} className="reveal">
              <span className="eyebrow">Our Collection</span>
              <h2 className="display-lg" style={{ color: 'var(--forest-green)', display: 'inline' }}>Our Beloved </h2>
              <h2 className="display-lg" style={{ color: 'var(--terracotta)', fontStyle: 'italic', display: 'inline' }}>Pickles</h2>
              <p className="body-lg" style={{ color: 'var(--aged-wood)', marginTop: '0.75rem', maxWidth: '480px', margin: '0.75rem auto 0' }}>
                Every jar tells a story of love and tradition
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '2rem' }}>
              {products.map((p, i) => (
                <div key={p.id} id={`product-${p.id}`} className="product-card reveal" style={{ '--i': i, animationDelay: `${i * 0.08}s` }}>
                  {/* Image */}
                  <div style={{ position: 'relative', height: '240px', overflow: 'hidden', background: '#f0e8d8' }}>
                    {p.img
                      ? <Image src={p.img} alt={p.name} fill sizes="300px" style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                        />
                      : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5.5rem', background: `linear-gradient(135deg, ${p.accent}20, ${p.accent}40)` }}>{p.emoji}</div>
                    }
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to top, rgba(0,0,0,0.22), transparent)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: '12px', left: '12px' }}><span className={`badge ${p.tagCls}`}>{p.tag}</span></div>
                    <div style={{ position: 'absolute', bottom: '10px', right: '12px', color: 'var(--turmeric)', fontSize: '0.82rem', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.4))' }}>★★★★★</div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--rich-brown)', marginBottom: '0.5rem' }}>{p.name}</h3>
                    <p className="body-md" style={{ color: 'var(--aged-wood)', marginBottom: '1.25rem' }}>{p.desc}</p>

                    {/* Display weight requirement instead of price/cart */}
                    <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(139,94,60,0.1)' }}>
                      <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--terracotta)' }}>
                        Weight: min 250g - 2kg
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }} className="reveal">
              <Link href="/products" className="btn btn-outline-green">View All Pickles <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>

        {/* ══ ADVANCED HERITAGE SPLIT ═════════════════════════ */}
        <section id="heritage-story" style={{ background: '#f0e2c4', padding: '6rem 2rem' }}>
          <div className="container" style={{ position: 'relative' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '0',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1
            }} className="split-grid heritage-grid">
              
              {/* Image Side with Parallax/Overlap */}
              <div className="reveal" style={{ position: 'relative', zIndex: 1 }}>
                <div className="heritage-img-wrapper" style={{
                  position: 'relative', 
                  width: '100%', 
                  paddingBottom: '100%',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 30px 60px rgba(61,31,10,0.15)',
                  transform: 'translateX(40px)',
                }}>
                  <Image src="/images/grandmother_kitchen.png" alt="Grandmother making pickles" fill sizes="50vw" style={{ objectFit: 'cover', transform: 'scale(1.05)', transition: 'transform 0.7s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1.05)'} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(61,31,10,0.2), transparent)' }} />
                </div>
                
                {/* Floating Est badge */}
                <div className="animate-float" style={{
                  position: 'absolute', bottom: '-20px', left: '-10px',
                  background: 'var(--terracotta)', color: 'var(--ivory)',
                  borderRadius: '50%', width: '110px', height: '110px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 15px 35px rgba(196,96,58,0.4)',
                  textAlign: 'center', border: '6px solid #f0e2c4',
                  zIndex: 2
                }}>
                  <div style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.15em', opacity: 0.9 }}>EST.</div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 900, lineHeight: 1 }}>1970</div>
                </div>
              </div>

              {/* Text Side - Frosted Glass overlapping the image */}
              <div className="reveal heritage-text-card" style={{ 
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                padding: 'clamp(3rem, 5vw, 4.5rem)',
                borderRadius: '24px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
                position: 'relative',
                zIndex: 2,
                transform: 'translateX(-40px)',
                border: '1px solid rgba(255,255,255,0.4)'
              }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <span style={{ width: '40px', height: '2px', background: 'var(--terracotta)' }}></span>
                  <span className="eyebrow" style={{ marginBottom: 0, color: 'var(--aged-wood)' }}>Our Heritage</span>
                </div>
                
                <h2 style={{ 
                  fontFamily: 'Playfair Display, serif', 
                  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', 
                  fontWeight: 800, 
                  color: 'var(--forest-green)', 
                  lineHeight: 1.15,
                  marginBottom: '1.5rem' 
                }}>
                  Three Generations of<br />
                  <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>Pickle Making</em>
                </h2>
                
                <p className="body-lg" style={{ color: 'var(--rich-brown)', marginBottom: '1.25rem', lineHeight: 1.8 }}>
                  It began in a small kitchen in Guntur, 1970. Our grandmother Avdaitha Ammayya would wake before dawn, stone-grinding spices by hand, selecting only the ripest mangoes from her brother's orchard.
                </p>
                
                <p className="body-lg" style={{ color: 'var(--rich-brown)', marginBottom: '3rem', lineHeight: 1.8 }}>
                  Her daughters learned every secret — the exact spice ratios, the sun-drying days, the patience it takes. Same methods. Same love. Every jar.
                </p>
                
                <Link href="/our-story" className="btn btn-terra" style={{
                  padding: '1rem 2.5rem',
                  fontSize: '0.9rem',
                  boxShadow: '0 8px 20px rgba(196,96,58,0.25)'
                }}>
                  Discover Our Roots <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══ ADVANCED INGREDIENTS ═══════════════════════════ */}
        <section id="ingredients" className="section-pad-xl" style={{ 
          background: 'linear-gradient(135deg, var(--cream) 0%, #f4e9d8 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative background elements */}
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'var(--turmeric)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.08 }} />
          <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '300px', height: '300px', background: 'var(--forest-green)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.06 }} />

          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: '4.5rem' }} className="reveal">
              <span className="eyebrow" style={{ color: 'var(--forest-green)', letterSpacing: '0.4em' }}>Purity Guaranteed</span>
              <h2 className="display-lg" style={{ color: 'var(--rich-brown)', marginTop: '0.5rem' }}>
                What Goes Inside<br />
                <span style={{ 
                  display: 'inline-block', 
                  fontFamily: 'Playfair Display, serif', 
                  fontStyle: 'italic', 
                  color: 'transparent',
                  WebkitTextStroke: '1.5px var(--terracotta)',
                  position: 'relative'
                }}>
                  Every Jar
                  <div style={{ position: 'absolute', bottom: '10px', left: 0, right: 0, height: '12px', background: 'var(--terracotta)', opacity: 0.15, zIndex: -1, transform: 'skewX(-15deg)' }} />
                </span>
              </h2>
              <p className="body-lg" style={{ color: 'var(--aged-wood)', maxWidth: '500px', margin: '1.5rem auto 0' }}>
                We source only the finest, freshest, and most authentic ingredients. Our grandmother wouldn't have it any other way.
              </p>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '2rem', 
              marginBottom: '5rem' 
            }}>
              {ingredients.map((ing, i) => (
                <div key={ing.name} className="reveal ingredient-card-advanced" style={{ 
                  animationDelay: `${i * 0.1}s`,
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  borderRadius: '24px',
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  boxShadow: '0 15px 35px rgba(61,31,10,0.04)',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(61,31,10,0.08)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.querySelector('.ing-emoji-wrapper').style.transform = 'scale(1.15) rotate(5deg)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(61,31,10,0.04)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
                  e.currentTarget.querySelector('.ing-emoji-wrapper').style.transform = 'scale(1) rotate(0deg)';
                }}
                >
                  <div className="ing-emoji-wrapper" style={{ 
                    width: '80px', height: '80px', 
                    background: ing.bg, 
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2.5rem',
                    flexShrink: 0,
                    boxShadow: 'inset 0 -5px 15px rgba(0,0,0,0.05)',
                    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}>
                    {ing.emoji}
                  </div>
                  
                  <div>
                    <h4 style={{ 
                      fontFamily: 'Playfair Display, serif', 
                      fontSize: '1.2rem', 
                      fontWeight: 800, 
                      color: 'var(--rich-brown)', 
                      marginBottom: '0.4rem',
                      lineHeight: 1.2
                    }}>{ing.name}</h4>
                    <p style={{ 
                      fontFamily: 'Lato, sans-serif',
                      fontSize: '0.75rem',
                      fontWeight: 900,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--terracotta)'
                    }}>{ing.source}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Advanced Quote Block */}
            <div className="reveal" style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{
                display: 'inline-block', 
                padding: '3rem 4rem',
                background: 'linear-gradient(145deg, var(--forest-green), var(--forest-dark))', 
                borderRadius: '24px',
                position: 'relative',
                boxShadow: '0 20px 40px rgba(45,90,39,0.25)',
                overflow: 'hidden'
              }}>
                {/* Huge quote mark background */}
                <div style={{ position: 'absolute', top: '-20px', left: '20px', fontSize: '10rem', color: 'rgba(255,255,255,0.05)', fontFamily: 'Playfair Display, serif', lineHeight: 1, pointerEvents: 'none' }}>"</div>
                
                <p style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                  fontWeight: 700, fontStyle: 'italic',
                  color: 'var(--ivory)',
                  position: 'relative',
                  zIndex: 1,
                  lineHeight: 1.4
                }}>
                  No artificial colors. No preservatives. No shortcuts. <span style={{ color: 'var(--turmeric)' }}>Ever.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ CINEMATIC PROCESS FLOW ════════════════════════════════ */}
        <section id="process-section" className="section-pad-xl" style={{ background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
          <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '6rem' }} className="reveal">
              <span className="eyebrow" style={{ color: 'var(--forest-green)', letterSpacing: '0.4em' }}>The Ancient Craft</span>
              <h2 className="display-xl" style={{ color: 'var(--rich-brown)', marginTop: '0.5rem' }}>
                Made The Old Way.<br /><em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>Always.</em>
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
              {[
                { 
                  step: '01', title: 'SOURCING', subtitle: 'The foundation of flavor',
                  text: 'We travel across Andhra Pradesh to hand-pick the finest raw ingredients. From fiery Guntur chilies to raw, tangy mangoes, we only select produce at its peak freshness. We believe that a pickle is only as good as the earth it comes from.',
                  img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop'
                },
                { 
                  step: '02', title: 'PREPARING', subtitle: 'The rhythmic stone grinding',
                  text: 'We never use pre-mixed powders. Every morning, our spices are stone-ground in small batches to release their natural essential oils. The rhythmic sound of the mortar and pestle is the heartbeat of our kitchen, ensuring unparalleled aroma.',
                  img: '/images/Washing_Prep.png'
                },
                { 
                  step: '03', title: 'SUN DRYING', subtitle: 'Patience under the sun',
                  text: 'There are no shortcuts to authentic flavor. Our ingredients are marinated in cold-pressed sesame oil and left to sun-dry naturally for 5 to 7 days on traditional terracotta terraces. The sun naturally preserves and deepens the complex flavors.',
                  img: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=1200&auto=format&fit=crop'
                },
                { 
                  step: '04', title: 'JARRING', subtitle: 'Sealed with love',
                  text: 'The final masterpiece is hand-packed into sterilized glass jars, preserving the purity and integrity of the pickle. Each jar is sealed tightly, holding within it three generations of culinary heritage, ready to be delivered to your table.',
                  img: '/images/Hand-packing.png'
                },
              ].map((item, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div key={item.step} className="reveal process-flow-row" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6rem',
                    flexDirection: isEven ? 'row' : 'row-reverse'
                  }}>
                    {/* Image Side */}
                    <div style={{ flex: '1.2', position: 'relative' }}>
                      <div style={{ 
                        position: 'relative', 
                        width: '100%', 
                        paddingBottom: '80%', 
                        borderRadius: '24px', 
                        overflow: 'hidden',
                        boxShadow: '0 30px 60px rgba(61,31,10,0.15)'
                      }}>
                        <img src={item.img} alt={item.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(61,31,10,0.4), transparent)', pointerEvents: 'none' }} />
                      </div>
                      
                      {/* Floating Step Number */}
                      <div style={{
                        position: 'absolute',
                        top: '-30px',
                        [isEven ? 'left' : 'right']: '-30px',
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '8rem',
                        fontWeight: 900,
                        color: 'var(--terracotta)',
                        opacity: 0.8,
                        lineHeight: 1,
                        textShadow: '0 10px 20px rgba(196,96,58,0.3)',
                        zIndex: 2,
                        pointerEvents: 'none'
                      }}>
                        {item.step}
                      </div>
                    </div>

                    {/* Text Side */}
                    <div style={{ flex: '1' }}>
                      <span style={{ 
                        fontFamily: 'Lato, sans-serif', 
                        fontSize: '0.85rem', 
                        fontWeight: 900, 
                        letterSpacing: '0.25em', 
                        color: 'var(--terracotta)',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '1rem'
                      }}>
                        Step {item.step}
                      </span>
                      <h3 style={{ 
                        fontFamily: 'Playfair Display, serif', 
                        fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', 
                        fontWeight: 900, 
                        color: 'var(--rich-brown)', 
                        lineHeight: 1.1,
                        marginBottom: '0.5rem'
                      }}>
                        {item.title}
                      </h3>
                      <h4 style={{ 
                        fontFamily: 'Playfair Display, serif', 
                        fontSize: '1.4rem', 
                        fontStyle: 'italic',
                        color: 'var(--forest-green)', 
                        marginBottom: '2rem'
                      }}>
                        {item.subtitle}
                      </h4>
                      <p style={{ 
                        fontFamily: 'Lato, sans-serif', 
                        fontSize: '1.1rem', 
                        lineHeight: 1.8, 
                        color: 'var(--aged-wood)',
                        marginBottom: '2.5rem'
                      }}>
                        {item.text}
                      </p>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ height: '1px', width: '60px', background: 'var(--turmeric)' }} />
                        <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.15em', color: 'var(--turmeric)', textTransform: 'uppercase' }}>Authentic Method</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: '8rem' }} className="reveal">
              <Link href="/how-we-make-it" className="btn btn-terra" style={{ padding: '1.25rem 3.5rem', fontSize: '0.95rem' }}>View The Detailed Process <ArrowRight size={18} /></Link>
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ═══════════════════════════ */}
        <section id="testimonials" className="section-pad-xl" style={{ background: '#f8f0e2' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }} className="reveal">
              <span className="eyebrow">Community Love</span>
              <h2 className="display-lg" style={{ color: 'var(--forest-green)' }}>
                What Our<br /><em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>Pickle Lovers Say</em>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.75rem' }}>
              {testimonials.map((t, i) => (
                <div key={t.author} id={`testi-${i}`} className="testimonial-card reveal" style={{ animationDelay: `${i * 0.12}s` }}>
                  <div className="big-quote">"</div>
                  <div className="stars" style={{ marginBottom: '0.85rem', marginTop: '2rem' }}>★★★★★</div>
                  <p className="body-lg" style={{ color: 'var(--rich-brown)', marginBottom: '1.5rem' }}>"{t.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(139,94,60,0.1)' }}>
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--terracotta), var(--forest-green))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: '1rem', color: 'var(--ivory)',
                    }}>{t.author[0]}</div>
                    <div>
                      <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 900, fontSize: '0.9rem', color: 'var(--forest-green)' }}>{t.author}</div>
                      <div className="label" style={{ color: 'var(--aged-wood)', fontSize: '0.72rem' }}>{t.city}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ GREEN CTA BANNER ════════════════════════ */}
        <section style={{ background: 'var(--forest-green)', padding: '5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(232,168,32,0.08), transparent)' }} />
          <div className="container-sm reveal" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏺</div>
            <h2 className="display-md" style={{ color: 'var(--ivory)', marginBottom: '0.75rem' }}>
              Over <span style={{ color: 'var(--turmeric)' }}>50,000</span> Happy Families
            </h2>
            <p className="body-xl" style={{ color: 'rgba(250,240,220,0.72)', marginBottom: '2.25rem' }}>
              Free delivery on orders above ₹499 · Pan India Shipping · 100% Satisfaction Guaranteed
            </p>
            <Link href="/products" id="cta-order-btn" className="btn btn-gold" style={{ fontSize: '0.88rem', padding: '1rem 2.5rem' }}>
              Order Your Jar Today <ShoppingCart size={17} />
            </Link>
          </div>
        </section>

        {/* ══ RECIPES ════════════════════════════════ */}
        <section id="recipes" className="section-pad-xl" style={{ background: 'var(--cream)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '3.5rem' }} className="recipes-header">
              <div className="reveal">
                <span className="eyebrow">In The Kitchen</span>
                <h2 className="display-lg" style={{ color: 'var(--forest-green)' }}>Cook With Our<br /><em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>Pickles</em></h2>
              </div>
              <p className="body-xl reveal" style={{ color: 'var(--aged-wood)' }}>
                Grandmother's pickles aren't just condiments — they're the hero ingredient that transforms simple meals into celebrations.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.75rem' }}>
              {recipes.map((r, i) => (
                <Link key={r.id} href="/recipes" id={`recipe-${r.id}`} style={{ textDecoration: 'none', display: 'flex' }}>
                  <div className="reveal" style={{
                    borderRadius: '16px', background: '#fff',
                    border: '1px solid rgba(139,94,60,0.1)',
                    overflow: 'hidden', cursor: 'pointer',
                    transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease',
                    animationDelay: `${i * 0.12}s`,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(61,31,10,0.13)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{ height: '180px', flexShrink: 0, background: `linear-gradient(135deg, ${r.color}20, ${r.color}50)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', position: 'relative' }}>
                      {r.emoji}
                      <div style={{ position: 'absolute', bottom: '10px', right: '12px', fontFamily: 'Lato, sans-serif', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', color: r.color, background: 'rgba(255,255,255,0.9)', padding: '0.25rem 0.6rem', borderRadius: '4px' }}>⏱ {r.time}</div>
                    </div>
                    <div style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--rich-brown)', marginBottom: '0.4rem' }}>{r.name}</h3>
                      <p className="body-md" style={{ color: 'var(--aged-wood)', marginBottom: '1.5rem', flexGrow: 1 }}>{r.desc}</p>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'Lato, sans-serif', fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--terracotta)' }}>
                        View Recipe <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>


      </main>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .hero-grid       { grid-template-columns: 1fr !important; }
          .split-grid      { grid-template-columns: 1fr !important; }
          .recipes-header  { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .heritage-img-wrapper { transform: none !important; margin-bottom: -2rem; padding-bottom: 75% !important; }
          .heritage-text-card { transform: none !important; margin: 0 1rem; }
          .process-flow-row { flexDirection: column !important; gap: 4rem !important; }
        }

      `}</style>
    </>
  );
}
