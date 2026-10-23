'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './HowWeMakeItScrapbook.module.css';

/* 11 Screens fine-tuned to match https://sushi-history.tilda.ws/#contacts */
export default function HowWeMakeItScrapbook() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.page}>
      {/* ===== 1. HERO ("HOW WE MAKE IT" + scattered polaroids overlapping title) ===== */}
      <section className={styles.hero}>
        <span className={`${styles.script} ${styles.hFrom}`}>from the farm .</span>
        <span className={`${styles.script} ${styles.hTo}`}>to your jar</span>

        <h1 className={`${styles.cond} ${styles.heroTitle}`}>
          HOW WE<br />MAKE IT
        </h1>

        {/* Scattered polaroids: right on top of title edges as in recording */}
        <div className={`${styles.pol} ${styles.h1}`}>
          <img src="/images/andhra_farms.png" alt="Andhra Farms" className={styles.ph} style={{ '--c': '#8FA382' }} />
          <div className={styles.cap}>Guntur red chilli harvest</div>
        </div>

        <div className={`${styles.pol} ${styles.h2}`}>
          <img src="/images/tab2_drying.png" alt="Sun drying mangoes" className={styles.ph} style={{ '--c': '#E6BA7E' }} />
          <div className={styles.cap}>Rooftop terrace sun-drying</div>
        </div>

        <div className={`${styles.pol} ${styles.h3}`}>
          <img src="/images/Stone_Grind.png" alt="Stone Grinding" className={styles.ph} style={{ '--c': '#DCA783' }} />
          <div className={styles.cap}>Stone ground daily at dawn</div>
        </div>

        <div className={`${styles.pol} ${styles.h4}`}>
          <img src="/images/Mixing.png" alt="Hand Mixing" className={styles.ph} style={{ '--c': '#E39371' }} />
          <div className={styles.cap}>Hand-mixing in sesame oil</div>
        </div>

        <div className={`${styles.pol} ${styles.h5}`}>
          <img src="/images/Hand-packing.png" alt="Glass Jars" className={styles.ph} style={{ '--c': '#C87455' }} />
          <div className={styles.cap}>Sealed in glass jars only</div>
        </div>

        {/* Cutouts & Doodles */}
        <img src="/images/flat_mango.png" alt="" className={`${styles.cut} ${styles.hc1}`} />
        <img src="/images/flat_chili.png" alt="" className={`${styles.cut} ${styles.hc2}`} />

        <Sparkle style={{ left: '12vw', top: '16vh', width: 28 }} />
        <Sparkle style={{ right: '12vw', top: '22vh', width: 34 }} />
        <Flower style={{ right: '8vw', top: '68vh', width: 44 }} />
      </section>

      {/* ===== 2. TIMELINE (Eras without step numbers/pills; big Telugu word under photos; cutouts alongside) ===== */}
      <section className={styles.timeline}>
        {/* Step 1: SOURCING (Starts with red dot + big native word under photos) */}
        <div className={styles.era}>
          <div>
            <div className={styles.eraHead}>
              <span className={styles.dot} />
              <h2 className={`${styles.cond} ${styles.eraTitle}`}>SOURCING</h2>
            </div>
            <div className={`${styles.small} ${styles.eraBody}`}>
              Every batch starts with handpicked raw green mangoes with the sharpest tartness from Guntur orchards, fresh tangy sorrel (gongura) from Kurnool, and peak sun-dried red chilies.
            </div>
          </div>
          <div className={styles.eraMedia}>
            <div className={`${styles.pol} ${styles.e1}`}>
              <img src="/images/andhra_farms.png" alt="Farms" className={styles.ph} style={{ '--c': '#8DA382' }} />
              <div className={styles.cap}>Partner orchards in Andhra</div>
            </div>
            <div className={`${styles.pol} ${styles.e2}`}>
              <img src="/images/ing_mango.png" alt="Raw Mango" className={styles.ph} style={{ '--c': '#E0BD79' }} />
              <div className={styles.cap}>Unblemished green mangoes</div>
            </div>
            <img src="/images/flat_mango.png" alt="" className={`${styles.cut} ${styles.eraCut}`} />
            {/* Big native word sitting under photos like Japanese kanji */}
            <div className={styles.nativeAbs}>
              <div className={`${styles.te} ${styles.nativeBig}`}>సేకరణ</div>
              <div className={styles.nativeLab}>Direct from Andhra Farms</div>
            </div>
            <span className={`${styles.script} ${styles.note}`} style={{ right: '10%', top: '-20px' }}>fresh!</span>
          </div>
        </div>

        {/* Step 2: STONE-GRIND (Flipped) */}
        <div className={`${styles.era} ${styles.eraFlip}`}>
          <div>
            <div className={styles.eraHead}>
              <h2 className={`${styles.cond} ${styles.eraTitle}`}>STONE-GRIND</h2>
            </div>
            <div className={`${styles.small} ${styles.eraBody}`}>
              At dawn, the granite grinding stones grind whole mustard seeds, fenugreek, and Guntur red chilies. No factory powders. The slow cold stone grinding preserves essential aroma and natural spice oils.
            </div>
          </div>
          <div className={styles.eraMedia}>
            <div className={`${styles.pol} ${styles.e1}`}>
              <img src="/images/Stone_Grind.png" alt="Stone Grind" className={styles.ph} style={{ '--c': '#BCA28B' }} />
              <div className={styles.cap}>Heavy granite grinding slab</div>
            </div>
            <div className={`${styles.pol} ${styles.e2}`}>
              <img src="/images/ing_mustard.png" alt="Mustard & Spices" className={styles.ph} style={{ '--c': '#DCAE6C' }} />
              <div className={styles.cap}>Aromatic roasted mustard</div>
            </div>
            <img src="/images/flat_coriander.png" alt="" className={`${styles.cut} ${styles.eraCut}`} />
            <span className={`${styles.script} ${styles.note}`} style={{ left: '10%', top: '-20px' }}>aroma!</span>
          </div>
        </div>

        {/* Step 3: WASH & PREP */}
        <div className={styles.era}>
          <div>
            <div className={styles.eraHead}>
              <h2 className={`${styles.cond} ${styles.eraTitle}`}>WASH &amp; CUT</h2>
            </div>
            <div className={`${styles.small} ${styles.eraBody}`}>
              Washed with spring water, wiped clean with organic muslin cloths, and hand-cut into perfect bite-sized cubes with shell intact. Precise cuts ensure spices penetrate deep into the pulp.
            </div>
          </div>
          <div className={styles.eraMedia}>
            <div className={`${styles.pol} ${styles.e1}`}>
              <img src="/images/Washing_Prep.png" alt="Washing and Prep" className={styles.ph} style={{ '--c': '#A4B494' }} />
              <div className={styles.cap}>Fresh washing &amp; wiping</div>
            </div>
            <div className={`${styles.pol} ${styles.e2}`}>
              <img src="/images/ing_garlic_real.png" alt="Fresh garlic" className={styles.ph} style={{ '--c': '#E6DCC8' }} />
              <div className={styles.cap}>Hand-peeled garlic cloves</div>
            </div>
            <img src="/images/flat_garlic.png" alt="" className={`${styles.cut} ${styles.eraCut}`} />
            <span className={`${styles.script} ${styles.note}`} style={{ right: '15%', top: '10px' }}>clean!</span>
          </div>
        </div>

        {/* Step 4: SUN DRYING (Flipped) */}
        <div className={`${styles.era} ${styles.eraFlip}`}>
          <div>
            <div className={styles.eraHead}>
              <h2 className={`${styles.cond} ${styles.eraTitle}`}>SUN DRYING</h2>
            </div>
            <div className={`${styles.small} ${styles.eraBody}`}>
              Sun-curing on spotless white rooftop cotton sheets under open Andhra skies. Natural solar warmth evaporates excess moisture and seals authentic tartness naturally without artificial preservatives.
            </div>
          </div>
          <div className={styles.eraMedia}>
            <div className={`${styles.pol} ${styles.e1}`}>
              <img src="/images/tab2_drying.png" alt="Sun Drying" className={styles.ph} style={{ '--c': '#E8BE78' }} />
              <div className={styles.cap}>Open terrace rooftop sheets</div>
            </div>
            <div className={`${styles.pol} ${styles.e2}`}>
              <img src="/images/ing_chili.png" alt="Sun dried chilies" className={styles.ph} style={{ '--c': '#C84832' }} />
              <div className={styles.cap}>Guntur chilies sun-curing</div>
            </div>
            <img src="/images/flat_chili.png" alt="" className={`${styles.cut} ${styles.eraCut}`} />
            <span className={`${styles.script} ${styles.note}`} style={{ left: '12%', top: '-25px' }}>sun kissed!</span>
          </div>
        </div>

        {/* Step 5: HAND MIXING */}
        <div className={styles.era}>
          <div>
            <div className={styles.eraHead}>
              <h2 className={`${styles.cond} ${styles.eraTitle}`}>HAND MIXING</h2>
            </div>
            <div className={`${styles.small} ${styles.eraBody}`}>
              The sun-cured pieces meet pure cold-pressed wood-churned sesame (til) oil and Himalayan rock salt in ceramic jaadis. Gently massaged by hand so every single cube drinks in spice.
            </div>
          </div>
          <div className={styles.eraMedia}>
            <div className={`${styles.pol} ${styles.e1}`}>
              <img src="/images/Mixing.png" alt="Mixing" className={styles.ph} style={{ '--c': '#C65A34' }} />
              <div className={styles.cap}>Traditional ceramic blending</div>
            </div>
            <div className={`${styles.pol} ${styles.e2}`}>
              <img src="/images/ing_oil.png" alt="Sesame oil" className={styles.ph} style={{ '--c': '#DDA34E' }} />
              <div className={styles.cap}>Cold pressed til oil golden drizzle</div>
            </div>
            <img src="/images/flat_leaf.png" alt="" className={`${styles.cut} ${styles.eraCut}`} />
            <span className={`${styles.script} ${styles.note}`} style={{ right: '8%', top: '-15px' }}>yummy!</span>
          </div>
        </div>

        {/* Step 6: GLASS PACKING (Ends with arrow ➝ like PRESENT) */}
        <div className={`${styles.era} ${styles.eraFlip}`}>
          <div>
            <div className={styles.eraHead}>
              <h2 className={`${styles.cond} ${styles.eraTitle}`}>GLASS PACKING</h2>
              <span className={styles.arrow}>➝</span>
            </div>
            <div className={`${styles.small} ${styles.eraBody}`}>
              Poured into sparkling clean sterilized glass jars, crowned with a layer of pure cold-pressed oil, and capped tightly. Never packed in plastic to keep grandmother’s flavor untainted.
            </div>
          </div>
          <div className={styles.eraMedia}>
            <div className={`${styles.pol} ${styles.e1}`}>
              <img src="/images/Hand-packing.png" alt="Hand Packing" className={styles.ph} style={{ '--c': '#BA5234' }} />
              <div className={styles.cap}>Sterilized glass jar sealing</div>
            </div>
            <div className={`${styles.pol} ${styles.e2}`}>
              <img src="/images/Jaring.png" alt="Jaring" className={styles.ph} style={{ '--c': '#CF6742' }} />
              <div className={styles.cap}>Handcrafted kraft label tying</div>
            </div>
            <img src="/images/signature/avakaya.png" alt="" className={`${styles.cut} ${styles.eraCut}`} />
            <span className={`${styles.script} ${styles.note}`} style={{ left: '10%', top: '-20px' }}>sealed!</span>
          </div>
        </div>
      </section>

      {/* ===== 3. TYPES TITLE (Dark Red Hero) ===== */}
      <section className={styles.typesHero}>
        <div className={`${styles.pol} ${styles.t1}`}>
          <img src="/images/ing_mango.png" alt="" className={styles.ph} style={{ '--c': '#8FA382' }} />
        </div>
        <div className={`${styles.pol} ${styles.t2}`}>
          <img src="/images/ing_chili.png" alt="" className={styles.ph} style={{ '--c': '#B5121B' }} />
        </div>
        <div className={`${styles.pol} ${styles.t3}`}>
          <img src="/images/Stone_Grind.png" alt="" className={styles.ph} style={{ '--c': '#A37254' }} />
        </div>

        <h2 className={`${styles.cond} ${styles.typesTitle}`}>
          <span>OUR</span>
          <span>PICKLES</span>
        </h2>

        {/* Center Mango Cut-out across title gap */}
        <img src="/images/flat_mango.png" alt="Mango slice" className={`${styles.cut} ${styles.typesCutMid}`} />
        <img src="/images/flat_coriander.png" alt="Aromatic herb" className={`${styles.cut} ${styles.typesCutBowl}`} />
        <img src="/images/flat_chili.png" alt="Guntur chilli" className={`${styles.cut} ${styles.typesCutR}`} />
      </section>

      {/* ===== 4 & 5. TILTED CREAM & PINK PANELS ===== */}
      <section className={styles.panelWrap}>
        {/* Screen 4: Tilted Cream Panel (Avakaya) */}
        <div className={styles.panel}>
          <div>
            <div className={styles.kicker}>THE QUEEN OF ALL PICKLES</div>
            <div className={`${styles.te} ${styles.pTe}`}>ఆవకాయ</div>
            <div className={styles.tag}>
              <span>FROM TELUGU</span>
              <span className={styles.tagIcon} />
              <span>MANGO PICKLE</span>
            </div>
            <p className={`${styles.small} ${styles.eraBody}`}>
              Cut green raw mango, sun-dried Guntur red chilli powder, stone-ground mustard, garlic cloves, and fragrant cold-pressed sesame oil. Aged until the heat turns deep and sweet.
            </p>
          </div>
          <div className={styles.pMedia}>
            <div className={`${styles.pol} ${styles.p1}`}>
              <img src="/images/signature/avakaya.png" alt="Avakaya" className={styles.ph} style={{ '--c': '#F15A29', objectFit: 'contain' }} />
              <div className={styles.cap}>Avakaya Mango Pickle</div>
            </div>
            <div className={`${styles.pol} ${styles.p2}`}>
              <img src="/images/tab2_drying.png" alt="Terrace" className={styles.ph} style={{ '--c': '#E6BA7E' }} />
              <div className={styles.cap}>7 Days Sun-Kissed</div>
            </div>
            <Flower style={{ right: '4%', top: '10px', width: 42 }} />
          </div>
        </div>

        {/* Screen 5: Tilted Pink Panel (Gongura) */}
        <div className={`${styles.panel} ${styles.panelPink}`}>
          <div>
            <div className={styles.kicker}>ANDHRA&apos;S CULTURAL IDENTITY</div>
            <div className={`${styles.te} ${styles.pTe}`}>గోంగూర</div>
            <div className={styles.tag}>
              <span>FROM ANDHRA</span>
              <span className={styles.tagIcon} style={{ background: '#2E6930' }} />
              <span>SORREL LEAF PICKLE</span>
            </div>
            <p className={`${styles.small} ${styles.eraBody}`}>
              Tender red-stem sorrel leaves, sautéed slowly in wood-pressed til oil with smashed garlic, whole dry red chilies, and aromatic fenugreek. Tangy, earthy, fiery, and deeply comforting with warm rice and melted ghee.
            </p>
          </div>
          <div className={styles.pMedia}>
            <div className={`${styles.pol} ${styles.p1}`}>
              <img src="/images/signature/gongura.png" alt="Gongura" className={styles.ph} style={{ '--c': '#2E6930', objectFit: 'contain' }} />
              <div className={styles.cap}>Authentic Gongura Pachadi</div>
            </div>
            <div className={`${styles.pol} ${styles.p2}`}>
              <img src="/images/ing_leaves.png" alt="Sorrel leaves" className={styles.ph} style={{ '--c': '#86A369' }} />
              <div className={styles.cap}>Farm-plucked Gongura</div>
            </div>
            <Sparkle style={{ left: '4%', top: '20px', width: 34 }} />
          </div>
        </div>
      </section>

      {/* ===== 6. ORANGE FULL PHOTO SCREEN ===== */}
      <section className={styles.orangeShot}>
        <div className={styles.bigShot}>
          <img
            src="/images/Second_Generation.png"
            alt="Adhvaitha Kitchen Spread"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className={styles.cap} style={{ fontSize: '14px', marginTop: '12px' }}>
            The Adhvaitha feast spread — Grandma’s age-old recipe crafted for generations
          </div>
        </div>
      </section>

      {/* ===== 7. PODI INTRO + PODI TYPES (Interactive Hover) ===== */}
      <section className={styles.podi}>
        <div className={styles.podiIntro}>
          <div>
            <div className={styles.kicker}>THE SOUL OF SOUTH INDIAN LUNCH</div>
            <div className={`${styles.te} ${styles.pTe}`}>పొడులు</div>
            <div className={styles.tag}>
              <span>ROASTED &amp; GROUND</span>
              <span className={styles.tagIcon} />
              <span>GUNPOWDERS &amp; PODIS</span>
            </div>
          </div>
          <p className={styles.small} style={{ opacity: 0.9 }}>
            Stone-pounded lentils, roasted cumin, fiery dry chilies, and curry leaves. Add a heaping spoonful over steaming hot rice, pour fragrant golden cow ghee, and mix with bare fingers.
          </p>
        </div>

        <div className={styles.hoverHint}>— HOVER THE JAR TO DISCOVER —</div>

        <div className={styles.podiTypes}>
          <h2 className={`${styles.cond} ${styles.podiTitle}`}>PODI TYPES</h2>

          <div className={styles.items}>
            {/* Podi 1 */}
            <div className={styles.item} tabIndex={0}>
              <div className={styles.pop}>
                <div className={styles.kicker}>SPICE LEVEL: HIGH</div>
                <div className={`${styles.te} ${styles.popTe}`}>కందిపొడి</div>
                <div style={{ fontWeight: 700, fontSize: '18px', color: '#B5121B' }}>KANDI PODI</div>
                <p className={styles.small} style={{ marginTop: '6px' }}>Roasted Toor dal, red chilies, cumin, and sea salt. The quintessential Andhra gunpowder.</p>
              </div>
              <img src="/images/flat_coriander.png" alt="Kandi Podi" className={styles.itemImg} style={{ '--c': '#E69C24', padding: '14px' }} />
              <div className={`${styles.cond} ${styles.itemName}`}>KANDI PODI</div>
            </div>

            {/* Podi 2 */}
            <div className={styles.item} tabIndex={0}>
              <div className={styles.pop}>
                <div className={styles.kicker}>AROMATIC &amp; DIGESTIVE</div>
                <div className={`${styles.te} ${styles.popTe}`}>కరివేపాకు</div>
                <div style={{ fontWeight: 700, fontSize: '18px', color: '#B5121B' }}>KARIVEPAKU PODI</div>
                <p className={styles.small} style={{ marginTop: '6px' }}>Sun-dried fresh curry leaves roasted with black pepper and lentils. Rich in natural iron and aroma.</p>
              </div>
              <img src="/images/flat_leaf.png" alt="Curry Leaf Podi" className={styles.itemImg} style={{ '--c': '#43733A', padding: '14px' }} />
              <div className={`${styles.cond} ${styles.itemName}`}>KARIVEPAKU</div>
            </div>

            {/* Podi 3 */}
            <div className={styles.item} tabIndex={0}>
              <div className={styles.pop}>
                <div className={styles.kicker}>RICH &amp; EARTHY</div>
                <div className={`${styles.te} ${styles.popTe}`}>నువ్వుల పొడి</div>
                <div style={{ fontWeight: 700, fontSize: '18px', color: '#B5121B' }}>NUVVULA PODI</div>
                <p className={styles.small} style={{ marginTop: '6px' }}>Nutty roasted sesame seeds pounded with garlic cloves and red chilies. Hearty and warming.</p>
              </div>
              <img src="/images/signature/podi.png" alt="Nuvvula Podi" className={styles.itemImg} style={{ '--c': '#A3723D', padding: '10px' }} />
              <div className={`${styles.cond} ${styles.itemName}`}>NUVVULA PODI</div>
            </div>

            {/* Podi 4 */}
            <div className={styles.item} tabIndex={0}>
              <div className={styles.pop}>
                <div className={styles.kicker}>PUNGENT &amp; WARM</div>
                <div className={`${styles.te} ${styles.popTe}`}>వెల్లుల్లి పొడి</div>
                <div style={{ fontWeight: 700, fontSize: '18px', color: '#B5121B' }}>VELLULLI PODI</div>
                <p className={styles.small} style={{ marginTop: '6px' }}>Roasted whole garlic bulbs crushed with Guntur chili. The ultimate companion for idlis &amp; dosas.</p>
              </div>
              <img src="/images/flat_garlic.png" alt="Vellulli Podi" className={styles.itemImg} style={{ '--c': '#C87243', padding: '14px' }} />
              <div className={`${styles.cond} ${styles.itemName}`}>VELLULLI PODI</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 8. SPLIT RED / CREAM HALVES (Lemon vs Allam) ===== */}
      <section className={styles.split}>
        {/* Red Half: Lemon నిమ్మకాయ */}
        <div className={`${styles.half} ${styles.halfRed}`}>
          <div className={styles.kicker}>CITRUS TANG · AGED 30 DAYS</div>
          <div className={`${styles.te} ${styles.pTe}`}>నిమ్మకాయ</div>
          <div className={styles.tag}>
            <span>SALT-CURED</span>
            <span className={styles.tagIcon} />
            <span>NIMMAKAYA PICKLE</span>
          </div>
          <p className={`${styles.small} ${styles.eraBody}`} style={{ opacity: 0.9 }}>
            Juicy thin-skinned yellow limes steeped in their own pressed juice and rock salt until soft and golden, then tempered with fiery red chilli powder and roasted fenugreek.
          </p>
          <div className={styles.halfMedia}>
            <div className={`${styles.pol} ${styles.s1}`}>
              <img src="/images/tab1_natural.png" alt="Lemon Pickling" className={styles.ph} style={{ '--c': '#DDBB44' }} />
              <div className={styles.cap}>Aged in ceramic pots</div>
            </div>
            <div className={`${styles.pol} ${styles.s2}`}>
              <img src="/images/ing_salt.png" alt="Rock Salt" className={styles.ph} style={{ '--c': '#EFE4D6' }} />
              <div className={styles.cap}>Himalayan salt cure</div>
            </div>
          </div>
        </div>

        {/* Cream Half: Allam Avakaya అల్లం */}
        <div className={`${styles.half} ${styles.halfCream}`}>
          <div className={styles.kicker}>SWEET, TART &amp; PUNGENT</div>
          <div className={`${styles.te} ${styles.pTe}`}>అల్లం ఆవకాయ</div>
          <div className={styles.tag}>
            <span>FRESH GINGER &amp; JAGGERY</span>
            <span className={styles.tagIcon} />
            <span>ALLAM AVAKAYA</span>
          </div>
          <p className={`${styles.small} ${styles.eraBody}`}>
            Stone-ground fresh root ginger combined with tart mango cubes, organic sugarcane jaggery syrup, and tamarind pulp. Sweet on the tip of the tongue, fiery on the finish.
          </p>
          <div className={styles.halfMedia}>
            <div className={`${styles.pol} ${styles.s1}`}>
              <img src="/images/Mixing.png" alt="Allam Avakaya" className={styles.ph} style={{ '--c': '#C85A32' }} />
              <div className={styles.cap}>Stone ground fresh ginger</div>
            </div>
            <div className={`${styles.pol} ${styles.s2}`}>
              <img src="/images/cta_ingredients.png" alt="Spices" className={styles.ph} style={{ '--c': '#DC8B3E' }} />
              <div className={styles.cap}>Organic jaggery syrup</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 9. CENTRED FEATURE (Snacks చిరుతిళ్లు) with curved dashed arrows ===== */}
      <section className={styles.feature}>
        <div className={styles.kicker}>CRUNCHY &amp; NOSTALGIC</div>
        <div className={`${styles.te} ${styles.featTe}`}>చిరుతిళ్లు</div>
        <div className={`${styles.tag} ${styles.featTag}`}>
          <span>TIMELESS SAVOURIES</span>
          <span className={styles.tagIcon} />
          <span>ANDHRA SNACKS</span>
        </div>
        <p className={`${styles.small} ${styles.eraBody}`} style={{ margin: '14px auto 0' }}>
          Hand-rolled ribbon pakoda, crunchy murukku, sun-crisped potato chips, and traditional chakodis made with stone-ground rice flour and cold-pressed oil.
        </p>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div className={styles.featPol}>
            <div className={styles.ph} style={{ '--c': '#F4BA62' }}>
              <img src="/images/snacks.png" alt="Snacks" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className={styles.cap} style={{ fontSize: '13px' }}>
              Fresh evening snacks crafted every single batch
            </div>
          </div>

          {/* Curved dashed arrows pointing to polaroid */}
          <svg className={styles.dashCurve} style={{ left: '-120px', top: '40px', width: '100px', height: '80px' }} viewBox="0 0 100 80">
            <path d="M 10 70 Q 40 10 90 30" markerEnd="url(#arrowhead)" />
            <defs>
              <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#B5121B" />
              </marker>
            </defs>
          </svg>
        </div>

        <Flower style={{ left: '12vw', top: '22vh', width: 48 }} />
        <Sparkle style={{ right: '14vw', top: '35vh', width: 36 }} />
      </section>

      {/* ===== 10. GIANT "SNACKS & SWEETS" + TWO CARDS ===== */}
      <section className={styles.duo}>
        <h2 className={`${styles.cond} ${styles.duoTitle}`}>SNACKS &amp; SWEETS</h2>

        <div className={styles.duoCards}>
          {/* Card 1: Allu Chips */}
          <div className={styles.duoCard}>
            <div className={styles.kicker}>CRUNCHY DELIGHT</div>
            <div className={`${styles.te} ${styles.duoTe}`}>ఆలూ చిప్స్</div>
            <div className={styles.tag}>
              <span>GOLDEN POTATO</span>
              <span className={styles.tagIcon} />
              <span>CRISPY CHIPS</span>
            </div>
            <p className={`${styles.small} ${styles.eraBody}`}>
              Thin-sliced golden potatoes flash-fried to light, airy perfection and dusted with Himalayan rock salt and Kashmiri mild chilli.
            </p>
            <div className={styles.duoMedia}>
              <div className={`${styles.pol}`} style={{ left: '10%', top: '20px', width: '80%', height: '240px' }}>
                <img src="/images/flat_potato.png" alt="Potato chips" className={styles.ph} style={{ '--c': '#E6C15C', objectFit: 'contain' }} />
                <div className={styles.cap}>100% natural, crisp chips</div>
              </div>
            </div>
          </div>

          {/* Card 2: Millets Laddu */}
          <div className={styles.duoCard}>
            <div className={styles.kicker}>WHOLESOME NUTRITION</div>
            <div className={`${styles.te} ${styles.duoTe}`}>మిల్లెట్ లడ్డు</div>
            <div className={styles.tag}>
              <span>NUTRIENT DENSE</span>
              <span className={styles.tagIcon} style={{ background: '#7A0E14' }} />
              <span>MILLETS &amp; JAGGERY</span>
            </div>
            <p className={`${styles.small} ${styles.eraBody}`}>
              Ragi, foxtail and pearl millets slow-roasted in pure country cow ghee and bound with mineral-rich palm jaggery and chopped cashews.
            </p>
            <div className={styles.duoMedia}>
              <div className={`${styles.pol}`} style={{ left: '10%', top: '20px', width: '80%', height: '240px' }}>
                <img src="/images/signature/sweets.png" alt="Millets laddu" className={styles.ph} style={{ '--c': '#4E2B11', objectFit: 'contain' }} />
                <div className={styles.cap}>Hand-rolled wholesome laddus</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 11. FOOTER ("WANT SOME PICKLE?" + Outlined Title) ===== */}
      <footer className={styles.foot}>
        <h2 className={`${styles.cond} ${styles.outline}`}>WANT SOME PICKLE?</h2>

        <div className={`${styles.cond} ${styles.footBig}`}>
          ADHVAITHA FOODS · STRAIGHT FROM GRANDMOTHER&apos;S KITCHEN
        </div>

        <div className={styles.footSmall} style={{ maxWidth: '520px', marginTop: '12px', lineHeight: 1.6 }}>
          Handcrafted in traditional Andhra kitchens using stone-ground spices, sun-dried ingredients, and cold-pressed sesame oil. Since 1970.
        </div>

        {/* Polaroid in Footer */}
        <div className={`${styles.pol} ${styles.footPol}`}>
          <img src="/images/grandmother_kitchen.png" alt="Grandmother's kitchen" className={styles.ph} style={{ '--c': '#A35C3A' }} />
          <div className={styles.cap} style={{ fontSize: '13px' }}>
            Where every single recipe began · 1970
          </div>
        </div>

        {/* Jar cutout */}
        <img src="/images/signature/avakaya.png" alt="Pickle jar" className={`${styles.cut} ${styles.footCut}`} />

        {/* Direct Action Links */}
        <div className={styles.links}>
          <Link href="/products" className={styles.cond}>SHOP PICKLES</Link>
          <a href="https://wa.me/919988776655" target="_blank" rel="noopener noreferrer" className={styles.cond}>WHATSAPP US</a>
          <a href="tel:+919988776655" className={styles.cond}>CALL KITCHEN</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.cond}>INSTAGRAM</a>
          <Link href="/our-story" className={styles.cond}>OUR HERITAGE</Link>
        </div>
      </footer>

      {/* Floating Back-To-Top Button */}
      {showTopBtn && (
        <button
          type="button"
          onClick={scrollToTop}
          className={styles.toTop}
          aria-label="Back to Top"
        >
          ↑
        </button>
      )}
    </div>
  );
}

/* SVG Doodles */
function Sparkle({ style, className }) {
  return (
    <svg style={style} className={`${styles.spark} ${className || ''}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
    </svg>
  );
}

function Flower({ style, className }) {
  return (
    <svg style={style} className={`${styles.flower} ${className || ''}`} viewBox="0 0 100 100" fill="currentColor">
      <circle cx="50" cy="50" r="16" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <ellipse key={deg} cx="50" cy="22" rx="10" ry="18" transform={`rotate(${deg} 50 50)`} opacity="0.85" />
      ))}
    </svg>
  );
}
