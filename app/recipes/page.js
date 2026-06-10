'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InteractiveMixer from '@/components/InteractiveMixer';

const recipes = [
  { id: 'avakaya-rice', name: 'Avakaya Rice', time: '10 min', level: 'Easy', serves: 2, img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop', color: '#C4603A', pickle: 'Mango Avakaya', desc: 'Hot rice tossed with mango pickle, sesame seeds, and a drizzle of ghee. The simplest and most satisfying Andhra meal.', ingredients: ['2 cups cooked rice (hot)', '3 tbsp Avdaitha Mango Avakaya', '2 tbsp sesame seeds (roasted)', '1 tbsp ghee', 'Fresh curry leaves'], method: 'Mix hot rice with pickle and ghee while the rice is still steaming. Top with roasted sesame and curry leaves. Serve immediately.' },
  { id: 'gongura-chicken', name: 'Gongura Chicken', time: '45 min', level: 'Medium', serves: 4, img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop', color: '#2D5A27', pickle: 'Gongura Pickle', desc: 'A classic Andhra chicken curry made with our gongura sorrel pickle for tangy depth. Bold, fiery, and unforgettable.', ingredients: ['500g chicken pieces', '4 tbsp Avdaitha Gongura Pickle', '2 onions, sliced', '4 garlic cloves', 'Oil, salt, spices to taste'], method: 'Fry onions until golden. Add chicken and sear. Add gongura pickle and a splash of water. Cook on low heat 30 min. Serve with roti.' },
  { id: 'pickle-paratha', name: 'Pickle Paratha', time: '25 min', level: 'Easy', serves: 3, img: 'https://images.unsplash.com/photo-1606859191214-25806e8e2423?q=80&w=800&auto=format&fit=crop', color: '#8B5E3C', pickle: 'Any Pickle', desc: 'Flaky whole wheat flatbreads stuffed with spiced pickle filling. A perfect breakfast or snack that pairs any pickle beautifully.', ingredients: ['2 cups whole wheat flour', '2 tbsp Avdaitha pickle of choice', '¼ cup mashed potato (optional)', 'Ghee for cooking', 'Salt to taste'], method: 'Knead dough, divide into balls. Flatten, place pickle filling in center, seal, roll out gently. Cook on tawa with ghee until golden spots appear.' },
  { id: 'chili-dal', name: 'Chili Pickle Dal', time: '30 min', level: 'Easy', serves: 3, img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop', color: '#C4603A', pickle: 'Green Chili', desc: 'Classic yellow dal elevated with a spoonful of our green chili pickle. Simple weekday comfort food at its best.', ingredients: ['1 cup toor dal (cooked)', '2 tbsp Avdaitha Green Chili Pickle', 'Turmeric, mustard seeds, curry leaves', 'Ghee for tempering', 'Salt to taste'], method: 'Prepare tempering with mustard seeds, curry leaves in ghee. Add dal and pickle. Simmer 10 minutes. Serve with steamed rice.' },
  { id: 'lemon-rasam', name: 'Lemon Pickle Rasam', time: '20 min', level: 'Easy', serves: 4, img: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4859?q=80&w=800&auto=format&fit=crop', color: '#E8A820', pickle: 'Lemon Pickle', desc: 'A deeply warming South Indian soup-broth made richer with a tablespoon of our lemon pickle. Perfect for cold evenings.', ingredients: ['2 cups tamarind water', '1 tbsp Avdaitha Lemon Pickle', 'Tomatoes, pepper, cumin', 'Hing (asafoetida)', 'Fresh coriander'], method: 'Boil tamarind water with tomatoes and spices. Add lemon pickle, simmer 10 min. Finish with hing tempering and fresh coriander.' },
  { id: 'mango-curd-rice', name: 'Avakaya Curd Rice', time: '15 min', level: 'Easy', serves: 2, img: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=800&auto=format&fit=crop', color: '#2D5A27', pickle: 'Mango Avakaya', desc: 'Creamy curd rice with a spoonful of spicy mango pickle on top. The ultimate South Indian comfort food combination.', ingredients: ['2 cups cooked rice', '1 cup thick curd (yogurt)', '2 tbsp Avdaitha Mango Avakaya', 'Grated ginger', 'Pomegranate seeds (optional)'], method: 'Mix cooled rice with curd and ginger. Season with salt. Serve chilled with a generous spoonful of Avakaya on top.' },
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
             <img src="https://images.unsplash.com/photo-1556910103-1c02745a8726?q=80&w=2000&auto=format&fit=crop" alt="Cookbook background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,10,3,0.8), rgba(26,10,3,0.95))' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }} className="reveal">
            <span style={{ 
              fontFamily: 'Dancing Script, cursive', fontSize: '2rem', color: 'var(--turmeric)', 
              display: 'block', marginBottom: '1rem' 
            }}>
              In Grandmother's Cookbook
            </span>
            <h1 style={{ 
              fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3.5rem, 8vw, 6rem)', 
              fontWeight: 900, color: 'var(--ivory)', marginBottom: '1.5rem', lineHeight: 1 
            }}>
              Cook With<br />
              <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>Our Pickles</em>
            </h1>
            <p style={{ 
              fontFamily: 'Lato, sans-serif', fontSize: '1.25rem', color: 'rgba(250,240,220,0.8)', 
              lineHeight: 1.8 
            }}>
              Traditional Andhra recipes that showcase the magic of a good pickle. Transform everyday meals into extraordinary feasts.
            </p>
          </div>
        </section>

        {/* Interactive Recipe Mixer Section */}
        <section style={{ padding: '6rem 2rem', background: 'var(--cream)', position: 'relative', zIndex: 2, marginTop: '-3rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
             <InteractiveMixer />
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
                    <div style={{
                      position: 'absolute', bottom: '1.5rem', left: '1.5rem',
                      background: recipe.color, color: '#fff',
                      fontFamily: 'Lato, sans-serif', fontSize: '0.75rem', fontWeight: 900,
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      padding: '0.5rem 1rem', borderRadius: '4px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
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
              Ready to Cook?<br /><em style={{ color: 'var(--turmeric)', fontStyle: 'italic' }}>Get Your Pickles First!</em>
            </h2>
            <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '1.25rem', color: 'rgba(250,240,220,0.9)', marginBottom: '3rem', lineHeight: 1.7 }}>
              Stock up your pantry with our authentic artisan pickles and start creating these magical dishes in your own kitchen.
            </p>
            <Link href="/products" className="btn btn-outline-cream" style={{ fontSize: '1rem', padding: '1.25rem 3.5rem', border: '2px solid var(--ivory)', background: 'var(--ivory)', color: 'var(--terracotta)' }}>
              Shop All Pickles →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
