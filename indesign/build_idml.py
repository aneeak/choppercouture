#!/usr/bin/env python3
"""
Chopper Couture Website — IDML Generator

Erzeugt eine .idml-Datei mit dem aktuellen Layout der Website (Homepage + About)
zum manuellen Nachbearbeiten in InDesign.

Strategie:
  - Boilerplate (mimetype, container, Fonts, Preferences, Styles, MasterSpread,
    XML/Tags, XML/BackingStory) wird 1:1 aus der vorhandenen brand IDML kopiert
    → InDesign kennt die Struktur bereits.
  - Nur diese Files werden neu generiert:
      Resources/Graphic.xml   (minimaler Farbsatz)
      designmap.xml           (referenziert neue Spreads/Stories)
      Spreads/Spread_home.xml
      Spreads/Spread_about.xml
      Stories/Story_*.xml     (eine pro Textrahmen)

Koordinatensystem der Spreads (in Punkten, 1440 pt = Websitebreite):
  - Origin (0,0) = obere linke Ecke der Seite
  - Y-Achse geht nach unten
  - IDML speichert Positionen als ItemTransform-Matrix "a b c d tx ty"
    tx / ty = Verschiebung; wir setzen a=d=1, b=c=0 (keine Rotation/Skalierung).
"""

from __future__ import annotations
import os
import shutil
import zipfile
from pathlib import Path
from typing import Optional
from html import escape

# -----------------------------------------------------------------------------
# Pfade
# -----------------------------------------------------------------------------
PROJECT   = Path("/Users/dinkaisch/Documents/CC Chopper Couture/CC_Kreation/CC_Webdesign/CC_Webiste neu /chopper-couture")
REF_IDML  = PROJECT / "indesign/Builder_Chopper_couture Ordner_2/Builder_Chopper_couture.idml"
BUILD_DIR = Path("/private/tmp/claude-501/-Users-dinkaisch-Documents-Job-Dinkaisch-webpage/02df04d9-3264-4957-8d63-815c14717a10/scratchpad/idml-out")
OUT_IDML  = PROJECT / "indesign" / "ChopperCouture_Website_Mockup.idml"

# -----------------------------------------------------------------------------
# Seitenlayout — Konstanten
# -----------------------------------------------------------------------------
PAGE_W   = 1440.0            # Punkte Breite (= 1440px web breakpoint)
GUT      = 96.0              # linkes/rechtes Padding wie md:px-12 (48px = 12*4)
CONTENT_W = PAGE_W - 2 * GUT  # 1248pt Inhaltsbreite

# Farben (referenzieren Namen aus Resources/Graphic.xml)
C_BLACK      = "Color/cc-black"
C_OFFWHITE   = "Color/cc-offwhite"
C_PURPLE     = "Color/cc-purple"
C_PINK       = "Color/cc-pink"
C_BLACK_60   = "Color/cc-black-60"
C_OFFWHITE_60 = "Color/cc-offwhite-60"
C_GREY_MED   = "Color/cc-grey-med"
C_NONE       = "Swatch/None"

# -----------------------------------------------------------------------------
# ID-Generator (fortlaufende hex-Suffixes wie in InDesign: u1234)
# -----------------------------------------------------------------------------
class IDGen:
    def __init__(self, start: int = 0x1000):
        self._n = start
    def next(self, prefix: str = "u") -> str:
        s = f"{prefix}{self._n:x}"
        self._n += 1
        return s

ids = IDGen()

# -----------------------------------------------------------------------------
# Zeitpunkt: Sammlung der Story-XMLs, Story-IDs und referenzierten Links
# -----------------------------------------------------------------------------
STORIES: dict[str, str] = {}      # story_id -> xml content
STORY_LIST: list[str] = []        # in-order Liste aller Story-IDs für designmap

# -----------------------------------------------------------------------------
# XML-Helpers
# -----------------------------------------------------------------------------
XML_DECL = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
IDPKG_NS = 'xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging"'

def enc(s: str) -> str:
    return escape(s, quote=False).replace("„", "&#x201E;").replace("“", "&#x201C;")

# -----------------------------------------------------------------------------
# Story bauen (Text mit optionalem H1/H2/Body/Caption/Mono-Format)
# -----------------------------------------------------------------------------
FONTS = {
    "sans":  "Inter",
    "black": "Inter",
    "mono":  "JetBrains Mono",
    "wide":  "Saira Expanded",
}

# Presets ( font-family, weight, point size, tracking(1/1000em), color )
STYLE_PRESETS = {
    # h1: gigantische Website-Headline
    "h1":       ("black", "Black",   140.0,  -20,  C_BLACK),
    "h1_light": ("black", "Black",   140.0,  -20,  C_OFFWHITE),
    "h1_purp":  ("black", "Black",   140.0,  -20,  C_OFFWHITE),
    # h2 : sektions-Sub-Headline
    "h2":       ("black", "Black",    72.0,  -15,  C_BLACK),
    "h2_light": ("black", "Black",    72.0,  -15,  C_OFFWHITE),
    "h2_med":   ("black", "Black",    56.0,  -15,  C_OFFWHITE),
    # h3 (kleiner)
    "h3":       ("black", "Black",    28.0,   -5,  C_BLACK),
    "h3_light": ("black", "Black",    28.0,   -5,  C_OFFWHITE),
    # body 18px
    "body":     ("wide",  "Light",    18.0,    0,  C_BLACK),
    "body_light": ("wide", "Light",   18.0,    0,  C_OFFWHITE),
    "body_mut": ("wide",  "Light",    18.0,    0,  C_BLACK_60),
    "body_mut_light": ("wide","Light",18.0,    0,  C_OFFWHITE_60),
    "body_lg":  ("wide",  "Light",    22.0,    0,  C_OFFWHITE),
    # mono / caps caption
    "cap":      ("mono",  "Regular",  12.0,   50,  C_BLACK_60),
    "cap_light":("mono",  "Regular",  12.0,   50,  C_OFFWHITE_60),
    "cap_purp": ("mono",  "Regular",  12.0,   50,  C_OFFWHITE),
    # Preis groß (Designer)
    "price":    ("black", "Black",    56.0,  -15,  C_BLACK),
    # Werte-Nummer (01/02/03)
    "n":        ("mono",  "Regular",  12.0,   50,  C_BLACK_60),
    "n_light":  ("mono",  "Regular",  12.0,   50,  C_OFFWHITE_60),
}

def _char_range(text: str, font_family: str, font_style: str, point_size: float,
                tracking: int, color: str, leading: Optional[float] = None) -> str:
    lead_prop = f'<Leading type="unit">{leading}</Leading>' if leading is not None else '<Leading type="enumeration">Auto</Leading>'
    return (
        f'<CharacterStyleRange AppliedCharacterStyle="CharacterStyle/$ID/[No character style]"'
        f' FillColor="{color}" FontStyle="{font_style}" PointSize="{point_size}"'
        f' Tracking="{tracking}" OTFContextualAlternate="false">'
        f'<Properties>'
        f'{lead_prop}'
        f'<AppliedFont type="string">{FONTS[font_family]}</AppliedFont>'
        f'</Properties>'
        f'<Content>{enc(text)}</Content>'
        f'</CharacterStyleRange>'
    )

