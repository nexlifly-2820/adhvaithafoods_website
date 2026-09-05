import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const res = await fetch(`http://api.adhvaithafoods.in/web_products.php`);
    if (!res.ok) throw new Error(`BigRock API returned ${res.status}`);
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
