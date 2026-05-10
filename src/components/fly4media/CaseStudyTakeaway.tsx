import { useReveal } from "./useReveal";

interface Props {
  eyebrow?: string;
  body: string;
}

/**
 * Final editorial insight. Restrained, no CTA chrome — the closing line
 * before the Next Project hand-off.
 */
export default function CaseStudyTakeaway({ eyebrow = "Takeaway", body }: Props) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-background py-section-lg">
      <div ref={ref} className="reveal container-x grid grid-cols-1 md:grid-cols-12 gap-10">
        <p className="md:col-span-3 t-micro text-muted-foreground">{eyebrow}</p>
        <p className="md:col-span-9 t-headline-2 wrap-editorial max-w-3xl text-foreground/90">
          {body}
        </p>
      </div>
    </section>
  );
}
