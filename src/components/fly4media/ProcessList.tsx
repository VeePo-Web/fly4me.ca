import { useReveal } from "./useReveal";

const STEPS = [
  { n: "01", title: "Discovery", desc: "We listen first. Understanding the audience, the brief, and the truth you're trying to tell." },
  { n: "02", title: "Creative Direction", desc: "Shot lists, references, and storyboards — every frame composed before the drone leaves the ground." },
  { n: "03", title: "Production", desc: "Licensed flight operations, cinema-grade gear, and the patience to wait for the right light." },
  { n: "04", title: "Delivery", desc: "Colour-graded master files, optimised cuts for every channel, and full archival." },
];

export default function ProcessList() {
  const headRef = useReveal<HTMLDivElement>();
  return (
    <section className="bg-background py-24 md:py-40">
      <div className="container-x">
        <div ref={headRef} className="reveal grid grid-cols-1 md:grid-cols-12 gap-y-10 mb-16 md:mb-24">
          <p className="md:col-span-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Process
          </p>
          <h2 className="md:col-span-9 text-4xl md:text-6xl font-medium tracking-[-0.035em] leading-[1.02] text-balance">
            Four steps.
            <br />
            Nothing wasted.
          </h2>
        </div>

        <ul className="border-t border-border">
          {STEPS.map((s) => (
            <Row key={s.n} {...s} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Row({ n, title, desc }: { n: string; title: string; desc: string }) {
  const ref = useReveal<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className="reveal border-b border-border py-8 md:py-10 grid grid-cols-12 gap-6 items-baseline"
    >
      <span className="col-span-2 md:col-span-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        {n}
      </span>
      <h3 className="col-span-10 md:col-span-4 text-2xl md:text-3xl font-medium tracking-tight">
        {title}
      </h3>
      <p className="col-span-12 md:col-span-7 text-sm md:text-base text-muted-foreground leading-relaxed text-pretty">
        {desc}
      </p>
    </li>
  );
}
