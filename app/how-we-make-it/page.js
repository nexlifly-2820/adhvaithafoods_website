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
  const [activeStandardTab, setActiveStandardTab] = useState(0);

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

        {/* FUNKY BRUTALIST HERO (Replaces Cinematic Hero) */}
        <section id="process-hero" style={{
          position: 'relative',
          minHeight: '70vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#FBC835', /* Solid Bright Yellow */
          padding: '8rem 2rem 6rem 2rem',
          overflow: 'hidden',
          zIndex: 2
        }}>
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '1100px' }} className="reveal">
            
            <span className="process-hero-subtitle" style={{
              fontFamily: '"Arial Black", system-ui, sans-serif', 
              fontSize: 'clamp(1rem, 2vw, 1.25rem)', 
              fontWeight: 900,
              letterSpacing: '0.05em', 
              color: '#111111', 
              display: 'block', 
              marginBottom: '1.5rem',
              textTransform: 'uppercase'
            }}>
              The Art of Pickle Making
            </span>
            
            <h1 className="process-hero-h1" style={{
              fontFamily: '"Arial Black", "Inter", sans-serif', 
              fontSize: 'clamp(4rem, 10vw, 8rem)',
              fontWeight: 900, 
              color: '#111111', 
              marginBottom: '1rem', 
              lineHeight: 0.85,
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              wordBreak: 'break-word'
            }}>
              MADE THE OLD WAY.<br className="hide-on-mobile" />ALWAYS.
            </h1>
            
            <p className="process-hero-p" style={{
              fontFamily: '"Arial Black", "Inter", sans-serif',
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', 
              color: '#111111', 
              maxWidth: '800px', 
              margin: '2rem auto 0 auto',
              lineHeight: 1.2,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em'
            }}>
              Six meticulous steps. No shortcuts. No machines.<br className="hide-on-mobile" /> Just hands, time, and tradition.
            </p>
          </div>
          
          {/* Decorative Elements */}
          <div className="process-badge-1" style={{ position: 'absolute', bottom: '40px', left: '40px', width: '120px', height: '120px', zIndex: 0 }}></div>
        </section>

        {/* ULTRA-ADVANCED STICKY STACKING SECTION */}
        <div ref={containerRef} style={{ background: 'var(--cream)', padding: '10vh 0', position: 'relative' }}>

          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 2rem' }}>
            {steps.map((step, i) => {
              // Exact design from the micha.asia video: full bright colors, alternating rotations
              const bgColors = ['#F6F2DF', '#8B55D5', '#6CB83A', '#F3D966', '#E96847', '#4CB0D8'];
              const textColors = ['#1C402C', '#FFFFFF', '#1C402C', '#1C402C', '#FFFFFF', '#FFFFFF'];
              const rotations = [-1.5, 1.5, -2, 2, -1.5, 1.5];
              
              // Organic, wavy shapes using asymmetric border-radius for a funky, natural look
              // Using 'vw' units ensures the shape remains perfectly bubbly and proportional on mobile!
              const organicShapes = [
                '20vw 5vw 18vw 5vw / 5vw 18vw 5vw 20vw',
                '5vw 20vw 5vw 18vw / 20vw 5vw 18vw 5vw',
                '16vw 6vw 20vw 4vw / 6vw 17vw 4vw 20vw',
                '6vw 16vw 4vw 20vw / 17vw 6vw 20vw 4vw',
                '20vw 4vw 16vw 7vw / 4vw 20vw 7vw 16vw',
                '4vw 20vw 7vw 16vw / 20vw 4vw 16vw 7vw'
              ];

              // Inverse shapes for the image container to create contrast
              const imgShapes = [
                '6vw 16vw 4vw 20vw / 17vw 6vw 20vw 4vw',
                '20vw 4vw 16vw 7vw / 4vw 20vw 7vw 16vw',
                '4vw 20vw 7vw 16vw / 20vw 4vw 16vw 7vw',
                '20vw 5vw 18vw 5vw / 5vw 18vw 5vw 20vw',
                '5vw 20vw 5vw 18vw / 20vw 5vw 18vw 5vw',
                '16vw 6vw 20vw 4vw / 6vw 17vw 4vw 20vw'
              ];

              // Calculate sticky top offset
              const topOffset = `calc(5vh + ${i * 15}px)`;

              return (
                <div className="process-sticky-wrapper" key={step.id} style={{
                  position: 'sticky',
                  top: topOffset,
                  marginBottom: '15vh', // Spacing to allow scrolling
                  height: '60vh', // Reduced from 80vh for better laptop view
                  width: '100%',
                  zIndex: i + 1 // Ensure proper stacking
                }}>
                  {/* The Card Itself - Video Style */}
                  <div className="sticky-card" style={{
                    width: '100%', height: '100%',
                    background: bgColors[i % bgColors.length],
                    borderRadius: organicShapes[i % organicShapes.length], // Funky, wavy shape
                    boxShadow: '0 -15px 40px rgba(0,0,0,0.2)', // Shadow for overlapping effect
                    display: 'flex', overflow: 'hidden',
                    transform: `rotate(${rotations[i % rotations.length]}deg)`, // Alternating rotations
                  }}>

                    {/* Image Half */}
                    <div className="step-card-img-container" style={{ flex: '1', position: 'relative', overflow: 'hidden', padding: '2rem' }}>
                      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: imgShapes[i % imgShapes.length], overflow: 'hidden' }}>
                        <img src={step.img} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)' }} />
                      </div>

                      <div className="step-card-num" style={{
                        position: 'absolute', bottom: '0', left: '0',
                        fontFamily: '"Arial Black", system-ui, sans-serif', fontSize: '25vw', fontWeight: 900,
                        color: 'rgba(255,255,255,0.2)', lineHeight: 0.8, pointerEvents: 'none',
                        mixBlendMode: 'overlay'
                      }}>
                        {step.num}
                      </div>
                    </div>

                    {/* Text Half */}
                    <div className="step-card-text-container" style={{ flex: '1.2', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 3rem 2rem 1rem' }}>

                      {/* Compact Step Indicator */}
                      <div className="step-card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '2rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>{step.emoji}</span>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.2em', color: textColors[i % textColors.length], textTransform: 'uppercase' }}>Step {step.num}</span>
                          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontStyle: 'italic', color: textColors[i % textColors.length], opacity: 0.9 }}>{step.subtitle}</span>
                        </div>
                      </div>

                      <h2 className="step-card-h2" style={{
                        fontFamily: '"Arial Black", system-ui, sans-serif',
                        fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', // Noticeably reduced to fit inside smaller card
                        fontWeight: 900,
                        color: '#111111',
                        WebkitTextStroke: '1px #ffffff', // Thinner stroke
                        filter: 'drop-shadow(3px 3px 0px #111111)', // Smaller shadow
                        textTransform: 'uppercase',
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                        marginBottom: '1.25rem',
                        transform: 'rotate(-2deg)',
                        wordBreak: 'break-word'
                      }}>
                        {step.title}
                      </h2>

                      <p className="step-card-p" style={{
                        fontFamily: 'system-ui, sans-serif',
                        fontSize: '0.95rem', // Reduced from 1.1rem
                        color: textColors[i % textColors.length] === '#FFFFFF' ? '#FFFFFF' : '#111111',
                        lineHeight: 1.5,
                        marginBottom: '1rem',
                        fontWeight: 600, 
                        maxWidth: '100%'
                      }}>
                        {step.desc}
                      </p>

                      <div className="step-card-detail" style={{
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
        <section style={{ background: 'var(--cream)', padding: '8rem 2rem', position: 'relative', overflow: 'hidden', zIndex: 2 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

            {/* Minimalist Header */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="reveal">
              <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--forest-green)' }}>Our Commitment</span>
              <h2 style={{ fontFamily: '"Arial Black", system-ui, sans-serif', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 900, color: '#111111', marginTop: '0.5rem', textTransform: 'uppercase' }}>The Adhvaitha Standard</h2>
            </div>

            {/* Interactive Vertical Tab Component */}
            <div className="reveal" style={{ display: 'flex', gap: '1rem', height: '550px', maxWidth: '1200px', margin: '0 auto' }}>

              {/* Left Side: Tabs */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[
                  { title: '100% NATURAL', color: '#FBC835' },
                  { title: 'ZERO PRESERVATIVES', color: '#47B8E6' },
                  { title: 'GLASS JARS ONLY', color: '#C4B4E3' }
                ].map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStandardTab(i)}
                    style={{
                      width: '70px',
                      height: '100%',
                      backgroundColor: tab.color,
                      border: '2px solid #111111',
                      borderRadius: '40px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      opacity: activeStandardTab === i ? 1 : 0.6,
                      boxShadow: activeStandardTab === i ? '4px 4px 0px rgba(0,0,0,1)' : 'none'
                    }}
                  >
                    <span style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                      fontFamily: '"Arial Black", system-ui, sans-serif',
                      fontWeight: 900,
                      fontSize: '1.2rem',
                      color: '#111111',
                      whiteSpace: 'nowrap',
                      letterSpacing: '0.05em'
                    }}>
                      {tab.title}
                    </span>
                  </button>
                ))}
              </div>

              {/* Right Side: Main Card */}
              {(() => {
                const tabsData = [
                  {
                    subtitle: 'THE ADHVAITHA STANDARD',
                    heading: '100% PURE & NATURAL',
                    desc: 'No artificial flavors, colors, or cheap fillers. Just pure ingredients from the earth, handpicked at their peak freshness to deliver authentic taste.',
                    img: '/images/story_ingredients_1782482838849.png',
                    color: '#FBC835'
                  },
                  {
                    subtitle: 'TRADITIONAL METHOD',
                    heading: 'ZERO CHEMICALS',
                    desc: 'Preserved naturally using salt, cold-pressed sesame oil, and sun-drying. Exactly how our ancestors did it centuries ago.',
                    img: '/images/tab2_generated.jpg',
                    color: '#47B8E6'
                  },
                  {
                    subtitle: 'SAFE PACKAGING',
                    heading: 'PACKED IN GLASS ONLY',
                    desc: 'Packed in sterilized glass jars to maintain absolute purity, preserve authentic flavor, and completely prevent plastic chemical leaching.',
                    img: '/images/tab3_generated.jpg',
                    color: '#C4B4E3'
                  }
                ];
                const activeData = tabsData[activeStandardTab];

                return (
                  <div style={{
                    flex: 1,
                    backgroundColor: activeData.color,
                    border: '2px solid #111111',
                    borderRadius: '32px',
                    padding: '1.5rem',
                    display: 'flex',
                    gap: '3rem',
                    alignItems: 'center',
                    transition: 'background-color 0.4s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Image inside card */}
                    <div style={{
                      width: '45%',
                      height: '100%',
                      borderRadius: '24px',
                      border: '2px solid #111111',
                      overflow: 'hidden',
                      position: 'relative',
                      backgroundColor: '#fff'
                    }}>
                      <img src={activeData.img} alt={activeData.heading} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* Content inside card */}
                    <div style={{ flex: 1, paddingRight: '2rem', color: '#111111' }}>
                      <p style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 900, fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
                        {activeData.subtitle}
                      </p>
                      <h3 style={{ fontFamily: '"Arial Black", system-ui, sans-serif', fontWeight: 900, fontSize: '3rem', lineHeight: 1.1, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                        {activeData.heading}
                      </h3>
                      <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '1.1rem', lineHeight: 1.5, marginBottom: '2rem', fontWeight: 500, maxWidth: '90%' }}>
                        {activeData.desc}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>

          </div>
        </section>

        {/* FUNKY BRUTALIST CTA (Replaces Taste The Heritage) */}
        <section style={{ backgroundColor: '#FF4E00', paddingTop: '8rem', paddingBottom: '0', position: 'relative', overflow: 'hidden', zIndex: 2 }}>
          
          <div style={{ maxWidth: '1050px', margin: '0 auto', position: 'relative' }} className="reveal">
            
            {/* Black Cartoon Clouds Behind Card */}
            <div style={{ position: 'absolute', top: '-100px', left: '-5%', width: '110%', height: '180px', zIndex: 0 }}>
              <svg viewBox="0 0 1200 150" fill="#221F1F" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                <path d="M0 150 L0 80 Q 80 -10 180 60 Q 300 -30 450 40 Q 600 -40 750 30 Q 900 -30 1050 50 Q 1150 0 1200 80 L1200 150 Z" />
              </svg>
            </div>

            {/* Main Purple Card */}
            <div style={{ 
              backgroundColor: '#C5B4E3', 
              padding: '6rem 2rem 5rem 2rem', 
              position: 'relative', 
              zIndex: 1, 
              textAlign: 'center',
              borderTopLeftRadius: '32px',
              borderTopRightRadius: '32px',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              
              {/* Yellow Starburst Badge */}
              <div style={{ position: 'absolute', top: '-40px', left: '-20px', zIndex: 10, width: '140px', height: '140px' }}>
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                  <path d="M50 0 L61 28 L90 20 L75 46 L100 66 L71 72 L73 100 L50 82 L27 100 L29 72 L0 66 L25 46 L10 20 L39 28 Z" fill="#FDD000" />
                  <text x="50" y="45" fontFamily='"Arial Black", sans-serif' fontSize="11" fontWeight="900" textAnchor="middle" fill="#111" transform="rotate(-15 50 50)">SINCE</text>
                  <text x="50" y="58" fontFamily='"Arial Black", sans-serif' fontSize="13" fontWeight="900" textAnchor="middle" fill="#111" transform="rotate(-15 50 50)">1970</text>
                </svg>
              </div>

              {/* Maroon Circle Badge */}
              <div style={{ position: 'absolute', top: '-40px', right: '-10px', zIndex: 10, width: '130px', height: '130px', background: '#752c4b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <svg viewBox="0 0 100 100" style={{ position: 'absolute', width: '100%', height: '100%' }}>
                  <path id="curve" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="transparent" />
                  <text width="100">
                    <textPath href="#curve" startOffset="0" fill="#FFF" fontSize="10.5" fontFamily="system-ui, sans-serif" fontWeight="bold" letterSpacing="2">
                      • 100% AUTHENTIC • ADHVAITHA
                    </textPath>
                  </text>
                </svg>
                <span style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '2.5rem', fontWeight: 900, lineHeight: 1 }}>AF</span>
              </div>

              {/* Content */}
              <h2 className="process-cta-h2" style={{ 
                fontFamily: '"Arial Black", "Inter", sans-serif', 
                fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', 
                fontWeight: 900, 
                color: '#221F1F', 
                marginBottom: '1rem', 
                lineHeight: 0.9, 
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                maxWidth: '900px',
                wordBreak: 'break-word'
              }}>
                TASTE THE<br className="hide-on-mobile" />HERITAGE
              </h2>
              
              <p className="process-cta-p" style={{ 
                fontFamily: 'system-ui, -apple-system, sans-serif', 
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', 
                color: '#333333', 
                marginBottom: '3rem', 
                lineHeight: 1.5,
                fontWeight: 500,
                maxWidth: '650px'
              }}>
                Every jar of Adhvaitha Foods is a labor of love, crafted over weeks to bring you the authentic taste of an Indian grandmother's kitchen.
              </p>

              <Link href="/products" style={{
                display: 'inline-block',
                backgroundColor: '#221F1F',
                color: '#FFFFFF',
                fontFamily: '"Arial Black", system-ui, sans-serif',
                fontWeight: 900,
                fontSize: '1.2rem',
                padding: '1.2rem 3.5rem',
                borderRadius: '50px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'transform 0.2s ease, background 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.backgroundColor = '#000'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = '#221F1F'; }}
              >
                Shop Our Pickles
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 900px) {
          .process-sticky-wrapper {
            height: 40vh !important; /* Miniature landscape height */
            min-height: 250px !important;
            margin-bottom: 10vh !important;
          }
          .sticky-card { 
            flexDirection: row !important; /* Force side-by-side exactly like laptop */
            height: 100% !important;
          }
          .sticky-card > div { 
            width: 50% !important; 
            flex: 1 !important; 
          }
          .sticky-card > div:first-child { 
            min-height: auto !important; 
            height: 100% !important;
          }
          
          #process-hero {
            padding-top: 150px !important;
            padding-bottom: 3rem !important;
          }
          .process-hero-h1 {
            font-size: 3rem !important;
            line-height: 1 !important;
          }
          .process-hero-subtitle {
            font-size: 0.9rem !important;
            margin-bottom: 1rem !important;
          }
          .process-hero-p {
            font-size: 1.1rem !important;
          }
          .process-badge-1 {
            display: none !important;
          }
          .hide-on-mobile {
            display: none !important;
          }
          
          .process-cta-h2 {
            font-size: 2.5rem !important;
            line-height: 1 !important;
          }
          .process-cta-p {
            font-size: 1.05rem !important;
          }

          /* Sticky Card Overrides - Miniature Text for Side-by-Side */
          .step-card-img-container {
            padding: 0.5rem !important;
          }
          .step-card-text-container {
            padding: 1rem 0.5rem 1rem 0rem !important;
          }
          .step-card-num {
            font-size: 20vw !important;
          }
          .step-card-h2 {
            font-size: 1.1rem !important;
            margin-bottom: 0.5rem !important;
            line-height: 1 !important;
            -webkit-text-stroke: 0.5px #fff !important;
            filter: drop-shadow(2px 2px 0px #111) !important;
          }
          .step-card-p {
            font-size: 0.65rem !important;
            line-height: 1.2 !important;
            margin-bottom: 0.5rem !important;
          }
          .step-card-header span {
            font-size: 0.6rem !important;
          }
          .step-card-header {
            margin-bottom: 0.5rem !important;
          }
          .step-card-detail {
            font-size: 0.55rem !important;
          }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </>
  );
}
