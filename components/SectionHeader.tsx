/**
 * SectionHeader
 * -------------
 * Wiederkehrendes Muster laut Builder-Spec:
 *
 *   01 — THE PROCESS
 *   ^^   ^^^^^^^^^^^
 *   PP Hatton Ultralight Italic 72pt   Loos Wide ExtraLight 48pt
 *
 * Skaliert responsive per clamp(). Auf 1440px trifft es die Spec exakt.
 */

interface Props {
  number: string;   // "01"
  name: string;     // "THE PROCESS"
  tone?: "dark" | "light";  // Textfarbe: dark = für hellen BG, light = für dunklen BG
  align?: "left" | "right";
}

export default function SectionHeader({ number, name, tone = "dark", align = "left" }: Props) {
  const text = tone === "dark" ? "text-cc-black" : "text-cc-white";
  const alignCls = align === "right" ? "justify-end" : "justify-start";
  return (
    <div className={`flex items-baseline gap-6 md:gap-8 ${alignCls} ${text}`}>
      <span
        className="section-num"
        style={{ fontSize: "clamp(2.75rem, 5vw, 4.5rem)" /* 44 → 72px */ }}
      >
        {number}
      </span>
      <span
        style={{
          fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)" /* 24 → 36px, deutlich sichtbar */,
          fontFamily: "var(--font-loos-wide)",
        }}
      >
        —
      </span>
      <span
        className="section-name"
        style={{ fontSize: "clamp(1.5rem, 3.3vw, 3rem)" /* 24 → 48px */ }}
      >
        {name}
      </span>
    </div>
  );
}
