import { Playfair_Display, Lato, Dancing_Script, Crimson_Text, Montserrat, Yellowtail, Lilita_One } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
});

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

const yellowtail = Yellowtail({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-yellowtail',
  display: 'swap',
});

const lilitaOne = Lilita_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-lilita',
  display: 'swap',
});

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
      </head>
      <body className={`${playfair.variable} ${lato.variable} ${dancingScript.variable} ${crimsonText.variable} ${montserrat.variable} ${yellowtail.variable} ${lilitaOne.variable}`}>
        {children}
      </body>
    </html>
  );
}
