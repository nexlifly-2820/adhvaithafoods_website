"use client";

/*
  Adhvaitha Foods — "How We Make It"
  Authentic Traditional Process & Handcrafted Heritage:
   • one continuous hand-drawn dashed line through hero + process timeline
   • pinned "OUR PICKLES" title, mango cut-out sliding into the gap, tilted cards stacking over it
   • big orange photo spread of grandmother's kitchen and heirloom recipes
   • hover "PODI VARIETIES" with spotlight pop-up cards
   • pinned "SNACKS & SWEETS" title with cards sliding over it
   • footer with outline text and animated pickle jar

  Files:    components/HowWeMakeIt.jsx + components/HowWeMakeIt.module.css
  Photos:   public/images/process/*.jpg, public/images/products/*.jpg, public/images/cutouts/*.png
*/

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import s from "./HowWeMakeIt.module.css";

const COLORS = ["#E9B48A", "#C9D7A8", "#F0C48C", "#E8A07A", "#D9B58A", "#EBC9A4", "#D98C6A"];

/* ───────────── content ───────────── */
const STEPS = [
  { 
    t: "WASH & PREP", 
    te: "PURITY", 
    lab: "SPRING WATER WASH", 
    p1: "/images/process/washing-prep.jpg",
    p2: "/images/process/orchard-harvest.jpg",
    cut: "/images/cutouts/mango.png",
    b: "Before cutting or mixing begins, every single raw green mango and fresh spice undergoes rigorous traditional cleaning. We hand-wash with pure spring water in brass basins and wipe clean with organic muslin cloths, making sure nature’s harvest is pristine and crisp." 
  },
  { 
    t: "SUN CURING", 
    te: "SUN CURED", 
    p1: "/images/process/sun-drying.jpg",
    cut: "/images/cutouts/chilli.png",
    b: "Patience is our secret ingredient. Instead of using artificial dehydrators, we spread washed ingredients on spotless rooftop cotton sheets to dry naturally under the hot Andhra sun. Natural solar warmth evaporates moisture and concentrates deep tartness." 
  },
  { 
    t: "STONE GRIND", 
    te: "STONE GROUND", 
    p1: "/images/process/stone-grinding.jpg",
    p2: "/images/ing_mustard.png",
    b: "We reject electric grinders because frictional heat burns essential spice oils. At dawn, heavy granite slabs slowly stone-grind whole mustard seeds, fenugreek, and Guntur red chillies. The cold stone preserves potent natural aroma and true pungency." 
  },
  { 
    t: "HAND PACKED", 
    te: "HAND PACKED", 
    isPresent: true,
    cut: "/images/cutouts/jar.png",
    note: "pure!",
    b: "The sun-cured pieces meet pure wood-churned cold-pressed sesame oil in ceramic jaadis. Hand-poured into sterilized glass jars, crowned with golden til oil, and sealed tightly. No preservatives, no shortcuts — just like Ammayya did since 1970." 
  },
];

const PODI_TYPES = [
  {
    id: "kandi-podi",
    name: "KANDI PODI",
    kanji: "KANDI PODI",
    tagA: "ROASTED TOOR DAL",
    tagB: "GUNPOWDER",
    img: "/images/cutouts/podi-1.png",
    desc: "Roasted Toor dal, red chillies, cumin, and sea salt stone-ground to perfection. The quintessential Andhra gunpowder loved with hot rice and melted cow ghee."
  },
  {
    id: "karivepaku-podi",
    name: "KARIVEPAKU",
    kanji: "KARIVEPAKU",
    tagA: "CURRY LEAF",
    tagB: "AROMATIC",
    img: "/images/cutouts/podi-2.png",
    desc: "Sun-dried fresh curry leaves roasted with black pepper, cumin, and lentils. Rich in natural iron, digestive goodness, and intense aroma."
  },
  {
    id: "nuvvula-podi",
    name: "NUVVULA PODI",
    kanji: "NUVVULA PODI",
    tagA: "ROASTED SESAME",
    tagB: "EARTHY",
    img: "/images/cutouts/podi-3.png",
    desc: "Nutty roasted sesame seeds pounded with garlic cloves and Guntur red chillies. Hearty, wholesome, and deeply warming."
  },
  {
    id: "vellulli-karam",
    name: "VELLULLI KARAM",
    kanji: "VELLULLI KARAM",
    tagA: "GARLIC CHILLI",
    tagB: "FIERY",
    img: "/images/cutouts/podi-4.png",
    desc: "Roasted whole garlic cloves crushed with fiery red chilli powder and cumin. The ultimate pairing for hot ghee, crispy dosas, and soft idlis."
  }
];

