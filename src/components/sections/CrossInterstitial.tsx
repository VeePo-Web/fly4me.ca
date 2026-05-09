import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import crossField from "@/assets/cross-field.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const easeHeavy: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const CrossInterstitial = () => {
  const ref = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0.25, 0.45, 0.65, 0.85], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.3, 0.6], [20, -10]);
  const scaleImg = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.02]);

  /* Lens warmth — golden-hour overlay that fades with scroll */
  const lensOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 0.06, 0]);

  /* Cross nail glow — intensifies as scripture appears */
  const nailGlow = useTransform(scrollYProgress, [0.35, 0.55], [0, 0.15]);

  return (
    <ScrollReveal direction="none" duration={1.5} weight="heavy">
      <section ref={ref} className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <motion.div
          className="absolute inset-x-0 -top-[10%] h-[120%]"
          style={reducedMotion ? undefined : { y, scale: scaleImg }}
        >
          <img
            src={crossField}
            alt="A rough-hewn wooden cross standing alone in a prairie field at golden hour"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Deep overlay for contrast — warmer tone */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(40,20,10,0.12), rgba(0,0,0,0.38) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Golden-hour lens warmth — subtle atmospheric color grading */}
        <motion.div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            opacity: lensOpacity,
            background: "radial-gradient(ellipse 60% 50% at 55% 40%, hsla(38, 70%, 65%, 0.15), transparent 60%)",
            mixBlendMode: "soft-light",
          }}
          aria-hidden="true"
        />

        {/* Film grain overlay */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
          aria-hidden="true"
        />

        {/* Edge vignette — cinematic framing */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 45%, rgba(0,0,0,0.2) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Decorative horizontal rules — editorial framing with gold center */}
        <div className="absolute left-6 md:left-12 right-6 md:right-12 top-1/2 -translate-y-1/2 z-[4] pointer-events-none flex items-center gap-2" aria-hidden="true">
          <div className="flex-1 h-px bg-white/[0.06]" />
          {/* Gold diamond nail mark — branded center terminal */}
          <motion.svg width="7" height="7" viewBox="0 0 7 7" fill="none" style={{ opacity: nailGlow }}>
            <rect x="3.5" y="0.3" width="4.2" height="4.2" rx="0.4" transform="rotate(45 3.5 0.3)" stroke="hsl(var(--gold-warm))" strokeWidth="0.5" fill="hsl(var(--gold-warm))" fillOpacity="0.12" />
          </motion.svg>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* Scroll-driven scripture overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{
            opacity: reducedMotion ? 0.8 : overlayOpacity,
            y: reducedMotion ? 0 : textY,
          }}
        >
          <div className="flex flex-col items-center gap-4 px-6">
            {/* Bespoke cross above quote — SVG with nail stigmata */}
            <svg width="18" height="28" viewBox="0 0 18 28" fill="none" aria-hidden="true">
              <line x1="9" y1="0" x2="9" y2="28" stroke="white" strokeWidth="0.5" opacity="0.18" />
              <line x1="2" y1="8" x2="16" y2="8" stroke="white" strokeWidth="0.5" opacity="0.18" />
              {/* Nail marks */}
              <circle cx="9" cy="8" r="1" fill="hsl(var(--gold-warm))" fillOpacity="0.1" />
              <circle cx="3.5" cy="8" r="0.6" fill="white" fillOpacity="0.06" />
              <circle cx="14.5" cy="8" r="0.6" fill="white" fillOpacity="0.06" />
              <circle cx="9" cy="23" r="0.6" fill="white" fillOpacity="0.06" />
            </svg>
            <p
              className="font-serif italic text-lg md:text-2xl lg:text-3xl text-white/90 text-center max-w-md text-shadow-hero leading-snug"
              style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
            >
              &ldquo;He himself bore our sins in his body on the cross, so that we might die to sins and live for righteousness.&rdquo;
            </p>
            <span
              className="text-[11px] not-italic uppercase tracking-[0.2em] text-white/40 font-sans"
              style={{ fontFeatureSettings: '"cv02"' }}
            >
              1 Peter 2 : 24 <span className="text-white/20">&middot; NIV</span>
            </span>
            {/* Whisper beneath — barely visible reflection */}
            <motion.span
              className="text-[7px] font-sans tracking-[0.2em] text-white/[0.08] mt-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              by his wounds you have been healed
            </motion.span>
          </div>
        </motion.div>

        {/* Top/bottom gradient bleeds */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-background to-transparent z-[3]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-muted to-transparent z-[3]" />
      </section>
    </ScrollReveal>
  );
};
