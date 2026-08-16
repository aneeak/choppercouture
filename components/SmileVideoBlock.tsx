"use client";

/**
 * SmileVideoBlock
 * ---------------
 * Standalone Video-Block. Wandert direkt vor die Brand-Promise —
 * Übergang: Designer (offwhite) → dunkles Video → violetter Balken.
 *
 * Mobile-Source: /videos/smile-mobile.mp4
 * Desktop-Source: /videos/smile.mp4
 */

import { useEffect, useRef } from "react";

export default function SmileVideoBlock() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "300px 0px", threshold: 0.01 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      data-nav-tone="dark"
      className="w-full h-[500px] md:h-screen relative bg-cc-black overflow-hidden"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="none"
      >
        <source media="(max-width: 767px)" src="/videos/smile-mobile.mp4" type="video/mp4" />
        <source src="/videos/smile.mp4" type="video/mp4" />
      </video>
      <p
        className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-10 text-cc-white/80 font-hatton-i"
        style={{ fontSize: "clamp(0.75rem, 1vw, 1rem)", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
      >
        V-05
      </p>
    </div>
  );
}
