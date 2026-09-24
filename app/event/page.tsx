import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import PlaceholderImage from "@/components/PlaceholderImage";
import TicketShape, {
  TICKET_FLAECHE,
  TICKET_INNENFELD,
  TICKET_VERHAELTNIS,
} from "@/components/TicketShape";
import Footer from "@/components/Footer";

/**
 * Expo-Seite, Ticketverkauf über PayPal
 * --------------------------------------
 * Die Seite ist statisch (output: "export"), es gibt also keinen Server, der
 * Zahlungen prüfen oder Kontingente zählen könnte. Deshalb liegt die Kasse
 * komplett bei PayPal: Der Button verlinkt auf einen PayPal-Zahlungslink,
 * PayPal kassiert und liefert Name + E-Mail des Käufers mit. Kein eigenes
 * Formular, keine Drittanbieter-Skripte auf der Seite (= kein Consent-Banner).
 *
 * Die URL bleibt bewusst /event, obwohl die Seite überall "Expo" heißt:
 * Auf dem gedruckten Plakat steht ein QR-Code, der auf diese Adresse zeigt.
 *
 * ALLES, was gepflegt werden muss, steht unten im EVENT-Objekt.
 */

// ────────────────────────────────────────────────────────────────────────────
//  HIER PFLEGEN, sonst nichts anfassen.
// ────────────────────────────────────────────────────────────────────────────
const EVENT = {
  /** Titel der Expo. */
  name: "Dental Jewelry Expo",

  /** Teaser im Ton des Konzept-Decks: kurze Sätze, kein Füllwort. */
  teaser:
    "Die Artists gibt es. Die Kundschaft auch. Nur den Ort, an dem alles " +
    "zusammenkommt, gab es bisher nicht. Wir machen die erste Dental " +
    "Jewelry Expo Deutschlands.",

  /** Die Kategorien vom Plakat, als Laufband über die volle Breite. */
  lineup: [
    "Grillz",
    "Toothgem Artists",
    "Bedazzling Station",
    "Dental Tattoos",
    "Clothing",
    "Live Music",
  ],

  /** Anzeigetext für Datum + Uhrzeit. */
  dateLabel: "Samstag, 24. Oktober 2026",
  doorsLabel: "14:00–02:00 Uhr",

  /** Der Ort, im Ton des Decks. */
  venueText:
    "Der Bunker West entstand ab 1937 als unterirdische Anlage für eine " +
    "Kompanie der Luftwaffe. Heute wird er als Ort für Kunst und " +
    "Veranstaltungen genutzt. 600 m², acht Räume, eine Bühne, zwei Bars und " +
    "Galerielicht, in dem Grillz und Toothgems funkeln können.",

  /** Der Ablauf. Zeiten und Inhalte aus dem Konzept. */
  schedule: [
    {
      time: "14:00",
      title: "Opening",
      text: "Türen auf, Free Drink, die Ausstellung öffnet. Ab jetzt laufen die ersten Slots.",
    },
    {
      time: "14:00–21:00",
      title: "Peak",
      text: "Hands on: Abdrücke nehmen, Tooth Gems setzen, Beratung. Bar und Snacks durchgehend, Musik den ganzen Tag.",
    },
    {
      time: "21:00–02:00",
      title: "Stage",
      text: "Live Act, DJ-Sets, die Grillz-Verlosung und Afterparty bis zwei. Gehen oder bleiben, beides geht.",
    },
  ],

  /**
   * ── AUSSTELLENDE ────────────────────────────────────────────────────────
   * Kacheln im Rhythmus der Step-by-Step-Sektionen der Startseite.
   *
   * Pro Artist drei Fotos: `images[0]` ist das große Bild links im Mosaik,
   * `images[1]` und `images[2]` stehen rechts daneben. Kommt ein Artist ohne
   * Fotos dazu, `images: []` lassen, dann rendert die Kachel automatisch eine
   * Platzhalterfläche.
   *
   * Neue Fotos nach public/images/event/aussteller/ legen:
   *   grosses Bild 1200 × 1350, die beiden kleinen 640 × 720 (Verhältnis 8:9).
   */
  exhibitors: [
    {
      n: "01",
      role: "Grillz",
      title: "Grillz by Espino",
      body: "Chrome Grillz aus Kreuzberg.",
      instagram: "grillzbyespino",
      images: [
        { src: "/images/event/aussteller/espino-1.webp", alt: "Chrome Grillz von Grillz by Espino, getragen" },
        { src: "/images/event/aussteller/espino-2.webp", alt: "Porträt des Artists hinter Grillz by Espino" },
        { src: "/images/event/aussteller/espino-3.webp", alt: "Drei Grillz-Sets von Grillz by Espino auf Gipsmodellen" },
      ],
    },
    {
      n: "02",
      role: "Grillz",
      title: "dimapeletsky",
      body: "Dark Biomorphic Style.",
      instagram: "dimapeletsky",
      images: [
        { src: "/images/event/aussteller/dimapeletsky-1.webp", alt: "Biomorphes Grillz von dimapeletsky auf dem Gipsmodell" },
        { src: "/images/event/aussteller/dimapeletsky-2.webp", alt: "Grillz von dimapeletsky, getragen" },
        { src: "/images/event/aussteller/dimapeletsky-3.webp", alt: "Porträt mit Grillz von dimapeletsky" },
      ],
    },
    {
      n: "03",
      role: "Grillz",
      title: "Grill Smith",
      body: "Bold, shiny, extravagant.",
      instagram: "grill.smith",
      images: [
        { src: "/images/event/aussteller/grill-smith-1.webp", alt: "Grillz und Gems von Grill Smith, getragen" },
        { src: "/images/event/aussteller/grill-smith-2.webp", alt: "Vollständig mit Steinen besetztes Grillz-Set von Grill Smith" },
        { src: "/images/event/aussteller/grill-smith-3.webp", alt: "Grillz mit Schriftzug und Steinen von Grill Smith" },
      ],
    },
    {
      n: "04",
      role: "Grillz",
      title: "Bladezz",
      body: "Floral, organisch, filigran.",
      instagram: "bladezz_studio",
      images: [
        { src: "/images/event/aussteller/bladezz-1.webp", alt: "Filigranes Grillz von Bladezz in Nahaufnahme" },
        { src: "/images/event/aussteller/bladezz-2.webp", alt: "Grillz von Bladezz auf dem Gipsmodell" },
        { src: "/images/event/aussteller/bladezz-3.webp", alt: "Grillz von Bladezz auf dem Gipsmodell, Seitenansicht" },
      ],
    },
    {
      n: "05",
      role: "Toothgems",
      title: "Toothcandy",
      body: "Toothgems von Melissa Righi.",
      instagram: "toothcandy030",
      images: [
        { src: "/images/event/aussteller/toothcandy-1.webp", alt: "Gesetzte Toothgems von Toothcandy" },
        { src: "/images/event/aussteller/toothcandy-2.webp", alt: "Rote und schwarze Toothgems von Toothcandy" },
        { src: "/images/event/aussteller/toothcandy-3.webp", alt: "Porträt von Melissa Righi, Toothcandy" },
      ],
    },
    {
      n: "06",
      role: "Toothgems",
      title: "Kristall Pearl",
      body: "Sexy Smiles.",
      instagram: "kristall.pearl",
      images: [
        { src: "/images/event/aussteller/kristall-1.webp", alt: "Toothgems und silberne Zahnkappen von Kristall Pearl" },
        { src: "/images/event/aussteller/kristall-2.webp", alt: "Kristall Pearl beim Setzen von Toothgems" },
        { src: "/images/event/aussteller/kristall-3.webp", alt: "Entwürfe und Steine von Kristall Pearl" },
      ],
    },
    {
      n: "07",
      role: "Toothgems",
      title: "Gems by Jiji",
      body: "Evgenia Akhomgotova, Dental Cosmetic Specialist. Tooth Gems und Bleaching.",
      instagram: "gemsbyjiji",
      images: [
        { src: "/images/event/aussteller/jiji-1.webp", alt: "Gesetzte Tooth Gems von Gems by Jiji in Nahaufnahme" },
        { src: "/images/event/aussteller/jiji-2.webp", alt: "Porträt von Evgenia Akhomgotova mit besetzter Sturmhaube" },
        { src: "/images/event/aussteller/jiji-3.webp", alt: "Lächeln mit Tooth Gems von Gems by Jiji" },
      ],
    },
    {
      n: "08",
      role: "Dental Tattoos",
      title: "June Handpoke",
      body: "Small stick and poke dental flashes on your skin xP",
      instagram: "stiickandsmoke",
      images: [
        { src: "/images/event/aussteller/june-1.webp", alt: "Dental Flashes von June Handpoke, als Collage mit den Motiven" },
        { src: "/images/event/aussteller/june-2.webp", alt: "Porträt von June Handpoke zwischen den eigenen Flash-Motiven" },
        { src: "/images/event/aussteller/june-3.webp", alt: "June Handpoke mit Dental-Flash-Motiven, Bewegungsaufnahme" },
      ],
    },
    {
      n: "09",
      role: "Bedazzling Station",
      title: "Diamond Painting Station",
      // Formulierung stammt nicht von der Station selbst, sondern ist an
      // den DIY-Space-Text weiter unten angelehnt. Bei Bedarf ersetzen.
      body: "Steine, Kleber, freie Auswahl. Bedazzel, was du dabeihast.",
      instagram: null as string | null,
      images: [
        { src: "/images/event/aussteller/bedazzling-1.webp", alt: "Schriftzug aus aufgeklebten Strasssteinen" },
        { src: "/images/event/aussteller/bedazzling-2.webp", alt: "Mit Strasssteinen beklebtes Stoppschild mit dem Wort SLAY" },
        { src: "/images/event/aussteller/bedazzling-3.webp", alt: "Lose Strasssteine in verschiedenen Farben und Formen" },
      ],
    },
  ],

  /** Kategorien vom Plakat, für die noch keine Namen final sind. */
  openSlots: ["Clothing", "Live Music"],

  /** Was es sonst noch gibt. */
  details: [
    {
      title: "DIY Space",
      text: "Gems zum Selbstaufkleben, auf deine Membranbox, dein Feuerzeug, dein Handy. Was du dabeihast, kann funkeln.",
      image: null,
    },
    {
      title: "Stainless Menu",
      text: "Snacks und Drinks in hellen Farben. Nichts, was frische Gems verfärbt. Wer sich mittags etwas machen lässt, kann abends trotzdem essen und trinken.",
      // Optionales Bild über dem Titel. Die anderen Einträge haben keins,
      // das Raster kommt damit klar.
      image: {
        src: "/images/event/all-white-menu.webp",
        alt: "Drinks in hellen Farben mit weißen Tulpen auf dunklem Tisch",
      },
    },
    {
      title: "Der Look",
      text: "Deko, Licht und Bar folgen derselben Logik: hell, clean, reduziert. Im Mittelpunkt stehen die Arbeiten.",
      image: null,
    },
  ],

  /** Ort. */
  venue: "Bunker West",
  address: "Hohenzollerndamm 120, 14199 Berlin",

  /** Preise in Euro. Kleinunternehmerin § 19 UStG → keine USt. */
  price: 13,                 // Vorverkauf
  priceDoor: 18,             // Abendkasse

  /** Wie viele Tickets es im Vorverkauf gibt. */
  presaleCapacity: 150,

  /** Mindestalter für den Einlass, oder null wenn keins gilt. */
  minAge: null as number | null,

  /**
   * PayPal-Zahlungslink aus dem Business-Konto.
   * Solange leer, zeigt die Seite automatisch "Vorverkauf startet bald"
   * statt eines toten Buttons.
   */
  paypalUrl: "https://www.paypal.com/ncp/payment/GJZLEZ8RRM3D8",

  /**
   * Auf true stellen, sobald die Vorverkaufs-Tickets weg sind. Die Seite sagt
   * dann "Vorverkauf ausverkauft" und weist auf die Abendkasse hin, NICHT
   * "ausverkauft", denn an der Tür geht ja weiter was.
   */
  presaleSoldOut: false,

  /**
   * Auf true stellen, wenn Datum, Adresse und Preis final eingetragen sind.
   * Schaltet die strukturierten Daten für Google frei, vorher bewusst aus,
   * damit Google keine Platzhalter-Daten indexiert.
   */
  published: true,

  /** ISO-Start/Ende, nur für die strukturierten Daten.
      +02:00, weil die Sommerzeit erst am 25.10.2026 endet. Die Zeitumstellung
      in dieser Nacht (03:00 CEST → 02:00 CET) liegt nach dem Ende um 02:00,
      beide Zeiten stehen also noch in der Sommerzeit. */
  startIso: "2026-10-24T14:00:00+02:00",
  endIso: "2026-10-25T02:00:00+02:00",
};
// ────────────────────────────────────────────────────────────────────────────

