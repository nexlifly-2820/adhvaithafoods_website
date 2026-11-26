'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ShopShell, { ui } from '@/components/shop/ShopShell';
import LoginBox from '@/components/shop/LoginBox';
import { useShop, api, logout, rupees, imgSrc } from '@/components/shop/shopStore';

const STEPS = ['Placed', 'Preparing', 'Packed', 'Shipped', 'Out for delivery', 'Delivered'];
function stage(s) {
  const t = String(s || '').toLowerCase();
  if (/rejected|cancel/.test(t)) return -1;
  if (t.includes('deliver') && !t.includes('out')) return 5;
  if (t.includes('out_for') || t.includes('out for')) return 4;
  if (t.includes('ship')) return 3;
  if (t.includes('pack')) return 2;
  if (t.includes('accept') || t.includes('process')) return 1;
  return 0;
}
const fmt = (d) => { const x = new Date(d); return isNaN(x) ? '' : x.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }); };
const REASONS = ['Ordered by mistake', 'Want to change items or size', 'Delivery address is wrong', 'Found it cheaper elsewhere', 'Other'];

function shrinkPhoto(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const max = 1080;
      const k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * k);
      c.height = Math.round(img.height * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/jpeg', 0.6));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('bad image')); };
    img.src = url;
  });
}

