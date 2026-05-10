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
    <section id="work" className="bg-background py-section">
      <div className="container-x">
        <div ref={titleRef} className="reveal grid grid-cols-1 md:grid-cols-12 gap-y-10 mb-16 md:mb-24">
          <p className="md:col-span-3 t-eyebrow text-muted-foreground">
            Featured Work
          </p>
          <div className="md:col-span-6">
            <h2 className="t-headline-1 wrap-editorial">
              Proof,
              <br />
              not portfolio.
            </h2>
          </div>
          <div className="md:col-span-3 md:flex md:items-end md:justify-end">
            <Link
              to="/work"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 t-button"
            >
              <span className="link-underline">View all projects</span>
              <span className="link-arrow">↗</span>
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
      data-cursor="hover"
      className={`reveal group block transition-transform duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 ${className}`}
    >
      <div className="media-frame aspect-[4/5]">
        <img
          src={project.cardImage}
          alt={project.title}
          loading="lazy"
          decoding="async"
          width={1280}
          height={1600}
          className="media-img"
        />
      </div>
      <div className="media-meta mt-5 flex items-baseline justify-between gap-6">
        <div>
          <p className="t-eyebrow text-muted-foreground mb-1.5">
            {project.number} — {project.category}
          </p>
          <h3 className="t-headline-3">
            <span className="link-underline">{project.title}</span>
          </h3>
        </div>
        <span className="link-arrow text-foreground/50 group-hover:text-foreground transition-colors">↗</span>
      </div>
    </Link>
  );
}