def _paragraph(text: str, preset: str, align: str = "LeftAlign") -> str:
    fam, style, size, track, color = STYLE_PRESETS[preset]
    # Leading passend zur Größe (für h1 tight, Body 1.5)
    if preset.startswith("h1") or preset.startswith("h2"):
        lead = round(size * 1.05, 1)
    elif preset.startswith("h3") or preset == "price":
        lead = round(size * 1.1, 1)
    elif preset in ("body", "body_light", "body_mut", "body_mut_light", "body_lg"):
        lead = round(size * 1.5, 1)
    else:
        lead = round(size * 1.3, 1)
    return (
        f'<ParagraphStyleRange AppliedParagraphStyle="ParagraphStyle/$ID/NormalParagraphStyle" Justification="{align}">'
        f'{_char_range(text, fam, style, size, track, color, leading=lead)}'
        f'</ParagraphStyleRange>'
    )

def make_story(paragraphs: list[tuple[str, str]]) -> str:
    """
    paragraphs = [ ("Text", "preset"), ... ]
    Returns story_id.
    """
    sid = ids.next()
    body = ""
    for text, preset in paragraphs:
        # Text kann Zeilenumbrüche enthalten → in separate Paragraphs teilen
        lines = text.split("\n")
        for i, line in enumerate(lines):
            body += _paragraph(line, preset)
    STORIES[sid] = (
        f'{XML_DECL}\n'
        f'<idPkg:Story {IDPKG_NS} DOMVersion="19.0">'
        f'<Story Self="{sid}" UserText="true" IsEndnoteStory="false" AppliedTOCStyle="n"'
        f' TrackChanges="false" StoryTitle="$ID/" AppliedNamedGrid="n">'
        f'<StoryPreference OpticalMarginAlignment="false" OpticalMarginSize="12"'
        f' FrameType="TextFrameType" StoryOrientation="Horizontal" StoryDirection="LeftToRightDirection" />'
        f'<InCopyExportOption IncludeGraphicProxies="true" IncludeAllResources="false" />'
        f'{body}'
        f'</Story>'
        f'</idPkg:Story>'
    )
    STORY_LIST.append(sid)
    return sid

# -----------------------------------------------------------------------------
# Spread-Frames bauen (Rectangle, TextFrame, Image-Rectangle)
# -----------------------------------------------------------------------------
def _path_geometry(w: float, h: float) -> str:
    """
    Rectangle path in InDesigns 'local coordinates'.
    Wir zentrieren um den Ursprung: von (-w/2,-h/2) bis (+w/2,+h/2).
    (Das ist so, wie InDesign es intern speichert; ItemTransform verschiebt dann.)
    """
    half_w = w / 2
    half_h = h / 2
    return (
        f'<Properties>'
        f'<PathGeometry>'
        f'<GeometryPathType PathOpen="false">'
        f'<PathPointArray>'
        f'<PathPointType Anchor="{-half_w} {-half_h}" LeftDirection="{-half_w} {-half_h}" RightDirection="{-half_w} {-half_h}" />'
        f'<PathPointType Anchor="{-half_w} {half_h}" LeftDirection="{-half_w} {half_h}" RightDirection="{-half_w} {half_h}" />'
        f'<PathPointType Anchor="{half_w} {half_h}" LeftDirection="{half_w} {half_h}" RightDirection="{half_w} {half_h}" />'
        f'<PathPointType Anchor="{half_w} {-half_h}" LeftDirection="{half_w} {-half_h}" RightDirection="{half_w} {-half_h}" />'
        f'</PathPointArray>'
        f'</GeometryPathType>'
        f'</PathGeometry>'
        f'</Properties>'
    )

def rect(x: float, y: float, w: float, h: float, fill: str = C_NONE, layer: str = "ud7b") -> str:
    """Farbrechteck als Hintergrund/Divider."""
    rid = ids.next()
    center_x = x + w / 2
    center_y = y + h / 2
    return (
        f'<Rectangle Self="{rid}" ContentType="Unassigned" StoryTitle="$ID/"'
        f' Visible="true" Name="$ID/" FillColor="{fill}" StrokeColor="{C_NONE}"'
        f' StrokeWeight="0" GradientFillStart="0 0" GradientFillLength="0" GradientFillAngle="0"'
        f' GradientStrokeStart="0 0" GradientStrokeLength="0" GradientStrokeAngle="0"'
        f' ItemLayer="{layer}" Locked="false" LocalDisplaySetting="Default"'
        f' AppliedObjectStyle="ObjectStyle/$ID/[Normal Graphics Frame]"'
        f' ItemTransform="1 0 0 1 {center_x} {center_y}">'
        f'{_path_geometry(w, h)}'
        f'<FrameFittingOption AutoFit="false" LeftCrop="0" TopCrop="0" RightCrop="0" BottomCrop="0" FittingOnEmptyFrame="None" FittingAlignment="CenterAnchor" />'
        f'<TextWrapPreference Inverse="false" ApplyToMasterPageOnly="false" TextWrapSide="BothSides" TextWrapMode="None">'
        f'<Properties><TextWrapOffset Top="0" Left="0" Bottom="0" Right="0" /></Properties>'
        f'</TextWrapPreference>'
        f'</Rectangle>'
    )

def text_frame(x: float, y: float, w: float, h: float, story_id: str,
               inset: float = 0.0, layer: str = "ud7b") -> str:
    """Text-Rahmen um Story."""
    fid = ids.next()
    center_x = x + w / 2
    center_y = y + h / 2
    inset_str = f'<TextFramePreference TextColumnCount="1" InsetSpacing="{inset} {inset} {inset} {inset}" />' if inset else ''
    return (
        f'<TextFrame Self="{fid}" ParentStory="{story_id}" PreviousTextFrame="n" NextTextFrame="n"'
        f' ContentType="TextType" Visible="true" Name="$ID/"'
        f' FillColor="{C_NONE}" StrokeColor="{C_NONE}" StrokeWeight="0"'
        f' GradientFillStart="0 0" GradientFillLength="0" GradientFillAngle="0"'
        f' GradientStrokeStart="0 0" GradientStrokeLength="0" GradientStrokeAngle="0"'
        f' ItemLayer="{layer}" Locked="false" LocalDisplaySetting="Default"'
        f' AppliedObjectStyle="ObjectStyle/$ID/[Normal Text Frame]"'
        f' ItemTransform="1 0 0 1 {center_x} {center_y}">'
        f'{_path_geometry(w, h)}'
        f'{inset_str}'
        f'<TextWrapPreference Inverse="false" ApplyToMasterPageOnly="false" TextWrapSide="BothSides" TextWrapMode="None">'
        f'<Properties><TextWrapOffset Top="0" Left="0" Bottom="0" Right="0" /></Properties>'
        f'</TextWrapPreference>'
        f'</TextFrame>'
    )

# Sammler für Link-Definitionen im Spread
IMAGE_LINKS: list[tuple[str, str]] = []  # (rect_id, filepath)

