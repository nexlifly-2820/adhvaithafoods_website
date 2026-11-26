'use client';
// Page frame for cart / checkout / orders — same look as the policy pages.
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const ui = {
  h1: { fontFamily: 'Playfair Display, serif', fontWeight: 900, color: 'var(--terracotta)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '0.4rem' },
  h2: { fontFamily: 'Playfair Display, serif', fontWeight: 800, color: 'var(--rich-brown)', fontSize: '1.35rem', marginBottom: '0.5rem' },
  muted: { fontFamily: '"Inter", system-ui, sans-serif', color: 'var(--aged-wood)', fontSize: '0.92rem', lineHeight: 1.5 },
  card: { background: '#fff', borderRadius: '18px', padding: 'clamp(1.1rem, 3vw, 2rem)', boxShadow: '0 10px 30px rgba(61,31,10,0.05)', border: '1px solid rgba(139,94,60,0.12)' },
  input: { width: '100%', boxSizing: 'border-box', padding: '0.8rem 1rem', borderRadius: '12px', border: '1.5px solid rgba(139,94,60,0.3)', fontSize: '1rem', fontFamily: '"Inter", system-ui, sans-serif', background: '#FFFDF8', color: 'var(--rich-brown)', outline: 'none' },
  btn: { background: 'var(--terracotta)', color: '#fff', border: 'none', borderRadius: '999px', padding: '0.9rem 1.6rem', fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.04em', cursor: 'pointer' },
  btnDark: { background: '#111', color: '#fff', border: 'none', borderRadius: '999px', padding: '0.7rem 1.3rem', fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.05em', cursor: 'pointer' },
  btnOutline: { background: 'transparent', color: 'var(--rich-brown)', border: '1.8px solid var(--rich-brown)', borderRadius: '999px', padding: '0.65rem 1.2rem', fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' },
  link: { background: 'none', border: 'none', color: 'var(--terracotta)', fontWeight: 700, cursor: 'pointer', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '0.88rem', padding: 0 },
  error: { color: '#B3261E', background: '#FDECEA', borderRadius: '10px', padding: '0.7rem 0.9rem', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '0.9rem', marginTop: '0.9rem' },
  row: { display: 'flex', justifyContent: 'space-between', gap: '1rem', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '0.95rem', color: 'var(--rich-brown)', padding: '0.3rem 0' },
};

export default function ShopShell({ children, max = 1100 }) {
  return (
    <div style={{ backgroundColor: '#F4ECD8', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <main style={{ paddingTop: 'clamp(130px, 18vw, 160px)', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: max, margin: '0 auto', padding: '0 16px' }}>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
