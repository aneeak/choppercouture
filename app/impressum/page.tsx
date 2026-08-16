/**
 * Impressum — Sub-Page (Section 08 laut Builder-Spec)
 * ---------------------------------------------------
 *  Section-Header: 08 — IMPRESSUM
 *  Text 1:1 aus dem Builder-Brief.
 */

import SectionHeader from "@/components/SectionHeader";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Impressum",
  description: "Impressum von Chopper Couture · Anika Müggler, Berlin.",
  alternates: { canonical: "/impressum" },
};

interface Block {
  title: string;
  body: React.ReactNode;
}

const BLOCKS: Block[] = [
  {
    title: "Anbieter",
    body: (
      <>
        Anika Müggler<br />
        Chopper Couture<br />
        Stralauer Allee 17b<br />
        10245 Berlin
      </>
    ),
  },
  {
    title: "Kontakt",
    body: (
      <>
        E-Mail:{" "}
        <a
          href="mailto:choppercouture@gmail.com"
          className="underline underline-offset-2 hover:text-cc-purple"
        >
          choppercouture@gmail.com
        </a>
        <br />
        Telefon:{" "}
        <a href="tel:+4915123182496" className="underline underline-offset-2 hover:text-cc-purple">
          +49 151 23182496
        </a>
      </>
    ),
  },
  {
    title: "Gewerbeanmeldung",
    body: "Angemeldet beim Bezirksamt Friedrichshain-Kreuzberg, Berlin.",
  },
  {
    title: "Umsatzsteuer",
    body: "Kleinunternehmerin gemäß § 19 UStG. Es wird keine Umsatzsteuer ausgewiesen.",
  },
  {
    title: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
    body: (
      <>
        Anika Müggler<br />
        Stralauer Allee 17b<br />
        10245 Berlin
      </>
    ),
  },
  {
    title: "Streitschlichtung",
    body: (
      <>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:{" "}
        <a
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-cc-purple break-all"
        >
          https://ec.europa.eu/consumers/odr/
        </a>
        <br />
        Ich bin weder verpflichtet noch bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </>
    ),
  },
];

export default function ImpressumPage() {
  return (
    <>
      <section
        data-nav-tone="dark"
        className="bg-cc-offwhite text-cc-black"
        style={{
          paddingTop: "clamp(7rem, 12vw, 11rem)",
          paddingBottom: "clamp(6rem, 10vw, 9.375rem)",
        }}
      >
        <div className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
          <SectionHeader number="08" name="IMPRESSUM" tone="dark" />

          {/* HL einzeilig */}
          <h1
            className="headline-lg mt-8 md:mt-10"
            style={{ fontSize: "clamp(2.5rem, 9.2vw, 8.25rem)" /* 40 → 132px */ }}
          >
            Impressum.
          </h1>

          {/* Blöcke — 2-Spalten-Layout ab md, Titel = Loos Wide caps, Body = Loos Wide */}
          <div className="grid md:grid-cols-2 gap-x-10 md:gap-x-16 lg:gap-x-24 gap-y-12 md:gap-y-16 mt-20 md:mt-28">
            {BLOCKS.map((b) => (
              <div key={b.title}>
                <h2
                  className="section-name text-cc-black/50 mb-3"
                  style={{ fontSize: "clamp(0.6875rem, 0.9vw, 0.8125rem)" }}
                >
                  {b.title}
                </h2>
                <div
                  className="body-copy text-cc-black leading-relaxed"
                  style={{ fontSize: "clamp(0.9375rem, 1.15vw, 1.125rem)" }}
                >
                  {b.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div data-nav-tone="light">
        <Footer />
      </div>
    </>
  );
}
