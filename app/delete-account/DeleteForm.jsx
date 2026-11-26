'use client';

import { useState } from 'react';

const input = { width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid rgba(139,94,60,0.25)', background: '#FFFCF5', fontSize: '1rem', boxSizing: 'border-box' };
const label = { display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem', color: 'var(--rich-brown)' };

export default function DeleteForm() {
  const [f, setF] = useState({ name: '', email: '', phone: '', reason: '' });
  const [state, setState] = useState({ busy: false, done: false, error: '' });
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) return setState({ busy: false, done: false, error: 'Please enter the email you use to log in to the app.' });
    setState({ busy: true, done: false, error: '' });
    try {
      const r = await fetch('/api/delete-request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.success) throw new Error(j.error || 'Could not send your request');
      setState({ busy: false, done: true, error: '' });
    } catch (err) {
      setState({ busy: false, done: false, error: err.message || 'Could not send your request. Please email us instead.' });
    }
  }

  if (state.done) {
    return (
      <div style={{ background: 'rgba(47,107,69,0.08)', border: '1px solid rgba(47,107,69,0.3)', borderRadius: '12px', padding: '1.25rem' }}>
        <p className="body-md" style={{ color: '#2F6B45', fontWeight: 700 }}>Request received.</p>
        <p className="body-md">We&apos;ll email <strong>{f.email}</strong> to confirm, and delete your account within 30 days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: '1rem', background: 'rgba(250,240,220,0.4)', padding: '1.25rem', borderRadius: '12px' }}>
      <div>
        <label style={label} htmlFor="del-email">Email used in the app *</label>
        <input id="del-email" type="email" required value={f.email} onChange={set('email')} style={input} placeholder="you@example.com" />
      </div>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div>
          <label style={label} htmlFor="del-name">Name</label>
          <input id="del-name" value={f.name} onChange={set('name')} style={input} maxLength={60} />
        </div>
        <div>
          <label style={label} htmlFor="del-phone">Phone number</label>
          <input id="del-phone" type="tel" value={f.phone} onChange={set('phone')} style={input} maxLength={15} />
        </div>
      </div>
      <div>
        <label style={label} htmlFor="del-reason">Reason (optional)</label>
        <textarea id="del-reason" rows={3} value={f.reason} onChange={set('reason')} style={{ ...input, resize: 'vertical' }} maxLength={300} />
      </div>
      {state.error && <p className="body-sm" style={{ color: '#B3123A', fontWeight: 700 }}>{state.error}</p>}
      <button type="submit" disabled={state.busy}
        style={{ background: 'var(--terracotta)', color: '#fff', border: 'none', borderRadius: '999px', padding: '0.9rem 1.5rem', fontWeight: 700, fontSize: '1rem', cursor: state.busy ? 'wait' : 'pointer', opacity: state.busy ? 0.7 : 1 }}>
        {state.busy ? 'Sending…' : 'Request account deletion'}
      </button>
    </form>
  );
}
