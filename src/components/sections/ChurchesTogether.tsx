import { useRef } from "react";
import { IconArrowMicro } from "@/components/icons/BrandIcons";
import { Section } from "@/components/ui/section";
import { SectionHeading, StandardText, Eyebrow } from "@/components/ui/typography";
import ScrollReveal from "@/components/ScrollReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import PullQuote from "@/components/PullQuote";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import churchesCandles from "@/assets/churches-candles.jpg";
import { churchProfiles } from "@/data/church-profiles";

const churchNames = churchProfiles.map((c) => c.name);

export const ChurchesTogether = () => {
  const marqueeItems = [...churchNames, ...churchNames, ...churchNames];
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={sectionRef}>
      <Section variant="default" padding="md" className="relative overflow-hidden">
        {/* Background image — seven candles, very subtle */}
        <motion.div className="absolute inset-0 z-0" style={{ y: imageY }}>
          <img
            src={churchesCandles}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-[0.04]"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, hsl(var(--background) / 0.92) 0%, hsl(var(--background) / 0.85) 40%, hsl(var(--background) / 0.95) 100%)",
            }}
          />
        </motion.div>

        {/* Section counter */}
        <span
          aria-hidden="true"
          className="hidden md:block font-serif text-8xl text-foreground/[0.03] select-none pointer-events-none absolute top-8 left-6 z-10"
        >
          04
        </span>

        {/* Vertical connector — gradient with gold diamond terminal */}
        <div className="flex flex-col items-center mb-8 relative z-10" aria-hidden="true">
          <div
            className="w-px h-10"
            style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--border) / 0.5))" }}
          />
          <svg width="7" height="7" viewBox="0 0 7 7" fill="none" className="mt-0.5">
            <rect x="3.5" y="0.3" width="4.2" height="4.2" rx="0.4" transform="rotate(45 3.5 0.3)" stroke="hsl(var(--gold-warm))" strokeWidth="0.5" fill="hsl(var(--gold-warm))" fillOpacity="0.1" />
          </svg>
        </div>

        <ScrollReveal weight="light" delay={0.05}>
          <Eyebrow className="text-muted-foreground mb-3 relative z-10">All Churches In Cochrane &middot; One altar</Eyebrow>
        </ScrollReveal>
        <ScrollReveal weight="normal">
          <SectionHeading className="text-center mb-4 relative z-10">Churches Together</SectionHeading>
        </ScrollReveal>

        <ScrollReveal weight="light" delay={0.15}>
          <StandardText className="max-w-xl mx-auto mb-8 text-center relative z-10">
            This platform belongs to no single church. We believe it is the shared confession of the Apostles' Creed that unites us — one God, one Lord Jesus Christ, one Holy Spirit, one faith. Across different traditions, styles, and stories, congregations stand shoulder to shoulder because the Gospel is bigger than any one of us.
            What the city sees is part of the message itself: we are not united by uniformity, but by the One who makes us one. Brothers and sisters under one King.
          </StandardText>
        </ScrollReveal>

        {/* Double marquee strip */}
        <ScrollReveal weight="light" delay={0.3}>
          <div className="w-full overflow-hidden py-6 mb-6 relative z-10 border-y border-border/30" aria-hidden="true">
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            {/* Row 1 — scrolling left */}
            <div className="flex animate-marquee whitespace-nowrap mb-3">
              {marqueeItems.map((name, i) => (
                <span
                  key={`r1-${i}`}
                  className="font-serif text-base md:text-lg font-normal text-muted-foreground/65 mx-6 shrink-0 flex items-center gap-0"
                  style={{ letterSpacing: "0.02em" }}
                >
                  {name}
                  <span className="ml-6 text-primary/20 select-none" aria-hidden="true">&middot;</span>
                </span>
              ))}
            </div>

            {/* Row 2 — scrolling right */}
            <div className="flex animate-marquee-reverse whitespace-nowrap">
              {marqueeItems.map((name, i) => (
                <span
                  key={`r2-${i}`}
                  className="font-serif text-base md:text-lg font-normal text-muted-foreground/50 mx-6 shrink-0 flex items-center gap-0"
                  style={{ letterSpacing: "0.02em" }}
                >
                  {name}
                  <span className="ml-6 text-primary/15 select-none" aria-hidden="true">&middot;</span>
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScriptureWhisper
          verse="Make every effort to keep the unity of the Spirit through the bond of peace."
          reference="Ephesians 4:3"
          delay={0.4}
          className="relative z-10"
        />

        <PullQuote attribution="John Chrysostom, Homily on 1 Corinthians" align="center" className="relative z-10">
          Though we are many, we are one body, because we all share in one bread.
        </PullQuote>

        <ScrollReveal weight="light" delay={0.5}>
          <Link
            to="/vision/partners"
            className="relative z-10 inline-block font-sans text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors link-reveal pb-0.5"
          >
            See Partnered Churches <IconArrowMicro size={10} className="inline-block ml-1 align-middle" />
          </Link>
        </ScrollReveal>
      </Section>
    </div>
  );
};
