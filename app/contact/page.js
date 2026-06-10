'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main>

        {/* Cinematic Hero */}
        <section id="contact-hero" style={{
          position: 'relative', overflow: 'hidden',
          minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '8rem 2rem 5rem'
        }}>
          {/* Background Image */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
             <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2000&auto=format&fit=crop" alt="Spices background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,10,3,0.85), rgba(45,90,39,0.95))' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }} className="reveal">
            <span style={{ 
              fontFamily: 'Lato, sans-serif', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase', 
              color: 'var(--turmeric)', display: 'block', marginBottom: '1.5rem' 
            }}>
              We'd Love to Hear From You
            </span>
            <h1 style={{ 
              fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3.5rem, 8vw, 6rem)', 
              fontWeight: 900, color: 'var(--ivory)', marginBottom: '1.5rem', lineHeight: 1 
            }}>
              Get In<br />
              <em style={{ color: 'var(--turmeric)', fontStyle: 'italic' }}>Touch</em>
            </h1>
            <p style={{ 
              fontFamily: 'Lato, sans-serif', fontSize: '1.25rem', color: 'rgba(250,240,220,0.8)', 
              lineHeight: 1.8 
            }}>
              Questions, bulk orders, or just want to share your grandmother's recipe — we're here to listen.
            </p>
          </div>
        </section>

        {/* Premium Contact Grid */}
        <section style={{ padding: '8rem 2rem', background: 'var(--cream)', position: 'relative' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '5rem' }} className="contact-grid">

            {/* Left: Info */}
            <div className="reveal">
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 900, color: 'var(--forest-green)', marginBottom: '3rem' }}>Contact Information</h2>

              {[
                { icon: <MapPin size={24} />, title: 'Our Kitchen', lines: ['Avdaitha Foods, Abids', 'Hyderabad, Telangana 500001', 'India'], id: 'contact-address' },
                { icon: <Phone size={24} />, title: 'Phone & WhatsApp', lines: ['+91 98765 43210', 'Available Mon–Sat, 9AM–6PM'], id: 'contact-phone' },
                { icon: <Mail size={24} />, title: 'Email', lines: ['hello@avdaithafoods.com', 'orders@avdaithafoods.com'], id: 'contact-email' },
                { icon: <Clock size={24} />, title: 'Working Hours', lines: ['Monday – Saturday: 9:00 AM – 6:00 PM', 'Sunday: Closed (even grandmothers rest!)'], id: 'contact-hours' },
              ].map((item, i) => (
                <div key={item.id} id={item.id} style={{
                  display: 'flex', gap: '1.5rem', marginBottom: '2.5rem',
                  padding: '2rem', background: 'var(--ivory)',
                  borderRadius: '16px', border: '1px solid rgba(139,94,60,0.1)',
                  boxShadow: '0 10px 30px rgba(61,31,10,0.03)',
                  transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease',
                  animationDelay: `${i * 0.1}s`
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(10px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(61,31,10,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(61,31,10,0.03)'; }}
                >
                  <div style={{
                    color: 'var(--terracotta)', flexShrink: 0,
                    background: 'rgba(196,96,58,0.1)', padding: '1rem', borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>{item.icon}</div>
                  <div>
                    <div style={{
                      fontFamily: 'Lato, sans-serif',
                      fontSize: '0.85rem', fontWeight: 900,
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      color: 'var(--forest-green)', marginBottom: '0.5rem',
                    }}>{item.title}</div>
                    {item.lines.map((line, idx) => (
                      <p key={idx} style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.05rem', color: 'var(--rich-brown)', lineHeight: 1.6 }}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Advanced WhatsApp CTA */}
              <a
                href="https://wa.me/919876543210?text=Hello%20Avdaitha%20Foods!%20I%20would%20like%20to%20order%20pickles."
                id="whatsapp-cta"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
                  background: '#25D366', color: 'white',
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '1.5rem 2rem', borderRadius: '16px',
                  textDecoration: 'none',
                  transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease',
                  marginTop: '3rem',
                  boxShadow: '0 10px 30px rgba(37,211,102,0.3)'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(37,211,102,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(37,211,102,0.3)'; }}
              >
                <MessageCircle size={24} /> Chat on WhatsApp
              </a>
            </div>

            {/* Right: Glassmorphism Form */}
            <div className="reveal" style={{ animationDelay: '0.3s' }}>
              <div style={{
                background: 'var(--ivory)', borderRadius: '24px',
                padding: '4rem', border: '1px solid rgba(139,94,60,0.1)',
                boxShadow: '0 30px 60px rgba(61,31,10,0.05)',
              }}>
                {!submitted ? (
                  <>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 900, color: 'var(--forest-green)', marginBottom: '1rem' }}>Send Us a Message</h2>
                    <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.1rem', color: 'var(--aged-wood)', marginBottom: '3rem' }}>We reply within 24 hours on working days.</p>

                    <form id="contact-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="form-row">
                        <div>
                          <label htmlFor="contact-name" style={{ display: 'block', fontFamily: 'Lato, sans-serif', fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--forest-green)', marginBottom: '0.75rem' }}>Full Name *</label>
                          <input
                            id="contact-name"
                            type="text" required
                            placeholder="Your full name"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            style={{
                              width: '100%', padding: '1.25rem 1.5rem',
                              border: '1px solid rgba(139,94,60,0.2)', borderRadius: '12px',
                              background: '#f8f5f0', fontFamily: 'Lato, sans-serif',
                              fontSize: '1rem', color: 'var(--rich-brown)', outline: 'none',
                              transition: 'all 0.3s ease',
                            }}
                            onFocus={e => { e.target.style.borderColor = 'var(--terracotta)'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 4px rgba(196,96,58,0.1)'; }}
                            onBlur={e => { e.target.style.borderColor = 'rgba(139,94,60,0.2)'; e.target.style.background = '#f8f5f0'; e.target.style.boxShadow = 'none'; }}
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-phone" style={{ display: 'block', fontFamily: 'Lato, sans-serif', fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--forest-green)', marginBottom: '0.75rem' }}>Phone</label>
                          <input
                            id="contact-phone"
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                            style={{
                              width: '100%', padding: '1.25rem 1.5rem',
                              border: '1px solid rgba(139,94,60,0.2)', borderRadius: '12px',
                              background: '#f8f5f0', fontFamily: 'Lato, sans-serif',
                              fontSize: '1rem', color: 'var(--rich-brown)', outline: 'none',
                              transition: 'all 0.3s ease',
                            }}
                            onFocus={e => { e.target.style.borderColor = 'var(--terracotta)'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 4px rgba(196,96,58,0.1)'; }}
                            onBlur={e => { e.target.style.borderColor = 'rgba(139,94,60,0.2)'; e.target.style.background = '#f8f5f0'; e.target.style.boxShadow = 'none'; }}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="contact-email" style={{ display: 'block', fontFamily: 'Lato, sans-serif', fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--forest-green)', marginBottom: '0.75rem' }}>Email Address *</label>
                        <input
                          id="contact-email"
                          type="email" required
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          style={{
                            width: '100%', padding: '1.25rem 1.5rem',
                            border: '1px solid rgba(139,94,60,0.2)', borderRadius: '12px',
                            background: '#f8f5f0', fontFamily: 'Lato, sans-serif',
                            fontSize: '1rem', color: 'var(--rich-brown)', outline: 'none',
                            transition: 'all 0.3s ease',
                          }}
                          onFocus={e => { e.target.style.borderColor = 'var(--terracotta)'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 4px rgba(196,96,58,0.1)'; }}
                          onBlur={e => { e.target.style.borderColor = 'rgba(139,94,60,0.2)'; e.target.style.background = '#f8f5f0'; e.target.style.boxShadow = 'none'; }}
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-subject" style={{ display: 'block', fontFamily: 'Lato, sans-serif', fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--forest-green)', marginBottom: '0.75rem' }}>Subject</label>
                        <select
                          id="contact-subject"
                          value={form.subject}
                          onChange={e => setForm({ ...form, subject: e.target.value })}
                          style={{
                            width: '100%', padding: '1.25rem 1.5rem',
                            border: '1px solid rgba(139,94,60,0.2)', borderRadius: '12px',
                            background: '#f8f5f0', fontFamily: 'Lato, sans-serif',
                            fontSize: '1rem', color: 'var(--rich-brown)', outline: 'none',
                            cursor: 'pointer', transition: 'all 0.3s ease',
                            appearance: 'none'
                          }}
                          onFocus={e => { e.target.style.borderColor = 'var(--terracotta)'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 4px rgba(196,96,58,0.1)'; }}
                          onBlur={e => { e.target.style.borderColor = 'rgba(139,94,60,0.2)'; e.target.style.background = '#f8f5f0'; e.target.style.boxShadow = 'none'; }}
                        >
                          <option value="">Select a subject...</option>
                          <option value="order">Place an Order / Bulk Order</option>
                          <option value="tracking">Order Tracking</option>
                          <option value="wholesale">Wholesale Inquiry</option>
                          <option value="feedback">Product Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="contact-message" style={{ display: 'block', fontFamily: 'Lato, sans-serif', fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--forest-green)', marginBottom: '0.75rem' }}>Message *</label>
                        <textarea
                          id="contact-message"
                          required rows={6}
                          placeholder="Tell us what you need..."
                          value={form.message}
                          onChange={e => setForm({ ...form, message: e.target.value })}
                          style={{
                            width: '100%', padding: '1.25rem 1.5rem',
                            border: '1px solid rgba(139,94,60,0.2)', borderRadius: '12px',
                            background: '#f8f5f0', fontFamily: 'Lato, sans-serif',
                            fontSize: '1rem', color: 'var(--rich-brown)', outline: 'none',
                            resize: 'vertical', transition: 'all 0.3s ease',
                          }}
                          onFocus={e => { e.target.style.borderColor = 'var(--terracotta)'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 4px rgba(196,96,58,0.1)'; }}
                          onBlur={e => { e.target.style.borderColor = 'rgba(139,94,60,0.2)'; e.target.style.background = '#f8f5f0'; e.target.style.boxShadow = 'none'; }}
                        />
                      </div>

                      <button id="contact-submit-btn" type="submit" style={{ 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
                        background: 'var(--terracotta)', color: 'var(--ivory)',
                        fontFamily: 'Lato, sans-serif', fontSize: '1.1rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase',
                        padding: '1.5rem', borderRadius: '12px', border: 'none', cursor: 'pointer',
                        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease',
                        marginTop: '1rem'
                      }}
                      onMouseOver={e => e.currentTarget.style.background = '#a64f2d'}
                      onMouseOut={e => e.currentTarget.style.background = 'var(--terracotta)'}
                      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <Send size={20} /> Send Message
                      </button>
                    </form>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
                    <div style={{ fontSize: '5rem', marginBottom: '2rem', animation: 'float 6s ease-in-out infinite' }}>🏺</div>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', fontWeight: 900, color: 'var(--forest-green)', marginBottom: '1.5rem' }}>Message Sent!</h3>
                    <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.2rem', color: 'var(--aged-wood)', marginBottom: '3rem', lineHeight: 1.8 }}>
                      Thank you for reaching out. We'll get back to you within 24 hours on working days. In the meantime, explore our pickle collection!
                    </p>
                    <Link href="/products" style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      background: 'var(--terracotta)', color: 'var(--ivory)',
                      fontFamily: 'Lato, sans-serif', fontSize: '1rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase',
                      padding: '1.25rem 3rem', borderRadius: '50px', textDecoration: 'none',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(196,96,58,0.3)'; }}
                    onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >Browse Pickles →</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Cinematic Bulk Orders Banner */}
        <section style={{ position: 'relative', overflow: 'hidden', padding: '10rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
             <img src="https://images.unsplash.com/photo-1606850780554-b55ea44f45ce?q=80&w=2000&auto=format&fit=crop" alt="Bulk spices" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(196,96,58,0.95), rgba(26,10,3,0.95))' }} />
          </div>
          
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }} className="reveal">
            <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--turmeric)', display: 'block', marginBottom: '1.5rem' }}>
              Partnerships
            </span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 900, color: 'var(--ivory)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Bulk &amp; Wholesale<br /><em style={{ color: 'var(--turmeric)', fontStyle: 'italic' }}>Orders Welcome</em>
            </h2>
            <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.25rem', color: 'rgba(250,240,220,0.8)', marginBottom: '3rem', lineHeight: 1.8 }}>
              Corporate gifting, wedding favors, restaurant supply, or grocery chains — we offer custom labels, bulk pricing, and dedicated artisan support.
            </p>
            <a
              href="mailto:wholesale@avdaithafoods.com"
              id="wholesale-email-btn"
              style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '1rem',
                background: 'transparent', color: 'var(--turmeric)',
                fontFamily: 'Lato, sans-serif', fontSize: '1rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase',
                padding: '1.25rem 3.5rem', borderRadius: '50px', border: '2px solid var(--turmeric)', cursor: 'pointer', textDecoration: 'none',
                transition: 'background 0.3s ease, color 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              }}
              onMouseOver={e => { e.currentTarget.style.background = 'var(--turmeric)'; e.currentTarget.style.color = 'var(--rich-brown)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--turmeric)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <Mail size={18} /> Email Us for Wholesale
            </a>
          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
