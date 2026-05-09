import { Section } from "@/components/ui/section";
import { SectionHeading, Eyebrow } from "@/components/ui/typography";
import ScrollReveal from "@/components/ScrollReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import { IconWorship, IconPrayerFlame, IconConnect, IconBibleWater } from "@/components/icons/BrandIcons";
import { motion } from "framer-motion";

import expectWorship from "@/assets/expect-worship.jpg";
import expectPrayer from "@/assets/expect-prayer.jpg";
import expectConnect from "@/assets/expect-connect.jpg";
import expectBaptism from "@/assets/expect-baptism.jpg";

import glassWorship from "@/assets/stained-glass-worship.jpg";
import glassPrayer from "@/assets/stained-glass-prayer.jpg";
import glassConnect from "@/assets/stained-glass-connect.jpg";
import glassBaptism from "@/assets/stained-glass-baptism.jpg";
import GlassTexture from "@/components/GlassTexture";
import { useIsMobile } from "@/hooks/use-mobile";

const easeHeavy: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Gold filigree corner ornament — mirrors EditorialCard */
const CornerOrnament = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="absolute top-3 left-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20"
    aria-hidden="true"
  >
    <path
      d="M0,12 L0,3 Q0,0 3,0 L12,0"
      stroke="hsl(var(--gold-warm))"
      strokeWidth="0.5"
      strokeOpacity="0.18"
      fill="none"
    />
    <rect
      x="0" y="0" width="2" height="2" rx="0.3"
      transform="rotate(45 1 1)"
      fill="hsl(var(--gold-warm))"
      fillOpacity="0.1"
    />
  </svg>
);

const items: {
  icon: typeof IconWorship;
  title: string;
  desc: string;
  num: string;
  image: string;
  scripture: string;
  glassImage: string;
}[] = [
  { icon: IconWorship, title: "Continuous Worship", desc: "A full day of unbroken praise — worship teams from churches across Cochrane, each carrying the same flame forward. No performer. No audience. Just the body of Christ lifting one voice from morning until evening.", num: "01", image: expectWorship, scripture: "Sing to the Lord a new song — Psalm 96:1", glassImage: glassWorship },
  { icon: IconPrayerFlame, title: "Prayer Tent", desc: "A quiet space set apart for the sacred and the personal — healing, salvation, encouragement, grief, gratitude, or whatever is on your heart. Trained prayer teams available all day. No pressure. No forms. Just presence.", num: "02", image: expectPrayer, scripture: "The prayer of a righteous person is powerful — James 5:16", glassImage: glassPrayer },
  { icon: IconConnect, title: "Get Connected Tent", desc: "Meet people from local churches. Ask questions you've been carrying. Find a faith community — whether you've walked with God for decades or you're not sure where to begin.", num: "03", image: expectConnect, scripture: "Where two or three gather — Matt. 18:20", glassImage: glassConnect },
  { icon: IconBibleWater, title: "Free Bibles & Baptism", desc: "Free Bibles with someone to help you open to the first page. Baptism available in the Bow River — not through sign-ups or paperwork, but in person, as the Spirit leads. Come as you are.", num: "04", image: expectBaptism, scripture: "Go and make disciples, baptizing them — Matt. 28:19", glassImage: glassBaptism },
];

