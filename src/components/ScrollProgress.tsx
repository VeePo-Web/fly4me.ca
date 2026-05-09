import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * Scroll progress indicator — a thin gold gradient bar at the top of the viewport
 * that fills as the user scrolls down the page.
 */
const ScrollProgress = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Skip for users who prefer reduced motion
  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100] pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--gold-warm)), hsl(var(--primary) / 0.5))",
      }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
