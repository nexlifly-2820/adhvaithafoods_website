'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/our-story', label: 'Our Story' },
    { href: '/how-we-make-it', label: 'Process' },
    { href: '/recipes', label: 'Recipes' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav
        id="main-navbar"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          background: scrolled
            ? 'rgba(253,245,230,0.96)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.6)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.6)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(196,96,58,0.2)'
            : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 32px rgba(61,31,10,0.08)' : 'none',
        }}
      >
        {/* Top accent line */}
        <div style={{
          height: '2px',
          background: 'linear-gradient(90deg, var(--terracotta), var(--turmeric), var(--forest-green), var(--turmeric), var(--terracotta))',
          backgroundSize: '200% 100%',
          animation: 'gradientShift 6s linear infinite',
        }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>

            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
              <div style={{
                width: '40px', height: '40px',
                background: 'var(--terracotta)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(196,96,58,0.35)',
                transition: 'transform 0.3s ease',
                flexShrink: 0,
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'rotate(-5deg) scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0) scale(1)'}
              >
                <span style={{ fontSize: '1.2rem' }}>🏺</span>
              </div>
              <div style={{ lineHeight: 1 }}>
                <div style={{
                  fontFamily: 'Playfair Display, serif',
                  fontWeight: 900, fontSize: '1.15rem',
                  letterSpacing: '0.08em',
                  color: scrolled ? 'var(--terracotta)' : 'var(--ivory)',
                  transition: 'color 0.4s ease',
                }}>AVDAITHA</div>
                <div style={{
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 900, fontSize: '0.5rem',
                  letterSpacing: '0.4em', textTransform: 'uppercase',
                  color: scrolled ? 'var(--forest-green)' : 'var(--turmeric)',
                  transition: 'color 0.4s ease',
                  marginTop: '1px',
                }}>FOODS</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desk-nav">
              {navLinks.map(link => (
                <Link
                  key={link.href} href={link.href}
                  className="nav-link"
                  style={{ color: scrolled ? 'var(--rich-brown)' : 'rgba(250,240,220,0.85)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                id="nav-search-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem',
                  color: scrolled ? 'var(--rich-brown)' : 'rgba(250,240,220,0.8)',
                  transition: 'color 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--terracotta)'; e.currentTarget.style.transform = 'scale(1.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = scrolled ? 'var(--rich-brown)' : 'rgba(250,240,220,0.8)'; e.currentTarget.style.transform = 'scale(1)'; }}
                className="desk-nav"
              >
                <Search size={19} />
              </button>

              <Link
                href="/cart"
                id="nav-cart-btn"
                aria-label="Cart"
                style={{
                  position: 'relative',
                  color: scrolled ? 'var(--rich-brown)' : 'rgba(250,240,220,0.8)',
                  padding: '0.4rem', textDecoration: 'none',
                  transition: 'color 0.3s ease, transform 0.3s ease',
                  display: 'flex',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--terracotta)'; e.currentTarget.style.transform = 'scale(1.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = scrolled ? 'var(--rich-brown)' : 'rgba(250,240,220,0.8)'; e.currentTarget.style.transform = 'scale(1)'; }}
                className="desk-nav"
              >
                <ShoppingCart size={19} />
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute', top: 0, right: 0,
                    background: 'var(--terracotta)', color: '#fff',
                    width: '15px', height: '15px', borderRadius: '50%',
                    fontSize: '0.6rem', fontWeight: 900,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{cartCount}</span>
                )}
              </Link>

              <Link
                href="/products"
                id="nav-order-btn"
                className="btn btn-terra desk-nav"
                style={{ fontSize: '0.72rem', padding: '0.65rem 1.25rem', borderRadius: '4px' }}
              >
                Order Now
              </Link>

              {/* Mobile menu toggle */}
              <button
                id="mobile-menu-btn"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: scrolled ? 'var(--rich-brown)' : 'var(--ivory)',
                  padding: '0.4rem', display: 'none',
                  transition: 'transform 0.3s ease',
                }}
                className="mob-btn"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div style={{
            background: 'rgba(253,245,230,0.98)', backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(196,96,58,0.15)',
            padding: '1rem 2rem',
            animation: 'fadeInDown 0.3s ease',
          }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '0.75rem' }}>
              <input
                type="text" placeholder="Search pickles, recipes..."
                autoFocus
                style={{
                  flex: 1, padding: '0.7rem 1rem',
                  border: '1.5px solid rgba(196,96,58,0.3)', borderRadius: '6px',
                  fontFamily: 'Lato, sans-serif', fontSize: '0.95rem',
                  background: '#fff', color: 'var(--rich-brown)', outline: 'none',
                }}
              />
              <button className="btn btn-terra" style={{ fontSize: '0.78rem', padding: '0.7rem 1.25rem' }}>Search</button>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{
            background: 'rgba(253,245,230,0.98)', backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(196,96,58,0.15)',
            padding: '1.25rem 1.5rem 1.75rem',
            animation: 'fadeInDown 0.35s ease',
          }}>
            {navLinks.map(link => (
              <Link
                key={link.href} href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block', padding: '0.8rem 0',
                  fontFamily: 'Lato, sans-serif', fontWeight: 900,
                  fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--rich-brown)', textDecoration: 'none',
                  borderBottom: '1px solid rgba(139,94,60,0.1)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--terracotta)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--rich-brown)'}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ marginTop: '1.25rem' }}>
              <Link href="/products" className="btn btn-terra" style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem' }}>
                <ShoppingCart size={15} /> Order Now
              </Link>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        @media (max-width: 960px) {
          .desk-nav { display: none !important; }
          .mob-btn  { display: flex !important; }
        }
        @media (min-width: 961px) {
          .mob-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
