import { useReveal } from "./useReveal";

export default function BrandStatement() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-background py-32 md:py-48">
      <div ref={ref} className="reveal container-x grid grid-cols-1 md:grid-cols-12 gap-10">
        <p className="md:col-span-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          Studio — Philosophy
        </p>
        <div className="md:col-span-9">
          <p className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-[-0.035em] leading-[1.05] text-balance">
            How something is seen changes how it is valued. We build the
            perspective that changes the perception.
          </p>
        </div>
      </div>
    </section>
  );
}