def image_frame(x: float, y: float, w: float, h: float, filepath: str,
                label: str = "", layer: str = "ud7b") -> str:
    """
    Rechteck mit Platzhalter für Bild.
    filepath: absoluter Pfad (relativ zum Projekt-Root, mit file://-Prefix im Link).
    label: wenn gesetzt, Overlay-Text (z.B. „VIDEO — hero-loop.mp4")
    """
    fid = ids.next()
    center_x = x + w / 2
    center_y = y + h / 2

    # Grauer Fill als Platzhalter — wird durch verlinktes Bild überlagert
    fill = C_GREY_MED

    # Story-ID für optionales Label (im rects gerendert daneben)
    label_frame = ""
    if label:
        sid = make_story([(label, "cap_light")])
        label_frame = text_frame(x + 24, y + 24, w - 48, 40, sid, layer=layer)

    return (
        f'<Rectangle Self="{fid}" ContentType="Unassigned" StoryTitle="$ID/"'
        f' Visible="true" Name="{enc(Path(filepath).name)}" FillColor="{fill}" StrokeColor="{C_NONE}"'
        f' StrokeWeight="0" GradientFillStart="0 0" GradientFillLength="0" GradientFillAngle="0"'
        f' GradientStrokeStart="0 0" GradientStrokeLength="0" GradientStrokeAngle="0"'
        f' ItemLayer="{layer}" Locked="false" LocalDisplaySetting="Default"'
        f' AppliedObjectStyle="ObjectStyle/$ID/[Normal Graphics Frame]"'
        f' ItemTransform="1 0 0 1 {center_x} {center_y}">'
        f'{_path_geometry(w, h)}'
        f'<FrameFittingOption AutoFit="false" LeftCrop="0" TopCrop="0" RightCrop="0" BottomCrop="0" FittingOnEmptyFrame="None" FittingAlignment="CenterAnchor" />'
        f'<TextWrapPreference Inverse="false" ApplyToMasterPageOnly="false" TextWrapSide="BothSides" TextWrapMode="None">'
        f'<Properties><TextWrapOffset Top="0" Left="0" Bottom="0" Right="0" /></Properties>'
        f'</TextWrapPreference>'
        f'</Rectangle>'
    ) + label_frame

# -----------------------------------------------------------------------------
# Spread-Struktur (Wrapper um alle Frames)
# -----------------------------------------------------------------------------
def build_spread(spread_id: str, page_id: str, page_name: str,
                 page_height: float, body: str) -> str:
    """
    Erzeugt ein komplettes Spread-XML.
    Achtung: die PageItems liegen im Spread-Koordinatensystem,
    der Page-ItemTransform verschiebt die Seite selbst.
    Wir arbeiten so:  Page-ItemTransform = "1 0 0 1 0 0"  (Seite bei 0,0),
    GeometricBounds = "0 0 {page_height} {PAGE_W}"
    Frame-ItemTransforms verschieben dann Frames ab (0,0) nach unten.
    """
    return f'''{XML_DECL}
<idPkg:Spread {IDPKG_NS} DOMVersion="19.0">
    <Spread Self="{spread_id}" PageTransitionType="None" PageTransitionDirection="NotApplicable"
            PageTransitionDuration="Medium" ShowMasterItems="true" PageCount="1"
            BindingLocation="0" AllowPageShuffle="true" ItemTransform="1 0 0 1 0 0"
            FlattenerOverride="Default">
        <FlattenerPreference LineArtAndTextResolution="300" GradientAndMeshResolution="150"
                             ClipComplexRegions="false" ConvertAllStrokesToOutlines="false"
                             ConvertAllTextToOutlines="false">
            <Properties>
                <RasterVectorBalance type="double">100</RasterVectorBalance>
            </Properties>
        </FlattenerPreference>
        <Page Self="{page_id}" TabOrder="" AppliedMaster="ud5" OverrideList=""
              MasterPageTransform="1 0 0 1 0 0" Name="{page_name}"
              AppliedTrapPreset="TrapPreset/$ID/kDefaultTrapStyleName"
              GeometricBounds="0 0 {page_height} {PAGE_W}"
              ItemTransform="1 0 0 1 0 0"
              AppliedAlternateLayout="n" LayoutRule="Off"
              SnapshotBlendingMode="IgnoreLayoutSnapshots"
              OptionalPage="false" GridStartingPoint="TopOutside" UseMasterGrid="true">
            <Properties>
                <PageColor type="enumeration">UseMasterColor</PageColor>
                <Descriptor type="list">
                    <ListItem type="string"></ListItem>
                    <ListItem type="enumeration">Arabic</ListItem>
                    <ListItem type="boolean">false</ListItem>
                    <ListItem type="boolean">false</ListItem>
                    <ListItem type="long">1</ListItem>
                    <ListItem type="string"></ListItem>
                </Descriptor>
            </Properties>
            <MarginPreference ColumnCount="1" ColumnGutter="12" Top="36" Bottom="36" Left="72" Right="72"
                              ColumnDirection="Horizontal" ColumnsPositions="0 1296" />
        </Page>
        {body}
    </Spread>
</idPkg:Spread>'''

