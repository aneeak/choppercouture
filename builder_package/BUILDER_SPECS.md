# Chopper Couture — Website Builder Specs

## Für Claude Code: Baue die Website exakt nach den beiliegenden Section-PNGs.

---

## Projektübersicht

One-Page Website für **Chopper Couture** — custom dental jewelry (Grillz) aus Berlin.
Technologie: **Next.js + TypeScript + Tailwind CSS + GSAP + Lenis (Smooth Scroll)**
Deployment: Vercel oder Netlify
Domain: choppercouture.de

---

## Typografie (aus InDesign IDML extrahiert)

### Schriften

| Rolle | Font | Gewicht | Größe (InDesign) | Web-Äquivalent |
|---|---|---|---|---|
| Section Headlines (z.B. "Vom Abdruck zum Schmuck", "LIFECHANGING SMILES") | **Loos ExtraWide** | Bold | 132pt | Pangram Pangram Lizenzfont — als Webfont einbinden |
| Sub-Headlines (z.B. "DESIGN DEIN STÜCK", "MATERIAL & SICHERHEIT") | **Inter** | Black (900) | 64pt, Tracking -25 | Google Fonts `Inter` |
| HL1 (große Headlines) | **Inter** | Black (900) | 115.2pt, Tracking -25 | Google Fonts `Inter` |
| Section-Toplines (z.B. "01 — THE PROCESS") | **PP Hatton** | Ultralight | 30pt | Pangram Pangram Lizenzfont |
| Section-Nummern (z.B. die großen "01", "02") | **PP Hatton** | Ultralight Italic | 72pt | Pangram Pangram Lizenzfont |
| Body Copy | **Loos Wide** | Light | 18pt | Pangram Pangram Lizenzfont |
| Copy weiß (auf dunklem Hintergrund) | **Loos Wide** | Light | 18pt, Farbe #F9F9F9 | Gleich wie Body Copy |

### Fallback-Strategie für Web
- **Loos ExtraWide / Loos Wide / PP Hatton** = Pangram Pangram Fonts (Lizenzkauf nötig, dann als @font-face einbinden)
- **Inter** = Google Fonts (frei verfügbar)
- Falls Pangram-Fonts noch nicht gekauft: Fraunces (Google Fonts) als Interim-Serif, Instrument Sans als Interim-Body

---

## Farbpalette (aus InDesign IDML extrahiert)

| Name | RGB | Hex | Verwendung |
|---|---|---|---|
| Near-Black | 13, 13, 13 | `#0D0D0D` | Headlines, Text auf hellem Grund |
| Pure Black | 0, 0, 0 | `#000000` | Textelemente |
| Purple Accent | 124, 58, 237 | `#7C3AED` | Akzentfarbe (Hero-Gradient, CTAs) |
| Off-White BG | 249, 249, 249 | `#F9F9F9` | Seitenhintergrund |
| Light Gray | 230, 230, 230 | `#E6E6E6` | Trennlinien, subtile Elemente |
| Dark Gray | 40, 40, 40 | `#282828` | Dunkle Sektionen (Material, Footer) |
| White | 255, 255, 255 | `#FFFFFF` | Text auf dunklem Grund |

---

## Seitenstruktur (Sections in Scroll-Reihenfolge)

Jede Section hat ein begleitendes PNG in diesem Ordner. **Baue das Layout exakt nach dem PNG.**

### 00 — Navigation + Hero
**PNG:** `00_nav_hero.jpg`

- **Nav:** Logo links (Chopper Couture Spikes-Wordmark), Menülinks Mitte (SHOP, PROCESS, MATERIAL, ABOUT), CTA rechts
- **Hero:** Fullscreen Video/Bild mit grün-türkis getöntem Close-Up (Grillz im Mund)
- **Headline:** `got options...` (PP Hatton Ultralight, weiß, linksbündig)
- **CTA-Button:** `Designe deine Grillz ->` (weißer Outline-Button)
- **Label:** `V-05` unten links (Video-Kennung)

### 01 — The Process
**PNGs:** `01_process_header.jpg` + `02_process_steps.jpg`

- **Topline:** `01 — THE PROCESS` (PP Hatton Ultralight)
- **Headline:** `Vom Abdruck zum Schmuck` (Loos ExtraWide Bold)
- **Subline:** `6 Schritte, von deinem Mund bis zum fertigen Grill.`
- **Video-Platzhalter:** `Prozess Video` Label
- **6 Schritte** in alternierender Links-Rechts-Anordnung (Bild links/Text rechts, dann umgekehrt):

