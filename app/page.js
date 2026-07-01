'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingCart, ArrowRight, ChevronRight } from 'lucide-react';

/* ── Scroll-reveal hook ───────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

import { ALL_PRODUCTS } from '@/components/productsData';

// Dynamic featured products will be fetched inside the component

const ingredients = [
  { name: 'Raw Green Mangoes', source: 'Andhra Orchards', img: '/images/ing_mango.png', bg: 'rgba(74,124,64,0.12)' },
  { name: 'Red Kashmiri Chilies', source: 'Sun-dried 7 days', img: '/images/ing_chili.png', bg: 'rgba(185,28,28,0.1)' },
  { name: 'Cold-Pressed Sesame Oil', source: 'Wooden press', img: '/images/ing_oil.png', bg: 'rgba(217,119,6,0.1)' },
  { name: 'Mustard Seeds', source: 'Stone-ground fresh', img: '/images/ing_mustard.png', bg: 'rgba(120,53,15,0.1)' },
  { name: 'Himalayan Rock Salt', source: 'Pure & unprocessed', img: '/images/ing_salt.png', bg: 'rgba(100,116,139,0.1)' },
  { name: 'Fresh Curry Leaves', source: 'Handpicked daily', img: '/images/ing_leaves.png', bg: 'rgba(21,128,61,0.1)' },
];

const testimonials = [
  { text: 'Exactly like my naani used to make! The mango avakaya is absolutely perfect — the right amount of spice and oil. Will never buy from a supermarket again.', author: 'Priya Sharma', city: 'Hyderabad' },
  { text: 'Ordered the combo pack and finished it in a week! The gongura pickle is outstanding. Pure authentic Andhra taste. Fast delivery too.', author: 'Ravi Kumar', city: 'Bangalore' },
  { text: 'My mother cried when she tasted the lemon pickle — said it reminded her of her mother\'s recipe. That says everything. Thank you Avdaitha Foods.', author: 'Meena Reddy', city: 'Chennai' },
];

const trustBadges = ['🌿 100% Natural', '🚫 No Preservatives', '👵 Family Recipe Since 1970', '🏺 Traditional Method', '📦 Pan India Delivery', '☀️ Sun-Dried Always', '🪨 Stone-Ground Spices', '🫙 Glass Jars Only'];

const FALLBACK_RECIPES = [
  { id: 'allam-velluli-pickle-recipe', name: 'Allam Velluli Pickle Rice', time: '10 min', emoji: '🍚', color: '#C4603A', desc: 'Hot rice tossed with our traditional Allam Velluli Pickle, sesame seeds, and a drizzle of ghee.' },
  { id: 'crispy-allu-chips', name: 'Crispy Allu Chips', time: '20 min', emoji: '🥔', color: '#E8A820', desc: 'Make perfectly crispy, golden potato chips at home with this simple traditional method.' },
  { id: 'daniya-powder-rasam', name: 'Daniya Powder Rasam', time: '20 min', emoji: '🥣', color: '#2D5A27', desc: 'A comforting, deeply aromatic rasam made using freshly ground Daniya Powder.' },
  { id: 'millets-kheer', name: 'Millets Laddu Kheer', time: '15 min', emoji: '🍨', color: '#8B5E3C', desc: 'Comforting, creamy kheer made by crumbling Millets Laddu into warm milk.' },
];

/* ═══════════════════════════════════════════════════
   HOMEPAGE
═══════════════════════════════════════════════════ */
const FALLBACK_HERO_IMAGES = [
  '/images/hero-1-pickle.jpg',
  '/images/hero-2-powder.jpg',
  '/images/hero-3-laddu.jpg',
];

const MICHA_SLIDES = [
  { bgColor: '#E3242B', label: 'MANGO PICKLE', img: '/images/products/1000298812 - Edited.png', particles: ['🥭', '🌶️', '🌿', '🥭', '✨', '🌶️'], fontFamily: 'var(--font-lilita), system-ui, sans-serif' },
  { bgColor: '#83B748', label: 'USIRI PICKLE', img: '/images/products/1000298817 - Edited.png', particles: ['🍏', '🍃', '✨', '🍏', '🌿', '🍃'], fontFamily: 'var(--font-yellowtail), cursive' },
  { bgColor: '#F23D69', label: 'SPICY MANGO', img: '/images/products/1000298812 - Edited.png', particles: ['🌶️', '🔥', '🥭', '🌶️', '✨', '🔥'], fontFamily: 'var(--font-lilita), system-ui, sans-serif' },
  { bgColor: '#8F2090', label: 'SWEET USIRI', img: '/images/products/1000298817 - Edited.png', particles: ['🍯', '🍏', '✨', '🍯', '🌿', '🍏'], fontFamily: 'var(--font-yellowtail), cursive' }
];