# -----------------------------------------------------------------------------
# HOMEPAGE-Layout
# -----------------------------------------------------------------------------
def build_homepage() -> tuple[str, float]:
    y = 0.0
    body = ""

    # === HERO — schwarzer Hintergrund + Video-Platzhalter ===
    hero_h = 900
    body += rect(0, y, PAGE_W, hero_h, C_BLACK)
    # Video-Placeholder-Rechteck
    body += image_frame(0, y, PAGE_W, hero_h,
                       "public/videos/hero-loop.mp4",
                       label="[ VIDEO — hero-loop.mp4 ]")
    # Wordmark-Text (statt Partikel-Logo)
    sid = make_story([("CHOPPER COUTURE", "h1_light")])
    body += text_frame(GUT, y + hero_h/2 - 80, CONTENT_W, 160, sid)
    # Subline links
    sid = make_story([("Dental Jewellery — Berlin", "cap_light")])
    body += text_frame(GUT, y + hero_h/2 + 100, 500, 24, sid)
    # Scroll unten
    sid = make_story([("Scroll", "cap_light")])
    body += text_frame(PAGE_W/2 - 50, y + hero_h - 60, 100, 24, sid)
    y += hero_h

    # === 01 - PIECES ===
    section_h = 1200
    body += rect(0, y, PAGE_W, section_h, C_OFFWHITE)
    y2 = y + 160  # top padding
    sid = make_story([("01 — Pieces", "cap")])
    body += text_frame(GUT, y2, 500, 24, sid); y2 += 60
    sid = make_story([("Selected", "h1"), ("Pieces.", "h1")])
    body += text_frame(GUT, y2, CONTENT_W, 340, sid); y2 += 340
    sid = make_story([("Ein paar Stücke aus dem Studio. Jedes anders, jedes für genau einen Menschen gemacht. Vielleicht ist deins als nächstes dabei.", "body_mut")])
    body += text_frame(GUT, y2, 720, 100, sid); y2 += 140
    # Galerie: 14 Bilder als horizontale Reihe (2 sichtbar pro Viewport)
    gal_x = 0
    gal_w = (PAGE_W - 20) / 2  # 2 Bilder pro Reihe zum Anzeigen
    gal_h = 500
    # Zeige exemplarisch 6 Bilder gestapelt (3 Reihen à 2)
    pieces = [
        "public/images/pieces-new/DSC00550.jpg",
        "public/images/pieces-new/DSC00615.jpg",
        "public/images/pieces-new/DSC00585.jpg",
        "public/images/pieces-new/DSC00412.jpg",
        "public/images/pieces-new/DSC00386.jpg",
        "public/images/pieces-new/DSC00519.jpg",
    ]
    for i, p in enumerate(pieces):
        col = i % 2
        row = i // 2
        gx = 10 + col * (gal_w + 10)
        gy = y2 + row * (gal_h + 10)
        body += image_frame(gx, gy, gal_w, gal_h, p, label=f"V-{i+1:02d}")
    y2 += 3 * (gal_h + 10)
    y = max(y + section_h, y2 + 120)

    # === 02 - PROCESS ===
    body += rect(0, y, PAGE_W, 100, C_OFFWHITE)  # continue offwhite
    yh = y + 160
    sid = make_story([("02 — The Process", "cap")])
    body += text_frame(GUT, yh, 500, 24, sid); yh += 60
    sid = make_story([("Vom Abdruck", "h1"), ("zum Stück.", "h1")])
    body += text_frame(GUT, yh, CONTENT_W, 340, sid); yh += 340
    sid = make_story([("Sechs Schritte, von deinem Mund bis zum fertigen Grillz. Kein Stress, kein Würgen — versprochen. Alles läuft durch meine Hände, und du bist bei jedem Schritt dabei.", "body_mut")])
    body += text_frame(GUT, yh, 720, 120, sid); yh += 160

    steps = [
        ("01", "Abdruck", "Wir treffen uns im Studio, ich schiebe dir ne Schale mit Alginat in den Mund — eine Minute, kein Würgen, kein Stress. Tut nix, schmeckt nach nix. Done.", "public/images/process-new/01-abdruck.png"),
        ("02", "Gipsmodell", "Aus deinem Abdruck gieße ich ein türkises Gipsmodell. Knallhart, millimetergenau — von hier an arbeite ich nur noch mit deinem Modell, nicht mehr mit dir.", "public/images/process-new/02-gipsmodell.png"),
        ("03", "Scan", "Dein Modell kommt unter den 3D-Scanner. Blaue Laser, ein paar Sekunden, fertig — dein Kiefer existiert jetzt auch digital.", "public/images/process-new/03-scan.jpg"),
        ("04", "3D-Design", "In 3Shape baue ich dein Grillz direkt auf deinen Zähnen. Du sagst mir, was du willst — wir iterieren so lange, bis es sitzt. Erst dann geht's weiter.", "public/images/process-new/04-3d-design.png"),
        ("05", "SLM-Druck", "Selective Laser Melting beim Schütz Fräszentrum. Dein Stück wird Schicht für Schicht aus Edelmetall geschmolzen — ein Guss, ohne Naht.", "public/images/process-new/05-slm.jpg"),
        ("06", "Politur", "Stundenlang mit dem Stück in der Hand. Jede Kante, jeder Innenraum. Erst wenn's leuchtet, ist es deins.", "public/images/process-new/06-politur.jpg"),
    ]
    step_h = 360
    for i, (n, t, b, img) in enumerate(steps):
        row_y = yh + i * (step_h + 40)
        # Layout wechselt (Bild links / rechts)
        image_left = (i % 2 == 0)
        img_x = GUT if image_left else GUT + CONTENT_W/2 + 20
        txt_x = GUT + CONTENT_W/2 + 20 if image_left else GUT
        img_w = CONTENT_W/2 - 20
        body += image_frame(img_x, row_y, img_w, step_h, img)
        # Text
        sid = make_story([(n, "n")])
        body += text_frame(txt_x, row_y + 20, 300, 24, sid)
        sid = make_story([(t, "h3")])
        body += text_frame(txt_x, row_y + 60, CONTENT_W/2 - 20, 60, sid)
        sid = make_story([(b, "body_mut")])
        body += text_frame(txt_x, row_y + 130, CONTENT_W/2 - 20, 200, sid)
    yh += len(steps) * (step_h + 40) + 100

    y = yh
    # Absorb rect-Fill für den ganzen bisherigen Bereich
    # (wir haben "process"-BG einfach nicht komplett ausgemalt; das ist ok da Frames unabhängig sind)

    # === MATERIAL & SICHERHEIT (dark) ===
    mat_h = 1400
    body += rect(0, y, PAGE_W, mat_h, C_BLACK)
    ym = y + 160
    sid = make_story([("Material & Sicherheit", "cap_light")])
    body += text_frame(GUT, ym, 500, 24, sid); ym += 60
    sid = make_story([("Gefertigt im Labor Braundentalis.", "h2_med"), ("SLM-Druck beim Schütz Fräszentrum.", "h2_med")])
    body += text_frame(GUT, ym, CONTENT_W, 240, sid); ym += 260

    materials = [
        ("01", "Das Material", "CoCr-Legierung (Kobalt-Chrom) — ein etabliertes Dentalmetall, seit Jahrzehnten für Zahnersatz im Mund. Nickelfrei, berylliumfrei."),
        ("02", "Biokompatibel", "Erfüllt die ISO-Normen für Dentallegierungen, ausgelegt auf Verträglichkeit im Mundraum. Keine fragwürdigen Zusätze."),
        ("03", "SLM-Verfahren", "Selective Laser Melting: Metall wird bei über 1400 °C Schicht für Schicht verschmolzen. Ein Stück, ohne Naht, ohne Lötstellen."),
        ("04", "Pflege", "Zum Essen rausnehmen, danach kurz unter lauwarmem Wasser abspülen. Kein kochendes Wasser, keine aggressiven Reiniger — dann hält's ewig."),
    ]
    col_w = (CONTENT_W - 80) / 2
    for i, (n, t, b) in enumerate(materials):
        col = i % 2
        row = i // 2
        cx = GUT + col * (col_w + 80)
        cy = ym + row * 340
        sid = make_story([(n, "n_light")])
        body += text_frame(cx, cy, 200, 20, sid)
        sid = make_story([(t, "h3_light")])
        body += text_frame(cx, cy + 40, col_w, 40, sid)
        sid = make_story([(b, "body_mut_light")])
        body += text_frame(cx, cy + 100, col_w - 20, 200, sid)
    ym += 720
    sid = make_story([("Grillz sind Schmuck, kein medizinisches Hilfsmittel. Bei Allergien, Zahnfleisch-Themen oder Zahnspangen sprich vorher kurz mit deiner Zahnärztin oder deinem Zahnarzt.", "body_mut_light")])
    body += text_frame(GUT, ym, 700, 80, sid)
    y += mat_h

    # === 03 - DESIGNER (light) ===
    des_h = 1600
    body += rect(0, y, PAGE_W, des_h, C_OFFWHITE)
    yd = y + 160
    sid = make_story([("03 — Designer", "cap")])
    body += text_frame(GUT, yd, 500, 24, sid); yd += 60
    sid = make_story([("Design dein", "h1"), ("Stück.", "h1")])
    body += text_frame(GUT, yd, CONTENT_W, 340, sid); yd += 340
    sid = make_story([("Spiel dich durch. Zähne anklicken, Stil aussuchen, abschicken — ich meld mich bei dir und wir machen einen Termin klar. Ganz unverbindlich.", "body_mut")])
    body += text_frame(GUT, yd, 720, 100, sid); yd += 140

    # Gebiss links (60%), Konfigurator rechts
    geb_w = CONTENT_W * 0.6
    geb_h = 720
    body += image_frame(GUT, yd, geb_w, geb_h,
                       "public/images/designer/grill-designer.png",
                       label="Interaktiver Gebiss-Designer")
    # Konfigurator-Bereich rechts
    cfg_x = GUT + geb_w + 40
    cfg_w = CONTENT_W - geb_w - 40
    cfy = yd
    sid = make_story([("Step 01 — Zähne wählen", "cap")])
    body += text_frame(cfg_x, cfy, cfg_w, 20, sid); cfy += 30
    sid = make_story([("Klick die Zähne an, die du willst. Zweiter Klick wählt ab.", "body_mut")])
    body += text_frame(cfg_x, cfy, cfg_w, 60, sid); cfy += 80
    sid = make_story([("Step 02 — Stil", "cap")])
    body += text_frame(cfg_x, cfy, cfg_w, 20, sid); cfy += 30
    # 4 Stil-Karten in 2x2
    styles_cfg = [
        ("Tribal", "Spiky, kantig, ein Statement.", "180 € · +100 €"),
        ("Ornamental", "Verspielt, kunstvoll, opulent.", "180 € · +100 €"),
        ("Modern", "Voll Silber, clean, zeitlos.", "120 € · +80 €"),
        ("Reduziert", "Ein Detail, maximale Wirkung.", "120 € · +80 €"),
    ]
    card_w = (cfg_w - 16) / 2
    card_h = 130
    for i, (t, b, p) in enumerate(styles_cfg):
        col = i % 2
        row = i // 2
        cx = cfg_x + col * (card_w + 16)
        cy = cfy + row * (card_h + 16)
        # Karten-Border als 1pt-Rechteck
        body += rect(cx, cy, card_w, card_h, C_NONE)  # placeholder — user zieht Border in InDesign
        sid = make_story([(t, "h3"), (b, "body_mut"), (p, "cap")])
        body += text_frame(cx + 16, cy + 16, card_w - 32, card_h - 32, sid)
    cfy += 2 * (card_h + 16) + 40
    sid = make_story([("Step 03 — Spezielle Wünsche", "cap")])
    body += text_frame(cfg_x, cfy, cfg_w, 20, sid); cfy += 30
    sid = make_story([("[ Textfeld — Material, Motiv, Stein, Schriftzug … ]", "body_mut")])
    body += text_frame(cfg_x, cfy, cfg_w, 100, sid); cfy += 120
    sid = make_story([("Grober Preis", "cap")])
    body += text_frame(cfg_x, cfy, cfg_w, 20, sid); cfy += 30
    sid = make_story([("580 €", "price")])
    body += text_frame(cfg_x, cfy, cfg_w, 80, sid); cfy += 100
    # CTA-Button
    body += rect(cfg_x, cfy, cfg_w, 60, C_BLACK)
    sid = make_story([("ANFRAGE SENDEN →", "cap_purp")])
    body += text_frame(cfg_x, cfy + 22, cfg_w, 20, sid)
    y += des_h

    # === 04 - ABOUT preview (dark) ===
    ab_h = 1000
    body += rect(0, y, PAGE_W, ab_h, C_BLACK)
    ya = y + 160
    sid = make_story([("04 — About", "cap_light")])
    body += text_frame(GUT, ya, 500, 24, sid); ya += 60
    # Zwei-Spalten-Layout
    left_w = CONTENT_W * 5/12
    right_x = GUT + CONTENT_W * 5/12 + 60
    right_w = CONTENT_W - CONTENT_W * 5/12 - 60
    sid = make_story([("Got teeth?", "h1_light"), ("Got options.", "h1_light")])
    body += text_frame(GUT, ya, left_w, 340, sid)
    sid = make_story([
        ("Chopper Couture macht Dental Jewelry in Berlin. Grillz, die nicht nach Klischee aussehen — fein, sauber, fashion. Kein Bling-Zwang, kein Szene-Code.", "body_light"),
        ("Hinter allem steckt eine Person: Anika, Zahntechnikerin mit eigenem Labor. Jedes Stück ist ein Gespräch zwischen dir, mir und dem Material. Mehr dazu gibt's drüben.", "body_light"),
        ("Lern mich kennen →", "cap_light"),
    ])
    body += text_frame(right_x, ya, right_w, 340, sid)
    ya += 400

    # Werte-Grid
    values = [
        ("01", "Präzision", "Handwerk steht über allem."),
        ("02", "Inklusion", "Für alle, die Zähne haben."),
        ("03", "Ausdruck", "Schmuck als persönliche Sprache."),
        ("04", "Handwerk", "Made to fit. Jedes Stück individuell."),
    ]
    val_w = (CONTENT_W - 3 * 40) / 4
    for i, (n, t, b) in enumerate(values):
        vx = GUT + i * (val_w + 40)
        vy = ya
        # Trennlinie oben
        body += rect(vx, vy, val_w, 1, C_OFFWHITE_60)
        sid = make_story([(n, "n_light")])
        body += text_frame(vx, vy + 16, val_w, 20, sid)
        sid = make_story([(t, "h3_light")])
        body += text_frame(vx, vy + 56, val_w, 40, sid)
        sid = make_story([(b, "body_mut_light")])
        body += text_frame(vx, vy + 120, val_w - 10, 120, sid)
    y += ab_h

    # === BRAND PROMISE (purple) ===
    br_h = 700
    body += rect(0, y, PAGE_W, br_h, C_PURPLE)
    yb = y + 160
    sid = make_story([("Brand Promise", "cap_purp")])
    body += text_frame(GUT, yb, 500, 24, sid); yb += 60
    sid = make_story([("Lifechanging", "h1_purp"), ("Smiles.", "h1_purp")])
    body += text_frame(GUT, yb, CONTENT_W, 340, sid); yb += 340
    sid = make_story([("Schmuck, der bleibt — im Kopf und auf den Zähnen.", "body_lg")])
    body += text_frame(GUT, yb, 720, 60, sid)
    y += br_h

    # === 05 - CONTACT (light) ===
    ct_h = 1100
    body += rect(0, y, PAGE_W, ct_h, C_OFFWHITE)
    yc = y + 160
    sid = make_story([("05 — Contact", "cap")])
    body += text_frame(GUT, yc, 500, 24, sid); yc += 60
    sid = make_story([("Let's talk.", "h1")])
    body += text_frame(GUT, yc, CONTENT_W, 170, sid); yc += 200
    sid = make_story([("Frage, Idee oder einfach Lust auf ein Stück? Schreib mir — du landest direkt bei mir, nicht in irgendeinem Support-Postfach.", "body_mut")])
    body += text_frame(GUT, yc, 720, 80, sid); yc += 120

    # Formular links (60%), Info rechts
    form_w = CONTENT_W * 7/12
    info_x = GUT + form_w + 40
    info_w = CONTENT_W - form_w - 40
    # Name / E-Mail 2-spaltig
    sid = make_story([("Name *", "cap"), ("[ Textfeld ]", "body_mut")])
    body += text_frame(GUT, yc, form_w/2 - 16, 80, sid)
    sid = make_story([("E-Mail *", "cap"), ("[ Textfeld ]", "body_mut")])
    body += text_frame(GUT + form_w/2 + 16, yc, form_w/2 - 16, 80, sid); yc += 100
    sid = make_story([("Telefon (optional)", "cap"), ("[ Textfeld ]", "body_mut")])
    body += text_frame(GUT, yc, form_w, 80, sid); yc += 100
    sid = make_story([("Erzähl mir, was du im Kopf hast", "cap"), ("[ Textarea ]", "body_mut")])
    body += text_frame(GUT, yc, form_w, 180, sid); yc += 220
    # CTA
    body += rect(GUT, yc, 260, 60, C_BLACK)
    sid = make_story([("ANFRAGE SENDEN →", "cap_purp")])
    body += text_frame(GUT, yc + 22, 260, 20, sid)

    # Info-Sidebar
    iy = y + 320
    for label, lines in [
        ("Studio", "Stralauer Allee 17B\nBerlin"),
        ("Direkt", "hello@choppercouture.de\n@choppercouture"),
        ("Termine", "Nach Vereinbarung.\nAntwort meist innerhalb von 48 Stunden."),
    ]:
        body += rect(info_x, iy, info_w, 1, C_BLACK_60)
        sid = make_story([(label, "cap")])
        body += text_frame(info_x, iy + 16, info_w, 20, sid)
        paras = [(line, "body") for line in lines.split("\n")]
        sid = make_story(paras)
        body += text_frame(info_x, iy + 56, info_w, 80, sid)
        iy += 180
    y += ct_h

    # === FOOTER ===
    ft_h = 200
    body += rect(0, y, PAGE_W, ft_h, C_BLACK)
    sid = make_story([("© Chopper Couture · Berlin", "cap_light")])
    body += text_frame(GUT, y + ft_h/2 - 12, 500, 24, sid)
    sid = make_story([("Impressum · Datenschutz", "cap_light")])
    body += text_frame(PAGE_W - GUT - 300, y + ft_h/2 - 12, 300, 24, sid)
    y += ft_h

    return body, y

