import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageShell from "@/components/fly4media/PageShell";
import CTA from "@/components/fly4media/CTA";
import { useReveal } from "@/components/fly4media/useReveal";
import { projects, type Project } from "@/data/projects";

const LAYOUTS = [
  "md:col-span-7",
  "md:col-span-5 md:col-start-8 md:mt-32",
  "md:col-span-6 md:col-start-2",
  "md:col-span-5 md:col-start-8",
];

export default function Work() {
  useEffect(() => {
    document.title = "Work — Perspective in motion · Fly4MEdia";
  }, []);

  return (
    <PageShell>
      {({ openContact }: { openContact: () => void }) => (
        <>
          <section className="pt-36 md:pt-48 pb-section-sm container-x">
            <p className="t-eyebrow text-muted-foreground mb-6">
              Selected Work / 2024 &mdash; 2025
            </p>
            <h1 className="t-display-2 wrap-editorial wrap-editorial-mobile-off max-w-5xl animate-fade-up">
              Perspective,
              <br />
              in motion.
            </h1>
          </section>

          <section className="container-x pb-32 md:pb-48">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-24 md:gap-y-40">
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
      <div className="mt-6 flex items-baseline justify-between gap-6">
        <div>
          <p className="t-eyebrow text-muted-foreground mb-2">
            {project.number} — {project.category} · {project.year}
          </p>
          <h2 className="t-headline-3">
            {project.title}
          </h2>
        </div>
        <span className="text-foreground/50 group-hover:text-foreground transition-colors">↗</span>
      </div>
    </Link>
  );
}
