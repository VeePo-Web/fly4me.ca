import { Section } from "@/components/ui/section";
import { SectionHeading, Eyebrow } from "@/components/ui/typography";
import ScrollReveal from "@/components/ScrollReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import { Link } from "react-router-dom";
import { IconArrowMicro } from "@/components/icons/BrandIcons";
import { DollarSign, Car, UtensilsCrossed, Users, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

import glassCost from "@/assets/glass-cost.jpg";
import glassParking from "@/assets/glass-parking.jpg";
import glassFood from "@/assets/glass-food.jpg";
import glassFamilies from "@/assets/glass-families.jpg";
import GlassTexture from "@/components/GlassTexture";

const faqItems: { label: string; desc: string; icon: LucideIcon; num: string; glassImage: string }[] = [
  { label: "Cost", desc: "Completely free. No ticket. No registration. No offering plate. This day is a gift to the city.", icon: DollarSign, num: "01", glassImage: glassCost },
  { label: "Parking", desc: "Free parking at Mitford Park with clear signage. Full details on the Day Details page.", icon: Car, num: "02", glassImage: glassParking },
  { label: "Food", desc: "Food trucks on site all day. You're also welcome to pack a picnic — bring whatever your family enjoys.", icon: UtensilsCrossed, num: "03", glassImage: glassFood },
  { label: "Families", desc: "All ages, all stages. Bring chairs, blankets, strollers, and everything your family needs. We will have bouncy castles for the kids — children are not sidelined here, they are part of the day.", icon: Users, num: "04", glassImage: glassFamilies },
];

/** Gold filigree corner ornament */
const CornerOrnament = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="absolute top-3 right-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
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

export const BeforeYouCome = () => {
  const isMobile = useIsMobile();
  return (
    <Section variant="default" padding="md" className="relative">
      {/* Section counter */}
      <span
        aria-hidden="true"
        className="hidden md:block font-serif text-8xl text-foreground/[0.03] select-none pointer-events-none absolute top-8 left-6"
      >
        06
      </span>

      <ScrollReveal weight="light" delay={0.05}>
        <Eyebrow className="text-muted-foreground mb-3">Everything you need to know</Eyebrow>
      </ScrollReveal>
      <ScrollReveal weight="light">
        <SectionHeading className="mb-10 text-center">Before You Come</SectionHeading>
      </ScrollReveal>

      <div className="w-full max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
        {faqItems.map((item, i) => (
          <ScrollReveal key={item.label} delay={i * 0.08} weight="light" variant={isMobile ? "blur" : "fade"}>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-sm border border-border/30 bg-card/40 hover:bg-card/70 transition-all duration-300 p-6 h-full shadow-[0_1px_0_0_hsl(var(--border)/0.6)] overflow-hidden"
            >
              {/* Top gold accent line — hover reveal */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(90deg, hsl(var(--gold-warm) / 0.3), hsl(var(--primary) / 0.15), transparent)" }}
                aria-hidden="true"
              />

              {/* Left gold accent bar */}
              <div
                className="absolute left-0 top-3 bottom-3 w-px rounded-full transition-all duration-300 overflow-hidden"
                aria-hidden="true"
              >
                <div className="w-full h-full bg-primary/10 group-hover:bg-primary/30 transition-colors duration-300" />
              </div>

              {/* Ghost numeral */}
              <span
                aria-hidden="true"
                className="absolute bottom-2 right-3 font-serif text-5xl text-foreground/[0.03] select-none pointer-events-none leading-none"
              >
                {item.num}
              </span>

              {/* Corner ornament */}
              <CornerOrnament />

              {/* Stained glass image overlay — full-bleed, reveals on hover */}
              <img
                src={item.glassImage}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-[0.30] md:opacity-0 md:group-hover:opacity-[0.30] transition-all duration-1100 pointer-events-none z-[3] mix-blend-multiply scale-100 md:scale-[1.06] md:group-hover:scale-100"
              />

              {/* Glass texture grain + refraction */}
              <GlassTexture />

              {/* Multi-color light wash — simulates sunlight through stained glass on hover */}
              <div
                className="absolute inset-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[4]"
                style={{
                  background: [
                    "radial-gradient(ellipse 60% 50% at 15% 20%, hsl(var(--gold-warm) / 0.06), transparent 70%)",
                    "radial-gradient(ellipse 50% 40% at 50% 50%, hsl(var(--primary) / 0.03), transparent 65%)",
                    "radial-gradient(ellipse 55% 50% at 85% 80%, hsl(var(--gold-haze) / 0.05), transparent 70%)",
                  ].join(", "),
                }}
                aria-hidden="true"
              />

              {/* Lead mullion line — vertical */}
              <div
                className="absolute top-0 bottom-0 w-px scale-y-100 md:scale-y-0 md:group-hover:scale-y-100 transition-transform duration-[600ms] origin-top pointer-events-none z-[6]"
                style={{
                  left: "70%",
                  background: "linear-gradient(to bottom, transparent, hsl(var(--gold-warm) / 0.10), transparent)",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                aria-hidden="true"
              />

              {/* Lead mullion line — horizontal */}
              <div
                className="absolute left-0 right-0 h-px scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-[600ms] origin-left pointer-events-none z-[6]"
                style={{
                  top: "60%",
                  background: "linear-gradient(to right, transparent, hsl(var(--gold-warm) / 0.08), transparent)",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                aria-hidden="true"
              />

              {/* Dark overlay for text readability */}
              <div
                className="absolute inset-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[5]"
                style={{
                   background: "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.20) 60%, rgba(0,0,0,0.30) 100%)",
                   backdropFilter: "blur(1px)",
                 }}
                aria-hidden="true"
              />

              {/* Icon + label */}
              <div className="relative z-10 flex items-center gap-2.5 mb-2.5 pl-2">
                <div className="relative flex items-center justify-center size-9 rounded-sm border border-white/25 bg-white/10 md:border-border/20 md:bg-primary/[0.03] md:group-hover:border-white/25 md:group-hover:bg-white/10 group-hover:scale-[1.06] transition-all duration-300">
                  <item.icon size={15} className="text-white/90 md:text-primary/60 md:group-hover:text-white/90 transition-colors duration-300" />
                </div>
                <span
                  className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-white md:text-foreground md:group-hover:text-white transition-colors duration-500"
                  style={{ fontFeatureSettings: '"cv02"', textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
                >
                  {item.label}
                </span>
              </div>

              {/* Description */}
              <p className="relative z-10 text-[15px] text-white/90 md:text-muted-foreground leading-relaxed max-w-none pl-2 transition-all duration-500 md:group-hover:text-white/90" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.3)" }}>
                {item.desc}
              </p>

              {/* Bottom-edge radial glow on hover */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(ellipse, hsl(var(--primary) / 0.1) 0%, transparent 70%)" }}
                aria-hidden="true"
              />
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      <ScriptureWhisper
        verse="The earth is the Lord's, and everything in it, the world, and all who live in it."
        reference="Psalm 24:1"
        delay={0.35}
        className="mt-4"
      />

      <ScrollReveal delay={0.45} weight="light">
        <Link
          to="/faq"
          className="inline-block font-sans text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors link-reveal pb-0.5"
        >
          Full FAQ <IconArrowMicro size={10} className="inline-block ml-1 align-middle" />
        </Link>
      </ScrollReveal>
    </Section>
  );
};