# -----------------------------------------------------------------------------
# ABOUT-Layout
# -----------------------------------------------------------------------------
def build_about() -> tuple[str, float]:
    body = ""
    y = 0.0

    # === HERO (black, portrait-Bild als Platzhalter) ===
    ah_h = 900
    body += rect(0, y, PAGE_W, ah_h, C_BLACK)
    body += image_frame(0, y, PAGE_W, ah_h,
                       "public/images/pieces-new/DSC00615.jpg",
                       label="[ Portrait — Anika Müggler ]")
    yh = y + ah_h - 320
    sid = make_story([("About", "cap_light")])
    body += text_frame(GUT, yh, 500, 24, sid); yh += 60
    sid = make_story([("Anika", "h1_light"), ("Müggler.", "h1_light")])
    body += text_frame(GUT, yh, CONTENT_W, 340, sid); yh += 200
    sid = make_story([("Zahntechnikerin · Art Direction · Berlin", "cap_light")])
    body += text_frame(GUT, yh, 500, 24, sid)
    y += ah_h

    # === STORY zwei Spalten (light) ===
    st_h = 900
    body += rect(0, y, PAGE_W, st_h, C_OFFWHITE)
    yh = y + 160
    left_w = CONTENT_W * 5/12
    right_x = GUT + CONTENT_W * 5/12 + 60
    right_w = CONTENT_W - CONTENT_W * 5/12 - 60
    sid = make_story([("Werdegang", "cap")])
    body += text_frame(GUT, yh, 500, 24, sid)
    sid = make_story([("Zahntechnik.", "h2"), ("Kunst.", "h2"), ("Art Direction.", "h2")])
    body += text_frame(GUT, yh + 40, left_w, 300, sid)
    sid = make_story([
        ("Ausgebildete Zahntechnikerin aus der Schweiz. Danach Kunstschule an der ZHdK in Zürich. Mit dem Umzug nach Berlin Wirtschaftskommunikation studiert, weiterhin als Zahntechnikerin im Labor gearbeitet.", "body_mut"),
        ("Heute arbeite ich tagsüber als Art Direktorin in einer nachhaltigen Werbeagentur — und nebenbei am Schreibtisch, am Modell, am Mikroskop: an Chopper Couture.", "body_mut"),
        ("Mein Labor ist zahntechnisch voll ausgerüstet, mit medizinischen Standards. Vom Alginat-Abdruck bis zum SLM-gedruckten Stück läuft jeder Schritt durch meine Hand. Das war mir wichtig. Filigran, präzise, individuell — und alles in Absprache mit dir.", "body_mut"),
    ])
    body += text_frame(right_x, yh, right_w, 600, sid)
    y += st_h

    # === VALUES (dark) ===
    val_h = 1200
    body += rect(0, y, PAGE_W, val_h, C_BLACK)
    yh = y + 160
    sid = make_story([("Werte", "cap_light")])
    body += text_frame(GUT, yh, 500, 24, sid); yh += 60
    sid = make_story([("Vier Werte.", "h1_light")])
    body += text_frame(GUT, yh, CONTENT_W, 170, sid); yh += 240
    values_about = [
        ("01", "Präzision", "Zahntechnisches Labor mit medizinischen Standards. Jeder Mikrometer zählt — das ist nicht Anspruch, das ist Voraussetzung."),
        ("02", "Filigran", "Grillz dürfen leicht sein. Klein, fein, fast unsichtbar — oder gross und laut. Beides zählt, beides per Hand entschieden."),
        ("03", "Im Dialog", "Jedes Stück entsteht in Absprache. Skizze, Sample, Iteration. Erst wenn du sagst Ja, geht's in den Guss."),
        ("04", "Inklusion", "Dental Jewelry ist für alle, die Zähne haben. Kein Szene-Code, kein Backstage-Pass. Bring deine Idee."),
    ]
    col_w = (CONTENT_W - 80) / 2
    for i, (n, t, b) in enumerate(values_about):
        col = i % 2
        row = i // 2
        cx = GUT + col * (col_w + 80)
        cy = yh + row * 320
        body += rect(cx, cy, col_w, 1, C_OFFWHITE_60)
        sid = make_story([(n, "n_light")])
        body += text_frame(cx, cy + 16, 200, 20, sid)
        sid = make_story([(t, "h2_med")])
        body += text_frame(cx, cy + 56, col_w, 80, sid)
        sid = make_story([(b, "body_mut_light")])
        body += text_frame(cx, cy + 160, col_w - 20, 160, sid)
    y += val_h

    # === BRAND PROMISE (purple) ===
    br_h = 700
    body += rect(0, y, PAGE_W, br_h, C_PURPLE)
    yb = y + 160
    sid = make_story([("Brand Promise", "cap_purp")])
    body += text_frame(GUT, yb, 500, 24, sid); yb += 60
    sid = make_story([("Lifechanging", "h1_purp"), ("Smiles.", "h1_purp")])
    body += text_frame(GUT, yb, CONTENT_W, 340, sid); yb += 340
    sid = make_story([("Zahnschmuck der bleibt — in Erinnerung und auf den Zähnen.", "body_lg")])
    body += text_frame(GUT, yb, 720, 60, sid)
    y += br_h

    # === STUDIO INFO + CTA (light) ===
    si_h = 800
    body += rect(0, y, PAGE_W, si_h, C_OFFWHITE)
    yh = y + 160
    left_w = CONTENT_W * 7/12
    sid = make_story([("Studio", "cap")])
    body += text_frame(GUT, yh, 500, 24, sid); yh += 40
    sid = make_story([("Stralauer Allee 17B.", "h2"), ("Berlin.", "h2")])
    body += text_frame(GUT, yh, left_w, 200, sid); yh += 240
    sid = make_story([("Termine nach Vereinbarung. Schreib mir — wir finden eine Zeit, machen einen Abdruck, sprechen über deine Idee.", "body_mut")])
    body += text_frame(GUT, yh, 500, 100, sid)

    ix = GUT + left_w + 40
    iw = CONTENT_W - left_w - 40
    iy = y + 200
    body += rect(ix, iy, iw, 1, C_BLACK_60)
    sid = make_story([("Direkt", "cap")])
    body += text_frame(ix, iy + 16, iw, 20, sid)
    sid = make_story([("hello@choppercouture.de", "body"), ("@choppercouture", "body")])
    body += text_frame(ix, iy + 56, iw, 80, sid)
    iy += 240
    # CTA
    body += rect(ix, iy, 260, 60, C_BLACK)
    sid = make_story([("ANFRAGE SENDEN →", "cap_purp")])
    body += text_frame(ix, iy + 22, 260, 20, sid)
    y += si_h

    # === FOOTER ===
    ft_h = 200
    body += rect(0, y, PAGE_W, ft_h, C_BLACK)
    sid = make_story([("© Chopper Couture · Berlin", "cap_light")])
    body += text_frame(GUT, y + ft_h/2 - 12, 500, 24, sid)
    sid = make_story([("Impressum · Datenschutz", "cap_light")])
    body += text_frame(PAGE_W - GUT - 300, y + ft_h/2 - 12, 300, 24, sid)
    y += ft_h

    return body, y

