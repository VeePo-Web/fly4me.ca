import { useReveal } from "./useReveal";
import type { Project } from "@/data/projects";

export default function CaseStudyStory({ project }: { project: Project }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-background py-24 md:py-40">
      <div ref={ref} className="reveal container-x grid grid-cols-1 md:grid-cols-12 gap-10">
        <p className="md:col-span-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          The Project
        </p>
        <div className="md:col-span-9 max-w-3xl">
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-[-0.025em] leading-[1.2] text-balance text-pretty">
            {project.story}
          </p>
        </div>
      </div>
    </section>
  );
}
