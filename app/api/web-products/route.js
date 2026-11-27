import { NextResponse } from 'next/server';
import { ALL_PRODUCTS } from '@/components/productsData';

export const dynamic = 'force-dynamic';

const ADMIN = (process.env.ADMIN_API_URL || 'https://admin.adhvaithafoods.in').replace(/\/$/, '');
const NO_CACHE = { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' };
const SITE_HOSTS = /^https?:\/\/(www\.)?adhvaithafoods\.in/i;

/** The one shared product list (Admin → Products, same as the app), shaped for the website cards. */
async function sharedProducts() {
  const r = await fetch(`${ADMIN}/api/shop/catalog`, { cache: 'no-store' });
  const j = await r.json().catch(() => null);
  if (!j?.success || !j.shared || !Array.isArray(j.products)) return null; // not linked yet → old list
  const fallbackByName = new Map(ALL_PRODUCTS.map((p) => [p.name.toLowerCase().replace(/[^a-z0-9]/g, ''), p]));
  return j.products
    .filter((p) => p.web)
    .map((p) => {
      const old = fallbackByName.get(String(p.name).toLowerCase().replace(/[^a-z0-9]/g, ''));
      let img = p.web.image || (/^https?:\/\//.test(p.image) ? p.image : '') || old?.img || '/images/products/mango-pickle-real.jpg';
      img = img.replace(SITE_HOSTS, '');
      return {
        id: p.web.sourceId || p.id,
        shopId: p.id,
        name: p.name,
        category: p.web.category || old?.category || 'Prepared Foods',
        img,
        images: [img],
        image_url: img,
        desc: p.description || old?.desc || '',
        productDescription: p.description || old?.desc || '',
        badge: p.web.badge || null,
        badgeClass: p.web.badge ? 'badge-bestseller' : '',
        rating: p.rating || 5,
        reviews: old?.reviews || 120,
        spice: p.spice || old?.spice || 3,
        emoji: '🏺',
        variants: p.variants,
        shopCategory: p.category,
        shared: true,
      };
    });
}

/** Old list: Admin → Website product display (web_products.php), else the built-in list. */
async function legacyProducts() {
  try {
    const res = await fetch(`https://api.adhvaithafoods.in/web_products.php`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`BigRock API returned ${res.status}`);
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    if (Array.isArray(data) && data.length > 0) {
      return data.map((p) => {
        const productName = p.productName || p.name || '';
        const cleanName = productName.toLowerCase().replace(/[^a-z0-9]/g, '');
        const fallback = ALL_PRODUCTS.find((fp) => fp.id === p.id || fp.name.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanName)
          || ALL_PRODUCTS.find((fp) => {
            const fpClean = fp.name.toLowerCase().replace(/[^a-z0-9]/g, '');
            return cleanName.includes(fpClean) || fpClean.includes(cleanName);
          });
        const realImg = fallback && fallback.img ? fallback.img : '/images/products/mango-pickle-real.jpg';
        return {
          ...p,
          img: realImg,
          images: [realImg],
          image_url: realImg,
          productDescription: p.productDescription || p.description || (fallback ? fallback.desc : ''),
        };
      });
    }
  } catch {}
  return ALL_PRODUCTS;
}

export async function GET(request) {
  const legacy = new URL(request.url).searchParams.get('legacy') === '1';
  if (!legacy) {
    try {
      const shared = await sharedProducts();
      if (shared && shared.length) return NextResponse.json(shared, { headers: NO_CACHE });
    } catch {}
  }
  return NextResponse.json(await legacyProducts(), { headers: NO_CACHE });
}
