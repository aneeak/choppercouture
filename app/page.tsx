"use client";

/**
 * Homepage — One-Pager (Builder-Spec 2026-07)
 * -------------------------------------------
 *   Header    Original Hero (Particle-Wordmark + hero-loop.mp4 BG)
 *   00        Hero-Claim (Got teeth… + Button + smile.mov)
 *   01        Process (header + 6 Steps)
 *   02        Designer (Zahn-Mapping + 4 Style-Karten)
 *   03        Gallery (PiecesShowcase, horizontal pin-scroll)
 *   04        Material
 *   Bald:     About / Contact / Über mich / Impressum / Footer
 *
 * Hero-Scrub: der Original-Effekt (opacity 0 + blur 18px während des
 * Scrolls aus dem Hero raus) — bewusst wiederhergestellt.
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "@/components/Hero";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import DesignerSection from "@/components/DesignerSection";
import BrandPromiseSection from "@/components/BrandPromiseSection";
import GallerySection from "@/components/GallerySection";
import MaterialSection from "@/components/MaterialSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import SmileVideoBlock from "@/components/SmileVideoBlock";
import Footer from "@/components/Footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Original-Scroll-Effekt: Hero fadet raus + blurred beim Weiterscrollen.
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const useBlur = !prefersReduced && !isMobile;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const hero = document.querySelector<HTMLElement>(".cc-hero-scrub");
      if (!hero) return;
      gsap.to(hero, {
        opacity: 0,
        ...(useBlur ? { filter: "blur(18px)" } : {}),
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* Original Header/Hero — ParticleLogo + Loop-Video als BG.
          Klasse `cc-hero-scrub` triggert den GSAP-Fade/Blur beim Scrollen. */}
      <div className="cc-hero-scrub" data-nav-tone="dark" data-snap>
        <Hero videoSrc="/videos/hero-loop.mp4" />
      </div>

      {/* Reihenfolge laut Figma-Mobile-Design 2026-08:
          Hero → Claim → Galerie → Designer → Brand Promise →
          Process → Material → About → Contact */}
      <HeroSection />
      <GallerySection />
      <DesignerSection />
      <SmileVideoBlock />
      <BrandPromiseSection />
      <ProcessSection />
      <MaterialSection />
      <AboutSection />
      <ContactSection />

      <div data-nav-tone="light">
        <Footer />
      </div>
    </div>
  );
}
