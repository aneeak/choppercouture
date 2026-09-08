import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import Footer from "@/components/Footer";

/**
 * Event-Seite — Ticketverkauf über PayPal
 * ---------------------------------------
 * Die Seite ist statisch (output: "export"), es gibt also keinen Server, der
 * Zahlungen prüfen oder Kontingente zählen könnte. Deshalb liegt die Kasse
 * komplett bei PayPal: Der Button verlinkt auf einen PayPal-Zahlungslink,
 * PayPal kassiert und liefert Name + E-Mail des Käufers mit. Kein eigenes
 * Formular, keine Drittanbieter-Skripte auf der Seite (= kein Consent-Banner).
 *
 * ALLES, was gepflegt werden muss, steht unten im EVENT-Objekt.
 */

// ────────────────────────────────────────────────────────────────────────────
//  HIER PFLEGEN — sonst nichts anfassen.
// ────────────────────────────────────────────────────────────────────────────
const EVENT = {
  /** Titel des Events. */
  name: "Dental Jewelry Expo",

  /** Teaser im Ton des Konzept-Decks: kurze Sätze, kein Füllwort. */
  teaser:
    "Die Artists gibt es. Die Kundschaft auch. Nur den Ort, an dem alles " +
    "zusammenkommt, gab es bisher nicht.",

  /**
   * Programmpunkte. BEWUSST ohne Ausstellernamen — die stehen noch nicht
   * fest. Namen erst eintragen, wenn sie zugesagt haben.
   */
  lineup: [
    "Grillz",
    "Toothgems",
    "Live Act",
    "Secret Act",
    "Pop-up Store",
  ],

  /** Anzeigetext für Datum + Uhrzeit. */
  dateLabel: "Samstag, 24. Oktober 2026",
  doorsLabel: "14:00–03:00 Uhr",

  /** Der Ort, im Ton des Decks. */
  venueText:
    "Ein Bunker aus den Vierzigern am Hohenzollerndamm. Beton, Stahl, harte " +
    "Kanten. 600 m², acht Räume, eine Bühne, zwei Bars — und Galerielicht, in " +
    "dem Chrom und Steine funkeln.",

  /** Der Ablauf. Zeiten und Inhalte aus dem Konzept. */
  schedule: [
    {
      time: "14:00",
      title: "Opening",
      text: "Türen auf, Welcome Drinks, die Ausstellung öffnet. Ab jetzt laufen die ersten Slots.",
    },
    {
      time: "14:00–21:00",
      title: "Peak",
      text: "Hands on: Abdrücke nehmen, Tooth Gems setzen, Beratung. Bar und Snacks durchgehend, Fotostation, Musik den ganzen Tag.",
    },
    {
      time: "21:00–03:00",
      title: "Stage",
      text: "Live Act, DJ-Sets, die Grillz-Verlosung und Afterparty bis drei. Gehen oder bleiben, beides geht.",
    },
  ],

  /** Was es sonst noch gibt. */
  details: [
    {
      title: "DIY Space",
      text: "Gems zum Selbstaufkleben — auf deine Membranbox, dein Feuerzeug, dein Handy. Was du dabeihast, kann funkeln.",
    },
    {
      title: "Fotobooth",
      text: "Frisch gesetzte Steine wollen gesehen werden. Station läuft den ganzen Tag.",
    },
    {
      title: "Stainless Menu",
      text: "Snacks und Drinks in hellen Farben. Nichts, was frische Gems verfärbt — wer sich mittags etwas machen lässt, kann abends trotzdem essen und trinken.",
    },
    {
      title: "Der Look",
      text: "Deko, Licht und Bar folgen derselben Logik: hell, clean, reduziert. Im Mittelpunkt stehen die Arbeiten.",
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
   * dann "Vorverkauf ausverkauft" und weist auf die Abendkasse hin — NICHT
   * "ausverkauft", denn an der Tür geht ja weiter was.
   */
  presaleSoldOut: false,

  /**
   * Auf true stellen, wenn Datum, Adresse und Preis final eingetragen sind.
   * Schaltet die strukturierten Daten für Google frei — vorher bewusst aus,
   * damit Google keine Platzhalter-Daten indexiert.
   */
  published: true,

  /** ISO-Start/Ende, nur für die strukturierten Daten.
      +02:00, weil die Sommerzeit erst am 25.10.2026 endet. */
  startIso: "2026-10-24T14:00:00+02:00",
  // In dieser Nacht endet die Sommerzeit (25.10., 03:00 CEST → 02:00 CET).
  // Das Ende um 03:00 liegt also bereits in der Winterzeit: +01:00.
  endIso: "2026-10-25T03:00:00+01:00",
};
// ────────────────────────────────────────────────────────────────────────────

const SITE = "https://choppercouture.ch";

export const metadata = {
  title: `${EVENT.name} — Tickets`,
  description: `${EVENT.name} im ${EVENT.venue}. Tickets im Vorverkauf — Grillz und Dental Jewelry von Chopper Couture.`,
  alternates: { canonical: "/event" },
  openGraph: {
    title: `${EVENT.name} | Chopper Couture`,
    description: `${EVENT.name} im ${EVENT.venue}. Tickets im Vorverkauf.`,
    url: `${SITE}/event`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

/** Preise als "13 €" — oder "—" solange nichts gepflegt ist. */
const euro = (n: number) => `${n.toLocaleString("de-DE")} €`;
const priceLabel = EVENT.price > 0 ? euro(EVENT.price) : "—";
const doorLabel = EVENT.priceDoor > 0 ? euro(EVENT.priceDoor) : "—";

/**
 * Event-Schema für Google. Wird nur ausgegeben, wenn published: true —
 * unvollständige oder erfundene Event-Daten schaden dem Ranking mehr als
 * gar keine.
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
  image: `${SITE}/og-image.jpg`,
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
 * Der Kauf-Button in seinen drei Zuständen. Steht zweimal auf der Seite —
 * oben als schneller Einstieg, unten in der Ticket-Box — deshalb hier
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
          paddingTop: "clamp(7rem, 12vw, 11rem)",
          paddingBottom: "clamp(6rem, 10vw, 9.375rem)",
        }}
      >
        <div className="px-6 md:px-10 max-w-[920px] mx-auto">
          <SectionHeader number="11" name="EVENT" tone="dark" />

          <h1
            className="headline-lg mt-8 md:mt-10"
            style={{ fontSize: "clamp(2.5rem, 9.2vw, 8.25rem)" }}
          >
            Dental
            <br />
            <span
              className="inline-block"
              style={{ paddingLeft: "clamp(3.5rem, 14.6vw, 13.125rem)" }}
            >
              Jewelry.
            </span>
          </h1>

          <p
            className="subline mt-6 md:mt-8"
            style={{ fontSize: "clamp(1.125rem, 2.1vw, 1.875rem)" }}
          >
            {EVENT.teaser}
          </p>

          {/* Primärer Kauf-Einstieg — bewusst hier oben, damit niemand zum
              Kaufen erst am Plakat vorbeiscrollen muss. Die ausführliche
              Ticket-Box mit allen Pflichthinweisen steht weiter unten. */}
          <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
            <BuyButton ticketsLive={ticketsLive} />
            <p className="font-hatton" style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)" }}>
              {priceLabel}{" "}
              <span className="text-cc-black/50">
                Vorverkauf · inkl. 2 Welcome Drinks
              </span>
            </p>
          </div>

          <p
            className="mt-4 body-copy text-cc-black/55"
            style={{ fontSize: "clamp(0.8125rem, 0.95vw, 0.9375rem)" }}
          >
            Kein Widerrufsrecht bei Veranstaltungen mit festem Termin
            (§ 312g Abs. 2 Nr. 9 BGB).{" "}
            <a href="#tickets" className="underline underline-offset-2 hover:text-cc-purple">
              Alle Ticket-Infos
            </a>
          </p>
          {/* Der stärkste Kaufgrund, deshalb ganz nach oben und in Violett. */}
          <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-7 md:gap-10 items-center">
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-cc-pure">
              <Image
                src="/images/event/grillz-gewinnen.webp"
                alt="Grillz von Chopper Couture, getragen"
                fill
                sizes="(max-width: 768px) 100vw, 280px"
                className="object-cover"
              />
            </div>

            <div className="border-l-4 border-cc-purple pl-5 md:pl-7">
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
                Gewinne Grillz über vier Zähne.
              </p>
              <p
                className="mt-3 body-copy text-cc-black/70"
                style={{ fontSize: "clamp(0.9375rem, 1.15vw, 1.125rem)" }}
              >
                Jedes Vorverkaufs-Ticket ist ein Los. Du kannst Custom gefertigte
                Grillz gewinnen, in deinem Wunsch-Design. Der Vorverkauf ist auf{" "}
                {EVENT.presaleCapacity} Tickets limitiert.
              </p>
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

        {/* ── Plakat ────────────────────────────────────────────────────────
            Randlos wie die Preview in der GallerySection: 4:5 auf Mobile,
            16:9 auf Desktop. Das Plakat sitzt mittig im Motiv, der Crop
            schneidet nur Wand weg. */}
        <div className="relative w-full mt-16 md:mt-24 bg-cc-pure overflow-hidden aspect-[4/5] md:aspect-[16/9]">
          <Image
            src="/images/event/plakat-mockup.webp"
            alt={`Plakat — ${EVENT.name} im ${EVENT.venue}`}
            fill
            sizes="100vw"
            className="object-cover"
            /* Sitzt auf hohen Fenstern bereits über der Falz — eager laden. */
            priority
          />
        </div>

        <div className="px-6 md:px-10 max-w-[920px] mx-auto">
          {/* Fakten — Datum, Einlass, Ort, Preis */}
          <div className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
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

          {/* ── Was es sonst gibt ───────────────────────────────────────── */}
          <div className="mt-20 md:mt-32">
            <p
              className="section-name text-cc-black/50"
              style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}
            >
              BISS INS DETAIL
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
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
                </div>
              ))}
            </div>
          </div>

          {/* ── Ticket-Box ──────────────────────────────────────────────────
              Der eigentliche Kauf. Der Hinweis auf den Widerrufsausschluss
              muss VOR dem Kauf sichtbar sein — deshalb steht er direkt hier
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
                pro Person · inkl. 2 Welcome Drinks · limitiert auf{" "}
                {EVENT.presaleCapacity} Tickets · an der Abendkasse {doorLabel}
              </p>

              {/* Der Grund, im Vorverkauf zu kaufen — deshalb hervorgehoben. */}
              <p
                className="mt-6 border-l-2 border-cc-purple pl-4 body-copy"
                style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }}
              >
                <strong className="font-medium">Grillz gewinnen gibt es nur im Vorverkauf.</strong>{" "}
                Dein Los bekommst du am Einlass, gezogen wird am Abend vor Ort —
                du musst also da sein. Tickets an der Abendkasse nehmen an der
                Verlosung nicht teil. Es gelten die{" "}
                <a
                  href="/gewinnspiel"
                  className="underline underline-offset-2 hover:text-cc-purple"
                >
                  Teilnahmebedingungen
                </a>
                .
              </p>

              {/* Drei Zustände: verkaufbar · ausverkauft · noch nicht gestartet */}
              <div className="mt-8">
                <BuyButton ticketsLive={ticketsLive} />
                {EVENT.presaleSoldOut && (
                  <p
                    className="mt-4 body-copy text-cc-black/70"
                    style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }}
                  >
                    An der Abendkasse gibt es weiterhin Tickets für {doorLabel} —
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
                  Der Kauf läuft über PayPal — mit PayPal-Konto oder als Gast
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
                  steht am Einlass auf der Gästeliste — bring den Beleg auf dem
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

          {/* Ausfall / Verlegung — kurz und sichtbar, Details in den AGB */}
          <p
            className="mt-10 body-copy text-cc-black/55"
            style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }}
          >
            Wenn das Event ausfällt, bekommst du den Ticketpreis vollständig
            zurück. Bei einer Verlegung bleibt dein Ticket gültig; passt der
            neue Termin nicht, erstatte ich dir den Preis ebenfalls.
          </p>
        </div>

        {/* ── Location ──────────────────────────────────────────────────────
            Bunker West über die volle Breite als Abschlussbild. svh statt vh,
            damit die ein- und ausfahrende Browserleiste auf iOS die Höhe nicht
            springen lässt. Bewusst kein priority: das Bild steht ganz unten,
            lazy ist hier richtig. */}
        <div className="relative w-full mt-16 md:mt-24 bg-cc-pure overflow-hidden">
          <Image
            src="/images/event/bunker-west.webp"
            alt={`${EVENT.venue}, ${EVENT.address}`}
            width={1600}
            height={1068}
            sizes="100vw"
            className="w-full h-[70svh] md:h-[90svh] object-cover"
          />
        </div>
      </section>

      <div data-nav-tone="light">
        <Footer />
      </div>
    </>
  );
}
