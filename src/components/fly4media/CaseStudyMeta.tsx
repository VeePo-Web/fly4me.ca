import { useReveal } from "./useReveal";
import type { Project } from "@/data/projects";

export default function CaseStudyMeta({ project }: { project: Project }) {
  const ref = useReveal<HTMLDivElement>();
  const items = [
    { label: "Client", value: project.client },
    { label: "Location", value: project.location },
    { label: "Services", value: project.services.join(" · ") },
    { label: "Year", value: project.year },
  ];
  return (
    <section className="bg-background border-y border-border py-12 md:py-16">
      <div ref={ref} className="reveal container-x grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
        {items.map((it) => (
          <div key={it.label}>
            <p className="t-micro text-muted-foreground mb-2">
              {it.label}
            </p>
            <p className="t-body font-medium tracking-tight text-pretty">
              {it.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
