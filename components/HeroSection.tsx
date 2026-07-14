"use client";

/**
 * HeroSection (Section 00)
 * ------------------------
 * Builder-Spec 2026-07:
 *   - Zweizeilige XXL-Headline "Got Teeth, got options..." (Loos ExtraWide Bold)
 *   - Outline-Button darunter (PP Hatton Ultralight)
 *   - Full-Width Video (smile.mov — Typ mit Grillz)
 *   - Off-White Hintergrund, keine dunkle Sektion mehr
 *
 * Navigation kommt aus components/Navigation.tsx über app/layout.tsx.
 */

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Autoplay soft anstoßen (iOS Safari muted-autoplay quirk)
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section
      data-nav-tone="dark"
      className="bg-cc-offwhite text-cc-black"
    >
      {/* Headline-Block — 3/4 der Screen-Breite, links */}
      <div
        className="pt-24 md:pt-40 px-6 md:px-12"
        style={{ paddingTop: "clamp(6rem, 12vh, 12rem)" }}
      >
        <h1
          className="headline-lg"
          style={{ fontSize: "clamp(3rem, 12vw, 11.5rem)" /* 48px → 184px */ }}
        >
          Got teeth,
          <br />
          got options...
        </h1>
        {/* Outline-Button — 50px weiter unten als vorher (mt-16 / md:mt-20) */}
        <div className="mt-16 md:mt-20">
          <Link
            href="#designer"
            className="inline-flex items-center gap-3 rounded-full border border-cc-black/70 px-6 py-3 md:px-8 md:py-4 font-hatton hover:bg-cc-black hover:text-cc-offwhite transition-colors"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.375rem)" /* 16 → 22px */ }}
          >
            <span>Designe deine Grillz</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* Video — Sticky-Container: 200vh hoch, Video 100vh sticky.
          User muss doppelt so lange scrollen, um durch die Video-Szene
          zu kommen → natürliche Verlangsamung, ohne harten Snap. */}
      <div className="mt-24 md:mt-36 lg:mt-40 w-full" style={{ height: "200vh" }}>
        <div className="sticky top-0 relative w-full h-screen bg-cc-black overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/videos/smile.mov"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          {/* Micro-Caption unten links wie im PNG "V-05" */}
          <p
            className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-10 text-cc-white/80 font-hatton-i"
            style={{ fontSize: "clamp(0.75rem, 1vw, 1rem)", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
          >
            V-05
          </p>
        </div>
      </div>
    </section>
  );
}
