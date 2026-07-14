# ChopperCouture_Website_Mockup.idml

Layout-Mockup der Website als InDesign-Datei zum manuellen Editieren
von Text und Aufbau.

## Was drin ist

- **Seite 1 — Homepage** (1440 × 12.470 pt)
  Hero · Pieces · Process · Material · Designer · About-Preview ·
  Brand Promise · Contact · Footer
- **Seite 2 — About** (1440 × 4.700 pt)
  Hero-Portrait · Story · Vier Werte · Brand Promise · Studio · Footer
- 184 Textrahmen mit dem aktuellen Website-Text (Stand 2026-07-02)
- Farbfelder: `CC Black`, `CC Offwhite`, `CC Purple`, `CC Pink`
- Layout in Punkten (1 pt = 1 px auf Web) — 1440 pt = Desktop-Breite

## Fonts

- **Inter Black** (Headlines, `.font-black`)
- **Saira Expanded Light** (Body-Copy)
- **JetBrains Mono Regular** (Caps-Labels / Nummern)

Wenn die Schriften nicht installiert sind, ersetzt InDesign sie automatisch
mit einer Warnung. Zum passgenauen Setup:

- Inter: https://rsms.me/inter/ (kostenlos)
- Saira Expanded: Google Fonts
- JetBrains Mono: https://jetbrains.com/lp/mono/ (kostenlos)

## Bilder

Aus Portabilitätsgründen sind Bilder **NICHT** vor-verlinkt — sie liegen als
graue Platzhalter-Rechtecke mit dem Dateinamen als Objekt-Name.

**So einfügen:**
1. Rechteck in InDesign anwählen
2. `File → Place…` (`⌘ + D`)
3. Passendes Bild aus `../public/images/…` wählen
4. `Frame Fitting → Fill Frame Proportionally` (`⌘⇧⌥ C`)

**Wo liegt welches Bild:**

| Rechteck (Objektname)             | Datei                                       |
|-----------------------------------|---------------------------------------------|
| `hero-loop.mp4`                    | Video — Standbild z.B. per QuickTime ziehen |
| `DSC00550.jpg` … `DSC00571.jpg`   | `public/images/pieces-new/`                 |
| `01-abdruck.png` … `06-politur.jpg` | `public/images/process-new/`              |
| `grill-designer.png`              | `public/images/designer/grill-designer.png` |

## Was noch fehlt / manuell zu machen

- **Video-Placeholders** (Hero, ggf. Process) — grau, mit Label
  `[ VIDEO — hero-loop.mp4 ]`. Video-Standbild extrahieren oder Foto einsetzen.
- **Zahn-Designer-Overlays**: die 20 rosa Zahn-Polygone aus dem Website-SVG
  sind hier nicht als Vektor-Ebene drin (wäre 300+ Punkte pro Zahn).
  Für ein Print-/Konzept-Mockup ist das Grillz-JPG allein ausreichend.
- **Kartenränder um die 4 Stil-Karten** im Designer sind als leere Rechtecke
  vorhanden — einfach Border-Strich in InDesign setzen (1pt schwarz 15%).
- **Sub-Pages** (Process, Pieces, Contact als eigene Route) sind nicht als
  eigene Seiten drin — die Inhalte tauchen aber auf der Homepage-Seite auf.

## Datei regenerieren

Wenn Website-Texte geändert wurden, kann die IDML neu erzeugt werden:

```
cd chopper-couture
python3 indesign/build_idml.py
```

Voraussetzung einmalig: `pip3 install --user simpleidml lxml`
