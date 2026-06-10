'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const timeline = [
  {
    year: '1970',
    title: 'The Beginning',
    person: 'Grandmother Avdaitha Ammayya',
    desc: 'In a small kitchen in Guntur, Andhra Pradesh, Ammayya began making pickles with mangoes from her brother\'s orchard. Stone-ground spices, sun-drying on the terrace, cold-pressed sesame oil — every step by hand. Neighbors and relatives begged for jars.',
    img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop',
    color: '#C4603A',
    id: 'timeline-1970',
  },
  {
    year: '1995',
    title: 'The Second Generation',
    person: 'Mother Sarada & Aunties',
    desc: 'Ammayya\'s daughters learned every secret. The exact ratio of fenugreek to mustard. How many days the mango should sun-dry. They began selling at the local market, expanding to Hyderabad. The recipes were written down for the first time — in a worn notebook.',
    img: 'https://images.unsplash.com/photo-1606850780554-b55ea44f45ce?q=80&w=800&auto=format&fit=crop',
    color: '#2D5A27',
    id: 'timeline-1995',
  },
  {
    year: '2015',
    title: 'Avdaitha Foods Is Born',
    person: 'The Third Generation',
    desc: 'We brought grandmother\'s recipes online. Same stone-ground spices. Same sun-drying method. Same love in every jar — now delivered to 50,000+ families across India. The worn notebook sits on our kitchen shelf as a constant reminder of where we started.',
    img: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=800&auto=format&fit=crop',
    color: '#E8A820',
    id: 'timeline-2015',
  },
  {
    year: '2024',
    title: 'A Global Family',
    person: 'You & Us',
    desc: 'Today, we ship across the world, ensuring that no matter where you are, you can taste the authentic, uncompromised flavor of a true Andhra home.',
    img: 'https://images.unsplash.com/photo-1589255474136-22a00cb0b230?q=80&w=800&auto=format&fit=crop',
    color: '#8B5E3C',
    id: 'timeline-2024',
  }
];

const values = [
  { title: 'Pure Ingredients', desc: 'We source raw mangoes directly from Andhra orchards, use cold-pressed sesame oil, and grind spices fresh each morning.', emoji: '🌿' },
  { title: 'No Compromises', desc: 'No artificial colors, no preservatives, no synthetic flavors. We refuse to take shortcuts on quality.', emoji: '🚫' },
  { title: 'Traditional Methods', desc: 'Stone-grinding, sun-drying, hand-packing. The old methods produce the best flavor — we will never change this.', emoji: '🏺' },
  { title: 'Grandmother\'s Love', desc: 'Every jar is made with the same care and attention that Ammayya gave. Quality is an act of love here.', emoji: '❤️' },
];

