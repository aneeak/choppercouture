import SectionHeader from "@/components/SectionHeader";
import Footer from "@/components/Footer";

/**
 * Teilnahmebedingungen — Grillz-Verlosung zur Dental Jewelry Expo
 * ---------------------------------------------------------------
 * Wird von der Event-Seite aus verlinkt. Die Verlosung wird dort als
 * Kaufargument beworben, deshalb müssen die Bedingungen vor dem Kauf
 * erreichbar sein.
 *
 * Die vier Punkte, die inhaltlich noch festgelegt werden müssen, stehen
 * gesammelt im RAFFLE-Objekt.
 */

// ────────────────────────────────────────────────────────────────────────────
//  HIER PFLEGEN
// ────────────────────────────────────────────────────────────────────────────
const RAFFLE = {
  /** Wie viele Gewinner es gibt. */
  winners: 1,

  /**
   * Was genau gewonnen wird. So konkret wie möglich formulieren — daran
   * wird die Zusage gemessen.
   */
  prize:
    "ein Custom-Grillz-Design über vier Zähne, gefertigt von Chopper Couture " +
    "nach Maß aus biokompatibler CoCr-Legierung",

  /** Wann gezogen wird. */
  drawLabel: "nach dem Ende des Vorverkaufs",

  /** Frist, in der sich die gewinnende Person melden muss. */
  claimDays: 14,

  /** Bis wann ein Ticket gekauft sein muss, um teilzunehmen. */
  deadlineLabel: "bis zum Ende des Vorverkaufs am 24. Oktober 2026",
};
// ────────────────────────────────────────────────────────────────────────────

export const metadata = {
  title: "Teilnahmebedingungen — Grillz-Verlosung",
  description:
    "Teilnahmebedingungen der Grillz-Verlosung unter allen Vorverkaufs-Tickets der Dental Jewelry Expo im Bunker West Berlin.",
  alternates: { canonical: "/gewinnspiel" },
  robots: { index: false, follow: true },
};

interface Clause {
  title: string;
  body: React.ReactNode;
}

const CLAUSES: Clause[] = [
  {
    title: "1. Veranstalterin",
    body: (
      <>
        Anika Müggler, Chopper Couture, Stralauer Allee 17&nbsp;b, 10245 Berlin.
        Kontakt:{" "}
        <a
          href="mailto:choppercouture@gmail.com"
          className="underline underline-offset-2 hover:text-cc-purple"
        >
          choppercouture@gmail.com
        </a>
        . Die Verlosung steht in keinerlei Verbindung zu Instagram, Meta oder
        einer anderen Plattform, über die sie beworben wird. Diese Plattformen
        stehen als Ansprechpartner nicht zur Verfügung.
      </>
    ),
  },
  {
    title: "2. Teilnahme",
    body: (
      <>
        Teilnahmeberechtigt ist, wer {RAFFLE.deadlineLabel}{" "}
        ein Vorverkaufs-Ticket für die Dental Jewelry Expo am
        24.&nbsp;Oktober 2026 im Bunker West
        erwirbt. Jedes gekaufte Vorverkaufs-Ticket ergibt ein Los; wer mehrere
        Tickets kauft, nimmt entsprechend mehrfach teil. Eine gesonderte Anmeldung
        ist nicht nötig — der Kauf ist die Teilnahme.
        <br />
        <br />
        Die Teilnahme erfolgt automatisch mit dem Kauf — du musst dich nirgends
        anmelden und nicht bei der Veranstaltung anwesend sein. Maßgeblich ist
        die Person, die das Ticket bezahlt hat: Wer mehrere Tickets kauft und
        weitergibt, bleibt selbst Teilnehmerin oder Teilnehmer der Verlosung,
        weil die Zuordnung über die Zahlung läuft.
        <br />
        <br />
        Tickets, die an der Abendkasse gekauft werden, nehmen an der Verlosung
        <strong className="font-medium"> nicht</strong> teil. Eine Teilnahme ohne
        Ticketkauf ist nicht vorgesehen.
        <br />
        <br />
        Minderjährige dürfen teilnehmen; für die Annahme des Gewinns ist die
        Zustimmung einer erziehungsberechtigten Person erforderlich.
        Ausgeschlossen sind Personen, die an der Organisation der Veranstaltung
        oder der Verlosung mitwirken, sowie deren Angehörige.
      </>
    ),
  },
  {
    title: "3. Gewinn",
    body: (
      <>
        Verlost {RAFFLE.winners === 1 ? "wird" : "werden"} {RAFFLE.winners === 1 ? "" : `${RAFFLE.winners}× `}
        {RAFFLE.prize}.
        <br />
        <br />
        Der Gewinn setzt einen persönlichen Termin zur Abdrucknahme in Berlin
        voraus; die Anreise dorthin ist nicht Teil des Gewinns. Design und
        Umsetzung werden gemeinsam abgestimmt. Die Fertigung dauert erfahrungs&shy;gemäß
        bis zu einem Monat ab Abdrucknahme.
        <br />
        <br />
        Aus zahnmedizinischen Gründen kann der Gewinn nicht eingelöst werden,
        solange eine kieferorthopädische Behandlung läuft oder geplant ist oder
        eine Erkrankung im Mund- oder Zahnfleischbereich vorliegt. Lässt sich der
        Gewinn aus einem solchen Grund nicht umsetzen, kann er auf eine andere
        Person übertragen oder in Absprache in eine gleichwertige Arbeit aus dem
        Sortiment getauscht werden.
      </>
    ),
  },
  {
    title: "4. Ziehung und Benachrichtigung",
    body: (
      <>
        Die Ziehung erfolgt {RAFFLE.drawLabel} unter allen Vorverkaufs-Tickets
        nach dem Zufallsprinzip. Eine Ziehung vor Ort findet nicht statt.
        <br />
        <br />
        Die Gewinnerin oder der Gewinner wird per E-Mail benachrichtigt, und
        zwar an die Adresse, die bei der Ticketzahlung hinterlegt war. Erfolgt
        innerhalb von {RAFFLE.claimDays}&nbsp;Tagen nach der Benachrichtigung
        keine Rückmeldung, verfällt der Anspruch und der Gewinn wird neu
        ausgelost. Der Rechtsweg ist ausgeschlossen.
      </>
    ),
  },
  {
    title: "5. Keine Barauszahlung",
    body: "Der Gewinn wird nicht in bar ausgezahlt und nicht in anderer Form ersetzt. Ein Umtausch ist nicht möglich. Etwaige Steuern auf den Gewinn trägt die gewinnende Person.",
  },
  {
    title: "6. Vorzeitige Beendigung",
    body: "Ich behalte mir vor, die Verlosung ganz oder teilweise abzubrechen oder zu ändern, wenn ein ordnungsgemäßer Ablauf aus technischen oder rechtlichen Gründen nicht gewährleistet werden kann. Fällt die Veranstaltung aus, entfällt auch die Verlosung; der Ticketpreis wird in diesem Fall erstattet.",
  },
  {
    title: "7. Datenschutz",
    body: (
      <>
        Für die Verlosung verwende ich ausschließlich die Daten, die mir PayPal
        mit der Ticketzahlung übermittelt: Vor- und Nachname sowie E-Mail-Adresse.
        Sie dienen allein der Durchführung der Verlosung, der Benachrichtigung
        und dem Abgleich am Einlass. Rechtsgrundlage ist
        Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO. Eine Weitergabe an Dritte
        findet nicht statt. Die Daten werden nach Abschluss der Verlosung
        gelöscht, soweit keine gesetzlichen Aufbewahrungsfristen entgegenstehen.
        Näheres in der{" "}
        <a href="/datenschutz" className="underline underline-offset-2 hover:text-cc-purple">
          Datenschutzerklärung
        </a>
        .
      </>
    ),
  },
  {
    title: "8. Anwendbares Recht",
    body: "Es gilt das Recht der Bundesrepublik Deutschland.",
  },
];

