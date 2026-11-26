'use client';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useShop, toggleWish, inWish } from './shopStore';

// Heart on a product card. Works without login; joins the app wishlist after login.
export default function WishHeart({ product, style }) {
  const { wish, hydrated } = useShop();
  const [pop, setPop] = useState(false);
  if (!hydrated || !product?.name) return null;
  const on = inWish(wish, product.name);
  const firstPrice = Array.isArray(product.variants) ? (product.variants.find((v) => v.price > 0)?.price || 0) : 0;
  return (
    <button
      type="button"
      aria-label={on ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      aria-pressed={on}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleWish({
          name: product.name,
          image: product.img ? window.location.origin + product.img : '',
          price: firstPrice,
          category: product.category || '',
        });
        setPop(true);
        setTimeout(() => setPop(false), 300);
      }}
      style={{
        position: 'absolute', top: 6, right: 10, zIndex: 5, width: 40, height: 40, borderRadius: '50%',
        border: 'none', background: 'rgba(255,255,255,0.92)', boxShadow: '0 4px 14px rgba(61,31,10,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        transform: pop ? 'scale(1.25)' : 'scale(1)', transition: 'transform .25s cubic-bezier(.3,1.6,.5,1)',
        ...style,
      }}
    >
      <Heart size={19} color={on ? '#C2273A' : '#3D1F0A'} fill={on ? '#C2273A' : 'none'} strokeWidth={2.2} />
    </button>
  );
}
