"use client";

import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import Footer from "@/components/Footer";

const DIR = "/images/galerie";

type Piece = { src: string; cap: string; alt: string };
type LogoItem = { logo: true };
type GalleryItem = Piece | LogoItem;

const PIECES: Piece[] = [
  { src: `${DIR}/v100369.jpg`, cap: "V1", alt: "Custom Grillz Frontzähne — handgefertigt von Chopper Couture Berlin" },
  { src: `${DIR}/v300418.jpg`, cap: "V3", alt: "Custom Grillz drittes Design — Chopper Couture Berlin" },
  { src: `${DIR}/v500523.jpg`, cap: "V5", alt: "Custom Grillz fünftes Design — Chopper Couture Berlin" },
  { src: `${DIR}/v200347.jpg`, cap: "V2", alt: "Custom Grillz zweites Design — Chopper Couture" },
  { src: `${DIR}/v700583.jpg`, cap: "V7", alt: "Custom Grillz siebtes Design — Chopper Couture Berlin" },
  { src: `${DIR}/v100377.jpg`, cap: "V1", alt: "Dental Jewelry Einzelzahn — individueller Zahnschmuck aus CoCr" },
  { src: `${DIR}/v400498.jpg`, cap: "V4", alt: "Custom Grillz viertes Design — Chopper Couture" },
  { src: `${DIR}/v600558.jpg`, cap: "V6", alt: "Custom Grillz sechstes Design — Chopper Couture" },
  { src: `${DIR}/v900608.jpg`, cap: "V9", alt: "Custom Grillz neuntes Design — Chopper Couture" },
  { src: `${DIR}/v300419.jpg`, cap: "V3", alt: "Dental Grillz Detailansicht — handgefertigt" },
  { src: `${DIR}/v800592.jpg`, cap: "V8", alt: "Custom Grillz achtes Design — Dental Jewelry Berlin" },
  { src: `${DIR}/v100378.jpg`, cap: "V1", alt: "Grillz Detailansicht — Zahnschmuck Nahaufnahme" },
  { src: `${DIR}/v200350.jpg`, cap: "V2", alt: "Dental Jewelry Piece — handgefertigt in Berlin" },
  { src: `${DIR}/v600559.jpg`, cap: "V6", alt: "Dental Grillz Detailansicht — individueller Zahnschmuck" },
  { src: `${DIR}/v500525.jpg`, cap: "V5", alt: "Dental Jewelry Nahaufnahme — handgefertigter Zahnschmuck" },
  { src: `${DIR}/v300420.jpg`, cap: "V3", alt: "Zahnschmuck Ornament — individuelles CoCr-Piece" },
  { src: `${DIR}/v100380.jpg`, cap: "V1", alt: "Custom Grillz auf Zahnmodell — Chopper Couture Design" },
  { src: `${DIR}/v700585.jpg`, cap: "V7", alt: "Dental Jewelry Detail — individueller Zahnschmuck CoCr" },
  { src: `${DIR}/v400505.jpg`, cap: "V4", alt: "Dental Jewelry Detail — individuelles Zahnschmuck-Piece" },
  { src: `${DIR}/v900610.jpg`, cap: "V9", alt: "Dental Jewelry — individueller Zahnschmuck Berlin" },
  { src: `${DIR}/v200405.jpg`, cap: "V2", alt: "Grillz mit feinem Muster — individueller Zahnschmuck" },
  { src: `${DIR}/v600560.jpg`, cap: "V6", alt: "Zahnschmuck Ornament — CoCr-Piece Berlin" },
  { src: `${DIR}/v300427.jpg`, cap: "V3", alt: "Grillz auf Zahnmodell — Custom Design Nahaufnahme" },
  { src: `${DIR}/v800596.jpg`, cap: "V8", alt: "Grillz Nahaufnahme — CoCr-Zahnschmuck poliert" },
  { src: `${DIR}/v100384.jpg`, cap: "V1", alt: "Zahnschmuck mit Ornament — handpolierter Grillz" },
  { src: `${DIR}/v500530.jpg`, cap: "V5", alt: "Grillz Detail — poliertes CoCr-Piece" },
  { src: `${DIR}/v300431.jpg`, cap: "V3", alt: "Dental Jewelry mit Muster — Chopper Couture" },
  { src: `${DIR}/v200407.jpg`, cap: "V2", alt: "Custom Dental Grillz — Seitenansicht auf Modell" },
  { src: `${DIR}/v100385-2.jpg`, cap: "V1", alt: "Dental Grillz seitliche Ansicht — Custom Design Berlin" },
  { src: `${DIR}/v600563.jpg`, cap: "V6", alt: "Grillz Nahaufnahme — Custom Design poliert" },
  { src: `${DIR}/v400507.jpg`, cap: "V4", alt: "Grillz auf Modell — CoCr-Zahnschmuck Berlin" },
  { src: `${DIR}/v300433-2.jpg`, cap: "V3", alt: "Custom Grillz Seitenansicht — polierter Zahnschmuck" },
  { src: `${DIR}/v700589.jpg`, cap: "V7", alt: "Grillz auf Zahnmodell — Custom Design Nahaufnahme" },
  { src: `${DIR}/v900612.jpg`, cap: "V9", alt: "Grillz mit Ornament — handgefertigtes CoCr-Piece" },
  { src: `${DIR}/v100385.jpg`, cap: "V1", alt: "Grillz von vorne — maßgefertigter Zahnschmuck" },
  { src: `${DIR}/v500533.jpg`, cap: "V5", alt: "Zahnschmuck auf Modell — Custom Design Chopper Couture" },
  { src: `${DIR}/v200411.jpg`, cap: "V2", alt: "Zahnschmuck Detail — SLM-Verfahren Chopper Couture" },
  { src: `${DIR}/v800598.jpg`, cap: "V8", alt: "Dental Grillz Seitenansicht — Chopper Couture" },
  { src: `${DIR}/v300433.jpg`, cap: "V3", alt: "Grillz von oben — maßgefertigtes Design" },
  { src: `${DIR}/v600564.jpg`, cap: "V6", alt: "Dental Jewelry Piece — handgefertigt Chopper Couture" },
  { src: `${DIR}/v100386.jpg`, cap: "V1", alt: "Custom Dental Jewelry — Detailaufnahme Chopper Couture" },
  { src: `${DIR}/v400511.jpg`, cap: "V4", alt: "Custom Dental Grillz — Nahaufnahme poliert" },
  { src: `${DIR}/v300434.jpg`, cap: "V3", alt: "Zahnschmuck Detail — SLM-gefertigte Oberfläche" },
  { src: `${DIR}/v500535.jpg`, cap: "V5", alt: "Dental Grillz — individuelles Ornament-Design" },
  { src: `${DIR}/v200412.jpg`, cap: "V2", alt: "Grillz Nahaufnahme — poliertes CoCr-Design" },
  { src: `${DIR}/v900614.jpg`, cap: "V9", alt: "Zahnschmuck Detail — Custom Grillz poliert" },
  { src: `${DIR}/v600565.jpg`, cap: "V6", alt: "Custom Grillz auf Porzellan — Zahnschmuck Präsentation" },
  { src: `${DIR}/v300435.jpg`, cap: "V3", alt: "Dental Grillz Piece — Chopper Couture Berlin" },
  { src: `${DIR}/v100392.jpg`, cap: "V1", alt: "Grillz auf Modell — individuelles Zahnschmuck-Design" },
  { src: `${DIR}/v700591.jpg`, cap: "V7", alt: "Zahnschmuck Piece — handgefertigt Chopper Couture" },
  { src: `${DIR}/v800601.jpg`, cap: "V8", alt: "Zahnschmuck auf Modell — individuelles Custom Piece" },
  { src: `${DIR}/v300438.jpg`, cap: "V3", alt: "Custom Dental Jewelry — individuelles Ornament" },
  { src: `${DIR}/v400519.jpg`, cap: "V4", alt: "Zahnschmuck mit Ornament — Chopper Couture Design" },
  { src: `${DIR}/v500537.jpg`, cap: "V5", alt: "Custom Dental Jewelry — maßgefertigter Zahnschmuck" },
  { src: `${DIR}/v200414.jpg`, cap: "V2", alt: "Dental Jewelry — individuelles Piece aus Berlin" },
  { src: `${DIR}/v600569.jpg`, cap: "V6", alt: "Grillz seitliche Ansicht — individuelles CoCr-Design" },
  { src: `${DIR}/v300443.jpg`, cap: "V3", alt: "Grillz Nahaufnahme — handpolierter Zahnschmuck" },
  { src: `${DIR}/v100393.jpg`, cap: "V1", alt: "Zahnschmuck Nahaufnahme — CoCr-Legierung poliert" },
  { src: `${DIR}/v800602.jpg`, cap: "V8", alt: "Custom Dental Jewelry — handgefertigtes Ornament" },
  { src: `${DIR}/v900615.jpg`, cap: "V9", alt: "Dental Grillz Gesamtansicht — Chopper Couture Berlin" },
  { src: `${DIR}/v300444-2.jpg`, cap: "V3", alt: "Zahnschmuck auf Modell — Custom Grillz Ansicht" },
  { src: `${DIR}/v500538.jpg`, cap: "V5", alt: "Grillz Piece — handpoliert Chopper Couture" },
  { src: `${DIR}/v600571.jpg`, cap: "V6", alt: "Dental Grillz — maßgefertigter Zahnschmuck Berlin" },
  { src: `${DIR}/v400547.jpg`, cap: "V4", alt: "Dental Grillz Seitenansicht — handgefertigt" },
  { src: `${DIR}/v300444.jpg`, cap: "V3", alt: "Dental Grillz Gesamtansicht — CoCr-Legierung" },
  { src: `${DIR}/v200463.jpg`, cap: "V2", alt: "Custom Grillz auf Porzellan — Chopper Couture Präsentation" },
  { src: `${DIR}/v100396.jpg`, cap: "V1", alt: "Dental Grillz Gesamtansicht — Chopper Couture Berlin" },
  { src: `${DIR}/v600572.jpg`, cap: "V6", alt: "Zahnschmuck Detail — Chopper Couture Piece" },
  { src: `${DIR}/v300446.jpg`, cap: "V3", alt: "Custom Grillz seitlich — Chopper Couture Design" },
  { src: `${DIR}/v800605.jpg`, cap: "V8", alt: "Grillz Detail — maßgefertigter Zahnschmuck Berlin" },
  { src: `${DIR}/v500539.jpg`, cap: "V5", alt: "Zahnschmuck Detail — SLM-gefertigtes Unikat" },
  { src: `${DIR}/v300447.jpg`, cap: "V3", alt: "Grillz mit Details — individueller Zahnschmuck" },
  { src: `${DIR}/v600574.jpg`, cap: "V6", alt: "Custom Dental Jewelry — Ornament-Grillz poliert" },
  { src: `${DIR}/v900617.jpg`, cap: "V9", alt: "Custom Dental Jewelry — maßgefertigtes Unikat" },
  { src: `${DIR}/v400557.jpg`, cap: "V4", alt: "Custom Grillz Piece — individuelles Design Berlin" },
  { src: `${DIR}/v300449.jpg`, cap: "V3", alt: "Dental Jewelry Piece — maßgefertigt Berlin" },
  { src: `${DIR}/v500540.jpg`, cap: "V5", alt: "Custom Grillz Gesamtansicht — Dental Jewelry Berlin" },
  { src: `${DIR}/v600579.jpg`, cap: "V6", alt: "Grillz Gesamtansicht — handgefertigtes Unikat" },
  { src: `${DIR}/v300456.jpg`, cap: "V3", alt: "Zahnschmuck Präsentation — Chopper Couture" },
  { src: `${DIR}/v800606.jpg`, cap: "V8", alt: "Dental Grillz Piece — Chopper Couture Design" },
  { src: `${DIR}/v300458.jpg`, cap: "V3", alt: "Custom Dental Grillz — handgefertigtes Unikat" },
  { src: `${DIR}/dsc00550.jpg`, cap: "CC", alt: "Custom Grillz Einzelstück — Dental Jewelry Chopper Couture" },
];

