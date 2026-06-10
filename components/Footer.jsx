'use client';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

// SVG Social Icons (brand icons not in lucide-react)
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

export default function Footer() {
  const quickLinks = ['Home', 'Products', 'Our Story', 'Process', 'Recipes', 'Blog', 'Contact'];
  const quickHrefs = ['/', '/products', '/our-story', '/how-we-make-it', '/recipes', '/blog', '/contact'];
  const pickles = ['Mango Avakaya', 'Gongura', 'Lemon', 'Green Chili', 'Garlic', 'Mixed Veg', 'Tomato', 'Tamarind'];

  return (
    <footer style={{ background: 'var(--rich-brown)', color: 'var(--ivory)', position: 'relative' }}>
      {/* Terracotta top border */}
      <div style={{ height: '4px', background: 'var(--terracotta)' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>

          {/* Column 1: Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '42px', height: '42px',
                background: 'var(--terracotta)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '1.3rem' }}>🏺</span>
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-playfair, serif)',
                  fontWeight: 800, fontSize: '1.2rem',
                  color: 'var(--ivory)', letterSpacing: '0.05em',
                }}>AVDAITHA</div>
                <div style={{
                  fontFamily: 'var(--font-lato, sans-serif)',
                  fontWeight: 700, fontSize: '0.55rem',
                  color: 'var(--turmeric)', letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                }}>FOODS</div>
              </div>
            </div>
            <p style={{
              fontFamily: 'var(--font-crimson, serif)',
              fontSize: '0.95rem', fontStyle: 'italic',
              color: 'rgba(250,240,220,0.75)', lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}>
              "Straight From Grandmother's Kitchen"<br />
              <span style={{ fontSize: '0.8rem', fontStyle: 'normal', letterSpacing: '0.1em' }}>
                Pure • Natural • Traditional Since 1970
              </span>
            </p>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { icon: <InstagramIcon />, href: '#', id: 'footer-instagram', label: 'Instagram' },
                { icon: <FacebookIcon />, href: '#', id: 'footer-facebook', label: 'Facebook' },
                { icon: <YoutubeIcon />, href: '#', id: 'footer-youtube', label: 'YouTube' },
                { icon: <MessageCircle size={18} />, href: 'https://wa.me/919876543210', id: 'footer-whatsapp', label: 'WhatsApp' },
              ].map(s => (
                <a
                  key={s.id}
                  id={s.id}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'rgba(250,240,220,0.1)',
                    border: '1px solid rgba(250,240,220,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--ivory)', textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--terracotta)';
                    e.currentTarget.style.borderColor = 'var(--terracotta)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(250,240,220,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(250,240,220,0.2)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-lato, sans-serif)',
              fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--turmeric)', marginBottom: '1.25rem',
            }}>Quick Links</h4>
            <ul style={{ listStyle: 'none' }}>
              {quickLinks.map((link, i) => (
                <li key={link} style={{ marginBottom: '0.5rem' }}>
                  <Link
                    href={quickHrefs[i]}
                    style={{
                      color: 'rgba(250,240,220,0.75)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-lato, sans-serif)',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s ease',
                      display: 'block',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--turmeric)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,240,220,0.75)'}
                  >
                    → {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Pickles */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-lato, sans-serif)',
              fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--turmeric)', marginBottom: '1.25rem',
            }}>Our Pickles</h4>
            <ul style={{ listStyle: 'none' }}>
              {pickles.map(pickle => (
                <li key={pickle} style={{ marginBottom: '0.5rem' }}>
                  <Link
                    href="/products"
                    style={{
                      color: 'rgba(250,240,220,0.75)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-lato, sans-serif)',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s ease',
                      display: 'block',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--turmeric)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,240,220,0.75)'}
                  >
                    🫙 {pickle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-lato, sans-serif)',
              fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--turmeric)', marginBottom: '1.25rem',
            }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { icon: <MapPin size={15} />, text: 'Hyderabad, Telangana, India' },
                { icon: <Phone size={15} />, text: '+91 98765 43210' },
                { icon: <Mail size={15} />, text: 'hello@avdaithafoods.com' },
                { icon: <Clock size={15} />, text: 'Mon–Sat: 9AM – 6PM' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--turmeric)', flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                  <span style={{
                    fontFamily: 'var(--font-lato, sans-serif)',
                    fontSize: '0.88rem',
                    color: 'rgba(250,240,220,0.75)',
                  }}>{item.text}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(232,168,32,0.1)', borderRadius: '6px', border: '1px solid rgba(232,168,32,0.2)' }}>
              <p style={{
                fontFamily: 'var(--font-crimson, serif)',
                fontSize: '0.85rem', fontStyle: 'italic',
                color: 'var(--turmeric)',
              }}>Free delivery on orders above ₹499. Pan India shipping.</p>
            </div>
          </div>
        </div>

        {/* FSSAI Compliance Block */}
        <div style={{
          borderTop: '1px solid rgba(250,240,220,0.1)',
          paddingTop: '2rem',
          paddingBottom: '2rem',
          marginTop: '1rem',
          marginBottom: '1rem',
        }}>
          <h4 style={{
            fontFamily: 'var(--font-lato, sans-serif)',
            fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--turmeric)', marginBottom: '1rem',
          }}>FSSAI Registered Food Categories</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {[
              '16 - Prepared Foods', 
              '15 - Ready-to-eat savouries', 
              '12 - Salts, spices, soups, sauces, salads', 
              '18 - Indian Sweets and Snacks & Savouries', 
              '01 - Dairy products and analogues', 
              '04 - Fruits and vegetables, seaweeds, nuts and seeds', 
              '14 - Beverages, excluding dairy'
            ].map((cat, i) => (
              <span key={i} style={{
                background: 'rgba(250,240,220,0.05)',
                border: '1px solid rgba(250,240,220,0.1)',
                borderRadius: '4px',
                padding: '0.35rem 0.75rem',
                fontFamily: 'var(--font-lato, sans-serif)',
                fontSize: '0.75rem',
                color: 'rgba(250,240,220,0.6)',
              }}>{cat}</span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(250,240,220,0.15)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-lato, sans-serif)',
            fontSize: '0.8rem',
            color: 'rgba(250,240,220,0.5)',
          }}>
            © {new Date().getFullYear()} Avdaitha Foods. All rights reserved. Made with ❤️ in Hyderabad.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {['UPI', 'Cards', 'COD', 'Razorpay'].map(method => (
              <span key={method} style={{
                background: 'rgba(250,240,220,0.1)',
                border: '1px solid rgba(250,240,220,0.2)',
                borderRadius: '4px',
                padding: '0.25rem 0.6rem',
                fontFamily: 'var(--font-lato, sans-serif)',
                fontSize: '0.7rem',
                fontWeight: 700,
                color: 'rgba(250,240,220,0.6)',
                letterSpacing: '0.05em',
              }}>{method}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
