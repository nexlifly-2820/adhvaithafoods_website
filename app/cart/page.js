'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ShopShell, { ui } from '@/components/shop/ShopShell';
import BillBox from '@/components/shop/BillBox';
import { useShop, api, loadCatalog, repriceCart, setQty, removeLine, lineKey, rupees, cartCount, imgSrc, findShopProduct } from '@/components/shop/shopStore';

const COUPON_KEY = 'aj_web_coupon';

export default function CartPage() {
  const router = useRouter();
  const { cart, catalog, hydrated, token } = useShop();
  const [bill, setBill] = useState(null);
  const [offers, setOffers] = useState([]);
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try { const c = sessionStorage.getItem(COUPON_KEY) || ''; setApplied(c); setCode(c); } catch {}
    loadCatalog(true).then((c) => repriceCart(c));
  }, []);

  const refresh = useCallback(async (coupon) => {
    if (!cart.length) { setBill(null); return; }
    setBusy(true);
    const { ok, data } = await api('checkout/coupons', { method: 'POST', body: { items: cart, coupon: coupon || '' } });
    setBusy(false);
    if (!ok) { setErr(data?.error || 'Could not work out your bill.'); return; }
    setBill(data.bill);
    setOffers((data.offers || []).filter((o) => o.ok));
    if (coupon && data.bill?.couponError) {
      setErr(data.bill.couponError);
      setApplied('');
      try { sessionStorage.removeItem(COUPON_KEY); } catch {}
      refresh('');
    }
  }, [cart, token]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (hydrated) refresh(applied); }, [hydrated, cart, applied, refresh]);

  const apply = (c) => {
    const v = String(c || '').trim().toUpperCase();
    setErr('');
    setCode(v);
    setApplied(v);
    try { v ? sessionStorage.setItem(COUPON_KEY, v) : sessionStorage.removeItem(COUPON_KEY); } catch {}
  };

  const stockProblem = cart.find((x) => {
    const p = findShopProduct(catalog, x.name);
    const v = p?.variants.find((v) => v.label.toLowerCase().replace(/\s/g, '') === String(x.weight).toLowerCase().replace(/\s/g, ''));
    return catalog && (!p || !v || !v.inStock || !(v.price > 0));
  });

  if (!hydrated) return <ShopShell><p style={ui.muted}>Loading…</p></ShopShell>;

  return (
    <ShopShell>
      <h1 style={ui.h1}>Your Cart</h1>
      <p style={{ ...ui.muted, marginBottom: '1.5rem' }}>{cart.length ? `${cartCount(cart)} item(s) · same cart as your Adhvaitha app when you log in` : ''}</p>

      {catalog?.notice && <div style={{ ...ui.card, padding: '0.9rem 1.2rem', marginBottom: '1rem', background: '#FFF6E0', ...ui.muted, color: 'var(--rich-brown)' }}>📢 {catalog.notice}</div>}

      {!cart.length ? (
        <div style={{ ...ui.card, textAlign: 'center', padding: '3rem 1.5rem' }}>
          <div style={{ fontSize: '3rem' }}>🏺</div>
          <h2 style={ui.h2}>Your cart is empty</h2>
          <p style={{ ...ui.muted, marginBottom: '1.5rem' }}>Pick something from Amma&apos;s kitchen.</p>
          <Link href="/products#shop" style={{ ...ui.btn, textDecoration: 'none', display: 'inline-block' }}>Browse products</Link>
        </div>
      ) : (
        <div className="aj-cart-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)', gap: '1.25rem', alignItems: 'start' }}>
          <div style={{ ...ui.card, padding: '0.5rem clamp(0.8rem, 2.5vw, 1.5rem)' }}>
            {cart.map((x) => {
              const k = lineKey(x);
              const p = catalog ? findShopProduct(catalog, x.name) : null;
              const v = p?.variants.find((v) => v.label.toLowerCase().replace(/\s/g, '') === String(x.weight).toLowerCase().replace(/\s/g, ''));
              const out = catalog && (!p || !v || !v.inStock || !(v.price > 0));
              return (
                <div key={k} style={{ display: 'flex', gap: '0.9rem', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid rgba(139,94,60,0.12)' }}>
                  <img src={imgSrc(x.image)} alt="" style={{ width: 72, height: 72, objectFit: 'contain', borderRadius: 12, background: '#FBF4E6', flexShrink: 0 }} onError={(e) => { e.currentTarget.src = '/images/products/mango-pickle-real.jpg'; }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: '1.05rem', color: '#111', overflow: 'hidden', textOverflow: 'ellipsis' }}>{x.name}</div>
                    <div style={ui.muted}>{x.weight} · {rupees(x.price)}</div>
                    {out && <div style={{ color: '#B3261E', fontSize: '0.8rem', fontWeight: 700, fontFamily: '"Inter", sans-serif' }}>Not available right now — please remove</div>}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.45rem', flexWrap: 'wrap' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid rgba(139,94,60,0.35)', borderRadius: 999 }}>
                        <button aria-label="Less" onClick={() => setQty(k, x.qty - 1)} style={qtyBtn}>−</button>
                        <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 800, fontFamily: '"Inter", sans-serif' }}>{x.qty}</span>
                        <button aria-label="More" onClick={() => setQty(k, x.qty + 1)} style={qtyBtn}>+</button>
                      </div>
                      <button onClick={() => removeLine(k)} style={ui.link}>Remove</button>
                    </div>
                  </div>
                  <div style={{ fontWeight: 900, fontFamily: '"Inter", sans-serif', color: 'var(--rich-brown)', whiteSpace: 'nowrap' }}>{rupees(x.price * x.qty)}</div>
                </div>
              );
            })}
            <div style={{ padding: '1rem 0' }}><Link href="/products#shop" style={{ ...ui.link, textDecoration: 'none' }}>+ Add more items</Link></div>
          </div>

          <div style={{ ...ui.card, position: 'sticky', top: 140 }}>
            <h2 style={ui.h2}>Bill</h2>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <input style={{ ...ui.input, padding: '0.65rem 0.9rem', textTransform: 'uppercase' }} placeholder="Coupon code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} />
              {applied ? (
                <button style={ui.btnOutline} onClick={() => apply('')}>Remove</button>
              ) : (
                <button style={ui.btnDark} onClick={() => apply(code)} disabled={!code.trim()}>Apply</button>
              )}
            </div>
            {!applied && offers.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '0.8rem' }}>
                {offers.slice(0, 4).map((o) => (
                  <button key={o.code} onClick={() => apply(o.code)} style={{ border: '1.5px dashed var(--forest-green)', color: 'var(--forest-green)', background: '#F1F7EE', borderRadius: 8, padding: '0.25rem 0.6rem', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer', fontFamily: '"Inter", sans-serif' }}>{o.code}</button>
                ))}
              </div>
            )}
            {busy && !bill ? <p style={ui.muted}>Working out your bill…</p> : <BillBox bill={bill} count={cartCount(cart)} />}
            {err && <p style={ui.error}>{err}</p>}
            {!token && <p style={{ ...ui.muted, fontSize: '0.8rem', marginTop: '0.6rem' }}>First-order coupons are checked after you log in.</p>}
            <button
              style={{ ...ui.btn, width: '100%', marginTop: '1rem', opacity: stockProblem || !bill ? 0.5 : 1 }}
              disabled={!!stockProblem || !bill}
              onClick={() => router.push('/checkout')}
            >
              Checkout · {bill ? rupees(bill.total) : ''}
            </button>
          </div>
        </div>
      )}
      <style>{`@media (max-width: 860px) { .aj-cart-grid { grid-template-columns: 1fr !important; } .aj-cart-grid > div { position: static !important; } }`}</style>
    </ShopShell>
  );
}

const qtyBtn = { background: 'none', border: 'none', width: 32, height: 30, fontSize: '1.05rem', fontWeight: 800, cursor: 'pointer', color: 'var(--rich-brown)' };
