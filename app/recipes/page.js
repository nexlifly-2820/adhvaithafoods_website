'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// One recipe per product category
const recipes = [
  {
    id: 'allam-velluli-pickle-recipe',
    name: 'Allam Velluli Pickle Rice',
    category: 'Prepared Foods',
    time: '10 min',
    level: 'Easy',
    serves: 2,
    img: '/images/products/Allam_Velluli_Pickle_(ginger_garlic_pickle).jpeg',
    color: '#C4603A',
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
    color: '#E8A820',
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
    color: '#2D5A27',
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
    color: '#8B5E3C',
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
];

export default function RecipesPage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main>

        {/* Cinematic Hero */}
        <section id="recipes-hero" style={{
          position: 'relative', overflow: 'hidden',
          minHeight: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '8rem 2rem 5rem'
        }}>
          {/* Background Image */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
             <img src="https://images.unsplash.com/photo-1556910103-1c02745a8726?q=80&w=2000&auto=format&fit=crop" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,10,3,0.8), rgba(26,10,3,0.95))' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }} className="reveal">

            <h1 style={{ 
              fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3.5rem, 8vw, 6rem)', 
              fontWeight: 900, color: 'var(--ivory)', marginBottom: '1.5rem', lineHeight: 1 
            }}>
              Cook With<br />
              <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>Our Products</em>
            </h1>
            <p style={{ 
              fontFamily: 'Lato, sans-serif', fontSize: '1.25rem', color: 'rgba(250,240,220,0.8)', 
              lineHeight: 1.8 
            }}>
              One signature recipe from each of our product categories — transforming everyday meals into extraordinary feasts.
            </p>
          </div>
        </section>

        {/* Category Badge Legend */}
        <section style={{ padding: '3rem 2rem 0', background: 'var(--cream)' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {[
              { label: 'Prepared Foods', color: '#C4603A' },
              { label: 'Ready-to-eat Savouries', color: '#E8A820' },
              { label: 'Salts, Spices & Soups', color: '#2D5A27' },
              { label: 'Indian Sweets & Snacks', color: '#8B5E3C' },
            ].map(cat => (
              <span key={cat.label} style={{
                fontFamily: 'Lato, sans-serif', fontSize: '0.8rem', fontWeight: 900,
                color: cat.color, background: `${cat.color}15`,
                padding: '0.5rem 1.25rem', borderRadius: '8px',
                border: `1px solid ${cat.color}30`, letterSpacing: '0.05em',
              }}>
                {cat.label}
              </span>
            ))}
          </div>
        </section>

        {/* Recipes Grid - Magazine Layout */}
        <section style={{ padding: '4rem 2rem 8rem', background: 'var(--cream)' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
              gap: '4rem',
            }}>
              {recipes.map((recipe, index) => (
                <div key={recipe.id} id={`recipe-${recipe.id}`} className="reveal" style={{
                  background: 'var(--ivory)', borderRadius: '24px',
                  border: '1px solid rgba(139,94,60,0.1)',
                  overflow: 'hidden', display: 'flex', flexDirection: 'column',
                  boxShadow: '0 20px 40px rgba(61,31,10,0.03)',
                  transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease',
                  animationDelay: `${index * 0.1}s`
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 30px 60px rgba(61,31,10,0.08)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(61,31,10,0.03)';
                  }}
                >
                  {/* Image Block */}
                  <div style={{
                    height: '280px', position: 'relative', overflow: 'hidden'
                  }}>
                    <img src={recipe.img} alt={recipe.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} 
                      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,10,3,0.6), transparent)', pointerEvents: 'none' }} />
                    {/* Category Badge */}
                    <div style={{
                      position: 'absolute', top: '1.5rem', left: '1.5rem',
                      background: recipe.color, color: '#fff',
                      fontFamily: 'Lato, sans-serif', fontSize: '0.7rem', fontWeight: 900,
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      padding: '0.4rem 0.9rem', borderRadius: '4px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}>{recipe.category}</div>
                    <div style={{
                      position: 'absolute', bottom: '1.5rem', left: '1.5rem',
                      background: 'rgba(26,10,3,0.7)', color: '#fff',
                      fontFamily: 'Lato, sans-serif', fontSize: '0.75rem', fontWeight: 900,
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      padding: '0.5rem 1rem', borderRadius: '4px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      backdropFilter: 'blur(4px)',
                    }}>Featuring: {recipe.pickle}</div>
                  </div>

                  {/* Content Block */}
                  <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 900, color: 'var(--rich-brown)', marginBottom: '0.75rem', lineHeight: 1.2 }}>{recipe.name}</h2>
                    <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.05rem', color: 'var(--aged-wood)', marginBottom: '2rem', lineHeight: 1.7 }}>{recipe.desc}</p>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.8rem', fontWeight: 900, color: recipe.color, background: `${recipe.color}15`, padding: '0.4rem 0.8rem', borderRadius: '6px', letterSpacing: '0.05em' }}>⏱ {recipe.time}</span>
                      <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.8rem', fontWeight: 900, color: 'var(--forest-green)', background: 'rgba(45,90,39,0.1)', padding: '0.4rem 0.8rem', borderRadius: '6px', letterSpacing: '0.05em' }}>👨‍🍳 {recipe.level}</span>
                      <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.8rem', fontWeight: 900, color: 'var(--aged-wood)', background: 'rgba(139,94,60,0.1)', padding: '0.4rem 0.8rem', borderRadius: '6px', letterSpacing: '0.05em' }}>👥 Serves {recipe.serves}</span>
                    </div>

                    <div style={{ flex: 1 }}>
                      {/* Ingredients */}
                      <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{
                          fontFamily: 'Lato, sans-serif', fontSize: '0.8rem', fontWeight: 900,
                          letterSpacing: '0.2em', textTransform: 'uppercase',
                          color: recipe.color, marginBottom: '1rem',
                          display: 'flex', alignItems: 'center', gap: '0.5rem'
                        }}>
                          <span style={{ width: '20px', height: '1px', background: recipe.color }} />
                          Ingredients
                        </h4>
                        <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
                          {recipe.ingredients.map((ing, i) => (
                            <li key={i} style={{
                              fontFamily: 'Lato, sans-serif', fontSize: '0.95rem',
                              color: 'var(--rich-brown)', padding: '0.4rem 0',
                              borderBottom: i < recipe.ingredients.length - 1 ? '1px dashed rgba(139,94,60,0.15)' : 'none',
                              display: 'flex', alignItems: 'center', gap: '0.75rem',
                            }}>
                              <span style={{ color: recipe.color, fontSize: '0.5rem' }}>◆</span> {ing}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Method */}
                      <div style={{
                        background: `${recipe.color}08`, borderLeft: `4px solid ${recipe.color}`,
                        borderRadius: '0 12px 12px 0', padding: '1.5rem',
                      }}>
                        <h4 style={{
                          fontFamily: 'Lato, sans-serif', fontSize: '0.8rem', fontWeight: 900,
                          letterSpacing: '0.2em', textTransform: 'uppercase',
                          color: recipe.color, marginBottom: '0.75rem',
                        }}>Method</h4>
                        <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.95rem', color: 'var(--rich-brown)', lineHeight: 1.8 }}>{recipe.method}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cinematic CTA */}
        <section style={{ background: 'var(--terracotta)', padding: '8rem 2rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }} className="reveal">
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: 'var(--ivory)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
              Ready to Cook?<br /><em style={{ color: 'var(--turmeric)', fontStyle: 'italic' }}>Get Your Products First!</em>
            </h2>
            <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.25rem', color: 'rgba(250,240,220,0.9)', marginBottom: '3rem', lineHeight: 1.7 }}>
              Stock up your pantry with our authentic artisan products and start creating these magical dishes in your own kitchen.
            </p>
            <Link href="/products" className="btn btn-outline-cream" style={{ fontSize: '1rem', padding: '1.25rem 3.5rem', border: '2px solid var(--ivory)', background: 'var(--ivory)', color: 'var(--terracotta)' }}>
              Shop All Products →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
