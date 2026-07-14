"use client";

/**
 * GallerySection (Section 03) — Builder-Spec 2026-07
 * --------------------------------------------------
 *  03 — GALERIE
 *  SELECTED                   ← Loos ExtraWide 700
 *      PIECES                 ← 2. Zeile 210px eingezogen
 *              Ein paar…      ← Subline auf eigener Achse (~320px)
 *
 *  Darunter: bestehende PiecesShowcase (Desktop = Pin-Horizontal-Scroll,
 *  Mobile = Swipe-Snap) — bewusst unverändert, User hat sie so gewollt.
 */

import PiecesShowcase from "@/components/PiecesShowcase";
import SectionHeader from "@/components/SectionHeader";

export default function GallerySection() {
  return (
    <section
      id="pieces"
      data-nav-tone="dark"
      className="bg-cc-offwhite text-cc-black"
      style={{ paddingTop: "clamp(6rem, 10vw, 9.375rem)" /* 150px auf 1440 */ }}
    >
      {/* Kopf: Section-Header + HL + SL — gleiches Muster wie Process/Designer */}
      <div className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto mb-12 md:mb-16">
        <SectionHeader number="03" name="GALERIE" tone="dark" />

        {/* Headline zweizeilig, "Pieces" 310px (Spec 210 + 100) */}
        <h2
          className="headline-lg mt-8 md:mt-10"
          style={{ fontSize: "clamp(2.5rem, 9.2vw, 8.25rem)" /* 40 → 132px */ }}
        >
          Selected
          <br />
          <span
            className="inline-block"
            style={{ paddingLeft: "clamp(5rem, 21.5vw, 19.375rem)" /* 80 → 310px */ }}
          >
            Pieces
          </span>
        </h2>

        {/* Subline zweizeilig — Break bei "genau", Zeile 2 mehr links als Zeile 1 */}
        <div className="mt-6 md:mt-8" style={{ fontSize: "clamp(1.125rem, 2.1vw, 1.875rem)" /* 18 → 30px */ }}>
          <span
            className="subline block"
            style={{ paddingLeft: "clamp(5rem, 22vw, 20rem)" /* 320px */ }}
          >
            Ein paar Stücke aus dem Studio. Jedes anders, jedes für genau
          </span>
          <span
            className="subline block"
            style={{ paddingLeft: "clamp(2rem, 10vw, 9rem)" /* 32 → 144px (deutlich links von Zeile 1) */ }}
          >
            einen Menschen gemacht. Vielleicht ist deins als nächstes dabei.
          </span>
        </div>
      </div>

      {/* Gallery — Desktop Pin-Scroll / Mobile Swipe — UNVERÄNDERT */}
      <PiecesShowcase />
    </section>
  );
}
