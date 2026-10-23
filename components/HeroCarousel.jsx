'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './HeroCarousel.module.css';

export const SLIDES = [
  {
    id: 'mango-avakaya',
    title: 'MANGO AVAKAYA',
    // Dynamic Slide Colors
    bgColor: '#C83820', // Bold Andhra pickle red
    headlineColor: '#FFF8ED',
    jarImg: '/images/hero/mango-avakaya.png',
    link: '/products',
    // Coins change colors per slide (like in Brar's screenshot: cyan blue, bright yellow, lime green, deep indigo)
    leftCoinBg: '#0288D1', // Vibrant Cyan/Blue (matching Brar's left "Made in Canada" coin)
    leftCoinText: '• 100% PURE & NATURAL • TRADITIONAL RECIPE',
    rightCoinBg: '#0288D1', // Matching blue theme
    rightCoinTopText: '100% NATURAL • NO PRESERVATIVES •',
    rightCoinValue: '100%',
    rightCoinSub: 'NATURAL',
    // Center background mandala behind jar
    renderCenterShape: () => (
      <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.bgShapeSvg} style={{ color: 'rgba(255, 248, 237, 0.22)' }}>
        <g stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 6">
          <circle cx="250" cy="250" r="235" />
          <circle cx="250" cy="250" r="175" />
          <circle cx="250" cy="250" r="115" />
        </g>
        <g fill="currentColor">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <ellipse key={deg} cx="250" cy="250" rx="42" ry="170" transform={`rotate(${deg} 250 250)`} opacity="0.35" />
          ))}
        </g>
      </svg>
    ),
  },
  {
    id: 'gongura',
    title: 'GONGURA PACHADI',
    bgColor: '#2E6930', // Forest Green
    headlineColor: '#FFFCEB',
    jarImg: '/images/hero/gongura-pachadi-bottle.png',
    link: '/products',
    leftCoinBg: '#E65100', // Fiery amber coin for contrast
    leftCoinText: '• AUTHENTIC ANDHRA PACHADI • STONE GROUND',
    rightCoinBg: '#E65100',
    rightCoinTopText: 'DESI GONGURA • HAND PICKED •',
    rightCoinValue: 'DESI',
    rightCoinSub: 'GONGURA',
    renderCenterShape: () => (
      <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.bgShapeSvg} style={{ color: 'rgba(255, 252, 235, 0.22)' }}>
        <g stroke="currentColor" strokeWidth="2.5">
          <circle cx="250" cy="250" r="235" strokeDasharray="10 10" />
          <circle cx="250" cy="250" r="160" />
        </g>
        <g fill="currentColor">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <path
              key={deg}
              d="M250 45 C215 130 285 130 250 250 C215 130 285 130 250 45 Z"
              opacity="0.4"
              transform={`rotate(${deg} 250 250)`}
            />
          ))}
        </g>
      </svg>
    ),
  },
  {
    id: 'lemon',
    title: 'USIRI & NIMMAKAYA',
    bgColor: '#D4751A', // Golden Citrus Orange
    headlineColor: '#FFF9E6',
    jarImg: '/images/hero/lemon.png',
    link: '/products',
    leftCoinBg: '#2E7D32', // Rich fresh green coin
    leftCoinText: '• COLD PRESSED SESAME OIL • SUN CURED',
    rightCoinBg: '#2E7D32',
    rightCoinTopText: 'PURE TRADITION • SINCE 1970 •',
    rightCoinValue: '1970',
    rightCoinSub: 'LEGACY',
    renderCenterShape: () => (
      <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.bgShapeSvg} style={{ color: 'rgba(255, 249, 230, 0.22)' }}>
        <circle cx="250" cy="250" r="235" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="250" cy="250" r="185" stroke="currentColor" strokeWidth="4" strokeDasharray="6 10" />
        <g fill="currentColor">
          {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((deg) => (
            <rect key={deg} x="247" y="25" width="6" height="34" rx="3" transform={`rotate(${deg} 250 250)`} opacity="0.45" />
          ))}
        </g>
        <circle cx="250" cy="250" r="80" stroke="currentColor" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'kandi-podi',
    title: 'KANDI PODI',
    bgColor: '#8B261C', // Earthy Spice Maroon
    headlineColor: '#FFF4E8',
    jarImg: '/images/hero/kandi-podi.png',
    link: '/products',
    leftCoinBg: '#F57F17', // Golden turmeric yellow coin
    leftCoinText: '• SLOW ROASTED LENTILS • STONE CRUSHED',
    rightCoinBg: '#F57F17',
    rightCoinTopText: 'GENUINE FLAVOUR • HAND ROASTED •',
    rightCoinValue: 'HAND',
    rightCoinSub: 'ROASTED',
    renderCenterShape: () => (
      <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.bgShapeSvg} style={{ color: 'rgba(255, 244, 232, 0.22)' }}>
        <g stroke="currentColor" strokeWidth="3">
          <polygon points="250,15 485,250 250,485 15,250" />
          <circle cx="250" cy="250" r="165" strokeDasharray="8 8" />
          <polygon points="250,75 425,250 250,425 75,250" />
        </g>
        <g fill="currentColor">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <circle key={deg} cx="250" cy="110" r="14" opacity="0.45" transform={`rotate(${deg} 250 250)`} />
          ))}
        </g>
      </svg>
    ),
  },
];

