import { motion, useTransform, type MotionValue } from "framer-motion";

interface FooterAtmosphereProps {
  scrollYProgress: MotionValue<number>;
}

/** Minimal atmosphere: film grain + breathing vignette only. */
const FooterAtmosphere = ({ scrollYProgress }: FooterAtmosphereProps) => {
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.5], [0.35, 0.15]);

  return (
    <>
      {/* Film grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
        aria-hidden="true"
      />

      {/* Breathing vignette */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, hsl(var(--foreground) / 0.45) 100%)",
          opacity: vignetteOpacity,
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default FooterAtmosphere;
