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
    desc: "For the brand that's tired of looking like everyone else from above. Patient camera moves, considered framing, and the discipline to wait for the frame that earns the cut.",
    image: work1,
    alt: "Aerial cinematography over mountain road",
  },
  {
    number: "02",
    title: "FPV Drone Production",
    desc: "When a single shot has to do the work of an entire scene. Choreographed, immersive, and built to be the moment the room goes quiet.",
    image: csLake2,
    alt: "FPV drone over alpine lake",
  },
  {
    number: "03",
    title: "Tourism & Destination Films",
    desc: "Built for the marketing lead who can't run another helicopter-shot-over-the-Rockies cliché. Films that turn a place into a feeling — and a feeling into a booking.",
    image: work1,
    alt: "Tourism aerial across the Rockies",
  },
  {
    number: "04",
    title: "Commercial Brand Campaigns",
    desc: "End-to-end production for creative directors who think in story arcs, not shot lists. We start every brief with one question — what should this brand be perceived as — and reverse-engineer the campaign from there.",
    image: csField2,
    alt: "Commercial wind turbine campaign",
  },
  {
    number: "05",
    title: "Real Estate Cinematics",
    desc: "For the listing that deserves a launch, not a tour. We frame the property the way the buyer is going to remember it — as a destination, not a transaction.",
    image: work2,
    alt: "Mountain home architectural aerial",
  },
  {
    number: "06",
    title: "Industrial Aerial Documentation",
    desc: "Engineering precision with cinematic restraint. Footage that holds up in the technical report and earns its place in the annual review.",
    image: work4,
    alt: "Industrial aerial documentation",
  },
  {
    number: "07",
    title: "Social Media Visual Campaigns",
    desc: "Vertical-first cuts engineered for the scroll, mastered for the boardroom. The same story, sized to land everywhere it lives.",
    image: csCanmore1,
    alt: "Social campaign cinematography",
  },
  {
    number: "08",
    title: "Creative Direction",
    desc: "Shot lists, location scouts, and the harder discipline of deciding what not to film. The work before the work — where most of the cinematic actually happens.",
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
          <section className="pt-36 md:pt-48 pb-section-sm container-x">
            <p className="t-eyebrow text-muted-foreground mb-6">
              Services
            </p>
            <h1 className="t-display-2 wrap-editorial wrap-editorial-mobile-off max-w-5xl animate-fade-up">
              Not deliverables.
              <br />
              Tools for shifting perception.
            </h1>
            <p className="t-lede mt-10 max-w-xl text-muted-foreground">
              Every brief starts in the same place — the question you're already
              asking yourself: what should this be perceived as?
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
                a different angle.
              </>
            }
          />
        </>
      )}
    </PageShell>
  );
}
