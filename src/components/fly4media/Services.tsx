import { Link } from "react-router-dom";
import { useReveal, useRevealStagger } from "./useReveal";

const SERVICES = [
  { n: "01", title: "Aerial Cinematography", desc: "For the brand that's tired of looking like every other drone reel." },
  { n: "02", title: "FPV Drone Filming", desc: "Movement the cut can't fake. The shot people rewind." },
  { n: "03", title: "Aerial Photography", desc: "One frame that repositions a place — and the deck it lives in." },
  { n: "04", title: "Real Estate Media", desc: "When the listing has to feel like the destination, not the address." },
  { n: "05", title: "Tourism & Lifestyle", desc: "Films that turn a landscape into a reason to book the flight." },
];

export default function Services() {
  const headRef = useReveal<HTMLDivElement>();
  return (
    <section id="services" className="bg-foreground text-background py-section">
      <div className="container-x">
        <div ref={headRef} className="reveal grid grid-cols-1 md:grid-cols-12 gap-y-10 mb-16 md:mb-24">
          <p className="md:col-span-3 t-eyebrow text-background/50">
            What we do
          </p>
          <div className="md:col-span-6">
            <h2 className="t-headline-1 wrap-editorial">
              Tools for shifting
              <br />
              perception.
            </h2>
          </div>
          <div className="md:col-span-3 md:flex md:items-end md:justify-end">
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 t-nav text-background link-underline"
            >
              All services
              <span className="link-arrow" aria-hidden>↗</span>
            </Link>
          </div>
        </div>

        <ul ref={useRevealStagger<HTMLUListElement>()} className="border-t border-background/15">
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
      <span className="col-span-2 md:col-span-1 t-micro text-background/50">
        {n}
      </span>
      <h3 className="col-span-10 md:col-span-5 t-headline-3">
        {title}
      </h3>
      <p className="col-span-12 md:col-span-6 t-body text-background/65">
        {desc}
      </p>
    </li>
  );
}
