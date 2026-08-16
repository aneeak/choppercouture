"use client";

/**
 * HeroSection (Section 00 — Hero-Claim)
 * -------------------------------------
 * Offwhite Block mit "Got teeth, got options..." (schwarz).
 * CTA-Button: schwarze Outline, PP Hatton italic (Figma Mobile Spec).
 */

import Link from "next/link";

export default function HeroSection() {
  return (
    <section data-nav-tone="dark" className="bg-cc-offwhite text-cc-black">
      <div
        className="px-5 md:px-12"
        style={{
          paddingTop: "clamp(4.75rem, 12vh, 12rem)",
          paddingBottom: "clamp(4rem, 8vh, 10rem)",
        }}
      >
        <h1
          className="headline-lg hero-claim"
          style={{ fontSize: "clamp(2.8125rem, 12vw, 11.5rem)" }}
        >
          Got teeth,
          <br />
          got options...
        </h1>

        {/* Button — Mobile: leicht rechts versetzt (Figma: x=127 auf 375px = pr-[27px]).
            Desktop: linksbündig im Container. PP Hatton italic. */}
        <div className="mt-14 md:mt-20 flex md:block justify-end md:justify-start pr-[27px] md:pr-0">
          <Link
            href="#designer"
            className="inline-flex items-center gap-3 rounded-full border border-cc-black px-6 md:px-8 md:py-4 font-hatton-i text-cc-black hover:bg-cc-black hover:text-cc-offwhite transition-colors"
            style={{
              fontSize: "clamp(1.1875rem, 1.4vw, 1.375rem)",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
            }}
          >
            <span>Designe deine Grillz</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
