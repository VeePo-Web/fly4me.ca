import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type Weight = "light" | "normal" | "heavy";
type Variant = "fade" | "clip" | "scale" | "blur";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  weight?: Weight;
  variant?: Variant;
}

const weightConfig = {
  light: {
    offset: 20,
    duration: 0.5,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  },
  normal: {
    offset: 50,
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  },
  heavy: {
    offset: 80,
    duration: 1.2,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
};

const getDirectionOffset = (direction: string, offset: number) => {
  switch (direction) {
    case "up": return { y: offset };
    case "down": return { y: -offset };
    case "left": return { x: offset };
    case "right": return { x: -offset };
    default: return {};
  }
};

const ScrollReveal = ({
  children,
  className,
  delay = 0,
  direction = "up",
  duration,
  weight = "normal",
  variant = "fade",
}: ScrollRevealProps) => {
  const config = weightConfig[weight];
  const finalDuration = duration ?? config.duration;
  const prefersReducedMotion = useReducedMotion();

  // Respect prefers-reduced-motion: show content immediately with a simple fade
  if (prefersReducedMotion) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.15, delay: Math.min(delay, 0.1) }}
      >
        {children}
      </motion.div>
    );
  }

  if (variant === "clip") {
    return (
      <motion.div
        className={className}
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        whileInView={{ clipPath: "inset(0% 0 0 0)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: finalDuration, delay, ease: config.ease }}
      >
        {children}
      </motion.div>
    );
  }

  if (variant === "scale") {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: finalDuration, delay, ease: config.ease }}
      >
        {children}
      </motion.div>
    );
  }

  if (variant === "blur") {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, filter: "blur(8px)", y: 30 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: finalDuration, delay, ease: config.ease }}
      >
        {children}
      </motion.div>
    );
  }

  // Default "fade" variant
  const offset = getDirectionOffset(direction, config.offset);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: finalDuration, delay, ease: config.ease }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