const AUTOPLAY_MS = 4500;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const touchStartX = useRef(null);

  const total = SLIDES.length;
  const current = SLIDES[index];
  const previous = SLIDES[prevIndex];

  const goTo = useCallback((nextIdx) => {
    setIndex((prev) => {
      const target = (nextIdx + total) % total;
      if (target === prev) return prev;
      setPrevIndex(prev);
      setAnimKey((k) => k + 1);
      return target;
    });
  }, [total]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay timer
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [next]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  // Touch swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className={styles.hero}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Adhvaitha Foods Hero Showcase"
    >
      {/* ══ BRAR'S BACKGROUND SYSTEM (.backgrounds) ══ */}
      <div className={styles.backgrounds}>
        {/* Layer 1: Previous Slide Background (Underneath) */}
        <div
          className={`${styles.bgLayer} ${styles.bgLayerActive}`}
          style={{ backgroundColor: previous.bgColor }}
        >
          <div className={styles.bgShapeCenter} aria-hidden="true">
            {previous.renderCenterShape()}
          </div>
        </div>

        {/* Layer 2: Incoming Slide Background (Circular Clip-Path Wipe) */}
        <div
          key={`bg-next-${animKey}`}
          className={`${styles.bgLayer} ${styles.bgLayerNext}`}
          style={{ backgroundColor: current.bgColor }}
        >
          <div className={styles.bgShapeCenter} aria-hidden="true">
            {current.renderCenterShape()}
          </div>
        </div>
      </div>

      {/* Main Big Headline */}
      <div className={styles.headlineWrapper}>
        {SLIDES.map((slide, i) => {
          let cls = styles.titleEntering;
          if (i === index) cls = styles.titleActive;
          else if (i === prevIndex) cls = styles.titleExiting;

          return (
            <h1
              key={slide.id}
              className={`${styles.title} ${cls}`}
              style={{
                color: slide.headlineColor,
                display: i === index ? 'block' : 'none',
              }}
            >
              {slide.title}
            </h1>
          );
        })}
      </div>

      {/* Jars Carousel Stage (Single center hero product jar) */}
      <div className={styles.stage}>
        {SLIDES.map((slide, i) => {
          let posClass = styles.jarHidden;
          const diff = (i - index + total) % total;

          if (diff === 0) posClass = styles.jarCenter;
          else if (diff === 1) posClass = styles.jarRight;
          else if (diff === total - 1) posClass = styles.jarLeft;

          return (
            <div key={slide.id} className={`${styles.jarItem} ${posClass}`}>
              <div className={diff === 0 ? styles.jarFloat : undefined}>
                <Image
                  src={slide.jarImg}
                  alt={slide.title}
                  width={340}
                  height={440}
                  priority={diff === 0}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          );
        })}

        {/* Twinkling Sparkles Near Jar */}
        <div key={`badges-${animKey}`} className={styles.badgeContainer}>

          {/* Twinkling Sparkles Near Jar */}
          <svg className={`${styles.sparkle} ${styles.sp1}`} viewBox="0 0 24 24" fill={current.headlineColor}>
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
          <svg className={`${styles.sparkle} ${styles.sp2}`} viewBox="0 0 24 24" fill="#FFE27A">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
          <svg className={`${styles.sparkle} ${styles.sp3}`} viewBox="0 0 24 24" fill={current.headlineColor}>
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
          <svg className={`${styles.sparkle} ${styles.sp4}`} viewBox="0 0 24 24" fill="#FFE27A">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
          <svg className={`${styles.sparkle} ${styles.sp5}`} viewBox="0 0 24 24" fill={current.headlineColor}>
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>
      </div>

      {/* Floating Left/Right Navigation Arrow Buttons */}
      <button
        type="button"
        className={`${styles.navArrow} ${styles.navArrowLeft}`}
        onClick={prev}
        aria-label="Previous Slide"
      >
        <ChevronLeft size={28} strokeWidth={2.5} />
      </button>

      <button
        type="button"
        className={`${styles.navArrow} ${styles.navArrowRight}`}
        onClick={next}
        aria-label="Next Slide"
      >
        <ChevronRight size={28} strokeWidth={2.5} />
      </button>

      {/* Bottom Area: Action Buttons & Brar's Pill Progress Indicators */}
      <div className={styles.bottomArea}>
        <div className={styles.ctas}>
          <Link href={current.link} className={styles.btnPrimary}>
            Explore Pickles
          </Link>
          <Link
            href="/our-story"
            className={styles.btnOutline}
            style={{ color: current.headlineColor, borderColor: current.headlineColor }}
          >
            Our Tradition
          </Link>
        </div>

        {/* Brar's-style animated progress pill indicator */}
        <div className={styles.navPills} role="tablist" aria-label="Slide Selection">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              className={`${styles.pillBtn} ${i === index ? styles.pillActive : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              role="tab"
              aria-selected={i === index}
            >
              <div className={styles.pillTrack}>
                <div key={i === index ? `fill-${animKey}` : `fill-idle-${i}`} className={styles.pillFill} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
