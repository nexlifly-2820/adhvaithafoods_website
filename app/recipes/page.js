'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// One recipe per product category
const FALLBACK_RECIPES = [
  {
    id: 'allam-velluli-pickle-recipe',
    name: 'Allam Velluli Pickle Rice',
    category: 'Prepared Foods',
    time: '10 min',
    level: 'Easy',
    serves: 2,
    img: '/images/products/Allam_Velluli_Pickle_(ginger_garlic_pickle).jpeg',
    color: '#4CAF50',
    pickle: 'Allam Velluli Pickle',
    desc: 'Hot rice tossed with our traditional Allam Velluli Pickle, sesame seeds, and a drizzle of ghee. The simplest and most satisfying Andhra meal — ready in minutes.',
    ingredients: [
      '2 cups cooked rice (hot)',
      '3 tbsp Avdaitha Allam Velluli Pickle',
      '2 tbsp sesame seeds (roasted)',
      '1 tbsp ghee',
      'Fresh curry leaves',
    ],
    method:
      'Mix hot rice with pickle and ghee while the rice is still steaming. Top with roasted sesame and curry leaves. Serve immediately with a side of papad.',
  },
  {
    id: 'crispy-allu-chips',
    name: 'Crispy Allu Chips',
    category: 'Ready-to-eat Savouries',
    time: '20 min',
    level: 'Medium',
    serves: 4,
    img: '/images/products/Allu_Chips_(thinly_sliced_Indian_potato_chips).jpeg',
    color: '#FF3B30',
    pickle: 'Allu Chips',
    desc: 'Make perfectly crispy, golden potato chips at home with this simple traditional method. Perfectly seasoned for a delightful crunch.',
    ingredients: [
      '4 large starchy potatoes',
      'Neutral cooking oil for deep frying',
      '1 tsp salt',
      '½ tsp red chili powder or black pepper',
      'Cold water for soaking',
    ],
    method:
      'Peel and slice potatoes thinly. Soak in cold water for 10 minutes to remove starch. Pat completely dry with a towel. Deep fry in batches in hot oil over medium heat until golden and crispy. Drain excess oil and immediately toss with salt and spices while hot.',
  },
  {
    id: 'daniya-powder-rasam',
    name: 'Daniya Powder Rasam',
    category: 'Salts, spices, soups',
    time: '20 min',
    level: 'Easy',
    serves: 4,
    img: '/images/products/daniya-powder.jpg',
    color: '#007AFF',
    pickle: 'Daniya Powder',
    desc: 'A comforting, deeply aromatic rasam made using freshly ground Daniya Powder. The perfect soothing soup for any day, paired beautifully with hot rice.',
    ingredients: [
      '1 lemon-sized tamarind (soaked and extracted)',
      '1 chopped tomato',
      '2 tbsp Avdaitha Daniya Powder',
      '1 tsp mustard seeds, 1 tsp cumin seeds',
      'Curry leaves, coriander, and ghee for tempering',
    ],
    method:
      'Boil tamarind extract with tomato, turmeric, and salt until raw smell leaves. Add water to adjust consistency, then stir in Daniya Powder and simmer for 5 minutes. Temper mustard seeds, cumin, and curry leaves in ghee and pour over the rasam. Garnish with coriander.',
  },
  {
    id: 'millets-kheer',
    name: 'Millets Laddu Kheer',
    category: 'Indian Sweets & Snacks',
    time: '15 min',
    level: 'Easy',
    serves: 4,
    img: '/images/products/millets-laddu.jpg',
    color: '#FF9500',
    pickle: 'Millets Laddu',
    desc: 'A comforting, creamy kheer made by crumbling Millets Laddu into warm milk. A creative, no-sugar-needed dessert ready in 15 minutes — wholesome and deeply satisfying.',
    ingredients: [
      '2 Avdaitha Millets Laddu',
      '2 cups full-fat milk (warm)',
      'A pinch of cardamom powder',
      'Chopped pistachios & almonds to garnish',
      'A few strands of saffron (optional)',
    ],
    method:
      'Crumble the Millets Laddu into warm milk and stir until dissolved. Add cardamom and saffron. Simmer on low heat for 5 minutes, stirring gently. Pour into bowls and garnish with chopped dry fruits. Serve warm or chilled.',
  },
  {
    id: 'gongura-chicken',
    name: 'Gongura Pickle Roast',
    category: 'Prepared Foods',
    time: '25 min',
    level: 'Medium',
    serves: 4,
    img: '/images/products/mango-pickle.jpg',
    color: '#8E1600',
    pickle: 'Gongura Pickle',
    desc: 'Use our tangy, spicy Pickle as an instant marinade for roasted chicken or paneer. The sour kick caramelizes beautifully.',
    ingredients: ['500g Chicken or Paneer', '3 tbsp Avdaitha Pickle', '1 tbsp yogurt', '1 tbsp oil'],
    method: 'Mix the pickle and yogurt. Coat the protein and let sit for 15 minutes. Pan roast or bake until cooked through and slightly charred.'
  },
  {
    id: 'karampodi-idli',
    name: 'Karampodi Ghee Idli',
    category: 'Spices',
    time: '5 min',
    level: 'Easy',
    serves: 2,
    img: '/images/products/special-idli-karam.jpg',
    color: '#D84315',
    pickle: 'Karampodi',
    desc: 'Transform leftover idlis into a crispy, spicy snack by pan-frying them in ghee and tossing them aggressively in our signature Karampodi.',
    ingredients: ['4 leftover idlis (cubed)', '2 tbsp ghee', '2 tbsp Avdaitha Karampodi'],
    method: 'Heat ghee in a pan. Toss the idli cubes until golden and crisp. Turn off heat, add Karampodi and toss to coat evenly. Serve hot.'
  },
  {
    id: 'mango-pickle-rice',
    name: 'Mango Pickle Fried Rice',
    category: 'Prepared Foods',
    time: '10 min',
    level: 'Easy',
    serves: 2,
    img: '/images/products/bellam-avakaya.jpg',
    color: '#F9A825',
    pickle: 'Mango Pickle',
    desc: 'A fusion delight! Toss cold leftover rice in a wok with our fiery Andhra Avakaya (Mango Pickle) for an instant, intensely flavorful fried rice.',
    ingredients: ['2 cups cold cooked rice', '2 tbsp Avdaitha Mango Pickle', '1 tbsp oil', 'Chopped coriander'],
    method: 'Heat oil in a wok. Add the rice and stir-fry for 2 minutes. Stir in the mango pickle and toss until the rice takes on a beautiful red-orange hue. Garnish with coriander.'
  },
  {
    id: 'sambar-powder-veg',
    name: 'Instant Veg Stir-fry',
    category: 'Spices',
    time: '15 min',
    level: 'Easy',
    serves: 4,
    img: '/images/products/sambhar-masala.jpg',
    color: '#E65100',
    pickle: 'Sambar Powder',
    desc: 'Who says Sambar powder is only for Sambar? Use it as a dry rub for stir-frying fresh vegetables to give them a deep, roasted lentil and spice flavor.',
    ingredients: ['Mixed chopped vegetables', '2 tbsp Avdaitha Sambar Powder', '1 tbsp oil', 'Mustard seeds'],
    method: 'Temper mustard seeds in oil. Add vegetables and sauté until tender. Add the Sambar powder and salt, toss well, and cook for 2 more minutes.'
  },
  {
    id: 'bundhi-chaat',
    name: 'Bundhi Yogurt Chaat',
    category: 'Ready-to-eat Savouries',
    time: '5 min',
    level: 'Easy',
    serves: 2,
    img: '/images/products/bundhi.jpg',
    color: '#F0CD4C',
    pickle: 'Bundhi',
    desc: 'An instant, cooling evening snack! Mix crispy bundhi into spiced yogurt for a refreshing and crunchy bite.',
    ingredients: ['1 cup Avdaitha Bundhi', '1 cup whisked yogurt', 'Pinch of roasted cumin powder', 'Fresh coriander'],
    method: 'Whisk yogurt with salt and cumin. Right before serving, fold in the crispy bundhi so it retains its crunch. Garnish with coriander.'
  },
  {
    id: 'sweet-jamun-rabdi',
    name: 'Kova Jamun Rabdi',
    category: 'Indian Sweets',
    time: '10 min',
    level: 'Easy',
    serves: 4,
    img: '/images/products/kova-gulam-jamun.jpg',
    color: '#D4A733',
    pickle: 'Kova Gulam Jamun',
    desc: 'Elevate our Kova Gulam Jamun by serving it submerged in thickened, saffron-infused milk (Rabdi) for a royal dessert experience.',
    ingredients: ['4 Avdaitha Kova Gulam Jamuns', '2 cups Rabdi (thickened milk)', 'Pistachio slivers'],
    method: 'Warm the Gulam Jamuns slightly. Pour hot or chilled Rabdi over them in a serving bowl. Garnish with pistachio slivers.'
  },
  {
    id: 'janthukalu-bhel',
    name: 'Janthukalu Bhel Puri',
    category: 'Ready-to-eat Savouries',
    time: '10 min',
    level: 'Easy',
    serves: 2,
    img: '/images/products/karam-janthukalu.jpg',
    color: '#FF1E1E',
    pickle: 'Karam Janthukalu',
    desc: 'A spicy, crunchy street-style bhel made by crushing our Karam Janthukalu with onions, tomatoes, and tamarind chutney.',
    ingredients: ['2 cups crushed Avdaitha Karam Janthukalu', '1 chopped onion', '1 chopped tomato', '2 tbsp tamarind chutney'],
    method: 'In a large bowl, toss the crushed Janthukalu with onions and tomatoes. Drizzle tamarind chutney over the top and serve immediately.'
  },
  {
    id: 'usiri-dal',
    name: 'Usiri Amla Dal',
    category: 'Prepared Foods',
    time: '20 min',
    level: 'Easy',
    serves: 4,
    img: '/images/products/usiri-pickle.jpg',
    color: '#4CAF50',
    pickle: 'Usiri Pickle',
    desc: 'Stir our tangy Usiri (Amla) Pickle into simple yellow dal for an instant burst of vitamin C, tartness, and deep spiced flavor.',
    ingredients: ['1 cup cooked Toor Dal', '2 tbsp Avdaitha Usiri Pickle', '1 tsp ghee', 'Curry leaves'],
    method: 'Heat the cooked dal. Stir in the Usiri pickle until well combined. Temper mustard and curry leaves in ghee and pour over the dal.'
  }
];

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    async function fetchPageData() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/dashboard/website/api/get-recipes-page_web`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setPageData(json.data);
          }
        }
      } catch (error) {
        console.error('Error fetching recipes page data:', error);
      }
    }
    fetchPageData();
  }, []);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/dashboard/website/api/get-website-recipes`);
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          const mappedRecipes = json.data.map((r, index) => {
            const colors = ['#4CAF50', '#FF3B30', '#007AFF', '#FF9500'];
            return {
              ...r,
              name: r.recipeName || r.name || 'Unnamed Recipe',
              desc: r.recipeDescription || r.desc || '',
              img: (r.images && r.images.length > 0) ? r.images[0] : (r.img || '/images/placeholder.jpg'),
              time: (r.makingTime && r.makingTime.value) ? `${r.makingTime.value} ${r.makingTime.unit || 'min'}` : (r.time || '15 min'),
              level: r.difficulty || r.level || 'Easy',
              serves: r.serves || 4,
              color: colors[index % colors.length],
              pickle: r.pickle || 'Avdaitha Foods',
              ingredients: r.ingredients || [],
              method: r.makingProcess || r.method || ''
            };
          });
          // Merge API recipes with fallback recipes to guarantee a beautiful populated UI
          const merged = [...mappedRecipes, ...FALLBACK_RECIPES];
          const uniqueRecipes = merged.filter((recipe, index, self) => 
            index === self.findIndex((r) => r.id === recipe.id)
          );
          setRecipes(uniqueRecipes);
        } else {
          setRecipes(FALLBACK_RECIPES);
        }
      } catch (error) {
        console.error('Error fetching recipes, falling back to local data:', error);
        setRecipes(FALLBACK_RECIPES);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const path = document.getElementById('journey-path');
      if (path) {
        // Multiplier controls how fast the dashes move relative to scroll speed
        path.style.strokeDashoffset = -window.scrollY * 0.15;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: '#F0CD4C', overflowX: 'hidden' }}>
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Modak&family=Mouse+Memoirs&family=Inter:wght@400;700&display=swap');
        
        .font-modak { font-family: 'Modak', cursive; }
        .font-mouse { font-family: 'Mouse Memoirs', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>

      <main style={{ minHeight: '100vh', paddingBottom: '0' }}>

        {/* CravBurgers Style Cinematic Hero */}
        <section id="recipes-hero" style={{
          position: 'relative', overflow: 'hidden',
          minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '12rem 2rem 8rem',
          background: 'url(https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2000&auto=format&fit=crop) center/cover no-repeat fixed'
        }}>
          {/* Dark Overlay */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.25)' }} />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translateY(-2rem)' }}>
            <h2 className="font-modak" style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              color: '#F0CD4C',
              WebkitTextStroke: '2px #FFF',
              textTransform: 'uppercase',
              marginBottom: '-2rem',
              transform: 'rotate(-3deg)',
              zIndex: 2
            }}>
              {pageData?.hero?.eyebrow || "WHAT'S INSIDE"}
            </h2>
            <h1 className="font-mouse" style={{
              fontSize: 'clamp(6rem, 15vw, 14rem)',
              color: '#FF1E1E',
              WebkitTextStroke: '4px #FFF',
              textTransform: 'uppercase',
              lineHeight: 0.8,
              filter: 'drop-shadow(0px 15px 10px rgba(0,0,0,0.4))',
              whiteSpace: 'pre-line'
            }}>
              {pageData?.hero?.title || "SIMPLE THINGS\nDONE RIGHT"}
            </h1>
          </div>

          {/* Wavy bottom border transition to Mustard Yellow */}
          <svg viewBox="0 0 1440 120" style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: 'auto', zIndex: 2 }}>
            <path fill="#F0CD4C" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </section>

        {/* CravBurgers Style Staggered Ingredients Layout */}
        <section style={{ backgroundColor: '#F0CD4C', padding: '6rem 2rem 12rem', position: 'relative' }}>

          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', marginBottom: '8rem' }}>
            <h2 className="font-mouse" style={{
              fontSize: 'clamp(5rem, 12vw, 12rem)',
              color: '#FFF',
              lineHeight: 0.8,
              textTransform: 'uppercase',
              filter: 'drop-shadow(4px 4px 0px rgba(200,160,40,0.5))',
              whiteSpace: 'pre-line'
            }}>
              {pageData?.middleSection?.title || "A STORY IN\nEVERY BITE."}
            </h2>
            <p className="font-mouse" style={{
              fontSize: '2.5rem',
              color: '#111',
              marginTop: '2rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {pageData?.middleSection?.subtitle || "FROM FRESH FARMS TO YOUR HANDS EVERY LAYER MATTERS."}
            </p>
          </div>

          <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>

            <div style={{ position: 'absolute', top: '200px', bottom: '200px', left: 0, right: 0, zIndex: 0 }}>
              <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" style={{ display: 'block', overflow: 'visible' }}>
                <path
                  id="journey-path"
                  d={recipes.slice(0, visibleCount).reduce((path, _, i, arr) => {
                    const x = i % 2 === 0 ? 22 : 78;
                    const maxIdx = Math.max(1, arr.length - 1);
                    const y = (i / maxIdx) * 100;
                    if (i === 0) return `M ${x} ${y}`;
                    const prevX = (i - 1) % 2 === 0 ? 22 : 78;
                    const prevY = ((i - 1) / maxIdx) * 100;
                    // Proportional S-Curve down the page
                    const step = (y - prevY) / 2;
                    return `${path} C ${prevX} ${prevY + step}, ${x} ${y - step}, ${x} ${y}`;
                  }, '')}
                  fill="none" stroke="#D4A733" strokeWidth="4" strokeDasharray="12, 12"
                  vectorEffect="non-scaling-stroke"
                  style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                />
              </svg>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem', position: 'relative', zIndex: 1 }}>
              {isLoading ? (
                <div className="font-mouse" style={{ textAlign: 'center', fontSize: '3rem', color: '#111' }}>Loading...</div>
              ) : recipes.slice(0, visibleCount).map((recipe, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={recipe.id} style={{
                    display: 'flex',
                    justifyContent: isEven ? 'flex-start' : 'flex-end',
                    width: '100%'
                  }}>
                    <div style={{
                      width: '45%', position: 'relative'
                    }}>

                      {/* Bubbly Floating Label */}
                      <div className="font-modak" style={{
                        position: 'absolute', top: '-1.5rem', [isEven ? 'right' : 'left']: '-2rem', zIndex: 10,
                        fontSize: '3rem', color: recipe.color, WebkitTextStroke: '1px #FFF',
                        textTransform: 'uppercase', transform: isEven ? 'rotate(5deg)' : 'rotate(-5deg)',
                        filter: 'drop-shadow(2px 4px 0px rgba(0,0,0,0.15))'
                      }}>
                        {recipe.category}
                      </div>

                      {/* Floating Recipe Image Card */}
                      <div style={{
                        borderRadius: '24px', overflow: 'hidden',
                        boxShadow: '0 30px 50px rgba(0,0,0,0.15)',
                        position: 'relative', height: '400px',
                        border: '8px solid #FFF',
                        transform: 'translateY(0)',
                        transition: 'transform 0.4s ease'
                      }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                        <img src={recipe.img} alt={recipe.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>

                      {/* Title & Desc */}
                      <div style={{ marginTop: '1.5rem', padding: '0 1rem' }}>
                        <h3 className="font-mouse" style={{ fontSize: '3.5rem', color: '#111', textTransform: 'uppercase', marginBottom: '0.2rem', lineHeight: 0.9 }}>
                          {recipe.name}
                        </h3>
                        <p className="font-mouse" style={{ fontSize: '1.8rem', color: '#333', textTransform: 'uppercase', lineHeight: 1.1 }}>
                          {recipe.desc}
                        </p>
                      </div>

                      {/* Floating Decorative Emoji Cutout (Moved to inner edge of card) */}
                      <div style={{
                        position: 'absolute', top: '-2rem', [isEven ? 'left' : 'right']: '-2rem',
                        width: '70px', height: '70px', background: '#FFF', borderRadius: '50%',
                        boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem',
                        transform: 'rotate(-10deg)',
                        zIndex: 12, border: '4px solid #F0CD4C'
                      }}>
                        {index % 4 === 0 ? '🌿' : index % 4 === 1 ? '🍅' : index % 4 === 2 ? '🧀' : '🥔'}
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* View More Button */}
              {!isLoading && visibleCount < recipes.length && (
                <div style={{ textAlign: 'center', marginTop: '4rem', position: 'relative', zIndex: 10 }}>
                  <button
                    onClick={() => setVisibleCount(prev => prev + 4)}
                    className="font-mouse"
                    style={{
                      background: '#FFF', color: '#111',
                      fontSize: '2.5rem', textTransform: 'uppercase',
                      padding: '1rem 4rem', borderRadius: '50px', border: '4px solid #111',
                      cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                      transition: 'transform 0.2s ease, background 0.2s ease'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = '#FF1E1E'; e.currentTarget.style.color = '#FFF'; e.currentTarget.style.borderColor = '#FF1E1E'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = '#FFF'; e.currentTarget.style.color = '#111'; e.currentTarget.style.borderColor = '#111'; }}
                  >
                    VIEW MORE RECIPES
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CravBurgers Style Red Footer CTA */}
        <section style={{ background: '#FF1E1E', padding: '8rem 2rem', textAlign: 'center', position: 'relative' }}>
          {/* Wavy top border transitioning from Mustard Yellow */}
          <svg viewBox="0 0 1440 120" style={{ position: 'absolute', top: -1, left: 0, width: '100%', height: 'auto', zIndex: 2, transform: 'rotate(180deg)' }}>
            <path fill="#F0CD4C" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>

          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 10, marginTop: '2rem' }}>
            <h2 className="font-mouse" style={{ fontSize: 'clamp(5rem, 10vw, 8rem)', color: '#FFF', lineHeight: 0.9, textTransform: 'uppercase', marginBottom: '1rem', whiteSpace: 'pre-line' }}>
              {pageData?.cta?.title || "FEEL THE CHANGE"}
            </h2>
            <p className="font-mouse" style={{ fontSize: '2rem', color: '#FFF', opacity: 0.9, textTransform: 'uppercase', marginBottom: '3rem', whiteSpace: 'pre-line' }}>
              {pageData?.cta?.subtitle || "Bring these magical authentic flavors directly to your kitchen."}
            </p>
            <Link href="/products" style={{
              display: 'inline-block',
              background: '#FFF', color: '#FF1E1E',
              fontFamily: 'Mouse Memoirs, sans-serif', fontSize: '2.5rem',
              textTransform: 'uppercase', padding: '1rem 4rem', borderRadius: '50px',
              textDecoration: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s ease'
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              {pageData?.cta?.buttonText || "ORDER NOW"}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
