'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Pickle Data mapped to Spiciness (1-10) and Tanginess (1-10)
const picklesData = [
  { id: 'mango-avakaya', name: 'Mango Avakaya', spice: 8, tang: 9, img: '/images/products/mango.png', color: '#C4603A', desc: 'Fiery, tangy, the undisputed king.' },
  { id: 'gongura', name: 'Gongura', spice: 7, tang: 10, img: '/images/products/gongura.png', color: '#2D5A27', desc: 'Deep earthy sourness, incredibly rich.' },
  { id: 'tomato', name: 'Tomato Pickle', spice: 5, tang: 7, img: '/images/products/tomato.png', color: '#D94833', desc: 'Sweet, tangy, mildly spiced everyday favorite.' },
  { id: 'lemon', name: 'Lemon Pickle', spice: 4, tang: 9, img: '/images/products/lemon.png', color: '#E8A820', desc: 'Zesty, mature, perfect for curd rice.' },
  { id: 'garlic', name: 'Garlic Pickle', spice: 6, tang: 5, img: '/images/products/garlic.png', color: '#A67B5B', desc: 'Pungent, roasted garlic cloves in fiery oil.' },
  { id: 'ginger', name: 'Ginger Pickle', spice: 7, tang: 6, img: '/images/products/ginger.png', color: '#B38B4D', desc: 'Sharp, sweet-heat perfection.' },
  { id: 'green-chili', name: 'Green Chili', spice: 10, tang: 4, img: '/images/products/green-chili.png', color: '#5A7D3C', desc: 'Pure fire. For the bravest souls only.' },
  { id: 'mixed-veg', name: 'Mixed Veg', spice: 3, tang: 5, img: '/images/products/mixed.png', color: '#C97A34', desc: 'Crunchy, mild, crowd-pleasing medley.' }
];

export default function PickleSommelier() {
  const [spice, setSpice] = useState(5);
  const [tang, setTang] = useState(5);
  const [activePickle, setActivePickle] = useState(picklesData[0]);
  const containerRef = useRef(null);

  // Find the closest pickle based on distance formula
  useEffect(() => {
    let closest = picklesData[0];
    let minDistance = Infinity;

    picklesData.forEach(p => {
      const distance = Math.sqrt(Math.pow(p.spice - spice, 2) + Math.pow(p.tang - tang, 2));
      if (distance < minDistance) {
        minDistance = distance;
        closest = p;
      }
    });

    setActivePickle(closest);
  }, [spice, tang]);

  // Handle mouse move for parallax effect
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    containerRef.current.style.setProperty('--mouse-x', x);
    containerRef.current.style.setProperty('--mouse-y', y);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: activePickle.color,
        transition: 'background 1s cubic-bezier(0.25, 1, 0.5, 1)',
        padding: '4rem 2rem',
        borderRadius: '32px',
        color: '#fff',
        '--mouse-x': 0,
        '--mouse-y': 0
      }}
    >
      {/* Dynamic Background Blob */}
      <div style={{
        position: 'absolute',
        width: '80vw', height: '80vw',
        background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
        top: '50%', left: '50%',
        transform: 'translate(calc(-50% + var(--mouse-x) * 100px), calc(-50% + var(--mouse-y) * 100px))',
        transition: 'transform 0.1s ease-out',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '1000px', gap: '3rem' }}>
        
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '0.5rem', textShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
            The Taste Finder
          </h2>
          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.1rem', opacity: 0.9, letterSpacing: '0.05em' }}>
            Adjust the sliders to find your perfect match.
          </p>
        </div>

        {/* Sliders Container */}
        <div style={{ 
          display: 'flex', gap: '4rem', width: '100%', maxWidth: '600px', 
          background: 'rgba(0,0,0,0.2)', padding: '2rem 3rem', borderRadius: '24px',
          backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {/* Spiciness Slider */}
          <div style={{ flex: 1 }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Lato, sans-serif', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>
              <span>Spiciness</span>
              <span>{spice}/10</span>
            </label>
            <input 
              type="range" min="1" max="10" value={spice} 
              onChange={(e) => setSpice(parseInt(e.target.value))}
              style={{ width: '100%', cursor: 'pointer', accentColor: '#fff' }}
            />
          </div>

          {/* Tanginess Slider */}
          <div style={{ flex: 1 }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Lato, sans-serif', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>
              <span>Tanginess</span>
              <span>{tang}/10</span>
            </label>
            <input 
              type="range" min="1" max="10" value={tang} 
              onChange={(e) => setTang(parseInt(e.target.value))}
              style={{ width: '100%', cursor: 'pointer', accentColor: '#fff' }}
            />
          </div>
        </div>

        {/* Result Display */}
        <div style={{ 
          display: 'flex', alignItems: 'center', gap: '3rem', width: '100%', 
          background: 'rgba(255,255,255,0.05)', padding: '3rem', borderRadius: '32px',
          border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
          transform: 'translateY(calc(var(--mouse-y) * 20px))',
          transition: 'transform 0.2s ease-out'
        }}>
          <div style={{ 
            width: '200px', height: '200px', position: 'relative', flexShrink: 0,
            transform: 'scale(1) rotate(calc(var(--mouse-x) * 15deg))',
            transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
            filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))'
          }} className="jar-image">
            <Image 
              src={activePickle.img} 
              alt={activePickle.name} 
              fill 
              style={{ objectFit: 'contain' }}
              key={activePickle.id} // Forces re-render for simple animation
            />
          </div>

          <div>
            <span style={{ 
              fontFamily: 'Lato, sans-serif', fontSize: '0.75rem', fontWeight: 900, 
              letterSpacing: '0.2em', textTransform: 'uppercase', 
              background: 'rgba(0,0,0,0.2)', padding: '0.4rem 0.8rem', borderRadius: '4px',
              display: 'inline-block', marginBottom: '1rem'
            }}>
              Your Match
            </span>
            <h3 style={{ 
              fontFamily: 'Playfair Display, serif', fontSize: '3rem', fontWeight: 900, 
              lineHeight: 1.1, marginBottom: '1rem', textShadow: '0 2px 10px rgba(0,0,0,0.2)' 
            }}>
              {activePickle.name}
            </h3>
            <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '400px', lineHeight: 1.6 }}>
              {activePickle.desc}
            </p>
            <Link href="/products" style={{ 
              display: 'inline-block', padding: '1rem 2.5rem', 
              background: '#fff', color: activePickle.color, 
              fontFamily: 'Lato, sans-serif', fontSize: '1rem', fontWeight: 900, 
              textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '50px',
              textDecoration: 'none', transition: 'transform 0.3s ease',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Get This Jar →
            </Link>
          </div>
        </div>

      </div>

      {/* Global styles for the jar animation */}
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.8) rotate(-10deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .jar-image img {
          animation: popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
      `}</style>
    </div>
  );
}
