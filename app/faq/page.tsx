import SectionHeader from "@/components/SectionHeader";
import Footer from "@/components/Footer";

export const metadata = {
  title: "FAQ — Häufige Fragen zu Grillz & Zahnschmuck",
  description:
    "Häufig gestellte Fragen zu Custom Grillz und Dental Jewelry von Chopper Couture Berlin. Material, Ablauf, Preise, Pflege und mehr.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ — Häufige Fragen | Chopper Couture",
    description:
      "Alles was du über Custom Grillz wissen musst: Material, Ablauf, Preise, Pflege. Chopper Couture Berlin.",
    url: "https://choppercouture.ch/faq",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

interface FaqItem {
  q: string;
  a: React.ReactNode;
}

const FAQS: FaqItem[] = [
  {
    q: "Was sind Grillz?",
    a: "Grillz sind Zahnschmuck aus Metalllegierung, der über die Zähne gesteckt wird. Er rastet durch den Unterschnitt des Zahnäquators ein und hält so fest im Mund — kann aber jederzeit wieder herausgenommen werden.",
  },
  {
    q: "Tun Grillz weh?",
    a: "Nein. Die Abdrucknahme ist die gleiche wie beim Zahnarzt — manchmal etwas unangenehm, aber die meisten haben damit keine Probleme. Das Tragen selbst ist schmerzfrei.",
  },
  {
    q: "Sind Grillz sicher für die Zähne?",
    a: (
      <>
        Ja. Da sie individuell und unter höchsten zahntechnischen Standards auf
        Mikrometer genau gefertigt werden, schaden sie dem Zahnschmelz nicht.
        Wichtig: Grillz sollten nur zu speziellen Anlässen getragen werden —
        nicht täglich, maximal 2&nbsp;Stunden am Stück, 2–3&nbsp;Mal die Woche.
        Bei übermäßigem Tragen kann es durch die Bisserhöhung zu Kopfschmerzen
        kommen, da Kieferposition und Biss beeinflusst werden können.
      </>
    ),
  },
  {
    q: "Kann jeder Grillz tragen?",
    a: (
      <>
        Grundsätzlich ja — mit wenigen Ausnahmen: Wenn du in einer laufenden
        kieferorthopädischen Behandlung bist oder eine geplant ist, können die
        Grillz danach nicht mehr passen. Bei Retainern im Frontzahnbereich wird
        es schwierig. Außerdem fertige ich keine Grillz bei Erkrankungen im
        Mundbereich oder des Zahnfleisches, wie z.&nbsp;B. Gingivitis.
      </>
    ),
  },
  {
    q: "Wie läuft eine Bestellung ab?",
    a: (
      <>
        Du kontaktierst mich über{" "}
        <a
          href="https://instagram.com/choppercouture"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-cc-purple"
        >
          Instagram
        </a>
        , die Website oder per{" "}
        <a
          href="mailto:choppercouture@gmail.com"
          className="underline underline-offset-2 hover:text-cc-purple"
        >
          E-Mail
        </a>
        . Wir besprechen dein Design, du füllst ein Formular aus mit deinen
        Daten und deiner Design-Skizze. Dann machen wir einen Termin für die
        Abdrucknahme. Ich designe den Grillz in 3D und sende ihn dir zum
        Feedback — Anpassungen sind möglich. Danach arbeite ich das Piece aus
        und bei der persönlichen Übergabe passen wir es optimal an.
      </>
    ),
  },
  {
    q: "Wie lange dauert es bis mein Grillz fertig ist?",
    a: "Von Abdruck bis zum fertigen Piece dauert es bis zu einem Monat.",
  },
  {
    q: "Muss ich persönlich nach Berlin kommen?",
    a: "Für die Abdrucknahme ja. Der fertige Grillz kann aber auch versendet werden — die Versandkosten trägt in dem Fall der Kunde.",
  },
  {
    q: "Aus welchem Material sind die Grillz?",
    a: "Chopper Couture arbeitet mit biokompatibler CoCr-Legierung (Cobalt-Chrom). Die Fertigung erfolgt im selektiven Laserschmelzverfahren (SLM) auf speziellen zahntechnischen Maschinen — das gleiche Verfahren wie in der professionellen Zahnmedizin.",
  },
  {
    q: "Warum kein Gold oder Silber?",
    a: "Silber kann Allergien auslösen. Meine Maschinen sind spezialisierte zahntechnische Geräte, die aktuell nur mit CoCr-Legierung arbeiten. Ich bin aber dabei, Lösungen für goldene Grillz zu entwickeln — zum Beispiel über Galvanisierung.",
  },
  {
    q: "Wie pflege ich meine Grillz?",
    a: "Immer vor dem Essen, Trinken und Alkoholkonsum herausnehmen. Nach dem Tragen unter Wasser abspülen und an der Luft trocknen lassen. Danach trocken im Case verstauen — so vermeidest du Verbiegung oder Verformung.",
  },
  {
    q: "Was kosten Custom Grillz?",
    a: "Zwischen 200 und 2.500 Euro — je nach Design, Zahnanzahl und gewünschten Details. Kontaktiere mich für ein individuelles Angebot.",
  },
  {
    q: "Gibt es fertige Designs oder nur Custom?",
    a: "Ich habe verschiedene Styles zur Auswahl, mache aber auch komplett individuelle Designs nach deinen Wünschen.",
  },
];

export default function FaqPage() {
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
          <SectionHeader number="10" name="FAQ" tone="dark" />

          <h1
            className="headline-lg mt-8 md:mt-10"
            style={{ fontSize: "clamp(2.5rem, 9.2vw, 8.25rem)" }}
          >
            Häufige
            <br />
            <span
              className="inline-block"
              style={{ paddingLeft: "clamp(3.5rem, 14.6vw, 13.125rem)" }}
            >
              Fragen.
            </span>
          </h1>

          <div className="mt-20 md:mt-28 max-w-[900px]">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`py-8 md:py-10 ${i < FAQS.length - 1 ? "border-b border-cc-black/10" : ""}`}
              >
                <h2
                  className="font-wide font-bold uppercase"
                  style={{
                    fontSize: "clamp(0.9375rem, 1.3vw, 1.25rem)",
                    letterSpacing: "0.02em",
                    lineHeight: "1.4",
                  }}
                >
                  {faq.q}
                </h2>
                <div
                  className="mt-3 md:mt-4 body-copy text-cc-black/80 leading-relaxed"
                  style={{ fontSize: "clamp(0.9375rem, 1.15vw, 1.125rem)" }}
                >
                  {faq.a}
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
