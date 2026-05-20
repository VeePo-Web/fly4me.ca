import { Link } from "react-router-dom";
import { useReveal } from "./useReveal";
import CinematicMedia from "./CinematicMedia";
import { projects, type Project } from "@/data/projects";

/*
  Layout config — positional and mobile-offset only.
  Aspect ratios and image dimensions now live in projects.ts
  (they are properties of the work, not of the display context).
*/
const LAYOUTS = [
  { lg: "lg:col-span-7",               offset: "",           mobile: "" },
  { lg: "lg:col-span-5 lg:col-start-8", offset: "lg:mt-32",  mobile: "ml-[8%]" },
  { lg: "lg:col-span-6 lg:col-start-2", offset: "",           mobile: "" },
  { lg: "lg:col-span-5 lg:col-start-7", offset: "lg:mt-16",  mobile: "ml-[8%]" },
  { lg: "lg:col-span-8 lg:col-start-3", offset: "lg:mt-24",  mobile: "" },
] as const;

export default function FeaturedWork() {
  const titleRef = useReveal<HTMLDivElement>();

  return (
    <section id="work" className="bg-background py-section">
      <div className="container-x">

        <div ref={titleRef} className="reveal mb-20 md:mb-32 lg:mb-40">
          <h2 className="t-display-2 wrap-editorial">
            Proof,
            <br />
            not portfolio.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-16 lg:gap-y-24">
          {projects.map((project, i) => {
            const layout = LAYOUTS[i] ?? LAYOUTS[0];
            return (
              <ProjectCard
                key={project.slug}
                project={project}
                layoutLg={layout.lg}
                offsetLg={layout.offset}
                mobileOffset={layout.mobile}
              />
            );
          })}
        </div>

        <div className="mt-16 md:mt-20 flex justify-end">
          <Link
            to="/work"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 t-button text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <span className="link-underline">View all work</span>
            <span className="link-arrow">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  layoutLg: string;
  offsetLg: string;
  mobileOffset: string;
}

function ProjectCard({ project, layoutLg, offsetLg, mobileOffset }: ProjectCardProps) {
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <Link
      ref={ref as never}
      to={`/work/${project.slug}`}
      data-cursor="hover"
      className={`reveal group block ${layoutLg} ${offsetLg} ${mobileOffset}`}
    >
      <div className={`media-frame ${project.cardAspect}`}>
        <CinematicMedia
          image={project.cardImage}
          alt={project.title}
          sources={project.cardVideoSources}
          objectPosition={project.cardObjectPosition}
          width={project.cardImgW}
          height={project.cardImgH}
        />
      </div>

      <div className="media-meta mt-6 lg:mt-8 flex items-start justify-between gap-4">
        <div>
          <p className="t-eyebrow text-muted-foreground mb-1.5">
            {project.number} — {project.category}
          </p>
          <h3 className="t-headline-2">
            <span className="link-underline">{project.title}</span>
          </h3>
          <p className="t-body text-muted-foreground mt-1.5 max-w-[28ch]">
            {project.tagline}
          </p>
        </div>
        <span
          className="link-arrow text-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-[color,transform] duration-300 shrink-0 mt-1"
          aria-hidden
        >
          ↗
        </span>
      </div>
    </Link>
  );
}
