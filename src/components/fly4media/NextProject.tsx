import { Link } from "react-router-dom";
import { useReveal } from "./useReveal";
import type { Project } from "@/data/projects";

export default function NextProject({ next }: { next: Project }) {
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <section className="bg-background border-t border-border">
      <Link
        ref={ref as never}
        to={`/work/${next.slug}`}
        data-cursor="hover"
        className="reveal group block container-x py-20 md:py-32 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-5">
              Next Project
            </p>
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-[-0.04em] leading-[1] text-balance">
              {next.title}
            </h3>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              {next.category} · {next.year}
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="overflow-hidden bg-secondary aspect-[16/10]">
              <img
                src={next.heroImage}
                alt={next.title}
                loading="lazy"
                decoding="async"
                width={1920}
                height={1200}
                className="img-zoom w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