/* ───────────── small parts ───────────── */
const onImgErr = (e) => e.currentTarget.removeAttribute("src");

function Pol({ src, cls = "", d = "", i = 0, a, children }) {
  return (
    <div className={`${s.pol} ${s.rp} ${cls} ${d}`} data-a={a}>
      <img src={src} alt="" loading="lazy" style={{ "--c": COLORS[i % COLORS.length] }} onError={onImgErr} />
      {children}
    </div>
  );
}

const Spark = ({ style, size = 26 }) => (
  <svg className={s.spark} style={{ width: size, height: size, ...style }} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const StarSpark = ({ style, size = 24 }) => (
  <svg style={{ width: size, height: size, ...style }} viewBox="0 0 24 24" fill="none" stroke="#C20606" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2 C12 7, 17 12, 22 12 C17 12, 12 17, 12 22 C12 17, 7 12, 2 12 C7 12, 12 7, 12 2 Z" />
  </svg>
);

const HollowStar = ({ style, size = 36 }) => (
  <svg style={{ width: size, height: size, ...style }} viewBox="0 0 36 36" fill="none" aria-hidden="true">
    <path d="M18 2 C18 10, 26 18, 34 18 C26 18, 18 26, 18 34 C18 26, 10 18, 2 18 C10 18, 18 10, 18 2 Z" stroke="#FFF5EA" strokeWidth="2.2" strokeLinejoin="round" />
  </svg>
);

const Flower = ({ style, size = 40 }) => (
  <svg className={s.flower} style={{ width: size, height: size, ...style }} viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
    {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="20" cy="10" rx="6" ry="9" transform={`rotate(${a} 20 20)`} />)}
  </svg>
);

const Burst = ({ style, flip }) => (
  <svg className={s.burst} style={{ width: 64, height: 64, transform: flip ? "scaleX(-1)" : undefined, ...style }} viewBox="0 0 60 60" aria-hidden="true" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M8 30H22M14 12l10 12M30 6v14M14 48l10-12" />
  </svg>
);

const Ticks = ({ style, flip }) => (
  <svg style={{ width: 42, height: 42, transform: flip ? "scaleX(-1)" : undefined, ...style }} viewBox="0 0 40 40" fill="none" stroke="#B5121B" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
    <line x1="8" y1="20" x2="26" y2="20" />
    <line x1="12" y1="8" x2="26" y2="15" />
    <line x1="12" y1="32" x2="26" y2="25" />
  </svg>
);

/* free-standing dashed doodle */
const Dash = ({ style, d, arrow }) => (
  <svg className={s.dash} style={style} viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
    <path d={d} vectorEffect="non-scaling-stroke" />
    {arrow && <path className={s.dashHead} d={arrow} vectorEffect="non-scaling-stroke" />}
  </svg>
);

/* ───────────── scroll engine ───────────── */
function useScrollVars(root) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = [...el.querySelectorAll("[data-p]")];
    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const it of items) {
        const r = it.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) continue;
        const p = Math.min(1, Math.max(0, (vh - r.top) / vh));
        const x = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height * 0.6)));
        it.style.setProperty("--p", p.toFixed(4));
        it.style.setProperty("--x", x.toFixed(4));
      }
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [root]);
}

function useReveal(root) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add(s.in), io.unobserve(e.target))),
      { threshold: 0.12 }
    );
    root.current?.querySelectorAll("[data-rv]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [root]);
}

