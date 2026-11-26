'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ShopShell, { ui } from '@/components/shop/ShopShell';
import LoginBox from '@/components/shop/LoginBox';
import { useShop, api } from '@/components/shop/shopStore';

const STATES = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'];
const EMPTY = { id: '', name: '', phone: '', altPhone: '', house: '', road: '', city: '', state: 'Telangana', pincode: '', type: 'HOME', isDefault: false };
const TYPES = [['HOME', '🏠 Home'], ['OFFICE', '🏢 Office'], ['OTHER', '📍 Other']];

function problem(a) {
  if (!a.name.trim()) return 'Please enter the receiver name.';
  if (a.phone.replace(/\D/g, '').length < 10) return 'Please enter a 10-digit mobile number.';
  if (!a.house.trim() || !a.road.trim()) return 'Please enter house and street / area.';
  if (!a.city.trim()) return 'Please enter the city.';
  if (!/^\d{6}$/.test(a.pincode)) return 'Please enter a 6-digit pincode.';
  return '';
}

export default function AddressesPage() {
  const { token, hydrated } = useShop();
  const [list, setList] = useState(null);
  const [form, setForm] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!token) return;
    api('me/addresses').then(({ ok, data }) => setList(ok && Array.isArray(data?.items) ? data.items : []));
  }, [token]);

  const save = async (next, note) => {
    setBusy(true); setErr('');
    // exactly one default
    if (next.length && !next.some((a) => a.isDefault)) next[0] = { ...next[0], isDefault: true };
    const { ok, data } = await api('me/addresses', { method: 'PUT', body: { items: next } });
    setBusy(false);
    if (!ok) { setErr(data?.error || 'Could not save. Please try again.'); return false; }
    setList(next); setMsg(note); setTimeout(() => setMsg(''), 2500);
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    const a = { ...form, phone: form.phone.replace(/\D/g, '').slice(-10), altPhone: form.altPhone.replace(/\D/g, '').slice(-10) };
    const p = problem(a);
    if (p) { setErr(p); return; }
    let next = form.id ? list.map((x) => (x.id === form.id ? a : x)) : [...list, { ...a, id: `web${Date.now()}` }];
    if (a.isDefault) next = next.map((x) => ({ ...x, isDefault: x.id === (a.id || next[next.length - 1].id) }));
    if (await save(next, form.id ? 'Address updated' : 'Address added')) setForm(null);
  };

  // pincode → city & state (India Post)
  const lookupPin = async (pin) => {
    try {
      const r = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const j = await r.json();
      const po = j?.[0]?.PostOffice?.[0];
      if (po) setForm((f) => (f && f.pincode === pin ? { ...f, city: f.city || po.District || '', state: STATES.includes(po.State) ? po.State : f.state } : f));
    } catch {}
  };

  if (!hydrated) return <ShopShell><p style={ui.muted}>Loading…</p></ShopShell>;
  if (!token) return <ShopShell max={700}><div style={ui.card}><LoginBox title="Log in to manage your addresses" /></div></ShopShell>;

  const f = (k) => ({
    value: form[k],
    onChange: (e) => {
      const v = k === 'pincode' ? e.target.value.replace(/\D/g, '').slice(0, 6) : (k === 'phone' || k === 'altPhone') ? e.target.value.replace(/[^\d+ ]/g, '').slice(0, 14) : e.target.value;
      setForm({ ...form, [k]: v });
      if (k === 'pincode' && v.length === 6) lookupPin(v);
    },
  });

  return (
    <ShopShell max={860}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={ui.h1}>My Addresses</h1>
          <p style={ui.muted}>Same addresses as your Adhvaitha app.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <Link href="/my-orders" style={ui.btnOutline}>My orders</Link>
          {!form && <button style={ui.btnDark} onClick={() => { setErr(''); setForm({ ...EMPTY, isDefault: !list?.length }); }}>+ Add address</button>}
        </div>
      </div>

      {msg && <p style={{ ...ui.muted, color: 'var(--forest-green)', fontWeight: 700, marginBottom: '0.8rem' }}>✓ {msg}</p>}

      {form && (
        <form onSubmit={submit} style={{ ...ui.card, marginBottom: '1.2rem' }}>
          <h2 style={ui.h2}>{form.id ? 'Edit address' : 'New address'}</h2>
          <div className="aj-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem', marginTop: '0.6rem' }}>
            <input style={ui.input} placeholder="Full name" autoComplete="name" {...f('name')} />
            <input style={ui.input} placeholder="Mobile number" inputMode="tel" autoComplete="tel" {...f('phone')} />
            <input style={{ ...ui.input, gridColumn: '1 / -1' }} placeholder="House / flat no., building" autoComplete="address-line1" {...f('house')} />
            <input style={{ ...ui.input, gridColumn: '1 / -1' }} placeholder="Street, area, landmark" autoComplete="address-line2" {...f('road')} />
            <input style={ui.input} placeholder="Pincode" inputMode="numeric" autoComplete="postal-code" {...f('pincode')} />
            <input style={ui.input} placeholder="City" autoComplete="address-level2" {...f('city')} />
            <select style={ui.input} {...f('state')}>{STATES.map((s) => <option key={s}>{s}</option>)}</select>
            <input style={ui.input} placeholder="Alternate number (optional)" inputMode="tel" {...f('altPhone')} />
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '0.9rem 0 0.4rem' }}>
            {TYPES.map(([k, label]) => (
              <button type="button" key={k} onClick={() => setForm({ ...form, type: k })} style={{ ...ui.btnOutline, padding: '0.45rem 0.9rem', background: form.type === k ? 'var(--rich-brown)' : 'transparent', color: form.type === k ? '#fff' : 'var(--rich-brown)' }}>{label}</button>
            ))}
          </div>
          <label style={{ ...ui.muted, display: 'flex', gap: 8, alignItems: 'center', margin: '0.6rem 0' }}>
            <input type="checkbox" checked={form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} /> Make this my default address
          </label>
          {err && <p style={ui.error}>{err}</p>}
          <div style={{ display: 'flex', gap: 8, marginTop: '0.8rem' }}>
            <button style={ui.btn} disabled={busy}>{busy ? 'Saving…' : 'Save address'}</button>
            <button type="button" style={ui.btnOutline} onClick={() => { setForm(null); setErr(''); }}>Cancel</button>
          </div>
        </form>
      )}

      {list === null ? <p style={ui.muted}>Loading your addresses…</p> : !list.length && !form ? (
        <div style={{ ...ui.card, textAlign: 'center', padding: '3rem 1.5rem' }}>
          <div style={{ fontSize: '2.6rem' }}>📍</div>
          <h2 style={ui.h2}>No saved addresses</h2>
          <button style={{ ...ui.btn, marginTop: '0.8rem' }} onClick={() => setForm({ ...EMPTY, isDefault: true })}>+ Add your first address</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {list.map((a) => (
            <div key={a.id} style={{ ...ui.card, border: a.isDefault ? '2px solid var(--terracotta)' : ui.card.border, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
                <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.06em', background: '#FFF3DC', color: '#8A5A00', padding: '0.2rem 0.6rem', borderRadius: 999 }}>{(TYPES.find((t) => t[0] === a.type) || TYPES[0])[1]}</span>
                {a.isDefault && <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.72rem', fontWeight: 800, color: 'var(--terracotta)' }}>DEFAULT</span>}
              </div>
              <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 800, color: 'var(--rich-brown)', marginTop: '0.7rem' }}>{a.name}</div>
              <div style={{ ...ui.muted, flex: 1 }}>{[a.house, a.road, a.city, a.state, a.pincode].filter(Boolean).join(', ')}<br />📞 {a.phone}{a.altPhone ? ` · ${a.altPhone}` : ''}</div>
              <div style={{ display: 'flex', gap: '0.9rem', marginTop: '0.9rem', flexWrap: 'wrap' }}>
                <button style={ui.link} onClick={() => { setErr(''); setForm({ ...EMPTY, ...a }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Edit</button>
                {!a.isDefault && <button style={ui.link} disabled={busy} onClick={() => save(list.map((x) => ({ ...x, isDefault: x.id === a.id })), 'Default address changed')}>Make default</button>}
                <button style={{ ...ui.link, color: '#B3261E' }} disabled={busy} onClick={() => { if (confirm('Delete this address?')) save(list.filter((x) => x.id !== a.id), 'Address deleted'); }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <style>{`@media (max-width: 560px) { .aj-form-grid { grid-template-columns: 1fr !important; } }`}</style>
    </ShopShell>
  );
}
