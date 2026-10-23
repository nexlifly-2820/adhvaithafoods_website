'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Megaphone Doodle with "Pickles!" in bold retro white script
const MegaphoneDoodle = () => (
  <div className="megaphone-box" aria-hidden="true">
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="megaphone-svg">
      {/* Sound radiating lines */}
      <path d="M185 40 C 202 55, 202 85, 185 100" stroke="#1E6B3E" strokeWidth="6" strokeLinecap="round" />
      <path d="M204 28 C 228 48, 228 92, 204 112" stroke="#1E6B3E" strokeWidth="6" strokeLinecap="round" />
      <line x1="184" y1="18" x2="208" y2="8" stroke="#1E6B3E" strokeWidth="5.5" strokeLinecap="round" />
      <line x1="186" y1="122" x2="212" y2="132" stroke="#1E6B3E" strokeWidth="5.5" strokeLinecap="round" />

      {/* Megaphone body */}
      <path
        d="M65 52 L154 26 C 160 24, 164 28, 164 34 L164 104 C 164 110, 160 114, 154 112 L65 86 Z"
        fill="#1E6B3E"
      />
      {/* Speaker bell rim */}
      <ellipse cx="158" cy="69" rx="8" ry="43" fill="#175632" stroke="#1E6B3E" strokeWidth="2" />

      {/* Mouthpiece */}
      <path d="M46 58 L65 54 L65 84 L46 80 Z" fill="#1E6B3E" />
      <rect x="32" y="63" width="16" height="13" rx="4" fill="#175632" />

      {/* Handle */}
      <path
        d="M72 84 L72 116 C 72 124, 82 128, 92 128 C 102 128, 104 122, 104 114 L104 88"
        stroke="#1E6B3E"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />

      {/* "Pickles!" in bold retro white cursive */}
      <text
        x="115"
        y="76"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="'Caveat', cursive"
        fontSize="32"
        fontWeight="bold"
        transform="rotate(-4 115 76)"
      >
        Pickles!
      </text>
    </svg>
  </div>
);

// Retro Line-Art Pickle Jar Doodle
const JarDoodle = () => (
  <div className="jar-box" aria-hidden="true">
    <svg viewBox="0 0 160 210" fill="none" xmlns="http://www.w3.org/2000/svg" className="jar-svg">
      <g transform="rotate(-6 80 105)" stroke="#1E6B3E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        {/* Lid */}
        <rect x="36" y="16" width="88" height="17" rx="5" fill="#F6DA77" />
        <line x1="46" y1="21" x2="46" y2="28" />
        <line x1="56" y1="21" x2="56" y2="28" />
        <line x1="66" y1="21" x2="66" y2="28" />
        <line x1="76" y1="21" x2="76" y2="28" />
        <line x1="86" y1="21" x2="86" y2="28" />
        <line x1="96" y1="21" x2="96" y2="28" />
        <line x1="106" y1="21" x2="106" y2="28" />
        <line x1="114" y1="21" x2="114" y2="28" />

        {/* Neck */}
        <path d="M42 33 L42 43 L118 43 L118 33" />

        {/* Jar Body */}
        <path
          d="M42 43 C 24 50, 18 64, 20 92 L 24 164 C 26 182, 40 192, 80 192 C 120 192, 134 182, 136 164 L 140 92 C 142 64, 136 50, 118 43 Z"
          fill="#F6DA77"
        />

        {/* Label */}
        <rect x="36" y="82" width="88" height="68" rx="4" fill="#FFFFFF" stroke="#1E6B3E" strokeWidth="2.8" />
        <text
          x="80"
          y="112"
          textAnchor="middle"
          fill="#1E6B3E"
          fontFamily="'Bebas Neue', sans-serif"
          fontSize="18"
          letterSpacing="0.08em"
        >
          ADHVAITHA
        </text>
        <line x1="44" y1="120" x2="116" y2="120" stroke="#1E6B3E" strokeWidth="1.6" />
        <text
          x="80"
          y="136"
          textAnchor="middle"
          fill="#1E6B3E"
          fontFamily="'Caveat', cursive"
          fontSize="15"
          fontWeight="bold"
        >
          Heirloom Recipe
        </text>

        {/* Shadow Hatching */}
        <line x1="27" y1="125" x2="33" y2="120" strokeWidth="2.8" />
        <line x1="28" y1="138" x2="34" y2="133" strokeWidth="2.8" />
        <line x1="29" y1="151" x2="35" y2="146" strokeWidth="2.8" />
        <line x1="31" y1="164" x2="37" y2="159" strokeWidth="2.8" />
      </g>
    </svg>
  </div>
);