export default function GewinnspielPage() {
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
          <SectionHeader number="12" name="VERLOSUNG" tone="dark" />

          <h1
            className="headline-lg mt-8 md:mt-10"
            style={{ fontSize: "clamp(2.5rem, 9.2vw, 8.25rem)" }}
          >
            Teilnahme&shy;
            <br />
            <span
              className="inline-block"
              style={{ paddingLeft: "clamp(3.5rem, 14.6vw, 13.125rem)" }}
            >
              bedingungen.
            </span>
          </h1>

          <p
            className="subline mt-6 md:mt-8 max-w-[720px]"
            style={{ fontSize: "clamp(1.125rem, 2.1vw, 1.875rem)" }}
          >
            Grillz-Verlosung unter allen Vorverkaufs-Tickets der Dental Jewelry
            Expo.
          </p>

          <div className="mt-16 md:mt-24 max-w-[820px]">
            {CLAUSES.map((c, i) => (
              <div
                key={c.title}
                className={`py-8 md:py-10 ${i < CLAUSES.length - 1 ? "border-b border-cc-black/10" : ""}`}
              >
                <h2
                  className="font-wide font-bold uppercase"
                  style={{
                    fontSize: "clamp(0.9375rem, 1.3vw, 1.25rem)",
                    letterSpacing: "0.02em",
                    lineHeight: "1.4",
                  }}
                >
                  {c.title}
                </h2>
                <div
                  className="mt-3 md:mt-4 body-copy text-cc-black/80 leading-relaxed"
                  style={{ fontSize: "clamp(0.9375rem, 1.15vw, 1.125rem)" }}
                >
                  {c.body}
                </div>
              </div>
            ))}
          </div>

          <p
            className="mt-12 body-copy text-cc-black/55"
            style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }}
          >
            Zurück zum{" "}
            <a href="/event" className="underline underline-offset-2 hover:text-cc-purple">
              Event
            </a>
            .
          </p>
        </div>
      </section>

      <div data-nav-tone="light">
        <Footer />
      </div>
    </>
  );
}