function useTrail(wrapRef, steps) {
  const [paths, setPaths] = useState([]);
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const box = (name) => {
      const el = wrap.querySelector(`[data-a="${name}"]`);
      if (!el || !el.offsetParent) return null;
      let x = 0, y = 0, n = el;
      while (n && n !== wrap) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
      const w = el.offsetWidth, h = el.offsetHeight;
      return { l: x, t: y, r: x + w, b: y + h, w, h, cx: x + w / 2, cy: y + h / 2 };
    };
    const f = (n) => n.toFixed(1);
    const P = (x, y) => `${f(x)} ${f(y)}`;

    const short = (ax, ay, bx, by) => `M${P(ax, ay)} C${P(ax + (bx - ax) * 0.45, ay + 6)} ${P(bx - (bx - ax) * 0.35, by - 34)} ${P(bx, by)}`;
    const wiggle = (ax, ay, bx, by) => {
      const my = (ay + by) / 2, mx = (ax + bx) / 2 + 30;
      return `M${P(ax, ay)} C${P(ax - 30, ay + (my - ay) * 0.4)} ${P(mx + 50, my - (my - ay) * 0.4)} ${P(mx, my)} S${P(bx - 40, by - (by - my) * 0.5)} ${P(bx, by)}`;
    };

    const build = () => {
      const out = [];
      const p3 = box("h3");
      const dot = box("e0dot");
      if (p3 && dot) {
        out.push({
          d: `M${P(p3.l + p3.w * 0.35, p3.b - 4)} C${P(p3.l - 40, p3.b + 90)} ${P(dot.l - 80, dot.cy - 60)} ${P(dot.l - 4, dot.cy)}`
        });
      }

      for (let i = 0; i < steps; i++) {
        const t = box(`e${i}t`), ph1 = box(`e${i}p1`), ph2 = box(`e${i}p2`);
        if (!t || !ph1) continue;
        const flip = i % 2 === 1, last = i === steps - 1;
        if (!flip && i > 0) {
          const src = ph2 || ph1;
          const ex = t.l - 14;
          const ey = t.t + t.h * 0.5;
          out.push({ d: short(src.r - 6, Math.min(src.b - 30, Math.max(src.t + 30, ey - 70)), ex, ey) });
        }
        if (i > 0) {
          const prev = i - 1;
          const pp = prev === 0 ? box("e0p2") : box(`e${prev}p1`);
          if (!pp) continue;
          const sx = pp.l + pp.w * (prev % 2 ? 0.45 : 0.62), sy = pp.b - 4;
          if (flip && !last) {
            const lbx = Math.max(60, t.l - 70), lby = t.b + 26;
            const ux = t.l - 6, uy = t.t - 6;
            const ex = ph1.l + 8, ey = ph1.t + ph1.h * 0.42;
            out.push({
              d: `M${P(sx, sy)} C${P(sx + 30, sy + 90)} ${P(sx - 60, (sy + lby) / 2 - 40)} ${P((sx + lbx) / 2, (sy + lby) / 2)}`
                + ` S${P(lbx - 50, lby - 40)} ${P(lbx - 30, lby)}`
                + ` C${P(lbx - 20, lby + 46)} ${P(lbx + 46, lby + 40)} ${P(lbx + 30, lby - 4)}`
                + ` C${P(lbx + 18, lby - 40)} ${P(ux - 30, uy + 30)} ${P(ux, uy)}`
                + ` C${P(ux + t.w * 0.35, uy - 90)} ${P(ex - 90, ey - 50)} ${P(ex, ey)}`,
            });
          } else if (last) {
            const ex = t.l - 22, ey = t.t + t.h * 0.5;
            const startX = pp.r - 20, startY = pp.b + 12;
            out.push({
              d: `M${P(startX, startY)} C${P(startX - 25, startY + 70)} ${P(ex - 130, ey - 90)} ${P(ex - 95, ey - 20)} S${P(ex - 40, ey)} ${P(ex, ey)}`,
              head: `M${P(ex - 12, ey - 7)} L${P(ex, ey)} L${P(ex - 12, ey + 7)}`,
            });
          } else {
            const tgt = ph2 || ph1;
            out.push({ d: wiggle(sx, sy, tgt.r - tgt.w * 0.22, tgt.t + 6) });
          }
        }
      }
      setPaths(out);
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(wrap);
    document.fonts?.ready.then(build);
    window.addEventListener("load", build);
    return () => { ro.disconnect(); window.removeEventListener("load", build); };
  }, [wrapRef, steps]);
  return paths;
}

