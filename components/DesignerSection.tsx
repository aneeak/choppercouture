"use client";

/**
 * DesignerSection (Section 02) — Builder-Spec 2026-07
 * ---------------------------------------------------
 *  02 — DESIGNER
 *  DESIGN                     ← Loos ExtraWide 700
 *      DEIN STÜCK.            ← 2. Zeile 150px eingezogen
 *              Spiel dich…    ← Subline auf eigener Achse (~320px)
 *
 *  Links:  01- Klicke die Zähne an    (Zahn-Mapping bleibt: ToothDesigner)
 *  Rechts: 02- Wähle deinen Style     (4 Karten: Spiky/Organic/Whole/Ornamental)
 *  Unten:  03- Spezielle Wünsche      Textfeld
 *          Grober Preis · Anfrage senden →
 *
 * Die 20 Zahn-Polygone + Auswahl-Logik kommen 1:1 aus dem alten
 * ToothDesigner-Modul (`useTeethPicker` Hook). Nur Styles/Preise + Layout
 * werden hier neu gebaut.
 */

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import SectionHeader from "@/components/SectionHeader";

// ── Zahn-Polygone (1:1 aus Illustrator-SVG, viewBox 722.6 × 510.27) ─────────
const VB_W = 722.6;
const VB_H = 510.27;
const TEETH: { id: string; jaw: "OK" | "UK"; d: string }[] = [
  { id: "15", jaw: "OK", d: "m123.45,173.9s-3.93-13.18-2.62-17.18c1.31-4,4.78-7.5,10.48-2.5,5.69,5,10.47,9.5,10.47,9.5,0,0,2.62,17.5,5.24,25,2.62,7.5,2.62,7,2.62,7l3.93,10s0,7.5-6.55,3c-6.55-4.5-19.64-21-20.95-25-1.31-4-2.62-9.82-2.62-9.82" },
  { id: "14", jaw: "OK", d: "m139.06,144.59s-2.26-12,1.13-13c3.21-.95,15.81,10,20.33,15s11.3,12,11.3,12l4.52,24c2.26,12,4.52,24.5,4.52,24.5,0,0-9.04,5.83-9.04,6.5s-7.91,9.5-14.68-1c-6.78-10.5-11.63-31.58-13.56-43.5-2.26-14-4.52-24.5-4.52-24.5" },
  { id: "13", jaw: "OK", d: "m172.48,146.43s0-14.83,2.18-18,8.72-7.35,14.17-3.17c5.45,4.17,19.62,20.17,22.89,24.17,3.27,4,7.63,8,7.63,9.5s3.33,41,4.42,44c1.09,3-12.06,6.5-15.33,18-1.87,6.58-10.9,5.5-15.26,2-4.36-3.5-12.55-15.05-13.08-17.5-1.09-5-7.63-40-7.63-47v-12Z" },
  { id: "12", jaw: "OK", d: "m231.77,126.02s7.91-5.5,15.81,1c7.91,6.5,13.55,15,19.2,22,5.65,7,7.91,11,10.17,14,.96,1.27,2.26,39,2.26,39,0,0,2.53,9.89-11.3,10.5-11.3.5-32.76,0-37.28-2.5-4.52-2.5-5.65-1.5-7.91-16-2.26-14.5-3.39-30-3.39-37s4.6-17.68,5.65-20c4.52-10,6.78-11,6.78-11" },
  { id: "11", jaw: "OK", d: "m364.84,219.7l-10,1.5h-63s-11-1.5-12-9.5-2-38.5-2-38.5c0,0-2-17.5,4-32s19-28,28-28c3,0,19,1,27,6.5s26,27,28,31,4,10.5,4,10.5c0,0,.8,38.43,1,45.5.28,10-5,13-5,13" },
  { id: "21", jaw: "OK", d: "m376.99,217.57l10,1.5h63s11-1.5,12-9.5,2-38.5,2-38.5c0,0,2-17.5-4-32s-19-28-28-28c-3,0-19,1-27,6.5s-26,27-28,31-4,10.5-4,10.5c0,0-.8,38.43-1,45.5-.28,10,5,13,5,13" },
  { id: "22", jaw: "OK", d: "m505.84,121.7s-7-5.5-14,1-12,15-17,22-7,11-9,14c-.85,1.27-2,39-2,39,0,0-2.24,9.89,10,10.5,10,.5,29,0,33-2.5s5-1.5,7-16,3-30,3-37-4.07-17.68-5-20c-4-10-6-11-6-11" },
  { id: "23", jaw: "OK", d: "m560.84,140.7s0-14.83-2-18-8-7.35-13-3.17-18,20.17-21,24.17-7,8-7,9.5-3.06,41-4.06,44,11.06,6.5,14.06,18c1.72,6.58,10,5.5,14,2s11.51-15.05,12-17.5c1-5,7-40,7-47v-12Z" },
  { id: "24", jaw: "OK", d: "m590.84,138.7s2-12-1-13c-2.85-.95-14,10-18,15s-10,12-10,12l-4,24c-2,12-4,24.5-4,24.5,0,0,8,5.83,8,6.5s7,9.5,13-1,10.3-31.58,12-43.5c2-14,4-24.5,4-24.5" },
  { id: "25", jaw: "OK", d: "m601.84,168.88s3-13.18,2-17.18-3.65-7.5-8-2.5-8,9.5-8,9.5c0,0-2,17.5-4,25-2,7.5-2,7-2,7l-3,10s0,7.5,5,3,15-21,16-25c1-4,2-9.82,2-9.82" },
  { id: "45", jaw: "UK", d: "m190.84,278.61l-7-13.91s-11-10-18-5-12.28,16.5-12.28,25-3.28,25.96,0,30.48c3.28,4.52,8.58,7.02,14.28,4.52s9-6,9-6c0,0,.98-10,3-20.5s5-14.59,11-14.59" },
  { id: "44", jaw: "UK", d: "m222.84,297.7s-10-4-15-8-15-12-18-11-9,4-9,13-4,23-5,28-4,26-1,28,11,8,21,0,18-18.5,18-18.5l9-31.5Z" },
  { id: "43", jaw: "UK", d: "m262.84,335.7s-16,27-19,29.5-16,16.5-23,13.5-11-15-8-37.5,11-48,15-48,9,.5,14,4.5,13,9.61,18,11c3.34.93,3.27,15,3.27,15l-.27,12Z" },
  { id: "42", jaw: "UK", d: "m313.84,314.7l5,15s-1,8-5,16-12,31-20,35-22,6-24-6-8-66-8-66c0,0,0-2,8,0s33,2.91,35,2.91,8,0,9,3.09" },
  { id: "41", jaw: "UK", d: "m370.84,319.2v19.5c0,8.25-9,37-14,41s-22,8.5-27-7c-6.48-20.08-12-53.54-12-53.54,0,0-3.42-7.46,7.58-7.46h35.42s10-1.5,10,7.5" },
  { id: "31", jaw: "UK", d: "m371.98,337.99c0,8.25,9,37,14,41s22,8.5,27-7c6.48-20.08,12-53.54,12-53.54,0,0,3.42-7.46-7.58-7.46h-35.42s-10-1.5-10,7.5" },
  { id: "32", jaw: "UK", d: "m428.8,311.38l-4.89,15s.98,8,4.89,16,11.75,31,19.58,35c7.83,4,21.54,6,23.49-6,1.96-12,7.83-66,7.83-66,0,0,0-2-7.83,0-7.83,2-32.3,2.91-34.26,2.91s-7.83,0-8.81,3.09" },
  { id: "33", jaw: "UK", d: "m478.88,331.98s16,27,19,29.5,16,16.5,23,13.5,11-15,8-37.5-11-48-15-48-9,.5-14,4.5-13,9.61-18,11c-3.34.93-3.27,15-3.27,15l.27,12Z" },
  { id: "34", jaw: "UK", d: "m519.13,290.34s8.32-4,12.48-8c4.16-4,12.48-12,14.97-11s7.48,4,7.48,13,3.33,23,4.16,28,3.33,26,.83,28c-2.5,2-9.15,8-17.47,0-8.32-8-14.97-18.5-14.97-18.5l-7.48-31.5Z" },
  { id: "35", jaw: "UK", d: "m569.31,252.99c7,5,12.28,16.5,12.28,25s3.28,25.96,0,30.48c-3.28,4.52-8.58,7.02-14.28,4.52s-9-6-9-6c0,0-.98-10-3-20.5s-5-14.59-11-14.59l7-13.91" },
];

