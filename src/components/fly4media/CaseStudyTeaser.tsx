import { Link } from "react-router-dom";
import { useReveal } from "./useReveal";
import { projects } from "@/data/projects";

export default function CaseStudyTeaser() {
  const featured = projects[0];
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-background py-24 md:py-40">
      <div ref={ref} className="reveal container-x">
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-8">
          Featured Case Study
        </p>

        <Link to={`/work/${featured.slug}`} className="group block">
          <div className="overflow-hidden bg-secondary aspect-[16/9]">
            <img
              src={featured.heroImage}
              alt={featured.title}
              loading="lazy"
              decoding="async"
              width={1920}
              height={1080}
              className="img-zoom w-full h-full object-cover"
            />
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <h3 className="text-3xl md:text-5xl font-medium tracking-[-0.035em] leading-[1.05] text-balance">
                {featured.title}
              </h3>
              <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl text-pretty">
                {featured.tagline}
              </p>
            </div>
            <div className="md:col-span-5 md:flex md:justify-end">
              <span className="group inline-flex items-center gap-2 text-sm font-medium">
                View case study
                <span className="transition-transform group-hover:translate-x-0.5">↗</span>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
