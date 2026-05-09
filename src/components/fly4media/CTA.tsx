import { useReveal } from "./useReveal";

interface Props {
  onContact: () => void;
  eyebrow?: string;
  heading?: React.ReactNode;
  cta?: string;
}

export default function CTA({
  onContact,
  eyebrow = "Start a project",
  heading,
  cta = "Begin a conversation",
}: Props) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="contact" className="bg-background py-32 md:py-48">
      <div ref={ref} className="reveal container-x text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-8">
          {eyebrow}
        </p>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.04em] leading-[0.98] text-balance max-w-5xl mx-auto">
          {heading ?? (
            <>
              Let&rsquo;s capture
              <br />
              something unforgettable.
            </>
          )}
        </h2>
        <button
          onClick={onContact}
          className="group mt-14 inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {cta}
          <span className="transition-transform group-hover:translate-x-0.5">↗</span>
        </button>
      </div>
    </section>
  );
}
