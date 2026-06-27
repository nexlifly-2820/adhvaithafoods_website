'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const steps = [
  { num: '01', title: 'Sourcing the Best', subtitle: 'Direct from farms', desc: 'Every batch starts with a personal visit to our partner farms in Andhra Pradesh. We handpick only ripe mangoes with the right tartness, choose red chilies at peak heat, and select fresh gongura leaves grown without pesticides. If an ingredient doesn\'t meet our standard, it doesn\'t enter our kitchen. Period.', detail: 'Raw mangoes from Guntur · Gongura from Kurnool', emoji: '🌳', color: '#2D5A27', id: 'step-sourcing', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1600&auto=format&fit=crop' },
  { num: '02', title: 'Stone-Grinding', subtitle: 'Every morning, by hand', desc: 'At dawn, the grinding stones come to life. Mustard seeds, fenugreek, red chilies — all ground fresh that morning. We never use pre-mixed spice powders or factory blends. The stone-ground spices have a different texture, a different smell, a different soul. This step takes hours and cannot be rushed.', detail: 'Traditional granite grinders · Fresh-ground daily', emoji: '🪨', color: '#8B5E3C', id: 'step-grinding', img: '/images/Stone_Grind.png' },
  { num: '03', title: 'Washing & Prep', subtitle: 'Care in every cut', desc: 'Ingredients are washed in fresh water, dried completely in shade, then cut to the exact size that allows proper marination. Mangoes are cut into cubes with skin on. Chilies are kept whole or slit. Each cut is intentional — it affects how the spices penetrate and how long the pickle keeps.', detail: 'Hand-cut · Shade-dried · Precision preparation', emoji: '🔪', color: '#C4603A', id: 'step-preparing', img: '/images/Washing_Prep.png' },
  { num: '04', title: 'Sun Drying', subtitle: '5–7 days of natural preservation', desc: 'Prepared ingredients are spread on clean cotton cloth on rooftop terraces and sun-dried for 5 to 7 days. This removes excess moisture, intensifies flavor, and enables natural preservation without chemicals. We monitor weather daily. On cloudy days, we wait. We never rush this step.', detail: 'Terrace-dried · 5–7 days · Weather-monitored', emoji: '☀️', color: '#E8A820', id: 'step-drying', img: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=1600&auto=format&fit=crop' },
  { num: '05', title: 'Mixing', subtitle: 'The secret moment', desc: 'Sun-dried ingredients meet stone-ground spices and cold-pressed sesame oil in large clay or stainless steel vessels. The mixing is done by hand with food-grade gloves — you can feel the oil coat every piece evenly. The mixture then rests for 24–48 hours, allowing flavors to deepen and meld.', detail: 'Cold-pressed sesame oil · Hand-mixed', emoji: '🫙', color: '#2D5A27', id: 'step-mixing', img: '/images/Mixing.png' },
  { num: '06', title: 'Hand-Packing', subtitle: 'Sealed with love', desc: 'Pickles are hand-packed into clean, sterilized glass jars. Each jar is filled to exact weight, checked for air pockets, and sealed with a fresh lid. A kraft label is tied by hand. Then each jar undergoes a final quality check — taste, color, oil level, aroma — before it\'s approved to ship.', detail: 'Sterilized glass jars · Handcrafted labels', emoji: '📦', color: '#C4603A', id: 'step-packing', img: '/images/Hand-packing.png' },
];

export default function HowWeMakeItPage() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Calculate scroll progress for the Spice Route line
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the container has been scrolled through
      // 0 means top of container is at the bottom of the viewport
      // 1 means bottom of container is at the top of the viewport
      const totalScrollDistance = rect.height + windowHeight;
      const currentScroll = windowHeight - rect.top;
      
      let progress = currentScroll / totalScrollDistance;
      // Clamp between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <main>

        {/* Cinematic Hero */}
        <section id="process-hero" style={{
          position: 'relative',
          minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {/* Background Image */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,10,3,0.9), rgba(26,10,3,1))' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 2rem' }} className="reveal">
            <span style={{ 
              fontFamily: 'Lato, sans-serif', fontSize: '0.85rem', fontWeight: 900, 
              letterSpacing: '0.4em', color: 'var(--turmeric)', display: 'block', marginBottom: '1.5rem',
              textTransform: 'uppercase'
            }}>
              The Art of Pickle Making
            </span>
            <h1 style={{ 
              fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3.5rem, 8vw, 6rem)', 
              fontWeight: 900, color: 'var(--ivory)', marginBottom: '1.5rem', lineHeight: 1 
            }}>
              Made The Old Way.<br />
              <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>Always.</em>
            </h1>
            <p style={{ 
              fontFamily: 'Lato, sans-serif', fontSize: '1.2rem', color: 'rgba(250,240,220,0.8)', 
              maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 
            }}>
              Six meticulous steps. No shortcuts. No machines where hands work better. This is our promise to you.
            </p>
          </div>
          
        </section>

        {/* ULTRA-ADVANCED STICKY STACKING SECTION */}
        <div ref={containerRef} style={{ background: 'var(--cream)', padding: '10vh 0', position: 'relative' }}>
          
          {/* The Spice Route Scroll Trail */}
          <div style={{ 
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: '4px', height: '100%', background: 'rgba(196,96,58,0.1)', zIndex: 0,
            borderRadius: '4px'
          }}>
            <div style={{ 
              width: '100%', height: `${scrollProgress * 100}%`, 
              background: 'linear-gradient(to bottom, var(--turmeric), var(--terracotta))',
              boxShadow: '0 0 20px var(--terracotta)',
              borderRadius: '4px',
              transition: 'height 0.1s ease-out'
            }} />
          </div>

          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 2rem' }}>
            {steps.map((step, i) => {
              // Exact design from the micha.asia video: full bright colors, alternating rotations
              const bgColors = ['#F6F2DF', '#8B55D5', '#6CB83A', '#F3D966', '#E96847', '#4CB0D8'];
              const textColors = ['#1C402C', '#FFFFFF', '#1C402C', '#1C402C', '#FFFFFF', '#FFFFFF'];
              const rotations = [-1.5, 1.5, -2, 2, -1.5, 1.5];
              
              // Calculate sticky top offset
              const topOffset = `calc(5vh + ${i * 15}px)`;
              
              return (
                <div key={step.id} style={{ 
                  position: 'sticky', 
                  top: topOffset, 
                  marginBottom: '20vh', // Huge spacing to allow scrolling
                  height: '80vh', // Massive card height
                  width: '100%',
                  zIndex: i + 1 // Ensure proper stacking
                }}>
                  {/* The Card Itself - Video Style */}
                  <div className="sticky-card" style={{ 
                    width: '100%', height: '100%',
                    background: bgColors[i % bgColors.length],
                    borderRadius: '40px', // Large rounded corners like video
                    boxShadow: '0 -15px 40px rgba(0,0,0,0.2)', // Shadow for overlapping effect
                    display: 'flex', overflow: 'hidden',
                    transform: `rotate(${rotations[i % rotations.length]}deg)`, // Alternating rotations
                  }}>
                    
                    {/* Image Half */}
                    <div style={{ flex: '1', position: 'relative', overflow: 'hidden', padding: '2rem' }}>
                      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '24px', overflow: 'hidden' }}>
                        <img src={step.img} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)' }} />
                      </div>
                      
                      <div style={{ 
                        position: 'absolute', bottom: '0', left: '0',
                        fontFamily: '"Arial Black", system-ui, sans-serif', fontSize: '25vw', fontWeight: 900,
                        color: 'rgba(255,255,255,0.2)', lineHeight: 0.8, pointerEvents: 'none',
                        mixBlendMode: 'overlay'
                      }}>
                        {step.num}
                      </div>
                    </div>

                    {/* Text Half */}
                    <div style={{ flex: '1.2', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 3rem 2rem 1rem' }}>
                      
                      {/* Compact Step Indicator */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '2rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>{step.emoji}</span>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.2em', color: textColors[i % textColors.length], textTransform: 'uppercase' }}>Step {step.num}</span>
                          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontStyle: 'italic', color: textColors[i % textColors.length], opacity: 0.9 }}>{step.subtitle}</span>
                        </div>
                      </div>

                      <h2 style={{ 
                        fontFamily: '"Arial Black", system-ui, sans-serif', 
                        fontSize: 'clamp(2.5rem, 4vw, 4rem)', // Reduced massive size to fit inside the card
                        fontWeight: 900, 
                        color: '#111111', 
                        WebkitTextStroke: '2px #ffffff', // Slightly thinner stroke to match smaller text
                        filter: 'drop-shadow(4px 4px 0px #111111)', // Reduced shadow size
                        textTransform: 'uppercase',
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                        marginBottom: '1.5rem',
                        transform: 'rotate(-2deg)'
                      }}>
                        {step.title}
                      </h2>

                      <p style={{ 
                        fontFamily: 'system-ui, sans-serif', 
                        fontSize: '1.1rem', // Reduced from 1.5rem
                        color: textColors[i % textColors.length] === '#FFFFFF' ? '#FFFFFF' : '#111111', 
                        lineHeight: 1.6, 
                        marginBottom: '1.5rem',
                        fontWeight: 600, // Slightly less bold
                        maxWidth: '95%'
                      }}>
                        {step.desc}
                      </p>

                      <div style={{ 
                        fontFamily: 'system-ui, sans-serif', 
                        fontSize: '0.9rem', // Reduced from 1.2rem
                        fontWeight: 900, 
                        color: textColors[i % textColors.length] === '#FFFFFF' ? 'rgba(255,255,255,0.9)' : '#111111', 
                        letterSpacing: '0.02em',
                        textTransform: 'uppercase'
                      }}>
                        ✦ {step.detail}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quality Promise - Advanced Design */}
        <section style={{ background: 'var(--forest-green)', padding: '10rem 2rem', position: 'relative', overflow: 'hidden', zIndex: 2 }}>
          <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', background: 'var(--turmeric)', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.1 }} />
          
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: '6rem' }} className="reveal">
              <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(250,240,220,0.5)' }}>Our Commitment</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 900, color: 'var(--ivory)', marginTop: '1rem' }}>The Avdaitha Standard</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {[
                { emoji: '🌿', title: '100% Natural', text: 'No artificial flavors, colors, or cheap fillers. Just pure ingredients from the earth.' },
                { emoji: '🚫', title: 'Zero Preservatives', text: 'Preserved naturally using salt, oil, and sun-drying, exactly how our ancestors did it.' },
                { emoji: '🫙', title: 'Glass Only', text: 'Packed in sterilized glass jars to maintain purity and prevent plastic leaching.' },
              ].map((item, i) => (
                <div key={i} className="reveal magnetic" style={{ 
                  background: 'rgba(250,240,220,0.05)', backdropFilter: 'blur(10px)', 
                  border: '1px solid rgba(250,240,220,0.1)', borderRadius: '24px', 
                  padding: '4rem 2.5rem', textAlign: 'center', animationDelay: `${i * 0.15}s`,
                  transition: 'transform 0.4s ease, background 0.4s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(250,240,220,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(250,240,220,0.05)'}
                >
                  <div style={{ fontSize: '4rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))' }}>{item.emoji}</div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 700, color: 'var(--ivory)', marginBottom: '1rem' }}>{item.title}</h3>
                  <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.05rem', color: 'rgba(250,240,220,0.7)', lineHeight: 1.6 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--terracotta)', padding: '10rem 2rem', textAlign: 'center', zIndex: 2, position: 'relative' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }} className="reveal">
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 900, color: 'var(--ivory)', marginBottom: '1.5rem' }}>
              Taste The Heritage
            </h2>
            <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.25rem', color: 'rgba(250,240,220,0.9)', marginBottom: '3rem', lineHeight: 1.7 }}>
              Every jar of Avdaitha Foods is a labor of love, crafted over weeks to bring you the authentic taste of an Indian grandmother's kitchen.
            </p>
            <Link href="/products" className="btn btn-outline-cream magnetic" style={{ fontSize: '1.1rem', padding: '1.25rem 4rem', border: '2px solid var(--ivory)', background: 'var(--ivory)', color: 'var(--terracotta)' }}>
              Shop Our Pickles →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 900px) {
          .sticky-card { flexDirection: column !important; height: auto !important; }
          .sticky-card > div { width: 100% !important; flex: none !important; }
          .sticky-card > div:first-child { min-height: 300px; }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </>
  );
}
