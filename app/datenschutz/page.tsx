import SectionHeader from "@/components/SectionHeader";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung von Chopper Couture · Anika Müggler, Berlin.",
  alternates: { canonical: "/datenschutz" },
};

interface Block {
  title: string;
  body: React.ReactNode;
}

const BLOCKS: Block[] = [
  {
    title: "Verantwortliche",
    body: (
      <>
        Anika Müggler<br />
        Chopper Couture<br />
        Stralauer Allee 17b<br />
        10245 Berlin<br /><br />
        E-Mail:{" "}
        <a
          href="mailto:choppercouture@gmail.com"
          className="underline underline-offset-2 hover:text-cc-purple"
        >
          choppercouture@gmail.com
        </a>
      </>
    ),
  },
  {
    title: "Allgemeines zur Datenverarbeitung",
    body: (
      <>
        Diese Website erhebt keine personenbezogenen Daten über Formulare, Cookies oder
        Tracking-Tools. Es werden kein Google Analytics, kein Facebook Pixel und keine
        vergleichbaren Dienste eingesetzt. Es gibt keinen Newsletter und kein Login.
      </>
    ),
  },
  {
    title: "Hosting",
    body: (
      <>
        Diese Website wird über GitHub Pages (GitHub Inc., 88 Colin P Kelly Jr St,
        San Francisco, CA 94107, USA) gehostet. Beim Aufruf der Seite werden automatisch
        technische Daten (IP-Adresse, Browsertyp, Zeitpunkt des Zugriffs) durch den
        Hosting-Anbieter in Server-Logfiles erfasst. Dies erfolgt auf Grundlage von
        Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigtes Interesse an der
        sicheren Bereitstellung der Website). Die Daten werden nicht mit anderen
        Datenquellen zusammengeführt. Weitere Informationen:{" "}
        <a
          href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-cc-purple break-all"
        >
          GitHub Privacy Statement
        </a>.
      </>
    ),
  },
  {
    title: "Externe Schriften (Adobe Fonts / Typekit)",
    body: (
      <>
        Für die Darstellung von Schriftarten nutzt diese Website Adobe Fonts (Adobe Inc.,
        345 Park Avenue, San Jose, CA 95110, USA). Beim Laden der Seite stellt dein
        Browser eine Verbindung zu Servern von Adobe her, um die Schriftdateien abzurufen.
        Dabei wird deine IP-Adresse an Adobe übermittelt. Die Nutzung erfolgt auf Grundlage
        von Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigtes Interesse an einer
        einheitlichen Darstellung). Weitere Informationen:{" "}
        <a
          href="https://www.adobe.com/de/privacy/policies/adobe-fonts.html"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-cc-purple break-all"
        >
          Adobe Fonts Datenschutz
        </a>.
      </>
    ),
  },
  {
    title: "Kontaktaufnahme per E-Mail",
    body: (
      <>
        Wenn du mir per E-Mail schreibst, werden deine Angaben (Name, E-Mail-Adresse,
        Nachrichteninhalt) ausschließlich zur Bearbeitung deiner Anfrage verwendet.
        Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO (Vertragsanbahnung)
        bzw. Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigtes Interesse an der
        Beantwortung). Die Daten werden gelöscht, sobald sie für den Zweck ihrer
        Erhebung nicht mehr erforderlich sind, spätestens nach Ablauf gesetzlicher
        Aufbewahrungsfristen.
      </>
    ),
  },
  {
    title: "Externe Links",
    body: (
      <>
        Diese Website enthält Links zu externen Seiten (z.&nbsp;B. Instagram, Schütz
        Fräszentrum). Für die Inhalte und Datenschutzpraktiken dieser Seiten übernehme
        ich keine Verantwortung.
      </>
    ),
  },
  {
    title: "Deine Rechte",
    body: (
      <>
        Du hast das Recht auf Auskunft (Art.&nbsp;15 DSGVO), Berichtigung (Art.&nbsp;16),
        Löschung (Art.&nbsp;17), Einschränkung der Verarbeitung (Art.&nbsp;18),
        Datenübertragbarkeit (Art.&nbsp;20) und Widerspruch (Art.&nbsp;21). Zur Ausübung
        deiner Rechte genügt eine E-Mail an{" "}
        <a
          href="mailto:choppercouture@gmail.com"
          className="underline underline-offset-2 hover:text-cc-purple"
        >
          choppercouture@gmail.com
        </a>
        . Darüber hinaus steht dir ein Beschwerderecht bei der zuständigen
        Aufsichtsbehörde zu (Berliner Beauftragte für Datenschutz und Informationsfreiheit).
      </>
    ),
  },
  {
    title: "Aktualität",
    body: "Stand: August 2026. Ich behalte mir vor, diese Datenschutzerklärung bei Bedarf anzupassen.",
  },
];

export default function DatenschutzPage() {
  return (
    <>
      <section
        data-nav-tone="dark"
        className="bg-cc-offwhite text-cc-black"
        style={{
          paddingTop: "clamp(7rem, 12vw, 11rem)",
          paddingBottom: "clamp(6rem, 10vw, 9.375rem)",
        }}
      >
        <div className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
          <SectionHeader number="09" name="DATENSCHUTZ" tone="dark" />

          <h1
            className="headline-lg mt-8 md:mt-10"
            style={{ fontSize: "clamp(2.5rem, 9.2vw, 8.25rem)" }}
          >
            Datenschutz.
          </h1>

          <div className="grid md:grid-cols-2 gap-x-10 md:gap-x-16 lg:gap-x-24 gap-y-12 md:gap-y-16 mt-20 md:mt-28">
            {BLOCKS.map((b) => (
              <div key={b.title}>
                <h2
                  className="section-name text-cc-black/50 mb-3"
                  style={{ fontSize: "clamp(0.6875rem, 0.9vw, 0.8125rem)" }}
                >
                  {b.title}
                </h2>
                <div
                  className="body-copy text-cc-black leading-relaxed"
                  style={{ fontSize: "clamp(0.9375rem, 1.15vw, 1.125rem)" }}
                >
                  {b.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div data-nav-tone="light">
        <Footer />
      </div>
    </>
  );
}