const SITE = "https://choppercouture.ch";

export const metadata = {
  title: `${EVENT.name} | Tickets`,
  description: `${EVENT.name} im ${EVENT.venue}. Tickets im Vorverkauf, mit Free Drink und der Chance auf ein Set Grillz von Chopper Couture.`,
  alternates: { canonical: "/event" },
  openGraph: {
    title: `${EVENT.name} | Chopper Couture`,
    description: `${EVENT.name} im ${EVENT.venue}. Tickets im Vorverkauf.`,
    url: `${SITE}/event`,
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }],
  },
};

/** Preise als "13 €", oder "k. A." solange nichts gepflegt ist. */
const euro = (n: number) => `${n.toLocaleString("de-DE")} €`;
const priceLabel = EVENT.price > 0 ? euro(EVENT.price) : "k. A.";
const doorLabel = EVENT.priceDoor > 0 ? euro(EVENT.priceDoor) : "k. A.";

/**
 * Event-Schema für Google. Wird nur ausgegeben, wenn published: true,
 * denn unvollständige oder erfundene Event-Daten schaden dem Ranking mehr
 * als gar keine.
 */
const EVENT_LD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: EVENT.name,
  startDate: EVENT.startIso,
  endDate: EVENT.endIso || undefined,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  description: EVENT.teaser,
  image: `${SITE}/og-cover.jpg`,
  url: `${SITE}/event`,
  location: {
    "@type": "Place",
    name: EVENT.venue,
    address: { "@type": "PostalAddress", streetAddress: EVENT.address, addressCountry: "DE" },
  },
  organizer: { "@type": "Organization", name: "Chopper Couture", url: SITE },
  maximumAttendeeCapacity: EVENT.presaleCapacity,
  offers: [
    {
      "@type": "Offer",
      name: "Vorverkauf",
      price: EVENT.price,
      priceCurrency: "EUR",
      url: `${SITE}/event`,
      availability: EVENT.presaleSoldOut
        ? "https://schema.org/SoldOut"
        : "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Abendkasse",
      price: EVENT.priceDoor,
      priceCurrency: "EUR",
      url: `${SITE}/event`,
      availability: "https://schema.org/InStock",
    },
  ],
};

