import { useEffect } from "react";
import PageShell from "@/components/fly4media/PageShell";
import { useReveal } from "@/components/fly4media/useReveal";
import HeroMedia from "@/components/fly4media/HeroMedia";
import PricingPackages from "@/components/fly4media/PricingPackages";
import PricingGuarantee from "@/components/fly4media/PricingGuarantee";
import PricingFAQ from "@/components/fly4media/PricingFAQ";
import CTA from "@/components/fly4media/CTA";
import heroImg from "@/assets/hero-drone.jpg";

/* ─── Data ───────────────────────────────────────────── */
const DIFFERENTIATORS = [
  {
    n: "01",
    heading: "Footage that sells, not documents.",
    body: "The difference between a $200 drone operator and a cinematographer is framing with intent. Every shot is composed to produce a feeling — the feeling that makes the viewer take the next step.",
  },
  {
    n: "02",
    heading: "One operator. Consistent results.",
    body: "You're hiring Toby, not a dispatch service. The footage in the portfolio was shot by the same person who will show up to your project. There's no quality lottery.",
  },
  {
    n: "03",
    heading: "Licensed, insured, RPAS Advanced-certified.",
    body: "Transport Canada Advanced Operations certification covers complex airspace and populated areas. Every project is fully insured. Your liability is zero.",
  },
  {
    n: "04",
    heading: "The brief before the shoot.",
    body: "A 20-minute call defines what success looks like before a single prop spins. This is why the reshoot guarantee rarely applies — and why delivery matches the brief, every time.",
  },
];

const PROCESS = [
  {
    n: "01",
    step: "Brief",
    detail:
      "A 20-minute call or written outline. We define the shots, the feeling, and the deliverable formats before anything else.",
  },
  {
    n: "02",
    step: "Shoot day",
    detail:
      "Toby arrives prepared. Weather window confirmed, airspace cleared, and a shot list that reflects the brief. You don't need to be there.",
  },
  {
    n: "03",
    step: "Delivery in 48 hrs",
    detail:
      "Colour-graded, edited, and formatted for every platform you need. A download link, not a hard drive. Most clients receive footage before their competition lists.",
  },
];

