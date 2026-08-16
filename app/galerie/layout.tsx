import type { Metadata } from "next";

/**
 * page.tsx ist eine Client-Component und kann selbst kein `metadata`
 * exportieren — deshalb liegt es hier.
 */
export const metadata: Metadata = {
  title: "Galerie — Custom Grillz & Zahnschmuck",
  description:
    "Handgefertigte Grillz und Dental Jewelry von Chopper Couture Berlin. Individuelle Designs aus biokompatibler CoCr-Legierung — jedes Piece ein Unikat.",
  alternates: { canonical: "/galerie" },
  openGraph: {
    title: "Galerie — Custom Grillz & Dental Jewelry | Chopper Couture",
    description:
      "Handgefertigte Grillz und Dental Jewelry aus Berlin. Jedes Stück individuell designt und im SLM-Verfahren gefertigt.",
    url: "https://choppercouture.ch/galerie",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function GalerieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
