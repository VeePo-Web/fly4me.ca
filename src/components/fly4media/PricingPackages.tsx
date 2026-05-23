import { useReveal } from "./useReveal";
import ctaBg from "@/assets/cta-background.jpg";
import dividerImg from "@/assets/divider-mountain-pass.jpg";

/* ─── Types ─────────────────────────────────────────── */
interface Inclusion {
  item: string;
  value: string;
}

interface Tier {
  name: string;
  tagline: string;
  inclusions: Inclusion[];
  totalValue: string;
  price: string;
  priceNote?: string;
  signature?: boolean;
  cta: string;
}

interface Category {
  id: string;
  label: string;
  eyebrow: string;
  headline: string;
  subline: string;
  tiers: [Tier, Tier, Tier];
}

/* ─── Pricing data ───────────────────────────────────── */
const CATEGORIES: Category[] = [
  {
    id: "real-estate",
    label: "Real Estate",
    eyebrow: "Real Estate & Property",
    headline: "The listing that feels\nlike a destination.",
    subline:
      "Most property footage gets scrolled past in two seconds. The listings that stop thumbs — and close faster — look like they were filmed, not photographed.",
    tiers: [
      {
        name: "Essential",
        tagline: "Everything the listing needs. Nothing it doesn't.",
        inclusions: [
          { item: "4K cinematic aerial video, edited with colour grade (60–90 sec)", value: "$420" },
          { item: "10 MLS-ready aerial photographs, colour-corrected", value: "$220" },
          { item: "48-hour delivery — live before the open house", value: "—" },
          { item: "Licensed & RPAS Advanced-certified operator", value: "—" },
        ],
        totalValue: "$640",
        price: "$600",
        cta: "Book Essential",
      },
      {
        name: "Elevated",
        tagline: "The full property story — aerial and ground.",
        inclusions: [
          { item: "4K cinematic aerial video with colour grade (90 sec)", value: "$420" },
          { item: "Ground walkthrough cinematic (60 sec)", value: "$350" },
          { item: "20 MLS-ready photographs (aerial + ground)", value: "$400" },
          { item: "Vertical social cut (Reels / TikTok format)", value: "$180" },
          { item: "48-hour delivery, all formats included", value: "—" },
        ],
        totalValue: "$1,350",
        price: "$1,100",
        cta: "Book Elevated",
      },
      {
        name: "Signature",
        tagline: "A full production day. The listing that becomes a landmark.",
        inclusions: [
          { item: "Half-day production (cinematic aerial + ground)", value: "$900" },
          { item: "25 photographs, full gallery edit", value: "$500" },
          { item: "Three deliverable cuts: long, short, vertical", value: "$480" },
          { item: "Sunset / golden-hour shoot window", value: "—" },
          { item: "Music licensed for all platforms", value: "$120" },
          { item: "Same-week delivery, all formats", value: "—" },
        ],
        totalValue: "$2,000+",
        price: "$2,200",
        priceNote: "Full day available — contact for scope",
        signature: true,
        cta: "Book Signature",
      },
    ],
  },
  {
    id: "commercial",
    label: "Commercial",
    eyebrow: "Commercial & Brand",
    headline: "The brand film that\nearns its airtime.",
    subline:
      "Commercial aerial cinematography that holds up in the brand deck, the broadcast slot, and the trade show screen. One shoot. Footage that works everywhere.",
    tiers: [
      {
        name: "Essential",
        tagline: "One location. One cinematic brand reel.",
        inclusions: [
          { item: "90-second brand highlight reel, colour graded", value: "$900" },
          { item: "Single location, half-day shoot", value: "—" },
          { item: "Raw selects package (full resolution)", value: "$300" },
          { item: "5-day delivery", value: "—" },
        ],
        totalValue: "$1,200",
        price: "$1,400",
        cta: "Book Essential",
      },
      {
        name: "Elevated",
        tagline: "Multi-location. Multiple cuts. One cohesive campaign.",
        inclusions: [
          { item: "Full-day shoot (up to 2 locations)", value: "$1,800" },
          { item: "Two campaign cuts (long + short)", value: "$600" },
          { item: "Vertical format for paid social", value: "$200" },
          { item: "Brand brief consultation (30 min)", value: "$200" },
          { item: "Raw selects + colour-graded deliverables", value: "—" },
        ],
        totalValue: "$2,800",
        price: "$2,800",
        cta: "Book Elevated",
      },
      {
        name: "Signature",
        tagline: "Full creative direction. The campaign from concept to delivery.",
        inclusions: [
          { item: "Pre-production: shot list + location scout", value: "$500" },
          { item: "Full production day — unlimited locations", value: "$2,400" },
          { item: "Three deliverable formats (broadcast, social, short)", value: "$900" },
          { item: "Creative direction on the day", value: "$600" },
          { item: "Music licensed for all platforms", value: "$120" },
          { item: "Priority 3-day delivery", value: "—" },
        ],
        totalValue: "$4,520",
        price: "From $5,500",
        priceNote: "Complex productions — contact for custom quote",
        signature: true,
        cta: "Book Signature",
      },
    ],
  },
  {
    id: "tourism",
    label: "Tourism",
    eyebrow: "Tourism & Destination",
    headline: "The footage that makes\nthem book the flight.",
    subline:
      "Tourism boards and destination marketers know the difference between footage that documents a place and footage that sells it. This is the second kind.",
    tiers: [
      {
        name: "Essential",
        tagline: "One destination reel, built to convert.",
        inclusions: [
          { item: "90-second destination aerial reel, colour graded", value: "$1,100" },
          { item: "Single location, half-day", value: "—" },
          { item: "Raw selects (full resolution)", value: "$300" },
          { item: "5-day delivery", value: "—" },
        ],
        totalValue: "$1,400",
        price: "$1,800",
        cta: "Book Essential",
      },
      {
        name: "Elevated",
        tagline: "Full-day campaign. Two locations. Multiple cuts.",
        inclusions: [
          { item: "Full-day shoot (up to 2 locations)", value: "$2,200" },
          { item: "Primary destination reel (2 min)", value: "$600" },
          { item: "Short-form social cut (30 sec)", value: "$200" },
          { item: "Season or campaign brief consultation", value: "$300" },
          { item: "All raw selects included", value: "—" },
        ],
        totalValue: "$3,300",
        price: "$3,600",
        cta: "Book Elevated",
      },
      {
        name: "Signature",
        tagline: "Multi-day creative campaign. The definitive destination film.",
        inclusions: [
          { item: "Multi-day production (schedule by brief)", value: "POA" },
          { item: "Full creative direction + location scouting", value: "—" },
          { item: "Multiple deliverable cuts for all platforms", value: "—" },
          { item: "Seasonal scheduling for optimal light conditions", value: "—" },
          { item: "Music and licensing included", value: "$120" },
          { item: "Dedicated project liaison throughout", value: "—" },
        ],
        totalValue: "By scope",
        price: "By proposal",
        priceNote: "Scope-dependent — contact for a tailored brief",
        signature: true,
        cta: "Start the conversation",
      },
    ],
  },
];