/* ─── Hero ───────────────────────────────────────────── */
function PricingHero({ onContact }: { onContact: () => void }) {
  return (
    /*
      Full-viewport cinematic opening — same visual authority as homepage hero.
      Solution-aware copy: visitor knows drone footage exists; open with mechanism
      differentiator ("frame with intent"), not category name.
    */
    <section
      aria-labelledby="pricing-heading"
      className="relative w-full overflow-hidden bg-[#0a0a0a] h-[100svh] md:h-[100dvh] max-h-[100dvh]"
    >
      {/* Live aerial footage — same sources as homepage hero */}
      <HeroMedia
        image={heroImg}
        alt="Aerial drone footage over the Canadian Rockies"
        priority
        sources={[
          { src: "/hero/hero-drone-mobile.mp4", type: "video/mp4", media: "(max-width: 768px)" },
          { src: "/hero/hero-drone.webm", type: "video/webm" },
          { src: "/hero/hero-drone.mp4", type: "video/mp4" },
        ]}
      />

      {/* Left-anchored radial vignette — right 50%+ of footage unobstructed */}
      <div className="absolute inset-0 hero-vignette" aria-hidden />

      <div className="relative container-x h-full hero-pt hero-pb flex flex-col">

        {/* Main copy — vertically centered, left column */}
        <div className="flex-1 min-h-0 flex flex-col justify-center max-w-2xl lg:max-w-[52rem]">

          <p
            className="t-eyebrow text-background/40 mb-8 animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            Fly4MEdia · Pricing
          </p>

          {/* t-reveal-track: letter-spacing settles from wide → tight over 1100ms */}
          <h1
            id="pricing-heading"
            className="hero-display wrap-editorial text-background t-reveal-track"
          >
            Not all drone footage
            <br />
            is the same.
            <br />
            Most of it proves it.
          </h1>

          <p
            className="hero-lede hero-gap-lede max-w-[36ch] text-background/50 animate-fade-up"
            style={{ animationDelay: "260ms" }}
          >
            The gap between footage that scrolls past and footage that closes
            the deal isn&rsquo;t equipment — it&rsquo;s the discipline to frame
            with intent.
          </p>

          <div
            className="hero-gap-cta flex items-center gap-8 flex-wrap animate-fade-up"
            style={{ animationDelay: "440ms" }}
          >
            <button
              onClick={() =>
                document
                  .getElementById("real-estate")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-cursor="hover"
              data-magnetic
              className="btn-light group"
            >
              <span>See packages</span>
              <span className="link-arrow">↗</span>
            </button>

            <button
              onClick={onContact}
              data-cursor="hover"
              className="group inline-flex items-center gap-1.5 t-button text-background/70 hover:text-background transition-colors duration-[260ms] ease-[var(--ease-out-soft)]"
            >
              Custom brief
              <span className="link-arrow text-background/50 group-hover:text-background">
                ↗
              </span>
            </button>
          </div>
        </div>

        {/* Bottom bar — GPS coordinate + availability signal */}
        <div
          className="hidden md:flex items-end justify-between shrink-0 animate-fade-up"
          style={{ animationDelay: "600ms" }}
        >
          <span className="t-micro text-background/25 tracking-[0.18em]">
            N&thinsp;51.04°&ensp;W&thinsp;114.07°
          </span>
          <span className="t-micro text-background/25 text-right tracking-[0.08em]">
            Limited&nbsp;availability&nbsp;·&nbsp;Book&nbsp;early
          </span>
        </div>
      </div>

      {/* Scroll indicator — centred pulse line */}
      <div
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        aria-hidden
      >
        <div className="w-px h-9 bg-background/20 hero-scroll-line" />
      </div>
    </section>
  );
}

/* ─── Differentiators ────────────────────────────────── */
function DifferentiatorRow({
  n,
  heading,
  body,
}: {
  n: string;
  heading: string;
  body: string;
}) {
  const ref = useReveal<HTMLLIElement>();
  return (
    /*
      Services-section row pattern: left-edge accent bar slides in on hover,
      title nudges right 8px, ghost number at display scale (Benoist).
      Same vocabulary as homepage Services — consistent editorial grammar.
    */
    <li
      ref={ref}
      className="reveal relative group border-b border-border py-7 md:py-9 overflow-hidden"
    >
      {/* Ghost number — spatial texture, desktop only */}
      <span
        className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 t-display-0 text-foreground leading-none opacity-[0.03] hidden lg:block"
        aria-hidden
      >
        {n}
      </span>

      {/* Left-edge accent bar */}
      <span
        className="absolute left-0 top-0 h-full w-[3px] bg-foreground/60 -translate-x-full group-hover:translate-x-0 transition-transform duration-[360ms] ease-[var(--ease-out-soft)]"
        aria-hidden
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-2 md:gap-6 md:items-baseline pl-0 md:pl-6">
        <span className="hidden md:block md:col-span-1 t-micro text-muted-foreground tabular-nums">
          {n}
        </span>
        <h3
          className="md:col-span-5 t-headline-2 transition-transform duration-[360ms] ease-[var(--ease-out-soft)] group-hover:translate-x-2"
        >
          {heading}
        </h3>
        <p className="md:col-span-6 t-body text-muted-foreground leading-relaxed">
          {body}
        </p>
      </div>
    </li>
  );
}

function Differentiators() {
  const headRef = useReveal<HTMLDivElement>();
  return (
    <section className="py-section border-b border-border">
      <div className="container-x">
        <div ref={headRef} className="reveal mb-14 md:mb-20">
          <h2 className="t-headline-1 max-w-[28ch] text-muted-foreground">
            Why the footage that moves product costs more than the footage that
            just documents it.
          </h2>
        </div>
        <ul className="border-t border-border">
          {DIFFERENTIATORS.map((d) => (
            <DifferentiatorRow key={d.n} {...d} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── Process ────────────────────────────────────────── */
function ProcessStrip() {
  const ref = useReveal<HTMLElement>();
  return (
    /*
      Dark section — creates light/dark/light rhythm break between
      Differentiators (light) and Packages (light). Without this,
      five consecutive light sections kill page momentum.
    */
    <section
      ref={ref}
      className="reveal py-section-sm bg-foreground text-background"
    >
      <div className="container-x">
        <p className="t-eyebrow text-background/40 mb-10 md:mb-12">
          How it works
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {PROCESS.map((p) => (
            <div key={p.n}>
              <p className="t-micro text-background/35 mb-4 tabular-nums">
                {p.n}
              </p>
              <h3 className="t-headline-2 text-background mb-4">{p.step}</h3>
              <p className="t-body text-background/60 leading-relaxed">
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────── */
export default function Pricing() {
  useEffect(() => {
    document.title = "Pricing — Aerial Cinematography Packages · Fly4MEdia";
  }, []);

  return (
    <PageShell>
      {({ openContact }: { openContact: () => void }) => (
        <>
          <PricingHero onContact={openContact} />
          <Differentiators />
          <ProcessStrip />
          <PricingPackages onContact={openContact} />
          <PricingGuarantee onContact={openContact} />
          <PricingFAQ />
          <CTA
            onContact={openContact}
            eyebrow="Ready to book"
            heading={
              <>
                One brief.
                <br />
                Footage that works.
              </>
            }
            cta="Start the conversation"
          />
        </>
      )}
    </PageShell>
  );
}
