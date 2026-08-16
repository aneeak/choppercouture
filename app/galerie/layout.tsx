import type { Metadata } from "next";

/**
 * page.tsx ist eine Client-Component und kann selbst kein `metadata`
 * exportieren — deshalb liegt es hier.
 */
export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Selected Pieces von Chopper Couture — Custom Grillz aus Berlin. Verschiedene Styles, jedes Piece individuell gefertigt.",
  alternates: { canonical: "/galerie" },
  openGraph: {
    title: "Galerie — Chopper Couture",
    description:
      "Selected Pieces von Chopper Couture — Custom Grillz aus Berlin. Verschiedene Styles, jedes Piece individuell gefertigt.",
    url: "/galerie",
  },
};

export default function GalerieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
