/**
 * @file Navbar.jsx
 * @description Main navigation bar for the Avdaitha Foods website.
 * Handles responsive navigation, scroll effects, and mobile menu toggling.
 * Cleaned up to remove cart and search functionality per product requirements.
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

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

const PRODUCT_CATEGORIES = [
  { title: 'Prepared Foods', sub: 'Traditional Pickles', img: '/images/products/mango-pickle.jpg', href: '/products?category=Prepared%20Foods#shop' },
  { title: 'Salts, Spices, Soups', sub: 'Aromatic Masalas & Podis', img: '/images/products/biryani-masala.jpg', href: '/products?category=Salts,%20spices,%20soups#shop' },
  { title: 'Ready-to-Eat Savouries', sub: 'Crunchy Snacks & Namkeen', img: '/images/products/chakodi.jpg', href: '/products?category=Ready-to-eat%20savouries#shop' },
  { title: 'Indian Sweets & Snacks', sub: 'Traditional Sweets & Laddus', img: '/images/products/Dry_Fruits_Laddu_(premium_dry_fruits_laddu).jpeg', href: '/products?category=Indian%20Sweets%20%26%20Snacks#shop' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '120px' }}>

            {/* Logo Section */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <div
                style={{
                  width: '110px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <img src="/images/logo.svg" alt="Adhvaitha Foods Logo" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desk-nav">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                const isProducts = link.label === 'Products';
                
                return (
                  <div
                    key={link.href}
                    style={{ position: 'relative', padding: '1rem 0' }}
                    onMouseEnter={() => isProducts && setActiveDropdown('Products')}
                    onMouseLeave={() => isProducts && setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      {link.label}
                      {isProducts && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: activeDropdown === 'Products' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                          <path d="M6 9l6 6 6-6"/>
                        </svg>
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    {isProducts && activeDropdown === 'Products' && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '0',
                          marginTop: '0',
                          width: '320px',
                          background: '#FDF8E8',
                          borderRadius: '8px',
                          boxShadow: '0 10px 30px rgba(61,31,10,0.1)',
                          border: '1px solid rgba(139,94,60,0.15)',
                          padding: '0.5rem 0',
                          zIndex: 1000,
                        }}
                      >
                         {PRODUCT_CATEGORIES.map((cat, i) => (
                           <Link key={i} href={cat.href} onClick={() => setActiveDropdown(null)} style={{ textDecoration: 'none' }}>
                             <div 
                               style={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 padding: '0.75rem 1rem',
                                 gap: '1rem',
                                 transition: 'background 0.2s',
                               }}
                               onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(139,94,60,0.08)'}
                               onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                             >
                               <div style={{ width: '48px', height: '48px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, background: '#fff', border: '1px solid rgba(139,94,60,0.1)' }}>
                                 <img 
                                   src={cat.img} 
                                   style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                   onError={(e) => { e.target.onerror = null; e.target.src = '/images/logo.svg'; }} 
                                   alt={cat.title} 
                                 />
                               </div>
                               <div>
                                 <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--rich-brown)', marginBottom: '0.1rem', fontFamily: 'var(--font-montserrat), sans-serif', letterSpacing: '-0.01em' }}>{cat.title}</div>
                                 <div style={{ fontSize: '0.8rem', color: 'var(--aged-wood)', fontFamily: 'var(--font-lato), sans-serif' }}>{cat.sub}</div>
                               </div>
                             </div>
                           </Link>
                         ))}
                      </div>
                    )}
                  </div>
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
              <div key={link.href}>
                <div style={{ display: 'flex', alignItems: 'center', borderBottom: link.label !== 'Products' ? '1px solid rgba(139,94,60,0.1)' : 'none' }}>
                  <Link
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
                      transition: 'color 0.2s ease',
                      flexGrow: 1,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--terracotta)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--rich-brown)')}
                  >
                    {link.label}
                  </Link>
                  {link.label === 'Products' && (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileProductsOpen(!isMobileProductsOpen);
                      }}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        padding: '0.5rem', 
                        color: 'var(--rich-brown)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <ChevronDown size={18} style={{ transform: isMobileProductsOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
                    </button>
                  )}
                </div>
                
                {/* Mobile Submenu for Products */}
                {link.label === 'Products' && isMobileProductsOpen && (
                  <div style={{ paddingLeft: '1rem', borderBottom: '1px solid rgba(139,94,60,0.1)', paddingBottom: '0.5rem' }}>
                    {PRODUCT_CATEGORIES.map((cat, i) => (
                      <Link
                        key={i}
                        href={cat.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{ textDecoration: 'none' }}
                      >
                        <div 
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0.6rem 0',
                            gap: '0.8rem',
                          }}
                        >
                          <div style={{ width: '42px', height: '42px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, background: '#fff', border: '1px solid rgba(139,94,60,0.1)' }}>
                            <img 
                              src={cat.img} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                              onError={(e) => { e.target.onerror = null; e.target.src = '/images/logo.svg'; }} 
                              alt={cat.title} 
                            />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--rich-brown)', marginBottom: '0.1rem', fontFamily: 'var(--font-montserrat), sans-serif', letterSpacing: '-0.01em' }}>{cat.title}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--aged-wood)', fontFamily: 'var(--font-lato), sans-serif', textTransform: 'none', letterSpacing: '0' }}>{cat.sub}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap');

        .nav-link {
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          font-size: 1.25rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #3b1605;
          text-decoration: none;
          position: relative;
          transition: color 0.2s ease;
        }

        .nav-link:hover, .nav-link.active {
          color: #a4231b;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 4px;
          background-color: #a4231b;
        }

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
