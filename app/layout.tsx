import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Navigation from "@/components/Navigation";

/**
 * Fonts (Builder-Spec 2026-07 — echte Pangram-Fonts)
 * --------------------------------------------------
 *   Loos ExtraWide (Bold)      → Typekit  "loos-extrawide", weight 700
 *   Loos Wide (Light)          → Typekit  "loos-wide",      weight 400
 *   PP Hatton (Ultralight ± Italic) → local /public/fonts/PPHatton-Ultralight[Italic].otf
 *   Inter (Black 900)          → Google Fonts (bleibt für Sub-Headlines)
 *
 * Typekit-Stylesheet wird per <link> im <head> geladen (unten).
 * localFont-Instanz für PP Hatton exportiert eine CSS-Variable.
 */

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const ppHatton = localFont({
  variable: "--font-hatton",
  src: [
    { path: "../public/fonts/PPHatton-Ultralight.otf",       weight: "200", style: "normal" },
    { path: "../public/fonts/PPHatton-UltralightItalic.otf", weight: "200", style: "italic" },
  ],
  display: "swap",
});

const SITE = "https://choppercouture.ch";
const DESCRIPTION =
  "Chopper Couture — Custom Grillz und Dental Jewelry aus Berlin. Handgefertigter Zahnschmuck nach Abdruck, im SLM-Verfahren aus biokompatibler CoCr-Legierung.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Chopper Couture — Custom Grillz & Dental Jewelry Berlin",
    template: "%s — Chopper Couture",
  },
  description: DESCRIPTION,
  applicationName: "Chopper Couture",
  keywords: [
    "Chopper Couture",
    "choppercouture",
    "Grillz",
    "Custom Grillz",
    "Grillz Berlin",
    "Grillz kaufen",
    "Grillz Deutschland",
    "Grillz bestellen",
    "Dental Grillz",
    "Dental Jewelry",
    "Dental Jewellery",
    "Zahnschmuck",
    "Zahnschmuck Berlin",
    "Zahnschmuck Deutschland",
    "Zahngold",
    "Zahngold Berlin",
    "Gold Grillz",
    "Silber Grillz",
    "Tooth Gems Berlin",
    "Zahn Schmuck kaufen",
    "Custom Dental Jewelry Berlin",
    "Grillz anfertigen lassen",
    "Grillz Schmuck",
    "Anika Müggler",
  ],
  authors: [{ name: "Anika Müggler" }],
  creator: "Anika Müggler",
  publisher: "Chopper Couture",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE,
    siteName: "Chopper Couture",
    title: "Chopper Couture — Custom Grillz & Dental Jewelry Berlin",
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chopper Couture — Custom Grillz aus Berlin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chopper Couture — Custom Grillz & Dental Jewelry Berlin",
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * JSON-LD: sagt Google, dass "choppercouture" der Markenname dieser Seite ist.
 * Daten 1:1 aus dem Impressum — nichts erfunden.
 */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE}/#business`,
  name: "Chopper Couture",
  alternateName: ["choppercouture", "Chopper Couture Berlin"],
  url: SITE,
  image: `${SITE}/og-image.jpg`,
  logo: `${SITE}/og-image.jpg`,
  description: DESCRIPTION,
  email: "choppercouture@gmail.com",
  telephone: "+4915123182496",
  founder: { "@type": "Person", name: "Anika Müggler" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Stralauer Allee 17b",
    postalCode: "10245",
    addressLocality: "Berlin",
    addressCountry: "DE",
  },
  areaServed: { "@type": "Country", name: "DE" },
  sameAs: ["https://instagram.com/choppercouture"],
  knowsAbout: ["Custom Grillz", "Dental Jewelry", "Zahnschmuck", "Dental Grillz", "Zahngold"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Grillz & Dental Jewelry",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Grillz",
          description: "Individuell gefertigte Grillz nach Zahnabdruck, im SLM-Verfahren aus biokompatibler CoCr-Legierung.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dental Jewelry",
          description: "Handgefertigter Zahnschmuck — einzigartige Designs, präzise gefertigt in Berlin.",
        },
      },
    ],
  },
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was sind Grillz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Grillz sind herausnehmbarer Zahnschmuck, der über die Zähne gesteckt wird. Bei Chopper Couture werden sie individuell nach Abdruck gefertigt — im SLM-Verfahren aus biokompatibler CoCr-Legierung.",
      },
    },
    {
      "@type": "Question",
      name: "Wie bekomme ich Custom Grillz bei Chopper Couture?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In 6 Schritten: Abdruck im Labor, Gipsmodell, 3D-Scan, individuelles Design, SLM-Druck aus Edelmetall, finale Politur. Jedes Piece wird in Berlin handgefertigt.",
      },
    },
    {
      "@type": "Question",
      name: "Aus welchem Material werden die Grillz hergestellt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chopper Couture verwendet biokompatible CoCr-Legierung (Cobalt-Chrom), die im selektiven Laserschmelzverfahren (SLM) verarbeitet wird — das gleiche Verfahren wie in der Zahnmedizin.",
      },
    },
    {
      "@type": "Question",
      name: "Kann man Grillz in Berlin kaufen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, Chopper Couture sitzt in Berlin-Friedrichshain. Der Abdruck wird vor Ort genommen. Kontakt per E-Mail an choppercouture@gmail.com oder telefonisch.",
      },
    },
    {
      "@type": "Question",
      name: "Wie viel kosten Custom Grillz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der Preis hängt vom Design, der Zahnanzahl und den gewünschten Details ab. Kontaktiere Chopper Couture für ein individuelles Angebot.",
      },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${ppHatton.variable} antialiased`}
    >
      <head>
        {/* Typekit vorab verbinden — spart einen Roundtrip beim Font-Load */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="" />
        {/* Typekit — Loos-Familie (ExtraWide + Wide) */}
        <link rel="stylesheet" href="https://use.typekit.net/bsg1rex.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }}
        />
      </head>
      <body className="bg-white text-cc-black">
        <SmoothScrollProvider>
          <Navigation />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
