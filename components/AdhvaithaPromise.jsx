'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const PROMISE_STORIES = [
  {
    name: 'Lakshmi Ammayya',
    role: 'Master Recipe Curator & Founder',
    image: '/images/promise_grandmother.png',
    title: 'THE TRUSTED CHOICE',
    subtitle: 'for Generations',
    col1Para1: 'I grew up learning the art of authentic Telugu pickling right in our village courtyard, watching earthen jars of sun-ripened mangoes and stone-ground spices cure patiently under the warm Andhra sun.',
    col1Para2: 'Today, at Adhvaitha Foods, every single batch honors those exact heirloom proportions: wood-pressed sesame oil, fiery Guntur chillies, and hand-selected raw mangoes—without a single drop of artificial preservatives or vinegar.',
    col2Para1: 'I take immense pride in how authentic, naturally fermented pickles restore vital digestive enzymes and timeless flavor to everyday meals, turning simple hot rice and ghee into pure soul-nourishing feast.',
    col2Para2: 'We take what families put into their bodies with the utmost reverence. Adhvaitha is 100% natural, packed with wholesome minerals, rock salt, and authentic warmth crafted straight from grandmother’s kitchen.'
  },
  {
    name: 'Rajeshwari Devi',
    role: 'Senior Artisan & Spice Custodian',
    image: '/images/Second_Generation.png',
    title: 'HERITAGE CRAFTSMANSHIP',
    subtitle: 'by Traditional Artisans',
    col1Para1: 'For over 35 years, our hands have known the exact touch of freshly toasted fenugreek, hand-peeled organic garlic, and slow wood-fired tempering that store-bought factory pickles could never replicate.',
    col1Para2: 'Every spice blend is roasted in small iron cauldrons and ground gently on stone mills so the essential aromatic oils and vibrant natural colors remain fully intact and alive.',
    col2Para1: 'When our daughters and grandchildren sit to eat, this is the exact pickle we serve them. That is the holy standard we maintain for every customer jar packed at Adhvaitha Foods.',
    col2Para2: 'No industrial shortcuts, no artificial food colors, and no compromise. Just clean, traditional kitchen wisdom prepared with patience, hygiene, and genuine motherly care.'
  },
  {
    name: 'Dr. Srinivas Rao',
    role: 'Culinary Historian & Loyal Patron',
    image: '/images/promise_trust.png',
    title: 'UNCOMPROMISED NOSTALGIA',
    subtitle: 'Loved Across Families',
    col1Para1: 'Finding authentic Telugu Avakaya that tastes truly like home has been nearly impossible in modern cities—until we opened our first jar of Adhvaitha Foods two years ago.',
    col1Para2: 'The crisp crunch of the unpeeled mango, the pungent burst of mustard seeds, and the warmth of cold-pressed oil instantly transported me back to summers at my grandmother’s home.',
    col2Para1: 'In an era dominated by synthetic additives and chemical vinegar, Adhvaitha’s dedication to pure raw ingredients and slow fermentation is a gift for wholesome health.',
    col2Para2: 'It has become an essential staple on our family table, loved equally by my elderly parents and my school-going children. A true heirloom treasure reborn.'
  }
];

const SOCIAL_CARDS = [
  {
    src: '/images/promise_child_eating.jpg',
    alt: 'Happy young child enjoying authentic rice and pickle',
    caption: 'Pure Joy at First Bite'
  },
  {
    src: '/images/promise_family.png',
    alt: 'Three generations of family enjoying meal together with pickle jars',
    caption: 'Tradition on Every Table'
  },
  {
    src: '/images/Second_Generation.png',
    alt: 'Artisanal women hand-mixing authentic spices with love',
    caption: 'Handcrafted Heritage'
  },
  {
    src: '/images/promise_trust.png',
    alt: 'Grandmother holding heirloom glass jar of pickled mangoes',
    caption: 'Ammayya’s Secret Touch'
  },
  {
    src: '/images/Global_Family.png',
    alt: 'Adhvaitha Foods care package delivered to happy homes',
    caption: 'Delivered Fresh Worldwide'
  }
];

