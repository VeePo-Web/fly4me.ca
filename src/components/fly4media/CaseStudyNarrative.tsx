import { useReveal } from "./useReveal";
import type { SupportingImage } from "@/data/projects";

interface Props {
  eyebrow: string;
  headline: string;
  body: string;
  image?: SupportingImage;
  /** Reverses copy/image order on wide screens for editorial rhythm */
  flip?: boolean;
}

/**
 * Editorial narrative beat: eyebrow + title-card headline + restrained body,
 * optionally paired with a supporting still. No motion library — single
 * shared reveal observer. All typography via .t-* tokens.
 */
export default function CaseStudyNarrative({
  eyebrow,
  headline,
  body,
  image,
  flip = false,
}: Props) {
  const ref = useReveal<HTMLDivElement>();

  if (!image) {
    return (
      <section className="bg-background py-section">
        <div ref={ref} className="reveal container-x grid grid-cols-1 md:grid-cols-12 gap-10">
          <p className="md:col-span-3 t-eyebrow text-muted-foreground">{eyebrow}</p>
          <div className="md:col-span-9 max-w-3xl space-y-8">
            <h2 className="t-headline-1 wrap-editorial">{headline}</h2>
            <p className="t-lede text-foreground/85 measure-wide">{body}</p>
          </div>
        </div>
      </section>
    );
  }

  const aspect =
    image.ratio === "wide"
      ? "aspect-[16/10]"
      : image.ratio === "portrait"
        ? "aspect-[4/5]"
        : "aspect-square";

  const w = image.ratio === "wide" ? 1920 : 1280;
  const h = image.ratio === "wide" ? 1200 : image.ratio === "portrait" ? 1600 : 1280;

  return (
    <section className="bg-background py-section">
      <div ref={ref} className="reveal container-x grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
        <div
          className={
            (flip ? "md:order-2 md:col-start-7 " : "") +
            "md:col-span-6 max-w-xl space-y-6 md:space-y-8"
          }
        >
          <p className="t-eyebrow text-muted-foreground">{eyebrow}</p>
          <h2 className="t-headline-2 wrap-editorial">{headline}</h2>
          <p className="t-lede text-foreground/85">{body}</p>
        </div>
        <figure className={(flip ? "md:order-1 md:col-start-1 " : "") + "md:col-span-6"}>
          <div className={`media-frame ${aspect}`}>
            <img
              src={image.src}
              alt={image.alt}
              width={w}
              height={h}
              loading="lazy"
              decoding="async"
              className="media-img"
            />
          </div>
          {image.caption && (
            <figcaption className="t-micro text-muted-foreground mt-4">
              {image.caption}
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}
