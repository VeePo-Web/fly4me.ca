import { useReveal } from "./useReveal";

const ITEMS = [
  "Cinema-grade aerial drone systems",
  "FPV cinematic platforms",
  "Stabilised ground & gimbal workflows",
  "Transport Canada — Advanced RPAS",
  "Insured commercial operations",
  "Alberta-based, available worldwide",
];

export default function Capabilities() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-foreground text-background py-24 md:py-40">
      <div ref={ref} className="reveal container-x grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <p className="text-[11px] uppercase tracking-[0.25em] text-background/50 mb-6">
            Capabilities
          </p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-[-0.03em] leading-[1.1] text-balance">
            Built for productions that can&rsquo;t miss the shot.
          </h2>
        </div>
        <ul className="md:col-span-8 md:pl-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          {ITEMS.map((item, i) => (
            <li
              key={item}
              className="flex items-baseline gap-4 border-t border-background/15 pt-5 text-base md:text-lg"
            >
              <span className="text-[10px] uppercase tracking-[0.25em] text-background/50 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-pretty">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
