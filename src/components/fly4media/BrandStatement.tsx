import { useReveal } from "./useReveal";

export default function BrandStatement() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-background py-section-lg">
      <div ref={ref} className="reveal container-x grid grid-cols-1 md:grid-cols-12 gap-10">
        <p className="md:col-span-3 t-eyebrow text-muted-foreground">
          Studio — Philosophy
        </p>
        <div className="md:col-span-9">
          <p className="t-headline-1 wrap-editorial max-w-[20ch] lg:max-w-[22ch]">
            How something is seen
            <br />
            decides what it's worth.
            <br />
            Our work is the difference
            <br />
            between being shown
            <br />
            and being remembered.
          </p>
        </div>
      </div>
    </section>
  );
}
