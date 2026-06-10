'use client';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports hover (ignore mobile)
    if (window.matchMedia('(hover: none)').matches) return;

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e) => {
      // Check if hovering over interactive elements
      if (e.target.closest('a, button, input, select, textarea, .magnetic')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '40px', height: '40px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `translate(${position.x - 20}px, ${position.y - 20}px) scale(${isHovering ? 1.5 : 1})`,
          transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          border: '2px solid rgba(196,96,58,0.5)',
          background: isHovering ? 'rgba(196,96,58,0.1)' : 'transparent',
          mixBlendMode: 'difference' // Very high-end creative effect
        }}
      />
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '8px', height: '8px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          background: 'var(--terracotta)',
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
          transition: 'transform 0.05s linear'
        }}
      />
    </>
  );
}