| Step | Titel | Text |
|---|---|---|
| 01 | ABDRUCK | Wir treffen uns im Labor, ich schiebe dir nen Löffel mit Alginat in den Mund eine Minute warten.. Tut nix, schmeckt nach nix. Done. |
| 02 | GIPSMODELL | Aus deinem Abdruck gieße ich ein Gipsmodell. Millimetergenau, von hier an arbeite ich nur noch mit deinem Modell, nicht mehr mit dir. |
| 03 | SCAN | Dein Modell kommt unter den 3D-Scanner. Blaue Laser, ein paar Sekunden, fertig. Dein Kiefer existiert jetzt auch digital. |
| 04 | 3D-DESIGN | In einer 3D Software designe ich dein Grillz direkt auf deinen Zähnen. Du sagst mir, was du willst, wir iterieren so lange, bis es sitzt. Erst dann geht's weiter. |
| 05 | SLM-DRUCK | Selective Laser Melting beim Schütz Fräszentrum. Dein Stück wird Schicht für Schicht aus Edelmetall aufgeschichtet, ein Guss, ohne Naht. Mehr dazu unter Medizinisches. |
| 06 | POLITUR | Saubere politur mit 30 000 Touren. Jede Kante, jede Spitze. Erst wenn's glänzt, ist es deins. |

### 02 — Designer (Konfigurator)
**PNG:** `03_designer_konfigurator.jpg`

- **Topline:** `02 — DESIGNER`
- **Headline:** `DESIGN DEIN STÜCK.` (Inter Black)
- **Subline:** `Spiel dich durch. Stil aussuchen, Zähne anklicken, abschicken — ich meld mich bei dir und wir machen einen Termin klar. Ganz unverbindlich.`
- **Zwei Spalten:**
  - Links: `01 - Klicke die Zähne an` (interaktive Zahn-Grafik — Placeholder für Konfigurationsmodul)
  - Rechts: `02 - Wähle deinen Style` mit 4 Style-Karten:

| Style | Beschreibung | Preis |
|---|---|---|
| Spiky | Kantig, spitz, agressiv. | 170€ jeder weitere 90€ |
| Organic | weich, luftig, freundlich. | 160€ jeder weitere 85€ |
| Whole | ganzer Zahn. glatt, silber. | 120€ jeder weitere 65€ |
| Ornamental | verspielt, dynamisch, dekorativ | 210€ jeder weitere 95€ |

  - `03 - Spezielle Wünsche` (Textfeld)
  - `Grober Preis:` (dynamische Anzeige)
  - **CTA:** `Anfrage senden ->`
  - Pfeil-Indikator: `↓`

### Brand Promise
**PNG:** `04_brand_promise.jpg`

- **Label:** `BRAND PROMISE`
- **Headline:** `LIFECHANGING SMILES.` (Loos ExtraWide Bold, sehr groß)
- **Subline:** `Schmuck, der im Kopf bleibt.`
- Dunkler Hintergrund (gradient/overlay)

### 03 — Galerie
**PNG:** `05_gallery.jpg`

- **Topline:** `03 — Galerie`
- **Headline:** `SELECTED PIECES` (Loos ExtraWide Bold)
- **Subline:** `Ein paar Stücke aus dem Studio. Jedes anders, jedes für genau einen Menschen gemacht. Vielleicht ist deins als nächstes dabei.`
- Horizontaler Image-Slider/Scroll mit Grillz-Fotos
- `skip galery` Link unten

### 04 — Material & Sicherheit
**PNG:** `06_material.jpg`

- **Topline:** `04 — Gut zu Wissen`
- **Oberhalb:** `Gefertigt im LABOR BRAUNDENTALIS. SLM-druck beim SCHÜTZ FRÄSZENTRUM GLASHÜTTE.` (die Lab-Namen sind bold/hervorgehoben)
- **Headline:** `MATERIAL & SICHERHEIT` (Inter Black)
- **5 Info-Karten** in 2-Spalten-Grid:

| Nr. | Titel | Text |
|---|---|---|
| 01 | DAS MATERIAL | CoCr-Legierung (Kobalt-Chrom), ein etabliertes Dentalmetall, seit Jahrzehnten für Zahnersatz im Mund. Nickelfrei, berylliumfrei. |
| 02 | BIOKOMPATIBEL | Erfüllt die ISO-Normen für Dentallegierungen, ausgelegt auf Verträglichkeit im Mundraum. Keine fragwürdigen Zusätze. |
| 03 | SLM-VERFAHREN | Selective Laser Melting: Metall wird bei über 1400 °C Schicht für Schicht verschmolzen. Ein Stück, ohne Naht, ohne Lötstellen. |
| 04 | PFLEGE | Zum Essen rausnehmen, danach kurz unter lauwarmem Wasser abspülen. Kein kochendes Wasser, keine aggressiven Reiniger, dann hält's ewig. |
| 05 | NUTZUNG | Du solltest die Grillz nicht mehr als einmal die Woche tragen, bei zu häufigem oder langem tragen kann es zu Kopfschmerzen führen. |

- **Disclaimer:** `Grillz sind Schmuck, kein medizinisches Hilfsmittel. Bei Allergien, Zahnfleisch-Themen oder Zahnspangen sprich vorher kurz mit deiner Zahnärztin oder deinem Zahnarzt.`

### 05 — About
**PNG:** `07_about.jpg`

