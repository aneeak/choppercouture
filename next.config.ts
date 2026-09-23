import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    /**
     * Statischer Export kann nicht zur Laufzeit skalieren. Statt alle
     * Bilder unskaliert auszuliefern, zeigt dieser Loader auf die
     * Varianten, die scripts/gen-image-variants.mjs vor dem Build erzeugt.
     */
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
    /**
     * Muss deckungsgleich mit WIDTHS im Generator-Skript sein, sonst
     * fragt der Browser eine Breite an, für die es keine Datei gibt.
     */
    deviceSizes: [640, 828, 1080, 1440, 1920],
    imageSizes: [256, 384],
    formats: ["image/webp"],
  },
};

export default nextConfig;