// Retro Line-Art Mango/Pickle Doodle
const PickleDoodle = () => (
  <div className="pickle-box" aria-hidden="true">
    <svg viewBox="0 0 220 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="pickle-svg">
      <g transform="rotate(10 110 65)" stroke="#1E6B3E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        {/* Pickle Outline */}
        <path
          d="M26 68 C 22 42, 48 20, 90 22 C 145 24, 190 36, 196 62 C 202 88, 162 104, 112 100 C 65 96, 30 89, 26 68 Z"
          fill="#F6DA77"
        />
        {/* Pickle bumps */}
        <circle cx="52" cy="46" r="2.2" fill="#1E6B3E" />
        <circle cx="88" cy="41" r="2.2" fill="#1E6B3E" />
        <circle cx="126" cy="49" r="2.2" fill="#1E6B3E" />
        <circle cx="160" cy="56" r="2.2" fill="#1E6B3E" />
        <circle cx="72" cy="68" r="2.2" fill="#1E6B3E" />
        <circle cx="110" cy="74" r="2.2" fill="#1E6B3E" />
        <circle cx="145" cy="78" r="2.2" fill="#1E6B3E" />

        {/* Vintage texture streaks */}
        <path d="M42 72 C 58 78, 80 80, 102 84" stroke="#1E6B3E" strokeWidth="2.5" strokeDasharray="3 4" />
        <path d="M96 35 C 122 38, 150 44, 172 52" stroke="#1E6B3E" strokeWidth="2.5" strokeDasharray="3 4" />
      </g>
    </svg>
  </div>
);