# -----------------------------------------------------------------------------
# Resources/Graphic.xml (minimal — nur unsere Brand-Farben)
# -----------------------------------------------------------------------------
def make_graphic() -> str:
    return f'''{XML_DECL}
<idPkg:Graphic {IDPKG_NS} DOMVersion="19.0">
    <Color Self="Color/Black" Model="Process" Space="RGB" ColorValue="0 0 0" ColorOverride="Specialblack" ConvertToHsb="false" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Black" ColorEditable="false" ColorRemovable="false" Visible="true" SwatchCreatorID="7937" />
    <Color Self="Color/Cyan" Model="Process" Space="CMYK" ColorValue="100 0 0 0" ColorOverride="Hiddenreserved" ConvertToHsb="false" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Cyan" ColorEditable="false" ColorRemovable="false" Visible="false" SwatchCreatorID="7937" />
    <Color Self="Color/Magenta" Model="Process" Space="CMYK" ColorValue="0 100 0 0" ColorOverride="Hiddenreserved" ConvertToHsb="false" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Magenta" ColorEditable="false" ColorRemovable="false" Visible="false" SwatchCreatorID="7937" />
    <Color Self="Color/Yellow" Model="Process" Space="CMYK" ColorValue="0 0 100 0" ColorOverride="Hiddenreserved" ConvertToHsb="false" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Yellow" ColorEditable="false" ColorRemovable="false" Visible="false" SwatchCreatorID="7937" />
    <Color Self="Color/Paper" Model="Process" Space="CMYK" ColorValue="0 0 0 0" ColorOverride="Specialpaper" ConvertToHsb="false" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Paper" ColorEditable="true" ColorRemovable="false" Visible="true" SwatchCreatorID="7937" />
    <Color Self="Color/Registration" Model="Registration" Space="CMYK" ColorValue="100 100 100 100" ColorOverride="Specialregistration" ConvertToHsb="false" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Registration" ColorEditable="false" ColorRemovable="false" Visible="true" SwatchCreatorID="7937" />
    <Color Self="{C_BLACK}" Model="Process" Space="RGB" ColorValue="13 13 13" ColorOverride="Normal" ConvertToHsb="false" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="CC Black" ColorEditable="true" ColorRemovable="true" Visible="true" SwatchCreatorID="7937" />
    <Color Self="{C_OFFWHITE}" Model="Process" Space="RGB" ColorValue="249 249 249" ColorOverride="Normal" ConvertToHsb="false" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="CC Offwhite" ColorEditable="true" ColorRemovable="true" Visible="true" SwatchCreatorID="7937" />
    <Color Self="{C_PURPLE}" Model="Process" Space="RGB" ColorValue="124 58 237" ColorOverride="Normal" ConvertToHsb="false" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="CC Purple" ColorEditable="true" ColorRemovable="true" Visible="true" SwatchCreatorID="7937" />
    <Color Self="{C_PINK}" Model="Process" Space="RGB" ColorValue="255 90 138" ColorOverride="Normal" ConvertToHsb="false" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="CC Pink" ColorEditable="true" ColorRemovable="true" Visible="true" SwatchCreatorID="7937" />
    <Color Self="{C_BLACK_60}" Model="Process" Space="RGB" ColorValue="107 107 107" ColorOverride="Normal" ConvertToHsb="false" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="CC Black 60" ColorEditable="true" ColorRemovable="true" Visible="true" SwatchCreatorID="7937" />
    <Color Self="{C_OFFWHITE_60}" Model="Process" Space="RGB" ColorValue="180 180 180" ColorOverride="Normal" ConvertToHsb="false" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="CC Offwhite 60" ColorEditable="true" ColorRemovable="true" Visible="true" SwatchCreatorID="7937" />
    <Color Self="{C_GREY_MED}" Model="Process" Space="RGB" ColorValue="200 200 200" ColorOverride="Normal" ConvertToHsb="false" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="CC Grey (Placeholder)" ColorEditable="true" ColorRemovable="true" Visible="true" SwatchCreatorID="7937" />
    <Ink Self="Ink/$ID/Process Cyan" Name="$ID/Process Cyan" Angle="75" ConvertToProcess="false" Frequency="70" NeutralDensity="0.61" PrintInk="true" TrapOrder="1" InkType="Normal" />
    <Ink Self="Ink/$ID/Process Magenta" Name="$ID/Process Magenta" Angle="15" ConvertToProcess="false" Frequency="70" NeutralDensity="0.76" PrintInk="true" TrapOrder="2" InkType="Normal" />
    <Ink Self="Ink/$ID/Process Yellow" Name="$ID/Process Yellow" Angle="0" ConvertToProcess="false" Frequency="70" NeutralDensity="0.16" PrintInk="true" TrapOrder="3" InkType="Normal" />
    <Ink Self="Ink/$ID/Process Black" Name="$ID/Process Black" Angle="45" ConvertToProcess="false" Frequency="70" NeutralDensity="1.7" PrintInk="true" TrapOrder="4" InkType="Normal" />
    <Swatch Self="Swatch/None" Name="None" ColorEditable="false" ColorRemovable="false" Visible="true" SwatchCreatorID="7937" />
    <StrokeStyle Self="StrokeStyle/$ID/Solid" Name="$ID/Solid" />
</idPkg:Graphic>'''

