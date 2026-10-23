'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, MessageCircle, CheckCircle } from 'lucide-react';

// Little Green Cucumber Slices Doodle beside "CONTACT US"
const CucumberSlicesDoodle = () => (
  <span className="cucumber-slices-box" aria-hidden="true">
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="cucumber-slices-svg">
      {/* Back slice */}
      <ellipse
        cx="40"
        cy="24"
        rx="18"
        ry="13"
        transform="rotate(25 40 24)"
        fill="#F6DA77"
        stroke="#1E6B3E"
        strokeWidth="3.2"
      />
      <circle cx="38" cy="22" r="1.5" fill="#1E6B3E" />
      <circle cx="43" cy="25" r="1.5" fill="#1E6B3E" />

      {/* Front slice */}
      <ellipse
        cx="24"
        cy="38"
        rx="20"
        ry="14"
        transform="rotate(-15 24 38)"
        fill="#F6DA77"
        stroke="#1E6B3E"
        strokeWidth="3.2"
      />
      {/* Inner translucent seed ring */}
      <ellipse
        cx="24"
        cy="38"
        rx="13"
        ry="8"
        transform="rotate(-15 24 38)"
        stroke="#1E6B3E"
        strokeWidth="1.6"
        strokeDasharray="2 3"
      />
      {/* Seeds */}
      <circle cx="18" cy="35" r="1.6" fill="#1E6B3E" />
      <circle cx="24" cy="36" r="1.6" fill="#1E6B3E" />
      <circle cx="30" cy="38" r="1.6" fill="#1E6B3E" />
      <circle cx="21" cy="41" r="1.6" fill="#1E6B3E" />
      <circle cx="27" cy="42" r="1.6" fill="#1E6B3E" />
    </svg>
  </span>
);

// Large Left Flanking Pickle Doodle (pointing diagonally down to form)
const LeftPickleDoodle = () => (
  <div className="left-pickle-container" aria-hidden="true">
    <svg viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="left-pickle-svg">
      <g transform="rotate(-24 120 70)" stroke="#1E6B3E" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Main pickle contour */}
        <path
          d="M28 70 C 24 40, 52 16, 96 18 C 154 20, 206 34, 214 62 C 220 90, 175 106, 120 102 C 70 98, 32 92, 28 70 Z"
          fill="#F6DA77"
        />
        {/* Bumps & stippling */}
        <circle cx="56" cy="46" r="2.4" fill="#1E6B3E" />
        <circle cx="94" cy="40" r="2.4" fill="#1E6B3E" />
        <circle cx="138" cy="48" r="2.4" fill="#1E6B3E" />
        <circle cx="178" cy="56" r="2.4" fill="#1E6B3E" />
        <circle cx="78" cy="70" r="2.4" fill="#1E6B3E" />
        <circle cx="120" cy="74" r="2.4" fill="#1E6B3E" />
        <circle cx="160" cy="80" r="2.4" fill="#1E6B3E" />

        {/* Vintage texture streaks */}
        <path d="M46 72 C 64 78, 88 80, 114 84" stroke="#1E6B3E" strokeWidth="2.8" strokeDasharray="4 5" />
        <path d="M104 36 C 134 38, 166 45, 190 54" stroke="#1E6B3E" strokeWidth="2.8" strokeDasharray="4 5" />
      </g>
    </svg>
  </div>
);