export default function OurStoryPage() {
  const horizontalRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Convert vertical wheel to horizontal scroll inside the timeline
  const handleWheel = (e) => {
    if (horizontalRef.current) {
      const container = horizontalRef.current;
      const atLeft = container.scrollLeft === 0;
      const atRight = container.scrollLeft >= (container.scrollWidth - container.clientWidth - 1);
      
      // If we are scrolling down and not at the right edge, scroll right and prevent default
      if (e.deltaY > 0 && !atRight) {
        container.scrollLeft += e.deltaY;
        e.preventDefault();
      }
      // If we are scrolling up and not at the left edge, scroll left and prevent default
      else if (e.deltaY < 0 && !atLeft) {
        container.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }
  };

  useEffect(() => {
    const container = horizontalRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>

        {/* Cinematic Hero */}
        <section id="story-hero" style={{
          position: 'relative', minHeight: '80vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <Image
            src="/images/grandmother_kitchen.png"
            alt="Grandmother in traditional Indian kitchen"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            priority
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(26,15,5,0.7) 0%, rgba(26,15,5,0.95) 100%)',
          }} />
          <div className="reveal" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem 1.5rem', maxWidth: '800px' }}>
            <div style={{
              fontFamily: 'Lato, sans-serif', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase', 
              color: 'var(--turmeric)', marginBottom: '1.5rem'
            }}>Our Heritage</div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 900, color: 'var(--ivory)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Three Generations of<br />
              <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>Pickle Making</em>
            </h1>
            <p style={{
              fontFamily: 'Lato, sans-serif', fontSize: '1.25rem', color: 'rgba(250,240,220,0.8)',
              margin: '0 auto', lineHeight: 1.8
            }}>
              From a small kitchen in Guntur to your doorstep — a story of tradition, love, and the best pickles you'll ever taste.
            </p>
          </div>
        </section>

        {/* Horizontal Scrolling Timeline */}
        <section style={{ background: 'var(--cream)', padding: '6rem 0', overflow: 'hidden', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '0 2rem' }} className="reveal">
            <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--forest-green)' }}>Our Journey</span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 900, color: 'var(--rich-brown)', marginTop: '0.5rem' }}>The Story Behind Every Jar</h2>
            <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1rem', color: 'var(--aged-wood)', marginTop: '1rem' }}>Scroll or drag horizontally to explore</p>
          </div>

          <div 
            ref={horizontalRef}
            style={{ 
              display: 'flex', gap: '3rem', padding: '0 5vw 4rem 5vw', 
              overflowX: 'auto', scrollBehavior: 'smooth', scrollSnapType: 'x mandatory',
              msOverflowStyle: 'none', scrollbarWidth: 'none',
              cursor: 'grab'
            }}
            className="horizontal-scroll-container"
          >
            {timeline.map((item, i) => (
              <div key={item.id} style={{
                flexShrink: 0, width: '80vw', maxWidth: '600px',
                scrollSnapAlign: 'center', position: 'relative',
                display: 'flex', flexDirection: 'column',
                animationDelay: `${i * 0.1}s`
              }} className="reveal">
                
                {/* Connecting Line */}
                <div style={{ position: 'absolute', top: '150px', left: '0', right: '-3rem', height: '2px', background: 'rgba(139,94,60,0.1)', zIndex: 0 }} />

                {/* Cinematic Image Card */}
                <div style={{ 
                  height: '300px', width: '100%', position: 'relative', borderRadius: '24px', overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(61,31,10,0.1)', zIndex: 1, marginBottom: '2.5rem'
                }}>
                  <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${item.color}88, transparent)` }} />
                  
                  {/* Floating Year */}
                  <div style={{ 
                    position: 'absolute', bottom: '-15px', right: '2rem',
                    fontFamily: 'Playfair Display, serif', fontSize: '5rem', fontWeight: 900,
                    color: 'var(--ivory)', lineHeight: 1, opacity: 0.9, textShadow: '0 10px 20px rgba(0,0,0,0.3)'
                  }}>
                    {item.year}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '0 1rem' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 900, color: 'var(--rich-brown)', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <div style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: item.color, marginBottom: '1.5rem' }}>{item.person}</div>
                  <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.15rem', color: 'var(--aged-wood)', lineHeight: 1.7 }}>{item.desc}</p>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* Values - Glassmorphism Grid */}
        <section id="our-values" style={{ padding: '8rem 2rem', background: '#f8f5f0', position: 'relative' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="reveal">
              <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--forest-green)' }}>What We Stand For</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 900, color: 'var(--rich-brown)', marginTop: '0.5rem' }}>Our Values &amp; Promise</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2.5rem' }}>
              {values.map((v, i) => (
                <div key={v.title} className="reveal magnetic" style={{ 
                  background: '#fff', borderRadius: '24px', padding: '3rem 2rem', textAlign: 'center',
                  border: '1px solid rgba(139,94,60,0.05)', boxShadow: '0 10px 30px rgba(61,31,10,0.03)',
                  transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease',
                  animationDelay: `${i * 0.1}s`
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(61,31,10,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(61,31,10,0.03)'; }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1.5rem', transform: 'scale(1)', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>{v.emoji}</div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 800, color: 'var(--forest-green)', marginBottom: '1rem' }}>{v.title}</h3>
                  <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.05rem', color: 'var(--aged-wood)', lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--terracotta)', padding: '8rem 2rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '640px', margin: '0 auto' }} className="reveal">
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: 'var(--ivory)', marginBottom: '1.5rem', lineHeight: 1.2 }}>Taste the Story in Every Jar</h2>
            <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.25rem', color: 'rgba(250,240,220,0.9)', marginBottom: '3rem', lineHeight: 1.7 }}>
              Over 50 years of tradition, delivered to your door.
            </p>
            <Link href="/products" className="btn btn-outline-cream magnetic" style={{ fontSize: '1rem', padding: '1.25rem 3.5rem', border: '2px solid var(--ivory)', background: 'var(--ivory)', color: 'var(--terracotta)' }}>
              Shop All Pickles →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        .horizontal-scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
