"use client";

/**
 * ProcessSection (Section 01)
 * ---------------------------
 * Header:  01 — THE PROCESS
 * Headline versetzt: "Vom Abdruck" / "     zum Schmuck"
 * Subline:  6 Schritte, von deinem Mund bis zum fertigen Grill.
 * Process-Video (Full-Width)
 * 6 alternierende Steps: Bild links/rechts, Text auf der anderen Seite
 *
 * Alle Schriftgrößen sind auf 1440px kalibriert und skalieren via clamp().
 */

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import SectionHeader from "@/components/SectionHeader";

interface Step {
  n: string;
  title: string;
  body: string;
  src: string;
}

const STEPS: Step[] = [
  {
    n: "01",
    title: "ABDRUCK",
    body: "Wir treffen uns im Labor, ich schiebe dir nen Löffel mit Alginat in den Mund eine Minute warten.. Tut nix, schmeckt nach nix. Done.",
    src: "/images/process-new/01-abdruck.png",
  },
  {
    n: "02",
    title: "GIPSMODELL",
    body: "Aus deinem Abdruck gieße ich ein Gipsmodell. Millimetergenau, von hier an arbeite ich nur noch mit deinem Modell, nicht mehr mit dir.",
    src: "/images/process-new/02-gipsmodell.png",
  },
  {
    n: "03",
    title: "SCAN",
    body: "Dein Modell kommt unter den 3D-Scanner. Blaue Laser, ein paar Sekunden, fertig. Dein Kiefer existiert jetzt auch digital.",
    src: "/images/process-new/03-scan.jpg",
  },
  {
    n: "04",
    title: "3D-DESIGN",
    body: "In einer 3D Software designe ich dein Grillz direkt auf deinen Zähnen. Du sagst mir, was du willst, wir iterieren so lange, bis es sitzt. Erst dann geht's weiter.",
    src: "/images/process-new/04-3d-design.png",
  },
  {
    n: "05",
    title: "SLM-DRUCK",
    body: "Selective Laser Melting beim Schütz Fräszentrum. Dein Stück wird Schicht für Schicht aus Edelmetall aufgeschichtet, ein Guss, ohne Naht. Mehr dazu unter Medizinisches.",
    src: "/images/process-new/05-slm.jpg",
  },
  {
    n: "06",
    title: "POLITUR",
    body: "Saubere politur mit 30 000 Touren. Jede Kante, jede Spitze. Erst wenn's glänzt, ist es deins.",
    src: "/images/process/herstellung.JPG",
  },
];

