'use client';
// Shared shop state for the website: login, cart (synced with the app account), product prices.
import { useSyncExternalStore } from 'react';

const LS_CART = 'aj_web_cart';
const LS_AUTH = 'aj_web_auth';
const SERVER_STATE = { cart: [], token: '', user: null, catalog: null, hydrated: false };

let state = SERVER_STATE;
const listeners = new Set();
let started = false;
let syncTimer = null;
let catalogPromise = null;
let catalogAt = 0;

const read = (k) => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch { return null; } };
const write = (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, JSON.stringify(v)); } catch {} };

function emit() { listeners.forEach((l) => l()); }
function set(patch) { state = { ...state, ...patch }; emit(); }

function start() {
  if (started || typeof window === 'undefined') return;
  started = true;
  const auth = read(LS_AUTH);
  const cart = read(LS_CART);
  state = {
    ...state,
    hydrated: true,
    cart: Array.isArray(cart) ? cart.filter((x) => x && x.name) : [],
    token: auth?.token || '',
    user: auth?.user || null,
  };
  window.addEventListener('storage', (e) => {
    if (e.key === LS_CART) set({ cart: read(LS_CART) || [] });
    if (e.key === LS_AUTH) { const a = read(LS_AUTH); set({ token: a?.token || '', user: a?.user || null }); }
  });
  if (state.token) pullCart();
}

export function useShop() {
  return useSyncExternalStore(
    (l) => { start(); listeners.add(l); return () => listeners.delete(l); },
    () => { start(); return state; },
    () => SERVER_STATE,
  );
}

export const getShop = () => state;

// ---------- server calls ----------
export async function api(path, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (state.token) headers.Authorization = `Bearer ${state.token}`;
  let r;
  try {
    r = await fetch(`/api/shop/${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body), cache: 'no-store' });
  } catch {
    return { ok: false, status: 0, data: { success: false, error: 'No internet connection. Please try again.' } };
  }
  const data = await r.json().catch(() => ({}));
  if (r.status === 401 && data?.relogin) logout(false);
  return { ok: r.ok && data?.success !== false, status: r.status, data };
}

// ---------- login ----------
export function login(token, user) {
  write(LS_AUTH, { token, user });
  set({ token, user });
  pullCart(true);
}

export function logout(clearCart = true) {
  write(LS_AUTH, null);
  if (clearCart) { write(LS_CART, []); set({ token: '', user: null, cart: [] }); }
  else set({ token: '', user: null });
}

// ---------- catalog (same prices as the app) ----------
const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

export function loadCatalog(force = false) {
  if (!force && state.catalog && Date.now() - catalogAt < 60_000) return Promise.resolve(state.catalog);
  if (!force && catalogPromise) return catalogPromise;
  catalogPromise = api('shop/catalog').then(({ ok, data }) => {
    catalogPromise = null;
    if (!ok) return state.catalog;
    catalogAt = Date.now();
    set({ catalog: data });
    return data;
  });
  return catalogPromise;
}

/** Finds the shop product for a website product name. */
export function findShopProduct(catalog, name) {
  const list = catalog?.products || [];
  const n = norm(name);
  if (!n) return null;
  let hit = list.find((p) => norm(p.name) === n);
  if (hit) return hit;
  const near = list.filter((p) => { const m = norm(p.name); return m.length >= 5 && n.length >= 5 && (m.includes(n) || n.includes(m)); });
  near.sort((a, b) => Math.abs(norm(a.name).length - n.length) - Math.abs(norm(b.name).length - n.length));
  return near[0] || null;
}

// ---------- cart ----------
export const lineKey = (x) => `${norm(x.name)}|${norm(x.weight)}`;

function saveCart(cart) {
  write(LS_CART, cart);
  set({ cart });
  if (!state.token) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    api('me/cart', { method: 'PUT', body: { items: state.cart.map(({ name, image, weight, qty, price, category }) => ({ name, image, weight, qty, price, category })) } });
  }, 700);
}

export function addToCart(item, qty = 1) {
  const k = lineKey(item);
  const cart = [...state.cart];
  const i = cart.findIndex((x) => lineKey(x) === k);
  if (i >= 0) cart[i] = { ...cart[i], qty: Math.min(50, cart[i].qty + qty), price: item.price };
  else cart.unshift({ name: item.name, weight: item.weight, price: item.price, image: item.image || '', category: item.category || '', qty: Math.min(50, qty) });
  saveCart(cart);
}

export function setQty(key, qty) {
  const cart = state.cart
    .map((x) => (lineKey(x) === key ? { ...x, qty: Math.max(0, Math.min(50, qty)) } : x))
    .filter((x) => x.qty > 0);
  saveCart(cart);
}

export function removeLine(key) { saveCart(state.cart.filter((x) => lineKey(x) !== key)); }
export function clearCart() { saveCart([]); }

/** Updates cart prices to today's shop prices. */
export function repriceCart(catalog) {
  if (!catalog?.products) return;
  let changed = false;
  const cart = state.cart.map((x) => {
    const p = findShopProduct(catalog, x.name);
    const v = p?.variants.find((v) => norm(v.label) === norm(x.weight));
    if (v && v.price !== x.price) { changed = true; return { ...x, price: v.price }; }
    return x;
  });
  if (changed) saveCart(cart);
}

/** After login: join this browser's cart with the account cart (same cart as the app). */
async function pullCart(merge = false) {
  const { ok, data } = await api('me/cart');
  if (!ok || !Array.isArray(data?.items)) return;
  const server = data.items.filter((x) => x && x.name);
  let cart;
  if (merge) {
    const map = new Map(server.map((x) => [lineKey(x), x]));
    for (const x of state.cart) {
      const k = lineKey(x);
      map.set(k, map.has(k) ? { ...map.get(k), qty: Math.max(map.get(k).qty, x.qty) } : x);
    }
    cart = [...map.values()];
  } else {
    cart = server.length || !state.cart.length ? server : state.cart;
  }
  saveCart(cart);
}

export const rupees = (n) => `₹${Math.round(Number(n) || 0).toLocaleString('en-IN')}`;
export const cartCount = (cart) => cart.reduce((s, x) => s + (Number(x.qty) || 0), 0);
export const imgSrc = (src) => (/^(https?:)?\/\//.test(src || '') || String(src || '').startsWith('/') ? src : '/images/products/mango-pickle-real.jpg');
