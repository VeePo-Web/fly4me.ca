import { useReveal } from "./useReveal";
import { Button } from "./Button";

interface Props {
  onContact: () => void;
  eyebrow?: string;
  heading?: React.ReactNode;
  cta?: string;
}

export default function CTA({
  onContact,
  eyebrow = "Before the brief",
  heading,
  cta = "Begin a conversation",
}: Props) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="contact" className="bg-background py-section-lg">
      <div ref={ref} className="reveal container-x text-center">
        <p className="t-eyebrow text-muted-foreground mb-8">
          {eyebrow}
        </p>
        <h2 className="t-headline-1 wrap-editorial max-w-5xl mx-auto">
          {heading ?? (
            <>
              Some stories deserve
              <br />
              to be seen from above.
            </>
          )}
        </h2>
        <div className="mt-14 inline-flex">
          <Button onClick={onContact}>{cta}</Button>
        </div>
      </div>
    </section>
  );
}
