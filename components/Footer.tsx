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
    <footer className="bg-cc-pure text-cc-white/80 px-6 md:px-12 lg:px-16 py-10 md:py-14">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Link-Reihe links */}
        <ul className="flex flex-wrap gap-x-6 gap-y-2 section-name" style={{ fontSize: "clamp(0.6875rem, 0.9vw, 0.8125rem)" }}>
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

        {/* Copyright rechts */}
        <p
          className="section-name text-cc-white/50"
          style={{ fontSize: "clamp(0.6875rem, 0.8vw, 0.75rem)" }}
        >
          © 2026 Chopper Couture. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
