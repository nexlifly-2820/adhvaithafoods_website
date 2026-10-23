/*
  Adhvaitha Foods — "Signature Pickles" section
  ---------------------------------------------
  Files:   components/SignatureSection.jsx
           components/SignatureSection.module.css
  Images:  public/images/signature/  (transparent PNGs of each product)

  Use on the homepage, right after the hero:
      import SignatureSection from "@/components/SignatureSection";
      <HeroCarousel />
      <SignatureSection />
*/

'use client';

import Image from "next/image";
import Link from "next/link";
import styles from "./SignatureSection.module.css";

// ---- Edit your four cards here ----------------------------------------
const CARDS = [
  {
    name: "Avakaya",
    desc: "Raw Mango, Guntur Chilli, Sesame Oil. Grandma’s Kiss.",
    tags: ["# KAARAM", "# SUMMER IN A JAR"],
    image: "/images/signature/avakaya.png",
    href: "/products?category=Prepared%20Foods#shop",
    frame: "#5C3313", // outer border
    fill: "#F15A29",  // inner stamp
    ink: "#FFF8ED",   // text
  },
  {
    name: "Gongura",
    desc: "Tangy Sorrel Leaves, Garlic & Chilli. That’s How Andhra Eats.",
    tags: ["# PULUPU", "# ANDHRA MATTA"],
    image: "/images/signature/gongura.png",
    href: "/products?category=Prepared%20Foods#shop",
    frame: "#D4E8C8",
    fill: "#2A4720",
    ink: "#FFFCEB",
  },
  {
    name: "Podis",
    desc: "Stone-Ground, Hot Rice, A Spoon of Ghee. Amma’s Recipe.",
    tags: ["# ALL THE FEELS", "# I’M COMING HOME"],
    image: "/images/signature/podi.png",
    href: "/products?category=Salts,%20spices,%20soups#shop",
    frame: "#F15A29",
    fill: "#FBB040",
    ink: "#4A2508",
  },
  {
    name: "Sweets",
    desc: "Millet Laddus & Jaggery Treats. Sweet-Strong, Just Right.",
    tags: ["# TEA TIME", "# ONE MORE PLEASE"],
    image: "/images/signature/sweets.png",
    href: "/products?category=Indian%20Sweets%20%26%20Snacks#shop",
    frame: "#FBB040",
    fill: "#4E2B11",
    ink: "#FFF4E8",
  },
];
// -----------------------------------------------------------------------

export default function SignatureSection() {
  return (
    <section id="signature-section" className={styles.frame} aria-labelledby="sig-title">
      <div className={styles.panel}>
        <div className={styles.titleWrap}>
          <BowlDoodle className={`${styles.doodle} ${styles.bowl}`} />
          <LeafDoodle className={`${styles.doodle} ${styles.leaf}`} />
          <MangoDoodle className={`${styles.doodle} ${styles.mango}`} />

          <h2 id="sig-title" className={styles.title}>
            <span className={styles.big}>SIGNATURE</span>
            <span className={styles.script}>foods</span>
          </h2>
        </div>

        <div className={styles.cards}>
          {CARDS.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className={styles.card}
              style={{ "--frame": c.frame, "--fill": c.fill, "--ink": c.ink }}
            >
              <div className={styles.inner}>
                <div className={styles.img}>
                  <Image
                    src={c.image}
                    alt={c.name}
                    width={420}
                    height={320}
                    priority
                    unoptimized
                  />
                </div>
                <div>
                  <h3 className={styles.name}>{c.name}</h3>
                  <p className={styles.desc}>{c.desc}</p>
                </div>
                <div className={styles.tags}>
                  {c.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Hand-drawn doodles ---------- */
function BowlDoodle({ className }) {
  return (
    <svg className={className} viewBox="0 0 140 130" aria-hidden="true" fill="none" stroke="#5C3313" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 30c-6-8 6-12 0-22M68 32c-6-9 7-13 0-24M86 30c-6-8 6-12 0-22" />
      <ellipse cx="70" cy="62" rx="54" ry="10" fill="#F1D9C2" />
      <path d="M16 62c4 34 30 50 54 50s50-16 54-50" fill="#F1D9C2" />
      <path d="M44 112h52" />
      <path d="M40 58c8-8 20-10 30-4 10-6 22-4 30 4" />
    </svg>
  );
}

function LeafDoodle({ className }) {
  return (
    <svg className={className} viewBox="0 0 80 120" aria-hidden="true" fill="none" stroke="#5C3313" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M40 115V40" />
      <path d="M40 50c-14-4-24-16-22-34 14 4 22 16 22 34z" fill="#D4E8C8" />
      <path d="M40 70c14-4 24-16 22-34-14 4-22 16-22 34z" fill="#D4E8C8" />
      <path d="M40 90c-14-4-22-14-20-30 13 4 20 14 20 30z" fill="#D4E8C8" />
    </svg>
  );
}

function MangoDoodle({ className }) {
  return (
    <svg className={className} viewBox="0 0 160 130" aria-hidden="true" fill="none" stroke="#5C3313" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M30 70c0-34 34-52 66-46 32 6 46 34 36 60-10 26-44 38-72 30C40 108 30 92 30 70z" fill="#FBB040" />
      <path d="M96 24c4-8 10-12 18-14" />
      <path d="M100 18c10-10 26-10 34-2-10 8-24 8-34 2z" fill="#D4E8C8" />
      <path d="M58 54c6-6 14-8 22-6M52 72c4-4 10-6 16-5" />
    </svg>
  );
}