/** Eine Zeile im Fakten-Block: Label oben klein, Wert darunter groß. */
function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-cc-black/15 pt-4">
      <p
        className="section-name text-cc-black/50"
        style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}
      >
        {label}
      </p>
      <p
        className="font-hatton mt-2"
        style={{ fontSize: "clamp(1.125rem, 1.8vw, 1.5rem)", lineHeight: "1.3" }}
      >
        {value}
      </p>
    </div>
  );
}

/**
 * Der Kauf-Button in seinen drei Zuständen. Steht zweimal auf der Seite,
 * oben als schneller Einstieg und unten in der Ticket-Box, deshalb hier
 * zentral, damit die Zustände nicht auseinanderlaufen.
 */
function BuyButton({ ticketsLive }: { ticketsLive: boolean }) {
  const chip =
    "inline-flex items-center gap-2 rounded-full px-5 md:px-8 py-2 md:py-4 font-hatton-i";
  const size = { fontSize: "clamp(1.1875rem, 1.4vw, 1.375rem)" };

  if (EVENT.presaleSoldOut) {
    return (
      <p className={`${chip} border border-cc-black/25 text-cc-black/45`} style={size}>
        Vorverkauf ausverkauft
      </p>
    );
  }
  if (!ticketsLive) {
    return (
      <p className={`${chip} border border-cc-black/25 text-cc-black/45`} style={size}>
        Vorverkauf startet in Kürze
      </p>
    );
  }
  return (
    <a
      href={EVENT.paypalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${chip} border border-cc-purple bg-cc-purple text-cc-white hover:bg-cc-black hover:border-cc-black transition-colors`}
      style={size}
    >
      <span>Ticket kaufen</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

/**
 * Die beiden Kaufgründe als Chips: Free Drink und die Chance auf ein Set
 * Grillz. Stehen direkt neben dem Button, damit sie vor dem Klick gelesen
 * werden und nicht erst weiter unten auftauchen.
 */
function PerkChips() {
  const chip =
    "inline-flex items-center gap-2 rounded-full border border-cc-purple/35 bg-cc-purple/[0.07] px-4 py-2 text-cc-black/85 body-copy";
  const size = { fontSize: "clamp(0.8125rem, 1vw, 0.9375rem)" };
  return (
    <div className="flex flex-wrap gap-2.5">
      <span className={chip} style={size}>
        <span aria-hidden="true" className="text-cc-purple">
          ★
        </span>
        Chance auf ein Set Grillz
      </span>
      <span className={chip} style={size}>
        <span aria-hidden="true" className="text-cc-purple">
          ●
        </span>
        Free Drink inklusive
      </span>
    </div>
  );
}

/**
 * TicketCard
 * ----------
 * Der Kauf-Einstieg auf der Ticket-Grafik aus Ticket.svg. Die Grafik liefert
 * Form, gestanzten Rand, Abriss und die gestrichelten Linien; dieser
 * Baustein legt nur den Inhalt in das freie Innenfeld.
 *
 * Die Grafik erbt ihre Farbe von currentColor. Beim Hover wechselt das
 * Ticket deshalb komplett die Farbe, und das Innenfeld läuft zusätzlich
 * violett voll, während die Schrift darin auf Weiß dreht.
 *
 * Die Position des Innenfelds kommt als gemessene Konstante aus
 * TicketShape, nicht aus geschätzten Pixelwerten. Sie sitzt oben und unten
 * genau auf den gestrichelten Linien, der Inhalt liegt also dazwischen.
 *
 * Der Text ist bewusst knapp: Das Innenfeld ist nur rund 70 Prozent der
 * Ticket-Höhe, und die Höhe hängt über das feste Seitenverhältnis der
 * Grafik an der Breite. Auf einem 327px breiten Handy bleiben dafür etwa
 * 128px. Längere Zeilen brachen dort um und liefen über die gestrichelten
 * Linien hinaus. Datum und Ort stehen ohnehin im Fakten-Block und in der
 * Ticket-Box weiter unten.
 */
function TicketCard({ ticketsLive }: { ticketsLive: boolean }) {
  /** Ganze Innenfläche, wird beim Hover gefüllt. */
  const flaeche: React.CSSProperties = {
    left: TICKET_FLAECHE.links,
    right: TICKET_FLAECHE.rechts,
    top: TICKET_FLAECHE.oben,
    bottom: TICKET_FLAECHE.unten,
  };

  /** Bereich zwischen den gestrichelten Linien, dort steht der Text. */
  const feld: React.CSSProperties = {
    left: TICKET_INNENFELD.links,
    right: TICKET_INNENFELD.rechts,
    top: TICKET_INNENFELD.oben,
    bottom: TICKET_INNENFELD.unten,
  };

  const rahmen = "group relative block w-full";

  if (EVENT.presaleSoldOut || !ticketsLive) {
    return (
      <div className={`${rahmen} text-cc-black/35`}>
        <TicketShape className="block w-full" />
        <div className="absolute flex items-center justify-center px-4" style={feld}>
          <p
            className="headline-md text-center text-cc-black/55"
            style={{ fontSize: "clamp(0.8125rem, 1.6vw, 1.5rem)" }}
          >
            {EVENT.presaleSoldOut ? "Ausverkauft" : "Startet bald"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <a
      href={EVENT.paypalUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ticket kaufen für ${priceLabel} im Vorverkauf`}
      className={`${rahmen} text-cc-purple transition-[transform,color] duration-200 hover:-translate-y-1 hover:text-cc-black focus-visible:-translate-y-1 focus-visible:text-cc-black`}
    >
      {/* Füllung der gesamten Innenfläche. Liegt hinter der Grafik, damit
          Rahmen, Abriss und gestrichelte Linien darüber liegen. Beim Hover
          deckt sie flächig, zusammen mit der schwarzen Grafik wirkt das
          Ticket dann komplett schwarz. */}
      <span
        aria-hidden="true"
        className="absolute bg-cc-purple/[0.08] transition-colors duration-200 group-hover:bg-cc-black group-focus-visible:bg-cc-black"
        style={flaeche}
      />

      <TicketShape className="relative block w-full" />

      {/* Inhalt im Innenfeld, zwischen den gestrichelten Linien */}
      <span
        className="absolute flex flex-col justify-center gap-[0.35em] px-[4%] text-cc-purple transition-colors duration-200 group-hover:text-cc-white group-focus-visible:text-cc-white"
        style={feld}
      >
        <span
          className="section-name leading-snug opacity-80"
          style={{ fontSize: "clamp(0.5rem, 0.62vw, 0.7rem)", letterSpacing: "0.14em" }}
        >
          VORVERKAUF · {priceLabel}
        </span>

        <span className="flex min-w-0 items-center justify-between gap-3">
          {/* Die Beschriftung sitzt dort, wo in der Vorlage groß TICKET
              steht. Die Größe rechnet in vw und ist so bemessen, dass sie
              bei 1024px noch in das Innenfeld passt. */}
          <span
            className="relative headline-md whitespace-nowrap"
            style={{ fontSize: "clamp(0.875rem, 2.2vw, 2.1rem)" }}
          >
            <span className="transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0">
              Ticket kaufen
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              Lets Go! 🦷
            </span>
          </span>
          <span
            aria-hidden="true"
            className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
            style={{ fontSize: "clamp(0.75rem, 1.2vw, 1.25rem)" }}
          >
            →
          </span>
        </span>

        <span className="body-copy leading-snug opacity-90" style={{ fontSize: "clamp(0.5rem, 0.7vw, 0.8125rem)" }}>
          Free Drink · Grillz-Verlosung
        </span>
      </span>
    </a>
  );
}

