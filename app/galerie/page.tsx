"use client";

/**
 * Galerie — Sub-Page (Mobile-First neu, Desktop lässt sich später ergänzen)
 * -----------------------------------------------------------------------
 *  Kopfblock analog zu About / Impressum, dann alle 16 Pieces als vertikale
 *  Grid (Mobile) bzw. Pin-Scroll (Desktop, wiederverwendet PiecesShowcase).
 *
 *  Erreichbar aus der Navbar (Galerie) und aus der Homepage-Preview
 *  („Zur Galerie →" CTA).
 */

import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import Footer from "@/components/Footer";

const DIR = "/images/pieces-new";
const PIECES: { src: string; cap: string; alt: string }[] = [
  { src: `${DIR}/DSC00550.webp`, cap: "V-01", alt: "Custom Grillz Einzelzahn — handgefertigt von Chopper Couture Berlin" },
  { src: `${DIR}/DSC00615.webp`, cap: "V-02", alt: "Dental Jewelry Detailaufnahme — individueller Zahnschmuck" },
  { src: `${DIR}/DSC00585.webp`, cap: "V-03", alt: "Custom Grillz mit Ornament-Design — Chopper Couture" },
  { src: `${DIR}/DSC00412.webp`, cap: "V-04", alt: "Grillz Nahaufnahme — SLM-gefertigter Zahnschmuck aus CoCr" },
  { src: `${DIR}/DSC00386.webp`, cap: "V-05", alt: "Handgefertigter Grillz — Dental Jewelry Berlin" },
  { src: `${DIR}/DSC00519.webp`, cap: "V-06", alt: "Custom Dental Grillz — individuelles Design" },
  { src: `${DIR}/DSC00572.webp`, cap: "V-07", alt: "Grillz Detail — polierter Zahnschmuck von Chopper Couture" },
  { src: `${DIR}/DSC00511.webp`, cap: "V-08", alt: "Dental Jewelry Piece — maßgefertigter Zahnschmuck" },
  { src: `${DIR}/DSC00537.webp`, cap: "V-09", alt: "Custom Grillz — einzigartiges Design aus Berlin" },
  { src: `${DIR}/DSC00444.webp`, cap: "V-10", alt: "Grillz Schmuckstück — handpoliert und individuell" },
  { src: `${DIR}/DSC00559.webp`, cap: "V-11", alt: "Zahnschmuck Detailansicht — Chopper Couture Berlin" },
  { src: `${DIR}/DSC00394.webp`, cap: "V-12", alt: "Custom Dental Jewelry — präzisionsgefertigt" },
  { src: `${DIR}/DSC00381.webp`, cap: "V-13", alt: "Grillz mit feinem Design — Zahnschmuck aus Edelmetall" },
  { src: `${DIR}/DSC00571.webp`, cap: "V-14", alt: "Dental Grillz — individuell gefertigter Zahnschmuck" },
  { src: "/images/pieces/ornamental grillz.webp", cap: "V-15", alt: "Ornamental Grillz — dekorativer Zahnschmuck von Chopper Couture" },
  { src: "/images/pieces/Modell.webp", cap: "V-16", alt: "Grillz auf Gipsmodell — Zahnabdruck für Custom Grillz" },
];

export default function GaleriePage() {
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
          <SectionHeader number="01" name="GALERIE" tone="dark" />

          <h1
            className="headline-lg mt-8 md:mt-10"
            style={{ fontSize: "clamp(2.5rem, 9.2vw, 8.25rem)" }}
          >
            Selected
            <br />
            <span
              className="inline-block"
              style={{ paddingLeft: "clamp(5rem, 21.5vw, 19.375rem)" }}
            >
              pieces.
            </span>
          </h1>

          <p
            className="subline mt-6 md:mt-8"
            style={{
              fontSize: "clamp(1.125rem, 2.1vw, 1.875rem)",
              paddingLeft: "clamp(5rem, 22vw, 20rem)",
            }}
          >
            Lass dich inspirieren. Verschiedene Styles, jedes Piece individuell.
          </p>
        </div>

      {/* Bilder: full-width edge-to-edge, KEIN Padding, kein Gap. Mobile + Desktop. */}
      <div className="mt-12 md:mt-16 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {PIECES.map((p, i) => (
          <figure
            key={p.src}
            className="relative w-full bg-cc-black overflow-hidden"
            style={{ aspectRatio: "1 / 1" }}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
              className="object-cover"
              priority={i < 2}
            />
            <figcaption
              className="absolute bottom-3 left-3 text-[10px] tracking-cc-caps uppercase text-cc-offwhite"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.85)" }}
            >
              {p.cap}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto mt-16 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-3 rounded-full border border-cc-black px-6 py-3 font-hatton text-cc-black hover:bg-cc-black hover:text-cc-offwhite transition-colors"
          style={{ fontSize: "clamp(1rem, 1.4vw, 1.375rem)" }}
        >
          <span aria-hidden="true">↑</span>
          <span>nach oben</span>
        </Link>
      </div>
      </section>

      <div data-nav-tone="light">
        <Footer />
      </div>
    </>
  );
}
