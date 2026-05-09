import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import PageShell from "@/components/fly4media/PageShell";
import CaseStudyHero from "@/components/fly4media/CaseStudyHero";
import CaseStudyMeta from "@/components/fly4media/CaseStudyMeta";
import CaseStudyStory from "@/components/fly4media/CaseStudyStory";
import CaseStudyGallery from "@/components/fly4media/CaseStudyGallery";
import NextProject from "@/components/fly4media/NextProject";
import { useReveal } from "@/components/fly4media/useReveal";
import { getProject, getNextProject } from "@/data/projects";

export default function CaseStudy() {
  const { slug = "" } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    if (project) document.title = `${project.title} — Fly4MEdia`;
  }, [project]);

  if (!project) return <Navigate to="/work" replace />;

  const next = getNextProject(project.slug);

  return (
    <PageShell>
      <article>
        <CaseStudyHero project={project} />
        <CaseStudyMeta project={project} />
        <CaseStudyStory project={project} />
        <CaseStudyGallery project={project} />
        <Outcome text={project.outcome} />
        <NextProject next={next} />
      </article>
    </PageShell>
  );
}

function Outcome({ text }: { text: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-background py-section">
      <div ref={ref} className="reveal container-x grid grid-cols-1 md:grid-cols-12 gap-10">
        <p className="md:col-span-3 t-micro text-muted-foreground">
          Outcome
        </p>
        <p className="md:col-span-9 t-headline-3 measure max-w-2xl">
          {text}
        </p>
      </div>
    </section>
  );
}
