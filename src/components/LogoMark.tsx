import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const easeHeavy: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface LogoMarkProps {
  size?: number;
  variant?: "default" | "white" | "mono";
  animate?: boolean;
  hoverRed?: boolean;
}

const ThresholdSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 48 60"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    {/* Lintel — overhangs posts for architectural weight */}
    <rect x="2" y="0" width="44" height="11" />
    {/* Left doorpost */}
    <rect x="6" y="11" width="7" height="49" />
    {/* Right doorpost */}
    <rect x="35" y="11" width="7" height="49" />
  </svg>
);

const LogoMark = ({ size = 48, variant = "default", animate = false, hoverRed = false }: LogoMarkProps) => {
  const colorClass =
    variant === "white"
      ? "text-white/95"
      : variant === "mono"
        ? "text-foreground/85"
        : "text-primary";

  const glowBg =
    variant === "white"
      ? "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)"
      : "radial-gradient(circle, hsl(var(--primary) / 0.04) 0%, transparent 70%)";

  const svgElement = (
    <ThresholdSVG
      width={size}
      height={size * 1.25}
      className="relative z-10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
    />
  );

  return (
    <span className={cn("relative inline-flex items-center justify-center transition-colors duration-300", colorClass, hoverRed && "hover:text-blood")}>
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: glowBg, transform: "scale(1.6)" }}
        aria-hidden="true"
      />
      {animate ? (
        <motion.span
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: easeHeavy, delay: 0.15 }}
          className="relative z-10"
        >
          {svgElement}
        </motion.span>
      ) : (
        svgElement
      )}
    </span>
  );
};

export default LogoMark;
