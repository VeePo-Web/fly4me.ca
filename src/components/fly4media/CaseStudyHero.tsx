import { Link } from "react-router-dom";
import HeroMedia from "./HeroMedia";
import type { Project } from "@/data/projects";

export default function CaseStudyHero({ project }: { project: Project }) {
  return (
    <section className="relative min-h-[90dvh] md:min-h-[100dvh] w-full overflow-hidden bg-secondary">
      <HeroMedia
        image={project.heroImage}
        alt={`${project.title} — hero image`}
        priority
        sources={project.heroVideoSources}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/15 to-foreground/30"
        aria-hidden
      />

      <div className="relative container-x pt-32 md:pt-40 pb-12 md:pb-16 min-h-[90dvh] md:min-h-[100dvh] flex flex-col justify-end">
        <Link
          to="/work"
          className="t-eyebrow text-background/80 hover:text-background transition-colors mb-6 inline-flex items-center gap-2"
        >
          <span>←</span> All work
        </Link>
        <p className="t-eyebrow text-background/70 mb-4">
          {project.number} — {project.category}
        </p>
        <h1 className="t-display-1 text-background max-w-5xl animate-fade-up">
          {project.title}
        </h1>
        <p className="t-lede mt-6 max-w-2xl text-background/85">
          {project.tagline}
        </p>
      </div>
    </section>
  );
}