// Large Right Corner Tilted Pickle Jar Doodle (pointing diagonally into bottom-right corner)
const RightJarDoodle = () => (
  <div className="right-jar-container" aria-hidden="true">
    <svg viewBox="0 0 260 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="right-jar-svg">
      <g transform="rotate(-20 130 160)" stroke="#1E6B3E" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Screw Lid */}
        <rect x="40" y="20" width="160" height="24" rx="6" fill="#F6DA77" />
        <line x1="55" y1="26" x2="55" y2="38" strokeWidth="3.5" />
        <line x1="70" y1="26" x2="70" y2="38" strokeWidth="3.5" />
        <line x1="85" y1="26" x2="85" y2="38" strokeWidth="3.5" />
        <line x1="100" y1="26" x2="100" y2="38" strokeWidth="3.5" />
        <line x1="115" y1="26" x2="115" y2="38" strokeWidth="3.5" />
        <line x1="130" y1="26" x2="130" y2="38" strokeWidth="3.5" />
        <line x1="145" y1="26" x2="145" y2="38" strokeWidth="3.5" />
        <line x1="160" y1="26" x2="160" y2="38" strokeWidth="3.5" />
        <line x1="175" y1="26" x2="175" y2="38" strokeWidth="3.5" />

        {/* Neck */}
        <path d="M50 44 L50 60 L190 60 L190 44" />

        {/* Glass Shoulder & Body */}
        <path
          d="M50 60 C 22 72, 14 96, 16 140 L 22 260 C 26 290, 48 304, 120 304 C 192 304, 214 290, 218 260 L 224 140 C 226 96, 218 72, 190 60 Z"
          fill="#F6DA77"
        />

        {/* Jar Label with Vintage Border */}
        <rect x="42" y="118" width="156" height="120" rx="6" fill="#FFFFFF" stroke="#1E6B3E" strokeWidth="3.5" />
        
        {/* Brand name angled */}
        <text
          x="120"
          y="166"
          textAnchor="middle"
          fill="#1E6B3E"
          fontFamily="'Bebas Neue', sans-serif"
          fontSize="34"
          letterSpacing="0.08em"
          transform="rotate(-5 120 166)"
        >
          ADHVAITHA
        </text>

        <circle cx="120" cy="195" r="14" fill="none" stroke="#1E6B3E" strokeWidth="2.2" />
        <text
          x="120"
          y="200"
          textAnchor="middle"
          fill="#1E6B3E"
          fontFamily="'Caveat', cursive"
          fontSize="16"
          fontWeight="bold"
        >
          1970
        </text>

        {/* Hatching lines on glass */}
        <line x1="28" y1="180" x2="36" y2="172" strokeWidth="3" />
        <line x1="29" y1="202" x2="38" y2="194" strokeWidth="3" />
        <line x1="31" y1="224" x2="40" y2="216" strokeWidth="3" />
        <line x1="33" y1="246" x2="42" y2="238" strokeWidth="3" />
      </g>
    </svg>
  </div>
);

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    source: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [contactData, setContactData] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page-root">
      <Navbar />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@400;500;600;700&display=swap');

        :root {
          --c-yellow: #F6DA77;
          --c-black: #141414;
          --c-green: #1E6B3E;
          --c-green-dark: #165631;
          --font-head: 'Bebas Neue', 'Oswald', sans-serif;
          --font-body: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .contact-page-root {
          background-color: var(--c-yellow);
          color: var(--c-black);
          font-family: var(--font-body);
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        .contact-content-wrapper {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(6rem, 9vw, 8rem) 1.5rem clamp(5rem, 8vw, 7rem);
        }

        /* ─── TITLE & SUBTITLE ─── */
        .contact-header {
          text-align: center;
          margin-bottom: clamp(2.5rem, 4vw, 3.8rem);
          position: relative;
          z-index: 2;
        }

        .contact-title-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }

        .contact-title {
          font-family: var(--font-head);
          font-size: clamp(3.6rem, 7.2vw, 6.4rem);
          line-height: 0.95;
          letter-spacing: 0.03em;
          color: var(--c-black);
          text-transform: uppercase;
          margin: 0;
        }

        .cucumber-slices-box {
          display: inline-block;
          width: clamp(42px, 5vw, 62px);
          height: clamp(42px, 5vw, 62px);
          flex-shrink: 0;
          transform: translateY(-4px);
        }

        .cucumber-slices-svg {
          width: 100%;
          height: 100%;
        }

        .contact-subtitle {
          font-size: clamp(1.1rem, 1.45vw, 1.35rem);
          line-height: 1.5;
          color: #1A1A1A;
          font-weight: 500;
          margin: 1rem auto 0;
          max-width: 680px;
        }

        /* ─── FORM CONTAINER ─── */
        .form-card-container {
          max-width: 840px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .contact-sucker-form {
          display: flex;
          flex-direction: column;
          gap: clamp(1.2rem, 1.8vw, 1.6rem);
        }

        /* Row 1: Name and Email side by side */
        .form-row-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1rem, 1.8vw, 1.6rem);
        }

        /* Stadium / Pill Inputs */
        .sucker-pill-input {
          width: 100%;
          height: clamp(56px, 5vw, 66px);
          background-color: #FFFFFF;
          border: 2.5px solid var(--c-green);
          border-radius: 9999px;
          padding: 0 clamp(1.4rem, 2.2vw, 2.2rem);
          font-family: var(--font-body);
          font-size: clamp(1.05rem, 1.25vw, 1.22rem);
          font-weight: 500;
          color: #1A1A1A;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }

        .sucker-pill-input:focus {
          border-color: var(--c-green-dark);
          box-shadow: 0 6px 20px rgba(30, 107, 62, 0.18);
          transform: translateY(-1px);
        }

        .sucker-pill-input::placeholder {
          color: var(--c-green);
          font-family: var(--font-body);
          font-weight: 500;
          opacity: 1;
        }

        /* Textarea with rounded rectangle */
        .sucker-box-textarea {
          width: 100%;
          min-height: clamp(180px, 20vw, 220px);
          background-color: #FFFFFF;
          border: 2.5px solid var(--c-green);
          border-radius: clamp(22px, 2.5vw, 30px);
          padding: clamp(1.4rem, 2vw, 1.8rem) clamp(1.4rem, 2.2vw, 2.2rem);
          font-family: var(--font-body);
          font-size: clamp(1.05rem, 1.25vw, 1.22rem);
          font-weight: 500;
          color: #1A1A1A;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
          outline: none;
          resize: vertical;
          box-sizing: border-box;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }

        .sucker-box-textarea:focus {
          border-color: var(--c-green-dark);
          box-shadow: 0 6px 20px rgba(30, 107, 62, 0.18);
          transform: translateY(-1px);
        }

        .sucker-box-textarea::placeholder {
          color: var(--c-green);
          font-family: var(--font-body);
          font-weight: 500;
          opacity: 1;
        }

        /* Disclaimer Text */
        .captcha-disclaimer {
          font-size: clamp(0.85rem, 1vw, 0.94rem);
          line-height: 1.5;
          color: #1A1A1A;
          margin: 0.2rem 0 clamp(1rem, 2vw, 1.8rem) 0.5rem;
          font-weight: 400;
        }

        .captcha-disclaimer a {
          color: #1A1A1A;
          text-decoration: underline;
          font-weight: 500;
        }

        .captcha-disclaimer a:hover {
          color: var(--c-green);
        }

        /* Submit Button */
        .submit-container {
          display: flex;
          justify-content: center;
        }

        .sucker-submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: var(--c-green);
          color: #FFFFFF;
          font-family: var(--font-head);
          font-size: clamp(1.5rem, 2vw, 1.9rem);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: none;
          border-radius: 9999px;
          padding: 0.95rem clamp(3rem, 5vw, 5rem);
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(30, 107, 62, 0.32);
          transition: all 0.22s ease;
        }

        .sucker-submit-btn:hover {
          background-color: var(--c-green-dark);
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(30, 107, 62, 0.42);
        }

        /* Success Card */
        .success-card {
          background-color: #FFFFFF;
          border: 3px solid var(--c-green);
          border-radius: 30px;
          padding: clamp(2.5rem, 5vw, 4rem) 2rem;
          text-align: center;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08);
        }

        .success-icon-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 1.25rem;
          color: var(--c-green);
        }

        .success-title {
          font-family: var(--font-head);
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          color: var(--c-green);
          margin: 0 0 1rem;
          text-transform: uppercase;
        }

        .success-desc {
          font-size: clamp(1.1rem, 1.35vw, 1.28rem);
          color: #222;
          max-width: 520px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }

        /* ─── DECORATIVE DOODLES ─── */
        /* Left Pickle */
        .left-pickle-container {
          position: absolute;
          left: clamp(-40px, -2vw, 10px);
          top: clamp(240px, 28vw, 320px);
          width: clamp(160px, 18vw, 230px);
          pointer-events: none;
          z-index: 1;
        }

        .left-pickle-svg {
          width: 100%;
          height: auto;
          filter: drop-shadow(0 6px 14px rgba(0,0,0,0.06));
        }

        /* Right Jar */
        .right-jar-container {
          position: absolute;
          right: clamp(-60px, -3vw, 10px);
          top: clamp(380px, 40vw, 480px);
          width: clamp(220px, 23vw, 310px);
          pointer-events: none;
          z-index: 1;
        }

        .right-jar-svg {
          width: 100%;
          height: auto;
          filter: drop-shadow(0 10px 24px rgba(0,0,0,0.08));
        }

        /* ─── DIRECT CONTACT BAR BELOW ─── */
        .direct-contact-strip {
          margin-top: clamp(4.5rem, 7vw, 6.5rem);
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: clamp(1.2rem, 2vw, 1.8rem);
          position: relative;
          z-index: 2;
        }

        .contact-pill-item {
          background-color: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(8px);
          border: 2px solid var(--c-green);
          border-radius: 24px;
          padding: 1.5rem 1.8rem;
          display: flex;
          align-items: center;
          gap: 1.1rem;
          text-decoration: none;
          color: var(--c-black);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
          transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
        }

        .contact-pill-item:hover {
          transform: translateY(-3px);
          background-color: #FFFFFF;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .contact-icon-bubble {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: var(--c-green);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-pill-label {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--c-green);
          font-weight: 700;
          margin-bottom: 2px;
        }

        .contact-pill-value {
          font-size: 1.05rem;
          font-weight: 600;
          color: #181818;
          line-height: 1.35;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 860px) {
          .left-pickle-container {
            left: -60px;
            top: 80px;
            opacity: 0.6;
          }
          .right-jar-container {
            right: -80px;
            bottom: -30px;
            opacity: 0.6;
          }
          .form-row-two-col {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Decorative Doodles */}
      <LeftPickleDoodle />
      <RightJarDoodle />

      <main className="contact-content-wrapper">
        {/* Header */}
        <div className="contact-header">
          <div className="contact-title-container">
            <h1 className="contact-title">CONTACT US</h1>
            <CucumberSlicesDoodle />
          </div>
          <p className="contact-subtitle">
            Have a question, or want a product recommendation? Get in touch
          </p>
        </div>

        {/* Contact Form matching SuckerPunch styling */}
        <div className="form-card-container">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="contact-sucker-form">
              {/* Row 1: Name & Email */}
              <div className="form-row-two-col">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="sucker-pill-input"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="sucker-pill-input"
                />
              </div>

              {/* Row 2: How did you hear about us? */}
              <input
                type="text"
                placeholder="How did you hear about us?"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
                className="sucker-pill-input"
              />

              {/* Row 3: Your Message */}
              <textarea
                placeholder="Your Message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="sucker-box-textarea"
              />

              {/* Disclaimer */}
              <p className="captcha-disclaimer">
                This site is protected by Captcha and the Captcha{' '}
                <a href="/privacy-policy">Privacy Policy</a> and{' '}
                <a href="/terms-and-conditions">Terms of Service</a> apply.
              </p>

              {/* Submit Button */}
              <div className="submit-container">
                <button type="submit" className="sucker-submit-btn">
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <div className="success-card">
              <div className="success-icon-wrap">
                <CheckCircle size={60} strokeWidth={2.2} />
              </div>
              <h2 className="success-title">Message Received!</h2>
              <p className="success-desc">
                Thank you for reaching out to Adhvaitha Foods. Our team and kitchen family will get back to your inquiry promptly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: '', email: '', source: '', message: '' });
                }}
                className="sucker-submit-btn"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>

        {/* Direct Contact Pills Bar */}
        <div className="direct-contact-strip">
          <a
            href={`https://wa.me/${contactData?.whatsapp ? contactData.whatsapp.replace(/\D/g, '') : '919393934200'}?text=Hello%20Adhvaitha%20Foods!`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-pill-item"
          >
            <div className="contact-icon-bubble">
              <MessageCircle size={24} />
            </div>
            <div>
              <div className="contact-pill-label">WhatsApp Us</div>
              <div className="contact-pill-value">Instant Support</div>
            </div>
          </a>

          <a href="tel:+919393934200" className="contact-pill-item">
            <div className="contact-icon-bubble">
              <Phone size={24} />
            </div>
            <div>
              <div className="contact-pill-label">Call Our Kitchen</div>
              <div className="contact-pill-value">{contactData?.phone || '+91 93939 34200'}</div>
            </div>
          </a>

          <a href="mailto:info@avdaithafoods.in" className="contact-pill-item">
            <div className="contact-icon-bubble">
              <Mail size={24} />
            </div>
            <div>
              <div className="contact-pill-label">Email Support</div>
              <div className="contact-pill-value">{contactData?.email || 'info@avdaithafoods.in'}</div>
            </div>
          </a>

          <div className="contact-pill-item">
            <div className="contact-icon-bubble">
              <MapPin size={24} />
            </div>
            <div>
              <div className="contact-pill-label">Our Kitchen</div>
              <div className="contact-pill-value" style={{ fontSize: '0.92rem' }}>
                Deshmukhi, Yadadri Bhuvanagiri 508284
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
