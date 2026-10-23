import os

path = r'c:\Users\DELL\OneDrive\Documents\adhvaithafoods_website\components\Navbar.jsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update PRODUCT_CATEGORIES and add DIETARY_TYPES & FEATURED_DROPDOWN_ITEM
old_categories = '''const PRODUCT_CATEGORIES = [
  { title: 'Prepared Foods', sub: 'Traditional Pickles', img: '/images/products/mango-pickle.jpg', href: '/products?category=Prepared%20Foods#shop' },
  { title: 'Salts, Spices, Soups', sub: 'Aromatic Masalas & Podis', img: '/images/products/biryani-masala.jpg', href: '/products?category=Salts,%20spices,%20soups#shop' },
  { title: 'Ready-to-Eat Savouries', sub: 'Crunchy Snacks & Namkeen', img: '/images/products/chakodi.jpg', href: '/products?category=Ready-to-eat%20savouries#shop' },
  { title: 'Indian Sweets & Snacks', sub: 'Traditional Sweets & Laddus', img: '/images/products/Dry_Fruits_Laddu_(premium_dry_fruits_laddu).jpeg', href: '/products?category=Indian%20Sweets%20%26%20Snacks#shop' },
];'''

new_categories = '''const PRODUCT_CATEGORIES = [
  { title: 'PREPARED FOODS', sub: 'Traditional Pickles', img: '/images/products/mango-pickle.jpg', href: '/products?category=Prepared%20Foods#shop', iconBg: '#FFF3E0' },
  { title: 'SALTS, SPICES, SOUPS', sub: 'Aromatic Masalas & Podis', img: '/images/products/biryani-masala.jpg', href: '/products?category=Salts,%20spices,%20soups#shop', iconBg: '#FFF8E1' },
  { title: 'READY-TO-EAT SAVOURIES', sub: 'Crunchy Snacks & Namkeen', img: '/images/products/chakodi.jpg', href: '/products?category=Ready-to-eat%20savouries#shop', iconBg: '#E8F5E9' },
  { title: 'INDIAN SWEETS & SNACKS', sub: 'Traditional Sweets & Laddus', img: '/images/products/Dry_Fruits_Laddu_(premium_dry_fruits_laddu).jpeg', href: '/products?category=Indian%20Sweets%20%26%20Snacks#shop', iconBg: '#F3E5F5' },
];

const DIETARY_TYPES = [
  { title: '100% VEGAN', sub: 'Pure Plant-Based', icon: '🌱', iconBg: '#FEF9C3', href: '/products#shop' },
  { title: 'PRESERVATIVE FREE', sub: 'Zero Chemical Additives', icon: '🌿', iconBg: '#E0F2FE', href: '/products#shop' },
  { title: 'GLUTEN FREE', sub: 'Naturally Sourced', icon: '🌾', iconBg: '#DCFCE7', href: '/products#shop' },
  { title: 'STONE GROUND', sub: 'Handmade Authenticity', icon: '🪨', iconBg: '#E0E7FF', href: '/products#shop' },
];

const FEATURED_MEGA_ITEM = {
  tag: 'AUTHENTIC SPECIAL',
  title: 'AVAKAYA PICKLE',
  desc: 'Authentic sun-dried Andhra mango pickle crafted with cold-pressed sesame oil, stone-ground mustard seeds, and heirloom grandmother recipes.',
  buttonText: 'View Product',
  href: '/products?category=Prepared%20Foods#shop',
  bg: '#8B261E', // Rich deep red from Brar\\'s featured card
  badgeText: 'FAMILY RECIPE • 100% NATURAL •',
};'''

assert old_categories in content, "old_categories not found"
content = content.replace(old_categories, new_categories)