function OrderCard({ o, onChanged }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('');
  const [reason, setReason] = useState(REASONS[0]);
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const st = stage(o.status);
  const cancelled = st === -1;
  const deliveredAt = o.deliveredAt ? new Date(o.deliveredAt).getTime() : 0;
  const canReport = st === 5 && !o.issue && (!deliveredAt || Date.now() - deliveredAt < 48 * 3600 * 1000);
  const cod = o.paymentStatus === 'cod';

  const cancel = async () => {
    setBusy(true); setErr('');
    const { ok, data } = await api(`orders/${encodeURIComponent(o.id)}/cancel`, { method: 'POST', body: { reason } });
    setBusy(false);
    if (!ok) { setErr(data?.error || 'Could not cancel. Please try again.'); return; }
    setMode(''); setMsg(data?.message || 'Order cancelled'); onChanged();
  };

  const report = async () => {
    setErr('');
    if (text.trim().length < 5) { setErr('Please tell us what went wrong.'); return; }
    if (!photo) { setErr('Please add a photo of the damaged item.'); return; }
    setBusy(true);
    const { ok, data } = await api(`orders/${encodeURIComponent(o.id)}/report-issue`, { method: 'POST', body: { text: text.trim(), photo } });
    setBusy(false);
    if (!ok) { setErr(data?.error || 'Could not send. Please try again.'); return; }
    setMode(''); setMsg(data?.message || 'Thanks, we will contact you soon.'); onChanged();
  };

  const refundLine = cancelled
    ? cod || o.refundStatus === 'none' ? 'No money was taken (Cash on Delivery).'
      : o.refundStatus === 'processed' ? `Refund of ${rupees(o.refundAmount)} sent to your original payment method.`
      : o.refundStatus === 'failed' ? 'Our team is processing your refund. We will update you soon.'
      : o.refundStatus === 'initiated' ? `Refund of ${rupees(o.refundAmount)} started — reaches you in 5–7 working days.`
      : 'Any payment will be refunded to your original payment method.'
    : o.refundAmount > 0 ? `${rupees(o.refundAmount)} refunded to your original payment method.` : '';

  return (
    <div style={{ ...ui.card, marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 800, color: 'var(--rich-brown)' }}>#{o.id}</div>
          <div style={ui.muted}>{fmt(o.createdAt)} · {o.items.length} item(s)</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ display: 'inline-block', padding: '0.25rem 0.7rem', borderRadius: 999, fontSize: '0.78rem', fontWeight: 800, fontFamily: '"Inter", sans-serif', background: cancelled ? '#FDECEA' : st === 5 ? '#E8F3E5' : '#FFF3DC', color: cancelled ? '#B3261E' : st === 5 ? 'var(--forest-green)' : '#8A5A00' }}>
            {cancelled ? 'Cancelled' : STEPS[st]}
          </span>
          <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: '1.2rem', marginTop: 4 }}>{rupees(o.total)}</div>
        </div>
      </div>

      {!cancelled && (
        <div style={{ display: 'flex', gap: 4, margin: '1rem 0 0.4rem' }} aria-label={`Order status: ${STEPS[st]}`}>
          {STEPS.map((s, i) => <div key={s} title={s} style={{ flex: 1, height: 6, borderRadius: 6, background: i <= st ? 'var(--forest-green)' : 'rgba(139,94,60,0.15)' }} />)}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '0.8rem 0' }}>
        {o.items.slice(0, 6).map((it, i) => (
          <img key={i} src={imgSrc(it.image)} alt={it.name} title={`${it.name} ${it.weight}`} style={{ width: 52, height: 52, objectFit: 'contain', borderRadius: 10, background: '#FBF4E6', flexShrink: 0 }} onError={(e) => { e.currentTarget.src = '/images/products/mango-pickle-real.jpg'; }} />
        ))}
      </div>

      {refundLine && <p style={{ ...ui.muted, color: 'var(--rich-brown)' }}>💸 {refundLine}</p>}
      {o.rejectionReason && cancelled && <p style={{ ...ui.muted, fontSize: '0.82rem' }}>{o.rejectionReason}</p>}
      {o.trackingId && !cancelled && <p style={ui.muted}>🚚 {o.courierName || 'Courier'} · AWB {o.trackingId}{o.courierStatus ? ` · ${o.courierStatus}` : ''}</p>}
      {o.issue && <p style={{ ...ui.muted, color: 'var(--forest-green)' }}>📷 Damage report received — our team will contact you.</p>}
      {msg && <p style={{ ...ui.muted, color: 'var(--forest-green)', fontWeight: 700 }}>{msg}</p>}

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.8rem' }}>
        <button style={ui.btnOutline} onClick={() => setOpen(!open)}>{open ? 'Hide bill' : 'View bill'}</button>
        {o.trackingUrl && !cancelled && st < 5 && <a href={o.trackingUrl} target="_blank" rel="noreferrer" style={ui.btnOutline}>Track parcel</a>}
        {o.canCancel && <button style={{ ...ui.btnOutline, color: '#B3261E', borderColor: '#B3261E' }} onClick={() => setMode(mode === 'cancel' ? '' : 'cancel')}>Cancel order</button>}
        {canReport && <button style={ui.btnOutline} onClick={() => setMode(mode === 'report' ? '' : 'report')}>Report damage</button>}
      </div>

      {open && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#FFFDF6', borderRadius: 12, border: '1px dashed rgba(139,94,60,0.3)', fontFamily: '"Courier New", monospace', fontSize: '0.88rem', color: '#2A1A12' }}>
          {o.items.map((it, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><span>{it.name} {it.weight}{it.qty > 1 ? ` ×${it.qty}` : ''}</span><span>{rupees(it.price * it.qty)}</span></div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Delivery</span><span>{o.delivery > 0 ? rupees(o.delivery) : 'FREE'}</span></div>
          {o.packing > 0 && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Packing</span><span>{rupees(o.packing)}</span></div>}
          {o.gst > 0 && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>GST</span><span>{rupees(o.gst)}</span></div>}
          {o.discount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--forest-green)' }}><span>Discount{o.coupon ? ` (${o.coupon})` : ''}</span><span>−{rupees(o.discount)}</span></div>}
          <div style={{ borderTop: '1px dashed #999', margin: '6px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}><span>{cancelled ? 'ORDER TOTAL' : cod ? 'TO PAY' : 'TOTAL PAID'}</span><span>{rupees(o.total)}</span></div>
          <div style={{ marginTop: 6, fontSize: '0.8rem' }}>{o.paymentMethod}</div>
          <div style={{ marginTop: 6, fontSize: '0.8rem' }}>Deliver to: {o.address}</div>
        </div>
      )}

      {mode === 'cancel' && (
        <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 12, background: '#FFF7F5' }}>
          <p style={{ ...ui.muted, color: 'var(--rich-brown)' }}>You can cancel until the order is shipped. {cod ? '' : 'The full amount goes back to your original payment method in 5–7 working days.'}</p>
          <select style={{ ...ui.input, margin: '0.6rem 0' }} value={reason} onChange={(e) => setReason(e.target.value)}>
            {REASONS.map((r) => <option key={r}>{r}</option>)}
          </select>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ ...ui.btnDark, background: '#B3261E' }} disabled={busy} onClick={cancel}>{busy ? 'Cancelling…' : 'Yes, cancel order'}</button>
            <button style={ui.btnOutline} onClick={() => setMode('')}>Keep order</button>
          </div>
        </div>
      )}

      {mode === 'report' && (
        <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 12, background: '#FFF9EC' }}>
          <p style={{ ...ui.muted, color: 'var(--rich-brown)' }}>Report within 48 hours of delivery with a clear photo. Please keep the box and jars until we reply.</p>
          <textarea style={{ ...ui.input, minHeight: 90, margin: '0.6rem 0' }} maxLength={800} placeholder="What happened? (e.g. jar broken, leaked)" value={text} onChange={(e) => setText(e.target.value)} />
          <input type="file" accept="image/*" onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            try { setPhoto(await shrinkPhoto(file)); setErr(''); } catch { setErr('Could not read that photo. Please pick another.'); }
          }} />
          {photo && <img src={photo} alt="Damage" style={{ display: 'block', maxHeight: 140, borderRadius: 10, marginTop: 8 }} />}
          <div style={{ display: 'flex', gap: 8, marginTop: '0.8rem' }}>
            <button style={ui.btnDark} disabled={busy} onClick={report}>{busy ? 'Sending…' : 'Send report'}</button>
            <button style={ui.btnOutline} onClick={() => setMode('')}>Close</button>
          </div>
        </div>
      )}
      {err && <p style={ui.error}>{err}</p>}
    </div>
  );
}