# -----------------------------------------------------------------------------
# designmap.xml
# -----------------------------------------------------------------------------
def make_designmap(spread_ids: list[str], story_ids: list[str]) -> str:
    spread_refs = "\n    ".join(
        f'<idPkg:Spread src="Spreads/Spread_{s}.xml" />' for s in spread_ids
    )
    story_refs = "\n    ".join(
        f'<idPkg:Story src="Stories/Story_{s}.xml" />' for s in story_ids
    )
    story_list = " ".join(story_ids)
    return f'''{XML_DECL}
<?aid style="50" type="document" readerVersion="6.0" featureSet="257" product="19.1(43)" ?>
<Document xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="19.0" Self="d" StoryList="{story_list}" Name="ChopperCouture_Website_Mockup.indd" ZeroPoint="0 0" ActiveLayer="ud7b" CMYKProfile="Coated FOGRA39 (ISO 12647-2:2004)" RGBProfile="sRGB IEC61966-2.1" SolidColorIntent="UseColorSettings" AfterBlendingIntent="UseColorSettings" DefaultImageIntent="UseColorSettings" RGBPolicy="PreserveEmbeddedProfiles" CMYKPolicy="CombinationOfPreserveAndSafeCmyk">
    <Language Self="Language/$ID/de_DE_2006" Name="$ID/de_DE_2006" SingleQuotes="&#x201A;&#x2018;" DoubleQuotes="&#x201E;&#x201C;" PrimaryLanguageName="$ID/de_DE_2006" SublanguageName="$ID/" Id="275" HyphenationVendor="Duden" SpellingVendor="Duden" />
    <idPkg:Graphic src="Resources/Graphic.xml" />
    <idPkg:Fonts src="Resources/Fonts.xml" />
    <idPkg:Styles src="Resources/Styles.xml" />
    <idPkg:Preferences src="Resources/Preferences.xml" />
    <Layer Self="ud7b" Name="Layer 1" Visible="true" Locked="false" IgnoreWrap="false" ShowGuides="true" LockGuides="false" UI="true" Expendable="true" Printable="true" />
    <Section Self="uc1" Length="{len(spread_ids)}" Name="" ContinueNumbering="false" IncludeSectionPrefix="false" SectionPrefix="" PageNumberStart="1" PageNumberStyle="Arabic" />
    <idPkg:MasterSpread src="MasterSpreads/MasterSpread_ud5.xml" />
    {spread_refs}
    {story_refs}
</Document>'''

