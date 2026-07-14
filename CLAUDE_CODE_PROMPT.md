# Prompt für Claude Code — Chopper Couture Website

Kopiere alles unterhalb der Trennlinie und gib es Claude Code zusammen mit dem `builder_package/` Ordner (PNGs + Original-PDF).

---

# Auftrag: Baue die Chopper Couture Website nach

Ich habe eine bestehende Next.js-Website, die ich komplett neu layouten will. Ich habe das gewünschte Layout in InDesign aufgebaut und stelle dir folgendes zur Verfügung:

- **`builder_package/`** — Ordner mit 10 Section-PNGs (150 DPI Export aus InDesign) und dem Original-PDF
- **Diese Datei** — enthält alle Texte, exakten Pixel-Specs, Fonts und Farben

**Grundregel:** Wenn Text-Spec und PNG konfligieren, gilt das PNG für die pixelgenaue Positionierung. Die Texte in dieser Datei sind copy-paste-fertig — nutze sie 1:1.

## Technischer Stack

- Next.js 14+ (App Router) mit TypeScript
- Tailwind CSS für Styling
- GSAP + ScrollTrigger für Scroll-Animationen
- Lenis für Smooth Scroll
- Design-Viewport: **1440px** — alles auf dieser Breite kalibrieren, dann responsive skalieren

## Fonts einbinden

```
Loos ExtraWide (Bold)      — Pangram Pangram, große Headlines
Loos Wide (Light, ExtraLight) — Pangram Pangram, Body + Meta-Text
PP Hatton (Ultralight, Ultralight Italic) — Pangram Pangram, Toplines + Nummern
Inter (Black 900)          — Google Fonts, Sub-Headlines
```

Falls Pangram-Fonts noch nicht lizenziert sind, verwende als temporären Fallback:
- Loos ExtraWide → Fraunces Black
- Loos Wide → Instrument Sans Light
- PP Hatton → Fraunces Extra Light Italic

Baue die Font-Einbindung so, dass später nur die `.woff2`-Dateien getauscht werden müssen.

## Farbpalette

```css
--near-black: #0D0D0D;      /* Text auf hell */
--pure-black: #000000;      /* Dunkle Sektionen (Material) */
--purple: #7C3AED;          /* Brand Promise, About-BG, Akzente */
--off-white: #F9F9F9;       /* Seitenhintergrund */
--gray-light: #E6E6E6;      /* Trennlinien */
--gray-dark: #282828;       /* Sekundäre dunkle Flächen */
--white: #FFFFFF;           /* Text auf dunkel */
```

---

## Section 00 — Header + Hero
**Referenz-PNG:** `00_nav_hero.jpg`

- **Header** bleibt wie er aktuell auf der Live-Site ist — nicht anfassen.
- **Hero-Headline:** `Got Teeth, got options...` zweizeilig unter dem Header, über 3/4 der Screenbreite, Font: **Loos ExtraWide Bold**
- **Button:** ca. 50px darunter → `Designe deine Grillz →` mit Pfeil, Font: **PP Hatton Ultralight**, als Outline-Button
- **Video:** 150px darunter → Video vom Typen mit fertigen Grillz, volle Screen-Breite
- 150px Abstand nach unten zur nächsten Section

---

## Section 01 — The Process
**Referenz-PNGs:** `01_process_header.jpg` + `02_process_steps.jpg`

### Section-Header (identisches Muster für alle nummerierten Sections)

```
01-       THE PROCESS
```
- `01-` in **PP Hatton Ultralight Italic, 72pt**
- `THE PROCESS` in gleicher Zeile, **Loos Wide ExtraLight, 48pt**

### Headline (2-zeilig, versetzt)
40px darunter:
```
Vom Abdruck
     zum Schmuck
```
- **Loos ExtraWide Bold, 132pt, Zeilenabstand 121pt**
- Die zweite Zeile ist um ca. 5 Leerzeichen nach rechts eingerückt (visueller Versatz)

### Subline
30px darunter, 50px nach rechts eingerückt:
- `6 Schritte, von deinem Mund bis zum fertigen Grill.`
- **PP Hatton Ultralight, 30pt, Abstand 30pt**

### Prozess-Video
50px Weißraum, dann Prozess-Video in voller Breite.

### Die 6 Prozess-Schritte

Jeder Schritt = eine Einheit mit alternierender Positionierung (**abwechselnd 50px oder 100px Einzug von links**, damit die Steps leicht verschoben stehen).

