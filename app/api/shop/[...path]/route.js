// Website → admin server (shared shop system). Only the customer shop endpoints are passed through.
export const dynamic = 'force-dynamic';

const ADMIN = (process.env.ADMIN_API_URL || 'https://admin.adhvaithafoods.in').replace(/\/$/, '');
const ALLOW = [
  /^auth\/otp\/(send|verify)$/,
  /^shop\/catalog$/,
  /^checkout\/(coupons|cod|pay-init|pay-verify|pay-failed)$/,
  /^me\/(cart|addresses|orders)$/,
  /^orders\/[A-Za-z0-9_-]{3,60}\/(cancel|report-issue)$/,
];

async function handle(request, { params }) {
  const { path = [] } = await params;
  const p = path.join('/');
  if (!ALLOW.some((r) => r.test(p))) {
    return Response.json({ success: false, error: 'Not found' }, { status: 404 });
  }
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
  const auth = request.headers.get('authorization');
  if (auth) headers.Authorization = auth;
  const search = new URL(request.url).search;
  try {
    const r = await fetch(`${ADMIN}/api/${p}${search}`, {
      method: request.method,
      headers,
      body: request.method === 'GET' ? undefined : await request.text(),
      cache: 'no-store',
    });
    return new Response(await r.text(), {
      status: r.status,
      headers: { 'Content-Type': r.headers.get('content-type') || 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch {
    return Response.json({ success: false, error: 'Could not reach our server. Please check your internet and try again.' }, { status: 502 });
  }
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
