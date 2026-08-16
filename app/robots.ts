import type { MetadataRoute } from "next";

const SITE = "https://choppercouture.ch";

// Pflicht bei output: "export" — sonst bricht der Build ab.
export const dynamic = "force-static";

/**
 * Wird beim Build zu /robots.txt.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