**Struktur pro Step:**
```
01- step                                    ← 01- in PP Hatton Ultralight Italic 43pt
                                              step in Loos Wide ExtraLight 28pt
                                              (30px Abstand nach unten)
ABDRUCK                                     ← PP Hatton Ultralight Italic 64pt
Wir treffen uns im Labor, ich schiebe ...   ← Loos Wide Light 18pt, Zeilenabstand 29pt
```

Bild links, Text rechts — im nächsten Step umgekehrt (siehe PNG).

**Alle 6 Steps (Copy-Paste-fertig):**

| Nr | Titel | Copy |
|---|---|---|
| 01 | ABDRUCK | Wir treffen uns im Labor, ich schiebe dir nen Löffel mit Alginat in den Mund eine Minute warten.. Tut nix, schmeckt nach nix. Done. |
| 02 | GIPSMODELL | Aus deinem Abdruck gieße ich ein Gipsmodell. Millimetergenau, von hier an arbeite ich nur noch mit deinem Modell, nicht mehr mit dir. |
| 03 | SCAN | Dein Modell kommt unter den 3D-Scanner. Blaue Laser, ein paar Sekunden, fertig. Dein Kiefer existiert jetzt auch digital. |
| 04 | 3D-DESIGN | In einer 3D Software designe ich dein Grillz direkt auf deinen Zähnen. Du sagst mir, was du willst, wir iterieren so lange, bis es sitzt. Erst dann geht's weiter. |
| 05 | SLM-DRUCK | Selective Laser Melting beim Schütz Fräszentrum. Dein Stück wird Schicht für Schicht aus Edelmetall aufgeschichtet, ein Guss, ohne Naht. Mehr dazu unter Medizinisches. |
| 06 | POLITUR | Saubere politur mit 30 000 Touren. Jede Kante, jede Spitze. Erst wenn's glänzt, ist es deins. |

**150px Weißraum nach unten zur nächsten Section.**

---

## Section 02 — Designer (Konfigurator)
**Referenz-PNG:** `03_designer_konfigurator.jpg`

### Section-Header (gleiche Struktur wie 01)
```
02-       DESIGNER
```
- `02-` **PP Hatton Ultralight Italic, 72pt**
- `DESIGNER` **Loos Wide ExtraLight, 48pt**

### Headline
40px darunter:
```
DESIGN
     DEIN STÜCK.
```
- **Loos ExtraWide Bold, 132pt, Zeilenabstand 121pt**, zweite Zeile ~5 Leerzeichen nach rechts eingerückt

### Subline
30px darunter, 50px nach rechts eingerückt:
- `          Spiel dich durch. Stil aussuchen, Zähne anklicken, abschicken — ich meld mich bei dir und wir machen einen Termin klar. Ganz unverbindlich.`
- Bei `Spiel` sind ~10 Leerzeichen davor gesetzt für dynamischen Versatz
- **PP Hatton Ultralight, 30pt**

### Konfigurator-Layout (2 Spalten, 50px darunter)

**Linke Spalte — Zahn-Mapping (BESTEHENDES bild/mapping übernehmen, sitzt schon perfekt):**
```
01- Klicke die Zähne an        ← 01- in PP Hatton Ultralight Italic 43pt
                                  "Klicke die Zähne an" in Loos Wide ExtraLight 28pt
[Zahn-Grafik]
```

**Rechte Spalte — Style-Auswahl:**
```
02- Wähle deinen Style         ← gleiche Font-Struktur wie 01-
```

Vier Style-Karten (2x2 Grid):

| Style | Beschreibung | Preis |
|---|---|---|
| **Spiky** | Kantig, spitz, agressiv. | 170€ jeder weitere 90€ |
| **Organic** | weich, luftig, freundlich. | 160€ jeder weitere 85€ |
| **Whole** | ganzer Zahn. glatt, silber. | 120€ jeder weitere 65€ |
| **Ornamental** | verspielt, dynamisch, dekorativ | 210€ jeder weitere 95€ |

- Style-Name: **PP Hatton Ultralight Italic, 30pt**
- Copy: **Loos Wide ExtraLight, 18pt**
- Kleines Bild je Style zwischen Beschreibung und Preis (siehe PNG)

**Unter den Style-Karten:**
```
03- Spezielle Wünsche          ← gleiche Struktur wie 01- / 02-
```
(Textfeld für User-Input)

**Grober Preis:** **PP Hatton Ultralight Italic, 43pt** — dynamisch berechnet aus der Auswahl

**CTA-Button:** `Anfrage senden →` — gleicher Style wie der Hero-Button

---

## Brand Promise Balken
**Referenz-PNG:** `04_brand_promise.jpg`

80px Abstand nach unten, dann violetter Balken über die volle Breite:

- **Hintergrund:** `#7C3AED`
- **Höhe:** 600px
- **Vertikal zentriert** (Abstände oben/unten gleich)

**Inhalt (70px von oben, 210px von rechts eingerückt):**
```
BRAND PROMISE                              ← PP Hatton Ultralight Italic 72pt, weiß
LIFECHANGING
       SMILES.                             ← Loos ExtraWide Bold 132pt, Zeilenabstand 132pt
                                              zweite Zeile ~700px nach rechts versetzt, weiß
Schmuck, der im Kopf bleibt.               ← PP Hatton Ultralight Italic 30pt, weiß
```

---

## Section 03 — Galerie
**Referenz-PNG:** `05_gallery.jpg`

Gleiche Section-Header-Struktur:
```
03- Galerie
```

### Headline
```
SELECTED
     PIECES
```
- **Loos ExtraWide Bold, 132pt**, versetzt

### Subline
- `Ein paar Stücke aus dem Studio. Jedes anders, jedes für genau einen Menschen gemacht. Vielleicht ist deins als nächstes dabei.`

### Galerie
Horizontaler Scroll/Slider mit Grillz-Fotos, `skip galery`-Link unten.

---

## Section 04 — Material & Sicherheit
**Referenz-PNG:** `06_material.jpg`

300px weiter unten, **schwarze Fläche** (`#000000`), Schrift weiß.

### Section-Header
`04 - Gut zu Wissen` ganz rechts oben.

### Über der Headline (versetzt-dynamisch)
```
Gefertigt im LABOR BRAUNDENTALIS.
       SLM-druck beim SCHÜTZ FRÄSZENTRUM GLASHÜTTE.
```
- **PP Hatton Ultralight Italic, 26pt**
- Zweite Zeile nach rechts versetzt

### Headline
```
MATERIAL &
     SICHERHEIT
```
- **Loos ExtraWide Bold, 132pt, Zeilenabstand 121pt**, versetzt

### 5 Info-Karten (Grid 2 Spalten)

Jede Karte:
- Nummer (01, 02, …) in **PP Hatton Ultralight Italic, 72pt**
- Titel darunter in **Loos ExtraWide Bold, 24pt**
- Copy in **Loos ExtraWide Light, 18pt**

| Nr | Titel | Copy |
|---|---|---|
| 01 | DAS MATERIAL | CoCr-Legierung (Kobalt-Chrom), ein etabliertes Dentalmetall, seit Jahrzehnten für Zahnersatz im Mund. Nickelfrei, berylliumfrei. |
| 02 | BIOKOMPATIBEL | Erfüllt die ISO-Normen für Dentallegierungen, ausgelegt auf Verträglichkeit im Mundraum. Keine fragwürdigen Zusätze. |
| 03 | SLM-VERFAHREN | Selective Laser Melting: Metall wird bei über 1400 °C Schicht für Schicht verschmolzen. Ein Stück, ohne Naht, ohne Lötstellen. |
| 04 | PFLEGE | Zum Essen rausnehmen, danach kurz unter lauwarmem Wasser abspülen. Kein kochendes Wasser, keine aggressiven Reiniger, dann hält's ewig. |
| 05 | NUTZUNG | Du solltest die Grillz nicht mehr als einmal die Woche tragen, bei zu häufigem oder langem tragen kann es zu Kopfschmerzen führen. |

**Rechts unter Punkt 04:** Bild in **688px × 428px** (rechtsbündig)

**Disclaimer (unter der 05-Karte):**
`Grillz sind Schmuck, kein medizinisches Hilfsmittel. Bei Allergien, Zahnfleisch-Themen oder Zahnspangen sprich vorher kurz mit deiner Zahnärztin oder deinem Zahnarzt.`

---

## Weißer Zwischenraum: 380px

---

## Section 05 — About
**Referenz-PNG:** `07_about.jpg`

**Violetter Hintergrund** (`#7C3AED`), Höhe **1208px**, Schrift weiß.

### Section-Header (links)
`05 - About`

### Headline
```
CHOPPER
     COUTURE
```
- **Loos ExtraWide Bold, 132pt**, versetzt

### Copy (rechts von der Headline)
> Chopper Couture macht Zahnschmuck in Berlin. Grillz, die nicht nach Klischee aussehen. Fein, sauber, modern. Hochpräzise auf dein Gebiss angepasst.
>
> Hinter Chopper Couture steck ich. Anika, ausgebildete Zahntechnikerin und Art direktorin. Ich habe viele Jahre erfahrung in der Zahntechnik gesammelt und habe meine beiden leidenschaften zusammengebracht. So entstand Chopper Couture.

