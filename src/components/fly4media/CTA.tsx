import { useReveal } from "./useReveal";
import { Button } from "./Button";
import ctaBg from "@/assets/cta-background.jpg";

interface Props {
  onContact: () => void;
  /**
   * Optional eyebrow label. Pass an empty string (default) to suppress.
   * Only About page uses this ("If you've read this far —").
   */
  eyebrow?: string;
  heading?: React.ReactNode;
  cta?: string;
}

export default function CTA({
  onContact,
  eyebrow = "",
  heading,
  cta = "Begin a conversation",
}: Props) {
  const ref = useReveal<HTMLDivElement>();

  return (
    /*
      Dark close — bg-foreground on every page this appears.
      The CTA is Act III: the resolution. It should be the most visually
      authoritative moment on the page — not the most invisible.
      Dark ground creates the bookend that signals: the argument is complete.

      Stacks with the dark footer below, creating a deliberate dark close
      to every page rather than a white-section fade into the footer.
    */
    <section
      id="contact"
      className="relative overflow-hidden bg-foreground text-background py-section-lg min-h-[52vh] flex flex-col justify-center"
    >
      {/*
        Aerial texture — cta-background.jpg at 7% opacity on near-black.
        Barely visible: creates subtle spatial variation in the dark ground
        without competing with the type. Benoist spatial texture technique.
      */}
      <img
        src={ctaBg}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover opacity-[0.07] pointer-events-none select-none"
      />

      <div ref={ref} className="reveal relative container-x">

        {/*
          Eyebrow — only renders when explicitly passed.
          Default is empty so homepage/work/services get no label.
          About page passes "If you've read this far —" which earns it.
        */}
        {eyebrow && (
          <p className="t-eyebrow text-background/40 mb-8 md:mb-10">
            {eyebrow}
          </p>
        )}

        {/*
          Heading at t-display-2 — was t-headline-1 (same scale as every
          other section header). The CTA is the last thing the viewer reads;
          it earns the largest type. Left-aligned — the centered CTA is an
          expired pattern. Left alignment creates directional pull toward
          the button below.
          max-w-[16ch] prevents extremely long lines at very wide viewports.
        */}
        <h2 className="t-display-2 wrap-editorial max-w-[16ch] mb-10 md:mb-14 lg:mb-16">
          {heading ?? (
            <>
              Some stories deserve
              <br />
              to be seen from above.
            </>
          )}
        </h2>

        {/*
          btn-light — white button (bg-background, text-foreground) on
          the dark ground. The standard btn-primary (dark fill) would be
          invisible on bg-foreground. btn-light is the correct inversion.
        */}
        <Button
          variant="light"
          onClick={onContact}
          arrow
        >
          {cta}
        </Button>

      </div>
    </section>
  );
}
