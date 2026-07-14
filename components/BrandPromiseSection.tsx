/**
 * BrandPromiseSection — Builder-Spec 2026-07
 * ------------------------------------------
 * Violetter Balken (#7C3AED) zwischen Designer und Gallery.
 * Höhe 600px auf 1440-Design, skaliert responsive.
 *
 *   BRAND PROMISE                     ← PP Hatton Italic 72pt, weiß
 *   LIFECHANGING
 *          SMILES.                    ← Loos ExtraWide 700 132pt, 2. Zeile ~700px
 *   Schmuck, der im Kopf bleibt.      ← PP Hatton Italic 30pt, weiß
 */

export default function BrandPromiseSection() {
  return (
    <section
      data-nav-tone="light"
      className="bg-cc-purple text-cc-white w-full flex items-center"
      style={{
        // 600px auf 1440, aber mind. ~460px auf Mobile
        minHeight: "clamp(28rem, 41.6vw, 37.5rem)",
        paddingTop: "clamp(3.5rem, 5vw, 4.375rem)" /* 70px */,
        paddingBottom: "clamp(3.5rem, 5vw, 4.375rem)",
        paddingRight: "clamp(1.5rem, 14.6vw, 13.125rem)" /* 210px eingerückt von rechts */,
      }}
    >
      <div className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto w-full">
        {/* Section-Label — 20px nach rechts */}
        <p
          className="font-hatton-i text-cc-white"
          style={{
            fontSize: "clamp(1.75rem, 5vw, 4.5rem)" /* 28 → 72px */,
            paddingLeft: "20px",
          }}
        >
          Brand Promise
        </p>

        {/* Zweizeilige HL: "LIFECHANGING / SMILES." — 2. Zeile 720px (Spec 700 + 20) */}
        <h2
          className="headline-lg mt-4 md:mt-6"
          style={{ fontSize: "clamp(3rem, 9.2vw, 8.25rem)" /* 48 → 132px */ }}
        >
          Lifechanging
          <br />
          <span
            className="inline-block"
            style={{ paddingLeft: "clamp(6rem, 50vw, 45rem)" /* 96 → 720px (+20 vom Original) */ }}
          >
            Smiles.
          </span>
        </h2>

        {/* Subline — nach ganz rechts (rechtsbündig) */}
        <p
          className="font-hatton-i text-cc-white text-right mt-8 md:mt-12"
          style={{ fontSize: "clamp(1.125rem, 2.1vw, 1.875rem)" /* 18 → 30px */ }}
        >
          Schmuck, der im Kopf bleibt.
        </p>
      </div>
    </section>
  );
}