- Copy-Font: **Loos Wide Light, 18pt**

### CTA
`LERN MICH KENNEN →` in Versalien, verlinkt auf Section 07 (Über mich).

### 4 Werte-Karten
Gleiche Struktur wie die Prozess-Steps (nummeriert 01-04):

| Nr | Titel | Copy |
|---|---|---|
| 01 | PRÄZISION | Handwerk steht über allem. |
| 02 | INKLUSION | Für alle, die Zähne haben. |
| 03 | AUSDRUCK | Schmuck als persönliche Sprache. |
| 04 | HANDWERK | Made to fit. Jedes Stück individuell. |

---

## Section 06 — Contact
**Referenz-PNG:** `08_contact_footer.jpg`

Gleicher Section-Header-Style: `06 - Contact`

### Headline
```
Lass quatschen!
```
- **Loos ExtraWide Bold, 132pt**

### Subline
`Frage, Idee oder einfach Lust auf ein piece? Schreib mir! du landest direkt bei mir, nicht in irgendeinem Support-Postfach.`

### Kontaktinfo
```
DIREKT
insta: @choppercouture
contact@choppercouture.de
```

Zwei dekorative `*` links und rechts (siehe PNG).

### CTA
`Anfrage senden →` (gleicher Button-Style)

---

## Section 07 — Über mich (persönliche Seite)
Verlinkt aus About-Section, gleicher Section-Header-Style: `07 - Über mich`
Layout analog zur About-Section. Content noch offen (Platzhalter setzen).

---

## Section 08 — Impressum
**Referenz-PNG:** `09_impressum.jpg`

Separate Route `/impressum`. Section-Header: `08 - Impressum`

```
Anika Müggler
Chopper Couture
Stralauer Allee 17b
10245 Berlin

Kontakt
E-Mail: contact@choppercouture.de
Telefon: +49 151 23182496

Gewerbeanmeldung
Angemeldet beim Bezirksamt Friedrichshain-Kreuzberg, Berlin.

Umsatzsteuer
Kleinunternehmerin gemäß § 19 UStG. Es wird keine Umsatzsteuer ausgewiesen.

Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
Anika Müggler
Stralauer Allee 17b
10245 Berlin

Streitschlichtung
Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:
https://ec.europa.eu/consumers/odr/
Ich bin weder verpflichtet noch bereit, an einem Streitbeilegungsverfahren vor einer
Verbraucherschlichtungsstelle teilzunehmen.
```

---

## Footer (unter jeder Seite)

Links: `ABOUT   MATERIAL   IMPRESSUM   DATENSCHUTZ   AGB   INSTAGRAM   E-MAIL`
Rechts: `© 2026 CHOPPER COUTURE. ALL RIGHTS RESERVED.`

---

## Wiederkehrende Prinzipien (bitte durchgängig anwenden)

1. **Section-Header-Muster** (`01-`, `02-`, …): PP Hatton Ultralight Italic 72pt für die Nummer + Loos Wide ExtraLight 48pt für den Namen — gilt für ALLE Sections.
2. **Zweizeilige Headlines mit Versatz**: Die zweite Zeile ist immer leicht nach rechts eingerückt (~5 Leerzeichen im Original = umgerechnet in Layout-Sprache). Loos ExtraWide Bold 132pt, Zeilenabstand 121pt.
3. **Sublines** immer 50px nach rechts eingerückt, PP Hatton Ultralight 30pt.
4. **Alternierende Einzüge** bei den Prozess- und Werte-Karten (50px / 100px) — für die "dynamische" Ästhetik.
5. **Section-Abstand:** 150px weiße Fläche zwischen den Hauptsections (außer wo anders angegeben).
6. **CTA-Buttons:** Alle im gleichen Stil — Outline mit Pfeil, PP Hatton Ultralight.

## Vorgehen

Baue Section für Section, jeweils mit Fokus auf die pixelgenaue Position aus dem PNG. Priorisiere in dieser Reihenfolge:

1. **PNG** = Master für Positionierung und visuelles Layout
2. **Diese Datei** = Master für Texte, Fonts, Größen, Farben
3. **Bestehende Live-Site** (die ich neu layouten will) = nur für Header und Zahn-Konfigurator (Mapping übernehmen)

Wenn ein Detail unklar bleibt, halte dich ans PNG und mach eine kurze Notiz in einem Kommentar im Code. Frag bei größeren Interpretations-Unsicherheiten nach, bevor du weiterbaust.

Fang mit Section 00 (Hero) und Section 01 (Process) an, zeig mir das Ergebnis, dann arbeiten wir uns nach unten.