const ALL_ITEMS: GalleryItem[] = [
  ...PIECES.slice(0, 20),
  { logo: true },
  ...PIECES.slice(20),
];

function isLogo(item: GalleryItem): item is LogoItem {
  return "logo" in item;
}

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

        <div className="mt-12 md:mt-16 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 bg-cc-black">
          {ALL_ITEMS.map((item, i) =>
            isLogo(item) ? (
              <figure
                key="spike-logo"
                className="relative w-full bg-cc-offwhite flex items-center justify-center"
                style={{ aspectRatio: "1 / 1" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="108 110 124 218" width="120" height="120" className="opacity-70 hover:opacity-100 transition-opacity duration-500">
                  <g fill="#5bbfb5">
                    <path d="m173.01,176.47c-.87.08-1.8,141.3.26,142.09,1.73.67,49.01-73.72,48.12-74.29s-14.76,19.47-26.9,18.81c-8.95-.47-15.46-3.88-18.08-25.15-2.73-22.13-2.37-61.55-3.4-61.45Z"/>
                    <path d="m164.98,118.88c.87.08,1.8,141.3-.26,142.09-1.73.67-49.01-73.72-48.12-74.29s14.76,19.47,26.9,18.81c8.95-.47,15.46-3.88,18.08-25.15,2.73-22.13,2.37-61.55,3.4-61.45Z"/>
                  </g>
                </svg>
              </figure>
            ) : (
              <figure
                key={item.src}
                className="relative w-full bg-cc-black overflow-hidden group"
                style={{ aspectRatio: "1 / 1" }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={i < 4}
                />
                <figcaption
                  className="absolute bottom-3 left-3 text-[10px] tracking-cc-caps uppercase text-cc-offwhite/70"
                  style={{ textShadow: "0 1px 6px rgba(0,0,0,0.85)" }}
                >
                  {item.cap}
                </figcaption>
              </figure>
            )
          )}
        </div>

        <div className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-3 rounded-full border border-cc-black px-6 py-3 font-hatton text-cc-black hover:bg-cc-black hover:text-cc-offwhite transition-colors cursor-pointer"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.375rem)" }}
          >
            <span aria-hidden="true">&uarr;</span>
            <span>nach oben</span>
          </button>
        </div>
      </section>

      <div data-nav-tone="light">
        <Footer />
      </div>
    </>
  );
}
