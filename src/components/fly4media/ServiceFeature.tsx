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
    <article ref={ref} className="reveal border-t border-border py-16 md:py-28">
      <div
        className={`container-x grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center ${
          reverse ? "md:[&>*:first-child]:order-last" : ""
        }`}
      >
        <div className="md:col-span-6">
          <div className="overflow-hidden bg-secondary aspect-[4/5] md:aspect-[5/6]">
            <img
              src={image}
              alt={alt}
              loading="lazy"
              decoding="async"
              width={1280}
              height={1600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-6">
          <p className="t-eyebrow text-muted-foreground mb-5">
            {number}
          </p>
          <h3 className="t-headline-1 mb-6">
            {title}
          </h3>
          <p className="t-lede text-muted-foreground max-w-md">
            {desc}
          </p>
        </div>
      </div>
    </article>
  );
}
