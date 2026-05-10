import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageShell from "@/components/fly4media/PageShell";
import CTA from "@/components/fly4media/CTA";
import { useReveal } from "@/components/fly4media/useReveal";
import CinematicMedia from "@/components/fly4media/CinematicMedia";
import { projects, type Project } from "@/data/projects";

const LAYOUTS = [
  "lg:col-span-7",
  "lg:col-span-5 lg:col-start-8 lg:mt-32",
  "lg:col-span-6 lg:col-start-2",
  "lg:col-span-5 lg:col-start-8",
];

export default function Work() {
  useEffect(() => {
    document.title = "Work — Perspective in motion · Fly4MEdia";
  }, []);

  return (
    <PageShell>
      {({ openContact }: { openContact: () => void }) => (
        <>
          <section className="pt-36 md:pt-48 lg:pt-56 pb-section-sm container-x">
            <p className="t-eyebrow text-muted-foreground mb-6 lg:mb-8">
              Selected Work / 2024 &mdash; 2025
            </p>
            <h1 className="t-display-2 wrap-editorial wrap-editorial-mobile-off max-w-4xl animate-fade-up">
              Perspective,
              <br />
              in motion.
            </h1>
          </section>

          <section className="container-x pb-section">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-24 lg:gap-y-40">
              {projects.map((p, i) => (
                <Card key={p.slug} project={p} className={LAYOUTS[i] ?? ""} />
              ))}
            </div>
          </section>

          <CTA onContact={openContact} />
        </>
      )}
    </PageShell>
  );
}

function Card({ project, className }: { project: Project; className: string }) {
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <Link
      ref={ref as never}
      to={`/work/${project.slug}`}
      data-cursor="hover"
      className={`reveal group block ${className}`}
    >
      <div className="media-frame aspect-[4/5]">
        <CinematicMedia
          image={project.cardImage}
          alt={project.title}
          sources={project.cardVideoSources}
          objectPosition={project.cardObjectPosition}
          width={1280}
          height={1600}
        />
      </div>
      <div className="mt-6 flex items-baseline justify-between gap-6">
        <div>
          <p className="t-eyebrow text-muted-foreground mb-1.5">
            {project.number} — {project.category} · {project.year}
          </p>
          <h2 className="t-headline-3">
            <span className="link-underline">{project.title}</span>
          </h2>
        </div>
        <span className="text-foreground/50 group-hover:text-foreground transition-colors">
          <span className="link-arrow">↗</span>
        </span>
      </div>
    </Link>
  );
}
