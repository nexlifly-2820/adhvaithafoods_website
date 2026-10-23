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
  { href: '/recipes', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const PRODUCT_CATEGORIES = [
  { title: 'PREPARED FOODS', sub: 'Traditional Pickles', img: '/images/products/mango-pickle.jpg', href: '/products?category=Prepared%20Foods#shop', iconBg: '#FFF3E0' },
  { title: 'SALTS, SPICES, SOUPS', sub: 'Aromatic Masalas & Podis', img: '/images/products/biryani-masala.jpg', href: '/products?category=Salts,%20spices,%20soups#shop', iconBg: '#FFF8E1' },
  { title: 'READY-TO-EAT SAVOURIES', sub: 'Crunchy Snacks & Namkeen', img: '/images/products/chakodi.jpg', href: '/products?category=Ready-to-eat%20savouries#shop', iconBg: '#E8F5E9' },
  { title: 'INDIAN SWEETS & SNACKS', sub: 'Traditional Sweets & Laddus', img: '/images/products/Dry_Fruits_Laddu_(premium_dry_fruits_laddu).jpeg', href: '/products?category=Indian%20Sweets%20%26%20Snacks#shop', iconBg: '#F3E5F5' },
];

const DIETARY_TYPES = [
  { title: '100% VEGAN', sub: 'Pure Plant-Based', icon: '🌱', iconBg: '#FEF9C3', href: '/products#shop' },
  { title: 'PRESERVATIVE FREE', sub: 'Zero Chemical Additives', icon: '🌿', iconBg: '#E0F2FE', href: '/products#shop' },
  { title: 'GLUTEN FREE', sub: 'Naturally Sourced', icon: '🌾', iconBg: '#DCFCE7', href: '/products#shop' },
  { title: 'STONE GROUND', sub: 'Handmade Authenticity', icon: '🪨', iconBg: '#E0E7FF', href: '/products#shop' },
];

const FEATURED_MEGA_ITEM = {
  tag: 'AUTHENTIC SPECIAL',
  title: 'AVAKAYA PICKLE',
  desc: 'Authentic sun-dried Andhra mango pickle crafted with cold-pressed sesame oil, stone-ground mustard seeds, and heirloom grandmother recipes.',
  buttonText: 'View Product',
  href: '/products?category=Prepared%20Foods#shop',
  bg: '#8B261E',
  badgeText: 'FAMILY RECIPE • 100% NATURAL •',
};

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeoutRef = useState({ current: null })[0];

  const handleMouseEnterProducts = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown('Products');
  };

  const handleMouseLeaveProducts = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 250);
  };

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
                    onMouseEnter={() => isProducts && handleMouseEnterProducts()}
                    onMouseLeave={() => isProducts && handleMouseLeaveProducts()}
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

                    {/* Brar's 3-Column Mega Menu */}
                    {isProducts && activeDropdown === 'Products' && (
                      <div
                        className="mega-menu-container"
                        onMouseEnter={handleMouseEnterProducts}
                        onMouseLeave={handleMouseLeaveProducts}
                        style={{
                          position: 'fixed',
                          top: '100px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '92vw',
                          maxWidth: '1160px',
                          background: '#FFFFFF',
                          borderRadius: '24px',
                          boxShadow: '0 25px 60px rgba(0,0,0,0.22)',
                          border: '1px solid rgba(0,0,0,0.08)',
                          padding: '2.5rem',
                          zIndex: 1000,
                          animation: 'megaMenuFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      >
                        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr 1.2fr', gap: '3rem' }}>
                          
                          {/* Column 1: Product Categories */}
                          <div>
                            <h4 style={{
                              fontFamily: '"Montserrat", sans-serif',
                              fontSize: '1.15rem',
                              fontWeight: 900,
                              color: '#111',
                              letterSpacing: '-0.01em',
                              marginBottom: '1.75rem',
                            }}>
                              Product Categories
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                              {PRODUCT_CATEGORIES.map((cat, i) => (
                                <Link
                                  key={i}
                                  href={cat.href}
                                  onClick={() => setActiveDropdown(null)}
                                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1.2rem' }}
                                >
                                  <div
                                    style={{
                                      width: '64px',
                                      height: '64px',
                                      borderRadius: '16px',
                                      background: cat.iconBg || '#FFF8E1',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      overflow: 'hidden',
                                      flexShrink: 0,
                                      boxShadow: '0 6px 14px rgba(0,0,0,0.06)',
                                      transition: 'transform 0.3s ease',
                                    }}
                                  >
                                    <img
                                      src={cat.img}
                                      alt={cat.title}
                                      style={{ width: '85%', height: '85%', objectFit: 'contain', borderRadius: '10px' }}
                                      onError={(e) => { e.target.onerror = null; e.target.src = '/images/logo.svg'; }}
                                    />
                                  </div>
                                  <div>
                                    <span style={{
                                      fontFamily: '"Montserrat", sans-serif',
                                      fontSize: '1.05rem',
                                      fontWeight: 900,
                                      color: '#111',
                                      letterSpacing: '-0.01em',
                                      display: 'block',
                                      lineHeight: 1.2,
                                    }}>
                                      {cat.title}
                                    </span>
                                    <span style={{
                                      fontFamily: '"Inter", sans-serif',
                                      fontSize: '0.8rem',
                                      color: '#666',
                                      fontWeight: 500,
                                      display: 'block',
                                      marginTop: '3px',
                                    }}>
                                      {cat.sub}
                                    </span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Column 2: Type of Products */}
                          <div>
                            <h4 style={{
                              fontFamily: '"Montserrat", sans-serif',
                              fontSize: '1.15rem',
                              fontWeight: 900,
                              color: '#111',
                              letterSpacing: '-0.01em',
                              marginBottom: '1.75rem',
                            }}>
                              Type of Products
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                              {DIETARY_TYPES.map((diet, i) => (
                                <Link
                                  key={i}
                                  href={diet.href}
                                  onClick={() => setActiveDropdown(null)}
                                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1.2rem' }}
                                >
                                  <div
                                    style={{
                                      width: '64px',
                                      height: '64px',
                                      borderRadius: '16px',
                                      background: diet.iconBg,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '1.75rem',
                                      flexShrink: 0,
                                      boxShadow: '0 6px 14px rgba(0,0,0,0.06)',
                                    }}
                                  >
                                    {diet.icon}
                                  </div>
                                  <div>
                                    <span style={{
                                      fontFamily: '"Montserrat", sans-serif',
                                      fontSize: '1.05rem',
                                      fontWeight: 900,
                                      color: '#111',
                                      letterSpacing: '-0.01em',
                                      display: 'block',
                                      lineHeight: 1.2,
                                    }}>
                                      {diet.title}
                                    </span>
                                    <span style={{
                                      fontFamily: '"Inter", sans-serif',
                                      fontSize: '0.8rem',
                                      color: '#666',
                                      fontWeight: 500,
                                      display: 'block',
                                      marginTop: '3px',
                                    }}>
                                      {diet.sub}
                                    </span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Column 3: Featured Banner Card (Brar's Style) */}
                          <div>
                            <h4 style={{
                              fontFamily: '"Montserrat", sans-serif',
                              fontSize: '1.15rem',
                              fontWeight: 900,
                              color: '#111',
                              letterSpacing: '-0.01em',
                              marginBottom: '1.75rem',
                            }}>
                              Featured
                            </h4>
                            <div
                              style={{
                                background: FEATURED_MEGA_ITEM.bg,
                                borderRadius: '24px',
                                padding: '2.5rem 2.25rem',
                                color: '#FFFFFF',
                                position: 'relative',
                                overflow: 'hidden',
                                height: 'calc(100% - 3.2rem)',
                                minHeight: '340px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 15px 35px rgba(139,38,30,0.3)',
                              }}
                            >
                              {/* Background Decorative Stamp Circle */}
                              <div
                                style={{
                                  position: 'absolute',
                                  right: '-30px',
                                  bottom: '-30px',
                                  width: '180px',
                                  height: '180px',
                                  borderRadius: '50%',
                                  border: '2px dashed rgba(255,255,255,0.25)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  pointerEvents: 'none',
                                }}
                              >
                                <span style={{
                                  fontSize: '0.65rem',
                                  fontWeight: 900,
                                  color: 'rgba(255,255,255,0.4)',
                                  letterSpacing: '0.15em',
                                  textTransform: 'uppercase',
                                  textAlign: 'center',
                                }}>
                                  {FEATURED_MEGA_ITEM.badgeText}
                                </span>
                              </div>

                              <div>
                                <h3 style={{
                                  fontFamily: '"Montserrat", sans-serif',
                                  fontSize: '2.4rem',
                                  fontWeight: 900,
                                  lineHeight: 1.05,
                                  textTransform: 'uppercase',
                                  letterSpacing: '-0.02em',
                                  color: '#FFFFFF',
                                  marginBottom: '1.25rem',
                                }}>
                                  AVAKAYA<br />PICKLE
                                </h3>
                                <p style={{
                                  fontFamily: '"Inter", sans-serif',
                                  fontSize: '0.92rem',
                                  lineHeight: 1.6,
                                  color: 'rgba(255,255,255,0.92)',
                                  fontWeight: 400,
                                  maxWidth: '95%',
                                }}>
                                  {FEATURED_MEGA_ITEM.desc}
                                </p>
                              </div>

                              <div style={{ marginTop: '2rem' }}>
                                <Link
                                  href={FEATURED_MEGA_ITEM.href}
                                  onClick={() => setActiveDropdown(null)}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: '#111111',
                                    color: '#FFFFFF',
                                    padding: '0.85rem 1.6rem',
                                    borderRadius: '999px',
                                    fontSize: '0.88rem',
                                    fontWeight: 800,
                                    fontFamily: '"Montserrat", sans-serif',
                                    textDecoration: 'none',
                                    boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
                                    transition: 'transform 0.2s ease',
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                  {FEATURED_MEGA_ITEM.buttonText} ›
                                </Link>
                              </div>
                            </div>
                          </div>

                        </div>
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

        @keyframes megaMenuFadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        .mega-menu-container::before {
          content: '';
          position: absolute;
          top: -35px;
          left: 0;
          right: 0;
          height: 40px;
          background: transparent;
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
