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
    document.title = "About — Perspective Changes Everything · Fly4MEdia";
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
              <p className="t-eyebrow text-background/80 mb-6">
                Studio &mdash; About
              </p>
              <h1 className="t-display-1 wrap-editorial text-background max-w-5xl animate-fade-up">
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
            eyebrow="Reframe what you're showing the world"
            heading={
              <>
                Built for brands that understand
                <br />
                presentation is positioning.
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
    <section className="bg-background py-section">
      <div ref={ref} className="reveal container-x grid grid-cols-1 md:grid-cols-12 gap-10">
        <p className="md:col-span-3 t-eyebrow text-muted-foreground">
          Philosophy
        </p>
        <div className="md:col-span-9 max-w-3xl space-y-8">
          <p className="t-headline-2">
            Perception precedes value. How something is seen decides how it is
            felt — and what gets remembered after the room empties.
          </p>
          <p className="t-lede text-muted-foreground">
            Restraint is the loudest creative choice we make — and the one
            that survives the boardroom. The strongest visual is rarely the
            loudest one. The frame your CMO actually remembers is usually the
            one we waited an hour longer for, then cut everything else around.
          </p>
          <p className="t-lede text-muted-foreground">
            Altitude is a discipline. We started in Alberta, where the
            landscape teaches you to wait — for light, for weather, for the
            right line. That patience travels with us into every brief, every
            client, every frame.
          </p>
        </div>
      </div>
    </section>
  );
}
