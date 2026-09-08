import SectionHeader from "@/components/SectionHeader";
import Footer from "@/components/Footer";

export const metadata = {
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen von Chopper Couture.",
  alternates: { canonical: "/agb" },
};

export default function AgbPage() {
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
          <SectionHeader number="10" name="AGB" tone="dark" />

          <h1
            className="headline-lg mt-8 md:mt-10"
            style={{ fontSize: "clamp(2.5rem, 9.2vw, 8.25rem)" }}
          >
            AGB.
          </h1>

          <div
            className="mt-16 md:mt-24 space-y-6 body-copy max-w-3xl"
            style={{ fontSize: "clamp(0.9375rem, 1.15vw, 1.125rem)" }}
          >
            <p>
              Jedes Stück wird individuell nach Auftrag gefertigt. Nach schriftlicher Bestätigung
              deiner Bestellung wird eine Anzahlung fällig; der Restbetrag bei Übergabe.
            </p>
            <p>
              Da es sich um maßangefertigte Einzelanfertigungen handelt, ist ein Widerruf gemäß
              § 312g Abs. 2 Nr. 1 BGB ausgeschlossen.
            </p>
            <h2
              className="font-wide font-bold uppercase pt-6"
              style={{ fontSize: "clamp(0.9375rem, 1.3vw, 1.25rem)", letterSpacing: "0.02em" }}
            >
              Event-Tickets
            </h2>
            <p>
              Tickets für Veranstaltungen werden im Vorverkauf über PayPal verkauft. Der Vertrag
              kommt mit dem Abschluss der Zahlung zustande. Der PayPal-Beleg gilt als Ticket; ein
              gesondertes Ticket wird nicht versendet. Der Einlass erfolgt über eine Gästeliste
              anhand des Namens, der bei der Zahlung hinterlegt ist.
            </p>
            <p>
              Bei Veranstaltungen zu einem festen Termin ist das Widerrufsrecht gemäß
              § 312g Abs. 2 Nr. 9 BGB ausgeschlossen.
            </p>
            <p>
              Fällt eine Veranstaltung aus, wird der Ticketpreis vollständig erstattet. Wird sie
              verlegt, behält das Ticket seine Gültigkeit; ist der neue Termin nicht möglich, wird
              der Ticketpreis ebenfalls erstattet. Weitergehende Ansprüche — etwa auf Anfahrt- oder
              Übernachtungskosten — bestehen nicht.
            </p>
            <p>
              Tickets sind übertragbar. Bitte teile mir den abweichenden Namen vorab per E-Mail mit,
              damit er auf der Gästeliste steht. Vor Ort gelten das Hausrecht der Veranstaltungsstätte
              sowie ein etwaiges Mindestalter, das auf der Event-Seite angegeben ist.
            </p>

            <p>
              Fragen dazu?{" "}
              <a href="mailto:choppercouture@gmail.com" className="underline underline-offset-2 hover:text-cc-purple">
                choppercouture@gmail.com
              </a>
            </p>
            <p className="text-cc-black/55" style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }}>
              Ausführliche AGB folgen.
            </p>
          </div>
        </div>
      </section>
      <div data-nav-tone="light">
        <Footer />
      </div>
    </>
  );
}
