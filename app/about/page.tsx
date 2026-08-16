/**
 * About — Sub-Page
 * ----------------
 * Klar getrennt in ZWEI Bereiche:
 *
 *   1) Chopper Couture (Marke / Studio-Ebene)   → violetter BG
 *   2) Anika Müggler   (Person / hinter der Marke) → schwarzer BG
 *
 * Die Zwei-Teilung ist bewusst visuell hart: Farbwechsel + eigener
 * Section-Header pro Bereich. So sieht man sofort: hier trennt sich
 * die Marken- von der Personen-Ebene.
 *
 * Erreichbar aus der Navbar (About) und aus der About-Section der
 * Startseite via "Mehr über uns →".
 */

import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About",
  description:
    "Chopper Couture — Dental Jewelry aus Berlin. Marke und die Person dahinter, Anika Müggler.",
  alternates: { canonical: "/about" },
};

const BRAND_VALUES = [
  { n: "01", title: "PRÄZISION",   body: "Handwerk steht über allem." },
  { n: "02", title: "INKLUSION",   body: "Für alle, die Zähne haben." },
  { n: "03", title: "AUSDRUCK",    body: "Schmuck als persönliche Sprache." },
  { n: "04", title: "HANDWERK",    body: "Made to fit. Jedes Stück individuell." },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Bereich 1: CHOPPER COUTURE (Marke) — violett ─────────────────── */}
      <section
        data-nav-tone="light"
        className="bg-cc-purple text-cc-white"
        style={{
          paddingTop: "clamp(7rem, 12vw, 11rem)" /* Platz für den fixed Header */,
          paddingBottom: "clamp(6rem, 10vw, 9.375rem)",
        }}
      >
        <div className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
          <SectionHeader number="01" name="DIE MARKE" tone="light" />

          <h1
            className="headline-lg mt-8 md:mt-10"
            style={{ fontSize: "clamp(2.5rem, 9.2vw, 8.25rem)" }}
          >
            Chopper
            <br />
            <span
              className="inline-block"
              style={{ paddingLeft: "clamp(3.5rem, 14.6vw, 13.125rem)" /* 210px */ }}
            >
              Couture.
            </span>
          </h1>

          <p
            className="subline mt-6 md:mt-8"
            style={{
              fontSize: "clamp(1.125rem, 2.1vw, 1.875rem)",
              paddingLeft: "clamp(5rem, 22vw, 20rem)" /* 320px */,
            }}
          >
            Dental Jewelry aus Berlin.
          </p>

          {/* Copy — 1:1 aus dem User-Screenshot (Chopper Couture Bereich) */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mt-16 md:mt-24 items-start">
            <div className="hidden lg:block lg:col-span-5" />
            <div className="lg:col-span-7 space-y-6 body-copy" style={{ fontSize: "clamp(1rem, 1.25vw, 1.125rem)" }}>
              <p>
                Chopper Couture macht Zahnschmuck in Berlin. Grillz, die nicht nach Klischee aussehen. Fein, sauber, modern. Hochpräzise auf dein Gebiss angepasst.
              </p>
              <p>
                Hinter Chopper Couture steck ich. Anika, ausgebildete Zahntechnikerin und Art direktorin. Ich habe viele Jahre erfahrung in der Zahntechnik gesammelt und habe meine beiden leidenschaften zusammengebracht.
                <br />
                So entstand Chopper Couture.
              </p>

              {/* CTAs zur Marke: zurück zu Pieces/Designer */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/#pieces"
                  className="inline-flex items-center gap-3 rounded-full border border-cc-white/80 px-6 py-3 md:px-8 md:py-4 font-hatton text-cc-white hover:bg-cc-white hover:text-cc-purple transition-colors"
                  style={{ fontSize: "clamp(0.9375rem, 1.3vw, 1.25rem)" }}
                >
                  <span>Zu den Stücken</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/#designer"
                  className="inline-flex items-center gap-3 rounded-full border border-cc-white/40 px-6 py-3 md:px-8 md:py-4 font-hatton text-cc-white/90 hover:border-cc-white hover:text-cc-white transition-colors"
                  style={{ fontSize: "clamp(0.9375rem, 1.3vw, 1.25rem)" }}
                >
                  <span>Design dein Stück</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Werte-Karten der Marke */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-12 lg:gap-x-16 gap-y-12 md:gap-y-16 mt-24 md:mt-32">
            {BRAND_VALUES.map((v) => (
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

      {/* ── Bereich 2: ANIKA MÜGGLER (Person) — schwarz ─────────────────── */}
      <section
        data-nav-tone="light"
        className="bg-cc-pure text-cc-white"
        style={{
          paddingTop: "clamp(6rem, 10vw, 9.375rem)",
          paddingBottom: "clamp(6rem, 10vw, 9.375rem)",
        }}
      >
        <div className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
          <SectionHeader number="07" name="ÜBER MICH" tone="light" />

          <h2
            className="headline-lg mt-8 md:mt-10"
            style={{ fontSize: "clamp(2.5rem, 9.2vw, 8.25rem)" }}
          >
            Anika
            <br />
            <span
              className="inline-block"
              style={{ paddingLeft: "clamp(3.5rem, 14.6vw, 13.125rem)" /* 210px */ }}
            >
              Müggler.
            </span>
          </h2>

          <p
            className="subline mt-6 md:mt-8"
            style={{
              fontSize: "clamp(1.125rem, 2.1vw, 1.875rem)",
              paddingLeft: "clamp(5rem, 22vw, 20rem)" /* 320px */,
            }}
          >
            Zahntechnikerin · Art Direktorin · Berlin
          </p>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mt-16 md:mt-24 items-start">
            <div className="hidden lg:block lg:col-span-5" />
            {/* Copy — 1:1 aus dem User-Screenshot (07 — Über mich) */}
            <div className="lg:col-span-7 space-y-6 body-copy" style={{ fontSize: "clamp(1rem, 1.25vw, 1.125rem)" }}>
              <p>Ich bin Anika.</p>
              <p>
                Zürich, Zahntechnik-Ausbildung, vier Jahre lang Dinge in Münder gebaut, die niemand sehen soll. Irgendwann dachte ich: warum eigentlich nicht?
                <br />
                Über die Zürcher Hochschule der Künste bin ich dann ins Design gerutscht.
                <br />
                3D, CAD/CAM, digitale Fertigung alles, wo man Formen am Bildschirm baut und sie danach in der Hand hält. Hat gepasst. Zahntechnik konnte plötzlich mehr als Funktion.
              </p>
              <p>
                Berlin war der nächste Unfall. Art Direction bei einer Werbeagentur, nebenbei Wirtschaftskommunikation studieren, und abends das machen, was mich nicht in Ruhe lässt: Schmuck für Zähne, der nach Schmuck aussieht und nicht nach Rapvideo.
                <br />
                Chopper Couture ist kein Side Project. Es ist das Ding, bei dem alles zusammenkommt, was ich kann und will.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="mailto:choppercouture@gmail.com?subject=Anfrage%20Chopper%20Couture"
                  className="inline-flex items-center gap-3 rounded-full border border-cc-white/80 px-6 py-3 md:px-8 md:py-4 font-hatton text-cc-white hover:bg-cc-white hover:text-cc-pure transition-colors"
                  style={{ fontSize: "clamp(0.9375rem, 1.3vw, 1.25rem)" }}
                >
                  <span>Schreib mir</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div data-nav-tone="light">
        <Footer />
      </div>
    </>
  );
}
