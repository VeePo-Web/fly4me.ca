import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { StandardText, Eyebrow } from "./typography";
import TextReveal from "@/components/TextReveal";
import heroCover from "@/assets/hero-cover.jpg";

const easeHeavy: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface SubPageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image?: string;
}

export const SubPageHeader = ({ title, subtitle, eyebrow, image }: SubPageHeaderProps) => {
  const heroImage = image || heroCover;
  const containerRef = useRef<HTMLElement>(null);
  
  // Subtle parallax on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden">
      {/* Background image — contextual per section with parallax */}
      <div className="absolute inset-0 max-h-[50dvh] sm:max-h-none">
        <motion.img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover will-change-transform"
          loading="eager"
          style={{ y: imageY, scale: imageScale }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, hsl(var(--background) / 0.82), hsl(var(--background) / 0.72) 50%, hsl(var(--background) / 0.78))",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 50% 70% at 70% 50%, hsl(38 50% 65% / 0.04), transparent 70%)",
          }}
        />
      </div>

      {/* Film grain texture — cinematic depth matching hero */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.018] mix-blend-overlay"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Edge vignette — subtle cinematic framing */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 50%, hsl(var(--background) / 0.12) 100%)",
        }}
      />

      {/* Ghost cross watermark */}
      <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 pointer-events-none z-[1]" aria-hidden="true">
        <div className="relative">
          <div className="w-px h-24 bg-foreground/[0.025] animate-cross-breathe" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-16 h-px bg-foreground/[0.025] animate-cross-breathe" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 sm:pt-32 md:pt-36 pb-20 sm:pb-[5.5rem] md:pb-24">
        <div className="max-w-4xl">
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeHeavy, delay: 0.2 }}
              className="mb-4"
            >
              <Eyebrow className="text-muted-foreground">{eyebrow}</Eyebrow>
            </motion.div>
          )}

          <h1
            className="font-serif text-4xl sm:text-[2.75rem] md:text-5xl lg:text-6xl font-light tracking-tight mb-6"
            style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
          >
            <TextReveal delay={0.4} duration={1.0}>
              {title}
            </TextReveal>
          </h1>

          {/* Editorial separator — CSS-only entrance */}
          <div
            className="flex items-center mb-6 animate-[separator-reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_0.7s_both]"
            style={{ transformOrigin: "left" }}
            aria-hidden="true"
          >
            <div
              className="w-12 h-px"
              style={{ background: "linear-gradient(90deg, hsl(var(--primary) / 0.3), hsl(var(--gold-warm) / 0.15))" }}
            />
            {/* Diamond terminal — recurring brand jewel motif */}
            <svg width="5" height="5" viewBox="0 0 5 5" className="mx-0.5 opacity-0 animate-[ornament-bloom_0.5s_cubic-bezier(0.16,1,0.3,1)_1.0s_both]" aria-hidden="true">
              <rect x="2.5" y="0.15" width="3.2" height="3.2" rx="0.3" transform="rotate(45 2.5 0.15)" fill="hsl(var(--gold-warm))" fillOpacity="0.14" stroke="hsl(var(--gold-warm))" strokeWidth="0.4" strokeOpacity="0.10" />
            </svg>
            <div className="relative w-[8px] h-[12px] mx-1 opacity-0 animate-[ornament-bloom_0.5s_cubic-bezier(0.16,1,0.3,1)_1.2s_both]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full" style={{ background: "hsl(var(--gold-warm) / 0.18)" }} />
              <div className="absolute top-[4px] left-0 w-full h-px animate-[ornament-pulse_6s_ease-in-out_infinite]" style={{ background: "hsl(var(--gold-warm) / 0.15)" }} />
            </div>
            <div
              className="w-6 h-px"
              style={{ background: "linear-gradient(90deg, hsl(var(--gold-warm) / 0.12), transparent)" }}
            />
          </div>

          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeHeavy, delay: 0.6 }}
            >
              <StandardText className="text-xl md:text-2xl max-w-2xl text-foreground/85">
                {subtitle}
              </StandardText>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll cue — CSS-only breathing chevron, no JS overhead */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-[scroll-cue_3s_ease-in-out_1.5s_infinite] opacity-0"
        style={{ animationFillMode: "backwards" }}
        aria-hidden="true"
      >
        <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
          <path d="M1 1L8 6L15 1" stroke="hsl(var(--foreground))" strokeWidth="0.8" strokeLinecap="round" strokeOpacity="0.14" />
        </svg>
      </div>

      {/* Bottom gradient fade — replaces hard border for seamless editorial flow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 z-[3] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to bottom, transparent, hsl(var(--background) / 0.6) 60%, hsl(var(--background)))",
        }}
      />
    </section>
  );
};