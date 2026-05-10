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
          <p className="t-headline-1">
            How something is seen decides what it's worth. Our work is the
            difference between being shown and being remembered.
          </p>
        </div>
      </div>
    </section>
  );
}