# 2. Replace the Dropdown Menu JSX
old_dropdown_jsx = '''                    {/* Dropdown Menu */}
                    {isProducts && activeDropdown === 'Products' && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '0',
                          marginTop: '0',
                          width: '320px',
                          background: '#FDF8E8',
                          borderRadius: '8px',
                          boxShadow: '0 10px 30px rgba(61,31,10,0.1)',
                          border: '1px solid rgba(139,94,60,0.15)',
                          padding: '0.5rem 0',
                          zIndex: 1000,
                        }}
                      >
                         {PRODUCT_CATEGORIES.map((cat, i) => (
                            <Link key={i} href={cat.href} onClick={() => setActiveDropdown(null)} style={{ textDecoration: 'none' }}>
                              <div 
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '0.75rem 1rem',
                                  gap: '1rem',
                                  transition: 'background 0.2s',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(139,94,60,0.08)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                              >
                                <div style={{ width: '48px', height: '48px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, background: '#fff', border: '1px solid rgba(139,94,60,0.1)' }}>
                                  <img 
                                    src={cat.img} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                    onError={(e) => { e.target.onerror = null; e.target.src = '/images/logo.svg'; }} 
                                    alt={cat.title} 
                                  />
                                </div>
                                <div>
                                  <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--rich-brown)', marginBottom: '0.1rem', fontFamily: 'var(--font-montserrat), sans-serif', letterSpacing: '-0.01em' }}>{cat.title}</div>
                                  <div style={{ fontSize: '0.8rem', color: 'var(--aged-wood)', fontFamily: 'var(--font-lato), sans-serif' }}>{cat.sub}</div>
                                </div>
                              </div>
                            </Link>
                         ))}
                      </div>
                    )}'''

