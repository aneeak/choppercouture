/**
 * gen-image-variants.mjs
 * ----------------------
 * Erzeugt für jedes Bild unter public/images/ verkleinerte WebP-Varianten
 * und schreibt eine Manifest-Datei, aus der der Bild-Loader liest.
 *
 * Warum überhaupt: die Seite wird statisch exportiert (output: "export").
 * Next kann dabei nicht selbst skalieren, bisher stand deshalb
 * `images.unoptimized = true` in der Config. Folge: jedes Bild wurde in
 * voller Auflösung geladen UND dekodiert, egal wie klein es dargestellt
 * wird. In der Galerie sind das 105 Bilder à 1000 × 1000 px für Kacheln,
 * die je nach Fenster nur 276 px breit sind.
 *
 * Das Skript läuft automatisch vor jedem Build (npm-Script "prebuild"),
 * es kann also nicht vergessen werden. Bereits erzeugte und noch aktuelle
 * Varianten werden übersprungen, der zweite Lauf ist dadurch schnell.
 *
 * Aufräumen: `node scripts/gen-image-variants.mjs --clean` löscht den
 * kompletten Varianten-Ordner, danach wird alles neu gerechnet.
 */

import { readdir, stat, mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_DIR = path.join(ROOT, "public", "images");
const OUT_DIR = path.join(ROOT, "public", "images", "_r");
const MANIFEST = path.join(ROOT, "lib", "image-variants.json");

/**
 * Die Breiten, die auch in next.config.ts unter deviceSizes/imageSizes
 * stehen. Beide Listen müssen zusammenpassen, sonst fragt der Browser
 * eine Breite an, die es nicht gibt.
 */
const WIDTHS = [256, 384, 640, 828, 1080, 1440, 1920];

/** Quellformate, die skaliert werden. SVG bleibt unangetastet. */
const RASTER = /\.(jpe?g|png|webp)$/i;

/**
 * Basisname einer Variante: Pfad ohne Endung plus kurzer Hash des vollen
 * Quellpfads inklusive Endung.
 *
 * Der Hash ist nicht Deko. Ohne ihn erzeugen styles/Ornamental.png und
 * styles/ornamental.jpg denselben Variantennamen. Auf macOS ist das
 * Dateisystem case-insensitiv, dort überschreiben sich die beiden still
 * und heimlich; auf einem Linux-Webserver wäre eine der beiden ein 404.
 */
function variantBase(rel) {
  const posix = rel.split(path.sep).join("/");
  const hash = createHash("sha1").update(posix).digest("hex").slice(0, 6);
  return posix.replace(RASTER, "") + "-" + hash;
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "_r") continue; // eigener Output, nicht rekursiv rein
      yield* walk(full);
    } else if (RASTER.test(entry.name)) {
      yield full;
    }
  }
}

async function main() {
  if (process.argv.includes("--clean") && existsSync(OUT_DIR)) {
    await rm(OUT_DIR, { recursive: true });
    console.log("Varianten-Ordner gelöscht.");
  }

  if (!existsSync(SRC_DIR)) {
    console.log("public/images fehlt, nichts zu tun.");
    return;
  }

  const manifest = {};
  let written = 0;
  let skipped = 0;

  for await (const file of walk(SRC_DIR)) {
    const rel = path.relative(SRC_DIR, file); // z.B. "galerie/v100369.jpg"
    const publicSrc = "/images/" + rel.split(path.sep).join("/");
    const meta = await sharp(file).metadata();
    if (!meta.width) continue;

    const srcStat = await stat(file);
    const base = variantBase(rel);
    const available = [];

    /**
     * Zielbreiten: alle konfigurierten Breiten unterhalb des Originals,
     * plus eine Variante in voller Auflösung (gedeckelt bei 1920).
     *
     * Die volle Auflösung MUSS dabei sein. Sonst zeigen die obersten
     * srcset-Einträge auf das Original, deklariert mit einer Breite, die
     * es gar nicht hat ("1920w" für ein 1000-px-Bild). Browser, die eine
     * bereits im Cache liegende größere Variante bevorzugen, laden dann
     * genau dieses überdimensionierte Original statt der passenden
     * Variante, und die ganze Optimierung verpufft.
     */
    const targets = [
      ...new Set([
        ...WIDTHS.filter((w) => w < meta.width),
        Math.min(meta.width, Math.max(...WIDTHS)),
      ]),
    ].sort((a, b) => a - b);

    for (const w of targets) {
      const outRel = `${base}-${w}.webp`;
      const outFile = path.join(OUT_DIR, outRel);
      await mkdir(path.dirname(outFile), { recursive: true });

      // Nur neu rechnen, wenn die Variante fehlt oder älter als die Quelle ist.
      let needs = true;
      if (existsSync(outFile)) {
        const outStat = await stat(outFile);
        needs = outStat.mtimeMs < srcStat.mtimeMs;
      }
      if (needs) {
        await sharp(file).resize(w).webp({ quality: 78 }).toFile(outFile);
        written++;
      } else {
        skipped++;
      }
      available.push(w);
    }

    if (available.length) {
      manifest[publicSrc] = { base, widths: available, natural: meta.width };
    }
  }

  await mkdir(path.dirname(MANIFEST), { recursive: true });
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 0) + "\n");

  console.log(
    `Bildvarianten: ${written} neu, ${skipped} unverändert, ` +
      `${Object.keys(manifest).length} Quellbilder im Manifest.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
