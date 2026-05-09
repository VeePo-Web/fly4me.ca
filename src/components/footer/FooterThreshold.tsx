import { motion, useTransform, type MotionValue } from "framer-motion";

interface FooterThresholdProps {
  scrollYProgress: MotionValue<number>;
}

/** Clean gradient bridge — smooth light-to-dark transition into the footer. */
const FooterThreshold = ({ scrollYProgress }: FooterThresholdProps) => {
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.2], [0, 0.6, 1]);

  return (
    <motion.div
      className="absolute top-0 left-0 right-0 z-30 pointer-events-none select-none overflow-hidden"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div
        className="absolute -top-24 left-0 right-0 h-24"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, hsl(var(--foreground) / 0.4) 60%, hsl(var(--foreground)) 100%)",
        }}
      />
    </motion.div>
  );
};

export default FooterThreshold;
