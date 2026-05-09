import { useEffect } from "react";
import PageShell from "@/components/fly4media/PageShell";
import HeroMedia from "@/components/fly4media/HeroMedia";
import ProcessList from "@/components/fly4media/ProcessList";
import Capabilities from "@/components/fly4media/Capabilities";
import CTA from "@/components/fly4media/CTA";
import { useReveal } from "@/components/fly4media/useReveal";
import about from "@/assets/about-hero.jpg";

export default function About() {
  useEffect(() => {
    document.title = "About — Fly4MEdia";
  }, []);

  return (
    <PageShell>
      {({ openContact }: { openContact: () => void }) => (
        <>
          {/* Minimal hero */}
          <section className="relative min-h-[80dvh] md:min-h-[100dvh] w-full overflow-hidden bg-secondary">
            <HeroMedia
              image={about}
              alt="Drone pilot silhouette on alpine ridge at dawn"
              priority
              width={1620}
              height={1080}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/15 to-transparent"
              aria-hidden
            />
            <div className="relative container-x pt-32 md:pt-40 pb-12 md:pb-16 min-h-[80dvh] md:min-h-[100dvh] flex flex-col justify-end">
              <p className="text-[11px] uppercase tracking-[0.25em] text-background/80 mb-6">
                Studio &mdash; About
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.04em] leading-[0.98] text-background max-w-5xl text-balance animate-fade-up">
                We believe perspective
                <br />
                changes everything.
              </h1>
            </div>
          </section>

          <Philosophy />
          <ProcessList />
          <Capabilities />

          <CTA
            onContact={openContact}
            eyebrow="Let's work together"
            heading={
              <>
                Built for brands that
                <br />
                care about visual storytelling.
              </>
            }
          />
        </>
      )}
    </PageShell>
  );
}

function Philosophy() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-background py-24 md:py-40">
      <div ref={ref} className="reveal container-x grid grid-cols-1 md:grid-cols-12 gap-10">
        <p className="md:col-span-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          Philosophy
        </p>
        <div className="md:col-span-9 max-w-3xl space-y-8">
          <p className="text-2xl md:text-4xl font-medium tracking-[-0.03em] leading-[1.15] text-balance">
            Fly4MEdia is a small studio with an editorial habit. We treat every
            frame as a decision, not a default.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
            We started in Alberta, where the landscape teaches restraint. The
            mountains don&rsquo;t need our help — they need the right light, the
            right altitude, and the patience to wait for both. That principle
            travels with us: every project, regardless of scale, is built around
            the discipline of removing rather than adding.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
            We work with brands, broadcasters, architects and tourism boards who
            understand that the strongest visual is rarely the loudest one.
          </p>
        </div>
      </div>
    </section>
  );
}
