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
  const refHeading = useReveal<HTMLDivElement>();
  const refCta     = useReveal<HTMLDivElement>();

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

      <div className="relative container-x">

        {/* Heading — arrives first, argument before action */}
        <div ref={refHeading} className="reveal">
          {eyebrow && (
            <p className="t-eyebrow text-background/40 mb-8 md:mb-10">
              {eyebrow}
            </p>
          )}
          <h2 className="t-display-2 wrap-editorial wrap-editorial-mobile-off max-w-[16ch] mb-10 md:mb-14 lg:mb-16">
            {heading ?? (
              <>
                Some stories deserve
                <br />
                to be seen from above.
              </>
            )}
          </h2>
        </div>

        {/* Button — surfaces 200ms after heading; action follows argument */}
        <div ref={refCta} className="reveal" style={{ transitionDelay: "200ms" }}>
          <Button
            variant="light"
            onClick={onContact}
            arrow
          >
            {cta}
          </Button>
        </div>

      </div>
    </section>
  );
}
