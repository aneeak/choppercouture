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
      <div className="px-5 md:px-12 lg:px-16 max-w-[1440px] mx-auto w-full">
        {/* Section-Label */}
        <p
          className="font-hatton-i text-cc-white"
          style={{
            fontSize: "clamp(1.25rem, 5vw, 4.5rem)" /* 20 → 72px */,
            paddingLeft: "clamp(1.25rem, 3vw, 20px)",
          }}
        >
          Brand Promise
        </p>

        {/* HL "Life changing / Smiles." — Figma-Text 1:1 mit versetzten Wörtern.
            Mobile: 3-zeilig, Desktop: 2-zeilig */}
        <h2
          className="headline-lg mt-6 md:mt-6 md:hidden"
          style={{ fontSize: "52px", lineHeight: "0.95" }}
        >
          <span className="block" style={{ paddingLeft: "40px" }}>Life</span>
          <span className="block" style={{ paddingLeft: "60px" }}>changing</span>
          <span className="block">Smiles.</span>
        </h2>
        <h2
          className="headline-lg mt-6 md:mt-6 hidden md:block"
          style={{ fontSize: "clamp(3.25rem, 9.2vw, 8.25rem)" }}
        >
          <span style={{ paddingLeft: "0.75rem" }}>Life</span>
          <span style={{ paddingLeft: "1.75rem" }}>changing</span>
          <br />
          Smiles.
        </h2>

        {/* Subline — Mobile: rechtsbündig (Screenshot zeigt rechts-mittig durch text-right).
            Desktop: rechtsbündig. */}
        <p
          className="font-hatton-i text-cc-white mt-4 md:mt-12 text-right"
          style={{
            fontSize: "clamp(1.375rem, 2.1vw, 1.875rem)" /* 22 → 30px */,
          }}
        >
          Schmuck, der im Kopf bleibt.
        </p>
      </div>
    </section>
  );
}