// ── Neue Style-Karten (Builder-Spec Section 02) ─────────────────────────────
type StyleKey = "spiky" | "organic" | "whole" | "ornamental";
interface StyleDef {
  key: StyleKey;
  title: string;
  body: string;
  first: number;
  add: number;
  image: string | null;   // null → keine Bild-Fläche in der Karte
}
const STYLES: StyleDef[] = [
  { key: "spiky",      title: "Spiky",      body: "Kantig, spitz, aggressiv.",       first: 210, add: 90,
    image: "/images/styles/tribal.webp" },
  { key: "organic",    title: "Organic",    body: "Weich, luftig, freundlich.",      first: 210, add: 85,
    image: "/images/styles/modern.webp" },
  { key: "whole",      title: "Whole",      body: "Ganzer Zahn. Glatt, silber.",     first: 180, add: 65,
    image: null },
  { key: "ornamental", title: "Ornamental", body: "Verspielt, dynamisch, dekorativ.", first: 305, add: 95,
    image: "/images/styles/ornamental.webp" },
];
const styleOf = (k: StyleKey) => STYLES.find((s) => s.key === k)!;

// ── kleines wiederkehrendes „01- xxx" Label (Sub-Section-Header) ────────────
function StepLabel({ n, name }: { n: string; name: string }) {
  return (
    <div className="flex items-baseline gap-3 md:gap-4">
      <span className="section-num" style={{ fontSize: "clamp(1.75rem, 3vw, 2.6875rem)" }}>{n}</span>
      <span className="text-cc-black/60" style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.375rem)" }}>—</span>
      <span
        className="section-name normal-case"
        style={{ fontSize: "clamp(1rem, 1.8vw, 1.75rem)", letterSpacing: "0.02em", textTransform: "none" }}
      >
        {name}
      </span>
    </div>
  );
}