function OrdersContent() {
  const { token, user, hydrated } = useShop();
  const placed = useSearchParams().get('placed');
  const [orders, setOrders] = useState(null);
  const [err, setErr] = useState('');

  const load = useCallback(async () => {
    const { ok, data } = await api('me/orders');
    if (!ok) { setErr(data?.error || 'Could not load your orders.'); setOrders([]); return; }
    setErr(''); setOrders(data.orders || []);
  }, []);

  useEffect(() => { if (token) load(); }, [token, load]);
  useEffect(() => {
    if (!token) return;
    const t = setInterval(load, 60_000);
    return () => clearInterval(t);
  }, [token, load]);

  if (!hydrated) return <p style={ui.muted}>Loading…</p>;
  if (!token) return <div style={{ ...ui.card, maxWidth: 640, margin: '0 auto' }}><LoginBox title="Log in to see your orders" /></div>;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={ui.h1}>My Orders</h1>
          <p style={ui.muted}>{user?.email} · orders from the website and the app</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/addresses" style={{ ...ui.link, textDecoration: 'none' }}>📍 My addresses</Link>
          <Link href="/wishlist" style={{ ...ui.link, textDecoration: 'none' }}>♡ Wishlist</Link>
          <button style={ui.link} onClick={() => logout(true)}>Log out</button>
        </div>
      </div>
      {placed && (
        <div style={{ ...ui.card, background: '#EEF6EA', border: '1px solid rgba(45,90,39,0.25)', marginBottom: '1rem' }}>
          <h2 style={{ ...ui.h2, color: 'var(--forest-green)' }}>Thank you! Your order is placed 💛</h2>
          <p style={ui.muted}>Order #{placed}. You can follow every step of your order right here.</p>
        </div>
      )}
      {err && <p style={ui.error}>{err}</p>}
      {orders === null ? <p style={ui.muted}>Loading your orders…</p> : !orders.length ? (
        <div style={{ ...ui.card, textAlign: 'center', padding: '3rem 1.5rem' }}>
          <h2 style={ui.h2}>No orders yet</h2>
          <Link href="/products#shop" style={{ ...ui.btn, textDecoration: 'none', display: 'inline-block', marginTop: '1rem' }}>Start shopping</Link>
        </div>
      ) : orders.map((o) => <OrderCard key={o.id} o={o} onChanged={load} />)}
    </>
  );
}

export default function MyOrdersPage() {
  return (
    <ShopShell max={860}>
      <Suspense fallback={<p style={ui.muted}>Loading…</p>}>
        <OrdersContent />
      </Suspense>
    </ShopShell>
  );
}
