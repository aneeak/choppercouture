import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Navigation from "@/components/Navigation";

/**
 * Fonts (Builder-Spec 2026-07 — echte Pangram-Fonts)
 * --------------------------------------------------
 *   Loos ExtraWide (Bold)      → Typekit  "loos-extrawide", weight 700
 *   Loos Wide (Light)          → Typekit  "loos-wide",      weight 400
 *   PP Hatton (Ultralight ± Italic) → local /public/fonts/PPHatton-Ultralight[Italic].otf
 *   Inter (Black 900)          → Google Fonts (bleibt für Sub-Headlines)
 *
 * Typekit-Stylesheet wird per <link> im <head> geladen (unten).
 * localFont-Instanz für PP Hatton exportiert eine CSS-Variable.
 */

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const ppHatton = localFont({
  variable: "--font-hatton",
  src: [
    { path: "../public/fonts/PPHatton-Ultralight.otf",       weight: "200", style: "normal" },
    { path: "../public/fonts/PPHatton-UltralightItalic.otf", weight: "200", style: "italic" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chopper Couture — Dental Jewelry · Berlin",
  description:
    "Got teeth? Got options. Präzisions-Zahnschmuck für Menschen, die ihre Identität tragen. Custom Grillz aus Berlin.",
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${ppHatton.variable} antialiased`}
    >
      <head>
        {/* Typekit — Loos-Familie (ExtraWide + Wide) */}
        <link rel="stylesheet" href="https://use.typekit.net/bsg1rex.css" />
      </head>
      <body className="bg-white text-cc-black">
        <SmoothScrollProvider>
          <Navigation />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
