'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    // Splash screen timeout
    setTimeout(() => {
      setLoading(false);
    }, 1500);

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
        mainSticker.style.clipPath = `polygon(2000px 2000px, -1000px 2000px, -1000px ${X+1000}px, ${X+1000}px -1000px, 2000px -1000px)`;
        
        // The cylinder rolls diagonally across the image!
        cylinder.style.width = '800px'; // wide enough to cover the whole diagonal
        cylinder.style.left = `${X/2}px`;
        cylinder.style.top = `${X/2}px`;
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
        
        /* Splash Loader Animation */
        @keyframes splashOut {
          0% { transform: scale(1); opacity: 1; }
          40% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(5); opacity: 0; visibility: hidden; }
        }
        
        /* Floating Elements Animations */
        @keyframes floatLeft {
          0% { transform: translateY(0) rotate(-10deg); }
          50% { transform: translateY(-20px) rotate(-5deg); }
          100% { transform: translateY(0) rotate(-10deg); }
        }
        
        @keyframes floatRight {
          0% { transform: translateY(0) rotate(10deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
          100% { transform: translateY(0) rotate(10deg); }
        }
        
        @keyframes dropIn {
          0% { transform: translateY(-100vh) rotate(-45deg); opacity: 0; }
          60% { transform: translateY(20px) rotate(15deg); opacity: 1; }
          80% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(0) rotate(0deg); opacity: 1; }
        }
        
        @keyframes popJar {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        
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
        
        /* Reveal Animation */
        .reveal { opacity: 0; transform: translateY(60px); transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* Splash Screen */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: '#FF1E1E',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: !loading ? 'splashOut 0.8s cubic-bezier(0.8, 0, 0.2, 1) forwards' : 'none',
        pointerEvents: loading ? 'all' : 'none'
      }}>
        <div style={{ position: 'relative', width: '200px', height: '300px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          {/* The Jar */}
          <div style={{
            width: '120px',
            height: '120px',
            position: 'absolute',
            bottom: '0',
            opacity: 0,
            animation: loading ? 'popJar 0.4s ease-out forwards' : 'none',
            zIndex: 10,
            filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.4))'
          }}>
            <img src="/images/contact_loader/bowl.png" alt="Bowl" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          
          {/* Ingredient 1 */}
          <div style={{
            width: '50px',
            height: '50px',
            position: 'absolute',
            bottom: '45px',
            left: '45px',
            opacity: 0,
            animation: loading ? 'dropIn 0.5s ease-out 0.2s forwards' : 'none',
            zIndex: 20,
            filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))'
          }}>
            <img src="/images/contact_loader/ing1.png" alt="Ingredient 1" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          
          {/* Ingredient 2 */}
          <div style={{
            width: '55px',
            height: '55px',
            position: 'absolute',
            bottom: '50px', 
            left: '75px',
            opacity: 0,
            animation: loading ? 'dropIn 0.5s ease-out 0.35s forwards' : 'none',
            zIndex: 21,
            filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))'
          }}>
            <img src="/images/contact_loader/ing2.png" alt="Ingredient 2" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          
          {/* Ingredient 3 */}
          <div style={{
            width: '45px',
            height: '45px',
            position: 'absolute',
            bottom: '55px', 
            left: '55px',
            opacity: 0,
            animation: loading ? 'dropIn 0.5s ease-out 0.5s forwards' : 'none',
            zIndex: 22,
            filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))'
          }}>
            <img src="/images/contact_loader/ing3.png" alt="Ingredient 3" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>

          {/* Ingredient 4 */}
          <div style={{
            width: '45px',
            height: '45px',
            position: 'absolute',
            bottom: '45px', 
            left: '85px',
            opacity: 0,
            animation: loading ? 'dropIn 0.5s ease-out 0.65s forwards' : 'none',
            zIndex: 23,
            filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))'
          }}>
            <img src="/images/contact_loader/ing4.png" alt="Ingredient 4" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          
          {/* Loading Text */}
          <div style={{
            position: 'absolute',
            bottom: '-40px',
            fontFamily: 'Mouse Memoirs, sans-serif',
            fontSize: '2rem',
            color: '#FFF',
            letterSpacing: '2px',
            opacity: 0,
            animation: loading ? 'popJar 0.4s ease-out 0.8s forwards' : 'none',
            textShadow: '0 4px 10px rgba(0,0,0,0.2)',
            whiteSpace: 'nowrap'
          }}>
            MIXING...
          </div>
        </div>
      </div>

      <main>

        {/* Vibrant Red Hero Section */}
        <section style={{
          position: 'relative', overflow: 'hidden',
          backgroundColor: '#FF1E1E',
          minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '12rem 2rem 15rem',
        }}>

          {/* Floating Illustrations */}
          <div style={{
            position: 'absolute', left: '5%', top: '30%', fontSize: '10rem',
            animation: 'floatLeft 4s infinite ease-in-out', zIndex: 0,
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
          }}>
            🌶️
          </div>
          <div style={{
            position: 'absolute', right: '5%', top: '40%', fontSize: '12rem',
            animation: 'floatRight 5s infinite ease-in-out', zIndex: 0,
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
          }}>
            🥭
          </div>

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', width: '100%' }} className="reveal">

            {/* Say Hello Badge */}
            <div style={{
              display: 'inline-block', background: '#FFF', color: '#FF1E1E',
              padding: '0.5rem 2rem', borderRadius: '50px',
              transform: 'rotate(-5deg)', marginBottom: '3rem',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
            }}>
              <span className="font-mouse" style={{ fontSize: '3rem', letterSpacing: '2px' }}>SAY HELLO</span>
            </div>

            <h1 className="font-mouse" style={{
              fontSize: 'clamp(5rem, 12vw, 10rem)',
              color: '#FFF',
              lineHeight: 0.85,
              textTransform: 'uppercase',
              textShadow: '3px 3px 0 #111, -1px -1px 0 #111, 1px -1px 0 #111, -1px 1px 0 #111, 1px 1px 0 #111',
              marginBottom: '5rem'
            }}>
              GOT A CRAVING?<br />LET'S TALK
            </h1>

            {/* The Form */}
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '4rem', background: 'transparent' }}>

                <input
                  type="text"
                  className="crav-input"
                  placeholder="FULL NAME"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />

                <input
                  type="email"
                  className="crav-input"
                  placeholder="YOUR BEST EMAIL"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />

                <input
                  type="tel"
                  className="crav-input"
                  placeholder="PHONE NUMBER"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />

                <input
                  type="text"
                  className="crav-input"
                  placeholder="SUBJECT (E.G. BULK ORDER)"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                />

                <textarea
                  className="crav-input"
                  placeholder="TELL US YOUR CRAVING..."
                  rows={2}
                  required
                  style={{ resize: 'vertical', minHeight: '80px' }}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                />

                {/* Submit Button */}
                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                  <button
                    type="submit"
                    className="font-mouse"
                    style={{
                      background: '#F0CD4C', color: '#111',
                      fontSize: '3.5rem', letterSpacing: '2px',
                      padding: '1.5rem 8rem', borderRadius: '50px', border: '4px solid #111',
                      cursor: 'pointer', boxShadow: '0 10px 0 #111',
                      transition: 'transform 0.1s ease, box-shadow 0.1s ease'
                    }}
                    onMouseDown={e => { e.currentTarget.style.transform = 'translateY(5px)'; e.currentTarget.style.boxShadow = '0 5px 0 #111'; }}
                    onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 0 #111'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 0 #111'; }}
                  >
                    SEND MESSAGE
                  </button>
                </div>

              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
                <h2 className="font-mouse" style={{ fontSize: '6rem', color: '#FFF', marginBottom: '1rem', textShadow: '3px 3px 0 #111' }}>BOOM! SENT!</h2>
                <p className="font-mouse" style={{ fontSize: '3rem', color: '#F0CD4C', letterSpacing: '1px' }}>WE WILL GET BACK TO YOU SOON.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                  className="font-mouse"
                  style={{
                    background: '#FFF', color: '#111', border: '4px solid #111',
                    fontSize: '2.5rem', padding: '1rem 4rem', borderRadius: '50px',
                    cursor: 'pointer', marginTop: '4rem', boxShadow: '0 8px 0 #111'
                  }}
                >
                  SEND ANOTHER
                </button>
              </div>
            )}
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
          <div id="peeling-logo-wrapper" style={{ position: 'absolute', right: '10%', top: '-150px', width: '300px', height: '300px', zIndex: 10, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}>
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

              <h2 className="font-mouse" style={{
                fontSize: 'clamp(6rem, 15vw, 12rem)',
                color: '#FF1E1E',
                lineHeight: 0.8,
                textTransform: 'uppercase',
              }}>
                FEEL THE<br />SPICE
              </h2>
            </div>

            {/* Contact Info Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginTop: '8rem' }}>

              {[
                { icon: <MapPin size={48} color="#FF1E1E" />, title: 'OUR KITCHEN', text: 'Avdaitha Foods, Abids\nHyderabad, Telangana 500001' },
                { icon: <Phone size={48} color="#FF1E1E" />, title: 'CALL US', text: '+91 98765 43210\nMon–Sat, 9AM–6PM' },
                { icon: <Mail size={48} color="#FF1E1E" />, title: 'EMAIL', text: 'hello@avdaithafoods.com\norders@avdaithafoods.com' },
                { icon: <Clock size={48} color="#FF1E1E" />, title: 'HOURS', text: 'Mon–Sat: 9AM – 6PM\nSunday: Closed' }
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
              <a href="https://wa.me/919876543210?text=Hello%20Avdaitha%20Foods!" target="_blank" rel="noopener noreferrer"
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
                <span className="font-mouse" style={{ fontSize: '4rem', letterSpacing: '2px', transform: 'translateY(2px)' }}>
                  CHAT ON WHATSAPP
                </span>
              </a>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
