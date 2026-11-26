import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Website "Delete account" form → admin dashboard (shows in Customer CRM → Deletion Requests).
export async function POST(request) {
  try {
    const b = await request.json().catch(() => ({}));
    const email = String(b?.email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid email.' }, { status: 400 });
    }
    const r = await fetch('https://admin.adhvaithafoods.in/api/account/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'web',
        email,
        name: String(b?.name || '').slice(0, 60),
        phone: String(b?.phone || '').slice(0, 20),
        reason: String(b?.reason || '').slice(0, 300),
      }),
      cache: 'no-store',
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || !j.success) throw new Error(j.error || 'failed');
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Could not send your request. Please email info@adhvaithafoods.in.' }, { status: 500 });
  }
}
