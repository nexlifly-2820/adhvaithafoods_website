'use client';
// "Add to cart" for a website product card. Uses the same sizes & prices as the app.
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useShop, loadCatalog, findShopProduct, addToCart, setQty, lineKey, rupees } from './shopStore';

const pill = (active, disabled) => ({
  fontFamily: '"Inter", system-ui, sans-serif',
  fontSize: '0.72rem',
  fontWeight: 800,
  padding: '0.32rem 0.7rem',
  borderRadius: '8px',
  border: active ? '1.8px solid #111' : '1.8px solid rgba(20,20,20,0.25)',
  background: active ? '#111' : 'transparent',
  color: active ? '#fff' : disabled ? 'rgba(20,20,20,0.35)' : '#141414',
  cursor: disabled ? 'not-allowed' : 'pointer',
  textDecoration: disabled ? 'line-through' : 'none',
  letterSpacing: '0.03em',
});

export default function AddToCart({ product }) {
  const { catalog, cart, hydrated } = useShop();
  const [pick, setPick] = useState('');
  const [flash, setFlash] = useState(false);

  useEffect(() => { loadCatalog(); }, []);

  const shop = useMemo(() => (catalog?.shopEnabled === false ? null : findShopProduct(catalog, product?.name)), [catalog, product?.name]);
  const variants = shop?.variants || [];
  const firstInStock = variants.find((v) => v.inStock) || variants[0];
  const v = variants.find((x) => x.label === pick) || firstInStock;

  if (!hydrated || !shop || !v) return null;

  const item = {
    name: shop.name,
    weight: v.label,
    price: v.price,
    category: shop.category,
    image: product.img ? (typeof window !== 'undefined' ? window.location.origin : '') + product.img : shop.image,
  };
  const inCart = cart.find((x) => lineKey(x) === lineKey(item));
  const anyStock = variants.some((x) => x.inStock);

  const stop = (e) => { e.stopPropagation(); e.preventDefault(); };

  return (
    <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.65rem', marginTop: '1rem' }}>
      {variants.length > 1 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px' }}>
          {variants.map((x) => (
            <button key={x.label} type="button" disabled={!x.inStock} onClick={(e) => { stop(e); setPick(x.label); }} style={pill(x.label === v.label, !x.inStock)}>
              {x.label}
            </button>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: '1.25rem', color: '#111' }}>
          {rupees(v.price)}
          {v.mrp > v.price && <span style={{ marginLeft: 6, fontSize: '0.85rem', color: '#888', textDecoration: 'line-through', fontWeight: 600 }}>{rupees(v.mrp)}</span>}
          {variants.length === 1 && <span style={{ marginLeft: 6, fontSize: '0.8rem', color: '#555', fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 700 }}>/ {v.label}</span>}
        </span>
        {!anyStock || !v.inStock ? (
          <span style={{ ...pill(false, true), textDecoration: 'none' }}>OUT OF STOCK</span>
        ) : inCart ? (
          <div style={{ display: 'inline-flex', alignItems: 'center', background: '#111', borderRadius: '999px', overflow: 'hidden' }}>
            <button type="button" aria-label="Less" onClick={(e) => { stop(e); setQty(lineKey(item), inCart.qty - 1); }} style={stepBtn}>−</button>
            <span style={{ color: '#fff', fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 800, fontSize: '0.8rem', minWidth: 22, textAlign: 'center' }}>{inCart.qty}</span>
            <button type="button" aria-label="More" onClick={(e) => { stop(e); setQty(lineKey(item), inCart.qty + 1); }} style={stepBtn}>+</button>
          </div>
        ) : (
          <button
            type="button"
            onClick={(e) => { stop(e); addToCart(item); setFlash(true); setTimeout(() => setFlash(false), 1400); }}
            style={{ backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: '999px', padding: '0.5rem 1.1rem', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', transition: 'transform .2s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            + Add to cart
          </button>
        )}
      </div>
      {flash && (
        <Link href="/cart" onClick={(e) => e.stopPropagation()} style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: 'var(--forest-green)' }}>
          ✓ Added · View cart →
        </Link>
      )}
    </div>
  );
}

const stepBtn = { background: 'transparent', color: '#fff', border: 'none', width: 32, height: 32, fontSize: '1.05rem', fontWeight: 800, cursor: 'pointer' };
