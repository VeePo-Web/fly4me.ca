import { useEffect } from "react";
import PageShell from "@/components/fly4media/PageShell";
import ServiceFeature from "@/components/fly4media/ServiceFeature";
import CTA from "@/components/fly4media/CTA";
import work1 from "@/assets/work-01-mountain-road.jpg";
import work2 from "@/assets/work-02-architecture.jpg";
import work3 from "@/assets/work-03-lake-boat.jpg";
import work4 from "@/assets/work-04-industrial.jpg";
import csCanmore1 from "@/assets/cs-canmore-1.jpg";
import csLake2 from "@/assets/cs-lake-2.jpg";
import csField2 from "@/assets/cs-field-2.jpg";
import strip from "@/assets/services-strip.jpg";

const SERVICES = [
  {
    number: "01",
    title: "Aerial Cinematography",
    desc: "Cinematic perspectives that change how a brand is experienced — patient camera moves, considered framing, every time.",
    image: work1,
    alt: "Aerial cinematography over mountain road",
  },
  {
    number: "02",
    title: "FPV Drone Production",
    desc: "Immersive movement that turns a moment into a memory — single-shot reveals and choreographed brand films.",
    image: csLake2,
    alt: "FPV drone over alpine lake",
  },
  {
    number: "03",
    title: "Tourism & Destination Films",
    desc: "Films that translate a landscape into longing — without the cliché.",
    image: work1,
    alt: "Tourism aerial across the Rockies",
  },
  {
    number: "04",
    title: "Commercial Brand Campaigns",
    desc: "End-to-end production built around a single question: what should this brand be perceived as?",
    image: csField2,
    alt: "Commercial wind turbine campaign",
  },
  {
    number: "05",
    title: "Real Estate Cinematics",
    desc: "Visual storytelling that turns properties into destinations — and listings into invitations.",
    image: work2,
    alt: "Mountain home architectural aerial",
  },
  {
    number: "06",
    title: "Industrial Aerial Documentation",
    desc: "Precision passes that reframe infrastructure as landscape — for engineering, brand, and report alike.",
    image: work4,
    alt: "Industrial aerial documentation",
  },
  {
    number: "07",
    title: "Social Media Visual Campaigns",
    desc: "Vertical-first cuts engineered for the feed — without sacrificing the cinematic master.",
    image: csCanmore1,
    alt: "Social campaign cinematography",
  },
  {
    number: "08",
    title: "Creative Direction",
    desc: "Shot listing, scouting, and the discipline of deciding what not to film. The work before the work.",
    image: work3,
    alt: "Top-down lake creative direction",
  },
];

export default function Services() {
  useEffect(() => {
    document.title = "Services — Tools for shifting perception · Fly4MEdia";
  }, []);

  return (
    <PageShell>
      {({ openContact }: { openContact: () => void }) => (
        <>
          <section className="pt-36 md:pt-48 pb-20 md:pb-32 container-x">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
              Services
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.04em] leading-[0.98] max-w-5xl text-balance animate-fade-up">
              Cinematic perspective,
              <br />
              engineered to be felt.
            </h1>
            <p className="mt-10 max-w-xl text-base md:text-lg text-muted-foreground text-pretty">
              Every engagement begins with the same question: what should this
              be perceived as?
            </p>
          </section>

          {SERVICES.map((s, i) => (
            <ServiceFeature key={s.number} {...s} reverse={i % 2 === 1} />
          ))}

          {/* Visual strip */}
          <section className="bg-background py-20 md:py-32">
            <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden bg-secondary">
              <img
                src={strip}
                alt="Cinematic mountain ridge at golden hour"
                loading="lazy"
                decoding="async"
                width={1620}
                height={1080}
                className="w-full h-full object-cover"
              />
            </div>
          </section>

          <CTA
            onContact={openContact}
            heading={
              <>
                Some stories deserve
                <br />
                to be seen from above.
              </>
            }
          />
        </>
      )}
    </PageShell>
  );
}