/* ───────────── page ───────────── */
export default function HowWeMakeIt() {
  const root = useRef(null);
  const trailWrap = useRef(null);
  useScrollVars(root);
  useReveal(root);
  const trail = useTrail(trailWrap, STEPS.length);
  const [activeMaki, setActiveMaki] = useState(null);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main ref={root} className={s.page}>
      {/* ───── Top navigation directly on the paper grid ───── */}
      <header className={s.topNav}>
        <nav className={s.navLeft}>
          <a href="#process" className={s.navLink}>PROCESS</a>
          <a href="#pickles" className={s.navLink}>PICKLES</a>
          <a href="#podis" className={s.navLink}>PODIS</a>
        </nav>
        <nav className={s.navRight}>
          <a href="#contact" className={s.navLink}>CONTACT</a>
        </nav>
      </header>

      {/* ═════ 1 + 2 · HERO and TIMELINE with dashed connectors ═════ */}
      <div ref={trailWrap} className={s.trailWrap}>
        <svg className={s.trail} aria-hidden="true">
          {trail.map((p, k) => (
            <g key={k}>
              <path d={p.d} />
              {p.head && <path className={s.trailHead} d={p.head} />}
              {p.dot && <circle className={s.trailDot} cx={p.dot[0]} cy={p.dot[1]} r="2.6" />}
            </g>
          ))}
        </svg>

        {/* 1 · HERO */}
        <section id="process" className={s.hero} data-rv>
          <img src="/images/sushi-curve.svg" alt="" className={s.sushiCurve} aria-hidden="true" />
          <span className={`${s.script} ${s.hFrom} ${s.rv}`} data-a="hFrom">from the farm .</span>
          <span className={`${s.script} ${s.hTo} ${s.rv} ${s.d2}`} data-a="hTo">to your jar</span>
          <h1 className={`${s.cond} ${s.heroTitle} ${s.rv} ${s.d1}`}>HOW WE<br />MAKE IT</h1>
          <div className={`${s.h1Wrap} ${s.rp} ${s.d1}`} data-a="h1">
            <Pol src="/images/process/orchard-harvest.jpg" cls={s.h1Card} i={0} />
            <img src="/images/cutouts/avakaya-piece.png" alt="Avakaya piece" className={s.h1Popout} />
          </div>
          <Pol src="/images/process/sun-drying.jpg" cls={s.h2} d={s.d2} i={1} a="h2" />
          <Pol src="/images/process/stone-grinding.jpg" cls={s.h3} d={s.d3} i={2} a="h3" />
        </section>

        {/* 2 · TIMELINE PROCESS STEPS */}
        <div className={s.timeline}>
          {STEPS.map((st, i) => {
            const flip = i % 2 === 1;
            const first = i === 0;

            if (st.isPresent) {
              return (
                <section key={st.t} className={`${s.era} ${s.eraPresent}`} data-rv>
                  <div className={s.presentText}>
                    <div className={`${s.eraHead} ${s.rv}`}>
                      <h2 className={`${s.cond} ${s.eraTitle}`}>
                        <span className={s.titleText} data-a={`e${i}t`}>{st.t}</span>
                      </h2>
                    </div>
                    <p className={`${s.small} ${s.eraBody} ${s.rv} ${s.d2}`}>{st.b}</p>
                  </div>
                  <div className={s.presentMedia}>
                    <div className={s.yummyWrap} data-a={`e${i}p1`}>
                      <span className={s.yummyScript}>{st.note || "pure!"}</span>
                      <StarSpark style={{ position: "absolute", left: "-42px", top: "12px" }} size={28} />
                      <StarSpark style={{ position: "absolute", left: "-20px", top: "54px" }} size={16} />
                      <StarSpark style={{ position: "absolute", right: "-32px", top: "-10px" }} size={24} />
                      <StarSpark style={{ position: "absolute", right: "14px", bottom: "35px" }} size={20} />
                      <img src={st.cut} alt="Adhvaitha Pickle Jar" className={s.presentRoll} />
                    </div>
                  </div>
                </section>
              );
            }

            return (
              <section key={st.t} className={`${s.era} ${flip ? s.eraFlip : ""} ${first ? s.eraFirst : ""}`} data-rv>
                <div className={s.eraMedia}>
                  <Pol src={st.p1} cls={s.e1} i={i} a={`e${i}p1`} />
                  {!flip && st.p2 && <Pol src={st.p2} cls={s.e2} d={s.d2} i={i + 2} a={`e${i}p2`} />}
                  {!first && st.cut && <img src={st.cut} alt="" className={s.eraCut} />}
                  {flip && <Burst style={{ left: "26%", top: 40 }} flip />}
                  {first && (
                    <div className={`${s.nativeAbs} ${s.rv} ${s.d3}`} data-a="e0kanji">
                      <div className={s.kanjiBig}>{st.te}</div>
                      <div className={`${s.cond} ${s.nativeLab}`}>{st.lab}</div>
                    </div>
                  )}
                </div>
                <div className={s.eraText}>
                  {first && st.cut && (
                    <img src={st.cut} alt="" className={s.era1Temaki} />
                  )}
                  <div className={`${s.eraHead} ${s.rv}`}>
                    {first && <span className={s.dot} data-a="e0dot" />}
                    <h2 className={`${s.cond} ${s.eraTitle}`}>
                      <span className={s.titleText} data-a={`e${i}t`}>{st.t}</span>
                    </h2>
                  </div>
                  <p className={`${s.small} ${s.eraBody} ${s.rv} ${s.d2}`}>{st.b}</p>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* ═════ 3 · 4 · 5 · pinned title + stacking cards ═════ */}
      <div id="pickles" className={s.stack} data-p>
        <section className={s.typesHero}>
          <Pol src="/images/process/sun-drying.jpg" cls={s.t1} i={1} />
          <Pol src="/images/ing_chili.png" cls={s.t2} i={3} />
          <Pol src="/images/process/stone-grinding.jpg" cls={s.t3} i={5} />
          <Dash style={{ left: "4vw", top: "4vh", width: "92vw", height: "90vh" }} d="M0 80 C 120 10, 220 160, 340 80 S 460 140, 520 40 M 60 360 C 160 260, 340 340, 480 240" />
          <h2 className={`${s.cond} ${s.typesTitle}`}><span>OUR</span><span>PICKLES</span></h2>
          <img src="/images/real_coriander_cutout.png" alt="" className={s.typesBowl} />
          <img src="/images/cutouts/chilli.png" alt="" className={s.typesOshi} />
        </section>

        {/* Card A: AVAKAYA */}
        <article className={`${s.card} ${s.cardA}`} data-p>
          <div className={s.cardText}>
            <div className={s.cardAKicker}>THE QUEEN OF ALL PICKLES</div>
            <div className={s.kanjiWhiteRed}>AVAKAYA</div>
            <div className={s.sushiTag}>
              <span>HERITAGE RECIPE</span>
              <img src="/images/cutouts/mango.png" alt="" className={s.tagNigiri} />
              <span>MANGO PICKLE</span>
            </div>
            <p className={s.cardABody}>
              the crown jewel of Andhra kitchens. Crisp green raw mango cubes with shell intact, sun-dried Guntur red chilli powder, stone-ground mustard, garlic cloves, and fragrant cold-pressed sesame oil. Aged in traditional ceramic jaadis until the heat turns deep and mellow.
            </p>
          </div>
          <div className={s.cardMedia}>
            <Pol src="/images/process/avakaya-jar.jpg" cls={s.c1} i={0} />
            <Pol src="/images/process/sun-drying.jpg" cls={s.c2} i={6} />
            <img src="/images/cutouts/avakaya-piece.png" alt="" className={s.nigiriPopout} />
          </div>
          <img src="/images/card1/flower-1.svg" alt="" className={s.flowerDoodle1} />
          <img src="/images/card1/flower-2.svg" alt="" className={s.flowerDoodle2} />
          <img src="/images/card1/flower-3.svg" alt="" className={s.flowerDoodle3} />
        </article>

        {/* Card B: GONGURA */}
        <article className={`${s.card} ${s.cardB}`} data-p>
          <div className={s.cardMedia}>
            <Pol src="/images/process/gongura-bowl.jpg" cls={s.c1B} i={1} />
            <Pol src="/images/ing_leaves.png" cls={s.c2B} i={2} />
            <img src="/images/card2/ticks-top.svg" alt="" className={s.ticksTop} />
            <img src="/images/card2/ticks-bottom.svg" alt="" className={s.ticksBottom} />
          </div>
          <div className={s.cardText}>
            <div className={s.cardAKicker}>ANDHRA&apos;S CULTURAL PRIDE</div>
            <div className={s.kanjiWhiteRed}>GONGURA</div>
            <div className={s.cardBTag}><span>ANDHRA PRIDE</span><span>SORREL LEAF PICKLE</span></div>
            <p className={s.cardBBody}>
              tender red-stem sorrel leaves, sautéed slowly in wood-pressed til oil with smashed garlic, whole dry red chilies, and aromatic roasted fenugreek. Tangy, earthy, fiery, and deeply comforting when mixed with steaming hot rice and pure country cow ghee.
            </p>
          </div>
        </article>
        <div className={s.stackTail} />
      </div>

      {/* ═════ 6 · ORANGE photo + TRADITIONAL PREPARATION ═════ */}
      <section className={s.orange} data-p>
        <div className={s.bigShot}>
          <img src="/images/process/heritage-spread.jpg" alt="Adhvaitha Kitchen Spread" />
          <HollowStar style={{ position: "absolute", left: -46, top: "35%" }} size={38} />
          <HollowStar style={{ position: "absolute", left: -22, top: "52%" }} size={16} />
          <HollowStar style={{ position: "absolute", right: -46, top: "25%" }} size={42} />
          <HollowStar style={{ position: "absolute", right: -55, top: "58%" }} size={20} />
        </div>

        <div className={s.makiDetails}>
          <div className={s.makiLeft}>
            <div className={s.makiKicker}>HEIRLOOM PROCESS</div>
            <div className={s.makiKanji}>TRADITION</div>
            <div className={s.makiTag}>
              <span>AUTHENTIC METHOD</span>
              <img src="/images/cutouts/mango.png" alt="" className={s.makiTagIcon} />
              <span>HANDMADE BATCHES</span>
            </div>
          </div>
          <div className={s.makiArrowWrap}>
            <img src="/images/makizushi/arrow-dashed.svg" alt="" className={s.makiArrow} />
          </div>
          <div className={s.makiRight}>
            <p className={s.makiBody}>
              Every batch honors Ammayya’s authentic 1970 recipe. We do not use commercial vinegar, preservatives, or artificial food colors. From slow stone-grinding on granite slabs to wooden-pressed sesame oil infusion, each jar represents pure culinary devotion.
            </p>
          </div>
        </div>
      </section>

      {/* ═════ 7 · PODI TYPES ═════ */}
      <section id="podis" className={s.makiTypesSection} onMouseLeave={() => setActiveMaki(null)}>
        {/* Top-right description text */}
        <div className={s.makiTypesTopDesc}>
          <p className={s.makiTypesTopDescText}>
            Stone-pounded lentils, roasted cumin, fiery dry chilies, and fresh curry leaves. Add a heaping spoonful over steaming hot rice, pour fragrant golden cow ghee, and mix with bare fingers.
          </p>
        </div>

        {/* Hover hint centered above the giant title */}
        <div className={s.hoverSushiHint}>HOVER THE PODI TO DISCOVER</div>

        {/* Giant Title */}
        <h2 className={s.makiTypesTitle}>PODI VARIETIES</h2>

        {/* Spotlight Card at top-left (visible when podi hovered) */}
        {activeMaki !== null && (
          <div className={s.spotlightCard}>
            <div className={s.popKicker}>{PODI_TYPES[activeMaki].name}</div>
            <div className={s.popKanji}>{PODI_TYPES[activeMaki].kanji}</div>
            <div className={s.popTag}>
              <span>{PODI_TYPES[activeMaki].tagA}</span>
              <span>{PODI_TYPES[activeMaki].tagB}</span>
            </div>
            <p className={s.popText}>{PODI_TYPES[activeMaki].desc}</p>
          </div>
        )}

        {/* 4 Podi cutouts with labels */}
        <div className={s.makiTypesRow}>
          {PODI_TYPES.map((podi, i) => (
            <div
              key={podi.id}
              className={`${s.makiItem} ${activeMaki === i ? s.makiItemActive : ""}`}
              onMouseEnter={() => setActiveMaki(i)}
              onMouseOver={() => setActiveMaki(i)}
              onClick={() => setActiveMaki(i)}
              onFocus={() => setActiveMaki(i)}
              tabIndex={0}
              role="button"
              aria-label={podi.name}
            >
              <div className={s.makiImgWrap}>
                <img
                  className={s.makiItemImg}
                  src={podi.img}
                  alt={podi.name}
                />
              </div>
              <span className={s.makiItemLabel}>{podi.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═════ 8 · SPLIT red / cream (NIMMAKAYA & ALLAM AVAKAYA) ═════ */}
      <section className={s.split} data-p>
        {/* Left half: NIMMAKAYA */}
        <div className={`${s.half} ${s.halfRed}`}>
          <div className={s.splitKickerWhite}>SALT-CURED CITRUS</div>
          <div className={s.oshiKanji}>NIMMAKAYA</div>
          <div className={s.splitTagWhite}>
            <span>SALT-CURED</span>
            <img src="/images/cutouts/rice-bowl.png" alt="" className={s.splitCutoutOshi} />
            <span>LIME PICKLE</span>
          </div>
          <p className={s.splitDescWhite}>
            Juicy thin-skinned yellow limes steeped in their own pressed juice and rock salt until soft and golden, then tempered with fiery red chilli powder and roasted fenugreek. Aged 30 days for maximum digestion and flavor.
          </p>
          <div className={s.halfMedia}>
            <div className={`${s.splitPolWrap} ${s.s1}`}>
              <div className={s.polaroidCard}>
                <img src="/images/tab1_natural.png" alt="Lemon curing" className={s.polaroidImg} />
              </div>
            </div>
            <div className={`${s.splitPolWrap} ${s.s2}`}>
              <div className={s.polaroidCard}>
                <img src="/images/ing_salt.png" alt="Himalayan rock salt" className={s.polaroidImg} />
              </div>
            </div>
            <Flower style={{ position: "absolute", left: "44%", top: -34, color: "#FFFFFF" }} size={30} />
            <Flower style={{ position: "absolute", left: "-2%", top: "42%", color: "#FFFFFF" }} size={22} />
            <Flower style={{ position: "absolute", left: "52%", bottom: -30, color: "#FFFFFF" }} size={26} />
          </div>
        </div>

        {/* Right half: ALLAM AVAKAYA */}
        <div className={`${s.half} ${s.halfCream}`}>
          <div className={s.splitKickerRed}>SWEET, TART & PUNGENT</div>
          <div className={s.inariKanji}>ALLAM AVAKAYA</div>
          <div className={s.splitTagRed}>
            <span>FRESH GINGER</span>
            <img src="/images/cutouts/mango.png" alt="Mango" className={s.splitCutoutInari} />
            <span>ALLAM AVAKAYA</span>
          </div>
          <p className={s.splitDescRed}>
            Stone-ground fresh root ginger combined with tart mango cubes, organic sugarcane jaggery syrup, and tamarind pulp. Sweet on the tip of the tongue, fiery on the finish, and comforting with every meal.
          </p>
          <div className={s.halfMedia}>
            <div className={`${s.splitPolWrap} ${s.s1}`}>
              <div className={`${s.polaroidCard} ${s.inariPolCard1}`}>
                <img src="/images/process/avakaya-jar.jpg" alt="Mixing ginger" className={s.polaroidImg} />
              </div>
            </div>
            <div className={`${s.splitPolWrap} ${s.s2}`}>
              <div className={`${s.polaroidCard} ${s.inariPolCard2}`}>
                <img src="/images/products/allam-avakaya-real.jpg" alt="Allam Avakaya Jar" className={s.polaroidImg} />
              </div>
            </div>
            <Ticks style={{ position: "absolute", left: "44%", top: -36 }} />
            <Ticks style={{ position: "absolute", left: "46%", bottom: -20 }} flip />
          </div>
        </div>
      </section>

      {/* ═════ 9 · CENTRED feature (SAVOURIES) ═════ */}
      <section className={s.feature} data-rv>
        <div className={`${s.cond} ${s.chirashiKicker} ${s.rv}`}>CRUNCHY & NOSTALGIC</div>
        <div className={`${s.chirashiKanji} ${s.rv}`}>SAVOURIES</div>
        <div className={`${s.rv} ${s.d1}`} style={{ display: "flex", justifyContent: "center" }}>
          <div className={s.chirashiTag}>
            <span>TIMELESS RECIPES</span>
            <Spark style={{ position: "static", color: "#C90505" }} size={22} />
            <span>ANDHRA SNACKS</span>
          </div>
        </div>
        <div className={`${s.featPol} ${s.rv} ${s.d2}`}>
          <img src="/images/process/savouries-platter.jpg" alt="Andhra Snacks spread" />
          <p className={s.cap}>
            Hand-rolled ribbon pakoda, crunchy janthukalu, sun-crisped chips, and traditional chakinalu made with stone-ground rice flour.
          </p>
        </div>
        <Dash style={{ left: "12vw", top: "14vh", width: "24vw", height: "60vh" }}
          d="M320 0 C 40 10, -20 140, 120 200 S 360 220, 300 300" arrow="M282 284 L300 302 L304 276" />
        <Dash style={{ right: "10vw", top: "28vh", width: "24vw", height: "55vh" }}
          d="M0 40 C 300 0, 420 120, 330 210 S 220 300, 160 296" arrow="M180 284 L158 297 L182 306" />
        <Spark style={{ left: "28vw", top: "54vh", color: "#C90505" }} size={20} />
        <Spark style={{ right: "26vw", top: "36vh", color: "#C90505", animationDelay: ".8s" }} size={32} />
        <Spark style={{ right: "28vw", top: "48vh", color: "#C90505", animationDelay: "1.3s" }} size={20} />
      </section>

      {/* ═════ 10 · SNACKS & SWEETS ═════ */}
      <section id="snacks" className={s.duo} data-p>
        <h2 className={`${s.cond} ${s.duoTitle}`}>SNACKS & SWEETS</h2>
        <div className={s.duoCards}>
          {/* Card A: POTATO CHIPS */}
          <div className={`${s.duoCard} ${s.duoA}`}>
            <div className={s.edomaeKicker}>CRUNCHY DELIGHT</div>
            <div className={s.edomaeHeader}>
              <div className={s.edomaeKanji}>
                <div className={s.edomaeKanjiLine1}>CRISPY</div>
                <div className={s.edomaeKanjiLine2}>POTATO CHIPS</div>
              </div>
              <p className={s.edomaeDesc}>
                Thin-sliced farm-fresh potatoes flash-fried to light, golden crunch and dusted with Himalayan rock salt and Kashmiri mild chilli.
              </p>
            </div>
            <div className={s.duoTag}>
              <span>GOLDEN POTATO</span>
              <span>CRISPY CHIPS</span>
            </div>
            <div className={s.edomaeMedia}>
              <div className={`${s.polaroidCard} ${s.edomaePol1}`}>
                <img src="/images/products/allu-chips-real.jpg" alt="Allu chips" className={s.polaroidImg} />
              </div>
              <div className={`${s.polaroidCard} ${s.edomaePol2}`}>
                <img src="/images/real_chips_cutout.png" alt="Crispy chips" className={s.polaroidImg} style={{ objectFit: 'contain' }} />
              </div>
            </div>
          </div>

          {/* Card B: SUNNUNDALU & LADDUS */}
          <div className={`${s.duoCard} ${s.duoB}`}>
            <div className={s.gomokuKicker}>WHOLESOME HEIRLOOM SWEETS</div>
            <div className={s.gomokuKanji}>SUNNUNDALU</div>
            <div className={s.gomokuTag}>
              <span>COUNTRY COW GHEE</span>
              <span>URAD DAL & JAGGERY</span>
            </div>
            <p className={s.gomokuDesc}>
              Roasted whole urad dal stone-ground with mineral-rich organic bellam (jaggery) and drenched in fragrant country cow ghee.
            </p>
            <div className={s.gomokuMedia}>
              <div className={`${s.polaroidCard} ${s.gomokuPol}`}>
                <img src="/images/products/sunnunda-laddu-real.jpg" alt="Sunnundalu" className={s.polaroidImg} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════ 11 · FOOTER ═════ */}
      <section id="contact" className={s.foot} data-p>
        <div className={s.footInner}>
          <div className={s.footMain}>
            <h2 className={`${s.cond} ${s.outline}`}>WANT SOME PICKLE?</h2>
            <div className={`${s.cond} ${s.footBig}`}>ADHVAITHA FOODS · SINCE 1970</div>
            <p className={s.footSmall}>North East Colony, Yadadri Bhuvanagiri 508284 · Mon–Sun 9AM–6PM</p>
            <nav className={`${s.links} ${s.cond}`}>
              <Link href="/products">SHOP</Link>
              <a href="https://wa.me/919393934200" target="_blank" rel="noreferrer">WHATSAPP</a>
              <a href="tel:+919393934200">CALL</a>
              <a href="https://instagram.com/adhvaithafoods" target="_blank" rel="noreferrer">INSTAGRAM</a>
            </nav>
          </div>
          <div className={s.footPhoto}>
            <div className={s.footPol}>
              <img src="/images/grandmother_kitchen.png" alt="Ammayya's Kitchen" className={s.footPolImg} />
            </div>
            <img src="/images/cutouts/jar.png" alt="Adhvaitha Pickle Jar" className={s.footCut} />
          </div>
        </div>
      </section>

      {showTopBtn && (
        <button className={s.toTop} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><path d="M6 15l6-6 6 6" /></svg>
        </button>
      )}
    </main>
  );
}
