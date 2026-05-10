import { useEffect } from "react";
import PageShell from "@/components/fly4media/PageShell";
import HeroMedia from "@/components/fly4media/HeroMedia";
import ProcessList from "@/components/fly4media/ProcessList";
import Capabilities from "@/components/fly4media/Capabilities";
import CTA from "@/components/fly4media/CTA";
import { useReveal } from "@/components/fly4media/useReveal";
import about from "@/assets/about-hero.jpg";
import toby from "@/assets/toby-portrait.jpg";

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
                A note from Toby &mdash; founder, Fly4MEdia
              </p>
              <h1 className="t-display-1 wrap-editorial text-background max-w-4xl animate-fade-up">
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
            eyebrow="If you've read this far —"
            heading={
              <>
                Let&rsquo;s talk about what
                <br />
                you&rsquo;re trying to be seen as.
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
      <div ref={ref} className="reveal container-x grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-3">
          <p className="t-eyebrow text-muted-foreground mb-6">A letter</p>
          <figure className="max-w-[280px] lg:max-w-[320px]">
            <div className="media-frame aspect-[3/4]">
              <img
                src={toby}
                alt="Toby Rennick, founder of Fly4MEdia, on a ridge above an alpine lake in the Canadian Rockies"
                width={1080}
                height={1440}
                loading="lazy"
                decoding="async"
                className="media-img"
              />
            </div>
            <figcaption className="mt-4">
              <span className="t-meta block">Toby Rennick</span>
              <span className="t-eyebrow text-muted-foreground">
                Founder &amp; Director, Fly4MEdia
              </span>
            </figcaption>
          </figure>
        </div>
        <div className="lg:col-span-9 max-w-3xl space-y-8">
          <p className="t-headline-2 max-w-[24ch] lg:max-w-none">
            You didn&rsquo;t spend a decade building this thing
            just to watch it get flattened by another
            forgettable drone reel. The way you&rsquo;re seen
            <em> is</em> the position you hold.
          </p>
          <p className="t-lede text-muted-foreground">
            I didn&rsquo;t start Fly4MEdia to be a drone guy.
            I started it because I kept watching beautiful
            places and serious brands get handed footage that
            made them look like everyone else &mdash; and I
            knew the frame could do more. So I picked up the
            camera, learned to fly, and stopped accepting
            &ldquo;fine.&rdquo;
          </p>
          <p className="t-lede text-muted-foreground">
            I learned to wait in the mountains. For light.
            For weather. For the line that actually means
            something. That patience is the discipline I
            built the studio around &mdash; which is why,
            everywhere else on this site, you&rsquo;ll hear
            <em> we</em>. The standard is bigger than one
            person. But the answer to your first email is
            still mine.
          </p>
        </div>
      </div>
    </section>
  );
}
