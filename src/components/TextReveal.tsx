import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

const easeHeavy: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  staggerDelay?: number;
  duration?: number;
  /** When true, uses animate instead of whileInView — for elements already in viewport (e.g. hero after veil) */
  triggerOnMount?: boolean;
  /** Reveal direction: 'up' slides from below (default), 'down' from above */
  direction?: "up" | "down";
}

/**
 * Splits children text into lines (by <br/> or newline) and animates
 * each line with a translateY(100%) → 0 clip reveal.
 * For single-line text, wraps in one overflow-hidden block.
 */
const TextReveal = ({
  children,
  className,
  delay = 0,
  staggerDelay = 0.1,
  duration = 0.8,
  triggerOnMount = false,
  direction = "up",
}: TextRevealProps) => {
  const lines: ReactNode[] = [];
  const prefersReducedMotion = useReducedMotion();

  if (typeof children === "string") {
    children.split("\n").forEach((line) => lines.push(line));
  } else {
    const flatChildren = Array.isArray(children) ? children : [children];
    flatChildren.forEach((child) => lines.push(child));
  }

  // Respect prefers-reduced-motion: show immediately with simple fade
  if (prefersReducedMotion) {
    return (
      <span className={className} aria-label={typeof children === "string" ? children : undefined}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            <motion.span
              className="block"
              initial={{ opacity: 0 }}
              {...(triggerOnMount
                ? { animate: { opacity: 1 } }
                : { whileInView: { opacity: 1 }, viewport: { once: true } }
              )}
              transition={{ duration: 0.15, delay: Math.min(delay, 0.1) }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    );
  }

  const initialY = direction === "up" ? "100%" : "-100%";

  return (
    <span className={className} aria-label={typeof children === "string" ? children : undefined}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block will-change-transform"
            initial={{ y: initialY, opacity: 0.6 }}
            {...(triggerOnMount
              ? { animate: { y: "0%", opacity: 1 } }
              : { whileInView: { y: "0%", opacity: 1 }, viewport: { once: true, margin: "-60px" } }
            )}
            transition={{
              duration,
              delay: delay + i * staggerDelay,
              ease: easeHeavy,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default TextReveal;