export default function AdhvaithaPromise() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? PROMISE_STORIES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === PROMISE_STORIES.length - 1 ? 0 : prev + 1));
  };

  const story = PROMISE_STORIES[currentSlide];

  return (
    <section id="adhvaitha-promise" className="adhvaitha-promise-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@600;700&family=Oswald:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .adhvaitha-promise-section {
          background-color: #F8EFE8; /* Soft warm cream matching signature section and page tone */
          padding: clamp(3rem, 5.5vw, 5.5rem) clamp(1rem, 3vw, 2.5rem);
          scroll-margin-top: 100px;
        }

        .adhvaitha-promise-wrapper {
          max-width: 1360px;
          margin: 0 auto;
          background-color: #207238;
          color: #FFFFFF;
          padding: clamp(3.8rem, 5.5vw, 5.5rem) clamp(1.5rem, 4vw, 3.8rem);
          border-radius: 28px;
          border: 4px solid #144E26;
          box-shadow: 0 0 0 1.5px rgba(255, 255, 255, 0.15) inset, 0 20px 48px rgba(18, 64, 32, 0.16);
          overflow: hidden;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          position: relative;
        }

        .promise-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        /* ══ BLOCK 1: THE TRUSTED CHOICE (CAROUSEL) ══ */
        .promise-hero-block {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 3.5rem;
          align-items: center;
          margin-bottom: 5.5rem;
        }

        .promise-portrait-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .promise-portrait-frame {
          position: relative;
          width: 100%;
          height: 480px;
          border-radius: 20px;
          overflow: hidden;
          background: #19582C;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.25);
        }

        .promise-portrait-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .promise-portrait-wrapper:hover .promise-portrait-frame img {
          transform: scale(1.03);
        }

        .promise-portrait-caption {
          margin-top: 1.25rem;
          font-family: 'Oswald', 'Bebas Neue', 'Arial Black', sans-serif;
          font-size: 1.2rem;
          letter-spacing: 0.05em;
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          text-transform: uppercase;
          color: #FFFFFF;
        }

        .promise-portrait-caption .cap-name {
          font-weight: 700;
          font-size: 1.45rem;
          color: #FFFFFF;
        }

        .promise-portrait-caption .cap-role {
          font-size: 1.1rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.88);
          letter-spacing: 0.04em;
        }

        /* Content Right */
        .promise-story-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .promise-story-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 2rem;
          gap: 1.5rem;
        }

        .promise-title-group h2 {
          font-family: 'Oswald', 'Bebas Neue', 'Arial Black', sans-serif;
          font-size: clamp(2.8rem, 4.8vw, 4.5rem);
          font-weight: 700;
          line-height: 1.02;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          margin: 0;
          color: #FFFFFF;
        }

        .promise-title-group .promise-script-sub {
          display: block;
          font-family: 'Caveat', cursive;
          font-size: clamp(2.2rem, 3.8vw, 3.4rem);
          font-weight: 700;
          line-height: 1.1;
          color: #FFFFFF;
          margin-top: 0.2rem;
          transform: rotate(-1deg);
        }

        /* Round Arrows */
        .promise-nav-arrows {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-top: 0.5rem;
          flex-shrink: 0;
        }

        .promise-arrow-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.7);
          background: transparent;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          outline: none;
        }

        .promise-arrow-btn:hover {
          background: #FFFFFF;
          color: #207238;
          border-color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.18);
        }

        .promise-arrow-btn svg {
          width: 22px;
          height: 22px;
          stroke-width: 2.2;
        }

        /* 2-Column Body Text */
        .promise-body-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          line-height: 1.7;
          font-size: 1.05rem;
          color: #F0FDF4;
        }

        .promise-body-col p {
          margin: 0 0 1.3rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.94);
        }

        .promise-body-col p:last-child {
          margin-bottom: 0;
        }

        /* ══ BLOCK 2: SOCIAL PROOF / FAMILIES LOVE ADHVAITHA ══ */
        .promise-social-block {
          border-top: 1.5px solid rgba(255, 255, 255, 0.18);
          padding-top: 4.5rem;
        }

        .promise-social-headline {
          font-family: 'Oswald', 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 3.4vw, 3rem);
          font-weight: 700;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 3.8rem;
          color: #FFFFFF;
          line-height: 1.15;
        }

        .promise-social-grid {
          display: grid;
          grid-template-columns: 290px 1fr;
          gap: 2.8rem;
          align-items: center;
        }

        .promise-love-badge {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }

        .promise-stars {
          display: flex;
          gap: 0.35rem;
          margin-bottom: 1rem;
        }

        .promise-stars span {
          font-size: 1.75rem;
          line-height: 1;
          color: #FFFFFF;
          display: inline-block;
        }

        .promise-stamp-title {
          font-family: 'Bebas Neue', 'Oswald', 'Arial Black', sans-serif;
          font-size: clamp(3.2rem, 5vw, 4.6rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin: 0 0 0.35rem;
          color: #FFFFFF;
        }

        .promise-stamp-sub {
          font-family: 'Oswald', 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 3.4vw, 3rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: 0.02em;
          color: #FFFFFF;
          margin: 0;
        }

        /* 5 Vertical Cards Row */
        .promise-cards-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.4) transparent;
        }

        .promise-card-item {
          position: relative;
          height: 310px;
          border-radius: 20px;
          overflow: hidden;
          background: #19582C;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease;
          cursor: pointer;
        }

        .promise-card-item:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.35);
        }

        .promise-card-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .promise-card-caption-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(10,40,18,0.92) 100%);
          display: flex;
          align-items: flex-end;
          padding: 1rem 0.85rem;
          opacity: 0.9;
          transition: opacity 0.3s ease;
        }

        .promise-card-item:hover .promise-card-caption-overlay {
          opacity: 1;
        }

        .promise-card-caption-overlay span {
          font-size: 0.82rem;
          font-weight: 600;
          color: #FFFFFF;
          letter-spacing: 0.2px;
          line-height: 1.25;
        }

        /* ══ RESPONSIVE BREAKPOINTS ══ */
        @media (max-width: 1080px) {
          .promise-hero-block {
            grid-template-columns: 300px 1fr;
            gap: 2.2rem;
          }
          .promise-portrait-frame {
            height: 420px;
          }
          .promise-body-columns {
            grid-template-columns: 1fr;
            gap: 1.2rem;
          }
          .promise-social-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .promise-love-badge {
            align-items: center;
            text-align: center;
          }
        }

        @media (max-width: 768px) {
          .adhvaitha-promise-section {
            padding: 2rem 0.75rem 2.5rem;
          }
          .adhvaitha-promise-wrapper {
            padding: 3rem 1.1rem 3.5rem;
            border-radius: 20px;
            border-width: 3px;
          }
          .promise-hero-block {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .promise-portrait-frame {
            height: 380px;
            max-width: 380px;
            margin: 0 auto;
          }
          .promise-portrait-caption {
            justify-content: center;
            text-align: center;
          }
          .promise-story-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .promise-nav-arrows {
            align-self: flex-end;
            margin-top: -1.5rem;
          }
          .promise-cards-row {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 0.9rem;
            padding-bottom: 1rem;
          }
          .promise-card-item {
            flex: 0 0 170px;
            height: 270px;
            scroll-snap-align: start;
          }
        }
      `}</style>

      <div className="adhvaitha-promise-wrapper">
        <div className="promise-container">
        
        {/* ══ BLOCK 1: THE TRUSTED CHOICE (HERITAGE STORY) ══ */}
        <div className="promise-hero-block">
          
          {/* Left Column: Portrait of Grandma / Curator */}
          <div className="promise-portrait-wrapper">
            <div className="promise-portrait-frame">
              <img
                src={story.image}
                alt={`${story.name} - ${story.role}`}
              />
            </div>
            <div className="promise-portrait-caption">
              <span className="cap-name">- {story.name}</span>
              <span className="cap-role">{story.role}</span>
            </div>
          </div>

          {/* Right Column: Title, Subtitle, Arrows & 2-Col Text */}
          <div className="promise-story-content">
            <div className="promise-story-header">
              <div className="promise-title-group">
                <h2>{story.title}</h2>
                <span className="promise-script-sub">{story.subtitle}</span>
              </div>

              {/* Navigation Arrows */}
              <div className="promise-nav-arrows">
                <button
                  type="button"
                  className="promise-arrow-btn"
                  onClick={prevSlide}
                  aria-label="Previous story"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="promise-arrow-btn"
                  onClick={nextSlide}
                  aria-label="Next story"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Two Columns of Authentic Promise Content */}
            <div className="promise-body-columns">
              <div className="promise-body-col">
                <p>{story.col1Para1}</p>
                <p>{story.col1Para2}</p>
              </div>
              <div className="promise-body-col">
                <p>{story.col2Para1}</p>
                <p>{story.col2Para2}</p>
              </div>
            </div>
          </div>

        </div>

        {/* ══ BLOCK 2: SOCIAL PROOF / PEOPLE LOVE ADHVAITHA ══ */}
        <div className="promise-social-block">
          
          {/* Top Banner Header */}
          <h3 className="promise-social-headline">
            TRUSTED BY OVER 50,000+ FAMILIES ACROSS INDIA & GLOBALLY
          </h3>

          <div className="promise-social-grid">
            
            {/* Left Column: 5 Stars + PEOPLE Love ADHVAITHA */}
            <div className="promise-love-badge">
              <div className="promise-stars">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <h4 className="promise-stamp-title">PEOPLE</h4>
              <p className="promise-stamp-sub">Love ADHVAITHA</p>
            </div>

            {/* Right Column: 5 Tall Vertical Photo Cards */}
            <div className="promise-cards-row">
              {SOCIAL_CARDS.map((card, idx) => (
                <div key={idx} className="promise-card-item">
                  <img src={card.src} alt={card.alt} />
                  <div className="promise-card-caption-overlay">
                    <span>{card.caption}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  </section>
  );
}