export default function DesignerSection() {
  const [picks, setPicks] = useState<Map<string, StyleKey | null>>(new Map());
  const [activeStyle, setActiveStyle] = useState<StyleKey | null>(null);
  const [wishes, setWishes] = useState("");

  const toggleTooth = (id: string) => {
    setPicks((prev) => {
      const n = new Map(prev);
      if (n.has(id)) n.delete(id);
      else n.set(id, activeStyle);
      return n;
    });
  };
  const pickStyle = (sk: StyleKey) => {
    if (activeStyle === sk) return setActiveStyle(null);
    setActiveStyle(sk);
    setPicks((prev) => {
      const n = new Map(prev);
      for (const [id, cur] of n) if (cur === null) n.set(id, sk);
      return n;
    });
  };
  const setToothStyle = (id: string, sk: StyleKey) => {
    setPicks((prev) => { const n = new Map(prev); n.set(id, sk); return n; });
  };

  const total = useMemo(() => {
    let sum = 0, i = 0;
    for (const [, sk] of picks) {
      if (!sk) continue;
      const st = styleOf(sk);
      sum += i === 0 ? st.first : st.add;
      i++;
    }
    return sum;
  }, [picks]);

  const styledCount = useMemo(() => {
    let c = 0; for (const [, sk] of picks) if (sk) c++; return c;
  }, [picks]);
  const ready = styledCount > 0;

  const mailHref = useMemo(() => {
    const list = [...picks.entries()]
      .map(([id, sk]) => (sk ? `${id} (${styleOf(sk).title})` : `${id} (Stil offen)`))
      .join(", ");
    const subject = "Designer-Anfrage — Chopper Couture";
    const body =
      `Hey Anika,\n\nich hab mir was zusammengestellt:\n\n` +
      `Zähne & Stile: ${list || "noch keine Auswahl"}\n` +
      `Grober Preis: ${ready ? `${total.toLocaleString("de-DE")} €` : "–"}\n` +
      (wishes ? `\nSpezielle Wünsche:\n${wishes}\n` : "") +
      `\nMeld dich für einen Termin :)\n`;
    return `mailto:choppercouture@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [picks, total, wishes, ready]);

  return (
    <section
      id="designer"
      data-nav-tone="dark"
      className="bg-cc-offwhite text-cc-black"
      style={{ paddingTop: "clamp(6rem, 10vw, 9.375rem)", paddingBottom: "clamp(6rem, 10vw, 9.375rem)" }}
    >
      <div className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        {/* Section-Header */}
        <SectionHeader number="02" name="DESIGNER" tone="dark" />

        {/* Headline — Mobile: 3-zeilig "Design / dein / Stück." (Figma).
            Desktop: 2-zeilig "Design / dein Stück." */}
        <h2 className="headline-lg mt-8 md:mt-10 md:hidden" style={{ fontSize: "52px", lineHeight: "0.95" }}>
          <span className="block">Design</span>
          <span className="block" style={{ paddingLeft: "40px" }}>dein</span>
          <span className="block" style={{ paddingLeft: "115px" }}>Stück.</span>
        </h2>
        <h2 className="headline-lg mt-8 md:mt-10 hidden md:block" style={{ fontSize: "clamp(2.5rem, 9.2vw, 8.25rem)" }}>
          Design
          <br />
          <span className="inline-block" style={{ paddingLeft: "clamp(3.5rem, 14.6vw, 13.125rem)" }}>
            dein Stück.
          </span>
        </h2>

        {/* Subline — Mobile: 3-zeilig "Stil aussuchen, / Zähne anklicken, abschicken. / Ich meld mich bei dir."
            Desktop: 2-zeilig langer Text. */}
        <div className="mt-6 md:mt-8 md:hidden" style={{ fontSize: "22px", lineHeight: "1.3" }}>
          <span className="font-hatton-i block" style={{ fontSize: "22px" }}>Stil aussuchen,</span>
          <span className="font-hatton-i block" style={{ paddingLeft: "40px", fontSize: "22px" }}>Zähne anklicken, abschicken.</span>
          <span className="font-hatton-i block" style={{ fontSize: "22px" }}>Ich meld mich bei dir.</span>
        </div>
        <div className="hidden md:block mt-6 md:mt-8" style={{ fontSize: "clamp(1.125rem, 2.1vw, 1.875rem)" }}>
          <span
            className="subline block"
            style={{ paddingLeft: "clamp(9rem, 32vw, 29rem)" }}
          >
            Spiel dich durch. Stil aussuchen, Zähne anklicken, abschicken —
          </span>
          <span
            className="subline block"
            style={{ paddingLeft: "clamp(3rem, 12vw, 10.5rem)" }}
          >
            ich meld mich bei dir und wir machen einen Termin klar. Ganz unverbindlich.
          </span>
        </div>

        {/* Konfigurator — 2 Spalten (doppelter Abstand nach der Subline: 128 → 160px) */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 mt-32 md:mt-40 items-start">
          {/* Linke Spalte — Zahn-Mapping */}
          <div className="lg:col-span-7">
            <StepLabel n="01" name="Klicke die Zähne an" />
            <div className="mt-6 md:mt-8 relative w-full select-none" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
              <Image
                src="/images/designer/grill-designer.webp"
                alt="Gebiss — wähle deine Zähne"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain pointer-events-none"
              />
              <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                {TEETH.map((t) => (
                  <path
                    key={t.id}
                    className="cc-tooth"
                    data-selected={picks.has(t.id)}
                    d={t.d}
                    onClick={() => toggleTooth(t.id)}
                  >
                    <title>{`Zahn ${t.id}`}</title>
                  </path>
                ))}
              </svg>
            </div>
          </div>

          {/* Rechte Spalte — Style-Karten + Wünsche + Preis + CTA */}
          <div className="lg:col-span-5 space-y-10 md:space-y-14">
            <div>
              <StepLabel n="02" name="Wähle deinen Style" />
              <div
                className={`mt-6 md:mt-8 grid grid-cols-2 gap-4 md:gap-5 transition-opacity ${
                  picks.size === 0 ? "opacity-50" : "opacity-100"
                }`}
              >
                {STYLES.map((s) => {
                  const isActive = activeStyle === s.key;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => pickStyle(s.key)}
                      data-active={isActive}
                      className="group text-left border border-cc-black/15 hover:border-cc-black data-[active=true]:border-cc-black data-[active=true]:bg-cc-black data-[active=true]:text-cc-white transition-all duration-200"
                    >
                      <div className="p-4 md:p-5">
                        <h3
                          className="font-hatton-i"
                          style={{ fontSize: "clamp(1.25rem, 2vw, 1.875rem)" /* 20 → 30px */ }}
                        >
                          {s.title}
                        </h3>
                        <p
                          className="mt-1 body-copy text-cc-black/70 group-data-[active=true]:text-cc-white/70"
                          style={{ fontSize: "clamp(0.9375rem, 1.05vw, 1.125rem)" /* 15 → 18px */ }}
                        >
                          {s.body}
                        </p>
                      </div>
                      {s.image && (
                        <div className="relative w-full aspect-[4/3] overflow-hidden">
                          {/* Ornamental: PNG mit transparentem Rand → object-cover
                              + scale/position, um nur den sichtbaren, farbigen Teil
                              zu zeigen. Der Rest: object-cover bleibt Standard. */}
                          <Image
                            src={s.image}
                            alt={s.title}
                            fill
                            sizes="20vw"
                            className="object-cover"
                            style={
                              s.key === "ornamental"
                                ? { objectPosition: "center 40%", transform: "scale(2.1)" }
                                : undefined
                            }
                          />
                        </div>
                      )}
                      <div className="p-4 md:p-5 border-t border-cc-black/10 group-data-[active=true]:border-cc-white/20">
                        <p
                          className="font-hatton"
                          style={{ fontSize: "clamp(0.875rem, 1.05vw, 1.0625rem)" /* 14 → 17px */ }}
                        >
                          {s.first} € <span className="text-cc-black/50 group-data-[active=true]:text-cc-white/60">/ +{s.add} €</span>
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Zahn-Liste (falls Auswahl da) */}
            {picks.size > 0 && (
              <div className="border-t border-cc-black/15 pt-6">
                <p className="section-name text-cc-black/50 mb-3" style={{ fontSize: "0.7rem" }}>
                  Deine Zähne ({picks.size})
                </p>
                <ul className="space-y-2">
                  {[...picks.entries()].map(([id, sk]) => (
                    <li key={id} className="flex items-center justify-between gap-3 text-sm border-b border-cc-black/5 pb-2">
                      <span className="font-medium">Zahn {id}</span>
                      <div className="flex gap-1">
                        {STYLES.map((s) => (
                          <button
                            key={s.key}
                            type="button"
                            onClick={() => setToothStyle(id, s.key)}
                            data-active={sk === s.key}
                            title={s.title}
                            className="text-[10px] tracking-wide uppercase px-2 py-1 border border-cc-black/15 hover:border-cc-black data-[active=true]:bg-cc-black data-[active=true]:text-cc-white transition-colors"
                          >
                            {s.title.slice(0, 3)}
                          </button>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sonderwünsche */}
            <div>
              <StepLabel n="03" name="Spezielle Wünsche" />
              <textarea
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                rows={4}
                placeholder="Material, Motiv, Stein, Schriftzug … erzähl einfach."
                className="mt-6 w-full bg-transparent border border-cc-black/20 focus:border-cc-black outline-none p-4 body-copy resize-none"
                style={{ fontSize: "clamp(0.9375rem, 1.05vw, 1.125rem)" }}
              />
            </div>

            {/* Grober Preis */}
            <div className="border-t border-cc-black/15 pt-6">
              <p className="section-name text-cc-black/50 mb-2" style={{ fontSize: "0.7rem" }}>Grober Preis</p>
              <p className="font-hatton-i" style={{ fontSize: "clamp(2rem, 3vw, 2.6875rem)" /* 32 → 43px */ }}>
                {ready ? `${total.toLocaleString("de-DE")} €` : "—"}
              </p>
              {ready && (
                <p className="mt-2 body-copy text-cc-black/50" style={{ fontSize: "0.875rem" }}>
                  Erster Zahn zum Grundpreis, jeder weitere günstiger · finaler Preis nach Absprache
                </p>
              )}
            </div>

            {/* CTA */}
            <Link
              href={mailHref}
              className={`inline-flex items-center gap-3 rounded-full border px-6 py-3 md:px-8 md:py-4 font-hatton transition-colors ${
                ready
                  ? "border-cc-black bg-cc-black text-cc-white hover:bg-cc-purple hover:border-cc-purple"
                  : "border-cc-black/30 text-cc-black/40 pointer-events-none"
              }`}
              style={{ fontSize: "clamp(1rem, 1.4vw, 1.375rem)" }}
            >
              <span>Anfrage senden</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
