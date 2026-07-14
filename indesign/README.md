# InDesign-Datei der Website (1:1)

Das Skript `build-chopper-couture.jsx` baut die Website **pixelgenau** in InDesign
nach — Positionen, Schriftgrößen, Farben wurden direkt aus der live gerenderten
Seite (bei 1440px Breite) gemessen. Maßstab: **1 Pixel = 1 Punkt**.
Seitengröße: **1440 × 14421 pt**, eine einzige lange Seite.

## WICHTIG: Zuerst die Schriften installieren

Im Ordner `Document Fonts` liegen:
- **Inter.ttf** (Headlines + Body)
- **JetBrainsMono.ttf** (Labels / Mono)

**Variante A — einfach:** Doppelklick auf beide `.ttf` → „Installieren" (macOS
Schriftsammlung). Danach InDesign neu starten.

**Variante B — projektgebunden:** Lege den Ordner `Document Fonts` **direkt
neben die gespeicherte `.indd`**. InDesign aktiviert die Schriften dann
automatisch nur für dieses Dokument (kein Installieren nötig).

> Ohne diese Schriften ersetzt InDesign sie automatisch — dann stimmen die
> Positionen nicht mehr exakt. Also unbedingt vorher installieren/bereitlegen.

## Skript ausführen

1. InDesign öffnen → irgendein leeres Dokument (Specs egal, dient nur zum
   Aktivieren des Menüs).
2. **Datei → Skripten → Skript ausführen…** und `build-chopper-couture.jsx`
   auswählen.
   (Oder ins Skripten-Panel legen und doppelklicken.)
3. Es baut automatisch ein **neues** Dokument mit der kompletten Seite.
4. Das leere Start-Dokument ohne Speichern schließen.
5. Das neue Dokument **Datei → Speichern unter** → `.indd`.

## Bilder
- Werden **verknüpft** aus dem `public`-Ordner (Pfad steht oben im Skript in
  `var BASE = "…"`).
- Wenn du das Projekt verschiebst: `BASE` im Skript anpassen und neu ausführen.
- Bilder tauschen: im Verknüpfungen-Panel neu verknüpfen oder die Datei im
  `public`-Ordner überschreiben.

## Was drin ist (1:1)
Header, Hero (Wordmark), Pieces (Slideshow-Bild + Bento-Grid), Process (6
Schritte), Material & Sicherheit, About + Werte, Brand Promise, Designer
(Gebiss), Contact, Footer — alle Texte, Farben, Größen wie auf der Website.

## Hinweis
- Die **Animationen** (Partikel-Logo, Scroll-Blur, interaktiver Designer,
  Slideshow-Wechsel) gibt es nur live — in InDesign steht das jeweils erste Bild
  / der statische Zustand.
- Kleinere vertikale Abweichungen bei der ersten Textzeile sind möglich
  (Browser- vs. InDesign-Baseline) — einfach frei nachschieben.
