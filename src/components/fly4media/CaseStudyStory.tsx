import { useReveal } from "./useReveal";
import type { Project } from "@/data/projects";

const BEATS: { label: string; key: keyof Pick<Project, "challenge" | "perspectiveShift" | "story" | "impact"> }[] = [
  { label: "Challenge", key: "challenge" },
  { label: "Perspective Shift", key: "perspectiveShift" },
  { label: "Cinematic Execution", key: "story" },
  { label: "Emotional Impact", key: "impact" },
];

export default function CaseStudyStory({ project }: { project: Project }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-background py-24 md:py-40">
      <div ref={ref} className="reveal container-x grid grid-cols-1 md:grid-cols-12 gap-10">
        <p className="md:col-span-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          The Project
        </p>
        <div className="md:col-span-9 max-w-3xl space-y-12 md:space-y-16">
          {BEATS.map((beat) => {
            const value = project[beat.key];
            if (!value) return null;
            const isLead = beat.key === "perspectiveShift";
            return (
              <div key={beat.key} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                <p className="md:col-span-3 text-[10px] uppercase tracking-[0.28em] text-muted-foreground pt-2">
                  {beat.label}
                </p>
                <p
                  className={
                    isLead
                      ? "md:col-span-9 text-2xl md:text-3xl lg:text-4xl font-medium tracking-[-0.025em] leading-[1.2] text-balance text-pretty"
                      : "md:col-span-9 text-lg md:text-xl leading-relaxed text-pretty text-foreground/85"
                  }
                >
                  {value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
