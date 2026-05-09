import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/typography";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import PullQuote from "@/components/PullQuote";
import { motion } from "framer-motion";

const easeHeavy: [number, number, number, number] = [0.16, 1, 0.3, 1];

const declarations = [
  { text: "This is not a concert. Not a festival. Not a church program relocated to a park.", negation: true },
  { text: "It is not a stage for one church, one denomination, or a spectacle dressed in Christian language.", negation: true },
  { text: "It is a public day of worship and prayer \u2014 born in prayer rooms, carried by churches shoulder to shoulder, and offered freely to every person in Cochrane.", negation: false },
  { text: "No hype. No hidden agenda. No offering plate. Just Jesus — lifted up together.", negation: false },
  { text: "\u201CLove the Lord your God with all your heart and with all your soul and with all your mind.\u201D — Matthew 22:37, NIV", negation: false },
];

export const WhatThisIsNot = () => {
  return (
    <ScrollReveal weight="heavy">
      <Section variant="default" padding="md" className="relative">
        {/* Section counter */}
        <motion.span
          aria-hidden="true"
          className="hidden md:block font-serif text-8xl text-foreground/[0.03] select-none pointer-events-none absolute top-8 left-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: easeHeavy }}
        >
          01
        </motion.span>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16 items-start w-full">
          {/* Left: heading */}
          <div className="lg:sticky lg:top-32">
            <SectionHeading className="text-left">
              <TextReveal delay={0.1}>What This Is</TextReveal>
              <br />
              <TextReveal delay={0.2}>
                <span className="text-muted-foreground">& What It Is Not</span>
              </TextReveal>
            </SectionHeading>
            {/* Decorative cross — bespoke SVG with nail stigmata and gold accents */}
            <div className="hidden lg:block mt-8" aria-hidden="true">
              <motion.svg
                width="24"
                height="36"
                viewBox="0 0 24 36"
                fill="none"
                className="text-primary"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Vertical beam */}
                <line x1="12" y1="0" x2="12" y2="36" stroke="currentColor" strokeWidth="0.6" opacity="0.12" />
                {/* Horizontal beam — positioned at upper third (traditional cross proportion) */}
                <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="0.6" opacity="0.12" />
                {/* Nail stigmata — three marks */}
                <circle cx="12" cy="10" r="1.2" fill="hsl(var(--gold-warm))" fillOpacity="0.08" stroke="hsl(var(--gold-warm))" strokeWidth="0.3" strokeOpacity="0.15" />
                <circle cx="4" cy="10" r="0.8" fill="hsl(var(--gold-warm))" fillOpacity="0.06" />
                <circle cx="20" cy="10" r="0.8" fill="hsl(var(--gold-warm))" fillOpacity="0.06" />
                <circle cx="12" cy="30" r="0.8" fill="hsl(var(--gold-warm))" fillOpacity="0.06" />
                {/* INRI plaque — tiny rectangle above crossbeam */}
                <rect x="9" y="4" width="6" height="3" rx="0.3" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.06" fill="none" />
                {/* Base pedestal */}
                <line x1="8" y1="36" x2="16" y2="36" stroke="currentColor" strokeWidth="0.4" opacity="0.06" />
              </motion.svg>
            </div>

            {/* Subtle manifesto label — editorial micro-text */}
            <motion.p
              className="hidden lg:block mt-6 text-[11px] font-sans uppercase tracking-[0.3em] text-muted-foreground/60 max-w-none"
              style={{ fontFeatureSettings: '"cv02"' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              A manifesto of intention
            </motion.p>
          </div>

          {/* Right: manifesto lines */}
          <div className="flex flex-col gap-0">
            {declarations.map((item, i) => (
              <ScrollReveal key={i} weight="normal" delay={i * 0.08}>
                <div
                  className={`
                    relative border-l-2 pl-5 py-5 md:py-4 text-base leading-relaxed max-w-none transition-all duration-300 group
                    ${item.negation
                      ? "border-primary/15 text-muted-foreground hover:border-primary/30 hover:pl-6"
                      : "border-foreground/10 text-foreground/85 hover:border-foreground/20 hover:pl-6"
                    }
                  `}
                >
                  {/* Inline index */}
                  <span
                    aria-hidden="true"
                    className="hidden md:inline-block font-serif text-foreground/[0.06] text-sm mr-2 select-none tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.text}

                  {/* Negation strike — subtle decorative line through negation items on hover */}
                  {item.negation && (
                    <span
                      className="absolute left-5 right-4 top-1/2 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 pointer-events-none"
                      style={{
                        background: "linear-gradient(90deg, hsl(var(--primary) / 0.08), hsl(var(--primary) / 0.02))",
                        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Positive accent — gold left-edge glow on positive declarations on hover */}
                  {!item.negation && (
                    <span
                      className="absolute left-0 top-2 bottom-2 w-[2px] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 pointer-events-none"
                      style={{
                        background: "linear-gradient(to top, hsl(var(--gold-warm) / 0.2), transparent)",
                        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <PullQuote attribution="Dietrich Bonhoeffer, Letters and Papers from Prison" align="center">
          The Church is the Church only when it exists for others.
        </PullQuote>

        <ScriptureWhisper
          verse="True worshipers will worship the Father in the Spirit and in truth, for they are the kind of worshipers the Father seeks. God is spirit, and his worshipers must worship in the Spirit and in truth."
          reference="John 4:23–24"
          delay={0.5}
        />
      </Section>
    </ScrollReveal>
  );
};
