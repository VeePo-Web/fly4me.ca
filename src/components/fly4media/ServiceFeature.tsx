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
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-5">
            {number}
          </p>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.035em] leading-[1.02] mb-6 text-balance">
            {title}
          </h3>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md text-pretty">
            {desc}
          </p>
        </div>
      </div>
    </article>
  );
}
