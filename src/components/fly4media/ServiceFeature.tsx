import { useReveal } from "./useReveal";

interface Props {
  number: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
  reverse?: boolean;
}

export default function ServiceFeature({
  number,
  title,
  desc,
  image,
  alt,
  reverse,
}: Props) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <article ref={ref} className="reveal border-t border-border py-section-sm lg:py-section">
      <div
        className={`container-x grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
          reverse ? "lg:[&>*:first-child]:order-last" : ""
        }`}
      >
        <div className="lg:col-span-6">
          <div className="media-frame aspect-[4/5] lg:aspect-[5/6]">
            <img
              src={image}
              alt={alt}
              loading="lazy"
              decoding="async"
              width={1280}
              height={1600}
              className="media-img"
            />
          </div>
        </div>
        <div className="lg:col-span-6">
          <p className="t-eyebrow text-muted-foreground mb-4 lg:mb-5">
            {number}
          </p>
          <h3 className="t-headline-1 mb-6 max-w-[16ch]">
            {title}
          </h3>
          <p className="t-lede text-muted-foreground max-w-md lg:max-w-lg">
            {desc}
          </p>
        </div>
      </div>
    </article>
  );
}
