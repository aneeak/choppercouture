"use client";

/**
 * GallerySection — 01 GALERIE
 * ---------------------------
 * Sowohl Mobile als auch Desktop: NUR 1 Preview-Bild + "Zur Galerie →"
 * Button (linkt zu /galerie). Der volle Pin-Scroll lebt jetzt
 * ausschließlich auf der /galerie-Sub-Page.
 */

import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

export default function GallerySection() {
  return (
    <section
      id="pieces"
      data-nav-tone="dark"
      className="bg-cc-offwhite text-cc-black"
      style={{ paddingTop: "clamp(6rem, 10vw, 9.375rem)" }}
    >
      <div className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto mb-12 md:mb-16">
        <SectionHeader number="01" name="GALERIE" tone="dark" />

        <h2
          className="headline-lg mt-8 md:mt-10"
          style={{ fontSize: "clamp(2.5rem, 9.2vw, 8.25rem)" }}
        >
          Selected
          <br />
          <span
            className="inline-block"
            style={{ paddingLeft: "clamp(7.9375rem, 21.5vw, 19.375rem)" /* 127px mobile / 310px desktop (Figma left 147 − 20 pad) */ }}
          >
            pieces
          </span>
        </h2>

        {/* Subline — 3-zeilig, exakte Figma-Positionen (Frame 375, 20px pad).
            Mobile: 44/14/100px (Figma-left 64/34/120 minus 20). */}
        <div
          className="subline mt-6 md:mt-8"
          style={{ fontSize: "clamp(1.125rem, 2.1vw, 1.875rem)" }}
        >
          <span className="block" style={{ paddingLeft: "44px" }}>
            lass dich inspirieren.
          </span>
          <span className="block" style={{ paddingLeft: "14px" }}>
            verschiedene styles,
          </span>
          <span className="block" style={{ paddingLeft: "100px" }}>
            jedes piece Individuell.
          </span>
        </div>
      </div>

      {/* 1 Preview-Bild — fullscreen edge-to-edge, KEIN horizontales Padding.
          Mobile: 4:5 Portrait, Desktop: 16:9 Cinematic. */}
      <Link href="/galerie" className="block group w-full">
        <div
          className="relative w-full bg-cc-black overflow-hidden aspect-[4/5] md:aspect-[16/9]"
        >
          <Image
            src="/images/pieces-new/DSC00615.webp"
            alt="Selected Pieces — Vorschau"
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            priority
          />
        </div>
      </Link>

      {/* Button — rechts ausgerichtet auf Mobile (Figma: left 212),
          zentriert auf Desktop. PP Hatton italic 19px. */}
      <div className="mt-8 md:mt-12 pb-24 md:pb-32 flex justify-end md:justify-center pr-5 md:pr-0">
        <Link
          href="/galerie"
          className="inline-flex items-center gap-2 rounded-full border border-cc-black px-5 md:px-8 md:py-4 font-hatton-i text-cc-black hover:bg-cc-black hover:text-cc-offwhite transition-colors"
          style={{
            fontSize: "clamp(1.1875rem, 1.4vw, 1.375rem)",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
        >
          <span>Zur Galerie</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
