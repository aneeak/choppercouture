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
        text: "Grillz sind Zahnschmuck aus Metalllegierung, der über die Zähne gesteckt wird. Er rastet durch den Unterschnitt des Zahnäquators ein und hält so fest im Mund — kann aber jederzeit wieder herausgenommen werden.",
      },
    },
    {
      "@type": "Question",
      name: "Sind Grillz sicher für die Zähne?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Sie werden individuell unter höchsten zahntechnischen Standards auf Mikrometer genau gefertigt und schaden dem Zahnschmelz nicht. Grillz sollten nur zu speziellen Anlässen getragen werden — maximal 2 Stunden am Stück, 2–3 Mal die Woche.",
      },
    },
    {
      "@type": "Question",
      name: "Wie läuft eine Bestellung bei Chopper Couture ab?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kontakt über Instagram, Website oder E-Mail. Designbesprechung und Formular ausfüllen. Termin zur Abdrucknahme in Berlin. 3D-Design mit Feedback-Runde. Ausarbeitung des Pieces. Persönliche Übergabe mit optimaler Anpassung.",
      },
    },
    {
      "@type": "Question",
      name: "Aus welchem Material sind die Grillz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chopper Couture arbeitet mit biokompatibler CoCr-Legierung (Cobalt-Chrom). Die Fertigung erfolgt im selektiven Laserschmelzverfahren (SLM) auf speziellen zahntechnischen Maschinen — das gleiche Verfahren wie in der professionellen Zahnmedizin.",
      },
    },
    {
      "@type": "Question",
      name: "Kann man Grillz in Berlin kaufen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, Chopper Couture sitzt in Berlin-Friedrichshain. Die Abdrucknahme findet vor Ort statt. Der fertige Grillz kann auch versendet werden. Kontakt per E-Mail an choppercouture@gmail.com oder über Instagram.",
      },
    },
    {
      "@type": "Question",
      name: "Was kosten Custom Grillz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zwischen 200 und 2.500 Euro — je nach Design, Zahnanzahl und gewünschten Details. Kontaktiere Chopper Couture für ein individuelles Angebot.",
      },
    },
    {
      "@type": "Question",
      name: "Wie pflege ich meine Grillz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Immer vor dem Essen, Trinken und Alkoholkonsum herausnehmen. Nach dem Tragen unter Wasser abspülen und an der Luft trocknen lassen. Trocken im Case verstauen, um Verbiegung oder Verformung zu vermeiden.",
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
        <meta name="google-site-verification" content="-2VBwCBdUgxnmeV31pChQOgraxFUCo50jiE8r8hpfxg" />
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
