import './globals.css';

// Fonts are loaded from Google Fonts in the browser (not downloaded during the build),
// so a Google Fonts hiccup on Vercel can no longer break the deploy. Same fonts, same CSS variables.
const fontVars = {
  '--font-playfair': "'Playfair Display', serif",
  '--font-lato': "'Lato', sans-serif",
  '--font-dancing': "'Dancing Script', cursive",
  '--font-crimson': "'Crimson Text', serif",
  '--font-montserrat': "'Montserrat', sans-serif",
  '--font-yellowtail': "'Yellowtail', cursive",
  '--font-lilita': "'Lilita One', cursive",
};

export const metadata = {
  title: 'Adhvaitha Foods — Straight From Grandmother\'s Kitchen | Authentic Indian Pickles',
  description: 'Handcrafted Indian pickles made with pure, natural ingredients and traditional recipes since 1970. No preservatives, no shortcuts. Mango Avakaya, Gongura, Lemon, and more. Pan India delivery.',
  keywords: 'Indian pickles, mango avakaya, gongura pickle, lemon pickle, traditional pickles, homemade pickles, Andhra pickles, natural pickles, no preservatives',
  openGraph: {
    title: 'Adhvaitha Foods — Authentic Indian Pickles Since 1970',
    description: 'Handcrafted pickles made with grandmother\'s recipes. Pure, natural, traditional.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Lato:wght@300;400;700&family=Dancing+Script:wght@400..700&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&family=Montserrat:wght@400;700;800;900&family=Yellowtail&family=Lilita+One&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Bricolage+Grotesque:opsz,wght@12..96,800&family=Caveat:wght@700&family=Fraunces:wght@800&family=Inter&family=Lato&family=Manrope:wght@500;700;800&family=Mr+Dafoe&family=Noto+Sans+Telugu:wght@800&family=Noto+Serif+Telugu:wght@700&family=Oswald:wght@600&display=swap" rel="stylesheet" />
      </head>
      <body style={fontVars}>
        {children}
      </body>
    </html>
  );
}