export default function ProcessSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    // Nach Unmute manuell play() — Browser lassen unmuted-Autoplay sonst evtl. blocken
    if (!next) v.play().catch(() => {});
  };

  return (
    <section
      id="process"
      data-nav-tone="dark"
      className="bg-cc-offwhite text-cc-black"
      style={{ paddingTop: "clamp(6rem, 10vw, 9.375rem)" /* 150px auf 1440 */ }}
    >
      <div className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        {/* Section-Header 01 — THE PROCESS */}
        <SectionHeader number="01" name="THE PROCESS" tone="dark" />

        {/* Headline zweizeilig — zweite Zeile 150px nach rechts */}
        <h2
          className="headline-lg mt-8 md:mt-10"
          style={{ fontSize: "clamp(2.5rem, 9.2vw, 8.25rem)" /* 40 → 132px */ }}
        >
          Vom Abdruck
          <br />
          <span
            className="inline-block"
            style={{ paddingLeft: "clamp(3.5rem, 14.6vw, 13.125rem)" /* 56 → 210px, keine Überschneidung mit Zeile 1 */ }}
          >
            zum Schmuck
          </span>
        </h2>

        {/* Subline — deutlich weiter rechts als "zum Schmuck" (~320px), einzeilig */}
        <p
          className="subline mt-6 md:mt-8"
          style={{
            fontSize: "clamp(1.125rem, 2.1vw, 1.875rem)" /* 18 → 30px */,
            paddingLeft: "clamp(5rem, 22vw, 20rem)" /* 80 → 320px */,
            whiteSpace: "nowrap",
          }}
        >
          6 Schritte, von deinem Mund bis zum fertigen Grill.
        </p>
      </div>

      {/* Prozess-Video — Sticky-Container: 200vh hoch, Video 100vh sticky.
          Verlangsamt den Scroll natürlich beim Durchqueren des Videos. */}
      <div className="mt-8 md:mt-12 w-full" style={{ height: "200vh" }}>
        <div className="sticky top-0 relative w-full h-screen bg-cc-black overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/videos/process.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />

          {/* Ton an/aus — unten rechts, transparent-weiß, schlicht */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Ton einschalten" : "Ton ausschalten"}
            className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-10 rounded-full border border-cc-white/50 bg-cc-white/10 backdrop-blur-sm w-11 h-11 md:w-12 md:h-12 flex items-center justify-center text-cc-white hover:bg-cc-white/25 hover:border-cc-white/80 transition-colors"
          >
            {muted ? (
              // Lautsprecher stumm (kein Wave, kleines X)
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                <line x1="22" y1="9" x2="16" y2="15" />
                <line x1="16" y1="9" x2="22" y2="15" />
              </svg>
            ) : (
              // Lautsprecher mit Sound-Wellen
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                <path d="M18.5 5.5a9 9 0 0 1 0 13" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 6 Steps — Bild IMMER links vom Text (im rechten Bereich).
          Ganzer 2-Spalten-Block wechselt zwischen links-bündig und ~180px
          nach rechts eingezogen. Nummer + Titel sitzen links-bündig
          über der Text-Spalte (nicht über dem Bild). */}
      <div className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto mt-16 md:mt-24">
        <div className="space-y-24 md:space-y-32 lg:space-y-40">
          {STEPS.map((step, i) => {
            const shifted = i % 2 === 1;   // 02, 04, 06 → ganzer Block eingezogen
            const indent = shifted ? "md:ml-[120px] lg:ml-[220px]" : "md:ml-0";
            return (
              <div
                key={step.n}
                className={`grid md:grid-cols-12 items-start ${indent}`}
                style={{ columnGap: "clamp(1.5rem, 3.5vw, 3.125rem)" /* 24 → 50px */, rowGap: "2rem" }}
              >
                {/* Bild — immer links */}
                <div className="md:col-span-6 lg:col-span-6">
                  <div className="relative w-full aspect-[4/3] bg-cc-black/5 overflow-hidden">
                    <Image
                      src={step.src}
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Text — direkt rechts vom Bild (max 50px Abstand via columnGap) */}
                <div className="md:col-span-6 lg:col-span-6">
                  {/* 01 - step  (43pt italic / 28pt wide) */}
                  <div className="flex items-baseline gap-4">
                    <span
                      className="section-num"
                      style={{ fontSize: "clamp(2rem, 3vw, 2.6875rem)" /* 32 → 43px */ }}
                    >
                      {step.n}
                    </span>
                    <span className="text-cc-black/60" style={{ fontSize: "clamp(1rem, 1.4vw, 1.375rem)" }}>—</span>
                    <span
                      className="section-name normal-case"
                      style={{ fontSize: "clamp(1rem, 1.8vw, 1.75rem)", letterSpacing: "0.02em", textTransform: "none" }}
                    >
                      step
                    </span>
                  </div>
                  {/* Titel */}
                  <h3
                    className="mt-6 md:mt-8 subline uppercase"
                    style={{
                      fontSize: "clamp(2.25rem, 4.5vw, 4rem)" /* 36 → 64px */,
                      fontWeight: 200,
                      fontStyle: "italic",
                      letterSpacing: "0",
                    }}
                  >
                    {step.title}
                  </h3>
                  {/* Body */}
                  <p
                    className="mt-4 md:mt-6 body-copy max-w-md"
                    style={{
                      fontSize: "clamp(0.9375rem, 1.25vw, 1.125rem)" /* 15 → 18px */,
                      lineHeight: "1.61",
                    }}
                  >
                    {step.n === "05" ? (
                      <>
                        Selective Laser Melting beim{" "}
                        <a
                          href="https://www.schuetz-zahntechnik.de/standorte/fraeszentrum-glashuette/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 hover:text-cc-purple"
                        >
                          Schütz Fräszentrum
                        </a>
                        . Dein Stück wird Schicht für Schicht aus Edelmetall aufgeschichtet, ein Guss, ohne Naht. Mehr dazu unter{" "}
                        <Link href="#material" className="underline underline-offset-2 hover:text-cc-purple">
                          Medizinisches
                        </Link>
                        .
                      </>
                    ) : (
                      step.body
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 150px Weißraum nach unten */}
      <div style={{ paddingBottom: "clamp(6rem, 10vw, 9.375rem)" }} />
    </section>
  );
}
