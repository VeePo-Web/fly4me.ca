import { useReveal, useRevealStagger } from "./useReveal";

const STEPS = [
  { n: "01", title: "Discovery", desc: "The call where you realise we actually got the brief — not just heard it. We listen for the truth underneath the deck." },
  { n: "02", title: "Creative Direction", desc: "Storyboards and shot lists you can show a stakeholder without flinching. Every frame is composed before the drone leaves the ground." },
  { n: "03", title: "Production", desc: "Licensed flight operations and cinema-grade gear, run with the patience to wait out the weather instead of compromising the shot." },
  { n: "04", title: "Delivery", desc: "Colour-graded masters and channel-ready cuts. The work isn't done until the cut lands and the room exhales." },
];

export default function ProcessList() {
  const headRef = useReveal<HTMLDivElement>();
  const listRef = useRevealStagger<HTMLUListElement>();
  return (
    <section className="bg-background py-section">
      <div className="container-x">
        <div ref={headRef} className="reveal grid grid-cols-1 md:grid-cols-12 gap-y-10 mb-16 md:mb-24">
          <p className="md:col-span-3 t-eyebrow text-muted-foreground">
            Process
          </p>
          <h2 className="md:col-span-9 t-headline-1 wrap-editorial">
            Four steps.
            <br />
            Nothing wasted.
          </h2>
        </div>

        <ul ref={listRef} className="border-t border-border">
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
      <span className="col-span-2 md:col-span-1 t-micro text-muted-foreground">
        {n}
      </span>
      <h3 className="col-span-10 md:col-span-4 t-headline-3">
        {title}
      </h3>
      <p className="col-span-12 md:col-span-7 t-body text-muted-foreground">
        {desc}
      </p>
    </li>
  );
}
