import SectionHeader from "@/components/SectionHeader";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Datenschutz — Chopper Couture",
  description: "Datenschutzerklärung von Chopper Couture.",
};

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

          <div
            className="mt-16 md:mt-24 space-y-6 body-copy max-w-3xl"
            style={{ fontSize: "clamp(0.9375rem, 1.15vw, 1.125rem)" }}
          >
            <p>
              Diese Website erhebt keine personenbezogenen Daten über Formulare oder Tracker.
              Wenn du mir eine Anfrage per E-Mail schickst, verwende ich deine Angaben ausschließlich
              zur Beantwortung deiner Nachricht.
            </p>
            <p>
              Kontakt bei Fragen zum Datenschutz:{" "}
              <a href="mailto:choppercouture@gmail.com" className="underline underline-offset-2 hover:text-cc-purple">
                choppercouture@gmail.com
              </a>
            </p>
            <p className="text-cc-black/55" style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }}>
              Ausführliche Datenschutzerklärung folgt.
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
