'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function OurStoryPage() {
  const containerRef = useRef(null);

  const FlatIllustration = ({ src, alt, width, height, top, left, right, bottom }) => {
    const isAbsolute = top !== undefined || left !== undefined || right !== undefined || bottom !== undefined;
    return (
      <div
        style={{
          position: isAbsolute ? 'absolute' : 'relative',
          top, left, right, bottom,
          width: '100%',
          maxWidth: `${width}px`,
          height: isAbsolute ? `${height}px` : 'auto',
          aspectRatio: isAbsolute ? 'auto' : '1 / 1',
          zIndex: 5,
          mixBlendMode: 'multiply',
          filter: 'contrast(1.2) brightness(1.1)',
          flexShrink: 0,
          margin: '0 auto'
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: '#FDF1E0', overflowX: 'hidden', fontFamily: 'var(--font-montserrat), sans-serif' }}>

      {/* 1. Navbar */}
      <div style={{ position: 'relative', zIndex: 50 }}>
        <Navbar />
      </div>

      <main ref={containerRef} style={{ position: 'relative', paddingBottom: '0' }}>

        {/* 2. Green "Ocean" Section (KEEPING IT Traditional) */}
        <section className="our-story-hero-section" style={{
          position: 'relative',
          backgroundColor: '#1C4B36',
          paddingTop: '220px', // Enough to fully clear the 120px navbar
          paddingBottom: '250px', // Massive padding to keep text safely above the slanted bottom shape
          paddingLeft: '5vw',
          paddingRight: '5vw',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
          gap: '2rem',
          alignItems: 'center',
          overflow: 'hidden'
        }}>

          {/* Left Side: Keeping It Traditional */}
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center' }}>
            <div style={{ transform: 'rotate(-4deg)', display: 'inline-block' }}>
              <h1 className="our-story-hero-h1" style={{
                fontFamily: 'var(--font-montserrat), sans-serif',
                fontSize: 'clamp(4rem, 10vw, 10rem)',
                fontWeight: 900,
                color: '#D92D20',
                lineHeight: 1,
                margin: 0,
                letterSpacing: 'normal',
                WebkitTextStroke: '2px #FDF1E0',
                textShadow: '-4px 4px 0px #FDF1E0'
              }}>
                KEEPING<br />IT
              </h1>
              <div className="our-story-hero-cursive" style={{
                fontFamily: 'var(--font-yellowtail), cursive',
                fontSize: 'clamp(4rem, 8vw, 8rem)',
                color: '#FDF1E0',
                marginTop: '-3rem',
                marginLeft: '4rem',
                transform: 'rotate(-5deg)',
                WebkitTextStroke: '2px #1C4B36',
                textShadow: '3px 3px 0 #1C4B36, 0px 10px 20px rgba(0,0,0,0.5)'
              }}>
                Traditional
              </div>
            </div>
          </div>

          {/* Right Side: So you can get... */}
          <div className="our-story-hero-right" style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h2 className="our-story-hero-h2" style={{
              fontFamily: 'var(--font-montserrat), sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              color: '#FDF1E0',
              lineHeight: 1.2,
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              SO YOU CAN GET<br />TRUE ANDHRA<br />WITH US
            </h2>
          </div>

          {/* Map Coastline Shape Divider */}
          <div style={{
            position: 'absolute',
            bottom: '-200px',
            right: '-5%',
            width: '110%',
            height: '300px',
            backgroundColor: '#FDF1E0',
            borderTopLeftRadius: '120px',
            borderTopRightRadius: '30px',
            borderTop: '6px solid #231F20',
            borderLeft: '6px solid #231F20',
            boxShadow: '-10px -10px 0 rgba(0,0,0,0.2)',
            transform: 'rotate(-4deg)',
            zIndex: 5
          }}></div>


        </section>

        {/* 3. Cream "Land" Sections */}
        <section style={{
          position: 'relative',
          backgroundColor: '#FDF1E0',
          paddingTop: '10vh'
        }}>

          {/* Continuous Coastline SVG running down the left */}
          <div style={{ position: 'absolute', top: 0, left: '8%', width: '50px', height: '100%', zIndex: 1 }}>
            <svg width="100%" height="100%" preserveAspectRatio="none">
              <path d="M 40 0 Q 20 300, 40 600 T 30 1200 T 50 1800 T 40 2400 T 30 3000 T 50 3600 T 40 4200 L 40 5000"
                fill="none" stroke="#231F20" strokeWidth="4"
                style={{ filter: 'drop-shadow(6px 6px 0px rgba(0,0,0,0.1))' }} />
            </svg>
          </div>

          {/* --- STORY BLOCKS --- */}

          {/* Block 1: Intro */}
          <div style={{ padding: '15vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5vw', flexWrap: 'wrap-reverse' }}>
            <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
              <FlatIllustration src="/images/story_ingredients_1782482838849.png" alt="Prep" width={450} height={450} />
            </div>
            <div style={{ flex: '1 1 500px', zIndex: 10, textAlign: 'left' }}>
              <h2 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', lineHeight: 1.3 }}>
                CRAFTING TRADITIONAL<br />PICKLES, SWEETS, SNACKS & POWDERS
              </h2>
            </div>
          </div>

          {/* Block 2: Picking Mangoes */}
          <div style={{ padding: '15vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ zIndex: 10, textAlign: 'center', width: '100%', maxWidth: '1000px' }}>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                HANDPICKING THE FINEST
              </h3>
              <h2 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(3.5rem, 7vw, 6rem)', fontWeight: 900, color: '#1C4B36', textTransform: 'uppercase', lineHeight: 1 }}>
                INGREDIENTS
              </h2>
            </div>
          </div>

          {/* Block 3: Washing & Prepping */}
          <div style={{ padding: '15vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5vw', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 500px', zIndex: 10, textAlign: 'right' }}>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                WASHING & PREPPING
              </h3>
              <h2 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(4rem, 8vw, 7rem)', fontWeight: 900, color: '#1C4B36', textTransform: 'uppercase', lineHeight: 1 }}>
                WITH UTMOST CARE
              </h2>
            </div>
            <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
              <FlatIllustration src="/images/story_washing_1782482851676.png" alt="Washing" width={450} height={450} />
            </div>
          </div>

          {/* Block 4: Chillies */}
          <div style={{ padding: '15vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5vw', flexWrap: 'wrap-reverse' }}>
            <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
              <FlatIllustration src="/images/story_spices_1782482862546.png" alt="Chili" width={450} height={450} />
            </div>
            <div style={{ flex: '1 1 500px', zIndex: 10, textAlign: 'left' }}>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                & CHOOSING THE FIERIEST
              </h3>
              <h2 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(4rem, 8vw, 7rem)', fontWeight: 900, color: '#1C4B36', textTransform: 'uppercase', lineHeight: 1 }}>
                GUNTUR
              </h2>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginTop: '0.5rem' }}>
                CHILLIES & PURE SPICES
              </h3>
            </div>
          </div>

          {/* Block 5: Sun-Drying */}
          <div style={{ padding: '15vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ zIndex: 10, textAlign: 'center', width: '100%', maxWidth: '1000px' }}>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                SUN-DRYING THEM ON
              </h3>
              <h2 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(3.5rem, 7vw, 6rem)', fontWeight: 900, color: '#1C4B36', textTransform: 'uppercase', lineHeight: 1 }}>
                OPEN TERRACES
              </h2>
            </div>
          </div>

          {/* Block 6: Stone-Grinding */}
          <div style={{ padding: '15vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5vw', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 500px', zIndex: 10, textAlign: 'right' }}>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                STONE-GRINDING EVERYTHING
              </h3>
              <h2 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(4rem, 8vw, 7rem)', fontWeight: 900, color: '#1C4B36', textTransform: 'uppercase', lineHeight: 1 }}>
                BY HAND
              </h2>
            </div>
            <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
              <FlatIllustration src="/images/story_grinding_1782482873236.png" alt="Grinding" width={450} height={450} />
            </div>
          </div>

          {/* Block 7: Mixing in Sesame Oil */}
          <div style={{ padding: '15vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ zIndex: 10, textAlign: 'center', width: '100%', maxWidth: '1000px' }}>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                AND SLOWLY MIXING IT IN
              </h3>
              <h2 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(4rem, 8vw, 7rem)', fontWeight: 900, color: '#1C4B36', textTransform: 'uppercase', lineHeight: 1 }}>
                COLD-PRESSED
              </h2>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginTop: '0.5rem' }}>
                SESAME OIL
              </h3>
            </div>
          </div>

          {/* Block 8: Hand-Packing */}
          <div style={{ padding: '15vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5vw', flexWrap: 'wrap-reverse' }}>
            <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
              <FlatIllustration src="/images/story_packing_1782482885885.png" alt="Hand Packing" width={450} height={450} />
            </div>
            <div style={{ flex: '1 1 500px', zIndex: 10, textAlign: 'left' }}>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                BEFORE HAND-PACKING EVERY BATCH
              </h3>
              <h2 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(3.5rem, 7vw, 6rem)', fontWeight: 900, color: '#1C4B36', textTransform: 'uppercase', lineHeight: 1 }}>
                JUST LIKE AMMAYYA DID
              </h2>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginTop: '0.5rem' }}>
                SINCE 1970
              </h3>
            </div>
          </div>


          {/* Airplane / Path Trail Section */}
          <div style={{ position: 'relative', height: '35vh', width: '100%', marginTop: '5vh', overflow: 'hidden' }}>
            <svg width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0 }}>
              <path d="M 150 100 Q 500 50, 700 200 T 1100 150" fill="none" stroke="#688F70" strokeWidth="5" strokeDasharray="15, 20" strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', top: '120px', left: '700px', transform: 'rotate(15deg)' }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="#1C4B36">
                <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
              </svg>
            </div>
          </div>
        </section>

        {/* 4. BOTTOM RED FARM SECTION */}
        <section style={{
          position: 'relative',
          backgroundColor: '#FDF1E0',
          borderBottom: '20px solid #DA291C',
          paddingTop: '15vh'
        }}>
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 20, padding: '0 5vw 5vh' }}>
            <h2 style={{
              fontFamily: 'var(--font-montserrat), sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 900,
              color: '#1C4B36',
              textTransform: 'uppercase',
              lineHeight: 1.2
            }}>
              FROM DIFFERENT FARMS <br /> ACROSS ANDHRA
            </h2>
          </div>

          <div style={{ width: '100%', height: 'max(400px, 40vw)', position: 'relative', zIndex: 10, mixBlendMode: 'multiply' }}>
            <img 
              src="/images/red_farm_wide.png" 
              alt="Farm Illustration" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
            />
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .our-story-hero-section {
            padding-top: 150px !important;
            padding-bottom: 120px !important;
            grid-template-columns: 1fr !important;
          }
          .our-story-hero-h1 {
            font-size: 3.5rem !important;
            line-height: 0.9 !important;
          }
          .our-story-hero-cursive {
            font-size: 4.5rem !important;
            margin-top: -2rem !important;
            margin-left: 1rem !important;
          }
          .our-story-hero-right {
            margin-top: 2rem !important;
          }
          .our-story-hero-h2 {
            font-size: 2rem !important;
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
}
