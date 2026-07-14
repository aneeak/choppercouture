"use client";

/**
 * SmoothScrollProvider
 * --------------------
 * Lenis smooth scroll + GSAP ScrollTrigger sync + Context exposure.
 *
 * Kein Proximity-Snapping mehr — der User will flüssiges Scrollen, keine
 * harte Bremse. Die full-height Videos wirken durch Lenis' langsame
 * Ease-out-Kurve von allein wie eine sanfte Pause.
 */

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LenisCtx = createContext<Lenis | null>(null);
export function useLenis() {
  return useContext(LenisCtx);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const instance = new Lenis({
      // Etwas längere duration + sanftere Kurve = flüssiges Ausrollen,
      // wirkt wie leichte Bremsung an den Video-Sektionen ohne Ruck.
      duration: 1.6,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    setLenis(instance);

    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    instance.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisCtx.Provider value={lenis}>{children}</LenisCtx.Provider>;
}
