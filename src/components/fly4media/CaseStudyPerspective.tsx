import { useReveal } from "./useReveal";
import CinematicMedia from "./CinematicMedia";
import type { VideoSource } from "@/data/projects";

interface Props {
  eyebrow: string;
  headline: string;
  body: string;
  image: string;
  alt: string;
  videoSources?: VideoSource[];
  objectPosition?: string;
}

/**
 * Signature "Perspective Shift" section: full-bleed cinematic media,
 * oversized title-card headline, single short paragraph. Title-card
 * registers as an editorial moment — the page's tonal anchor.
 */
export default function CaseStudyPerspective({
  eyebrow,
  headline,
  body,
  image,
  alt,
  videoSources,
  objectPosition,
}: Props) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-background py-section-lg">
      <div ref={ref} className="reveal">
        <div className="container-x mb-12 md:mb-16 grid grid-cols-1 md:grid-cols-12 gap-10">
          <p className="md:col-span-3 t-eyebrow text-muted-foreground">{eyebrow}</p>
          <h2 className="md:col-span-9 t-display-2 wrap-editorial max-w-5xl">
            {headline}
          </h2>
        </div>

        <div className="container-x">
          <div className="media-frame aspect-[16/9] md:aspect-[21/9]">
            <CinematicMedia
              image={image}
              alt={alt}
              sources={videoSources}
              objectPosition={objectPosition}
              width={1920}
              height={820}
            />
          </div>
        </div>

        <div className="container-x mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-9 md:col-start-4 max-w-3xl">
            <p className="t-quote optical-hang">{body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
