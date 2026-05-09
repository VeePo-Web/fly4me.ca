import { useReveal } from "./useReveal";

const SERVICES = [
  { n: "01", title: "Aerial Cinematography", desc: "Cinematic video production for commercial, editorial and broadcast." },
  { n: "02", title: "FPV Drone Filming", desc: "Immersive first-person footage for dynamic, high-energy storytelling." },
  { n: "03", title: "Aerial Photography", desc: "High-resolution stills for marketing, real estate and documentation." },
  { n: "04", title: "Real Estate Media", desc: "Architectural showcases that frame property at its most flattering scale." },
  { n: "05", title: "Tourism & Lifestyle", desc: "Visual campaigns that translate landscape into desire." },
  { n: "06", title: "Industrial Inspections", desc: "Precision aerial surveys for infrastructure, energy and inspection." },
  { n: "07", title: "Commercial Campaigns", desc: "End-to-end production from concept to final delivery." },
  { n: "08", title: "Creative Direction", desc: "Shot listing, location scouting, and creative planning." },
];

export default function Services() {
  const headRef = useReveal<HTMLDivElement>();
  return (
    <section id="services" className="bg-foreground text-background py-24 md:py-40">
      <div className="container-x">
        <div ref={headRef} className="reveal grid grid-cols-1 md:grid-cols-12 gap-y-10 mb-16 md:mb-24">
          <p className="md:col-span-3 text-[11px] uppercase tracking-[0.25em] text-background/50">
            What we do
          </p>
          <h2 className="md:col-span-9 text-4xl md:text-6xl font-medium tracking-[-0.035em] leading-[1.02] text-balance">
            End-to-end aerial
            <br />
            content solutions.
          </h2>
        </div>

        <ul className="border-t border-background/15">
          {SERVICES.map((s) => (
            <ServiceRow key={s.n} {...s} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceRow({ n, title, desc }: { n: string; title: string; desc: string }) {
  const ref = useReveal<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className="reveal group border-b border-background/15 py-7 md:py-8 grid grid-cols-12 gap-6 items-baseline transition-colors hover:bg-background/[0.04]"
    >
      <span className="col-span-2 md:col-span-1 text-[11px] uppercase tracking-[0.25em] text-background/50">
        {n}
      </span>
      <h3 className="col-span-10 md:col-span-5 text-2xl md:text-3xl font-medium tracking-tight">
        {title}
      </h3>
      <p className="col-span-12 md:col-span-6 text-sm md:text-base text-background/65 leading-relaxed text-pretty">
        {desc}
      </p>
    </li>
  );
}
