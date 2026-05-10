import { Link } from "react-router-dom";
import { useReveal } from "./useReveal";
import { projects } from "@/data/projects";

export default function CaseStudyTeaser() {
  const featured = projects[0];
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-background py-24 md:py-40">
      <div ref={ref} className="reveal container-x">
        <p className="t-eyebrow text-muted-foreground mb-8">
          Proof of perspective
        </p>

        <Link to={`/work/${featured.slug}`} data-cursor="hover" className="group block">
          <div className="media-frame aspect-[16/9]">
            <img
              src={featured.heroImage}
              alt={featured.title}
              loading="lazy"
              decoding="async"
              width={1920}
              height={1080}
              className="media-img"
            />
          </div>

          <div className="media-meta mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <h3 className="t-headline-2">
                {featured.title}
              </h3>
              <p className="t-lede mt-4 text-muted-foreground max-w-xl">
                {featured.tagline}
              </p>
            </div>
            <div className="md:col-span-5 md:flex md:justify-end">
              <span className="inline-flex items-center gap-2 t-nav">
                <span className="link-underline">View case study</span>
                <span className="link-arrow">↗</span>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
