'use client';
import Link from 'next/link';
import { ShoppingBag, User, Heart } from 'lucide-react';
import { useShop, cartCount } from './shopStore';

// Cart + My Orders icons for the navbar. Hidden when the shop is switched off and the cart is empty.
export default function CartButton({ color }) {
  const { cart, wish, catalog, hydrated, token } = useShop();
  const n = cartCount(cart);
  if (!hydrated || (catalog?.shopEnabled === false && !n && !token)) return null;
  const icon = { color, display: 'inline-flex', alignItems: 'center', position: 'relative', padding: '0.4rem', transition: 'transform .2s ease' };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginRight: '0.35rem' }}>
      <Link href="/my-orders" aria-label="My orders" title="My orders" style={icon}>
        <User size={22} />
      </Link>
      <Link href="/wishlist" aria-label={`Wishlist, ${wish.length} items`} title="Wishlist" style={icon}>
        <Heart size={22} />
        {wish.length > 0 && (
          <span style={{ position: 'absolute', top: 0, right: -2, minWidth: 18, height: 18, padding: '0 4px', borderRadius: 999, background: '#C2273A', color: '#fff', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Inter", system-ui, sans-serif', lineHeight: 1 }}>
            {wish.length > 99 ? '99+' : wish.length}
          </span>
        )}
      </Link>
      <Link href="/cart" aria-label={`Cart, ${n} items`} title="Cart" style={icon}>
        <ShoppingBag size={23} />
        {n > 0 && (
          <span style={{ position: 'absolute', top: 0, right: -2, minWidth: 18, height: 18, padding: '0 4px', borderRadius: 999, background: 'var(--terracotta)', color: '#fff', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Inter", system-ui, sans-serif', lineHeight: 1 }}>
            {n > 99 ? '99+' : n}
          </span>
        )}
      </Link>
    </div>
  );
}
