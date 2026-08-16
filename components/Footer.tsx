/**
 * Footer — Builder-Spec 2026-07
 * -----------------------------
 *  Links: ABOUT · MATERIAL · IMPRESSUM · DATENSCHUTZ · AGB · INSTAGRAM · E-MAIL
 *  Rechts: © 2026 CHOPPER COUTURE. ALL RIGHTS RESERVED.
 */

import Link from "next/link";

const LINKS: { href: string; label: string; external?: boolean }[] = [
  { href: "/#about", label: "About" },
  { href: "/#material", label: "Material" },
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "https://instagram.com/choppercouture", label: "Instagram", external: true },
  { href: "mailto:choppercouture@gmail.com", label: "E-Mail", external: true },
];

export default function Footer() {
  return (
    <footer className="bg-cc-pure text-cc-white/80 px-5 md:px-12 lg:px-16 py-8 md:py-14">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* MOBILE: 3-zeilig mit · Separatoren (Figma) */}
        <div
          className="md:hidden font-wide"
          style={{
            fontSize: "11px",
            letterSpacing: "0.05em",
            lineHeight: "2.2",
          }}
        >
          <p>
            <Link href="/#about" className="hover:text-cc-white transition-colors">ABOUT</Link>
            {" · "}
            <Link href="/#material" className="hover:text-cc-white transition-colors">MATERIAL</Link>
            {" · "}
            <Link href="/impressum" className="hover:text-cc-white transition-colors">IMPRESSUM</Link>
          </p>
          <p>
            <Link href="/datenschutz" className="hover:text-cc-white transition-colors">DATENSCHUTZ</Link>
            {" · "}
            <Link href="/agb" className="hover:text-cc-white transition-colors">AGB</Link>
          </p>
          <p>
            <a href="https://instagram.com/choppercouture" target="_blank" rel="noopener noreferrer" className="hover:text-cc-white transition-colors">INSTAGRAM</a>
            {" · "}
            <a href="mailto:choppercouture@gmail.com" className="hover:text-cc-white transition-colors">E-MAIL</a>
          </p>
        </div>

        {/* DESKTOP: flex-wrap Link-Reihe */}
        <ul className="hidden md:flex flex-wrap gap-x-6 gap-y-2 section-name" style={{ fontSize: "clamp(0.6875rem, 0.9vw, 0.8125rem)" }}>
          {LINKS.map((l) =>
            l.external ? (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="hover:text-cc-white transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ) : (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-cc-white transition-colors">
                  {l.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Copyright — Mixed Case, klein (Figma). */}
        <p
          className="font-wide text-cc-white/50 mt-8 md:mt-0"
          style={{ fontSize: "10px", letterSpacing: "0.03em" }}
        >
          © 2026 Chopper Couture. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
