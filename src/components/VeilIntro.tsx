import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ============================================================
 *  DO NOT MODIFY THIS COMPONENT
 *  The VeilIntro animation is finalized. Any changes to timing,
 *  visuals, or structure must be approved explicitly.
 *  Last locked: 2026-03-11
 * ============================================================
 */

/**
 * VeilIntro — Sacred theatre curtain animation
 *
 * Near-black velvet curtain halves part to reveal light.
 * Matthew 27:51 — the veil torn.
 *
 * Phases:
 *   0. darkness  — warmth pulse + grain, 1.5s
 *   1. scripture — verse fades line-by-line, 3.5s
 *   2. tear      — seam rip flash, curtains part with weight
 *   3. done      — unmount
 */

// Easing curves
const easeTheatre: [number, number, number, number] = [0.22, 1, 0.36, 1];
const easeHeavy: [number, number, number, number] = [0.16, 1, 0.3, 1];
const easeScripture: [number, number, number, number] = [0.4, 0, 0.2, 1];

type Phase = "darkness" | "scripture" | "tear" | "done";

const VeilIntro = () => {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<Phase>("darkness");

  const startSequence = useCallback(() => {
    setShow(true);
    sessionStorage.setItem("veil-played", "1");

    const timers = [
      setTimeout(() => setPhase("scripture"), 1500),
      setTimeout(() => setPhase("tear"), 5000),
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("veil-complete"));
        setPhase("done");
      }, 7200),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("veil-played")) return;
    return startSequence();
  }, [startSequence]);

  if (!show) return null;

  const isVisible = phase !== "done";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          data-veil-intro
          className="fixed inset-0 z-[10000] pointer-events-auto overflow-hidden"
          initial={{ backgroundColor: "hsl(0, 0%, 3%)" }}
          animate={phase === "tear" ? { backgroundColor: "hsla(0, 0%, 3%, 0)" } : { backgroundColor: "hsl(0, 0%, 3%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          aria-hidden="true"
        >
          {/* Film grain overlay — very subtle */}
          <div
            className="absolute inset-0 z-[0] pointer-events-none opacity-[0.015] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          {/* Darkness warmth pulse */}
          <motion.div
            className="absolute inset-0 z-[0]"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 60%, hsla(30, 70%, 40%, 0.06), transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={
              phase === "darkness"
                ? { opacity: [0, 1, 0.4, 0.9, 0] }
                : { opacity: 0 }
            }
            transition={
              phase === "darkness"
                ? { duration: 2.0, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }
                : { duration: 0.3 }
            }
          />

          {/* Stage footlights — softened */}
          <motion.div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background: "linear-gradient(to top, hsla(35, 85%, 55%, 0.03) 0%, hsla(35, 80%, 50%, 0.01) 30%, transparent 60%)",
            }}
            initial={{ opacity: 0 }}
            animate={phase === "scripture" || phase === "tear" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Center seam gold line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px z-[3] -translate-x-1/2"
            style={{
              background: "linear-gradient(to bottom, transparent 5%, hsla(38, 70%, 50%, 0.3) 20%, hsla(38, 70%, 50%, 0.4) 50%, hsla(38, 70%, 50%, 0.3) 80%, transparent 95%)",
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={
              phase === "scripture"
                ? { opacity: 1, scaleY: 1 }
                : phase === "tear"
                ? { opacity: 0 }
                : { opacity: 0, scaleY: 0 }
            }
            transition={{
              duration: phase === "scripture" ? 1.5 : 0.3,
              delay: phase === "scripture" ? 1.0 : 0,
              ease: easeHeavy,
            }}
          />

          {/* Seam rip flash */}
          <SeamRipFlash phase={phase} />

          {/* Light bloom from center */}
          <motion.div
            className="absolute inset-0 z-[1] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={phase === "tear" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, ease: easeTheatre }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
              background: `radial-gradient(
                  ellipse 8% 60% at 50% 50%,
                  hsla(38, 80%, 65%, 0.15) 0%,
                  hsla(35, 75%, 55%, 0.08) 20%,
                  hsla(30, 60%, 45%, 0.03) 45%,
                  transparent 70%
                )`,
              }}
              initial={{ scaleX: 0, transformOrigin: "center center" }}
              animate={phase === "tear" ? { scaleX: 2.5 } : { scaleX: 0 }}
              transition={{ duration: 1.5, ease: easeTheatre }}
            />
          </motion.div>

          {/* Left curtain half */}
          <VeilHalf side="left" phase={phase} />

          {/* Right curtain half */}
          <VeilHalf side="right" phase={phase} />

          {/* Scripture */}
          <ScriptureOverlay phase={phase} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * SeamRipFlash — Bright vertical pulse right before curtains part
 */
const SeamRipFlash = ({ phase }: { phase: Phase }) => (
  <motion.div
    className="absolute left-1/2 top-0 bottom-0 w-[2px] z-[3] -translate-x-1/2"
    style={{
      background: "linear-gradient(to bottom, transparent 5%, hsla(38, 85%, 70%, 0.4) 20%, hsla(38, 90%, 80%, 0.5) 50%, hsla(38, 85%, 70%, 0.4) 80%, transparent 95%)",
    }}
    initial={{ opacity: 0, scaleY: 0 }}
    animate={
      phase === "tear"
        ? { opacity: [0, 1, 1, 0], scaleY: [0, 1, 1, 1] }
        : { opacity: 0, scaleY: 0 }
    }
    transition={
      phase === "tear"
        ? { duration: 0.5, times: [0, 0.4, 0.7, 1], ease: easeHeavy }
        : { duration: 0.2 }
    }
  />
);

/**
 * VeilHalf — One half of the velvet curtain with simplified folds
 */
const VeilHalf = ({
  side,
  phase,
}: {
  side: "left" | "right";
  phase: Phase;
}) => {
  const isLeft = side === "left";

  const getTransform = () => {
    if (phase === "tear") {
      return {
        x: isLeft ? "-105%" : "105%",
        rotateY: isLeft ? 3 : -3,
        skewX: 0,
      };
    }
    if (phase === "scripture") {
      return {
        x: isLeft ? "-0.8%" : "0.8%",
        rotateY: 0,
        skewX: 0,
      };
    }
    return { x: "0%", rotateY: 0, skewX: 0 };
  };

  // Simplified: 3 folds per side, slightly stronger opacity
  const folds = isLeft
    ? [
        { pos: "20%", width: "10%", highlight: true },
        { pos: "50%", width: "14%", highlight: false },
        { pos: "80%", width: "8%", highlight: true },
      ]
    : [
        { pos: "12%", width: "8%", highlight: true },
        { pos: "40%", width: "14%", highlight: false },
        { pos: "72%", width: "10%", highlight: true },
      ];

  return (
    <motion.div
      className={`absolute ${isLeft ? "left-0" : "right-0"} top-0 w-1/2 h-full z-[4]`}
      style={{
        backgroundColor: "hsl(0, 30%, 6%)",
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      initial={{ x: "0%", rotateY: 0, skewX: 0 }}
      animate={getTransform()}
      transition={
        phase === "tear"
          ? {
              duration: 2.2,
              ease: easeTheatre,
              skewX: {
                duration: 2.6,
                ease: [0.25, 1, 0.5, 1],
              },
            }
          : phase === "scripture"
          ? {
              duration: 2.0,
              delay: 2.0,
              ease: "easeInOut",
              repeat: 1,
              repeatType: "reverse" as const,
            }
          : { duration: 0.5 }
      }
    >
      {/* Base velvet gradient — near-black with warm hint */}
      <div
        className="absolute inset-0"
        style={{
          background: isLeft
            ? "linear-gradient(to right, hsl(0, 25%, 5%) 0%, hsl(0, 35%, 9%) 30%, hsl(0, 35%, 9%) 70%, hsl(0, 30%, 7%) 100%)"
            : "linear-gradient(to left, hsl(0, 25%, 5%) 0%, hsl(0, 35%, 9%) 30%, hsl(0, 35%, 9%) 70%, hsl(0, 30%, 7%) 100%)",
        }}
      />

      {/* Velvet texture — subtle vertical threads */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            to right,
            transparent 0px,
            transparent 3px,
            rgba(255,255,255,0.1) 3px,
            rgba(255,255,255,0.1) 4px,
            transparent 4px,
            transparent 8px
          )`,
        }}
      />

      {/* Gathered fold highlights and shadows — simplified */}
      {folds.map((fold, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0"
          style={{
            left: fold.pos,
            width: fold.width,
            background: fold.highlight
              ? "linear-gradient(to right, transparent, rgba(255,220,200,0.04) 40%, rgba(255,220,200,0.05) 50%, rgba(255,220,200,0.04) 60%, transparent)"
              : "linear-gradient(to right, transparent, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.08) 60%, transparent)",
          }}
        />
      ))}

      {/* Fabric grain noise */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Gold trim along center seam edge */}
      <div
        className={`absolute ${isLeft ? "right-0" : "left-0"} top-0 bottom-0 w-[2px]`}
        style={{
          background: "linear-gradient(to bottom, hsla(38, 70%, 50%, 0.15) 0%, hsla(38, 75%, 55%, 0.25) 20%, hsla(38, 75%, 55%, 0.3) 50%, hsla(38, 75%, 55%, 0.25) 80%, hsla(38, 70%, 50%, 0.15) 100%)",
        }}
      />

      {/* Inner edge shadow */}
      <div
        className={`absolute ${isLeft ? "right-0" : "left-0"} top-0 bottom-0 w-6`}
        style={{
          background: isLeft
            ? "linear-gradient(to left, rgba(0,0,0,0.25), transparent)"
            : "linear-gradient(to right, rgba(0,0,0,0.25), transparent)",
        }}
      />
    </motion.div>
  );
};

/**
 * ScriptureOverlay — Matthew 27:51 with line-by-line reveal
 */
const ScriptureOverlay = ({ phase }: { phase: Phase }) => {
  const isVisible = phase === "scripture";

  const lines = [
    "At that moment",
    "the curtain of the temple",
    "was torn in two,",
    "from top to bottom.",
  ];

  return (
    <motion.div
      className="absolute inset-0 z-[7] flex items-center justify-center px-8"
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: isVisible ? 0.6 : 0.4,
        ease: "easeOut",
      }}
    >
      <div className="flex flex-col items-center gap-6 max-w-xl">
        {/* Decorative brow-line */}
        <motion.div
          className="w-12 h-px"
          style={{ backgroundColor: "hsla(38, 60%, 55%, 0.4)" }}
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.0, delay: isVisible ? 0.2 : 0, ease: easeHeavy }}
        />

        {/* Scripture lines — staggered reveal */}
        <div className="flex flex-col items-center">
          {lines.map((line, i) => (
            <motion.span
              key={i}
              className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-center leading-[1.6] tracking-[-0.01em]"
              style={{
                color: "hsla(0, 0%, 100%, 0.7)",
                fontFeatureSettings: '"liga" 1, "dlig" 1, "kern" 1',
                textShadow: "0 1px 12px hsla(38, 50%, 40%, 0.15)",
                display: "block",
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={
                isVisible
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 8 }
              }
              transition={{
                duration: 0.9,
                delay: isVisible ? 0.3 + i * 0.4 : 0,
                ease: easeScripture,
              }}
            >
              {line}
            </motion.span>
          ))}
        </div>

        {/* Reference */}
        <motion.span
          className="font-sans text-[10px] uppercase tracking-[0.4em] mt-2"
          style={{ color: "hsla(38, 50%, 65%, 0.6)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, delay: isVisible ? 2.0 : 0, ease: "easeOut" }}
        >
          Matthew 27 : 51 <span style={{ color: "hsla(38, 50%, 65%, 0.35)" }}>&middot; NIV</span>
        </motion.span>

        {/* Bottom brow-line */}
        <motion.div
          className="w-8 h-px"
          style={{ backgroundColor: "hsla(38, 50%, 50%, 0.25)" }}
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: isVisible ? 2.2 : 0, ease: easeHeavy }}
        />
      </div>
    </motion.div>
  );
};

export default VeilIntro;
