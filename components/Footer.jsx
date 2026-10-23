'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ── Crisp Monochrome Vector Icons ──────────────────────────────────────────

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

// ── Social Icons (Clean Vector Shapes) ──────────────────────────────────────

const InstagramIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

// ── Main Footer Component ──────────────────────────────────────────────────

export default function Footer() {
  const [contactData, setContactData] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch('/api/web-data?doc_id=contact_web');
        if (res.ok) {
          const text = await res.text();
          const json = text ? JSON.parse(text) : null;
          if (json && json.success && json.data) {
            setContactData(json.data.data ? json.data.data : json.data);
          }
        }
      } catch (err) {}
    };
    fetchContact();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Our Story', href: '/our-story' },
    { label: 'Process', href: '/how-we-make-it' },
    { label: 'About', href: '/recipes' },
    { label: 'Contact', href: '/contact' },
  ];

  const categories = [
    { label: 'Prepared Foods (Pickles)', href: '/products?category=Prepared%20Foods#shop' },
    { label: 'Salts, Spices & Soups', href: '/products?category=Salts,%20spices,%20soups#shop' },
    { label: 'Ready-to-eat Savouries', href: '/products?category=Ready-to-eat%20savouries#shop' },
    { label: 'Indian Sweets & Snacks', href: '/products?category=Indian%20Sweets%20%26%20Snacks#shop' },
    { label: 'Shop All Products', href: '/products#shop' },
  ];

  const fssaiCategories = [
    'Prepared Foods',
    'Ready-to-eat Savouries',
    'Salts, Spices, Soups & Sauces',
    'Indian Sweets and Snacks & Savouries',
    'Dairy Products and Analogues',
    'Fruits and Vegetables, Seaweeds, Nuts and Seeds',
    'Beverages, excluding Dairy',
  ];

  const phone = contactData?.phone || '+91 93939 34200';
  const emailAddr = contactData?.email || 'contact@adhvaithafoods.com';
  const whatsappUrl = contactData?.whatsapp
    ? `https://wa.me/${contactData.whatsapp.replace(/\D/g, '')}`
    : 'https://wa.me/919393934200';

  return (
    <footer className="sp-footer" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        .sp-footer,
        .sp-footer h1,
        .sp-footer h2,
        .sp-footer h3,
        .sp-footer h4,
        .sp-footer p,
        .sp-footer a,
        .sp-footer span,
        .sp-footer input,
        .sp-footer button {
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }

        .sp-footer {
          background-color: #1E6B38;
          color: #FFFFFF;
        }

        .sp-footer-curve-container {
          position: relative;
          width: 100%;
          line-height: 0;
          overflow: hidden;
          background: transparent;
          margin-top: -clamp(40px, 6vw, 85px);
          z-index: 2;
          pointer-events: none;
        }

        .sp-footer-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: clamp(3rem, 5vw, 4.5rem) clamp(1.5rem, 3.5vw, 3rem) 3.5rem;
        }

        /* Top Announcement Strip */
        .sp-footer-top-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
          padding-bottom: 2.25rem;
          margin-bottom: 3rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.18);
        }

        .sp-heritage-pill {
          background: rgba(255, 255, 255, 0.14);
          border: 1.5px solid rgba(255, 255, 255, 0.9);
          border-radius: 9999px;
          padding: 0.5rem 1.4rem;
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #FFFFFF;
        }

        .sp-delivery-note {
          font-size: 0.92rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          opacity: 0.95;
          color: #FFFFFF;
        }

        /* 4-Column Grid */
        .sp-footer-grid {
          display: grid;
          grid-template-columns: 1.35fr 1.05fr 1.15fr 1.45fr;
          gap: clamp(1.75rem, 3vw, 3.5rem);
          align-items: start;
          margin-bottom: 3.5rem;
        }

        .sp-footer-heading {
          font-size: 1.35rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0 0 1.15rem 0;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }

        .sp-footer-subheading {
          font-size: 1.15rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 1.85rem 0 0.85rem 0;
          letter-spacing: -0.01em;
        }

        .sp-footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .sp-footer-link {
          color: #FFFFFF;
          text-decoration: none;
          font-size: 1.02rem;
          font-weight: 600;
          opacity: 0.92;
          transition: opacity 0.2s ease, transform 0.2s ease;
          display: inline-block;
          line-height: 1.35;
        }

        .sp-footer-link:hover {
          opacity: 0.75;
          transform: translateX(3px);
        }

        /* Social Circular Icon Buttons */
        .sp-footer-social-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.75rem;
        }

        .sp-social-circle-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
          border: 1.5px solid rgba(255, 255, 255, 0.6);
          color: #FFFFFF;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .sp-social-circle-btn:hover {
          background: #FFFFFF;
          color: #1E6B38;
          border-color: #FFFFFF;
          transform: translateY(-3px) scale(1.08);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
        }

        /* Contact Details Rows */
        .sp-contact-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
          color: #FFFFFF;
          line-height: 1.5;
        }

        .sp-contact-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.14);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #FFFFFF;
        }

        /* Newsletter Box */
        .sp-newsletter-box {
          display: flex;
          flex-direction: column;
        }

        .sp-newsletter-title {
          font-size: clamp(1.65rem, 2.3vw, 2.2rem);
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.2;
          margin: 0 0 0.75rem 0;
          letter-spacing: -0.02em;
        }

        .sp-newsletter-desc {
          font-size: 0.98rem;
          font-weight: 500;
          opacity: 0.92;
          line-height: 1.5;
          margin: 0 0 1.25rem 0;
        }

        .sp-newsletter-form {
          display: flex;
          gap: 0.65rem;
          align-items: center;
          width: 100%;
          max-width: 480px;
          margin-bottom: 2rem;
        }

        .sp-newsletter-input {
          flex: 1;
          min-width: 0;
          background: transparent;
          border: 1.6px solid rgba(255, 255, 255, 0.75);
          border-radius: 9999px;
          padding: 0.82rem 1.45rem;
          color: #FFFFFF;
          font-size: 1rem;
          font-weight: 600;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .sp-newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .sp-newsletter-input:focus {
          border-color: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
        }

        .sp-newsletter-btn {
          flex-shrink: 0;
          background: #FFFFFF;
          color: #1E6B38;
          border: none;
          border-radius: 9999px;
          padding: 0.82rem 1.85rem;
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          white-space: nowrap;
        }

        .sp-newsletter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.16);
          background: #F8F9FA;
        }

        /* App Download Button */
        .sp-app-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background-color: #000000;
          color: #FFFFFF;
          padding: 0.6rem 1.25rem;
          border-radius: 10px;
          text-decoration: none;
          border: 1.2px solid rgba(255, 255, 255, 0.35);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
          transition: transform 0.2s ease, border-color 0.2s ease;
          width: fit-content;
        }

        .sp-app-btn:hover {
          transform: translateY(-2px);
          border-color: #FFFFFF;
        }

        /* FSSAI Categories Strip */
        .sp-fssai-strip {
          padding: 1.4rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.16);
          border-bottom: 1px solid rgba(255, 255, 255, 0.16);
          margin-bottom: 2.25rem;
        }

        .sp-fssai-title {
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
          opacity: 0.9;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .sp-fssai-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .sp-fssai-tag {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.28);
          border-radius: 6px;
          padding: 0.3rem 0.7rem;
          font-size: 0.74rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        /* Bottom Row Bar */
        .sp-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: #FFFFFF;
        }

        .sp-footer-payments {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .sp-payment-badge {
          height: 26px;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
          overflow: hidden;
        }

        @media (max-width: 1080px) {
          .sp-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
          .sp-newsletter-box {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 680px) {
          .sp-footer-grid {
            grid-template-columns: 1fr;
            gap: 2.25rem;
          }
          .sp-footer-top-strip {
            flex-direction: column;
            align-items: flex-start;
          }
          .sp-footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
          }
          .sp-newsletter-form {
            flex-direction: column;
            align-items: stretch;
          }
          .sp-newsletter-btn {
            width: 100%;
          }
        }
      `}</style>

      {/* ── Top Curved Arch/Scoop Boundary ── */}
      <div className="sp-footer-curve-container">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: 'clamp(45px, 6vw, 90px)' }}
        >
          <path
            d="M 0,0 C 480,88 960,88 1440,0 L 1440,90 L 0,90 Z"
            fill="#1E6B38"
          />
        </svg>
      </div>

      {/* ── Footer Main Body ── */}
      <div className="sp-footer-content">

        {/* ── Top Heritage Announcement Strip ── */}
        <div className="sp-footer-top-strip">
          <div className="sp-heritage-pill">
            STRAIGHT FROM GRANDMOTHER'S KITCHEN • SINCE 1970
          </div>
          <div className="sp-delivery-note">
            FREE DELIVERY ON ORDERS ABOVE ₹499 • PAN INDIA SHIPPING
          </div>
        </div>

        {/* ── Main 4-Column Grid ── */}
        <div className="sp-footer-grid">

          {/* ── Column 1: Brand & Heritage ── */}
          <div>
            {/* Logo in warm white pill card to preserve vibrant grandmother illustration */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '14px',
                padding: '0.65rem 1rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.18)',
                marginBottom: '1.25rem',
              }}
            >
              <img
                src="/images/logo.svg"
                alt="Adhvaitha Foods"
                style={{
                  height: '52px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>

            <h3 className="sp-footer-heading" style={{ fontSize: '1.22rem', marginBottom: '0.65rem' }}>
              CRAFTING TRADITION,<br />ONE JAR AT A TIME.
            </h3>
            <p style={{ fontSize: '0.94rem', fontWeight: 500, opacity: 0.9, lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
              We bring you the authentic taste of heritage. Every product is prepared using heirloom recipes, sun-dried ingredients, and cold-pressed oils — just like grandmother used to make.
            </p>

            {/* Social Media Circular Buttons */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', opacity: 0.9 }}>
                Get Connected
              </div>
              <div className="sp-footer-social-row">
                <a
                  href={contactData?.socials?.instagram || 'https://instagram.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sp-social-circle-btn"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={contactData?.socials?.facebook || 'https://facebook.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sp-social-circle-btn"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sp-social-circle-btn"
                  aria-label="YouTube"
                  title="YouTube"
                >
                  <YoutubeIcon />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sp-social-circle-btn"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <WhatsAppIcon />
                </a>
              </div>
            </div>
          </div>

          {/* ── Column 2: Categories & Quick Links ── */}
          <div>
            <h3 className="sp-footer-heading">Shop</h3>
            <ul className="sp-footer-links">
              {categories.map((cat) => (
                <li key={cat.label}>
                  <Link href={cat.href} className="sp-footer-link">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="sp-footer-subheading">Quick Links</h4>
            <ul className="sp-footer-links">
              {quickLinks.map((ql) => (
                <li key={ql.label}>
                  <Link href={ql.href} className="sp-footer-link">
                    {ql.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Contact & App Download ── */}
          <div>
            <h3 className="sp-footer-heading">Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
              <div className="sp-contact-row">
                <div className="sp-contact-icon-wrapper">
                  <PinIcon />
                </div>
                <span>North East Colony, Yadadri Bhuvanagiri 508284</span>
              </div>

              <div className="sp-contact-row">
                <div className="sp-contact-icon-wrapper">
                  <PhoneIcon />
                </div>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="sp-footer-link">
                  {phone}
                </a>
              </div>

              <div className="sp-contact-row">
                <div className="sp-contact-icon-wrapper">
                  <MailIcon />
                </div>
                <a href={`mailto:${emailAddr}`} className="sp-footer-link">
                  {emailAddr}
                </a>
              </div>

              <div className="sp-contact-row">
                <div className="sp-contact-icon-wrapper">
                  <ClockIcon />
                </div>
                <span style={{ opacity: 0.92, fontSize: '0.94rem' }}>
                  Mon–Sun: 9:00 AM – 6:00 PM
                </span>
              </div>
            </div>

            {/* Google Play App Download */}
            <div>
              <h4 className="sp-footer-subheading" style={{ margin: '0 0 0.5rem 0' }}>Download Our App</h4>
              <p style={{ fontSize: '0.88rem', opacity: 0.9, lineHeight: 1.45, margin: '0 0 0.85rem 0' }}>
                Order authentic Andhra pickles &amp; snacks directly from our mobile app.
              </p>
              <a href="#" className="sp-app-btn">
                <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                  <path d="M4.3,2.4C4.1,2.5,4,2.8,4,3.1v17.7c0,0.3,0.1,0.6,0.3,0.7l0.1,0.1l9.9-9.9v-0.2L4.4,2.3L4.3,2.4z" fill="#00e676"/>
                  <path d="M18.8,14.6l-3.2-3.2v-0.2l3.2-3.2l0.1,0.1l3.8,2.1c1,0.6,1,1.5,0,2.1l-3.8,2.1L18.8,14.6z" fill="#ffc107"/>
                  <path d="M14.4,11.3l-10-10C4.3,1.1,4.1,1.1,4,1.3l10.3,10.3L14.4,11.3z" fill="#ff3d00"/>
                  <path d="M14.4,12.7l-0.1,0.1L4,23.1c0.1,0.1,0.3,0.1,0.5,0l10-10L14.4,12.7z" fill="#29b6f6"/>
                </svg>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1, color: '#bbb' }}>Get it on</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, lineHeight: 1.2 }}>Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* ── Column 4: SuckerPunch-Styled Newsletter & Legal ── */}
          <div className="sp-newsletter-box">
            <h3 className="sp-newsletter-title">
              Your inbox deserves some emails, too
            </h3>
            <p className="sp-newsletter-desc">
              Subscribe for grandmother's seasonal batch updates, festival specials, and traditional Andhra recipe tips.
            </p>

            {subscribed ? (
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.18)',
                  border: '1.5px solid #FFFFFF',
                  borderRadius: '16px',
                  padding: '1rem 1.4rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '1.75rem',
                }}
              >
                <span>🎉</span> Thank you for subscribing to Adhvaitha Foods!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="sp-newsletter-form">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="sp-newsletter-input"
                  aria-label="Email address for newsletter"
                />
                <button type="submit" className="sp-newsletter-btn">
                  Subscribe
                </button>
              </form>
            )}

            {/* Privacy & Legal Policies */}
            <div>
              <h4 className="sp-footer-subheading" style={{ margin: '0 0 0.65rem 0' }}>Privacy &amp; Policies</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem 1.25rem' }}>
                <Link href="/terms-and-conditions" className="sp-footer-link" style={{ fontSize: '0.95rem' }}>
                  Terms of Use
                </Link>
                <Link href="/privacy-policy" className="sp-footer-link" style={{ fontSize: '0.95rem' }}>
                  Privacy Policy
                </Link>
                <Link href="/refund-policy" className="sp-footer-link" style={{ fontSize: '0.95rem' }}>
                  Refund Policy
                </Link>
                <Link href="/shipping-policy" className="sp-footer-link" style={{ fontSize: '0.95rem' }}>
                  Shipping Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── FSSAI Categories Strip ── */}
        <div className="sp-fssai-strip">
          <div className="sp-fssai-title">
            <ShieldCheckIcon />
            <span>FSSAI REGISTERED FOOD CATEGORIES</span>
          </div>
          <div className="sp-fssai-badges">
            {fssaiCategories.map((cat, i) => (
              <span key={i} className="sp-fssai-tag">
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* ── Bottom Row: Copyright, Secure Payment Guarantee, ADA Badge & Payment Badges ── */}
        <div className="sp-footer-bottom">
          <div>
            © 2026 Adhvaitha Foods. All Rights Reserved.
          </div>

          <div style={{ opacity: 0.95 }}>
            We run on a secure payment gateway
          </div>

          <div className="sp-footer-payments">
            {/* ADA Site Compliance Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginRight: '6px',
              }}
            >
              <svg width="36" height="36" viewBox="0 0 100 100" style={{ flexShrink: 0 }}>
                <circle cx="50" cy="50" r="47" fill="#143A6A" stroke="#FFFFFF" strokeWidth="3" />
                <circle cx="50" cy="28" r="6.5" fill="#FFFFFF" />
                <path
                  d="M50 37 L50 60 L64 60 M50 48 L38 48 M44 60 A 15 15 0 1 1 36 73"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  id="adaCirclePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text fontSize="7" fontWeight="900" fill="#FFFFFF" letterSpacing="1.2">
                  <textPath href="#adaCirclePath">ADA SITE COMPLIANCE •</textPath>
                </text>
              </svg>
              <span
                style={{
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  background: '#143A6A',
                  color: '#FFF',
                  padding: '3px 6px',
                  borderRadius: '3px',
                  border: '1px solid #FFF',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                }}
              >
                ACCESSIBILITY POLICY
              </span>
            </div>

            {/* UPI */}
            <span
              className="sp-payment-badge"
              style={{ background: '#FFFFFF', padding: '0 8px', fontWeight: 900, fontSize: '0.68rem' }}
            >
              <span style={{ color: '#0F8236' }}>U</span>
              <span style={{ color: '#E8631C' }}>P</span>
              <span style={{ color: '#0F8236' }}>I</span>
            </span>

            {/* CARDS */}
            <span
              className="sp-payment-badge"
              style={{ background: '#FFFFFF', color: '#141414', fontWeight: 800, fontSize: '0.65rem', padding: '0 8px' }}
            >
              CARDS
            </span>

            {/* COD */}
            <span
              className="sp-payment-badge"
              style={{ background: '#FFFFFF', color: '#141414', fontWeight: 800, fontSize: '0.65rem', padding: '0 8px' }}
            >
              COD
            </span>

            {/* AMEX */}
            <span
              className="sp-payment-badge"
              style={{ background: '#006FCF', color: '#FFF', fontWeight: 900, fontSize: '0.65rem', padding: '0 8px' }}
            >
              AMEX
            </span>

            {/* Apple Pay (Real SVG Apple Logo) */}
            <span
              className="sp-payment-badge"
              style={{ background: '#FFFFFF', padding: '0 8px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
            >
              <svg width="12" height="14" viewBox="0 0 170 170" fill="#000000" style={{ flexShrink: 0 }}>
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.69-7.85-12.01-14.3-6.19-9.27-11.04-19.64-14.54-31.11-3.5-11.47-5.25-22.35-5.25-32.65 0-16.14 4.09-29.35 12.28-39.63 8.18-10.28 18.25-15.54 30.19-15.79 5.34 0 11.22 1.34 17.65 4.02 6.43 2.68 10.42 4.07 11.96 4.17 2.05-.1 6.34-1.57 12.87-4.41 6.53-2.84 12.23-4.14 17.1-3.9 13.04.62 23.47 5.56 31.28 14.82-11.48 6.94-17.12 16.63-16.92 29.07.2 9.8 4.09 18.17 11.66 25.11 3.59 3.31 7.78 5.86 12.57 7.64-2.58 7.55-5.69 15.34-9.33 23.36zM119.22 33.15c0-7.72 2.76-14.87 8.28-21.46 5.53-6.59 12.35-10.87 20.47-12.84.41 1.23.62 2.47.62 3.7 0 7.72-2.87 15.02-8.6 21.91-5.73 6.89-12.84 11.07-21.35 12.54-.2-1.28-.42-2.56-.42-3.85z" />
              </svg>
              <span style={{ color: '#000000', fontWeight: 800, fontSize: '0.72rem', letterSpacing: '-0.02em', lineHeight: 1 }}>Pay</span>
            </span>

            {/* Discover */}
            <span
              className="sp-payment-badge"
              style={{ background: '#FFFFFF', color: '#F46F22', fontWeight: 900, fontSize: '0.62rem', padding: '0 7px' }}
            >
              DISCOVER
            </span>

            {/* Mastercard */}
            <span
              className="sp-payment-badge"
              style={{ background: '#FFFFFF', padding: '0 7px' }}
            >
              <svg width="24" height="15" viewBox="0 0 36 22">
                <circle cx="13" cy="11" r="10" fill="#EB001B" />
                <circle cx="23" cy="11" r="10" fill="#F79E1B" fillOpacity="0.9" />
              </svg>
            </span>

            {/* PayPal */}
            <span
              className="sp-payment-badge"
              style={{ background: '#FFFFFF', color: '#003087', fontWeight: 900, fontSize: '0.65rem', fontStyle: 'italic', padding: '0 8px' }}
            >
              PayPal
            </span>

            {/* Shop Pay */}
            <span
              className="sp-payment-badge"
              style={{ background: '#5A31F4', color: '#FFF', fontWeight: 800, fontSize: '0.65rem', padding: '0 8px' }}
            >
              shop
            </span>

            {/* VISA */}
            <span
              className="sp-payment-badge"
              style={{ background: '#FFFFFF', color: '#1A1F71', fontWeight: 900, fontSize: '0.72rem', padding: '0 8px', letterSpacing: '0.04em' }}
            >
              VISA
            </span>
          </div>
        </div>

        {/* Subtle Creator Credit */}
        <div style={{ marginTop: '2.5rem', textAlign: 'center', opacity: 0.7, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em' }}>
          ⚡ DEVELOPED BY <a href="https://www.nexlifly.in/" target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>NEXLIFLY</a>
        </div>
      </div>
    </footer>
  );
}
