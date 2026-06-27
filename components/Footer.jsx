'use client';
import Link from 'next/link';

// SVG Social Icons (brand icons not in lucide-react)
const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

export default function Footer() {
  const quickLinks = ['Home', 'Products', 'Our Story', 'Process', 'Recipes', 'Contact'];
  const quickHrefs = ['/', '/products', '/our-story', '/how-we-make-it', '/recipes', '/contact'];
  const categories = ['Prepared Foods', 'Ready-to-eat Savouries', 'Salts, Spices & Soups', 'Indian Sweets & Snacks'];
  const fssaiCategories = ['Prepared Foods', 'Ready-to-eat Savouries', 'Salts, Spices, Soups & Sauces', 'Indian Sweets and Snacks & Savouries', 'Dairy Products and Analogues', 'Fruits and Vegetables, Seaweeds, Nuts and Seeds', 'Beverages, excluding Dairy'];

  return (
    <footer style={{ background: '#F97316', color: '#000', fontFamily: '"Montserrat", sans-serif', padding: '4rem 2rem 2rem', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem' }}>
        
        {/* Left Column */}
        <div style={{ flex: '1.2', minWidth: '300px' }}>
          
          <div style={{ marginBottom: '3rem', maxWidth: '380px' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              CRAFTING TRADITION, <br/> ONE JAR AT A TIME.
            </h3>
            <p style={{ fontSize: '0.9rem', fontWeight: 700, opacity: 0.8, lineHeight: 1.6 }}>
              We bring you the authentic taste of heritage. Every product is carefully prepared using premium ingredients, time-honored methods, and a whole lot of love — just like grandmother used to make.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '3rem', fontWeight: 900, fontSize: '0.85rem', letterSpacing: '0.05em', lineHeight: 2.2 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: '#000', opacity: 0.5, marginBottom: '0.5rem', fontSize: '0.75rem' }}>QUICK LINKS</div>
              {quickLinks.map((link, i) => (
                <Link key={link} href={quickHrefs[i]} className="footer-link" style={{ textTransform: 'uppercase' }}>{link}</Link>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: '#000', opacity: 0.5, marginBottom: '0.5rem', fontSize: '0.75rem' }}>CATEGORIES</div>
              {categories.map(cat => (
                <Link key={cat} href="/products" className="footer-link" style={{ textTransform: 'uppercase' }}>{cat}</Link>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '3rem' }}>
            {/* Contact Details */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontWeight: 800, fontSize: '0.8rem', marginBottom: '1.5rem', letterSpacing: '0.02em', maxWidth: '400px' }}>
              <div>📍 Hyderabad, Telangana</div>
              <div>📞 +91 98765 43210</div>
              <div>✉️ hello@avdaithafoods.com</div>
              <div>⏰ Mon–Sat: 9AM – 6PM</div>
            </div>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {[
                { icon: <InstagramIcon />, label: 'INSTAGRAM' },
                { icon: <FacebookIcon />, label: 'FACEBOOK' },
                { icon: <YoutubeIcon />, label: 'YOUTUBE' },
                { icon: <WhatsAppIcon />, label: 'WHATSAPP' },
              ].map(social => (
                <button key={social.label} className="social-pill" style={{ background: 'transparent', border: '1px solid #000', borderRadius: '50px', padding: '0.35rem 1rem', fontWeight: 900, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <span>{social.icon}</span> {social.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div style={{ flex: '1', minWidth: '280px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div>
            <img 
              src="/images/logo.svg" 
              alt="Adhvaitha Foods" 
              style={{ 
                width: '380px', 
                height: 'auto', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))' 
              }} 
            />
          </div>
        </div>

        {/* Right Column */}
        <div style={{ flex: '1.4', minWidth: '350px', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ alignSelf: 'flex-start', background: '#fff', border: '2px solid #000', borderRadius: '50px', padding: '0.4rem 1.2rem', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '0.05em', boxShadow: '3px 3px 0 #000', marginBottom: '1.5rem' }}>
            STRAIGHT FROM GRANDMOTHER'S KITCHEN
          </div>

          <p style={{ fontWeight: 800, fontSize: '0.9rem', lineHeight: 1.5, letterSpacing: '0.05em', marginBottom: '1.5rem', maxWidth: '500px' }}>
            PURE • NATURAL • TRADITIONAL SINCE 1970.<br/>
            FREE DELIVERY ON ORDERS ABOVE ₹499. PAN INDIA SHIPPING.
          </p>

          <form style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="email@example.com" 
              style={{ flex: 1, minWidth: '180px', padding: '0.7rem 1rem', border: '2px solid #000', borderRadius: '0', fontSize: '0.9rem', fontWeight: 700, outline: 'none', background: '#fff' }} 
            />
            <button 
              type="submit" 
              style={{ background: '#000', color: '#fff', border: '2px solid #000', borderRadius: '50px', padding: '0.7rem 1.8rem', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '0.05em', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              SUBSCRIBE
            </button>
          </form>

          {/* FSSAI Categories */}
          <div style={{ marginBottom: '2.5rem', maxWidth: '600px' }}>
            <div style={{ fontWeight: 900, fontSize: '0.7rem', marginBottom: '0.5rem', opacity: 0.7 }}>FSSAI REGISTERED CATEGORIES:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {fssaiCategories.map((cat, i) => (
                <span key={i} style={{ border: '1px solid rgba(0,0,0,0.2)', borderRadius: '4px', padding: '0.2rem 0.5rem', fontSize: '0.65rem', fontWeight: 700 }}>{cat}</span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto' }}>
            <p style={{ fontFamily: '"Dancing Script", cursive', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.2rem' }}>
              © 2026, Adhvaitha Foods
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.05em', alignItems: 'center' }}>
              <Link href="/terms-and-conditions" className="footer-small-link">TERMS & CONDITIONS</Link>
              <Link href="/privacy-policy" className="footer-small-link">PRIVACY POLICY</Link>
              <span style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                {['UPI', 'CARDS', 'COD'].map(method => (
                  <span key={method} style={{ border: '1px solid #000', padding: '0.1rem 0.4rem', borderRadius: '3px' }}>{method}</span>
                ))}
              </span>
            </div>
          </div>
          
        </div>
      </div>

      <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        <a 
          href="https://www.nexlifly.in/" 
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            marginTop: '-1.2rem', /* Pulls the badge exactly onto the line */
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            background: '#000', 
            color: '#fff', 
            padding: '0.5rem 1.2rem', 
            borderRadius: '50px', 
            fontWeight: 900, 
            fontSize: '0.8rem', 
            letterSpacing: '0.05em', 
            textDecoration: 'none',
            boxShadow: '3px 3px 0 rgba(255,255,255,1)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '5px 5px 0 rgba(255,255,255,1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '3px 3px 0 rgba(255,255,255,1)';
          }}
        >
          ⚡ DEVELOPED BY <span style={{ color: '#F97316' }}>NEXLIFLY</span>
        </a>
      </div>

      <style>{`
        .footer-link {
          color: #000;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .footer-link:hover {
          opacity: 0.6;
        }
        .social-pill:hover {
          background: #000 !important;
          color: #fff !important;
        }
        .footer-small-link {
          color: #000;
          text-decoration: none;
        }
        .footer-small-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </footer>
  );
}
