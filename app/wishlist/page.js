'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import ShopShell, { ui } from '@/components/shop/ShopShell';
import AddToCart from '@/components/shop/AddToCart';
import { useShop, toggleWish, loadCatalog, imgSrc, rupees } from '@/components/shop/shopStore';

export default function WishlistPage() {
  const { wish, hydrated, token } = useShop();
  useEffect(() => { loadCatalog(); }, []);

  if (!hydrated) return <ShopShell><p style={ui.muted}>Loading…</p></ShopShell>;

  return (
    <ShopShell>
      <h1 style={ui.h1}>Your Wishlist</h1>
      <p style={{ ...ui.muted, marginBottom: '1.5rem' }}>
        {wish.length ? `${wish.length} saved item(s)` : ''}{!token && wish.length ? ' · log in at checkout to keep it with your Adhvaitha app account' : token ? ' · same wishlist as your Adhvaitha app' : ''}
      </p>
      {!wish.length ? (
        <div style={{ ...ui.card, textAlign: 'center', padding: '3rem 1.5rem' }}>
          <div style={{ fontSize: '3rem' }}>💛</div>
          <h2 style={ui.h2}>Nothing saved yet</h2>
          <p style={{ ...ui.muted, marginBottom: '1.5rem' }}>Tap the heart on any product to save it here.</p>
          <Link href="/products#shop" style={{ ...ui.btn, textDecoration: 'none', display: 'inline-block' }}>Browse products</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
          {wish.map((x) => {
            const img = imgSrc(String(x.image || '').replace(/^https?:\/\/(www\.)?adhvaithafoods\.in/i, ''));
            return (
              <div key={x.name} style={{ ...ui.card, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <button onClick={() => toggleWish(x)} aria-label={`Remove ${x.name}`} title="Remove" style={{ position: 'absolute', top: 10, right: 12, background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#C2273A' }}>✕</button>
                <img src={img} alt={x.name} style={{ width: 140, height: 140, objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = '/images/products/mango-pickle-real.jpg'; }} />
                <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: '1.15rem', color: '#111', marginTop: '0.6rem' }}>{x.name}</div>
                {x.price > 0 && <div style={ui.muted}>from {rupees(x.price)}</div>}
                <AddToCart product={{ name: x.name, img: img.startsWith('/') ? img : '', category: x.category }} />
              </div>
            );
          })}
        </div>
      )}
    </ShopShell>
  );
}