- **Topline:** `05 — About`
- **Headline:** `CHOPPER COUTURE` (Loos ExtraWide Bold)
- **Body Text:** `Chopper Couture macht Zahnschmuck in Berlin. Grillz, die nicht nach Klischee aussehen. Fein, sauber, modern. Hochpräzise auf dein Gebiss angepasst. Hinter Chopper Couture steck ich. Anika, ausgebildete Zahntechnikerin und Art direktorin. Ich habe viele Jahre erfahrung in der Zahntechnik gesammelt und habe meine beiden leidenschaften zusammengebracht. So entstand Chopper Couture.`
- **CTA:** `LERN MICH KENNEN ->`
- **4 Werte-Karten** in einer Reihe:

| Nr. | Titel | Text |
|---|---|---|
| 01 | PRÄZISION | Handwerk steht über allem. |
| 02 | INKLUSION | Für alle, die Zähne haben. |
| 03 | AUSDRUCK | Schmuck als persönliche Sprache. |
| 04 | HANDWERK | Made to fit. Jedes Stück individuell. |

### 06 — Contact
**PNG:** `08_contact_footer.jpg`

- **Topline:** `06 — Contact`
- **Headline:** `Lass quatschen!` (Loos ExtraWide Bold)
- **Subline:** `Frage, Idee oder einfach Lust auf ein piece? Schreib mir! du landest direkt bei mir, nicht in irgendeinem Support-Postfach.`
- **Zwei Sternchen** `*` als dekorative Elemente links und rechts
- **Kontaktinfo:**
  - `DIREKT`
  - `insta: @choppercouture`
  - `contact@choppercouture.de`
- **CTA:** `Anfrage senden ->`

### Footer
- Links: `ABOUT  MATERIAL  IMPRESSUM  DATENSCHUTZ  AGB  INSTAGRAM  E-MAIL`
- Rechts: `© 2026 CHOPPER COUTURE. ALL RIGHTS RESERVED.`

### 08 — Impressum (Separate Seite)
**PNG:** `09_impressum.jpg`

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

## Layout-Prinzipien

- **Viewport-Breite:** 1440px Design-Breite (responsiv skalieren)
- **Seitlicher Padding:** ~80px (ca. 5.5% der Breite)
- **Section-Abstände:** Großzügig — jede Section hat deutlich Luft nach oben und unten
- **Dunkle Sektionen:** Hero (Video-Overlay), Brand Promise, Material-Header haben dunklen/schwarzen Hintergrund
- **Helle Sektionen:** Process Steps, Designer, About, Contact auf Off-White (#F9F9F9)
- **Process Steps:** Alternierende Anordnung — Bild links/Text rechts, dann umgekehrt
- **Grid:** 2-Spalten für Designer (Zähne | Styles), Material-Karten, About-Werte 4-spaltig

---

## Interaktive Elemente

1. **Smooth Scroll:** Lenis
2. **Scroll-Animationen:** GSAP ScrollTrigger für Fade-Ins, Parallax auf Hero-Video
3. **Galerie:** Horizontaler Scroll/Slider für Selected Pieces
4. **Konfigurator (Section 02):** Interaktives Zahn-Klick-Tool + Style-Auswahl + Preisberechnung
5. **Video-Einbettungen:** Hero-Video, Prozess-Video
6. **Navigation:** Sticky Nav mit Scroll-to-Section

---

## Assets die noch geliefert werden müssen

- [ ] Logo SVGs (Wordmark, Lettermark, Spikes-Variante)
- [ ] Hero-Video
- [ ] Prozess-Video
- [ ] Fotos für die 6 Prozess-Schritte
- [ ] Galerie-Fotos (Selected Pieces)
- [ ] About-Foto (Anika-Portrait)
- [ ] Pangram Pangram Webfont-Dateien (Loos ExtraWide, Loos Wide, PP Hatton) — ODER Alternativ-Fonts definieren
- [ ] Favicon / OpenGraph-Image

---

## Dateistruktur dieses Pakets

```
builder_package/
├── BUILDER_SPECS.md          ← Diese Datei
├── 00_nav_hero.jpg           ← Navigation + Hero Section
├── 01_process_header.jpg     ← Process Überschrift + Video
├── 02_process_steps.jpg      ← Die 6 Prozess-Schritte
├── 03_designer_konfigurator.jpg ← Zahn-Konfigurator
├── 04_brand_promise.jpg      ← "Lifechanging Smiles"
├── 05_gallery.jpg            ← Selected Pieces Galerie
├── 06_material.jpg           ← Material & Sicherheit
├── 07_about.jpg              ← About / Chopper Couture
├── 08_contact_footer.jpg     ← Contact + Footer
└── 09_impressum.jpg          ← Impressum (separate Seite)
```

---

## Anweisung an Claude Code

> Baue jede Section exakt nach dem zugehörigen PNG nach. Die PNGs sind das Master-Layout.
> Verwende die Texte aus diesem Dokument (copy-paste-fertig).
> Halte dich an die Typografie- und Farb-Specs.
> Wenn etwas im PNG nicht lesbar ist, verwende die Texte aus diesem Dokument.
> Bilder/Videos sind Platzhalter — verwende <div>-Platzhalter mit Seitenverhältnis.
