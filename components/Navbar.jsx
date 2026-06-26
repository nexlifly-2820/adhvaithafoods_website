/**
 * @file Navbar.jsx
 * @description Main navigation bar for the Avdaitha Foods website.
 * Handles responsive navigation, scroll effects, and mobile menu toggling.
 * Cleaned up to remove cart and search functionality per product requirements.
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

/**
 * List of navigation links used in both desktop and mobile menus.
 * Centralized here to follow DRY principles.
 */
const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/how-we-make-it', label: 'Process' },
  { href: '/recipes', label: 'Recipes' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Effect to handle scroll state for navbar styling.
   * Changes appearance when scrolled past 40px.
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav
        id="main-navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          background: isScrolled ? 'rgba(253,245,230,0.96)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px) saturate(1.6)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(1.6)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(196,96,58,0.2)' : '1px solid transparent',
          boxShadow: isScrolled ? '0 4px 32px rgba(61,31,10,0.08)' : 'none',
        }}
      >
        {/* Animated top accent line */}
        <div
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, var(--terracotta), var(--turmeric), var(--forest-green), var(--turmeric), var(--terracotta))',
            backgroundSize: '200% 100%',
            animation: 'gradientShift 6s linear infinite',
          }}
        />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>

            {/* Logo Section */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <div
                style={{
                  width: '75px',
                  height: '75px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <img src="/images/Adhvaitha_foods_logo.png" alt="Adhvaitha Foods Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desk-nav">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    style={{ color: isScrolled ? 'var(--rich-brown)' : 'rgba(250,240,220,0.85)' }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                id="mobile-menu-btn"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isScrolled ? 'var(--rich-brown)' : 'var(--ivory)',
                  padding: '0.4rem',
                  display: 'none',
                  transition: 'transform 0.3s ease',
                }}
                className="mob-btn"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div
            style={{
              background: 'rgba(253,245,230,0.98)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(196,96,58,0.15)',
              padding: '1.25rem 1.5rem 1.75rem',
              animation: 'fadeInDown 0.35s ease',
            }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '0.8rem 0',
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 900,
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--rich-brown)',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(139,94,60,0.1)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--terracotta)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--rich-brown)')}
              >
                {link.label}
              </Link>
            ))}
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
