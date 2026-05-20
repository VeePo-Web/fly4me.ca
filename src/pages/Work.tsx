import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageShell from "@/components/fly4media/PageShell";
import CTA from "@/components/fly4media/CTA";
import { useReveal } from "@/components/fly4media/useReveal";
import CinematicMedia from "@/components/fly4media/CinematicMedia";
import { projects, type Project } from "@/data/projects";

/*
  Work page layout config — different positions from FeaturedWork.
  The homepage teases; the work page presents with full authority.
  Aspect ratios come from project.cardAspect (project data).
  Mobile offsets create editorial rhythm on portrait viewports.
*/
const LAYOUTS = [
  { lg: "lg:col-span-8",               offset: "",           mobile: "" },
  { lg: "lg:col-span-5 lg:col-start-7", offset: "lg:mt-40",  mobile: "ml-[8%]" },
  { lg: "lg:col-span-7 lg:col-start-2", offset: "lg:mt-8",   mobile: "" },
  { lg: "lg:col-span-5 lg:col-start-8", offset: "lg:mt-24",  mobile: "ml-[8%]" },
  { lg: "lg:col-span-9 lg:col-start-2", offset: "lg:mt-16",  mobile: "" },
] as const;

export default function Work() {
  useEffect(() => {
    document.title = "Work — Perspective in motion · Fly4MEdia";
  }, []);

  return (
    <PageShell>
      {({ openContact }: { openContact: () => void }) => (
        <>
          {/*
            Page header — no eyebrow.
            The previous "Selected Work / 2024 — 2025" was wrong
            (projects span 2024–2026) and implied filtering where none exists.
            The heading stands alone; the count line below confirms scope.
          */}
          <section className="pt-36 md:pt-48 lg:pt-56 pb-section-sm container-x">
            <h1
              className="t-display-2 wrap-editorial wrap-editorial-mobile-off animate-fade-up"
              style={{ animationDelay: "0ms" }}
            >
              Perspective,
              <br />
              in motion.
            </h1>

            {/* Project count — specific, honest, corrects the old date range */}
            <p
              className="t-meta text-muted-foreground mt-6 animate-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              {projects.length} projects · 2024–2026
            </p>
          </section>

          {/*
            Card grid — aspect ratios from project data, not hardcoded.
            Slightly wider column spans than FeaturedWork give the work page
            more visual authority — this is the full presentation, not the tease.
          */}
          <section className="container-x pb-section">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-16 lg:gap-y-24">
              {projects.map((project, i) => {
                const layout = LAYOUTS[i] ?? LAYOUTS[0];
                return (
                  <Card
                    key={project.slug}
                    project={project}
                    layoutLg={layout.lg}
                    offsetLg={layout.offset}
                    mobileOffset={layout.mobile}
                  />
                );
              })}
            </div>
          </section>

          <CTA onContact={openContact} />
        </>
      )}
    </PageShell>
  );
}

interface CardProps {
  project: Project;
  layoutLg: string;
  offsetLg: string;
  mobileOffset: string;
}

function Card({ project, layoutLg, offsetLg, mobileOffset }: CardProps) {
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <Link
      ref={ref as never}
      to={`/work/${project.slug}`}
      data-cursor="hover"
      className={`reveal group block ${layoutLg} ${offsetLg} ${mobileOffset}`}
    >
      {/* Aspect ratio from project data — editorial per footage type */}
      <div className={`media-frame ${project.cardAspect}`}>
        <CinematicMedia
          image={project.cardImage}
          alt={`${project.title} — ${project.category}`}
          sources={project.cardVideoSources}
          objectPosition={project.cardObjectPosition}
          width={project.cardImgW}
          height={project.cardImgH}
        />
      </div>

      <div className="media-meta mt-5 lg:mt-8 flex items-start justify-between gap-4">
        <div>
          <p className="t-eyebrow text-muted-foreground mb-2">
            {project.number} · {project.category} · {project.year}
          </p>
          <h2 className="t-headline-2">
            <span className="link-underline">{project.title}</span>
          </h2>
        </div>
        <span
          className="link-arrow text-foreground/35 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 mt-1"
          aria-hidden
        >
          ↗
        </span>
      </div>
    </Link>
  );
}