/**
 * Eine Aussteller-Kachel, gebaut wie die Step-by-Step-Sektionen auf der
 * Startseite (components/ProcessSteps.tsx): Bilder randabfallend auf der
 * einen Hälfte, Text vertikal zentriert auf der anderen, jede zweite Kachel
 * gespiegelt.
 *
 * Die Bildhälfte ist ein Mosaik im 4:3-Block: links das große Foto über zwei
 * Zeilen, rechts zwei kleinere übereinander. Alle drei Felder haben dasselbe
 * Seitenverhältnis (8:9), deshalb sind die Dateien auch so geschnitten und
 * der Crop im Browser greift kaum noch. Ohne Fotos rendert die Hälfte eine
 * Platzhalterfläche.
 */
function ExhibitorTile({
  exhibitor,
  index,
}: {
  exhibitor: (typeof EVENT.exhibitors)[number];
  index: number;
}) {
  const reversed = index % 2 === 1;
  const [lead, ...rest] = exhibitor.images;

  return (
    <div
      className={`grid md:grid-cols-2 items-stretch border-t border-cc-black/15 ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Bilder, voll bis zum Bildschirmrand. gap-px auf dunklem Grund
          erzeugt die Haarlinien zwischen den drei Feldern.

          Zur Höhe, das ist heikler als es aussieht: Die Kinder sind mit
          fill absolut positioniert und haben deshalb keine Eigenhöhe. Die
          Höhe kann also nur aus aspect-ratio kommen. Steht das Element
          zugleich auf align-self: stretch, ignoriert Safari das
          Seitenverhältnis und die Kachel fällt auf null zusammen, während
          Chrome sie korrekt zeichnet.

          Zwei Absicherungen, unabhängig voneinander:
            self-start   nimmt das Element aus dem Stretch, damit
                         aspect-ratio überhaupt greift
            min-h-[75vw] garantiert die Höhe auch dann, wenn ein Browser
                         aspect-ratio nicht anwendet. 75vw ist bei voller
                         Breite exakt 4:3, der Wert ändert also nichts,
                         solange alles normal funktioniert.
          Ab md gilt beides nicht mehr: dort bestimmt die Textspalte die
          Zeilenhöhe und die Kachel füllt sie per h-full. */}
      {lead ? (
        <div className="grid grid-cols-3 grid-rows-2 gap-px bg-cc-black/20 w-full aspect-[4/3] self-start min-h-[75vw] md:self-stretch md:min-h-0 md:h-full">
          <div className="col-span-2 row-span-2 relative overflow-hidden bg-cc-black">
            <Image
              src={lead.src}
              alt={lead.alt}
              fill
              sizes="(max-width: 768px) 67vw, 34vw"
              className="object-cover"
            />
          </div>
          {rest.map((img) => (
            <div key={img.src} className="relative overflow-hidden bg-cc-black">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 34vw, 17vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <PlaceholderImage
          ratio="4/3"
          label={exhibitor.role}
          hint="1200 × 1350"
          tone="dark"
          className="self-start min-h-[75vw] md:self-stretch md:min-h-0 md:h-full"
        />
      )}

      {/* Text, gleiche Höhe wie die Bilder, vertikal zentriert */}
      <div className="flex items-center px-6 md:px-12 lg:px-20 py-14 md:py-0">
        <div className="max-w-md">
          <p className="font-mono text-xs tracking-cc-caps uppercase text-cc-black/50 mb-5">
            {exhibitor.n} · {exhibitor.role}
          </p>
          <h3
            className="font-black uppercase leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: "clamp(1.875rem, 3.6vw, 3.25rem)" }}
          >
            {exhibitor.title}
          </h3>
          <p className="text-base md:text-lg leading-relaxed text-cc-black/75">
            {exhibitor.body}
          </p>
          {exhibitor.instagram && (
            <a
              href={`https://instagram.com/${exhibitor.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              /* py-3.5 bringt die Trefferfläche auf 44px Höhe, den
                 Richtwert für Fingertipps. mt-1.5 gleicht die neue
                 Innenpolsterung aus, damit der sichtbare Abstand zum
                 Absatz darüber derselbe bleibt wie vorher. */
              className="mt-1.5 inline-block py-3.5 font-mono text-xs tracking-cc-caps uppercase text-cc-black/55 underline underline-offset-4 hover:text-cc-purple transition-colors"
            >
              @{exhibitor.instagram}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EventPage() {
  const ticketsLive = EVENT.paypalUrl !== "" && !EVENT.presaleSoldOut;

  return (
    <>
      {EVENT.published && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(EVENT_LD) }}
        />
      )}

      <section
        data-nav-tone="dark"
        className="bg-cc-offwhite text-cc-black"
        style={{
          /* Kein Abstand nach oben: das Plakat beginnt direkt unter der
             Navigation, die als Overlay darüber liegt. */
          paddingBottom: "clamp(6rem, 10vw, 9.375rem)",
        }}
      >
        {/* ── Plakat ────────────────────────────────────────────────────────
            Der Auftakt der Seite, randlos über die volle Breite. 4:5 auf
            Mobile, 16:9 auf Desktop. Das Plakat sitzt mittig im Motiv, der
            Crop nimmt nur Wand weg, der Flyer bleibt vollständig lesbar.
            priority, weil es das erste sichtbare Element ist. */}
        <div className="relative w-full bg-cc-pure overflow-hidden aspect-[4/5] md:aspect-[16/9]">
          <Image
            src="/images/event/plakat-mockup.webp"
            alt={`Plakat zur ${EVENT.name} im ${EVENT.venue}`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* ── Kopf ──────────────────────────────────────────────────────────
            Nutzt die volle Breite statt der schmalen 920px-Spalte. Die Zeilen
            sitzen auf versetzten Achsen: Überschrift dreistufig eingerückt,
            Teaser und Kaufzeile jeweils auf eigener Achse. Die Einzüge sind
            in vw gerechnet, die Staffelung bleibt dadurch auf jeder Breite
            im gleichen Verhältnis. */}
        <div
          className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto"
          style={{ paddingTop: "clamp(4rem, 7vw, 7rem)" }}
        >
          <SectionHeader number="2026" name="1st" tone="dark" />

          {/* Drei Zeilen mit wachsendem Einzug. Auf breiten Schirmen steht der
              volle Titel da, nicht nur "Dental Jewelry". */}
          {/* Drei Zeilen als Diagonale über die volle Breite: "Dental" am
              linken Rand, "Jewelry" versetzt in der Mitte, "Expo." rechts
              bündig. Dadurch spannt die Überschrift den ganzen Schirm auf,
              statt in der linken Hälfte zu kleben. Auf Mobile fällt der
              Versatz klein aus, sonst bricht "Jewelry" um. */}
          <h1
            className="headline-lg mt-8 md:mt-10"
            style={{ fontSize: "clamp(2.25rem, 8.8vw, 8.5rem)" }}
          >
            <span className="block">Dental</span>
            <span
              className="block"
              style={{ paddingLeft: "clamp(1.5rem, 16vw, 15rem)" }}
            >
              Jewelry
            </span>
            <span className="block text-right">Expo.</span>
          </h1>

          {/* Läuft bewusst über die volle Spaltenbreite, kein Einzug und
              keine Begrenzung der Zeilenlänge. */}
          <p
            className="subline mt-6 md:mt-8"
            style={{ fontSize: "clamp(1.125rem, 2.1vw, 1.875rem)" }}
          >
            {EVENT.teaser}
          </p>

        </div>

        {/* ── Gewinnspiel und Kauf ──────────────────────────────────────────
            Das Nachtbild liegt bündig am linken Seitenrand, rechts oben der
            Text. Das Grillz-Motiv sitzt mittig auf der rechten Kante des
            Nachtbilds, je zur Hälfte darauf und daneben. Rechts daneben das
            Ticket, unten auf derselben Linie wie das Motiv.

            Kein Bild wird beschnitten: Beide Container tragen exakt das
            Seitenverhältnis ihrer Datei, das Nachtbild 3:4 (1086 × 1448),
            das Motiv 4:5 (760 × 950).

            Zwei Variablen steuern die Komposition:
              --bh  Höhe des Nachtbilds, daraus folgt dessen Breite (× 0,75)
              --gh  Höhe des Motivs, daraus folgt dessen Breite (× 0,8)
              --gy  wie weit Motiv und Ticket unter der Mitte sitzen
            Die Überlappung ergibt sich rechnerisch: Das Motiv steht auf
            left = Breite des Nachtbilds und wird per -translate-x-1/2 um
            seine halbe Breite nach links gezogen, liegt also exakt zur
            Hälfte auf dem Nachtbild.

            Die Überlagerung greift erst ab 1280px. Darunter ist die rechte
            Spalte so schmal, dass der Text nach unten wächst und mit dem
            Ticket kollidieren würde; dort stehen Motiv und Ticket deshalb
            als normale Reihe unter dem Text.

            Mobile stapelt: Nachtbild, Text, Ticket, Motiv. */}
        <div
          className="mt-14 md:mt-20 flex flex-col lg:grid lg:grid-cols-[auto_minmax(0,1fr)] lg:grid-rows-[auto_auto] lg:items-start xl:relative"
          style={
            {
              "--bh": "min(46vw, 720px)",
              "--gh": "calc(min(46vw, 720px) * 0.5)",
              /* Versatz des Motivs nach unten, gemessen von der Mitte des
                 Nachtbilds. Das Ticket rechnet damit ebenfalls, beide
                 wandern also gemeinsam und bleiben unten bündig. */
              "--gy": "calc(min(46vw, 720px) * 0.09)",
              /* Seitenverhältnis der Ticket-Grafik, gemessen am SVG. Die
                 Breite des Tickets folgt daraus, die Höhe bleibt an das
                 Motiv gekoppelt. */
              "--tv": String(TICKET_VERHAELTNIS),
            } as React.CSSProperties
          }
        >
          {/* Nachtbild, ganz links */}
          <div className="relative w-full aspect-[3/4] overflow-hidden bg-cc-pure lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:aspect-auto lg:h-[var(--bh)] lg:w-[calc(var(--bh)*0.75)]">
            <Image
              src="/images/event/bunker-west-nacht.webp"
              alt="Eingang des Bunker West bei Nacht, Menschen warten vor der beleuchteten Tür"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover"
            />
          </div>

          {/* Text, rechts oben */}
          <div className="px-6 md:px-12 mt-10 lg:mt-0 lg:px-0 lg:col-start-2 lg:row-start-1 lg:pl-14 lg:pr-12 xl:pl-16 xl:pr-16">
            <div className="border-l-4 border-cc-purple pl-5 md:pl-7 max-w-[44rem]">
              <p
                className="section-name text-cc-purple"
                style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}
              >
                NUR IM VORVERKAUF
              </p>
              <p
                className="font-hatton mt-3"
                style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)", lineHeight: "1.15" }}
              >
                Kauf ein Ticket, gewinne ein Set Grillz.
              </p>
              <p
                className="mt-3 body-copy text-cc-black/70"
                style={{ fontSize: "clamp(0.9375rem, 1.15vw, 1.125rem)" }}
              >
                Jedes Vorverkaufs-Ticket ist ein Los. Zu gewinnen gibt es ein
                Set custom gefertigte Grillz über vier Zähne, in deinem
                Wunsch-Design. Dein Free Drink an der Bar ist sowieso dabei.
                Der Vorverkauf ist auf {EVENT.presaleCapacity} Tickets
                limitiert.
              </p>
            </div>
          </div>

          {/* Motiv und Ticket. xl:contents löst diesen Wrapper ab 1280px
              auf, damit beide Kinder direkt gegen den Container positioniert
              werden können. Darunter bleibt er eine normale Reihe. */}
          <div className="mt-10 flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-10 lg:col-start-2 lg:row-start-2 lg:pl-14 lg:pr-12 xl:contents">
            {/* Ticket steht im DOM vor dem Motiv, damit der Kauf auf dem
                Handy nicht ans Ende rutscht. */}
            <div className="px-6 md:px-12 lg:px-0 lg:order-2 w-full lg:w-[420px] lg:shrink-0 xl:absolute xl:z-20 xl:w-[calc(var(--gh)*var(--tv))] xl:left-[calc(var(--bh)*0.75+var(--gh)*0.4+2.5rem)] xl:top-[calc(50%+var(--gy)+var(--gh)/2)] xl:-translate-y-full">
              <TicketCard ticketsLive={ticketsLive} />

              {/* Pflichthinweis direkt unter der Grafik. top-full hängt ihn
                  ab 1280px unter das Ticket, ohne dessen Höhe zu verändern,
                  sonst würde die Unterkante nicht mehr mit dem Motiv
                  fluchten. */}
              <p
                className="mt-4 body-copy text-cc-black/55 xl:absolute xl:inset-x-0 xl:top-full xl:mt-4"
                style={{ fontSize: "clamp(0.8125rem, 0.95vw, 0.9375rem)" }}
              >
                Kein Widerrufsrecht bei Veranstaltungen mit festem Termin
                (§ 312g Abs. 2 Nr. 9 BGB).{" "}
                <a href="#tickets" className="underline underline-offset-2 hover:text-cc-purple">
                  Alle Ticket-Infos
                </a>
              </p>
            </div>

            <div className="relative w-full aspect-[4/5] overflow-hidden bg-cc-pure lg:order-1 lg:w-auto lg:h-[calc(var(--bh)*0.4)] lg:shrink-0 xl:absolute xl:z-10 xl:h-[var(--gh)] xl:w-[calc(var(--gh)*0.8)] xl:left-[calc(var(--bh)*0.75)] xl:top-[calc(50%+var(--gy))] xl:-translate-x-1/2 xl:-translate-y-1/2">
              <Image
                src="/images/event/grillz-gewinnen.webp"
                alt="Grillz von Chopper Couture, getragen"
                fill
                sizes="(max-width: 1024px) 100vw, 20vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* ── Programm ─────────────────────────────────────────────────────
            Bricht bewusst aus der zentrierten Textspalte aus und läuft als
            Band über die volle Breite. Auf Desktop verteilen sich die Punkte
            per justify-between bis an beide Ränder, auf Mobile umbrechen sie
            mit Trennpunkten. */}
        <div className="mt-14 md:mt-20 border-y border-cc-black/15">
          <ul
            className="px-6 md:px-12 lg:px-16 py-5 md:py-6 flex flex-wrap md:flex-nowrap md:justify-between gap-x-4 gap-y-2 section-name text-cc-black/60"
            style={{ fontSize: "clamp(0.6875rem, 0.9vw, 0.8125rem)", letterSpacing: "0.08em" }}
          >
            {EVENT.lineup.map((act, i) => (
              <li key={act} className="whitespace-nowrap">
                {act}
                {i < EVENT.lineup.length - 1 && (
                  <span className="ml-4 text-cc-black/25 md:hidden">·</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Die Ausstellenden ────────────────────────────────────────────
            Volle Breite, im Rhythmus der Step-by-Step-Sektionen der
            Startseite. Inhalte kommen aus EVENT.exhibitors. */}
        <div className="mt-20 md:mt-32">
          <div className="px-6 md:px-10 max-w-[920px] mx-auto">
            <p
              className="section-name text-cc-black/50"
              style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}
            >
              DIE AUSSTELLENDEN
            </p>
            <h2
              className="font-hatton-i mt-3"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", lineHeight: "1.05" }}
            >
              Wer da ist
            </h2>
            <p
              className="mt-5 mb-12 md:mb-16 body-copy text-cc-black/80 leading-relaxed"
              style={{ fontSize: "clamp(0.9375rem, 1.15vw, 1.125rem)" }}
            >
              Acht Räume, ein Tag, Artists aus Berlin und darüber hinaus.
              Die Liste wächst weiter, sobald die nächsten Zusagen final sind.
            </p>
          </div>

          <div className="border-b border-cc-black/15">
            {EVENT.exhibitors.map((ex, i) => (
              <ExhibitorTile key={ex.n} exhibitor={ex} index={i} />
            ))}
          </div>

          {/* Kategorien vom Plakat, für die die Namen noch fehlen. Bewusst
              nur eine Zeile statt leerer Kacheln, damit die Sektion nicht
              nach Baustelle aussieht. */}
          {EVENT.openSlots.length > 0 && (
            <div className="px-6 md:px-10 max-w-[920px] mx-auto mt-10 md:mt-14">
              <p
                className="section-name text-cc-black/50"
                style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}
              >
                NAMEN FOLGEN
              </p>
              <ul
                className="mt-4 flex flex-wrap gap-x-3 gap-y-3"
                style={{ fontSize: "clamp(0.8125rem, 1vw, 0.9375rem)" }}
              >
                {EVENT.openSlots.map((slot) => (
                  <li
                    key={slot}
                    className="rounded-full border border-cc-black/20 px-4 py-2 body-copy text-cc-black/60"
                  >
                    {slot}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="px-6 md:px-10 max-w-[920px] mx-auto">
          {/* Fakten, Datum, Einlass, Ort, Preis */}
          <div className="mt-20 md:mt-32 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <Fact label="DATUM" value={EVENT.dateLabel} />
            <Fact label="BEGINN" value={EVENT.doorsLabel} />
            <Fact label="ORT" value={`${EVENT.venue}${EVENT.address !== "TBA" ? ` · ${EVENT.address}` : ""}`} />
            <Fact label="TICKET" value={`${priceLabel} VVK · ${doorLabel} AK`} />
          </div>

          {/* ── Der Ort ─────────────────────────────────────────────────────
              Sprache aus dem Konzept-Deck: kurze Sätze, harte Nomen. */}
          <div className="mt-20 md:mt-32">
            <p
              className="section-name text-cc-black/50"
              style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}
            >
              DER ORT
            </p>
            <h2
              className="font-hatton-i mt-3"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", lineHeight: "1.05" }}
            >
              Bunker West
            </h2>
            <p
              className="mt-5 body-copy text-cc-black/80 leading-relaxed"
              style={{ fontSize: "clamp(0.9375rem, 1.15vw, 1.125rem)" }}
            >
              {EVENT.venueText}
            </p>
          </div>
        </div>

        {/* ── Der Ort, Bild ────────────────────────────────────────────────
            Ein Galerieraum im Bunker West, über die volle Breite direkt unter
            dem Text zum Ort. Stand vorher ganz am Seitenende, wo der Bezug
            zum Text verloren ging. svh statt vh, damit die ein- und
            ausfahrende Browserleiste auf iOS die Höhe nicht springen lässt. */}
        <div className="relative w-full mt-10 md:mt-14 bg-cc-pure overflow-hidden">
          <Image
            src="/images/event/bunker-west.webp"
            alt={`Galerieraum im ${EVENT.venue}, ${EVENT.address}`}
            width={1600}
            height={1068}
            sizes="100vw"
            className="w-full h-[60svh] md:h-[85svh] object-cover"
          />
        </div>

        <div className="px-6 md:px-10 max-w-[920px] mx-auto">
          {/* ── Der Ablauf ──────────────────────────────────────────────── */}
          <div className="mt-20 md:mt-32">
            <p
              className="section-name text-cc-black/50"
              style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}
            >
              DER ABLAUF
            </p>
            <div className="mt-8">
              {EVENT.schedule.map((slot, i) => (
                <div
                  key={slot.title}
                  className={`grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-8 py-7 md:py-9 border-t border-cc-black/15 ${
                    i === EVENT.schedule.length - 1 ? "border-b" : ""
                  }`}
                >
                  <p
                    className="font-hatton text-cc-black/60"
                    style={{ fontSize: "clamp(0.9375rem, 1.15vw, 1.125rem)" }}
                  >
                    {slot.time}
                  </p>
                  <div>
                    <h3
                      className="font-wide font-bold uppercase"
                      style={{ fontSize: "clamp(0.9375rem, 1.3vw, 1.25rem)", letterSpacing: "0.02em" }}
                    >
                      {slot.title}
                    </h3>
                    <p
                      className="mt-2 body-copy text-cc-black/75 leading-relaxed"
                      style={{ fontSize: "clamp(0.9375rem, 1.1vw, 1.0625rem)" }}
                    >
                      {slot.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Was es sonst gibt ─────────────────────────────────────────────
            Bricht aus der 920px-Textspalte aus und nutzt die volle Breite,
            damit die drei Punkte auf breiten Schirmen nebeneinander stehen
            statt zusammengedrängt in der Mitte. max-w-[1440px] und die
            Innenabstände sind dieselben wie in der Galerie-Sektion.

            Das Bild hängt am Eintrag (EVENT.details[].image) und steht UNTER
            dem Text, damit die drei Überschriften auf einer Linie bleiben. */}
        <div className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto mt-20 md:mt-32">
          <p
            className="section-name text-cc-black/50"
            style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}
          >
            BISS INS DETAIL
          </p>
          <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-14 gap-y-12">
            {EVENT.details.map((d) => (
              <div key={d.title}>
                <h3
                  className="font-hatton-i"
                  style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
                >
                  {d.title}
                </h3>
                <p
                  className="mt-2 body-copy text-cc-black/75 leading-relaxed"
                  style={{ fontSize: "clamp(0.9375rem, 1.1vw, 1.0625rem)" }}
                >
                  {d.text}
                </p>
                {d.image && (
                  <div className="relative w-full aspect-[3/2] mt-6 overflow-hidden bg-cc-pure">
                    <Image
                      src={d.image.src}
                      alt={d.image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 md:px-10 max-w-[920px] mx-auto">

          {/* ── Ticket-Box ──────────────────────────────────────────────────
              Der eigentliche Kauf. Der Hinweis auf den Widerrufsausschluss
              muss VOR dem Kauf sichtbar sein, deshalb steht er direkt hier
              und nicht nur in den AGB. */}
          <div
            id="tickets"
            className="mt-16 md:mt-24 border border-cc-black/15 scroll-mt-28"
          >
            <div className="p-6 md:p-10">
              <p
                className="section-name text-cc-black/50"
                style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}
              >
                VORVERKAUF
              </p>

              <p
                className="font-hatton mt-3"
                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: "1.1" }}
              >
                {priceLabel}
              </p>

              <p
                className="mt-2 body-copy text-cc-black/60"
                style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }}
              >
                pro Person · limitiert auf {EVENT.presaleCapacity} Tickets · an
                der Abendkasse {doorLabel}
              </p>

              <div className="mt-6">
                <PerkChips />
              </div>

              {/* Drei Zustände: verkaufbar · ausverkauft · noch nicht gestartet */}
              <div className="mt-8">
                <BuyButton ticketsLive={ticketsLive} />
                {EVENT.presaleSoldOut && (
                  <p
                    className="mt-4 body-copy text-cc-black/70"
                    style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }}
                  >
                    An der Abendkasse gibt es weiterhin Tickets für {doorLabel},
                    solange Platz ist. Die{" "}
                    <a
                      href="/gewinnspiel"
                      className="underline underline-offset-2 hover:text-cc-purple"
                    >
                      Grillz-Verlosung
                    </a>{" "}
                    lief nur im Vorverkauf.
                  </p>
                )}
              </div>

              {ticketsLive && (
                <p
                  className="mt-4 body-copy text-cc-black/60"
                  style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }}
                >
                  Der Kauf läuft über PayPal, mit PayPal-Konto oder als Gast
                  per Karte. Du brauchst hier kein Formular auszufüllen: Name
                  und E-Mail kommen automatisch aus der Zahlung.
                </p>
              )}
            </div>

            {/* Pflichthinweise vor dem Kauf */}
            <div className="border-t border-cc-black/10 p-6 md:p-10">
              <ul
                className="space-y-3 body-copy text-cc-black/70"
                style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }}
              >
                <li>
                  <strong className="font-medium text-cc-black">Kein Widerrufsrecht.</strong>{" "}
                  Bei Freizeitveranstaltungen zu einem festen Termin ist das
                  Widerrufsrecht nach § 312g Abs. 2 Nr. 9 BGB ausgeschlossen.
                </li>
                <li>
                  <strong className="font-medium text-cc-black">Dein PayPal-Beleg ist dein Ticket.</strong>{" "}
                  Es gibt kein zusätzliches Ticket per Post oder Mail. Dein Name
                  steht am Einlass auf der Gästeliste, bring den Beleg auf dem
                  Handy mit.
                </li>
                <li>
                  <strong className="font-medium text-cc-black">Name muss übereinstimmen.</strong>{" "}
                  Der Name auf der Zahlung ist der Name auf der Liste. Kaufst du
                  für jemand anderen, schreib mir kurz eine Mail mit dem Namen.
                </li>
                {EVENT.minAge !== null && (
                  <li>
                    <strong className="font-medium text-cc-black">Ab {EVENT.minAge}.</strong>{" "}
                    Ausweis am Einlass bereithalten.
                  </li>
                )}
                <li>
                  <strong className="font-medium text-cc-black">Preise ohne Umsatzsteuer.</strong>{" "}
                  Kleinunternehmerin gemäß § 19 UStG, es wird keine Umsatzsteuer
                  ausgewiesen.
                </li>
                <li>
                  Es gelten die{" "}
                  <a href="/agb" className="underline underline-offset-2 hover:text-cc-purple">
                    AGB
                  </a>{" "}
                  und die{" "}
                  <a href="/gewinnspiel" className="underline underline-offset-2 hover:text-cc-purple">
                    Teilnahmebedingungen der Verlosung
                  </a>
                  . Fragen vorab:{" "}
                  <a
                    href="mailto:choppercouture@gmail.com"
                    className="underline underline-offset-2 hover:text-cc-purple"
                  >
                    choppercouture@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Ausfall / Verlegung, kurz und sichtbar, Details in den AGB */}
          <p
            className="mt-10 body-copy text-cc-black/55"
            style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }}
          >
            Wenn die Expo ausfällt, bekommst du den Ticketpreis vollständig
            zurück. Bei einer Verlegung bleibt dein Ticket gültig; passt der
            neue Termin nicht, erstatte ich dir den Preis ebenfalls.
          </p>
        </div>

      </section>

      <div data-nav-tone="light">
        <Footer />
      </div>
    </>
  );
}
