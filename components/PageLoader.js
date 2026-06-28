'use client';
import { useState, useEffect } from 'react';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // The main loading animation completes in 1.5s
    const timer1 = setTimeout(() => setLoading(false), 1500);
    // After splashOut animation (0.8s), unmount from DOM entirely
    const timer2 = setTimeout(() => setVisible(false), 2300); 

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes splashOutLoader {
          0% { transform: scale(1); opacity: 1; }
          40% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(5); opacity: 0; visibility: hidden; }
        }
        @keyframes dropInLoader {
          0% { transform: translateY(-100vh) rotate(-45deg); opacity: 0; }
          60% { transform: translateY(20px) rotate(15deg); opacity: 1; }
          80% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(0) rotate(0deg); opacity: 1; }
        }
        @keyframes popJarLoader {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: '#FF1E1E',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: !loading ? 'splashOutLoader 0.8s cubic-bezier(0.8, 0, 0.2, 1) forwards' : 'none',
        pointerEvents: 'all'
      }}>
        <div style={{ position: 'relative', width: '200px', height: '300px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          {/* The Bowl */}
          <div style={{
            width: '120px',
            height: '120px',
            position: 'absolute',
            bottom: '0',
            opacity: 0,
            animation: loading ? 'popJarLoader 0.4s ease-out forwards' : 'none',
            zIndex: 10,
            filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.4))'
          }}>
            <img src="/images/contact_loader/bowl.png" alt="Bowl" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          
          {/* Ingredient 1 */}
          <div style={{
            width: '50px',
            height: '50px',
            position: 'absolute',
            bottom: '45px',
            left: '45px',
            opacity: 0,
            animation: loading ? 'dropInLoader 0.5s ease-out 0.2s forwards' : 'none',
            zIndex: 20,
            filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))'
          }}>
            <img src="/images/contact_loader/ing1.png" alt="Ingredient 1" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          
          {/* Ingredient 2 */}
          <div style={{
            width: '55px',
            height: '55px',
            position: 'absolute',
            bottom: '50px', 
            left: '75px',
            opacity: 0,
            animation: loading ? 'dropInLoader 0.5s ease-out 0.35s forwards' : 'none',
            zIndex: 21,
            filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))'
          }}>
            <img src="/images/contact_loader/ing2.png" alt="Ingredient 2" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          
          {/* Ingredient 3 */}
          <div style={{
            width: '45px',
            height: '45px',
            position: 'absolute',
            bottom: '55px', 
            left: '55px',
            opacity: 0,
            animation: loading ? 'dropInLoader 0.5s ease-out 0.5s forwards' : 'none',
            zIndex: 22,
            filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))'
          }}>
            <img src="/images/contact_loader/ing3.png" alt="Ingredient 3" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>

          {/* Ingredient 4 */}
          <div style={{
            width: '45px',
            height: '45px',
            position: 'absolute',
            bottom: '45px', 
            left: '85px',
            opacity: 0,
            animation: loading ? 'dropInLoader 0.5s ease-out 0.65s forwards' : 'none',
            zIndex: 23,
            filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))'
          }}>
            <img src="/images/contact_loader/ing4.png" alt="Ingredient 4" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          
          {/* Loading Text */}
          <div style={{
            position: 'absolute',
            bottom: '-40px',
            fontFamily: 'Mouse Memoirs, sans-serif',
            fontSize: '2rem',
            color: '#FFF',
            letterSpacing: '2px',
            opacity: 0,
            animation: loading ? 'popJarLoader 0.4s ease-out 0.8s forwards' : 'none',
            textShadow: '0 4px 10px rgba(0,0,0,0.2)',
            whiteSpace: 'nowrap'
          }}>
            MIXING...
          </div>
        </div>
      </div>
    </>
  );
}