const MICHA_BACKDROPS = [
  // Slide 0: Mango Pickle (Pink/Red)
  (
    <>
      <div style={{ position: 'absolute', width: '100%', height: '100%', animation: 'fly-in-left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '15%', left: '10%', width: '25vh', height: '25vh', animation: 'spin-in-place-slow 40s linear infinite' }}>
          <path fill="#7D62AB" d="M50,30 C50,10 20,10 20,35 C20,60 50,85 50,85 C50,85 80,60 80,35 C80,10 50,10 50,30 Z" transform="rotate(-30 50 50)" />
          <circle cx="35" cy="40" r="2" fill="#FCE300" />
          <circle cx="45" cy="30" r="2" fill="#FCE300" />
          <circle cx="55" cy="45" r="2" fill="#FCE300" />
          <circle cx="40" cy="55" r="2" fill="#FCE300" />
        </svg>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '30%', left: '15%', width: '35vh', height: '35vh', animation: 'spin-in-place-slow 35s linear infinite reverse' }}>
          <circle cx="50" cy="50" r="40" fill="#CC0044" />
          <path d="M10,50 L5,50 M90,50 L95,50 M50,10 L50,5 M50,90 L50,95" stroke="#CC0044" strokeWidth="4" />
          <path d="M22,22 L18,18 M78,78 L82,82 M22,78 L18,82 M78,22 L82,18" stroke="#CC0044" strokeWidth="4" />
          <path d="M40,30 Q42,32 40,34 M60,40 Q62,42 60,44 M35,60 Q37,62 35,64 M65,65 Q67,67 65,69 M50,50 Q52,52 50,54" stroke="#FF6699" fill="none" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div style={{ position: 'absolute', width: '100%', height: '100%', animation: 'fly-in-right 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '60%', left: '15%', width: '30vh', height: '30vh', animation: 'spin-in-place-slow 25s linear infinite' }}>
          <circle cx="50" cy="50" r="45" fill="#FCE300" />
          <circle cx="50" cy="50" r="40" fill="#FF4400" />
          <path d="M50,10 L50,90 M10,50 L90,50 M22,22 L78,78 M22,78 L78,22" stroke="#FCE300" strokeWidth="3" />
        </svg>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '15%', left: '30%', width: '40vh', height: '40vh', animation: 'spin-in-place-slow 30s linear infinite reverse' }}>
          <path fill="#EE2233" d="M50,5 C70,-5 95,20 90,45 C105,65 80,95 55,90 C35,105 5,80 10,55 C-5,35 20,5 50,5 Z" />
          <path fill="#CC1122" d="M50,15 C65,5 85,25 80,45 C95,60 75,85 55,80 C40,95 15,75 20,55 C5,40 25,15 50,15 Z" />
        </svg>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '55%', left: '30%', width: '35vh', height: '35vh', animation: 'spin-in-place-slow 20s linear infinite' }}>
          <path fill="#7D62AB" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(0 50 50)" />
          <path fill="#7D62AB" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(45 50 50)" />
          <path fill="#7D62AB" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(90 50 50)" />
          <path fill="#7D62AB" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(135 50 50)" />
          <path fill="#7D62AB" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(180 50 50)" />
          <path fill="#7D62AB" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(225 50 50)" />
          <path fill="#7D62AB" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(270 50 50)" />
          <path fill="#7D62AB" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(315 50 50)" />
          <circle cx="50" cy="50" r="15" fill="#5C4585" />
        </svg>
      </div>
    </>
  ),
  // Slide 1: Usiri Pickle (Green)
  (
    <>
      <div style={{ position: 'absolute', width: '100%', height: '100%', animation: 'fly-in-left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '15%', left: '15%', width: '35vh', height: '35vh', animation: 'spin-in-place-slow 35s linear infinite' }}>
          <path fill="#FFF" d="M50,0 C70,0 100,30 100,50 C100,70 70,100 50,100 C30,100 0,70 0,50 C0,30 30,0 50,0 Z" />
        </svg>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '50%', left: '10%', width: '30vh', height: '30vh', animation: 'spin-in-place-slow 25s linear infinite reverse' }}>
          <circle cx="50" cy="50" r="45" fill="#FFC107" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#FFF" strokeWidth="3" strokeDasharray="10 10" />
        </svg>
      </div>
      <div style={{ position: 'absolute', width: '100%', height: '100%', animation: 'fly-in-right 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '10%', left: '35%', width: '45vh', height: '45vh', animation: 'spin-in-place-slow 40s linear infinite reverse' }}>
          <path fill="#4CAF50" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(0 50 50)" />
          <path fill="#4CAF50" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(72 50 50)" />
          <path fill="#4CAF50" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(144 50 50)" />
          <path fill="#4CAF50" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(216 50 50)" />
          <path fill="#4CAF50" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(288 50 50)" />
        </svg>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '60%', left: '40%', width: '30vh', height: '30vh', animation: 'spin-in-place-slow 20s linear infinite' }}>
          <circle cx="50" cy="50" r="40" fill="#CDDC39" />
          <circle cx="50" cy="50" r="20" fill="#FFF" />
        </svg>
      </div>
    </>
  ),
  // Slide 2: Spicy Mango (Pink/Red)
  (
    <>
      <div style={{ position: 'absolute', width: '100%', height: '100%', animation: 'fly-in-left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '20%', left: '10%', width: '40vh', height: '40vh', animation: 'spin-in-place-slow 35s linear infinite' }}>
          <path fill="#FF5722" d="M50,0 C80,30 100,50 50,100 C0,50 20,30 50,0 Z" />
        </svg>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '55%', left: '15%', width: '25vh', height: '25vh', animation: 'spin-in-place-slow 20s linear infinite reverse' }}>
          <circle cx="50" cy="50" r="45" fill="#FFEB3B" />
          <path d="M50,5 L50,95 M5,50 L95,50 M15,15 L85,85 M15,85 L85,15" stroke="#FF5722" strokeWidth="4" />
        </svg>
      </div>
      <div style={{ position: 'absolute', width: '100%', height: '100%', animation: 'fly-in-right 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '10%', left: '35%', width: '35vh', height: '35vh', animation: 'spin-in-place-slow 25s linear infinite reverse' }}>
          <circle cx="50" cy="50" r="40" fill="#E91E63" />
          <circle cx="50" cy="50" r="10" fill="#FFF" />
          <circle cx="30" cy="30" r="5" fill="#FFF" />
          <circle cx="70" cy="30" r="5" fill="#FFF" />
          <circle cx="30" cy="70" r="5" fill="#FFF" />
          <circle cx="70" cy="70" r="5" fill="#FFF" />
        </svg>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '65%', left: '30%', width: '35vh', height: '35vh', animation: 'spin-in-place-slow 40s linear infinite' }}>
          <path fill="#FF9800" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(0 50 50)" />
          <path fill="#FF9800" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(90 50 50)" />
          <path fill="#FF9800" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(180 50 50)" />
          <path fill="#FF9800" d="M50,10 C65,10 70,45 50,50 C30,45 35,10 50,10 Z" transform="rotate(270 50 50)" />
        </svg>
      </div>
    </>
  ),
  // Slide 3: Sweet Usiri (Purple)
  (
    <>
      <div style={{ position: 'absolute', width: '100%', height: '100%', animation: 'fly-in-left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '15%', left: '15%', width: '30vh', height: '30vh', animation: 'spin-in-place-slow 30s linear infinite' }}>
          <circle cx="50" cy="50" r="45" fill="#00BCD4" />
          <circle cx="50" cy="50" r="25" fill="#FFF" />
        </svg>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '50%', left: '5%', width: '40vh', height: '40vh', animation: 'spin-in-place-slow 40s linear infinite reverse' }}>
          <path fill="#E040FB" d="M50,0 C70,0 80,30 50,50 C20,30 30,0 50,0 Z" transform="rotate(0 50 50)" />
          <path fill="#E040FB" d="M50,0 C70,0 80,30 50,50 C20,30 30,0 50,0 Z" transform="rotate(72 50 50)" />
          <path fill="#E040FB" d="M50,0 C70,0 80,30 50,50 C20,30 30,0 50,0 Z" transform="rotate(144 50 50)" />
          <path fill="#E040FB" d="M50,0 C70,0 80,30 50,50 C20,30 30,0 50,0 Z" transform="rotate(216 50 50)" />
          <path fill="#E040FB" d="M50,0 C70,0 80,30 50,50 C20,30 30,0 50,0 Z" transform="rotate(288 50 50)" />
        </svg>
      </div>
      <div style={{ position: 'absolute', width: '100%', height: '100%', animation: 'fly-in-right 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '10%', left: '35%', width: '35vh', height: '35vh', animation: 'spin-in-place-slow 25s linear infinite' }}>
          <path fill="#FFEB3B" d="M50,5 C70,-5 95,20 90,45 C105,65 80,95 55,90 C35,105 5,80 10,55 C-5,35 20,5 50,5 Z" />
        </svg>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '65%', left: '30%', width: '30vh', height: '30vh', animation: 'spin-in-place-slow 20s linear infinite reverse' }}>
          <circle cx="50" cy="50" r="45" fill="#FF4081" />
          <circle cx="30" cy="50" r="10" fill="#FFF" />
          <circle cx="70" cy="50" r="10" fill="#FFF" />
          <circle cx="50" cy="30" r="10" fill="#FFF" />
          <circle cx="50" cy="70" r="10" fill="#FFF" />
        </svg>
      </div>
    </>
  )
];

