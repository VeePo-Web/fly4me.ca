import { useRef } from "react";
import { IconArrowRight } from "@/components/icons/BrandIcons";
import { Section } from "@/components/ui/section";
import { SectionHeading, StandardText } from "@/components/ui/typography";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const easeHeavy: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const VisionTease = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.025, 0.025, 0]);
  const watermarkRotate = useTransform(scrollYProgress, [0, 1], [-6, -4]);

  /* Subtle gold ambient glow that fades in mid-section */
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 0.03, 0]);

  return (
    <div ref={sectionRef}>
      <ScrollReveal weight="heavy">
        <Section variant="muted" padding="lg" className="text-center relative overflow-hidden">
          {/* Section counter with animated entrance */}
          <motion.span
            aria-hidden="true"
            className="font-serif text-8xl text-foreground/[0.03] select-none pointer-events-none absolute top-8 left-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: easeHeavy }}
          >
            02
          </motion.span>

          {/* Scripture watermark — parallax drift with subtle rotation */}
          <motion.span
            aria-hidden="true"
            className="font-serif text-[10rem] md:text-[16rem] text-foreground/[0.025] select-none pointer-events-none absolute -left-10 top-1/2 -translate-y-1/2 whitespace-nowrap leading-none"
            style={{ y: watermarkY, opacity: watermarkOpacity, rotate: watermarkRotate }}
          >
            2 CHRONICLES 7:14
          </motion.span>

          {/* Ambient gold glow — editorial luxury touch */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              opacity: glowOpacity,
              background: "radial-gradient(ellipse 40% 50% at 50% 40%, hsl(var(--gold-warm) / 0.08), transparent 60%)",
            }}
            aria-hidden="true"
          />

          {/* Decorative brow-line — upgraded to gradient with breathing dot */}
          <ScrollReveal weight="light" delay={0.05}>
            <div className="flex justify-center items-center gap-2 mb-5">
              <div
                className="w-8 h-px"
                style={{ background: "linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.1))" }}
              />
              <motion.svg
                width="7" height="7" viewBox="0 0 7 7" fill="none"
                animate={{ opacity: [0.08, 0.2, 0.08] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              >
                <rect x="3.5" y="0.3" width="4.2" height="4.2" rx="0.4" transform="rotate(45 3.5 0.3)" stroke="hsl(var(--gold-warm))" strokeWidth="0.5" fill="hsl(var(--gold-warm))" fillOpacity="0.1" />
              </motion.svg>
              <div
                className="w-8 h-px"
                style={{ background: "linear-gradient(270deg, transparent, hsl(var(--foreground) / 0.1))" }}
              />
            </div>
          </ScrollReveal>

          <SectionHeading className="mb-4 relative z-10">
            <TextReveal delay={0.1}>Why This Day Exists</TextReveal>
          </SectionHeading>
          <ScrollReveal weight="normal" delay={0.3}>
            <StandardText className="max-w-xl mx-auto mb-6 relative z-10">
              For years, Cochrane's churches have prayed together behind closed doors — interceding for their neighbours, for healing, for revival. 
              This is the day that prayer moves into the open. A shared offering to God and a visible declaration to the city: 
              we are one body, serving one King, loving one community.
            </StandardText>
          </ScrollReveal>
          <ScriptureWhisper
            verse="For where two or three gather in my name, there am I with them."
            reference="Matthew 18:20"
            variant="anchor"
            delay={0.5}
            className="relative z-10 mb-6"
          />
          <ScrollReveal weight="light" delay={0.6}>
            <Link
              to="/vision"
              className="relative z-10 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors duration-300 link-reveal pb-0.5 group"
            >
              Read the Full Vision
              <motion.span
                className="inline-block"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3, ease: easeHeavy }}
              >
                <IconArrowRight size={12} className="ml-1" />
              </motion.span>
            </Link>
          </ScrollReveal>

          {/* Bottom decorative cross — barely visible, editorial rhythm */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <line x1="5" y1="0" x2="5" y2="16" stroke="hsl(var(--foreground))" strokeWidth="0.4" opacity="0.03" />
              <line x1="1" y1="5" x2="9" y2="5" stroke="hsl(var(--foreground))" strokeWidth="0.4" opacity="0.03" />
              <circle cx="5" cy="5" r="0.5" fill="hsl(var(--gold-warm))" fillOpacity="0.06" />
            </svg>
          </motion.div>
        </Section>
      </ScrollReveal>
    </div>
  );
};
