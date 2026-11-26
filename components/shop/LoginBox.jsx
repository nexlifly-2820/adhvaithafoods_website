'use client';
// Email + 6-digit code login (same account as the app).
import { useState } from 'react';
import { api, login } from './shopStore';
import { ui } from './ShopShell';

export default function LoginBox({ title = 'Log in to continue', subtitle = 'Use the same email as the Adhvaitha app. We will send you a 6-digit code.' }) {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [info, setInfo] = useState('');

  const send = async (e) => {
    e?.preventDefault();
    setErr(''); setInfo('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) { setErr('Please enter a valid email address.'); return; }
    setBusy(true);
    const { ok, data } = await api('auth/otp/send', { method: 'POST', body: { email: email.trim() } });
    setBusy(false);
    if (!ok) { setErr(data?.error || 'Could not send the code.'); return; }
    setInfo(`We sent a code to ${email.trim()}. Check your inbox (and spam).`);
    setStep('code');
  };

  const verify = async (e) => {
    e.preventDefault();
    setErr('');
    if (!/^\d{6}$/.test(code)) { setErr('Enter the 6-digit code from your email.'); return; }
    setBusy(true);
    const { ok, data } = await api('auth/otp/verify', { method: 'POST', body: { email: email.trim(), otp: code, name: name.trim() } });
    setBusy(false);
    if (!ok || !data?.token) { setErr(data?.error || 'Wrong code, please try again.'); return; }
    login(data.token, data.user || { email: email.trim() });
  };

  return (
    <div style={{ maxWidth: 420, margin: '0 auto', textAlign: 'center' }}>
      <h2 style={ui.h2}>{title}</h2>
      <p style={{ ...ui.muted, marginBottom: '1.5rem' }}>{subtitle}</p>
      {step === 'email' ? (
        <form onSubmit={send} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input style={ui.input} type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button style={ui.btn} disabled={busy}>{busy ? 'Sending…' : 'Send code'}</button>
        </form>
      ) : (
        <form onSubmit={verify} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {info && <p style={{ ...ui.muted, color: 'var(--forest-green)' }}>{info}</p>}
          <input style={{ ...ui.input, letterSpacing: '0.5em', textAlign: 'center', fontSize: '1.3rem' }} inputMode="numeric" maxLength={6} placeholder="••••••" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} autoFocus />
          <input style={ui.input} placeholder="Your name (optional)" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} />
          <button style={ui.btn} disabled={busy}>{busy ? 'Checking…' : 'Verify & continue'}</button>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" style={ui.link} onClick={() => { setStep('email'); setCode(''); }}>Change email</button>
            <button type="button" style={ui.link} onClick={send} disabled={busy}>Resend code</button>
          </div>
        </form>
      )}
      {err && <p style={ui.error}>{err}</p>}
    </div>
  );
}
