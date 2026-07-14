"use client";

/**
 * ContactSection (Section 06) — Builder-Spec 2026-07
 * --------------------------------------------------
 *  Section-Header: 06 — CONTACT
 *  HL: "Lass quatschen!" (Loos ExtraWide 700 132pt, einzeilig)
 *  Subline (PP Hatton Italic)
 *  Kontakt-Info-Block (Insta + E-Mail) mit dekorativen Sternen
 *  CTA "Anfrage senden →" (mailto)
 */

import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

export default function ContactSection() {
  return (
    <section
      id="contact"
      data-nav-tone="dark"
      className="bg-cc-offwhite text-cc-black"
      style={{
        paddingTop: "clamp(6rem, 10vw, 9.375rem)" /* 150px */,
        paddingBottom: "clamp(6rem, 10vw, 9.375rem)",
      }}
    >
      <div className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        {/* Section-Header */}
        <SectionHeader number="06" name="CONTACT" tone="dark" />

        {/* HL — einzeilig, groß */}
        <h2
          className="headline-lg mt-8 md:mt-10"
          style={{ fontSize: "clamp(2.5rem, 9.2vw, 8.25rem)" /* 40 → 132px */ }}
        >
          Lass quatschen!
        </h2>

        {/* Subline auf eigener Achse */}
        <p
          className="subline mt-6 md:mt-8 max-w-4xl"
          style={{
            fontSize: "clamp(1.125rem, 2.1vw, 1.875rem)" /* 18 → 30px */,
            paddingLeft: "clamp(5rem, 22vw, 20rem)" /* 80 → 320px */,
          }}
        >
          Frage, Idee oder einfach Lust auf ein piece? Schreib mir! Du landest direkt bei mir, nicht in irgendeinem Support-Postfach.
        </p>

        {/* Kontaktinfo-Block — mittig, mit dekorativen Sternen */}
        <div className="mt-20 md:mt-28 flex items-center justify-center gap-6 md:gap-12">
          {/* Stern links */}
          <span
            aria-hidden="true"
            className="font-hatton-i text-cc-black/40"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1 }}
          >
            *
          </span>

          <div className="text-center space-y-3">
            <p
              className="section-name text-cc-black/50"
              style={{ fontSize: "clamp(0.75rem, 1vw, 0.875rem)" /* 12 → 14px */ }}
            >
              Direkt
            </p>
            <div className="space-y-2" style={{ fontSize: "clamp(1.125rem, 1.8vw, 1.5rem)" /* 18 → 24px */ }}>
              <p className="font-hatton">
                insta:{" "}
                <a
                  href="https://instagram.com/choppercouture"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-cc-purple transition-colors"
                >
                  @choppercouture
                </a>
              </p>
              <p className="font-hatton">
                <a
                  href="mailto:choppercouture@gmail.com"
                  className="underline underline-offset-2 hover:text-cc-purple transition-colors"
                >
                  choppercouture@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Stern rechts */}
          <span
            aria-hidden="true"
            className="font-hatton-i text-cc-black/40"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1 }}
          >
            *
          </span>
        </div>

        {/* CTA-Button */}
        <div className="mt-16 md:mt-20 flex justify-center">
          <Link
            href="mailto:choppercouture@gmail.com?subject=Anfrage%20Chopper%20Couture"
            className="inline-flex items-center gap-3 rounded-full border border-cc-black bg-cc-black px-8 py-4 md:px-10 md:py-5 font-hatton text-cc-offwhite hover:bg-cc-purple hover:border-cc-purple transition-colors"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.375rem)" }}
          >
            <span>Anfrage senden</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
