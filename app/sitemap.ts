import type { MetadataRoute } from "next";

const SITE = "https://choppercouture.ch";

// Pflicht bei output: "export" — sonst bricht der Build ab.
export const dynamic = "force-static";

/**
 * Wird beim Build zu /sitemap.xml — meldet Google alle Unterseiten.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${SITE}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/galerie`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/about`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE}/impressum`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE}/datenschutz`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE}/agb`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE}/faq`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/event`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/gewinnspiel`, lastModified, changeFrequency: "yearly", priority: 0.1 },
  ];
}
