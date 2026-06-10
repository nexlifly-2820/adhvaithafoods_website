'use client';
import { useState, useRef } from 'react';

const mixingData = {
  rice: { name: 'Avakaya Rice', emoji: '🍚', color: '#C4603A', desc: 'A perfectly balanced mix of hot rice, ghee, and spicy mango pickle.', match: 'avakaya-rice' },
  chicken: { name: 'Gongura Chicken', emoji: '🍗', color: '#2D5A27', desc: 'Fiery chicken infused with the earthy sourness of Gongura leaves.', match: 'gongura-chicken' },
  paratha: { name: 'Pickle Paratha', emoji: '🫓', color: '#8B5E3C', desc: 'Flaky bread stuffed with tangy pickle spices.', match: 'pickle-paratha' }
};

export default function InteractiveMixer() {
  const [draggedItem, setDraggedItem] = useState(null);
  const [result, setResult] = useState(null);
  const [isOver, setIsOver] = useState(false);
  const bowlRef = useRef(null);

  const handleDragStart = (e, itemKey) => {
    setDraggedItem(itemKey);
    // Needed for Firefox
    e.dataTransfer.setData('text/plain', itemKey);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isOver) setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    if (draggedItem && mixingData[draggedItem]) {
      setResult(mixingData[draggedItem]);
      
      // Trigger a confetti/burst effect on the bowl
      if (bowlRef.current) {
        bowlRef.current.style.transform = 'scale(1.2)';
        setTimeout(() => {
          if (bowlRef.current) bowlRef.current.style.transform = 'scale(1)';
        }, 300);
      }
    }
    setDraggedItem(null);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--forest-green), #1b3617)',
      borderRadius: '32px',
      padding: '4rem 2rem',
      color: '#fff',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      boxShadow: '0 30px 60px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
      position: 'relative', overflow: 'hidden'
    }}>
      
      {/* Decorative background elements */}
      <div style={{ position: 'absolute', top: '-50px', right: '-50px', fontSize: '15rem', opacity: 0.05, transform: 'rotate(15deg)', pointerEvents: 'none' }}>🌶️</div>
      <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', fontSize: '15rem', opacity: 0.05, transform: 'rotate(-15deg)', pointerEvents: 'none' }}>🍋</div>

      <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '0.5rem' }}>The Recipe Mixer</h2>
        <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.2rem', opacity: 0.8, letterSpacing: '0.05em' }}>
          Drag a base ingredient into the magic bowl to discover a recipe!
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 1, width: '100%', maxWidth: '1000px' }}>
        
        {/* Ingredients Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, minWidth: '250px' }}>
          <h3 style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--turmeric)', textAlign: 'center', marginBottom: '1rem' }}>Base Ingredients</h3>
          
          {Object.entries(mixingData).map(([key, data]) => (
            <div 
              key={key}
              draggable
              onDragStart={(e) => handleDragStart(e, key)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '16px', padding: '1rem 1.5rem',
                display: 'flex', alignItems: 'center', gap: '1rem',
                cursor: 'grab', backdropFilter: 'blur(10px)',
                transition: 'transform 0.2s, background 0.2s',
                opacity: result && result.match === data.match ? 0.3 : 1
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
            >
              <span style={{ fontSize: '2rem' }}>{data.emoji}</span>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700 }}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
            </div>
          ))}
        </div>

        {/* Plus Sign */}
        <div style={{ fontSize: '2rem', color: 'var(--turmeric)', opacity: 0.5 }}>+</div>

        {/* The Magic Bowl */}
        <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '300px' }}>
          <h3 style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--terracotta)', textAlign: 'center', marginBottom: '1rem' }}>The Magic Bowl</h3>
          
          <div 
            ref={bowlRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              width: '250px', height: '250px',
              borderRadius: '50%',
              background: result ? result.color : (isOver ? 'rgba(196,96,58,0.3)' : 'rgba(0,0,0,0.3)'),
              border: `4px dashed ${isOver || result ? 'var(--turmeric)' : 'rgba(255,255,255,0.2)'}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              boxShadow: result ? `0 0 50px ${result.color}88` : (isOver ? '0 0 30px rgba(196,96,58,0.5)' : 'none'),
              cursor: result ? 'default' : 'pointer',
              position: 'relative'
            }}
          >
            {result ? (
              <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s forwards' }}>
                <div style={{ fontSize: '4rem', marginBottom: '0.5rem', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.3))' }}>✨</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 900, lineHeight: 1.1 }}>{result.name}</div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', opacity: isOver ? 1 : 0.5, transition: 'opacity 0.2s' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🥣</div>
                <div style={{ fontFamily: 'Lato, sans-serif', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Drop Here</div>
              </div>
            )}
          </div>

          {result && (
            <div style={{ marginTop: '2rem', textAlign: 'center', animation: 'fadeInUp 0.5s forwards' }}>
              <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.1rem', maxWidth: '300px', marginBottom: '1.5rem', opacity: 0.9 }}>
                {result.desc}
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <a href={`#recipe-${result.match}`} style={{
                  padding: '0.8rem 2rem', background: '#fff', color: result.color,
                  borderRadius: '50px', textDecoration: 'none', fontFamily: 'Lato, sans-serif',
                  fontWeight: 900, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                }}>See Full Recipe</a>
                
                <button onClick={() => setResult(null)} style={{
                  padding: '0.8rem', background: 'rgba(255,255,255,0.1)', color: '#fff',
                  border: 'none', borderRadius: '50%', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }} title="Reset">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
