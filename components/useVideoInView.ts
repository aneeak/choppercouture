"use client";

/**
 * useVideoInView
 * --------------
 * Spielt ein Video nur, solange es im Viewport steht, und pausiert es
 * sonst. Ein pausiertes Video dekodiert keine Frames mehr, das war beim
 * Hero-Loop die Arbeit, die während des gesamten Scrollens mitlief.
 *
 * `rootMargin` startet die Wiedergabe kurz bevor das Video sichtbar wird,
 * damit nie ein schwarzer Frame zu sehen ist.
 *
 * Respektiert prefers-reduced-motion: wer Bewegung reduziert haben will,
 * bekommt das Video gar nicht erst abgespielt.
 *
 * Gibt die Ref zurück, die an das <video>-Element gehängt wird.
 */

import { useEffect, useRef } from "react";

export default function useVideoInView<T extends HTMLVideoElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* Autoplay kann vom Browser blockiert werden, das ist kein Fehler. */
          });
        } else {
          video.pause();
        }
      },
      { rootMargin: "300px 0px", threshold: 0.01 }
    );
    observer.observe(video);

    // Im Hintergrund-Tab pausieren, sonst läuft der Loop dort weiter.
    const onVisibility = () => {
      if (document.hidden) video.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return ref;
}
