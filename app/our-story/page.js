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
          <div className="coastline-svg" style={{ position: 'absolute', top: 0, left: '8%', width: '50px', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
            <svg width="100%" height="100%" viewBox="0 0 100 5000" preserveAspectRatio="none">
              <path d="M 40 0 Q 20 300, 40 600 T 30 1200 T 50 1800 T 40 2400 T 30 3000 T 50 3600 T 40 4200 L 40 5000"
                fill="none" stroke="#231F20" strokeWidth="4" vectorEffect="non-scaling-stroke"
                style={{ filter: 'drop-shadow(6px 6px 0px rgba(0,0,0,0.1))' }} />
            </svg>
          </div>

          {/* --- STORY BLOCKS --- */}

          {/* Block 1: Intro */}
          <div className="story-block reverse" style={{ padding: '8vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5vw', flexWrap: 'wrap-reverse' }}>
            <div className="story-img" style={{ flex: '1 1 400px', maxWidth: '500px' }}>
              <FlatIllustration src="/images/story_ingredients_1782482838849.png" alt="Prep" width={350} height={350} />
            </div>
            <div className="story-text text-left" style={{ flex: '1 1 500px', zIndex: 10, textAlign: 'left' }}>
              <h2 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', lineHeight: 1.3 }}>
                CRAFTING TRADITIONAL<br />PICKLES, SWEETS, SNACKS & POWDERS
              </h2>
              <p className="story-desc" style={{ marginTop: '1.5rem', fontSize: '1rem', lineHeight: 1.6, fontWeight: 500, color: '#333' }}>
                Our journey began in 1970 with a simple philosophy: preserve the authentic, fiery flavors of Andhra Pradesh exactly as our grandmother, Ammayya, intended. Every jar we seal carries her legacy, using time-honored recipes that bring back the comforting taste of home.
              </p>
            </div>
          </div>

          {/* Block 1.5: Ammayya's Kitchen */}
          <div className="story-block reverse-col" style={{ padding: '8vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5vw', flexWrap: 'wrap' }}>
            <div className="story-text text-right" style={{ flex: '1 1 500px', zIndex: 10, textAlign: 'right' }}>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                ROOTED IN TRADITION
              </h3>
              <h2 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, color: '#1C4B36', textTransform: 'uppercase', lineHeight: 1 }}>
                AMMAYYA'S KITCHEN
              </h2>
              <p className="story-desc" style={{ marginTop: '1.5rem', fontSize: '1rem', lineHeight: 1.6, fontWeight: 500, color: '#333' }}>
                In her rustic kitchen, magic was made with patience and love. Ammayya spent hours perfecting the right balance of spices, ensuring every bite was an explosion of taste. We follow her exact measurements and methods today, refusing to take any shortcuts.
              </p>
            </div>
            <div className="story-img" style={{ flex: '1 1 400px', maxWidth: '500px' }}>
              <FlatIllustration src="/images/ammayya_kitchen.png" alt="Ammayya's Kitchen" width={350} height={350} />
            </div>
          </div>

          {/* Block 2: Picking Mangoes */}
          <div className="story-block reverse" style={{ padding: '8vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5vw', flexWrap: 'wrap-reverse' }}>
            <div className="story-img" style={{ flex: '1 1 400px', maxWidth: '500px' }}>
              <FlatIllustration src="/images/andhra_farms.png" alt="Andhra Farms" width={350} height={350} />
            </div>
            <div className="story-text text-left" style={{ flex: '1 1 500px', zIndex: 10, textAlign: 'left' }}>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                HANDPICKING THE FINEST
              </h3>
              <h2 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, color: '#1C4B36', textTransform: 'uppercase', lineHeight: 1 }}>
                INGREDIENTS
              </h2>
              <p className="story-desc" style={{ marginTop: '1.5rem', fontSize: '1rem', lineHeight: 1.6, fontWeight: 500, color: '#333' }}>
                We believe great food starts at the roots. That’s why we source our mangoes and spices directly from generational farmers across Andhra Pradesh. Walking through lush, green orchards, we hand-select only the ripest, most flavorful produce to ensure premium quality in every batch.
              </p>
            </div>
          </div>

          {/* Block 3: Washing & Prepping */}
          <div className="story-block reverse-col" style={{ padding: '8vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5vw', flexWrap: 'wrap' }}>
            <div className="story-text text-right" style={{ flex: '1 1 500px', zIndex: 10, textAlign: 'right' }}>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                WASHING & PREPPING
              </h3>
              <h2 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 900, color: '#1C4B36', textTransform: 'uppercase', lineHeight: 1 }}>
                WITH UTMOST CARE
              </h2>
              <p className="story-desc" style={{ marginTop: '1.5rem', fontSize: '1rem', lineHeight: 1.6, fontWeight: 500, color: '#333' }}>
                Before any cutting or mixing begins, every single ingredient undergoes a rigorous, traditional cleaning process. We wash everything by hand with pure water and utmost care, making sure nature’s best is pristine and ready for preparation.
              </p>
            </div>
            <div className="story-img" style={{ flex: '1 1 400px', maxWidth: '500px' }}>
              <FlatIllustration src="/images/story_washing_1782482851676.png" alt="Washing" width={350} height={350} />
            </div>
          </div>

          {/* Block 4: Chillies */}
          <div className="story-block reverse" style={{ padding: '8vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5vw', flexWrap: 'wrap-reverse' }}>
            <div className="story-img" style={{ flex: '1 1 400px', maxWidth: '500px' }}>
              <FlatIllustration src="/images/story_spices_1782482862546.png" alt="Chili" width={350} height={350} />
            </div>
            <div className="story-text text-left" style={{ flex: '1 1 500px', zIndex: 10, textAlign: 'left' }}>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                & CHOOSING THE FIERIEST
              </h3>
              <h2 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 900, color: '#1C4B36', textTransform: 'uppercase', lineHeight: 1 }}>
                GUNTUR
              </h2>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginTop: '0.5rem' }}>
                CHILLIES & PURE SPICES
              </h3>
              <p className="story-desc" style={{ marginTop: '1.5rem', fontSize: '1rem', lineHeight: 1.6, fontWeight: 500, color: '#333' }}>
                Andhra cuisine is legendary for its heat. We strictly source the fieriest, authentic Guntur chillies, renowned globally for their vibrant red color and intense flavor. Ground together with pure, aromatic spices, they form the soul of our fiery pickles.
              </p>
            </div>
          </div>

          {/* Block 5: Sun-Drying */}
          <div className="story-block" style={{ padding: '8vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="story-text" style={{ zIndex: 10, textAlign: 'center', width: '100%', maxWidth: '1000px' }}>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                SUN-DRYING THEM ON
              </h3>
              <h2 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, color: '#1C4B36', textTransform: 'uppercase', lineHeight: 1 }}>
                OPEN TERRACES
              </h2>
              <p className="story-desc" style={{ marginTop: '1.5rem', fontSize: '1rem', lineHeight: 1.6, fontWeight: 500, color: '#333' }}>
                Patience is our secret ingredient. Instead of using artificial dehydrators, we spread our washed ingredients on open terraces to dry naturally under the hot Indian sun. This natural sun-drying process concentrates the flavors and ensures perfect texture.
              </p>
            </div>
          </div>

          {/* Block 6: Stone-Grinding */}
          <div className="story-block reverse-col" style={{ padding: '8vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5vw', flexWrap: 'wrap' }}>
            <div className="story-text text-right" style={{ flex: '1 1 500px', zIndex: 10, textAlign: 'right' }}>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                STONE-GRINDING EVERYTHING
              </h3>
              <h2 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 900, color: '#1C4B36', textTransform: 'uppercase', lineHeight: 1 }}>
                BY HAND
              </h2>
              <p className="story-desc" style={{ marginTop: '1.5rem', fontSize: '1rem', lineHeight: 1.6, fontWeight: 500, color: '#333' }}>
                We reject modern electric grinders because the heat they generate kills the natural essential oils of the spices. Instead, we stone-grind everything by hand. This slow, labor-intensive method retains the deep aroma and true potency of our raw spices.
              </p>
            </div>
            <div className="story-img" style={{ flex: '1 1 400px', maxWidth: '500px' }}>
              <FlatIllustration src="/images/story_grinding_1782482873236.png" alt="Grinding" width={350} height={350} />
            </div>
          </div>

          {/* Block 7: Mixing in Sesame Oil */}
          <div className="story-block reverse" style={{ padding: '8vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5vw', flexWrap: 'wrap-reverse' }}>
            <div className="story-img" style={{ flex: '1 1 400px', maxWidth: '500px' }}>
              <FlatIllustration src="/images/cold_pressed_oil.png" alt="Cold Pressed Oil" width={350} height={350} />
            </div>
            <div className="story-text text-left" style={{ flex: '1 1 500px', zIndex: 10, textAlign: 'left' }}>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                AND SLOWLY MIXING IT IN
              </h3>
              <h2 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 900, color: '#1C4B36', textTransform: 'uppercase', lineHeight: 1 }}>
                COLD-PRESSED
              </h2>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginTop: '0.5rem' }}>
                SESAME OIL
              </h3>
              <p className="story-desc" style={{ marginTop: '1.5rem', fontSize: '1rem', lineHeight: 1.6, fontWeight: 500, color: '#333' }}>
                Using traditional wooden chekkus (Ganuga), we extract pure, cold-pressed sesame oil. Mixing our stone-ground spices into this golden oil not only preserves the pickle naturally but adds a rich, nutty depth that characterizes true traditional Andhra pickles.
              </p>
            </div>
          </div>

          {/* Block 8: Hand-Packing */}
          <div className="story-block reverse-col" style={{ padding: '8vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5vw', flexWrap: 'wrap' }}>
            <div className="story-text text-right" style={{ flex: '1 1 500px', zIndex: 10, textAlign: 'right' }}>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                BEFORE HAND-PACKING EVERY BATCH
              </h3>
              <h2 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, color: '#1C4B36', textTransform: 'uppercase', lineHeight: 1 }}>
                JUST LIKE AMMAYYA DID
              </h2>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginTop: '0.5rem' }}>
                SINCE 1970
              </h3>
              <p className="story-desc" style={{ marginTop: '1.5rem', fontSize: '1rem', lineHeight: 1.6, fontWeight: 500, color: '#333' }}>
                Every single jar is filled, sealed, and packed by hand. We take pride in overseeing every step of the journey, from the farm to your family's dining table. Taste the uncompromised love, tradition, and fiery spirit of Andhra in every bite.
              </p>
            </div>
            <div className="story-img" style={{ flex: '1 1 400px', maxWidth: '500px' }}>
              <FlatIllustration src="/images/story_packing_1782482885885.png" alt="Hand Packing" width={350} height={350} />
            </div>
          </div>

          {/* Block 9: Empowering Communities */}
          <div className="story-block reverse" style={{ padding: '8vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5vw', flexWrap: 'wrap-reverse' }}>
            <div className="story-img" style={{ flex: '1 1 400px', maxWidth: '500px' }}>
              <FlatIllustration src="/images/story_community.png" alt="Empowering Communities" width={350} height={350} />
            </div>
            <div className="story-text text-left" style={{ flex: '1 1 500px', zIndex: 10, textAlign: 'left' }}>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                EMPOWERING LOCAL
              </h3>
              <h2 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 900, color: '#1C4B36', textTransform: 'uppercase', lineHeight: 1 }}>
                FARMERS
              </h2>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginTop: '0.5rem' }}>
                & WOMEN OF ANDHRA
              </h3>
              <p className="story-desc" style={{ marginTop: '1.5rem', fontSize: '1rem', lineHeight: 1.6, fontWeight: 500, color: '#333' }}>
                Adhvaitha Foods is more than just a brand; it’s a community. By partnering directly with local farmers and employing skilled women from our villages, we ensure fair trade and support the rural economy while bringing you the most authentic flavors.
              </p>
            </div>
          </div>

          {/* Block 10: The Next Generation */}
          <div className="story-block reverse-col" style={{ padding: '8vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5vw', flexWrap: 'wrap' }}>
            <div className="story-text text-right" style={{ flex: '1 1 500px', zIndex: 10, textAlign: 'right' }}>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                CARRYING THE TORCH
              </h3>
              <h2 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, color: '#1C4B36', textTransform: 'uppercase', lineHeight: 1 }}>
                TO THE MODERN WORLD
              </h2>
              <p className="story-desc" style={{ marginTop: '1.5rem', fontSize: '1rem', lineHeight: 1.6, fontWeight: 500, color: '#333' }}>
                Today, the new generation of our family proudly carries Ammayya's legacy forward. We’ve embraced modern hygiene and global shipping without ever compromising the traditional, labor-intensive methods that make our products genuinely authentic.
              </p>
            </div>
            <div className="story-img" style={{ flex: '1 1 400px', maxWidth: '500px' }}>
              <FlatIllustration src="/images/story_generation.png" alt="The Next Generation" width={350} height={350} />
            </div>
          </div>

          {/* Block 11: Our Core Promise */}
          <div className="story-block reverse" style={{ padding: '8vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5vw', flexWrap: 'wrap-reverse' }}>
            <div className="story-img" style={{ flex: '1 1 400px', maxWidth: '500px' }}>
              <FlatIllustration src="/images/story_promise.png" alt="100% Natural Promise" width={350} height={350} />
            </div>
            <div className="story-text text-left" style={{ flex: '1 1 500px', zIndex: 10, textAlign: 'left' }}>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                OUR UNWAVERING GUARANTEE
              </h3>
              <h2 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 900, color: '#1C4B36', textTransform: 'uppercase', lineHeight: 1 }}>
                100% NATURAL
              </h2>
              <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1C4B36', textTransform: 'uppercase', marginTop: '0.5rem' }}>
                ZERO PRESERVATIVES
              </h3>
              <p className="story-desc" style={{ marginTop: '1.5rem', fontSize: '1rem', lineHeight: 1.6, fontWeight: 500, color: '#333' }}>
                We promise that what you taste is 100% pure nature. We never use artificial colors, flavors, or chemical preservatives. Our pickles and sweets are naturally preserved using time-honored techniques, ensuring absolute safety and unrivaled taste.
              </p>
            </div>
          </div>


          {/* Airplane / Path Trail Section */}
          <div className="airplane-section" style={{ width: '100%', marginTop: '5vh', paddingBottom: '0', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
            <svg viewBox="0 0 1200 300" style={{ width: '100%', maxWidth: '1200px', height: 'auto' }}>
              <path d="M 100 0 C 100 200, 600 250, 1200 150" fill="none" stroke="#688F70" strokeWidth="5" strokeDasharray="15, 20" strokeLinecap="round" />
              <g transform="translate(900, 205) rotate(-5)">
                <svg x="-30" y="-30" width="60" height="60" viewBox="0 0 24 24" fill="#1C4B36">
                  <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                </svg>
              </g>
            </svg>
          </div>
        </section>

        {/* 4. BOTTOM RED FARM SECTION */}
        <section style={{
          position: 'relative',
          backgroundColor: '#FDF1E0',
          borderBottom: '20px solid #DA291C',
          paddingTop: '5vh'
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
          .story-block {
            padding: 3vh 2vw !important;
            gap: 2vw !important;
            flex-wrap: nowrap !important;
            flex-direction: row !important;
          }
          .story-block.reverse {
            flex-direction: row !important;
          }
          .story-block.reverse-col {
            flex-direction: row !important;
          }
          .story-text {
            flex: 1 !important;
            min-width: 0 !important;
          }
          .story-block:not(:has(.story-img)) .story-text {
            flex: 1 1 100% !important;
            text-align: center !important;
          }
          .story-text.text-right {
            text-align: right !important;
          }
          .story-text.text-left {
            text-align: left !important;
          }
          .story-text h2 {
            font-size: clamp(1rem, 3.5vw, 2.5rem) !important;
          }
          .story-text h3 {
            font-size: clamp(0.6rem, 2vw, 1.5rem) !important;
          }
          .story-desc {
            font-size: clamp(0.7rem, 2vw, 1rem) !important;
            margin-top: 0.5rem !important;
            line-height: 1.4 !important;
          }
          .story-img {
            flex: 1 !important;
            min-width: 0 !important;
            max-width: 50% !important;
            margin: 0 !important;
          }
          .coastline-svg {
            left: 2% !important;
            width: 30px !important;
          }

        }
      `}</style>
    </div>
  );
}
