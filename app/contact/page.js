'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

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

    // Diagonal Cylinder Roll Animation (Bottom-Right to Top-Left)
    const handleScroll = () => {
      const container = document.getElementById('peeling-logo-wrapper');
      const mainSticker = document.getElementById('sticker-main');
      const cylinder = document.getElementById('cylinder-roll');

      if (container && mainSticker && cylinder) {
        const rect = container.getBoundingClientRect();

        // Calculate how far the logo has scrolled into the viewport.
        const scrollProgress = window.innerHeight - rect.top - 100;

        // p goes from 0 to 600 (the full diagonal distance of the 300x300 logo)
        const p = Math.min(Math.max(scrollProgress * 1.5, 0), 600);

        // X is the diagonal cut line position. Starts at 600 (bottom-right) and moves to 0 (top-left)
        const X = 600 - p;

        // Complex polygon that reveals the image from bottom-right to top-left!
        mainSticker.style.clipPath = `polygon(2000px 2000px, -1000px 2000px, -1000px ${X + 1000}px, ${X + 1000}px -1000px, 2000px -1000px)`;

        // The cylinder rolls diagonally across the image!
        cylinder.style.width = '800px'; // wide enough to cover the whole diagonal
        cylinder.style.left = `${X / 2}px`;
        cylinder.style.top = `${X / 2}px`;
        cylinder.style.transform = 'translate(-50%, -50%) rotate(-45deg)';

        // Hide the cylinder when it is fully folded or fully unrolled
        if (p <= 5 || p >= 595) {
          cylinder.style.opacity = '0';
        } else {
          cylinder.style.opacity = '1';
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#F4ECD8', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Mouse+Memoirs&family=Inter:wght@400;700&display=swap');
        
        .font-mouse { font-family: 'Mouse Memoirs', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        /* Floating Elements Animations */
        /* Animated Parallax Waves */
        .waves {
          position: relative;
          width: 100%;
          height: 80px;
          margin-bottom: -7px;
          min-height: 80px;
          max-height: 120px;
          display: block;
        }
        .parallax > use {
          animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
        }
        .parallax > use:nth-child(1) { animation-delay: -2s; animation-duration: 7s; }
        .parallax > use:nth-child(2) { animation-delay: -3s; animation-duration: 10s; }
        .parallax > use:nth-child(3) { animation-delay: -4s; animation-duration: 13s; }
        .parallax > use:nth-child(4) { animation-delay: -5s; animation-duration: 20s; }
        @keyframes move-forever {
          0% { transform: translate3d(-90px,0,0); }
          100% { transform: translate3d(85px,0,0); }
        }
        
        .crav-input {
          background: transparent;
          border: none;
          border-bottom: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 0;
          color: #FFF;
          font-family: 'Mouse Memoirs', sans-serif;
          font-size: 2.5rem;
          padding: 1rem 0;
          width: 100%;
          outline: none;
          transition: border-color 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .crav-input:focus {
          border-bottom-color: #F0CD4C; /* Yellow focus */
        }
        
        .crav-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        
        /* Crav Input Boxed (New Style) */
        .crav-input-boxed {
          background: #f9f9f9;
          border: 1px solid #ccc;
          border-radius: 8px;
          color: #333;
          font-size: 1.1rem;
          padding: 0.7rem 1rem;
          width: 100%;
          outline: none;
          transition: all 0.3s ease;
          font-family: inherit;
        }
        .crav-input-boxed:focus {
          border-color: #1c402c;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(28, 64, 44, 0.1);
        }
        .crav-input-boxed::placeholder {
          color: #999;
        }
        
        /* Reveal Animation */
        .reveal { opacity: 0; transform: translateY(60px); transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <main>

        {/* Vibrant Red Hero Section */}
        <section style={{
          position: 'relative', overflow: 'hidden',
          backgroundColor: '#FF1E1E',
          minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '12rem 2rem 15rem',
        }}>



          <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', width: '100%' }} className="reveal">
            
            {/* Say Hello Badge (Restored) */}
            <div style={{
              display: 'inline-block', background: '#FFF', color: '#FF1E1E',
              padding: '0.5rem 2rem', borderRadius: '50px',
              transform: 'rotate(-5deg)', marginBottom: '3rem',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
              marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'
            }}>
              <span className="font-mouse" style={{ fontSize: '3rem', letterSpacing: '2px' }}>SAY HELLO</span>
            </div>

            <h1 className="font-mouse contact-hero-title" style={{
              fontSize: 'clamp(5rem, 12vw, 10rem)',
              color: '#FFF',
              lineHeight: 0.85,
              textTransform: 'uppercase',
              textShadow: '3px 3px 0 #111, -1px -1px 0 #111, 1px -1px 0 #111, -1px 1px 0 #111, 1px 1px 0 #111',
              marginBottom: '5rem'
            }}>
              GOT A CRAVING?<br />LET'S TALK
            </h1>

            {/* The Form Section */}
            <div className="contact-hero-grid" style={{ display: 'grid', gap: '4rem', alignItems: 'center', textAlign: 'left', marginTop: '4rem' }}>
              
              {/* Left Column */}
              <div>
                <p style={{ color: '#F0CD4C', fontWeight: '800', fontSize: '1.2rem', letterSpacing: '2px', marginBottom: '1rem', textTransform: 'uppercase' }}>CONTACT ADHVAITHA FOODS</p>
                <h2 className="font-mouse contact-hero-subtitle" style={{
                  fontSize: 'clamp(4rem, 8vw, 6rem)',
                  color: '#FFF',
                  lineHeight: 0.85,
                  textTransform: 'uppercase',
                  textShadow: '3px 3px 0 #111, -1px -1px 0 #111, 1px -1px 0 #111, -1px 1px 0 #111, 1px 1px 0 #111',
                  marginBottom: '2rem'
                }}>
                  STILL CURIOUS?
                </h2>
                <p style={{ color: '#FFF', fontSize: '1.4rem', lineHeight: '1.6', maxWidth: '500px', fontWeight: '500' }}>
                  We hope you found everything you needed about our authentic pickles and spices. But if you've got more questions (or just want to talk about food), hit us up.
                </p>
              </div>

              {/* Right Column - Form Card */}
              <div style={{ position: 'relative', background: '#FFF', borderRadius: '16px', padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                
                {/* Jagged Badge */}
                <div className="contact-badge" style={{
                  position: 'absolute', top: '-40px', right: '-30px',
                  background: '#1c402c', color: '#FFF',
                  width: '140px', height: '140px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textAlign: 'center', borderRadius: '50%',
                  fontWeight: 'bold', fontSize: '0.9rem', lineHeight: 1.2,
                  boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                  clipPath: 'polygon(50% 0%, 61% 11%, 76% 5%, 82% 20%, 97% 22%, 96% 38%, 100% 50%, 96% 62%, 97% 78%, 82% 80%, 76% 95%, 61% 89%, 50% 100%, 39% 89%, 24% 95%, 18% 80%, 3% 78%, 4% 62%, 0% 50%, 4% 38%, 3% 22%, 18% 20%, 24% 5%, 39% 11%)',
                  transform: 'rotate(15deg)', padding: '1rem', zIndex: 10
                }}>
                  <span style={{ transform: 'rotate(-15deg)', display: 'block' }}>WE'RE ALL EARS<br/>— AND EXTRA<br/>SPICE!</span>
                </div>

                {!submitted ? (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                      <input
                        type="text"
                        placeholder="First Name*"
                        required
                        className="crav-input-boxed"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Last Name*"
                        className="crav-input-boxed"
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                      <input
                        type="email"
                        placeholder="Email*"
                        required
                        className="crav-input-boxed"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className="crav-input-boxed"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                    
                    <input
                      type="text"
                      placeholder="Contact Reason*"
                      required
                      className="crav-input-boxed"
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                    />

                    <textarea
                      placeholder="How can we help you?"
                      rows={2}
                      required
                      className="crav-input-boxed"
                      style={{ resize: 'vertical', minHeight: '60px' }}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                    />

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
                      <input type="checkbox" required style={{ marginTop: '0.3rem', transform: 'scale(1.2)' }} />
                      <label>By submitting this form, you agree to our Terms & Conditions and understand that your information may be used in accordance with our privacy practices.</label>
                    </div>

                      <button
                      type="submit"
                      className="font-mouse contact-submit-btn-boxed"
                      style={{
                        background: '#1c402c', color: '#FFF',
                        fontSize: '2rem', letterSpacing: '2px',
                        padding: '0.6rem', borderRadius: '50px', border: 'none',
                        cursor: 'pointer', marginTop: '0.5rem', width: '100%',
                        transition: 'opacity 0.2s ease',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                      }}
                      onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
                      onMouseOut={e => e.currentTarget.style.opacity = '1'}
                    >
                      SUBMIT
                    </button>
                  </form>
                ) : (
                  <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                    <h2 className="font-mouse" style={{ fontSize: '5rem', color: '#1c402c', marginBottom: '1rem' }}>BOOM! SENT!</h2>
                    <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem' }}>We will get back to you shortly.</p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                      className="font-mouse"
                      style={{
                        background: '#1c402c', color: '#FFF', border: 'none',
                        fontSize: '2rem', padding: '0.8rem 3rem', borderRadius: '50px',
                        cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                      }}
                    >
                      SEND ANOTHER
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Wavy Transition (Red to Cream) */}
        <div style={{ position: 'relative', marginTop: '-1px', zIndex: 2, backgroundColor: '#F4ECD8' }}>
          <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto" style={{ transform: 'rotate(180deg)' }}>
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax">
              {/* Simplified to a gentle, slow flowing wave */}
              <use href="#gentle-wave" x="48" y="4" fill="rgba(255, 30, 30, 0.5)" style={{ animationDuration: '25s' }} />
              <use href="#gentle-wave" x="48" y="7" fill="#FF1E1E" style={{ animationDuration: '35s' }} />
            </g>
          </svg>
        </div>

        {/* Cream Section - Contact Information */}
        <section style={{ backgroundColor: '#F4ECD8', padding: '6rem 2rem 10rem', position: 'relative' }}>

          {/* Rolling Cylinder Logo */}
          <div id="peeling-logo-wrapper" className="contact-peeling-logo" style={{ position: 'absolute', right: '10%', top: '-150px', width: '300px', height: '300px', zIndex: 10, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}>
            {/* The Unrolled Image */}
            <img
              id="sticker-main"
              src="/images/Adhvaitha_foods_logo.png"
              alt="Adhvaitha Foods Logo"
              style={{ width: '100%', height: '100%', position: 'absolute' }}
            />
            {/* The Masked Cylinder Wrapper */}
            <div
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                WebkitMaskImage: 'url(/images/Adhvaitha_foods_logo.png)',
                WebkitMaskSize: '100% 100%',
                maskImage: 'url(/images/Adhvaitha_foods_logo.png)',
                maskSize: '100% 100%'
              }}
            >
              {/* The 3D Rolled Paper Edge */}
              <div
                id="cylinder-roll"
                style={{
                  position: 'absolute', height: '40px',
                  background: 'linear-gradient(to bottom, rgba(200,180,150,0.8) 0%, rgba(255,255,255,1) 40%, rgba(100,80,50,0.8) 100%)',
                  boxShadow: '0px 25px 25px -10px rgba(0,0,0,0.8)',
                  transition: 'opacity 0.2s ease',
                  borderRadius: '20px' // Softens the edges of the cylinder
                }}
              >
              </div>
            </div>
          </div>

          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>

            {/* Massive Red Text */}
            <div className="reveal" style={{ marginBottom: '6rem' }}>
              <div style={{
                display: 'inline-block', background: '#FFF', color: '#FF1E1E',
                padding: '0.5rem 2rem', borderRadius: '50px',
                transform: 'rotate(4deg)', marginBottom: '2rem',
                border: '3px solid #FF1E1E'
              }}>
                <span className="font-mouse" style={{ fontSize: '2.5rem', letterSpacing: '2px' }}>FIND US</span>
              </div>

              <h2 className="font-mouse contact-feel-spice" style={{
                fontSize: 'clamp(6rem, 15vw, 12rem)',
                color: '#FF1E1E',
                lineHeight: 0.8,
                textTransform: 'uppercase',
              }}>
                FEEL THE<br />SPICE
              </h2>
            </div>

            {/* Contact Info Grid */}
            <div className="contact-grid">

              {[
                { icon: <MapPin size={48} color="#FF1E1E" />, title: 'OUR KITCHEN', text: 'Adhvaitha Foods, North East Colony\nDeshmukhi, Yadadri Bhuvanagiri 508284' },
                { icon: <Phone size={48} color="#FF1E1E" />, title: 'CALL US', text: '+91 93939 34200\nMon–Sun, 9AM–6PM' },
                { icon: <Mail size={48} color="#FF1E1E" />, title: 'EMAIL', text: 'hello@avdaithafoods.in\nsupport@avdaithafoods.in' },
                { icon: <Clock size={48} color="#FF1E1E" />, title: 'HOURS', text: 'Mon–Sun: 9AM – 6PM\nOpen Every Day' }
              ].map((item, i) => (
                <div key={i} className="reveal" style={{
                  animationDelay: `${i * 0.1}s`
                }}>
                  <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                  <h3 className="font-mouse" style={{ fontSize: '3.5rem', color: '#111', marginBottom: '1rem', letterSpacing: '1px' }}>
                    {item.title}
                  </h3>
                  <p className="font-mouse" style={{ fontSize: '2.2rem', color: '#555', lineHeight: 1.2, whiteSpace: 'pre-line' }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Massive WhatsApp Pill */}
            <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginTop: '8rem' }}>
              <a href="https://wa.me/919393934200?text=Hello%20Avdaitha%20Foods!" target="_blank" rel="noopener noreferrer"
                className="contact-whatsapp-btn"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '1rem',
                  background: '#25D366', color: '#FFF',
                  padding: '1.5rem 5rem', borderRadius: '50px', border: '4px solid #111',
                  textDecoration: 'none', transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                  boxShadow: '0 10px 0 #111'
                }}
                onMouseDown={e => { e.currentTarget.style.transform = 'translateY(5px)'; e.currentTarget.style.boxShadow = '0 5px 0 #111'; }}
                onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 0 #111'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 0 #111'; }}
              >
                <MessageCircle size={40} fill="#FFF" />
                <span className="font-mouse contact-whatsapp-text" style={{ fontSize: '4rem', letterSpacing: '2px', transform: 'translateY(2px)' }}>
                  CHAT ON WHATSAPP
                </span>
              </a>
            </div>

          </div>
        </section>

        <style>{`
          .contact-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
            margin-top: 8rem;
          }
          @media (max-width: 1100px) {
            .contact-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 3rem;
            }
          }
          @media (max-width: 600px) {
            .contact-grid {
              grid-template-columns: 1fr;
              gap: 4rem;
            }
          }
          .contact-hero-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4rem !important;
          }
          @media (max-width: 900px) {
            .contact-hero-grid {
              grid-template-columns: 1fr;
              text-align: center !important;
            }
            .contact-badge {
              right: -10px !important;
              top: -20px !important;
              width: 100px !important;
              height: 100px !important;
              font-size: 0.7rem !important;
              padding: 0.5rem !important;
            }
            .contact-hero-subtitle {
              font-size: clamp(3rem, 12vw, 5rem) !important;
            }
            .contact-hero-title {
              line-height: 1 !important;
              font-size: clamp(4rem, 12vw, 6rem) !important;
              margin-bottom: 3rem !important;
            }
            .contact-submit-btn {
              padding: 1rem 3rem !important;
              font-size: 2.5rem !important;
            }
            .contact-peeling-logo {
              display: none !important; /* Hide massive absolute logo on mobile */
            }
            .contact-feel-spice {
              line-height: 1 !important;
              font-size: clamp(4rem, 15vw, 6rem) !important;
            }
            .contact-whatsapp-btn {
              padding: 1rem 2rem !important;
            }
            .contact-whatsapp-text {
              font-size: 2rem !important;
            }
          }
        `}</style>
      </main>
      <Footer />
    </div>
  );
}
