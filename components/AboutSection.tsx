"use client";

/**
 * AboutSection (Section 05) — Builder-Spec 2026-07
 * ------------------------------------------------
 *  Startseiten-About: NUR die Marke Chopper Couture.
 *  Keine Verbindung zur Privatperson Anika Müggler auf dieser Zeile.
 *
 *  Wer mehr über die Person hinter der Marke wissen will, klickt den
 *  CTA "Mehr über uns →" und landet auf /about — dort sind Marke UND
 *  Person klar getrennt dargestellt.
 */

import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

interface Value {
  n: string;
  title: string;
  body: string;
}

const VALUES: Value[] = [
  { n: "01", title: "PRÄZISION",   body: "Handwerk steht über allem." },
  { n: "02", title: "INKLUSION",   body: "Für alle, die Zähne haben." },
  { n: "03", title: "HANDWERK",    body: "Made to fit. Jedes Stück individuell." },
  { n: "04", title: "AUSDRUCK",    body: "Schmuck als persönliche Sprache." },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      data-nav-tone="light"
      className="bg-cc-purple text-cc-white"
      style={{
        paddingTop: "clamp(5rem, 8vw, 7.5rem)",
        paddingBottom: "clamp(6rem, 10vw, 9.375rem)",
      }}
    >
      <div className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        <SectionHeader number="05" name="ABOUT" tone="light" />

        {/* HL: Chopper / Couture — reine Marken-Ebene */}
        <h2
          className="headline-lg mt-8 md:mt-10"
          style={{ fontSize: "clamp(2.5rem, 9.2vw, 8.25rem)" }}
        >
          Chopper
          <br />
          <span
            className="inline-block"
            style={{ paddingLeft: "clamp(3.5rem, 14.6vw, 13.125rem)" /* 56px mobile / 210px desktop */ }}
          >
            Couture.
          </span>
        </h2>

        {/* Subline auf eigener Achse — Marken-Statement, nichts Persönliches */}
        <p
          className="subline mt-6 md:mt-8"
          style={{
            fontSize: "clamp(1.125rem, 2.1vw, 1.875rem)",
            paddingLeft: "clamp(5rem, 22vw, 20rem)" /* 320px */,
          }}
        >
          Dental Jewelry aus Berlin.
        </p>

        {/* Copy-Block: ausschließlich über die Marke */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mt-16 md:mt-24 items-start">
          <div className="hidden lg:block lg:col-span-5" />

          <div className="lg:col-span-7">
            <div className="space-y-6 body-copy" style={{ fontSize: "clamp(1rem, 1.25vw, 1.125rem)" }}>
              <p>
                Chopper Couture macht Zahnschmuck in Berlin. Grillz, die nicht nach Klischee aussehen. Fein, sauber, modern. Hochpräzise auf dein Gebiss angepasst.
              </p>
              <p>
                Kein Massenprodukt, kein Klischee. Jedes Stück wird nach deinem Abdruck einzeln entworfen und gefertigt Präzision, Filigranität, Individualität.
              </p>
            </div>

            {/* CTA — Mobile: mittig-rechts. Desktop: linksbündig */}
            <div className="mt-10 md:mt-12 flex justify-end md:justify-start pr-1 md:pr-0">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 rounded-full border border-cc-white bg-cc-purple px-6 py-3 md:px-8 md:py-4 font-hatton-i text-cc-white hover:bg-cc-white hover:text-cc-purple transition-colors"
                style={{ fontSize: "clamp(1.25rem, 1.4vw, 1.5rem)" }}
              >
                <span>Mehr über CC</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* MOBILE: 4 Werte inline (nur Labels, Figma-Spec) */}
        <div className="md:hidden mt-12 flex justify-between items-baseline">
          {VALUES.map((v) => (
            <span
              key={v.n}
              className="text-cc-white uppercase"
              style={{
                fontSize: "clamp(0.75rem, 3vw, 0.875rem)" /* 12 → 14px */,
                letterSpacing: "0.02em",
                fontFamily: "var(--font-loos-wide)",
              }}
            >
              {v.title}
            </span>
          ))}
        </div>

        {/* DESKTOP: 4 Werte-Karten mit Nummer + Body */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-12 lg:gap-x-16 gap-y-12 md:gap-y-16 mt-24 md:mt-32">
          {VALUES.map((v) => (
            <article key={v.n}>
              <p
                className="font-hatton-i"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1 }}
              >
                {v.n}
              </p>
              <h3
                className="mt-4 md:mt-6 font-xwide"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.375rem)" }}
              >
                {v.title}
              </h3>
              <p
                className="mt-3 body-copy text-cc-white/85"
                style={{ fontSize: "clamp(0.9375rem, 1.15vw, 1.0625rem)" }}
              >
                {v.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
