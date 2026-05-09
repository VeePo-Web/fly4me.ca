import { useState, useEffect, useRef } from "react";
import { IconScrollCue, IconCalendarMicro, IconClockMicro, IconPinMicro } from "@/components/icons/BrandIcons";
import { Separator } from "@/components/ui/separator";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Eyebrow } from "@/components/ui/typography";
import TextReveal from "@/components/TextReveal";

const easeHeavy: [number, number, number, number] = [0.16, 1, 0.3, 1];
const easeExpo: [number, number, number, number] = [0.76, 0, 0.24, 1];

export const Hero = () => {
  const [veilActive, setVeilActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [useStaticPoster, setUseStaticPoster] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // @ts-expect-error - non-standard NetworkInformation
    const conn = navigator.connection;
    const slow =
      !!conn &&
      (conn.saveData === true ||
        conn.effectiveType === "2g" ||
        conn.effectiveType === "slow-2g");
    if (reduced || slow) setUseStaticPoster(true);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReady(true);
      return;
    }

    const veilEl = document.querySelector("[data-veil-intro]");
    if (veilEl) {
      setVeilActive(true);
      const onComplete = () => {
        setReady(true);
        window.removeEventListener("veil-complete", onComplete);
      };
      window.addEventListener("veil-complete", onComplete);
      return () => window.removeEventListener("veil-complete", onComplete);
    } else {
      setReady(true);
    }
  }, []);

  // Scroll-driven parallax + content exit
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  const chevronOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const overlayDarken = useTransform(scrollYProgress, [0, 0.6], [0, 0.25]);
  const crossRotate = useTransform(scrollYProgress, [0, 0.5], [0, 2]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.02 && !scrolled) setScrolled(true);
  });

  const d = (postVeil: number, direct: number) =>
    veilActive ? postVeil : direct;

  const shouldAnimate = ready;

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] w-full overflow-hidden hero-bottom-dissolve">
      {/* Hero image — oversized for parallax headroom, subtle scale on scroll */}
      <motion.div
        className="absolute -inset-x-0 -top-[15%] -bottom-0 h-[130%] w-full"
        style={{
          willChange: veilActive ? "filter" : "auto",
          y: imageY,
          scale: imageScale,
        }}
        initial={veilActive ? { filter: "brightness(1.25) saturate(0.85)" } : undefined}
        animate={
          shouldAnimate
            ? { filter: "brightness(1) saturate(1.05)" }
            : veilActive
            ? { filter: "brightness(1.6) saturate(0.7)" }
            : undefined
        }
        transition={{ duration: 3.0, ease: easeHeavy }}
      >
        {useStaticPoster ? (
          <img
            src="/hero/hero-aerial-poster.jpg"
            alt="Aerial view of Cochrane, Alberta at golden hour — mountains framing a small town gathered around a river"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="/hero/hero-aerial-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
          >
            <source src="/hero/hero-aerial.webm" type="video/webm" />
            <source src="/hero/hero-aerial.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* Golden-hour atmospheric haze — warm midtone wash */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, hsla(38, 50%, 70%, 0.06) 0%, hsla(30, 40%, 55%, 0.08) 40%, hsla(25, 30%, 45%, 0.04) 70%, transparent 100%)",
          mixBlendMode: "soft-light",
        }}
      />

      {/* Lens flare — subtle warm bloom at top-right, cinematic touch */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-1/3 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 15%, hsla(38, 70%, 70%, 0.08), transparent 70%)",
        }}
        initial={{ opacity: 0 }}
        animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 3.0, delay: d(1.5, 0.5), ease: "easeOut" }}
      />

      {/* Warm afterglow — golden radial that fades slowly after veil */}
      {veilActive && (
        <motion.div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 20%, hsla(38, 70%, 65%, 0.12), transparent 70%)",
          }}
          initial={{ opacity: 1 }}
          animate={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 6.0, delay: 0.5, ease: "easeOut" }}
        />
      )}

      {/* Top atmospheric gradient — sky darkening for header legibility */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.12) 12%, transparent 28%)",
        }}
      />

      {/* Bottom vignette — text legibility, animates from warm (post-veil) to deep */}
      <motion.div
        className="absolute inset-0 z-[1]"
        initial={
          veilActive
            ? {
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(180,140,60,0.12) 40%, rgba(180,140,60,0.06) 70%, transparent 100%)",
              }
            : undefined
        }
        animate={
          shouldAnimate
            ? {
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 30%, rgba(0,0,0,0.12) 60%, transparent 100%)",
              }
            : veilActive
            ? {
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(180,140,60,0.12) 40%, rgba(180,140,60,0.06) 70%, transparent 100%)",
              }
            : {
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 30%, rgba(0,0,0,0.12) 60%, transparent 100%)",
              }
        }
        transition={{ duration: 2.5, delay: 0.3, ease: easeHeavy }}
      />

      {/* Scroll-linked deepening overlay — darkens as user scrolls */}
      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none bg-black"
        style={{ opacity: overlayDarken }}
      />

      {/* Edge vignette — cinematic depth */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 50%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      {/* Film grain texture — subtle depth */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Cross watermark — drawn from center outward, rotates subtly on scroll */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none"
        aria-hidden="true"
        style={{ opacity: contentOpacity, rotate: crossRotate }}
      >
        {/* Vertical beam */}
        <motion.div
          className="absolute w-px animate-cross-breathe bg-white/[0.04]"
          initial={{ height: 0 }}
          animate={shouldAnimate ? { height: "55vh" } : { height: 0 }}
          transition={{ duration: 1.4, delay: d(0.5, 0), ease: easeExpo }}
        />
        {/* Horizontal beam */}
        <motion.div
          className="absolute h-px -translate-y-[8vh] animate-cross-breathe bg-white/[0.04]"
          initial={{ width: 0 }}
          animate={shouldAnimate ? { width: "28vw" } : { width: 0 }}
          transition={{ duration: 1.2, delay: d(0.8, 0.2), ease: easeExpo }}
        />
      </motion.div>

      {/* Content with scroll-driven exit */}
      <motion.div
        className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-end pb-20 sm:pb-20 md:pb-28 lg:pb-32 px-5 sm:px-6 text-center text-white max-w-4xl mx-auto"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Eyebrow with brow-line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: d(1.0, 0.3), ease: easeHeavy }}
          className="mb-5 md:mb-7 flex flex-col items-center gap-3"
        >
          <motion.div
            className="w-6 h-px bg-white/20"
            initial={{ scaleX: 0 }}
            animate={shouldAnimate ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: d(0.8, 0.2), ease: easeHeavy }}
          />
          <Eyebrow className="text-white/50 tracking-[0.25em] text-[11px] sm:text-[12px]">
            Churches across Cochrane &middot; gathered as one body
          </Eyebrow>
        </motion.div>

        {/* Title — weight-differentiated: "Worship in" light, "the Park" medium */}
        <h1 className="mb-6 md:mb-8 text-shadow-hero text-[2.5rem] sm:text-[3.5rem] md:text-7xl lg:text-8xl xl:text-[8.5rem] tracking-[-0.045em] leading-[0.88]">
          <TextReveal
            delay={d(1.3, 0.5)}
            duration={1.0}
            staggerDelay={0.12}
            triggerOnMount
            className="font-serif"
          >
            {[
              <span key="l1" className="font-light">Worship in</span>,
              <span key="l2" className="font-medium tracking-[-0.035em]">the Park</span>,
            ]}
          </TextReveal>
        </h1>

        {/* Primary separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={shouldAnimate ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: d(1.8, 0.7), ease: easeHeavy }}
          className="mb-6 md:mb-8"
        >
          <Separator className="mx-auto w-10 bg-white/25" />
        </motion.div>

        {/* Scripture — typographic curly quotes, gradient-masked edges */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.9, delay: d(2.2, 0.9), ease: easeHeavy }}
          className="max-w-sm sm:max-w-xl mx-auto mb-5 md:mb-7 px-2 sm:px-0"
        >
          <p
            className="font-serif italic text-[17px] sm:text-lg md:text-2xl text-white leading-[1.75] text-center"
            style={{ fontFeatureSettings: '"liga" 1, "dlig" 1', textShadow: '0 2px 16px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.4)' }}
          >
            {"\u201CIf my people\u2026 will humble themselves"}
            <br className="hidden sm:block" />
            {" and pray\u2026 I will hear from heaven,"}
            <br />
            {"and I will heal their land.\u201D"}
          </p>
          <span
            className="block text-center font-sans text-[11px] sm:text-xs uppercase tracking-[0.2em] text-white/55 mt-3 sm:mt-4"
            style={{ fontFeatureSettings: '"cv02"', textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}
          >
            2 Chronicles 7 : 14 <span className="text-white/40">&middot; NIV</span>
          </span>
        </motion.div>

        {/* Secondary separator — theology / logistics threshold */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={shouldAnimate ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: d(2.5, 1.0), ease: easeHeavy }}
          className="mb-4 md:mb-6"
        >
          <Separator className="mx-auto w-4 bg-white/12" />
        </motion.div>

        {/* Date / time / location */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: d(2.6, 1.1), ease: easeHeavy }}
          className="mb-2"
        >
          <div
            className="font-sans text-[11px] sm:text-[12px] tracking-[0.08em] text-white/45 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-0"
            style={{ fontFeatureSettings: '"cv02"' }}
          >
            <span className="inline-flex items-center gap-1.5">
              <IconCalendarMicro size={10} className="opacity-70" />
              August 8, 2026
            </span>
            <span className="hidden sm:inline mx-3 text-white/12">·</span>
            <span className="inline-flex items-center gap-1.5">
              <IconClockMicro size={10} className="opacity-70" />
              11 AM – 7 PM
            </span>
            <span className="hidden sm:inline mx-3 text-white/12">·</span>
            <span className="inline-flex items-center gap-1.5">
              <IconPinMicro size={10} className="opacity-70" />
              Mitford Park, Cochrane
            </span>
          </div>
        </motion.div>

        {/* Friction removal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: d(3.0, 1.3), ease: easeHeavy }}
        >
          <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.12em] text-white/30 uppercase">
            No ticket &middot; No registration &middot; No barriers &middot; Just come
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll hint — chevron + text label, breathing drift with scroll fade */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity: chevronOpacity }}
      >
        <motion.span
          className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/15"
          initial={{ opacity: 0 }}
          animate={
            shouldAnimate && !scrolled
              ? { opacity: 1 }
              : { opacity: 0 }
          }
          transition={{ duration: 0.5, delay: d(3.8, 2.0) }}
          style={{ fontFeatureSettings: '"cv02"' }}
        >
          Scroll
        </motion.span>
        <motion.div
          initial={{ opacity: 0 }}
          animate={
            shouldAnimate && !scrolled
              ? { opacity: 1, y: [0, 5, 0] }
              : { opacity: 0 }
          }
          transition={
            shouldAnimate && !scrolled
              ? {
                  opacity: { duration: 0.5, delay: d(3.5, 1.8) },
                  y: {
                    duration: 3.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: d(4.0, 2.3),
                  },
                }
              : { duration: 0.3 }
          }
        >
          <IconScrollCue size={18} className="text-white/15" />
        </motion.div>
      </motion.div>
    </section>
  );
};
