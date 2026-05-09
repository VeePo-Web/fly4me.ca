import { Link } from "react-router-dom";
import { useReveal } from "./useReveal";
import { projects, type Project } from "@/data/projects";

const LAYOUTS = [
  "md:col-span-7",
  "md:col-span-5 md:col-start-8 md:mt-24",
  "md:col-span-6 md:col-start-2",
  "md:col-span-5 md:col-start-8",
];

export default function FeaturedWork() {
  const titleRef = useReveal<HTMLDivElement>();
  return (
    <section id="work" className="bg-background py-24 md:py-40">
      <div className="container-x">
        <div ref={titleRef} className="reveal grid grid-cols-1 md:grid-cols-12 gap-y-10 mb-16 md:mb-24">
          <p className="md:col-span-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Featured Work
          </p>
          <div className="md:col-span-6">
            <h2 className="text-4xl md:text-6xl font-medium tracking-[-0.035em] leading-[1.02] text-balance">
              Visual stories
              <br />
              from above.
            </h2>
          </div>
          <div className="md:col-span-3 md:flex md:items-end md:justify-end">
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 text-sm font-medium"
            >
              View all projects
              <span className="transition-transform group-hover:translate-x-0.5">↗</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-20 md:gap-y-32">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} className={LAYOUTS[i] ?? ""} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, className }: { project: Project; className: string }) {
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <Link
      ref={ref as never}
      to={`/work/${project.slug}`}
      className={`reveal group block ${className}`}
    >
      <div className="overflow-hidden bg-secondary aspect-[4/5]">
        <img
          src={project.cardImage}
          alt={project.title}
          loading="lazy"
          decoding="async"
          width={1280}
          height={1600}
          className="img-zoom w-full h-full object-cover"
        />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-1.5">
            {project.number} — {project.category}
          </p>
          <h3 className="text-xl md:text-2xl font-medium tracking-tight">
            {project.title}
          </h3>
        </div>
        <span className="text-foreground/50 group-hover:text-foreground transition-colors">↗</span>
      </div>
    </Link>
  );
}