export default function AboutPage() {
  return (
    <div className="about-page-root">
      <Navbar />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@600;700&family=Outfit:wght@400;500;600;700;800&display=swap');

        :root {
          --sp-yellow: #F6DA77;
          --sp-black: #141414;
          --sp-green: #1E6B3E;
          --sp-card-bg: #FFFFFF;
          --font-head: 'Bebas Neue', 'Oswald', sans-serif;
          --font-script: 'Caveat', cursive;
          --font-body: 'Outfit', sans-serif;
        }

        .about-page-root {
          background-color: var(--sp-yellow);
          color: var(--sp-black);
          font-family: var(--font-body);
          min-height: 100vh;
          overflow-x: hidden;
        }

        .story-wrapper {
          max-width: 1320px;
          margin: 0 auto;
          padding: 3.5rem 2.5rem 6rem;
        }

        @media (max-width: 768px) {
          .story-wrapper {
            padding: 2rem 1.25rem 4rem;
          }
        }

        /* ─── SECTION 1: HERO (TWO COLUMNS) ─── */
        .hero-section {
          padding-top: clamp(2rem, 4vw, 4rem);
          padding-bottom: clamp(3rem, 5vw, 5rem);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: clamp(2rem, 5vw, 5rem);
          align-items: flex-start;
        }

        .hero-left-col {
          display: flex;
          flex-direction: column;
          gap: clamp(1.8rem, 3vw, 3rem);
        }

        .main-headline {
          font-family: var(--font-head);
          font-size: clamp(3.4rem, 6.8vw, 7.2rem);
          line-height: 0.95;
          letter-spacing: 0.01em;
          color: var(--sp-black);
          margin: 0;
          text-transform: uppercase;
        }

        .main-headline .headline-row {
          display: block;
        }

        .brand-green-highlight {
          position: relative;
          display: inline-block;
          color: var(--sp-green);
          font-family: var(--font-script);
          font-size: clamp(3.8rem, 7.5vw, 7.8rem);
          font-weight: 700;
          letter-spacing: 0;
          margin-left: 0.2rem;
          white-space: nowrap;
          transform: rotate(-1.5deg);
        }

        .brand-green-highlight .tm {
          font-size: 0.32em;
          vertical-align: super;
          font-family: var(--font-body);
          font-weight: 800;
          color: var(--sp-green);
          margin-left: 2px;
        }

        .brush-underline {
          position: absolute;
          left: -3%;
          bottom: -15px;
          width: 106%;
          height: 22px;
          pointer-events: none;
        }

        .hero-intro-text {
          font-size: clamp(1.15rem, 1.4vw, 1.35rem);
          line-height: 1.62;
          color: #1A1A1A;
          font-weight: 500;
          max-width: 540px;
          margin: 0;
        }

        .hero-right-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          position: relative;
        }

        .megaphone-box {
          width: clamp(150px, 16vw, 220px);
          transform: rotate(4deg);
          margin-bottom: 1.5rem;
          animation: floatSlight 4s ease-in-out infinite alternate;
        }

        @keyframes floatSlight {
          0% { transform: rotate(4deg) translateY(0); }
          100% { transform: rotate(8deg) translateY(-6px); }
        }

        .megaphone-svg {
          width: 100%;
          height: auto;
          filter: drop-shadow(0 6px 14px rgba(0,0,0,0.08));
        }

        .strongman-img {
          width: 100%;
          max-width: clamp(280px, 28vw, 400px);
          height: auto;
          mix-blend-mode: multiply;
          filter: contrast(1.06);
          user-select: none;
          display: block;
        }

        /* ─── SECTION 2: ADVENTURE & QUOTE ─── */
        .adventure-section {
          padding: clamp(3rem, 6vw, 5.5rem) 0;
        }

        .adventure-headline {
          font-family: var(--font-head);
          font-size: clamp(2.6rem, 5vw, 5rem);
          line-height: 1.02;
          color: var(--sp-black);
          text-transform: uppercase;
          margin: 0 0 clamp(2.5rem, 4vw, 3.8rem) 0;
          max-width: 1100px;
        }

        .green-script {
          font-family: var(--font-script);
          color: var(--sp-green);
          font-size: 1.16em;
          font-weight: 700;
          text-transform: none;
          display: inline-block;
          margin: 0 0.2rem;
          transform: rotate(-1deg);
        }

        .adventure-grid {
          display: grid;
          grid-template-columns: 1fr 1.05fr;
          gap: clamp(2rem, 5vw, 5rem);
          align-items: center;
        }

        .adventure-body {
          font-size: clamp(1.1rem, 1.35vw, 1.28rem);
          line-height: 1.65;
          color: #1A1A1A;
          font-weight: 500;
          max-width: 500px;
          margin: 0;
        }

        .white-quote-card {
          background-color: var(--sp-card-bg);
          border-radius: clamp(22px, 3vw, 30px);
          padding: clamp(2.2rem, 3.8vw, 3.4rem);
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.06);
          transition: transform 0.3s ease;
        }

        .white-quote-card:hover {
          transform: translateY(-3px);
        }

        .quote-text {
          font-size: clamp(1.15rem, 1.4vw, 1.35rem);
          line-height: 1.62;
          color: #181818;
          font-weight: 500;
          margin: 0;
        }

        .green-quote {
          font-family: var(--font-script);
          font-size: 1.34em;
          color: var(--sp-green);
          font-weight: 700;
          display: inline;
        }

        /* ─── SECTION 3: CRUSADE & FRAMED PHOTO ─── */
        .crusade-section {
          padding: clamp(3rem, 6vw, 6rem) 0;
        }

        .crusade-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr 0.95fr;
          gap: clamp(2rem, 3.5vw, 4rem);
          align-items: center;
        }

        .crusade-left {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .jar-box {
          width: 95px;
          margin-bottom: 0.5rem;
          transform: rotate(-3deg);
        }

        .jar-svg {
          width: 100%;
          height: auto;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.06));
        }

        .crusade-text {
          font-size: clamp(1.05rem, 1.25vw, 1.22rem);
          line-height: 1.65;
          color: #1A1A1A;
          font-weight: 500;
          margin: 0;
        }

        .crusade-text strong {
          color: #000;
          font-weight: 700;
        }

        .framed-photo-container {
          display: flex;
          justify-content: center;
        }

        .framed-photo {
          width: 100%;
          max-width: 420px;
          aspect-ratio: 4 / 4.5;
          object-fit: cover;
          border-radius: clamp(22px, 3vw, 32px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
          display: block;
          transition: transform 0.3s ease;
        }

        .framed-photo:hover {
          transform: scale(1.02);
        }

        .crusade-right {
          display: flex;
          align-items: center;
        }

        .punchline-title {
          font-family: var(--font-head);
          font-size: clamp(2.3rem, 3.6vw, 3.7rem);
          line-height: 1.04;
          color: var(--sp-black);
          text-transform: uppercase;
          margin: 0;
        }

        /* ─── SECTION 4: WELLNESS PROMISE & FARMER ALLIES ─── */
        .wellness-section {
          padding: clamp(3rem, 6vw, 6rem) 0 2rem;
        }

        .wellness-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: clamp(2rem, 5vw, 5rem);
          align-items: center;
        }

        .wellness-right {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .wellness-body {
          font-size: clamp(1.1rem, 1.35vw, 1.28rem);
          line-height: 1.65;
          color: #1A1A1A;
          font-weight: 500;
          margin: 0;
        }

        .pickle-box {
          width: clamp(140px, 16vw, 210px);
          align-self: flex-end;
          transform: rotate(-2deg);
        }

        .pickle-svg {
          width: 100%;
          height: auto;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.06));
        }

        /* ─── BOTTOM CTA STRIP ─── */
        .bottom-cta {
          margin-top: clamp(4rem, 6vw, 6rem);
          text-align: center;
          padding: clamp(2.5rem, 4vw, 3.5rem) 2rem;
          background: rgba(30, 107, 62, 0.08);
          border-radius: 28px;
          border: 2px dashed var(--sp-green);
        }

        .cta-heading {
          font-family: var(--font-head);
          font-size: clamp(2.4rem, 4vw, 4rem);
          letter-spacing: 0.02em;
          color: var(--sp-green);
          margin: 0 0 1rem;
          text-transform: uppercase;
        }

        .cta-text {
          font-size: clamp(1.05rem, 1.25vw, 1.25rem);
          color: #222;
          max-width: 620px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background-color: var(--sp-green);
          color: #FFFFFF;
          font-family: var(--font-head);
          font-size: clamp(1.4rem, 1.8vw, 1.8rem);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 0.85rem 2.6rem;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 10px 24px rgba(30, 107, 62, 0.35);
          transition: all 0.25s ease;
        }

        .cta-btn:hover {
          background-color: #175632;
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(30, 107, 62, 0.45);
        }

        /* ─── RESPONSIVE BREAKPOINTS ─── */
        @media (max-width: 1024px) {
          .crusade-grid {
            grid-template-columns: 1fr 1fr;
          }
          .crusade-right {
            grid-column: 1 / -1;
            text-align: center;
            margin-top: 1rem;
          }
          .punchline-title {
            max-width: 100%;
          }
        }

        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .hero-right-col {
            align-items: center;
          }
          .adventure-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .crusade-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .wellness-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
      `}</style>

      <main className="story-wrapper">
        {/* ═══════════ SECTION 1: HERO (TWO-COLUMN SUCKERPUNCH MATCH) ═══════════ */}
        <section className="hero-section">
          <div className="hero-grid">
            {/* Left Column: Headline + Intro Story */}
            <div className="hero-left-col">
              <h1 className="main-headline">
                <span className="headline-row">FLAVOR SO GOOD IT HITS</span>
                <span className="headline-row">
                  YOU LIKE{' '}
                  <span className="brand-green-highlight">
                    ADHVAITHA FOODS<span className="tm">™</span>
                    {/* Brush underline flourish */}
                    <svg className="brush-underline" viewBox="0 0 360 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4 14 C 70 4, 180 3, 350 11 C 280 18, 140 18, 20 18"
                        stroke="#1E6B3E"
                        strokeWidth="5.5"
                        strokeLinecap="round"
                        fill="#1E6B3E"
                      />
                    </svg>
                  </span>
                </span>
              </h1>

              <p className="hero-intro-text">
                In 1970, Ammayya, the Founder & Master Blender of Adhvaitha Foods, said “see ya later” to everyday commercial compromises to don the heirloom kitchen apron for her family, handcrafting sun-cured pickles in traditional ceramic Bharanis with zero chemical preservatives and pure cold-pressed oils.
              </p>
            </div>

            {/* Right Column: Megaphone + Vintage Strongman */}
            <div className="hero-right-col">
              <MegaphoneDoodle />
              <img
                src="/images/cutouts/strongman.png"
                alt="Adhvaitha Flavor Strongman"
                className="strongman-img"
              />
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 2: ADVENTURE & QUOTE CARD ═══════════ */}
        <section className="adventure-section">
          <h2 className="adventure-headline">
            And what a ride it was—<span className="green-script">a heritage-packed adventure</span> of epic proportions!
          </h2>

          <div className="adventure-grid">
            <p className="adventure-body">
              Juggling family dynamics like a seasoned pro, Ammayya spilled the beans on the authentic health perks of sun-curing and whipped up her own Signature Andhra 7-Spice Blend — balancing fiery Guntur chillies, stone-crushed mustard, and fragrant wood-pressed sesame oil.
            </p>

            <div className="white-quote-card">
              <p className="quote-text">
                Cue a tasting session with her best friends and village elders, who went wild after just one bite, proclaiming,{' '}
                <span className="green-quote">“These pickles hit you with the true soul of Andhra!”</span>, and our company was born.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 3: CRUSADE & FRAMED KITCHEN PHOTO ═══════════ */}
        <section className="crusade-section">
          <div className="crusade-grid">
            {/* Left Column: Line Art Jar + Narrative */}
            <div className="crusade-left">
              <JarDoodle />
              <p className="crusade-text">
                Ammayya then set out on a tasty crusade to spread{' '}
                <span className="green-script" style={{ fontSize: '1.25em' }}>the miraculous wonders of pickles</span>{' '}
                far and wide. Introducing pure, chemical-free Andhra avakaya, tangy gongura, and aromatic masalas to households seeking true grandmother authenticity.
              </p>
              <p className="crusade-text">
                As a salute to food lovers everywhere, we handcrafted our pickles with unyielding care. These pickles are the perfect way to elevate every meal.{' '}
                <strong>100% natural, preservative-free, small-batch stone-ground pickles</strong> that bring warmth and unforgettable tang to any dining table.
              </p>
            </div>

            {/* Middle Column: Framed Grandmother Kitchen Photo */}
            <div className="framed-photo-container">
              <img
                src="/images/grandmother_kitchen.png"
                alt="Ammayya in the traditional kitchen stone-grinding spices"
                className="framed-photo"
              />
            </div>

            {/* Right Column: Punchline Headline */}
            <div className="crusade-right">
              <h3 className="punchline-title">
                AND THERE YOU HAVE IT, FOLKS—OUR FOUNDING HERITAGE OF FLAVOR & TRADITION!
              </h3>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 4: WELLNESS PROMISE & ALLIES ═══════════ */}
        <section className="wellness-section">
          <div className="wellness-grid">
            {/* Left Column: White Card on Health Perks */}
            <div className="white-quote-card">
              <p className="quote-text">
                To top it all off— Ammayya’s knowledge of the{' '}
                <span className="green-quote">power of slow sun-curing and wood-pressed oil</span>{' '}
                for natural digestion, balancing gut wellness, and providing pure culinary immunity became a reality.
              </p>
            </div>

            {/* Right Column: Allies Narrative + Pickle Doodle */}
            <div className="wellness-right">
              <p className="wellness-body">
                Enter stage left: Our revered rural farming partners and family team, allies in Andhra authenticity, who helped bring our heritage Avakaya, stone-ground podis, and handcrafted delights to homes across the nation, ready to power up every single meal with pure homemade punch.
              </p>
              <PickleDoodle />
            </div>
          </div>
        </section>

        {/* ═══════════ BOTTOM CALL TO ACTION ═══════════ */}
        <div className="bottom-cta">
          <h4 className="cta-heading">Ready For That Unforgettable Flavor Hit?</h4>
          <p className="cta-text">
            Explore our heirloom Andhra pickles, stone-ground spice powders, and crunchy traditional savouries — delivered straight from grandmother’s kitchen to your doorstep.
          </p>
          <Link href="/products" className="cta-btn">
            Taste The Tradition →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
