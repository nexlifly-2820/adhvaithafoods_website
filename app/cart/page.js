'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ShopShell from '@/components/shop/ShopShell';
import { useShop, api, loadCatalog, repriceCart, setQty, removeLine, lineKey, rupees, cartCount, imgSrc, findShopProduct } from '@/components/shop/shopStore';

const COUPON_KEY = 'aj_web_coupon';
const MAROON = '#7A1426', GOLD = '#D9A441', INK = '#2A1A14', CREAM = '#FFF8EC', MUTED = '#7A6656', GREEN = '#2D5A27';
const sans = '"Inter", system-ui, sans-serif';
const serif = 'Playfair Display, serif';
const sameSize = (a, b) => String(a).toLowerCase().replace(/\s/g, '') === String(b).toLowerCase().replace(/\s/g, '');

export default function CartPage() {
  const router = useRouter();
  const { cart, catalog, hydrated, token } = useShop();
  const [bill, setBill] = useState(null);
  const [offers, setOffers] = useState([]);
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    try { const c = sessionStorage.getItem(COUPON_KEY) || ''; setApplied(c); } catch {}
    loadCatalog(true).then((c) => repriceCart(c));
  }, []);

  const refresh = useCallback(async (coupon) => {
    if (!cart.length) { setBill(null); return; }
    setBusy(true);
    const { ok, data } = await api('checkout/coupons', { method: 'POST', body: { items: cart, coupon: coupon || '' } });
    setBusy(false);
    if (!ok) { setErr(data?.error || 'Could not work out your bill.'); return; }
    setOffers(data.offers || []);
    if (coupon && data.bill?.couponError) {
      setErr(data.bill.couponError);
      setApplied('');
      try { sessionStorage.removeItem(COUPON_KEY); } catch {}
      return;
    }
    setBill(data.bill);
  }, [cart, token]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (hydrated) refresh(applied); }, [hydrated, cart, applied, refresh]);

  const apply = (c) => {
    const v = String(c || '').trim().toUpperCase();
    setErr('');
    setCode('');
    setApplied(v);
    try { v ? sessionStorage.setItem(COUPON_KEY, v) : sessionStorage.removeItem(COUPON_KEY); } catch {}
  };

  const lineInfo = (x) => {
    const p = catalog ? findShopProduct(catalog, x.name) : null;
    const v = p?.variants.find((v) => sameSize(v.label, x.weight));
    return { out: !!catalog && (!p || !v || !v.inStock || !(v.price > 0)), mrp: v?.mrp || 0 };
  };
  const stockProblem = cart.some((x) => lineInfo(x).out);
  const free = catalog?.delivery?.free || 0;
  const itemsTotal = bill?.itemsTotal ?? cart.reduce((s, x) => s + x.price * x.qty, 0);
  const toFree = Math.max(0, free - itemsTotal);
  const saved = cart.reduce((s, x) => { const m = lineInfo(x).mrp; return s + (m > x.price ? (m - x.price) * x.qty : 0); }, 0) + (bill?.discount || 0);
  const okOffers = offers.filter((o) => o.ok);
  const lockedOffers = offers.filter((o) => !o.ok);
  const shownOffers = showAll ? [...okOffers, ...lockedOffers] : [...okOffers, ...lockedOffers].slice(0, 3);

  if (!hydrated) return <ShopShell><p style={{ fontFamily: sans, color: MUTED }}>Loading…</p></ShopShell>;

  return (
    <ShopShell>
      <div className="ajc">
        <div className="ajc-head">
          <div>
            <div className="ajc-eyebrow">AMMA&apos;S BASKET</div>
            <h1 className="ajc-title">Your Cart</h1>
          </div>
          {cart.length > 0 && <div className="ajc-count">{cartCount(cart)} item{cartCount(cart) > 1 ? 's' : ''}</div>}
        </div>

        {catalog?.notice && <div className="ajc-notice">📢 {catalog.notice}</div>}

        {!cart.length ? (
          <div className="ajc-card ajc-empty">
            <div style={{ fontSize: '3.2rem' }}>🏺</div>
            <h2 className="ajc-h2">Your basket is empty</h2>
            <p className="ajc-muted">Pick something fresh from Amma&apos;s kitchen.</p>
            <Link href="/products#shop" className="ajc-btn">Browse products</Link>
          </div>
        ) : (
          <div className="ajc-grid">
            {/* LEFT: items */}
            <div>
              {free > 0 && (
                <div className="ajc-card ajc-free">
                  <div className="ajc-free-text">
                    {toFree > 0 ? <>Add <b>{rupees(toFree)}</b> more for <b>FREE delivery</b> 🚚</> : <>🎉 You&apos;ve unlocked <b>FREE delivery</b></>}
                  </div>
                  <div className="ajc-bar"><div style={{ width: `${Math.min(100, (itemsTotal / free) * 100)}%` }} /></div>
                </div>
              )}

              <div className="ajc-card" style={{ padding: '0.4rem 0' }}>
                {cart.map((x) => {
                  const k = lineKey(x);
                  const { out, mrp } = lineInfo(x);
                  return (
                    <div key={k} className={`ajc-line ${out ? 'is-out' : ''}`}>
                      <div className="ajc-thumb">
                        <img src={imgSrc(x.image)} alt="" onError={(e) => { e.currentTarget.src = '/images/products/mango-pickle-real.jpg'; }} />
                      </div>
                      <div className="ajc-info">
                        <div className="ajc-name">{x.name}</div>
                        <div className="ajc-meta">
                          <span className="ajc-size">{x.weight}</span>
                          <span>{rupees(x.price)}</span>
                          {mrp > x.price && <span className="ajc-mrp">{rupees(mrp)}</span>}
                        </div>
                        {out && <div className="ajc-out">Not available right now — please remove</div>}
                        <div className="ajc-actions">
                          <div className="ajc-qty">
                            <button aria-label="Less" onClick={() => setQty(k, x.qty - 1)}>−</button>
                            <span>{x.qty}</span>
                            <button aria-label="More" onClick={() => setQty(k, x.qty + 1)} disabled={out}>+</button>
                          </div>
                          <button className="ajc-remove" onClick={() => removeLine(k)}>Remove</button>
                        </div>
                      </div>
                      <div className="ajc-price">{rupees(x.price * x.qty)}</div>
                    </div>
                  );
                })}
                <Link href="/products#shop" className="ajc-more">+ Add more items</Link>
              </div>
            </div>

            {/* RIGHT: coupons + bill */}
            <div className="ajc-side">
              <div className="ajc-card">
                <div className="ajc-section">🎟️ Coupons & offers</div>
                {applied ? (
                  <div className="ajc-applied">
                    <div>
                      <div className="ajc-applied-code">{applied} applied</div>
                      {bill?.discount > 0 && <div className="ajc-applied-save">You save {rupees(bill.discount)} on this order</div>}
                    </div>
                    <button onClick={() => apply('')}>Remove</button>
                  </div>
                ) : (
                  <form className="ajc-code" onSubmit={(e) => { e.preventDefault(); if (code.trim()) apply(code); }}>
                    <input placeholder="Enter coupon code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} />
                    <button disabled={!code.trim()}>Apply</button>
                  </form>
                )}
                {err && <div className="ajc-err">{err}</div>}

                <div className="ajc-tickets">
                  {shownOffers.map((o) => (
                    <div key={o.code} className={`ajc-ticket ${o.ok ? '' : 'is-locked'} ${applied === o.code ? 'is-on' : ''}`}>
                      <div className="ajc-stub">
                        <div className="ajc-stub-title">{o.title || o.code}</div>
                      </div>
                      <div className="ajc-ticket-body">
                        <div className="ajc-ticket-sub">{o.sub}</div>
                        <div className="ajc-ticket-row">
                          <span className="ajc-chip">{o.code}</span>
                          {applied === o.code ? <span className="ajc-tick">✓ Applied</span>
                            : o.ok ? <button className="ajc-apply" onClick={() => apply(o.code)}>Apply</button>
                            : <span className="ajc-lock">🔒</span>}
                        </div>
                        {!o.ok && o.reason && <div className="ajc-reason">{o.reason}</div>}
                      </div>
                    </div>
                  ))}
                </div>
                {offers.length > 3 && <button className="ajc-link" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show less' : `View all ${offers.length} offers`}</button>}
                {!token && <div className="ajc-hint">First-order coupons unlock after you log in at checkout.</div>}
              </div>

              <div className="ajc-card ajc-bill">
                <div className="ajc-section">🧾 Bill details</div>
                {!bill ? <div className="ajc-muted">{busy ? 'Working out your bill…' : ''}</div> : (
                  <>
                    <Row l={`Items (${cartCount(cart)})`} r={rupees(bill.itemsTotal)} />
                    <Row l="Delivery" r={bill.delivery > 0 ? rupees(bill.delivery) : <span style={{ color: GREEN, fontWeight: 800 }}>FREE</span>} />
                    {bill.packing > 0 && <Row l="Packing" r={rupees(bill.packing)} />}
                    {bill.gst > 0 && <Row l="GST" r={rupees(bill.gst)} />}
                    {bill.discount > 0 && <Row l={`Coupon ${bill.coupon || ''}`} r={`−${rupees(bill.discount)}`} green />}
                    <div className="ajc-dash" />
                    <div className="ajc-total"><span>To pay</span><span>{rupees(bill.total)}</span></div>
                    {saved > 0 && <div className="ajc-saved">🎉 You&apos;re saving {rupees(saved)} on this order</div>}
                  </>
                )}
                <button className="ajc-btn ajc-checkout" disabled={stockProblem || !bill} onClick={() => router.push('/checkout')}>
                  {stockProblem ? 'Remove unavailable items' : <>Proceed to checkout <span>{bill ? rupees(bill.total) : ''} →</span></>}
                </button>
                <div className="ajc-safe">🔒 Secure payments · UPI, cards, net banking{catalog?.codEnabled !== false ? ' · Cash on Delivery' : ''}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .ajc { font-family: ${sans}; color: ${INK}; }
        .ajc-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; margin-bottom: 1.4rem; }
        .ajc-eyebrow { font-size: .72rem; letter-spacing: .22em; font-weight: 800; color: ${MAROON}; }
        .ajc-title { font-family: ${serif}; font-weight: 900; font-size: clamp(2rem, 4.5vw, 2.8rem); color: ${INK}; line-height: 1.05; margin: .2rem 0 0; }
        .ajc-count { background: ${INK}; color: #fff; border-radius: 999px; padding: .35rem .9rem; font-size: .78rem; font-weight: 800; white-space: nowrap; }
        .ajc-card { background: #fff; border-radius: 20px; border: 1px solid rgba(139,94,60,.14); box-shadow: 0 12px 30px rgba(61,31,10,.06); padding: 1.1rem 1.25rem; margin-bottom: 1rem; }
        .ajc-notice { background: #FFF3D6; border: 1px solid ${GOLD}; border-radius: 14px; padding: .8rem 1rem; margin-bottom: 1rem; font-size: .92rem; }
        .ajc-empty { text-align: center; padding: 3rem 1.5rem; }
        .ajc-h2 { font-family: ${serif}; font-weight: 800; font-size: 1.4rem; margin: .4rem 0; }
        .ajc-muted { color: ${MUTED}; font-size: .92rem; margin-bottom: 1.2rem; }
        .ajc-btn { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; background: ${MAROON}; color: #fff; border: none; border-radius: 999px; padding: .95rem 1.6rem; font-weight: 800; font-size: .95rem; letter-spacing: .02em; cursor: pointer; text-decoration: none; transition: transform .15s ease, box-shadow .15s ease; box-shadow: 0 10px 22px rgba(122,20,38,.25); }
        .ajc-btn:hover:not(:disabled) { transform: translateY(-1px); }
        .ajc-btn:disabled { opacity: .5; cursor: not-allowed; box-shadow: none; }
        .ajc-grid { display: grid; grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr); gap: 1.25rem; align-items: start; }
        .ajc-side { position: sticky; top: 140px; }
        .ajc-free { padding: .9rem 1.2rem; background: linear-gradient(135deg, #FFF8EC, #FDF0DA); }
        .ajc-free-text { font-size: .9rem; margin-bottom: .55rem; }
        .ajc-bar { height: 8px; border-radius: 8px; background: rgba(139,94,60,.15); overflow: hidden; }
        .ajc-bar > div { height: 100%; background: linear-gradient(90deg, ${GOLD}, ${GREEN}); border-radius: 8px; transition: width .4s ease; }
        .ajc-line { display: flex; gap: 1rem; align-items: center; padding: 1rem 1.25rem; border-bottom: 1px dashed rgba(139,94,60,.2); }
        .ajc-line.is-out { background: #FFF6F5; }
        .ajc-thumb { width: 84px; height: 84px; border-radius: 16px; background: radial-gradient(circle at 50% 40%, #FFFDF7, #F6E9D2); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ajc-thumb img { width: 92%; height: 92%; object-fit: contain; filter: drop-shadow(0 6px 8px rgba(0,0,0,.15)); }
        .ajc-info { flex: 1; min-width: 0; }
        .ajc-name { font-family: ${serif}; font-weight: 900; font-size: 1.12rem; color: #111; line-height: 1.2; }
        .ajc-meta { display: flex; align-items: center; gap: .5rem; margin-top: .25rem; font-size: .88rem; color: ${MUTED}; flex-wrap: wrap; }
        .ajc-size { background: ${CREAM}; border: 1px solid rgba(217,164,65,.6); color: ${MAROON}; font-weight: 800; font-size: .72rem; padding: .15rem .55rem; border-radius: 999px; }
        .ajc-mrp { text-decoration: line-through; opacity: .7; }
        .ajc-out { color: #B3261E; font-size: .78rem; font-weight: 700; margin-top: .25rem; }
        .ajc-actions { display: flex; align-items: center; gap: .8rem; margin-top: .55rem; }
        .ajc-qty { display: inline-flex; align-items: center; background: ${INK}; border-radius: 999px; overflow: hidden; }
        .ajc-qty button { width: 34px; height: 32px; border: none; background: transparent; color: #fff; font-size: 1.1rem; font-weight: 800; cursor: pointer; }
        .ajc-qty button:disabled { opacity: .4; }
        .ajc-qty span { color: #fff; min-width: 24px; text-align: center; font-weight: 800; font-size: .9rem; }
        .ajc-remove { background: none; border: none; color: ${MUTED}; font-size: .82rem; font-weight: 700; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }
        .ajc-price { font-weight: 900; font-size: 1.05rem; white-space: nowrap; align-self: flex-start; padding-top: .2rem; }
        .ajc-more { display: block; padding: .9rem 1.25rem; color: ${MAROON}; font-weight: 800; text-decoration: none; font-size: .9rem; }
        .ajc-section { font-weight: 900; font-size: 1rem; margin-bottom: .8rem; }
        .ajc-code { display: flex; border: 1.5px dashed ${GOLD}; border-radius: 14px; overflow: hidden; background: ${CREAM}; }
        .ajc-code input { flex: 1; min-width: 0; border: none; background: transparent; padding: .75rem .9rem; font-size: .95rem; font-weight: 700; letter-spacing: .06em; outline: none; color: ${INK}; }
        .ajc-code button { border: none; background: ${INK}; color: #fff; font-weight: 800; padding: 0 1.1rem; cursor: pointer; }
        .ajc-code button:disabled { opacity: .4; }
        .ajc-applied { display: flex; justify-content: space-between; align-items: center; gap: .6rem; background: #EEF6EA; border: 1.5px solid rgba(45,90,39,.35); border-radius: 14px; padding: .75rem .9rem; }
        .ajc-applied-code { font-weight: 900; color: ${GREEN}; }
        .ajc-applied-save { font-size: .82rem; color: ${GREEN}; }
        .ajc-applied button { background: none; border: none; color: #B3261E; font-weight: 800; cursor: pointer; }
        .ajc-err { color: #B3261E; background: #FDECEA; border-radius: 10px; padding: .55rem .8rem; font-size: .85rem; margin-top: .6rem; }
        .ajc-tickets { display: flex; flex-direction: column; gap: .65rem; margin-top: .9rem; }
        .ajc-ticket { display: flex; border-radius: 14px; overflow: hidden; border: 1px solid rgba(122,20,38,.18); background: #fff; position: relative; }
        .ajc-ticket.is-on { border-color: ${GREEN}; box-shadow: 0 0 0 2px rgba(45,90,39,.15); }
        .ajc-ticket.is-locked { opacity: .62; }
        .ajc-stub { width: 92px; flex-shrink: 0; background: linear-gradient(160deg, ${MAROON}, #4A0A14); color: #fff; display: flex; align-items: center; justify-content: center; text-align: center; padding: .6rem; position: relative; }
        .ajc-stub::after { content: ''; position: absolute; right: -7px; top: 0; bottom: 0; width: 14px; background: radial-gradient(circle at 7px 7px, #fff 5px, transparent 5.5px) 0 0 / 14px 14px repeat-y; }
        .ajc-ticket.is-locked .ajc-stub { background: linear-gradient(160deg, #8F8278, #5E544D); }
        .ajc-stub-title { font-family: ${serif}; font-weight: 900; font-size: 1.05rem; line-height: 1.1; color: ${GOLD}; }
        .ajc-ticket-body { flex: 1; min-width: 0; padding: .65rem .8rem .65rem 1.1rem; }
        .ajc-ticket-sub { font-size: .82rem; color: ${INK}; line-height: 1.35; }
        .ajc-ticket-row { display: flex; align-items: center; justify-content: space-between; gap: .5rem; margin-top: .45rem; }
        .ajc-chip { border: 1.5px dashed ${GOLD}; color: ${MAROON}; background: ${CREAM}; font-weight: 900; font-size: .74rem; letter-spacing: .08em; padding: .18rem .55rem; border-radius: 8px; }
        .ajc-apply { background: none; border: none; color: ${MAROON}; font-weight: 900; font-size: .85rem; cursor: pointer; letter-spacing: .04em; }
        .ajc-tick { color: ${GREEN}; font-weight: 900; font-size: .82rem; }
        .ajc-reason { font-size: .74rem; color: #8A5A00; margin-top: .3rem; }
        .ajc-link { background: none; border: none; color: ${MAROON}; font-weight: 800; font-size: .85rem; cursor: pointer; margin-top: .7rem; padding: 0; }
        .ajc-hint { font-size: .78rem; color: ${MUTED}; margin-top: .6rem; }
        .ajc-row { display: flex; justify-content: space-between; gap: 1rem; padding: .32rem 0; font-size: .93rem; }
        .ajc-dash { border-top: 1.5px dashed rgba(139,94,60,.35); margin: .65rem 0; }
        .ajc-total { display: flex; justify-content: space-between; font-weight: 900; font-size: 1.25rem; }
        .ajc-saved { margin-top: .7rem; background: #EEF6EA; color: ${GREEN}; font-weight: 800; font-size: .85rem; padding: .55rem .8rem; border-radius: 10px; text-align: center; }
        .ajc-checkout { width: 100%; margin-top: 1rem; justify-content: space-between; }
        .ajc-checkout span { opacity: .9; }
        .ajc-safe { text-align: center; font-size: .76rem; color: ${MUTED}; margin-top: .7rem; }
        @media (max-width: 900px) {
          .ajc-grid { grid-template-columns: 1fr; }
          .ajc-side { position: static; }
        }
        @media (max-width: 520px) {
          .ajc-line { padding: .9rem .9rem; gap: .75rem; }
          .ajc-thumb { width: 68px; height: 68px; }
          .ajc-name { font-size: 1rem; }
          .ajc-card { padding: 1rem; border-radius: 18px; }
          .ajc-stub { width: 78px; }
        }
      `}</style>
    </ShopShell>
  );
}

function Row({ l, r, green }) {
  return <div className="ajc-row" style={green ? { color: GREEN, fontWeight: 800 } : undefined}><span>{l}</span><span>{r}</span></div>;
}
