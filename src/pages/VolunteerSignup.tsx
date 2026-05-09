import { useEffect } from "react";
import { Link } from "react-router-dom";
import VolunteerForm from "@/components/VolunteerForm";
import LogoMark from "@/components/LogoMark";

const VolunteerSignup = () => {
  useEffect(() => {
    document.title = "Volunteer Sign-Up — Worship in the Park";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Slim top bar — wordmark only, no nav */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 py-4 flex items-center gap-3">
          <Link to="/" className="group inline-flex items-center gap-2.5">
            <LogoMark size={22} variant="default" />
            <span
              className="font-serif text-base sm:text-lg font-light tracking-tight text-foreground"
              style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
            >
              Worship in the Park
            </span>
          </Link>
        </div>
      </header>

      {/* Hero — compact */}
      <section className="px-5 sm:px-6 pt-10 pb-6 sm:pt-14 sm:pb-8">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <p
            className="font-sans text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
            style={{ fontFeatureSettings: '"cv02"' }}
          >
            August 8, 2026 · Mitford Park, Cochrane
          </p>
          <h1
            className="font-serif text-4xl sm:text-5xl font-light tracking-tight leading-[1.05] text-foreground"
            style={{ fontFeatureSettings: '"liga" 1, "dlig" 1', textWrap: "balance" as never }}
          >
            Volunteer with us
          </h1>
          <p className="text-base sm:text-lg text-foreground/75 max-w-md mx-auto leading-relaxed">
            Five short steps, about three minutes. We'll be in touch within a week.
          </p>
        </div>
      </section>

      {/* Form */}
      <main id="main-content" className="flex-1 px-5 sm:px-6 pb-12">
        <div className="max-w-xl mx-auto border border-border/40 bg-card/50 p-5 sm:p-7 min-h-[560px] flex">
          <div className="w-full flex flex-col">
            <VolunteerForm compact inlinePartner />
          </div>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-border/40 px-5 sm:px-6 py-6">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs text-muted-foreground">
            Questions?{" "}
            <a
              href="mailto:mitfordworship@gmail.com"
              className="text-foreground underline-offset-4 hover:underline"
            >
              mitfordworship@gmail.com
            </a>
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontFeatureSettings: '"cv02"' }}
          >
            <LogoMark size={14} variant="mono" />
            mitfordworship.com
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default VolunteerSignup;