export default function HomePage() {
  useReveal();
  const [heroImages, setHeroImages] = useState(FALLBACK_HERO_IMAGES);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState(() => {
    const defaultProducts = ALL_PRODUCTS.slice(0, 4).map(p => ({
      ...p,
      tag: p.badge,
      tagCls: p.badgeClass,
      accent: '#C4603A'
    }));
    return defaultProducts;
  });
  const [featuredRecipes, setFeaturedRecipes] = useState(FALLBACK_RECIPES);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const fetchUrl = baseUrl ? `${baseUrl}/dashboard/website/api/get-website-products` : '/dashboard/website/api/get-website-products';
        const res = await fetch(fetchUrl);
        let apiProducts = [];
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && Array.isArray(json.data)) {
            apiProducts = json.data.map(p => ({
              ...p,
              name: p.productName || p.name || 'Unnamed Product',
              desc: p.productDescription || p.desc || '',
              img: (p.images && p.images.length > 0) ? p.images[0] : (p.img || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80'),
              rating: p.rating || 5,
              reviews: p.reviews || Math.floor(Math.random() * 100) + 10,
              updatedAt: p.updatedAt || p.createdAt || 0
            }));
          }
        }

        // Combine API products and local ALL_PRODUCTS (API products take precedence if same id)
        const combinedProducts = [...apiProducts];
        for (const localP of ALL_PRODUCTS) {
          if (!combinedProducts.find(p => p.id === localP.id || p.name === localP.name)) {
            combinedProducts.push(localP);
          }
        }

        const categories = [
          'Prepared Foods',
          'Ready-to-eat savouries',
          'Salts, spices, soups',
          'Indian Sweets & Snacks'
        ];

        const selectedProducts = [];

        for (const cat of categories) {
          const normalize = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          const normalizedCat = normalize(cat);

          const catProducts = combinedProducts.filter(p => {
            const pCat = normalize(p.category);
            return pCat === normalizedCat || pCat.includes(normalizedCat) || normalizedCat.includes(pCat);
          });

          catProducts.sort((a, b) => {
            const dateA = new Date(a.updatedAt || 0).getTime();
            const dateB = new Date(b.updatedAt || 0).getTime();
            return dateB - dateA;
          });

          if (catProducts.length > 0) {
            const p = catProducts[0];
            if (!selectedProducts.find(sp => sp.id === p.id)) {
              selectedProducts.push({
                ...p,
                tag: p.badge,
                tagCls: p.badgeClass,
                accent: '#C4603A'
              });
            }
          }
        }

        // Fill up to 4 items if needed
        if (selectedProducts.length < 4) {
          const remaining = combinedProducts.filter(p => !selectedProducts.find(sp => sp.id === p.id));
          for (let i = 0; selectedProducts.length < 4 && i < remaining.length; i++) {
            const p = remaining[i];
            selectedProducts.push({
              ...p,
              tag: p.badge,
              tagCls: p.badgeClass,
              accent: '#C4603A'
            });
          }
        }

        setFeaturedProducts(selectedProducts.slice(0, 4));

      } catch (error) {
        console.error('Error fetching products:', error);
        const defaultProducts = ALL_PRODUCTS.slice(0, 4).map(p => ({
          ...p,
          tag: p.badge,
          tagCls: p.badgeClass,
          accent: '#C4603A'
        }));
        setFeaturedProducts(defaultProducts);
      }
    };

    const fetchRecipes = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const fetchUrl = baseUrl ? `${baseUrl}/dashboard/website/api/get-website-recipes` : '/dashboard/website/api/get-website-recipes';
        const res = await fetch(fetchUrl);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && Array.isArray(json.data) && json.data.length > 0) {
            // Sort by updatedAt descending
            const sortedRecipes = json.data.sort((a, b) => {
              const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
              const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
              return dateB - dateA;
            });

            const apiRecipes = sortedRecipes.map(r => ({
              id: r.id || Math.random().toString(),
              name: r.recipeName || r.name || 'Unnamed Recipe',
              desc: r.recipeDescription || r.desc || '',
              time: (r.makingTime && r.makingTime.value) ? `${r.makingTime.value} ${r.makingTime.unit || 'min'}` : (r.time || '15 min'),
              color: r.color || '#C4603A',
              img: (r.images && r.images.length > 0) ? r.images[0] : (r.img || null),
              emoji: r.emoji || '🥘'
            }));

            // If less than 4, fill from fallback
            if (apiRecipes.length < 4) {
              const remaining = FALLBACK_RECIPES.filter(r => !apiRecipes.find(ar => ar.name === r.name));
              for (let i = 0; apiRecipes.length < 4 && i < remaining.length; i++) {
                apiRecipes.push(remaining[i]);
              }
            }
            setFeaturedRecipes(apiRecipes.slice(0, 4));
          }
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchProducts();
    fetchRecipes();
  }, []);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''; // If empty, defaults to relative path which is fine for client-side fetch in Next.js
        const fetchUrl = baseUrl ? `${baseUrl}/dashboard/website/api/get-website-gallery` : '/dashboard/website/api/get-website-gallery';

        const res = await fetch(fetchUrl);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && json.data.images && json.data.images.length > 0) {
            setHeroImages(json.data.images);
          } else {
            // Keep default FALLBACK_HERO_IMAGES
            setHeroImages(FALLBACK_HERO_IMAGES);
          }
        } else {
          // Keep default FALLBACK_HERO_IMAGES
          setHeroImages(FALLBACK_HERO_IMAGES);
        }
      } catch (err) {
        console.error('Failed to fetch gallery images:', err);
        // Keep default FALLBACK_HERO_IMAGES on error
        setHeroImages(FALLBACK_HERO_IMAGES);
      }
    };
    fetchGallery();
  }, []);

  // Auto-scroll removed as requested by the user.

  return (
    <>
      <Navbar />
      <main>

        {/* ══ HERO ══════════════════════════════════════ */}
        {/* ══ "SIMPLE AUTO SCROLL" HERO ══════════════════════════════════════ */}
        <section id="hero-section" style={{
          position: 'relative',
          height: 'calc(100vh + 80px)',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: MICHA_SLIDES[currentHeroIndex % MICHA_SLIDES.length].bgColor,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 3px, transparent 3px)',
          backgroundSize: '40px 40px',
          transition: 'background-color 0.5s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '-80px' // Pull up behind navbar
        }}>
          {/* Header Text Behind Image */}
          <h1 className="hero-title-main" style={{
            position: 'absolute',
            top: '26%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }}>
            Taste of Tradition
          </h1>

          {/* Central Bottle Container */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '12vh',
            perspective: '1000px'
          }}>
            {/* Background elements removed for a more open, organic look */}

            {/* Clean Flat Vector Floral Background (Micha Style) - Moved OUTSIDE the 3D spin */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 0,
              pointerEvents: 'none',
              animation: 'particle-breath 10s ease-in-out infinite alternate',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '12vh',
            }}>
              <div key={currentHeroIndex} style={{ position: 'relative', width: '50vh', height: '75vh' }}>
                {MICHA_BACKDROPS[currentHeroIndex % MICHA_BACKDROPS.length]}
              </div>
            </div>

            {/* The single active bottle spinning in place */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                height: '75vh',
                width: '50vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '15vh',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
                transform: `rotateY(${currentHeroIndex * 360}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}>
              <Image
                src={MICHA_SLIDES[currentHeroIndex % MICHA_SLIDES.length].img}
                alt={MICHA_SLIDES[currentHeroIndex % MICHA_SLIDES.length].label}
                fill
                sizes="50vh"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentHeroIndex(prev => (prev - 1 + MICHA_SLIDES.length) % MICHA_SLIDES.length)}
            style={{
              position: 'absolute', left: 'max(2%, calc(50% - 35vh - 32px))', top: '65%', transform: 'translateY(-50%)', zIndex: 10,
              width: '64px', height: '64px', borderRadius: '50%', background: '#FCE300', border: '5px solid #111',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '6px 6px 0 #111', color: '#111', transition: 'transform 0.1s'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <button
            onClick={() => setCurrentHeroIndex(prev => prev + 1)}
            style={{
              position: 'absolute', right: 'max(2%, calc(50% - 35vh - 32px))', top: '65%', transform: 'translateY(-50%)', zIndex: 10,
              width: '64px', height: '64px', borderRadius: '50%', background: '#FCE300', border: '5px solid #111',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '6px 6px 0 #111', color: '#111', transition: 'transform 0.1s'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          {/* View More Button Removed */}

          <style>{`
            @keyframes fly-in-left {
              0% { transform: translateX(-150vw) scale(0.5) rotate(-45deg); opacity: 0; }
              100% { transform: translateX(0) scale(1) rotate(0); opacity: 1; }
            }
            @keyframes fly-in-right {
              0% { transform: translateX(150vw) scale(0.5) rotate(45deg); opacity: 0; }
              100% { transform: translateX(0) scale(1) rotate(0); opacity: 1; }
            }
            @keyframes particle-breath {
              0% { transform: scale(0.95); }
              100% { transform: scale(1.05); }
            }
            @keyframes spin-in-place-slow {
              100% { transform: rotate(360deg); }
            }
            @keyframes spin-in-place {
              0% { transform: scale(0.8) rotate(-360deg); opacity: 0; }
              100% { transform: scale(1) rotate(0deg); opacity: 1; }
            }
          `}</style>
        </section>



        {/* ══ MARQUEE TRUST BAR DELETED ══════════════════════ */}


        {/* ══ PRODUCTS ═══════════════════════════════ */}
        <section id="featured-products" className="section-pad-xl" style={{ background: 'var(--cream)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }} className="reveal">
              <span className="eyebrow" style={{ color: '#C4603A', fontWeight: 900, letterSpacing: '0.2em' }}>IN OUR COLLECTION</span>
              <br />
              <h2 style={{
                fontFamily: '"Arial Black", system-ui, sans-serif',
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: '#111',
                display: 'inline'
              }}>OUR BELOVED </h2>
              <h2 style={{
                fontFamily: '"Arial Black", system-ui, sans-serif',
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: '#D44A6A',
                display: 'inline'
              }}>PICKLES</h2>
              <p style={{
                fontFamily: '"Arial Black", system-ui, sans-serif',
                fontSize: '1.1rem',
                fontWeight: 900,
                color: '#444',
                marginTop: '1.5rem',
                maxWidth: '600px',
                margin: '1.5rem auto 0'
              }}>
                Every jar tells a story of love and tradition — transforming simple meals into celebrations.
              </p>
            </div>

            <div className="featured-products-grid">
              {featuredProducts.map((p, i) => (
                <div
                  key={p.id}
                  id={`product-${p.id}`}
                  className="product-card-reveal"
                  style={{
                    background: '#EBAA03', // Solid golden yellow
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '0 2rem 2.5rem 2rem',
                    marginTop: '90px', // Space for floating circle
                    transition: 'transform 0.3s ease',
                    animationDelay: `${i * 0.08}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Circular Floating Image */}
                  <div
                    className="product-card-img"
                    style={{
                      borderRadius: '50%',
                      border: '3px solid #111',
                      boxShadow: '10px 10px 15px rgba(0,0,0,0.5)',
                      overflow: 'hidden',
                      position: 'relative',
                      backgroundColor: '#fff',
                      flexShrink: 0,
                      marginBottom: '2rem'
                    }}
                  >
                    {p.img
                      ? <Image src={p.img} alt={p.name} fill sizes="180px" style={{ objectFit: 'cover' }} />
                      : <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5.5rem', background: `linear-gradient(135deg, ${p.accent}20, ${p.accent}40)` }}>{p.emoji}</div>
                    }
                  </div>

                  {/* Title */}
                  <h3
                    className="product-card-title"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontWeight: 900,
                      color: '#111',
                      textAlign: 'center',
                      lineHeight: 1.15,
                      marginBottom: '1.25rem',
                      minHeight: '3.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {p.name}
                  </h3>

                  {/* Stats Pill */}
                  <div className="product-card-pill">
                    <span className="product-card-pill-text">
                      {p.tag || 'AUTHENTIC'} | ★ {p.rating || 5} STARS
                    </span>
                  </div>

                  {/* Description */}
                  <p className="product-card-desc">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }} className="reveal">
              <Link href="/products" className="btn btn-outline-green">View All Pickles <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>


        {/* ══ ADVANCED INGREDIENTS ═══════════════════════════ */}
        <section id="ingredients" className="section-pad-xl" style={{
          background: 'linear-gradient(135deg, var(--cream) 0%, #f4e9d8 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative background elements */}
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'var(--turmeric)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.08 }} />
          <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '300px', height: '300px', background: 'var(--forest-green)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.06 }} />

          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: '5.5rem' }} className="reveal">
              <h2 style={{
                fontFamily: '"Arial Black", system-ui, sans-serif',
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                fontWeight: 900,
                color: '#134027', // Deep dark green from reference
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                margin: 0
              }}>
                What Goes Inside Every Jar
              </h2>
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0',
              marginBottom: '5rem',
              padding: '2rem 0'
            }}>
              {ingredients.map((ing, i) => {
                const rotations = [-8, 4, -6, 5, -4, 6];
                const marginLefts = ['0', '-40px', '-40px', '0', '-40px', '-40px'];
                const marginTop = i > 2 ? '3rem' : '0'; // Add space for the second row

                return (
                  <div key={ing.name} className="reveal" style={{
                    animationDelay: `${i * 0.1}s`,
                    background: '#ffffff',
                    padding: '18px 18px 60px 18px', // Thick bottom border for polaroid
                    boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                    transform: `rotate(${rotations[i]}deg)`,
                    marginLeft: marginLefts[i],
                    marginTop: marginTop,
                    zIndex: i,
                    position: 'relative',
                    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), z-index 0s',
                    width: '320px',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = `rotate(0deg) scale(1.08) translateY(-15px)`;
                      e.currentTarget.style.zIndex = 20;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = `rotate(${rotations[i]}deg)`;
                      e.currentTarget.style.zIndex = i;
                    }}
                  >
                    {/* The "Photo" area with thin green border */}
                    <div style={{
                      border: '2px solid #1c402c', // Dark green border from reference
                      background: ing.bg,
                      height: '350px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0',
                      textAlign: 'center',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <div style={{ position: 'absolute', inset: 0 }}>
                        <Image src={ing.img} alt={ing.name} fill sizes="320px" style={{ objectFit: 'cover' }} />
                      </div>

                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.5rem 1.5rem 1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
                        <h4 style={{
                          fontFamily: 'Playfair Display, serif',
                          fontSize: '1.4rem',
                          fontWeight: 900,
                          color: '#ffffff',
                          lineHeight: 1.1,
                          marginBottom: '0.4rem',
                          textShadow: '0 2px 5px rgba(0,0,0,0.8)'
                        }}>{ing.name}</h4>

                        <p style={{
                          fontFamily: 'Lato, sans-serif',
                          fontSize: '0.8rem',
                          fontWeight: 900,
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: 'var(--turmeric)',
                          textShadow: '0 2px 5px rgba(0,0,0,0.8)'
                        }}>{ing.source}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Minimalist Typography Block (Replacing Advanced Quote Block) */}
            <div className="reveal" style={{ textAlign: 'center', padding: '6rem 0 4rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: 'clamp(3rem, 7vw, 7rem)',
                fontWeight: 900,
                color: '#305A32', /* Dark Forest Green */
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                margin: 0
              }}>
                No artificial colors.
              </h2>
              <h3 style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: 'clamp(1.5rem, 3vw, 2.8rem)',
                fontWeight: 700,
                color: '#86B372', /* Light Muted Green */
                marginTop: '0.8rem',
                letterSpacing: '-0.02em',
                margin: '0.5rem 0 0 0'
              }}>
                No preservatives. No shortcuts. Ever.
              </h3>
            </div>
          </div>
        </section>

        {/* ══ STICKY SCROLL - HIGHLIGHT OF THE MONTH ════════════════════════════════ */}
        <section id="process-section" style={{ position: 'relative', height: '550vh', backgroundColor: '#CC0044' }}>

          {/* Sticky Center Text */}
          <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>

            <span style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: '1rem',
              fontWeight: 800,
              letterSpacing: '0.3em',
              color: '#FCE300',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              textShadow: '2px 2px 0 rgba(0,0,0,0.2)'
            }}>
              Highlight of the Month
            </span>

            <h2 style={{
              fontFamily: 'var(--font-playfair), serif',
              fontWeight: 900,
              fontSize: 'clamp(4rem, 12vw, 12rem)',
              color: '#FFF',
              textAlign: 'center',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              textShadow: '8px 8px 0 rgba(0,0,0,0.15)',
              margin: 0
            }}>
              The Classic<br />Mango<br />Avakaya.
            </h2>
          </div>

          {/* Floating Yellow Cards Container */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }}>

            <style>{`
              .seasonal-card {
                background: #FCE300;
                border: 4px solid #111;
                padding: 1.5rem 2.5rem;
                width: 380px;
                max-width: 90vw;
                color: #111;
                font-weight: 800;
                font-size: 1.4rem;
                font-family: 'Inter', system-ui, sans-serif;
                position: absolute;
                box-shadow: 12px 12px 0 rgba(0,0,0,1);
                pointer-events: auto;
                line-height: 1.35;
                transition: transform 0.3s ease;
              }
              .seasonal-card:hover {
                transform: translateY(-5px);
              }
              .seasonal-card-circle {
                position: absolute;
                bottom: -35px;
                left: -35px;
                width: 90px;
                height: 90px;
                border-radius: 50%;
                border: 4px solid #111;
                background: #FFF;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                box-shadow: 6px 6px 0 rgba(0,0,0,1);
                transform: rotate(-10deg);
                pointer-events: none;
              }
            `}</style>

            {/* Card 1 */}
            <div className="seasonal-card" style={{ top: '120vh', left: '10%' }}>
              This Month's Star! The absolute crowd favorite.
              <div className="seasonal-card-circle" style={{ overflow: 'hidden' }}>
                <Image src="/images/cards/star.png" alt="Star" width={90} height={90} style={{ objectFit: 'cover' }} />
              </div>
            </div>

            {/* Card 2 */}
            <div className="seasonal-card" style={{ top: '180vh', right: '10%' }}>
              Made with the first catch of crunchy summer mangoes.
              <div className="seasonal-card-circle" style={{ overflow: 'hidden' }}>
                <Image src="/images/cards/mango.png" alt="Mango" width={90} height={90} style={{ objectFit: 'cover' }} />
              </div>
            </div>

            {/* Card 3 */}
            <div className="seasonal-card" style={{ top: '240vh', left: '15%' }}>
              Blended with pure, fiery Guntur chillies for authentic kick.
              <div className="seasonal-card-circle" style={{ overflow: 'hidden' }}>
                <Image src="/images/cards/chili.png" alt="Chili" width={90} height={90} style={{ objectFit: 'cover' }} />
              </div>
            </div>

            {/* Card 4 */}
            <div className="seasonal-card" style={{ top: '300vh', right: '15%' }}>
              A timeless explosion of Grandma's traditional spice!
              <div className="seasonal-card-circle" style={{ overflow: 'hidden' }}>
                <Image src="/images/cards/jar.png" alt="Jar" width={90} height={90} style={{ objectFit: 'cover' }} />
              </div>
            </div>

            {/* Card 5 */}
            <div className="seasonal-card" style={{ top: '360vh', left: '12%' }}>
              Marinated in rich, cold-pressed groundnut oil.
              <div className="seasonal-card-circle" style={{ overflow: 'hidden' }}>
                <Image src="/images/cards/oil.png" alt="Oil" width={90} height={90} style={{ objectFit: 'cover' }} />
              </div>
            </div>

            {/* Card 6 */}
            <div className="seasonal-card" style={{ top: '420vh', right: '12%' }}>
              The absolute perfect companion for hot rice and melted ghee!
              <div className="seasonal-card-circle" style={{ overflow: 'hidden' }}>
                <Image src="/images/cards/rice.png" alt="Rice" width={90} height={90} style={{ objectFit: 'cover' }} />
              </div>
            </div>

          </div>
        </section>

        {/* ══ TESTIMONIALS ═══════════════════════════ */}
        <section id="testimonials" className="section-pad-xl" style={{ background: '#f8f0e2' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '5.5rem' }} className="reveal">
              <h2 style={{
                fontFamily: '"Arial Black", system-ui, sans-serif',
                fontSize: 'clamp(3rem, 6vw, 5rem)', // Slightly smaller max size since the text is longer
                fontWeight: 900,
                color: '#134027', // Deep dark green
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                margin: 0
              }}>
                What Our Pickle Lovers Say
              </h2>
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1.5rem'
            }}>
              {testimonials.map((t, i) => {
                const colors = ['#f5b89c', '#a5da71', '#ffc745']; // Peach, Green, Yellow
                const darkColors = ['#eb7952', '#86c646', '#f3aa00']; // Darker shade for the bottom box
                const textColors = ['#ffffff', '#1c402c', '#1c402c']; // White text for peach box, dark for others
                const products = [
                  { name: 'TRADITIONAL MANGO AVAKAYA', img: '/images/ing_mango.png' },
                  { name: 'ANDHRA GONGURA PICKLE', img: '/images/ing_leaves.png' },
                  { name: 'TANGY LEMON PICKLE', img: '/images/ing_salt.png' },
                ];

                return (
                  <div key={t.author} className="reveal" style={{
                    animationDelay: `${i * 0.12}s`,
                    width: '320px',
                    minHeight: '380px',
                    background: colors[i % colors.length],
                    border: '1px solid #1c402c', // Thin dark green/black border
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                  }}>
                    {/* Top Quote Section */}
                    <div style={{ padding: '2rem 1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <p style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '1.5rem',
                        lineHeight: 1.3,
                        color: '#1c402c',
                        textAlign: 'center',
                        marginBottom: '1.5rem'
                      }}>"{t.text}"</p>

                      <div style={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        fontWeight: 400,
                        fontSize: '0.9rem',
                        color: '#1c402c',
                      }}>
                        {t.author}
                      </div>
                    </div>

                    {/* Bottom Product Box */}
                    <div style={{
                      display: 'flex',
                      background: darkColors[i % darkColors.length],
                      border: '1px solid #1c402c',
                      borderRadius: '8px',
                      height: '80px',
                      margin: '0 12px 12px 12px', // Floating inside the card
                      overflow: 'hidden'
                    }}>
                      {/* Product Image */}
                      <div style={{
                        width: '70px',
                        borderRight: '1px solid #1c402c',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255,255,255,0.1)'
                      }}>
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                          <Image src={products[i].img} alt={products[i].name} fill sizes="60px" style={{ objectFit: 'cover', borderRadius: '4px' }} />
                        </div>
                      </div>

                      {/* Product Info & Button */}
                      <div style={{
                        flex: 1,
                        padding: '0 12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px'
                      }}>
                        <div style={{
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          color: textColors[i % textColors.length],
                          lineHeight: 1.2,
                          letterSpacing: '0.02em',
                          maxWidth: '90px' // Force wrapping to look like reference
                        }}>
                          {products[i].name}
                        </div>

                        <button style={{
                          background: '#ffffff',
                          border: '1px solid #1c402c',
                          borderRadius: '24px',
                          padding: '0.4rem 0.9rem',
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          fontSize: '0.85rem',
                          fontWeight: 400,
                          color: '#1c402c',
                          cursor: 'pointer'
                        }}>
                          Shop
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* ══ RECIPES (MARQUEE EXACT CLONE) ════════════════════════ */}
        <section id="recipes" style={{
          backgroundColor: '#FFF4ED',
          backgroundImage: 'radial-gradient(circle, #D2446A 1.5px, transparent 1.5px)',
          backgroundSize: '40px 40px',
          overflow: 'hidden',
          padding: '6rem 0'
        }}>
          <div className="container" style={{ marginBottom: '4.5rem', textAlign: 'center' }}>
            <span style={{ fontFamily: '"Arial Black", system-ui, sans-serif', fontWeight: 900, fontSize: '1rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#B72740' }}>In The Kitchen</span>
            <h2 style={{ fontFamily: '"Arial Black", system-ui, sans-serif', fontWeight: 900, fontSize: '3.5rem', color: '#111111', margin: '0.5rem 0', textTransform: 'uppercase', lineHeight: 1.1 }}>Cook With Our <span style={{ color: '#D2446A' }}>Pickles</span></h2>
            <p style={{ fontFamily: '"Arial Black", system-ui, sans-serif', fontWeight: 900, fontSize: '1.1rem', color: '#555555', maxWidth: '650px', margin: '0 auto', lineHeight: 1.4 }}>
              Grandmother's pickles aren't just condiments — they're the hero ingredient that transforms simple meals into celebrations.
            </p>
          </div>

          <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'recipe-marquee 40s linear infinite', width: 'fit-content' }}>
            {/* Map array multiple times for a seamless infinite loop */}
            {[...featuredRecipes, ...featuredRecipes, ...featuredRecipes].map((r, i) => {
              const colors = ['#B72740', '#7BC644', '#D2446A', '#B7DF4C', '#B72740', '#7BC644'];
              const textColors = ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#111111', '#FFFFFF', '#FFFFFF'];

              // Map specific recipe IDs to their unique pop-art graphic
              const graphicsMap = {
                'allam-velluli-pickle-recipe': '/images/flat_garlic.png',
                'crispy-allu-chips': '/images/flat_potato.png',
                'daniya-powder-rasam': '/images/flat_coriander.png',
                'millets-kheer': '/images/flat_laddu.png'
              };
              const graphicSrc = graphicsMap[r.id] || '/images/flat_mango.png';

              return (
                <div key={`recipe-mq-${r.id}-${i}`} style={{ position: 'relative', width: '360px', height: '580px', flexShrink: 0, marginRight: '40px' }}>

                  {/* The Recipe Card (Staggered Vertically, Reduced Size) */}
                  <Link href="/recipes" style={{ textDecoration: 'none' }}>
                    <div style={{
                      position: 'absolute',
                      top: i % 2 === 0 ? '0px' : '80px',
                      left: '20px',
                      width: '280px',
                      height: '280px',
                      background: colors[i % colors.length],
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '2rem',
                      zIndex: 2
                    }}>
                      <p style={{
                        fontFamily: '"Arial Black", system-ui, sans-serif',
                        fontSize: '1.15rem',
                        lineHeight: 1.35,
                        color: textColors[i % textColors.length],
                        textAlign: 'center',
                        marginBottom: '1.5rem',
                        whiteSpace: 'normal',
                        fontWeight: 900
                      }}>"{r.desc}"</p>

                      <div style={{
                        fontFamily: '"Arial Black", system-ui, sans-serif',
                        fontWeight: 900,
                        fontSize: '0.8rem',
                        color: textColors[i % textColors.length],
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        whiteSpace: 'normal'
                      }}>
                        {r.name}
                      </div>
                    </div>
                  </Link>

                  {/* The Graphic Element (Floating completely below with a clear gap) */}
                  <div style={{
                    position: 'absolute',
                    width: '200px',
                    height: '200px',
                    top: i % 2 === 0 ? '300px' : '380px',
                    left: i % 2 === 0 ? '100px' : '40px',
                    zIndex: 1
                  }}>
                    <img src={graphicSrc} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt={`${r.name} Graphic`} />
                  </div>

                </div>
              );
            })}
          </div>
          <style>{`
            @keyframes recipe-marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-33.3333%); }
            }
          `}</style>
        </section>


        {/* ══ ORANGE SPLIT CTA BANNER (Like Reference) ════════════════════════ */}
        <section style={{ backgroundColor: '#EEA236', position: 'relative', overflow: 'hidden' }}>
          <div className="container" style={{ maxWidth: '1400px', padding: '0 2rem' }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', minHeight: '300px' }}>

              {/* Left Side: Text Content */}
              <div style={{ padding: '2.5rem 4rem 2.5rem 0', color: '#111111' }}>
                <h2 style={{
                  fontFamily: '"Oswald", "Arial Black", sans-serif',
                  fontSize: '3.6rem',
                  fontWeight: 900,
                  lineHeight: 0.95,
                  textTransform: 'uppercase',
                  marginBottom: '0.8rem',
                  letterSpacing: '-0.02em'
                }}>
                  BIG CRAVING?<br />WE'VE GOT YOU.
                </h2>
                <h3 style={{
                  fontFamily: '"Oswald", "Arial Black", sans-serif',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  marginBottom: '1rem',
                  textTransform: 'none',
                  letterSpacing: '-0.01em'
                }}>
                  Authentic Indian Pickles for Families & Foodies
                </h3>
                <p style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  marginBottom: '1.5rem',
                  maxWidth: '500px'
                }}>
                  Order authentic flavors straight from the grandmother's kitchen that knows how to spice it up. Adhvaitha Foods style.
                </p>
                <p style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginBottom: '1.2rem'
                }}>
                  * Free delivery on orders above ₹499
                </p>

                <Link href="/products" style={{
                  display: 'inline-block',
                  backgroundColor: '#C82030',
                  color: '#FFFFFF',
                  fontFamily: '"Oswald", "Arial Black", sans-serif',
                  fontSize: '1rem',
                  fontWeight: 700,
                  padding: '0.8rem 1.6rem',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Order Your Jar Today
                </Link>
              </div>

              {/* Right Side: Flatlay Ingredients Image */}
              <div style={{
                position: 'relative',
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src="/images/cta_ingredients_white.png"
                  alt="Ingredients Flatlay"
                  style={{
                    width: '140%',
                    height: 'auto',
                    maxHeight: '120%',
                    objectFit: 'cover',
                    mixBlendMode: 'multiply',
                    marginRight: '-20%',
                    pointerEvents: 'none'
                  }}
                />
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .hero-grid       { grid-template-columns: 1fr !important; }
          .split-grid      { grid-template-columns: 1fr !important; }
          .recipes-header  { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .heritage-img-wrapper { transform: none !important; margin-bottom: -2rem; padding-bottom: 75% !important; }
          .heritage-text-card { transform: none !important; margin: 0 1rem; }
          .process-flow-row { flexDirection: column !important; gap: 4rem !important; }
        }

      `}</style>
    </>
  );
}