# -----------------------------------------------------------------------------
# MAIN
# -----------------------------------------------------------------------------
def main():
    # Clean build-Ordner
    if BUILD_DIR.exists():
        shutil.rmtree(BUILD_DIR)
    BUILD_DIR.mkdir(parents=True)

    # 1. Boilerplate aus Ref kopieren (Preferences/Fonts/Styles/MasterSpread etc.)
    ref_dir = Path("/private/tmp/claude-501/-Users-dinkaisch-Documents-Job-Dinkaisch-webpage/02df04d9-3264-4957-8d63-815c14717a10/scratchpad/idml-ref")
    for name in ["mimetype"]:
        shutil.copy(ref_dir / name, BUILD_DIR / name)
    for sub in ["META-INF"]:
        shutil.copytree(ref_dir / sub, BUILD_DIR / sub)
    # Resources: Fonts, Preferences, Styles bleiben; Graphic überschreiben wir
    (BUILD_DIR / "Resources").mkdir()
    for name in ["Fonts.xml", "Preferences.xml", "Styles.xml"]:
        shutil.copy(ref_dir / "Resources" / name, BUILD_DIR / "Resources" / name)
    (BUILD_DIR / "Resources" / "Graphic.xml").write_text(make_graphic(), encoding="utf-8")
    # MasterSpread aus Ref kopieren
    (BUILD_DIR / "MasterSpreads").mkdir()
    shutil.copy(ref_dir / "MasterSpreads" / "MasterSpread_ud5.xml",
                BUILD_DIR / "MasterSpreads" / "MasterSpread_ud5.xml")

    # 2. Spreads bauen
    (BUILD_DIR / "Spreads").mkdir()
    (BUILD_DIR / "Stories").mkdir()

    spread_ids = []
    for page_name, builder in [("home", build_homepage), ("about", build_about)]:
        body, page_h = builder()
        spread_id = f"spread_{page_name}"
        page_id = f"page_{page_name}"
        spread_xml = build_spread(spread_id, page_id, page_name, page_h, body)
        (BUILD_DIR / "Spreads" / f"Spread_{spread_id}.xml").write_text(spread_xml, encoding="utf-8")
        spread_ids.append(spread_id)
        print(f"  {page_name}: {page_h:.0f}pt hoch, {STORY_LIST and len(STORY_LIST) or 0} Stories bisher")

    # 3. Stories rausschreiben
    for sid, content in STORIES.items():
        (BUILD_DIR / "Stories" / f"Story_{sid}.xml").write_text(content, encoding="utf-8")

    # 4. designmap.xml
    designmap = make_designmap(spread_ids, STORY_LIST)
    (BUILD_DIR / "designmap.xml").write_text(designmap, encoding="utf-8")

    # 5. Zippen mit mimetype uncompressed als erster Eintrag
    OUT_IDML.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(OUT_IDML, "w", zipfile.ZIP_DEFLATED) as z:
        # mimetype: STORED (uncompressed), muss ERSTES Eintrag sein
        z.write(BUILD_DIR / "mimetype", "mimetype", zipfile.ZIP_STORED)
        # Rest
        for root, _, files in os.walk(BUILD_DIR):
            for fn in files:
                if fn == "mimetype":
                    continue
                fp = Path(root) / fn
                arcname = fp.relative_to(BUILD_DIR).as_posix()
                z.write(fp, arcname)

    total = len(STORY_LIST)
    print(f"\n✓ IDML written: {OUT_IDML}")
    print(f"  {len(spread_ids)} Seiten, {total} Stories, {sum(1 for _ in BUILD_DIR.rglob('*') if _.is_file())} Files gesamt")

if __name__ == "__main__":
    main()
