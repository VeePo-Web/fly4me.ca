import { Section } from "@/components/ui/section";
import { SectionHeading, Eyebrow } from "@/components/ui/typography";
import ScrollReveal from "@/components/ScrollReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import { Link } from "react-router-dom";
import { IconArrowMicro } from "@/components/icons/BrandIcons";

/** Gold filigree corner ornament */
const CornerOrnament = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
    aria-hidden="true"
  >
    <path
      d="M16,4 L16,13 Q16,16 13,16 L4,16"
      stroke="hsl(var(--gold-warm))"
      strokeWidth="0.5"
      strokeOpacity="0.18"
      fill="none"
    />
  </svg>
);

const slots = [
  { num: "01", label: "Set 1", time: "11:00 – 11:55 AM", desc: "Worship team TBD." },
  { num: "02", label: "Set 2", time: "12:00 – 12:55 PM", desc: "Worship team TBD." },
  { num: "03", label: "Set 3", time: "1:00 – 1:55 PM", desc: "Worship team TBD." },
  { num: "04", label: "Set 4", time: "2:00 – 2:55 PM", desc: "Worship team TBD." },
  { num: "05", label: "Set 5", time: "3:00 – 3:55 PM", desc: "Worship team TBD." },
  { num: "06", label: "Set 6", time: "4:00 – 4:55 PM", desc: "Worship team TBD." },
  { num: "07", label: "Set 7", time: "5:00 – 5:55 PM", desc: "Worship team TBD." },
  { num: "08", label: "Set 8", time: "6:00 – 6:55 PM", desc: "Worship team TBD." },
];

export const SchedulePreview = () => {
  return (
    <Section variant="muted" padding="md" className="text-center relative">
      {/* Section counter */}
      <span
        aria-hidden="true"
        className="hidden md:block font-serif text-8xl text-foreground/[0.03] select-none pointer-events-none absolute top-8 left-6"
      >
        05
      </span>

      <ScrollReveal weight="light" delay={0.05}>
        <Eyebrow className="text-muted-foreground mb-3">August 8, 2026 &middot; Sunrise to sunset</Eyebrow>
      </ScrollReveal>
      <ScrollReveal weight="normal">
        <SectionHeading className="mb-12">The Day Unfolds</SectionHeading>
      </ScrollReveal>

      {/* Timeline layout */}
      <div className="w-full max-w-2xl mx-auto">
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/12 to-transparent"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-3">
            {slots.map((slot, i) => (
              <ScrollReveal key={slot.num} delay={i * 0.06} weight="light">
                <div className="relative pl-12 sm:pl-14 md:pl-20 text-left group cursor-default">
                  {/* Diamond node at timeline */}
                  <div
                    className="absolute left-[13px] md:left-[21px] top-3 group-hover:scale-110 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <rect x="5.5" y="0.5" width="7" height="7" rx="0.5" transform="rotate(45 5.5 0.5)" stroke="hsl(var(--gold-warm))" strokeWidth="0.6" fill="hsl(var(--gold-warm))" fillOpacity="0.08" className="group-hover:fill-opacity-20 transition-all duration-300" />
                    </svg>
                  </div>
                  {/* Horizontal connector */}
                  <div
                    className="absolute left-[15px] md:left-[31px] top-[11px] w-6 md:w-8 h-px bg-primary/8 group-hover:bg-primary/15 transition-colors duration-300"
                    aria-hidden="true"
                  />

                  {/* Compact card */}
                  <div className="relative rounded-sm border border-border/15 bg-card/30 group-hover:border-border/30 group-hover:bg-card/60 transition-all duration-300 px-5 py-3 shadow-[0_1px_0_0_hsl(var(--border)/0.4)] overflow-hidden">
                    {/* Top gold accent line — hover reveal */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(90deg, hsl(var(--gold-warm) / 0.3), hsl(var(--primary) / 0.15), transparent)" }}
                      aria-hidden="true"
                    />

                    {/* Ghost numeral */}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 right-3 font-serif text-4xl text-foreground/[0.03] select-none pointer-events-none leading-none"
                    >
                      {slot.num}
                    </span>

                    <CornerOrnament />

                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 sm:flex-wrap">
                      <p
                        className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
                        style={{ fontFeatureSettings: '"cv02"' }}
                      >
                        {slot.label}
                      </p>
                      <p
                        className="font-serif text-lg md:text-xl font-light text-foreground"
                        style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
                      >
                        {slot.time}
                      </p>
                      <p className="text-sm text-muted-foreground/70">{slot.desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <ScrollReveal delay={0.3} weight="light">
        <p className="text-xs text-muted-foreground/60 mt-4 italic">5-minute transitions between each set</p>
      </ScrollReveal>

      <ScriptureWhisper
        verse="From the rising of the sun to the place where it sets, the name of the Lord is to be praised."
        reference="Psalm 113:3"
        delay={0.4}
        className="mt-6"
      />

      <ScrollReveal delay={0.5} weight="light">
        <Link
          to="/day-details/schedule"
          className="inline-block font-sans text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors link-reveal pb-0.5 mt-4"
        >
          See Full Schedule <IconArrowMicro size={10} className="inline-block ml-1 align-middle" />
        </Link>
      </ScrollReveal>
    </Section>
  );
};
