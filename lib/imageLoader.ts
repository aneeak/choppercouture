/**
 * Eigener Bild-Loader für den statischen Export
 * ---------------------------------------------
 * Next kann bei `output: "export"` nicht zur Laufzeit skalieren. Statt
 * deshalb alle Bilder unskaliert auszuliefern (`images.unoptimized`),
 * erzeugt scripts/gen-image-variants.mjs vor jedem Build verkleinerte
 * WebP-Varianten. Dieser Loader zeigt für jede angefragte Breite auf die
 * passende Variante, damit <Image> ein echtes srcset schreiben kann.
 *
 * Gibt es zu einem Bild keine Variante, etwa weil es neu ist oder kleiner
 * als die kleinste Zielbreite, wird unverändert das Original geliefert.
 * Ein fehlendes Manifest kann also nie zu einem 404 führen.
 */

import variants from "./image-variants.json";

type Variant = { base: string; widths: number[]; natural: number };
const MANIFEST = variants as Record<string, Variant>;

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const entry = MANIFEST[src];
  if (!entry) return src;

  // Kleinste erzeugte Breite, die noch groß genug ist. Fragt Next eine
  // Breite oberhalb des Originals an, ist die größte Variante das Beste,
  // was es gibt. Bewusst nicht das Original: sonst stünde dieselbe Datei
  // mit mehreren, zu großen Breitenangaben im srcset.
  const fit = entry.widths.find((w) => w >= width) ?? entry.widths.at(-1);
  if (!fit) return src;

  // Der Basisname kommt aus dem Manifest, damit Loader und Generator
  // sich nicht unabhängig voneinander auf eine Namensregel einigen müssen.
  return `/images/_r/${entry.base}-${fit}.webp`;
}
