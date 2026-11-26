'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ShopShell, { ui } from '@/components/shop/ShopShell';
import BillBox from '@/components/shop/BillBox';
import LoginBox from '@/components/shop/LoginBox';
import { useShop, api, loadCatalog, clearCart, cartCount, rupees } from '@/components/shop/shopStore';

const COUPON_KEY = 'aj_web_coupon';
const EMPTY = { name: '', phone: '', house: '', road: '', city: '', state: 'Telangana', pincode: '' };
const STATES = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'];

function loadRazorpay() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if (window.Razorpay) return resolve(true);
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, token, user, hydrated, catalog } = useShop();
  const [addresses, setAddresses] = useState([]);
  const [pick, setPick] = useState('new');
  const [form, setForm] = useState(EMPTY);
  const [saveAddr, setSaveAddr] = useState(true);
  const [method, setMethod] = useState('online');
  const [coupon, setCoupon] = useState('');
  const [bill, setBill] = useState(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try { setCoupon(sessionStorage.getItem(COUPON_KEY) || ''); } catch {}
    loadCatalog();
  }, []);

  useEffect(() => { if (catalog?.codEnabled === false) setMethod('online'); }, [catalog?.codEnabled]);

  useEffect(() => {
    if (!token) return;
    api('me/addresses').then(({ ok, data }) => {
      if (!ok) return;
      const list = Array.isArray(data?.items) ? data.items : [];
      setAddresses(list);
      if (list.length) setPick((list.find((a) => a.isDefault) || list[0]).id || '0');
    });
  }, [token]);

  const address = pick === 'new' ? form : (addresses.find((a, i) => (a.id || String(i)) === pick) || form);

  const priceIt = useCallback(async () => {
    if (!cart.length) return null;
    const { ok, data } = await api('checkout/coupons', { method: 'POST', body: { items: cart, coupon, phone: address.phone } });
    if (!ok) { setErr(data?.error || 'Could not work out your bill.'); return null; }
    if (coupon && data.bill?.couponError) {
      setErr(`${data.bill.couponError}. The coupon was removed.`);
      setCoupon('');
      try { sessionStorage.removeItem(COUPON_KEY); } catch {}
      return null;
    }
    setBill(data.bill);
    return data.bill;
  }, [cart, coupon, address.phone]);

  useEffect(() => { if (token && hydrated) priceIt(); }, [token, hydrated, priceIt]);

  const check = () => {
    const a = address;
    if (!a.name?.trim()) return 'Please enter the receiver name.';
    if (String(a.phone || '').replace(/\D/g, '').length < 10) return 'Please enter a 10-digit mobile number.';
    if (!a.house?.trim() || !a.road?.trim()) return 'Please enter the full address (house and street / area).';
    if (!a.city?.trim()) return 'Please enter the city.';
    if (!/^\d{6}$/.test(String(a.pincode || ''))) return 'Please enter a 6-digit pincode.';
    return '';
  };

  const place = async () => {
    setErr('');
    const problem = check();
    if (problem) { setErr(problem); return; }
    setBusy(true);
    try {
      const b = await priceIt();
      if (!b) return;
      if (pick === 'new' && saveAddr) {
        const next = [...addresses, { ...form, id: `web${Date.now()}`, type: 'HOME', isDefault: !addresses.length }];
        api('me/addresses', { method: 'PUT', body: { items: next } });
      }
      const body = {
        items: cart.map(({ name, qty, price, weight, image }) => ({ name, qty, price, weight, image })),
        address: { ...address, phone: String(address.phone).replace(/\D/g, '').slice(-10) },
        email: user?.email || '',
        userId: user?.id || '',
        coupon: b.coupon || '',
        total: b.total,
        subtotal: b.itemsTotal,
        deliveryFee: b.delivery,
        discount: b.discount,
        source: 'web',
      };

      if (method === 'cod') {
        const { ok, data } = await api('checkout/cod', { method: 'POST', body });
        if (!ok) { handleFail(data); return; }
        done(data?.order?.orderId || data?.order?.id);
        return;
      }

      const loaded = await loadRazorpay();
      if (!loaded) { setErr('Could not open the payment window. Please check your internet and try again.'); return; }
      const { ok, data } = await api('checkout/pay-init', { method: 'POST', body: { ...body, method: 'online' } });
      if (!ok) { handleFail(data); return; }
      await new Promise((resolve) => {
        const rzp = new window.Razorpay({
          key: data.key,
          amount: data.amountPaise,
          currency: 'INR',
          name: 'Adhvaitha Foods',
          description: `Order ${data.orderId}`,
          image: '/images/logo.svg',
          order_id: data.razorpayOrderId,
          prefill: { name: address.name, email: data.email || user?.email || '', contact: data.contact || address.phone },
          theme: { color: '#C4603A' },
          handler: async (resp) => {
            const v = await api('checkout/pay-verify', { method: 'POST', body: { orderId: data.orderId, ...resp } });
            if (v.ok) done(data.orderId);
            else setErr(v.data?.error || 'We could not confirm your payment. If money was taken, it will be refunded automatically. Please contact us.');
            resolve();
          },
          modal: {
            ondismiss: () => {
              api('checkout/pay-failed', { method: 'POST', body: { orderId: data.orderId, reason: 'Closed the payment window' } });
              setErr('Payment was not completed. Your cart is still here — you can try again.');
              resolve();
            },
          },
        });
        rzp.on('payment.failed', (r) => {
          api('checkout/pay-failed', { method: 'POST', body: { orderId: data.orderId, reason: r?.error?.description || 'Payment failed' } });
        });
        rzp.open();
      });
    } finally {
      setBusy(false);
    }
  };

  const handleFail = (data) => {
    if (data?.priceChanged || data?.couponError) priceIt();
    setErr(data?.error || 'Could not place the order. Please try again.');
  };

  const done = (id) => {
    clearCart();
    try { sessionStorage.removeItem(COUPON_KEY); } catch {}
    router.push(`/my-orders?placed=${encodeURIComponent(id || '')}`);
  };

  if (!hydrated) return <ShopShell><p style={ui.muted}>Loading…</p></ShopShell>;

  if (!cart.length) {
    return (
      <ShopShell max={700}>
        <div style={{ ...ui.card, textAlign: 'center' }}>
          <h2 style={ui.h2}>Your cart is empty</h2>
          <Link href="/products#shop" style={{ ...ui.btn, textDecoration: 'none', display: 'inline-block', marginTop: '1rem' }}>Browse products</Link>
        </div>
      </ShopShell>
    );
  }

  if (!token) {
    return (
      <ShopShell max={700}>
        <div style={ui.card}><LoginBox title="Log in to place your order" /></div>
      </ShopShell>
    );
  }

  const f = (k) => ({ value: form[k], onChange: (e) => setForm({ ...form, [k]: k === 'pincode' ? e.target.value.replace(/\D/g, '').slice(0, 6) : k === 'phone' ? e.target.value.replace(/[^\d+ ]/g, '').slice(0, 14) : e.target.value }) });

  return (
    <ShopShell>
      <h1 style={ui.h1}>Checkout</h1>
      <p style={{ ...ui.muted, marginBottom: '1.5rem' }}>Logged in as {user?.email}</p>
      <div className="aj-cart-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '1.25rem', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={ui.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
              <h2 style={ui.h2}>Delivery address</h2>
              {addresses.length > 0 && <Link href="/addresses" style={{ ...ui.link, textDecoration: 'none' }}>Manage</Link>}
            </div>
            {addresses.map((a, i) => {
              const id = a.id || String(i);
              return (
                <label key={id} style={choice(pick === id)}>
                  <input type="radio" checked={pick === id} onChange={() => setPick(id)} style={{ marginTop: 4 }} />
                  <span><b>{a.name}</b> · {a.phone}<br /><span style={ui.muted}>{[a.house, a.road, a.city, a.state, a.pincode].filter(Boolean).join(', ')}</span></span>
                </label>
              );
            })}
            {addresses.length > 0 && (
              <label style={choice(pick === 'new')}>
                <input type="radio" checked={pick === 'new'} onChange={() => setPick('new')} style={{ marginTop: 4 }} />
                <span><b>+ Deliver to a new address</b></span>
              </label>
            )}
            {pick === 'new' && (
              <div className="aj-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem', marginTop: '0.6rem' }}>
                <input style={ui.input} placeholder="Full name" autoComplete="name" {...f('name')} />
                <input style={ui.input} placeholder="Mobile number" inputMode="tel" autoComplete="tel" {...f('phone')} />
                <input style={{ ...ui.input, gridColumn: '1 / -1' }} placeholder="House / flat no., building" autoComplete="address-line1" {...f('house')} />
                <input style={{ ...ui.input, gridColumn: '1 / -1' }} placeholder="Street, area, landmark" autoComplete="address-line2" {...f('road')} />
                <input style={ui.input} placeholder="City" autoComplete="address-level2" {...f('city')} />
                <input style={ui.input} placeholder="Pincode" inputMode="numeric" autoComplete="postal-code" {...f('pincode')} />
                <select style={{ ...ui.input, gridColumn: '1 / -1' }} {...f('state')}>
                  {STATES.map((s) => <option key={s}>{s}</option>)}
                </select>
                <label style={{ ...ui.muted, gridColumn: '1 / -1', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="checkbox" checked={saveAddr} onChange={(e) => setSaveAddr(e.target.checked)} /> Save this address (also shows in the app)
                </label>
              </div>
            )}
          </div>

          <div style={ui.card}>
            <h2 style={ui.h2}>Payment</h2>
            <label style={choice(method === 'online')}>
              <input type="radio" checked={method === 'online'} onChange={() => setMethod('online')} style={{ marginTop: 4 }} />
              <span><b>Pay online</b><br /><span style={ui.muted}>UPI, cards, net banking, wallets · secured by Razorpay</span></span>
            </label>
            {catalog?.codEnabled !== false && (
              <label style={choice(method === 'cod')}>
                <input type="radio" checked={method === 'cod'} onChange={() => setMethod('cod')} style={{ marginTop: 4 }} />
                <span><b>Cash on Delivery</b><br /><span style={ui.muted}>Pay when your order arrives</span></span>
              </label>
            )}
          </div>
        </div>

        <div style={{ ...ui.card, position: 'sticky', top: 140 }}>
          <h2 style={ui.h2}>Order summary</h2>
          <div style={{ maxHeight: 220, overflowY: 'auto', marginBottom: '0.6rem' }}>
            {cart.map((x) => (
              <div key={`${x.name}${x.weight}`} style={{ ...ui.row, fontSize: '0.88rem' }}>
                <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{x.name} · {x.weight} × {x.qty}</span>
                <span>{rupees(x.price * x.qty)}</span>
              </div>
            ))}
          </div>
          <BillBox bill={bill} count={cartCount(cart)} />
          {err && <p style={ui.error}>{err}</p>}
          <button style={{ ...ui.btn, width: '100%', marginTop: '1rem', opacity: busy || !bill ? 0.6 : 1 }} disabled={busy || !bill} onClick={place}>
            {busy ? 'Please wait…' : method === 'cod' ? `Place order · ${bill ? rupees(bill.total) : ''}` : `Pay ${bill ? rupees(bill.total) : ''}`}
          </button>
          <p style={{ ...ui.muted, fontSize: '0.78rem', marginTop: '0.8rem', textAlign: 'center' }}>
            By placing the order you agree to our <Link href="/terms-and-conditions" style={{ color: 'var(--terracotta)' }}>Terms</Link> and <Link href="/refund-policy" style={{ color: 'var(--terracotta)' }}>Refund policy</Link>.
          </p>
          <Link href="/cart" style={{ ...ui.link, display: 'block', textAlign: 'center', marginTop: '0.4rem', textDecoration: 'none' }}>← Back to cart</Link>
        </div>
      </div>
      <style>{`@media (max-width: 860px) { .aj-cart-grid { grid-template-columns: 1fr !important; } .aj-cart-grid > div { position: static !important; } } @media (max-width: 560px) { .aj-form-grid { grid-template-columns: 1fr !important; } }`}</style>
    </ShopShell>
  );
}

const choice = (on) => ({
  display: 'flex', gap: '0.7rem', alignItems: 'flex-start', padding: '0.8rem 0.9rem', borderRadius: 12, cursor: 'pointer', marginBottom: '0.6rem',
  border: on ? '2px solid var(--terracotta)' : '1.5px solid rgba(139,94,60,0.2)', background: on ? '#FFF7F0' : '#fff',
  fontFamily: '"Inter", system-ui, sans-serif', color: 'var(--rich-brown)', fontSize: '0.92rem',
});