/* ─── Standard tier card (Essential / Elevated) ──────── */
function TierCard({
  tier,
  onContact,
}: {
  tier: Tier;
  onContact: () => void;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal flex flex-col h-full bg-background border-r border-b border-border last:border-r-0"
    >
      {/* Header */}
      <div className="px-8 pt-10 pb-8 border-b border-border">
        <p className="t-eyebrow text-muted-foreground mb-3">{tier.name}</p>
        <p className="t-body text-foreground/70 leading-snug max-w-[28ch]">
          {tier.tagline}
        </p>
      </div>

      {/* Inclusions */}
      <div className="px-8 pt-8 flex-1">
        <p className="t-micro text-muted-foreground mb-5">What&rsquo;s included</p>
        <ul className="space-y-4">
          {tier.inclusions.map((inc, i) => (
            <li key={i} className="flex items-start justify-between gap-4">
              <span className="t-body text-foreground/80 flex-1 leading-snug">
                {inc.item}
              </span>
              {inc.value !== "—" && (
                <span className="t-micro text-muted-foreground tabular-nums shrink-0 pt-0.5">
                  {inc.value}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div className="px-8 pt-8 pb-3 mt-8 border-t border-border">
        <p className="t-micro text-muted-foreground mb-1">
          Stated value {tier.totalValue}
        </p>
        <p className="t-display-2 leading-none tracking-[-0.035em]">
          {tier.price}
        </p>
        {tier.priceNote && (
          <p className="t-micro text-muted-foreground mt-1">{tier.priceNote}</p>
        )}
      </div>

      {/* CTA */}
      <div className="px-8 pb-10 pt-6">
        <button
          onClick={onContact}
          data-cursor="hover"
          className="group w-full inline-flex items-center justify-between gap-3 px-6 py-4 bg-foreground text-background text-sm font-medium tracking-[0.005em] hover:bg-foreground/90 transition-colors duration-200"
        >
          <span>{tier.cta}</span>
          <span className="link-arrow">↗</span>
        </button>
      </div>
    </div>
  );
}

/* ─── Signature tier — full-width cinematic band ────── */
function SignatureBand({
  tier,
  onContact,
}: {
  tier: Tier;
  onContact: () => void;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    /*
      Signature gets a completely different layout posture — full 12-column
      dark band. Left: name + tagline + inclusions. Right: price at t-display-1
      (~100px+) with CTA below. This communicates: this is a different category,
      not just a more expensive option.
      Aerial image at 6% opacity: cinematic texture without competing with copy.
      Ghost "Signature" text: Benoist spatial architecture.
    */
    <div
      ref={ref}
      className="reveal relative overflow-hidden bg-foreground text-background border-t border-background/10"
    >
      {/* Aerial texture layer */}
      <img
        src={ctaBg}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover opacity-[0.06] pointer-events-none select-none"
      />

      {/* Ghost "Signature" — Benoist oversized spatial text */}
      <span
        className="hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2 t-display-0 text-background leading-none opacity-[0.03] select-none pointer-events-none"
        aria-hidden
      >
        Signature
      </span>

      <div className="relative container-x py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">

        {/* Left col — tier identity + value stack (5 cols) */}
        <div className="md:col-span-5">
          <p className="t-eyebrow text-background/40 mb-4">{tier.name}</p>
          <p className="t-lede text-background/70 mb-10 max-w-[32ch] leading-snug">
            {tier.tagline}
          </p>

          <p className="t-micro text-background/35 mb-5">What&rsquo;s included</p>
          <ul className="space-y-4">
            {tier.inclusions.map((inc, i) => (
              <li key={i} className="flex items-start justify-between gap-6">
                <span className="t-body text-background/75 flex-1 leading-snug">
                  {inc.item}
                </span>
                {inc.value !== "—" && (
                  <span className="t-micro text-background/30 tabular-nums shrink-0 pt-0.5">
                    {inc.value}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="t-micro text-background/30 mt-6">
            Stated value {tier.totalValue}
          </p>
        </div>

        {/* Right col — price statement + CTA (7 cols) */}
        <div className="md:col-span-7 flex flex-col items-start md:items-end gap-8">
          <div className="text-left md:text-right">
            {/*
              Price at t-display-1 (~80–150px fluid) — the number that anchors
              the page. Highest-value package gets maximum visual authority.
            */}
            <p className="t-display-1 leading-none tracking-[-0.04em] text-background">
              {tier.price}
            </p>
            {tier.priceNote && (
              <p className="t-micro text-background/35 mt-3 max-w-[28ch] md:ml-auto">
                {tier.priceNote}
              </p>
            )}
          </div>

          <button
            onClick={onContact}
            data-cursor="hover"
            data-magnetic
            className="btn-light group"
          >
            <span>{tier.cta}</span>
            <span className="link-arrow">↗</span>
          </button>

          <p className="t-micro text-background/30 max-w-[30ch] text-left md:text-right leading-relaxed">
            Includes the reshoot guarantee — if the footage doesn&rsquo;t match
            the brief, we come back. No invoice. No argument.
          </p>
        </div>

      </div>
    </div>
  );
}

/* ─── Cinematic divider between categories ───────────── */
function PricingDivider() {
  return (
    /*
      Full-bleed aerial still — cinematic pause between Real Estate and
      Commercial. Same treatment as homepage Divider component.
      Fades to bg-background above and below (light sections either side).
    */
    <section
      className="relative w-full h-[38vh] md:h-[52vh] overflow-hidden bg-[#0a0a0a]"
      aria-label="Aerial still — Canadian Rockies"
    >
      <img
        src={dividerImg}
        alt="Aerial view of a mountain pass in the Canadian Rockies, Alberta"
        loading="lazy"
        decoding="async"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover motion-safe:animate-kenburns"
      />

      {/* Top — fades from light bg above */}
      <div
        className="absolute inset-x-0 top-0 h-32 md:h-44 bg-gradient-to-b from-background via-background/40 to-transparent pointer-events-none"
        aria-hidden
      />

      {/* Bottom — fades to light bg below */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 md:h-44 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none"
        aria-hidden
      />

      {/* Editorial caption */}
      <div className="absolute bottom-8 md:bottom-10 inset-x-0 container-x flex items-center gap-4">
        <div className="w-8 h-px bg-background/40 shrink-0" />
        <span className="t-micro text-background/50 tracking-[0.14em]">
          Banff National Park&nbsp;·&nbsp;Alberta, Canada
        </span>
      </div>
    </section>
  );
}

/* ─── Category section ───────────────────────────────── */
function CategorySection({
  category,
  onContact,
  showDivider,
}: {
  category: Category;
  onContact: () => void;
  showDivider: boolean;
}) {
  const headRef = useReveal<HTMLDivElement>();
  const [tier0, tier1, tier2] = category.tiers;

  return (
    <>
      <section id={category.id} className="pt-section border-t border-border">
        <div className="container-x">

          {/* Category header — 7/5 asymmetric split */}
          <div ref={headRef} className="reveal mb-14 md:mb-20">
            <p className="t-eyebrow text-muted-foreground mb-5">
              {category.eyebrow}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end">
              <h2 className="md:col-span-7 t-display-2 wrap-editorial wrap-editorial-mobile-off whitespace-pre-line">
                {category.headline}
              </h2>
              <p className="md:col-span-5 t-lede text-muted-foreground max-w-[44ch]">
                {category.subline}
              </p>
            </div>
          </div>

          {/*
            Essential + Elevated — equal-choice 2-col grid.
            These two ARE comparable alternatives (50/50 justified here).
            Signature is architecturally separate below.
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
            <TierCard tier={tier0} onContact={onContact} />
            <TierCard tier={tier1} onContact={onContact} />
          </div>
        </div>

        {/*
          Signature — full-width, outside container, edge-to-edge.
          No container constraint: the dark band runs the full page width
          for maximum visual authority. The pricing statement is the peak
          of each category section.
        */}
        <div className="mt-px">
          <SignatureBand tier={tier2} onContact={onContact} />
        </div>

        {/* Value stack footnote */}
        <div className="container-x">
          <p className="t-micro text-muted-foreground mt-6 pb-section">
            Stated values reflect standard market rates for individual services.
            All packages include a licensed, RPAS Advanced-certified operator.
          </p>
        </div>
      </section>

      {/* Cinematic divider — only between Real Estate and Commercial */}
      {showDivider && <PricingDivider />}
    </>
  );
}

/* ─── Sticky category nav ────────────────────────────── */
function CategoryNav() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="sticky top-16 md:top-20 z-40 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container-x">
        <nav aria-label="Pricing categories" className="flex gap-8 md:gap-12 py-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollTo(cat.id)}
              data-cursor="hover"
              className="t-eyebrow text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {cat.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

/* ─── Export ─────────────────────────────────────────── */
export default function PricingPackages({
  onContact,
}: {
  onContact: () => void;
}) {
  return (
    <>
      <CategoryNav />
      {CATEGORIES.map((cat, i) => (
        <CategorySection
          key={cat.id}
          category={cat}
          onContact={onContact}
          showDivider={i === 0}
        />
      ))}
    </>
  );
}
