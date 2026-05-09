import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

const easeExpo: [number, number, number, number] = [0.76, 0, 0.24, 1];
const easeHeavy: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PageTransition = ({ children }: { children: ReactNode }) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Page content — gentle fade + lift + subtle blur clear */}
      <motion.div
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: easeHeavy, delay: 0.3 },
        }}
        exit={{
          opacity: 0,
          y: -6,
          transition: { duration: 0.25, ease: "easeIn" },
        }}
      >
        {children}
      </motion.div>

      {/* Cream backdrop — warmer than muted */}
      <motion.div
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{ backgroundColor: "hsl(var(--cream))" }}
        initial={{ opacity: 1 }}
        animate={{
          opacity: 0,
          transition: { duration: 0.4, delay: 0.15 },
        }}
        exit={{
          opacity: 1,
          transition: { duration: 0.35 },
        }}
      />

      {/* Cross — vertical line */}
      <motion.div
        className="fixed inset-0 z-[9999] pointer-events-none flex justify-center"
        initial={{ scaleY: 1 }}
        animate={{
          scaleY: 0,
          transition: { duration: 0.5, ease: easeExpo, delay: 0.05 },
        }}
        exit={{
          scaleY: 1,
          transition: { duration: 0.4, ease: easeExpo },
        }}
        style={{ transformOrigin: "center" }}
      >
        <div className="w-px h-full bg-foreground/15" />
      </motion.div>

      {/* Cross — horizontal line (50ms stagger for drawing feel) */}
      <motion.div
        className="fixed left-0 right-0 z-[9999] pointer-events-none"
        style={{ top: "33%", transformOrigin: "center" }}
        initial={{ scaleX: 1 }}
        animate={{
          scaleX: 0,
          transition: { duration: 0.5, ease: easeExpo, delay: 0.1 },
        }}
        exit={{
          scaleX: 1,
          transition: { duration: 0.4, ease: easeExpo, delay: 0.05 },
        }}
      >
        <div className="h-px w-full bg-foreground/15" />
      </motion.div>

      {/* Center dot — tiny cross intersection accent */}
      <motion.div
        className="fixed z-[9999] pointer-events-none"
        style={{ top: "33%", left: "50%", transform: "translate(-50%, -50%)" }}
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{
          opacity: 0,
          scale: 0,
          transition: { duration: 0.3, ease: easeExpo, delay: 0.2 },
        }}
        exit={{
          opacity: 0.5,
          scale: 1,
          transition: { duration: 0.3, ease: easeExpo, delay: 0.1 },
        }}
      >
        <div className="size-1.5 rounded-full bg-primary/20" />
      </motion.div>
    </>
  );
};

export default PageTransition;
