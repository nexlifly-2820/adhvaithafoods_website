import { NextResponse } from 'next/server';
import { ALL_PRODUCTS } from '@/components/productsData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const res = await fetch(`http://api.adhvaithafoods.in/web_products.php`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error(`BigRock API returned ${res.status}`);
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    
    if (Array.isArray(data) && data.length > 0) {
      const enriched = data.map(p => {
        const productName = p.productName || p.name || '';
        const cleanName = productName.toLowerCase().replace(/[^a-z0-9]/g, '');
        const fallback = ALL_PRODUCTS.find(fp => fp.id === p.id || fp.name.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanName)
          || ALL_PRODUCTS.find(fp => {
            const fpClean = fp.name.toLowerCase().replace(/[^a-z0-9]/g, '');
            return cleanName.includes(fpClean) || fpClean.includes(cleanName);
          });
        const realImg = fallback && fallback.img ? fallback.img : '/images/products/mango-pickle-real.jpg';
        return {
          ...p,
          img: realImg,
          images: [realImg],
          image_url: realImg,
          productDescription: p.productDescription || p.description || (fallback ? fallback.desc : '')
        };
      });
      return NextResponse.json(enriched, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
        }
      });
    }

    return NextResponse.json(ALL_PRODUCTS, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      }
    });
  } catch (error) {
    return NextResponse.json(ALL_PRODUCTS, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      }
    });
  }
}
