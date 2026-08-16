/**
 * MaterialSection (Section 04) — Builder-Spec 2026-07
 * ---------------------------------------------------
 *  Header (rechts oben):  04 — Gut zu Wissen
 *
 *  Über der HL versetzt:
 *    Gefertigt im LABOR BRAUNDENTALIS.
 *          SLM-druck beim SCHÜTZ FRÄSZENTRUM GLASHÜTTE.
 *
 *  HL zweizeilig, 2. Zeile 210px:
 *    MATERIAL &
 *          SICHERHEIT
 *
 *  5 Info-Karten (Grid 2 Spalten) + Disclaimer.
 *  Schwarz (#000), Schrift weiß.
 */

import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";

interface MatCard {
  n: string;
  title: string;
  body: string;
}

const CARDS: MatCard[] = [
  {
    n: "01",
    title: "DAS MATERIAL",
    body:
      "CoCr-Legierung (Kobalt-Chrom), ein etabliertes Dentalmetall. Nickelfrei, berylliumfrei.",
  },
  {
    n: "02",
    title: "BIOKOMPATIBEL",
    body:
      "Erfüllt die ISO-Normen für Dentallegierungen, ausgelegt auf Verträglichkeit im Mundraum.",
  },
  {
    n: "03",
    title: "SLM-VERFAHREN",
    body:
      "Selective Laser Melting: Metall wird bei über 1400 °C Schicht für Schicht verschmolzen.",
  },
  {
    n: "04",
    title: "PFLEGE",
    body:
      "Zum Essen rausnehmen, danach kurz unter lauwarmem Wasser abspülen.",
  },
  {
    n: "05",
    title: "NUTZUNG",
    body:
      "Du solltest die Grillz nicht mehr als einmal die Woche tragen.",
  },
];

export default function MaterialSection() {
  return (
    // Outer section: offwhite — sorgt für Weißraum-Puffer über dem schwarzen
    // Content, damit der Wechsel offwhite → schwarz erst kurz vor "04 - Gut zu
    // Wissen" passiert.
    <section id="material" data-nav-tone="light" className="bg-cc-offwhite">
      {/* Weißraum-Spacer (300px auf 1440) */}
      <div style={{ height: "clamp(9rem, 20.8vw, 18.75rem)" }} />

      {/* Schwarzer Content-Bereich beginnt hier — kurz über "04 - Gut zu Wissen" */}
      <div
        className="bg-cc-pure text-cc-white"
        style={{
          paddingTop: "clamp(3rem, 5vw, 4.5rem)" /* 48 → 72px, minimal Puffer im Schwarzen */,
          paddingBottom: "clamp(6rem, 10vw, 9.375rem)" /* 150px */,
        }}
      >
      <div className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        {/* Section-Header rechts oben */}
        <SectionHeader number="04" name="Gut zu Wissen" tone="light" align="right" />

        {/* Über der HL — zweizeiliger Untertitel, Fraunces italic (Figma 15px) */}
        <div className="mt-16 md:mt-24" style={{ fontSize: "clamp(0.9375rem, 1.8vw, 1.625rem)" /* 15 → 26px */ }}>
          <span className="font-hatton-i block" style={{ paddingLeft: 0 }}>
            Gefertigt im Labor Braundentalis.
          </span>
          <span
            className="font-hatton-i block mt-2"
            style={{ paddingLeft: "clamp(1.5rem, 12vw, 10.5rem)" /* 24 → 168px */ }}
          >
            SLM-Druck beim Schütz Fräszentrum Glashütte.
          </span>
        </div>

        {/* HL — Mobile 46px damit "Sicherheit" nicht überläuft, Desktop skaliert.
            2. Zeile 48px eingezogen auf mobile, 210px desktop */}
        <h2
          className="headline-lg mt-10 md:mt-14 mat-hl"
          style={{ fontSize: "clamp(2.5rem, 9.2vw, 8.25rem)" }}
        >
          Material &
          <br />
          <span
            className="inline-block"
            style={{ paddingLeft: "clamp(3rem, 14.6vw, 13.125rem)" }}
          >
            Sicherheit
          </span>
        </h2>

        {/* MOBILE: alle 5 Punkte untereinander mit großzügigem Abstand (Figma) */}
        <div className="md:hidden mt-20 space-y-14">
          {CARDS.map((c) => (
            <Card key={c.n} c={c} />
          ))}
        </div>

        {/* DESKTOP: Karten 01-04 im 2-Spalten-Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-x-10 md:gap-x-16 lg:gap-x-24 gap-y-16 md:gap-y-24 mt-20 md:mt-28">
          {CARDS.slice(0, 4).map((c) => (
            <Card key={c.n} c={c} />
          ))}
        </div>
      </div>

      {/* DESKTOP: 5. Card + Bild nebeneinander (randabfallend rechts) */}
      <div className="hidden md:block mt-16 md:mt-24 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 gap-x-10 md:gap-x-16 lg:gap-x-24 items-start">
          <Card c={CARDS[4]} />
          <figure className="relative w-full aspect-[688/428] overflow-hidden -mr-6 md:-mr-12 lg:-mr-16">
            <Image
              src="/images/material/Material und Sicherheit.webp"
              alt="Chopper Couture — Anika mit Grillz-Modell"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </figure>
        </div>
      </div>

      {/* MOBILE: Bild edge-to-edge unter den 5 Punkten */}
      <figure className="md:hidden relative w-full h-[220px] mt-12 overflow-hidden">
        <Image
          src="/images/material/Material und Sicherheit.webp"
          alt="Chopper Couture — Anika mit Grillz-Modell"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </figure>

      {/* Disclaimer unter Bild */}
      <div className="px-5 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        <p
          className="mt-8 md:mt-20 body-copy text-cc-white/55 max-w-2xl"
          style={{ fontSize: "clamp(0.75rem, 1vw, 1rem)" /* 12 → 16px */ }}
        >
          Grillz sind Schmuck, kein medizinisches Hilfsmittel. Bei Allergien,
          Zahnfleisch-Themen oder Zahnspangen sprich vorher kurz mit deiner
          Zahnärztin oder deinem Zahnarzt.
        </p>
      </div>
      </div>{/* schwarzer Content-Wrapper Ende */}
    </section>
  );
}

// ── Wiederkehrende Karten-Komponente ─────────────────────────────────────
function Card({ c }: { c: MatCard }) {
  return (
    <article>
      <p
        className="font-hatton-i"
        style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" /* 32 → 72px */, lineHeight: 1 }}
      >
        {c.n}
      </p>
      <h3
        className="mt-6 md:mt-6 font-xwide"
        style={{ fontSize: "clamp(0.9375rem, 1.65vw, 1.5rem)" /* 15 → 24px */ }}
      >
        {c.title}
      </h3>
      <p
        className="mt-4 body-copy text-cc-white/85 max-w-md"
        style={{ fontSize: "clamp(0.875rem, 1.25vw, 1.125rem)" /* 14 → 18px */ }}
      >
        {c.body}
      </p>
    </article>
  );
}