new_dropdown_jsx = '''                    {/* Brar\\'s 3-Column Mega Menu */}
                    {isProducts && activeDropdown === 'Products' && (
                      <div
                        className="mega-menu-container"
                        style={{
                          position: 'fixed',
                          top: '110px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '92vw',
                          maxWidth: '1160px',
                          background: '#FFFFFF',
                          borderRadius: '24px',
                          boxShadow: '0 25px 60px rgba(0,0,0,0.22)',
                          border: '1px solid rgba(0,0,0,0.08)',
                          padding: '2.5rem',
                          zIndex: 1000,
                          animation: 'megaMenuFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      >
                        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr 1.2fr', gap: '3rem' }}>
                          
                          {/* Column 1: Product Categories */}
                          <div>
                            <h4 style={{
                              fontFamily: '"Montserrat", sans-serif',
                              fontSize: '1.15rem',
                              fontWeight: 900,
                              color: '#111',
                              letterSpacing: '-0.01em',
                              marginBottom: '1.75rem',
                            }}>
                              Product Categories
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                              {PRODUCT_CATEGORIES.map((cat, i) => (
                                <Link
                                  key={i}
                                  href={cat.href}
                                  onClick={() => setActiveDropdown(null)}
                                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1.2rem', group: 'mega-item' }}
                                >
                                  <div
                                    style={{
                                      width: '64px',
                                      height: '64px',
                                      borderRadius: '16px',
                                      background: cat.iconBg || '#FFF8E1',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      overflow: 'hidden',
                                      flexShrink: 0,
                                      boxShadow: '0 6px 14px rgba(0,0,0,0.06)',
                                      transition: 'transform 0.3s ease',
                                    }}
                                  >
                                    <img
                                      src={cat.img}
                                      alt={cat.title}
                                      style={{ width: '85%', height: '85%', objectFit: 'contain', borderRadius: '10px' }}
                                      onError={(e) => { e.target.onerror = null; e.target.src = '/images/logo.svg'; }}
                                    />
                                  </div>
                                  <div>
                                    <span style={{
                                      fontFamily: '"Montserrat", sans-serif',
                                      fontSize: '1.05rem',
                                      fontWeight: 900,
                                      color: '#111',
                                      letterSpacing: '-0.01em',
                                      display: 'block',
                                      lineHeight: 1.2,
                                      transition: 'color 0.2s',
                                    }}>
                                      {cat.title}
                                    </span>
                                    <span style={{
                                      fontFamily: '"Inter", sans-serif',
                                      fontSize: '0.8rem',
                                      color: '#666',
                                      fontWeight: 500,
                                      display: 'block',
                                      marginTop: '3px',
                                    }}>
                                      {cat.sub}
                                    </span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Column 2: Type of Products */}
                          <div>
                            <h4 style={{
                              fontFamily: '"Montserrat", sans-serif',
                              fontSize: '1.15rem',
                              fontWeight: 900,
                              color: '#111',
                              letterSpacing: '-0.01em',
                              marginBottom: '1.75rem',
                            }}>
                              Type of Products
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                              {DIETARY_TYPES.map((diet, i) => (
                                <Link
                                  key={i}
                                  href={diet.href}
                                  onClick={() => setActiveDropdown(null)}
                                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1.2rem' }}
                                >
                                  <div
                                    style={{
                                      width: '64px',
                                      height: '64px',
                                      borderRadius: '16px',
                                      background: diet.iconBg,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '1.75rem',
                                      flexShrink: 0,
                                      boxShadow: '0 6px 14px rgba(0,0,0,0.06)',
                                    }}
                                  >
                                    {diet.icon}
                                  </div>
                                  <div>
                                    <span style={{
                                      fontFamily: '"Montserrat", sans-serif',
                                      fontSize: '1.05rem',
                                      fontWeight: 900,
                                      color: '#111',
                                      letterSpacing: '-0.01em',
                                      display: 'block',
                                      lineHeight: 1.2,
                                    }}>
                                      {diet.title}
                                    </span>
                                    <span style={{
                                      fontFamily: '"Inter", sans-serif',
                                      fontSize: '0.8rem',
                                      color: '#666',
                                      fontWeight: 500,
                                      display: 'block',
                                      marginTop: '3px',
                                    }}>
                                      {diet.sub}
                                    </span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Column 3: Featured Banner Card (Brar\\'s Style) */}
                          <div>
                            <h4 style={{
                              fontFamily: '"Montserrat", sans-serif',
                              fontSize: '1.15rem',
                              fontWeight: 900,
                              color: '#111',
                              letterSpacing: '-0.01em',
                              marginBottom: '1.75rem',
                            }}>
                              Featured
                            </h4>
                            <div
                              style={{
                                background: FEATURE_MEGA_ITEM.bg,
                                borderRadius: '24px',
                                padding: '2.5rem 2.25rem',
                                color: '#FFFFFF',
                                position: 'relative',
                                overflow: 'hidden',
                                height: 'calc(100% - 3.2rem)',
                                minHeight: '340px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 15px 35px rgba(139,38,30,0.3)',
                              }}
                            >
                              {/* Background Decorative Stamp Circle */}
                              <div
                                style={{
                                  position: 'absolute',
                                  right: '-30px',
                                  bottom: '-30px',
                                  width: '180px',
                                  height: '180px',
                                  borderRadius: '50%',
                                  border: '2px dashed rgba(255,255,255,0.25)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  pointerEvents: 'none',
                                }}
                              >
                                <span style={{
                                  fontSize: '0.65rem',
                                  fontWeight: 900,
                                  color: 'rgba(255,255,255,0.4)',
                                  letterSpacing: '0.15em',
                                  textTransform: 'uppercase',
                                  textAlign: 'center',
                                }}>
                                  {FEATURE_MEGA_ITEM.badgeText}
                                </span>
                              </div>

                              <div>
                                <h3 style={{
                                  fontFamily: '"Montserrat", sans-serif',
                                  fontSize: '2.4rem',
                                  fontWeight: 900,
                                  lineHeight: 1.05,
                                  textTransform: 'uppercase',
                                  letterSpacing: '-0.02em',
                                  color: '#FFFFFF',
                                  marginBottom: '1.25rem',
                                }}>
                                  AVAKAYA<br />PICKLE
                                </h3>
                                <p style={{
                                  fontFamily: '"Inter", sans-serif',
                                  fontSize: '0.92rem',
                                  lineHeight: 1.6,
                                  color: 'rgba(255,255,255,0.92)',
                                  fontWeight: 400,
                                  maxWidth: '95%',
                                }}>
                                  {FEATURE_MEGA_ITEM.desc}
                                </p>
                              </div>

                              <div style={{ marginTop: '2rem' }}>
                                <Link
                                  href={FEATURE_MEGA_ITEM.href}
                                  onClick={() => setActiveDropdown(null)}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: '#111111',
                                    color: '#FFFFFF',
                                    padding: '0.85rem 1.6rem',
                                    borderRadius: '999px',
                                    fontSize: '0.88rem',
                                    fontWeight: 800,
                                    fontFamily: '"Montserrat", sans-serif',
                                    textDecoration: 'none',
                                    boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
                                    transition: 'transform 0.2s ease',
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                  {FEATURE_MEGA_ITEM.buttonText} ›
                                </Link>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}'''

assert old_dropdown_jsx in content, "old_dropdown_jsx not found"
content = content.replace(old_dropdown_jsx, new_dropdown_jsx)

# 3. Add megaMenuFadeIn animation to style tag
old_styles = '''.nav-link:hover, .nav-link.active {'''

new_styles = '''@keyframes megaMenuFadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        .nav-link:hover, .nav-link.active {'''

assert old_styles in content, "old_styles not found"
content = content.replace(old_styles, new_styles)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Navbar mega menu successfully updated!")
