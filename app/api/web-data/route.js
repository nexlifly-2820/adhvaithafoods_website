import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const doc_id = searchParams.get('doc_id');
    
    if (!doc_id) {
      return NextResponse.json({ success: false, error: 'doc_id is required' }, { status: 400 });
    }

    // Call the HTTP API from the server to bypass browser mixed content restrictions
    const res = await fetch(`http://api.adhvaithafoods.in/web_settings.php?doc_id=${doc_id}`);
    
    if (!res.ok) {
      throw new Error(`BigRock API returned ${res.status}`);
    }
    
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