export const WhatToExpect = () => {
  const isMobile = useIsMobile();
  return (
    <Section variant="muted" padding="md" className="relative">
      {/* Section counter */}
      <motion.span
        aria-hidden="true"
        className="hidden md:block font-serif text-8xl text-foreground/[0.03] select-none pointer-events-none absolute top-8 left-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: easeHeavy }}
      >
        03
      </motion.span>

      <ScrollReveal weight="normal">
        <div className="text-center mb-10">
          <Eyebrow className="mb-3 text-muted-foreground">The day at a glance</Eyebrow>
          <SectionHeading>What to Expect</SectionHeading>
        </div>
      </ScrollReveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        {items.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.1} weight="light" variant={isMobile ? "blur" : "fade"}>
            <motion.div
              className="relative p-6 h-full bg-card transition-all duration-500 shadow-[0_1px_0_0_hsl(var(--border)/0.6)] group rounded-sm overflow-hidden"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: easeHeavy }}
            >
              {/* Background image — very subtle, reveals on hover */}
              <div className="absolute inset-0 z-0">
                <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover opacity-[0.04] group-hover:opacity-[0.1] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] scale-110 group-hover:scale-100"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, hsl(var(--card) / 0.6) 0%, hsl(var(--card) / 0.4) 40%, hsl(var(--card) / 0.8) 100%)",
                  }}
                />
              </div>

              {/* Warm ambient tint at rest */}
              <div
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{
                  background: "radial-gradient(ellipse 100% 80% at 20% 100%, hsl(var(--gold-warm) / 0.025), transparent 60%)",
                }}
                aria-hidden="true"
              />

              {/* Stained glass image overlay — full-bleed, reveals on hover */}
              <img
                src={item.glassImage}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-[0.30] md:opacity-0 md:group-hover:opacity-[0.30] transition-all duration-1100 pointer-events-none z-[3] mix-blend-multiply scale-100 md:scale-[1.06] md:group-hover:scale-100"
              />

              {/* Dark scrim overlay — matches BeforeYouCome treatment */}
              <div
                className="absolute inset-0 z-[5] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.20) 60%, rgba(0,0,0,0.30) 100%)",
                  backdropFilter: "blur(1px)",
                }}
              />

              {/* Glass texture grain + refraction */}
              <GlassTexture />

              {/* Multi-color light wash on hover — boosted intensity */}
              <div
                className="absolute inset-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[4]"
                style={{
                  background: [
                    "radial-gradient(ellipse 60% 50% at 15% 20%, hsl(var(--gold-warm) / 0.07), transparent 70%)",
                    "radial-gradient(ellipse 50% 40% at 50% 50%, hsl(var(--primary) / 0.04), transparent 65%)",
                    "radial-gradient(ellipse 55% 50% at 85% 80%, hsl(var(--gold-haze) / 0.06), transparent 70%)",
                  ].join(", "),
                }}
                aria-hidden="true"
              />

              {/* Corner ornament */}
              <CornerOrnament />

              {/* Top accent line — gold gradient on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10"
                style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold-warm) / 0.2), transparent)" }}
              />

              {/* Lead mullion line — vertical, reveals on hover */}
              <div
                className="absolute top-0 bottom-0 w-px scale-y-100 md:scale-y-0 md:group-hover:scale-y-100 transition-transform duration-[600ms] origin-top pointer-events-none z-[6]"
                style={{
                  left: "70%",
                  background: "linear-gradient(to bottom, transparent, hsl(var(--gold-warm) / 0.12), transparent)",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                aria-hidden="true"
              />

              {/* Lead mullion line — horizontal, forms cross with vertical */}
              <div
                className="absolute left-0 right-0 h-px scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-[600ms] origin-left pointer-events-none z-[6]"
                style={{
                  top: "60%",
                  background: "linear-gradient(to right, transparent, hsl(var(--gold-warm) / 0.10), transparent)",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                aria-hidden="true"
              />

              {/* Bottom edge glow — warm accent */}
              <div
                className="absolute bottom-0 left-[20%] right-[20%] h-8 transition-opacity duration-700 opacity-0 group-hover:opacity-100 pointer-events-none z-10"
                style={{ background: "radial-gradient(ellipse 80% 100% at 50% 100%, hsl(var(--gold-warm) / 0.03), transparent 70%)" }}
                aria-hidden="true"
              />

              {/* Large decorative numeral */}
              <motion.span
                aria-hidden="true"
                className="font-serif text-6xl text-foreground/[0.03] group-hover:text-foreground/[0.05] transition-all duration-500 select-none pointer-events-none absolute top-3 right-4 leading-none z-10"
              >
                {item.num}
              </motion.span>

              {/* Icon container — gold halo on hover */}
              <div className="relative size-10 mb-4 z-10">
                <div
                  className="flex items-center justify-center size-10 rounded-sm bg-white/10 border-white/25 md:bg-primary/[0.03] md:border-border/20 md:group-hover:bg-primary/[0.07] md:group-hover:border-border/40 group-hover:scale-[1.06] transition-all duration-500 backdrop-blur-sm border"
                  style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                >
                  <item.icon size={22} className="text-white/90 md:text-muted-foreground md:group-hover:text-white/90 transition-colors duration-500" />
                </div>
              </div>

              <h3
                className="relative z-10 font-sans text-sm font-medium uppercase tracking-[0.12em] mb-2 transition-all duration-500 text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.5),0_2px_12px_rgba(0,0,0,0.3)] md:text-foreground md:[text-shadow:none] md:group-hover:text-white md:group-hover:[text-shadow:0_1px_4px_rgba(0,0,0,0.5),0_2px_12px_rgba(0,0,0,0.3)]"
                style={{ fontFeatureSettings: '"cv02"' }}
              >
                {item.title}
              </h3>
              <p
                className="relative z-10 text-sm sm:text-[15px] leading-relaxed max-w-none transition-all duration-500 text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.5),0_2px_10px_rgba(0,0,0,0.3)] md:text-muted-foreground md:[text-shadow:none] md:group-hover:text-white/90 md:group-hover:[text-shadow:0_1px_4px_rgba(0,0,0,0.5),0_2px_10px_rgba(0,0,0,0.3)]"
              >{item.desc}</p>

              {/* Scripture whisper */}
              <p
                className="relative z-10 font-serif italic text-xs tracking-[0.04em] text-white/85 md:text-primary/50 md:group-hover:text-white/85 transition-colors duration-700 mt-4 leading-relaxed"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", transitionDelay: "150ms" }}
              >
                <span className="text-white/40 md:text-[hsl(var(--gold-warm)/0.25)] md:group-hover:text-white/40 transition-colors duration-700 mr-1.5" aria-hidden="true">—</span>
                {item.scripture}
              </p>

            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      <ScriptureWhisper
        verse="They devoted themselves to the apostles' teaching and to fellowship, to the breaking of bread and to prayer."
        reference="Acts 2:42"
        delay={0.5}
      />
    </Section>
  );
};
