import { cn } from "@/lib/utils";

interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

/**
 * Bespoke brand icon library — hand-crafted SVG symbols
 * aligned with the Worship in the Park visual identity.
 * Each icon carries theological symbolism and editorial craft.
 */

/** Raised hands in worship — continuous worship symbol */
export const IconWorship = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("", className)}>
    {/* Left hand raised */}
    <path
      d="M7 18 L7 10 Q7 7 9 6 L9 4"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 18 L5 12 Q5 9 7 8"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.5"
    />
    {/* Right hand raised */}
    <path
      d="M17 18 L17 10 Q17 7 15 6 L15 4"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 18 L19 12 Q19 9 17 8"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.5"
    />
    {/* Radiance lines above */}
    <path d="M12 3 L12 1" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" opacity="0.35" />
    <path d="M9 4 L8 2.5" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.25" />
    <path d="M15 4 L16 2.5" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.25" />
    {/* Ground line */}
    <path d="M4 20 L20 20" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.15" />
  </svg>
);

/** Candle flame — prayer tent symbol */
export const IconPrayerFlame = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("", className)}>
    {/* Candle body */}
    <rect x="10" y="13" width="4" height="8" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    {/* Wick */}
    <line x1="12" y1="13" x2="12" y2="10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    {/* Flame — organic teardrop */}
    <path
      d="M12 3 Q14.5 6 14 8.5 Q13.5 10.5 12 10.5 Q10.5 10.5 10 8.5 Q9.5 6 12 3Z"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Inner flame glow */}
    <path
      d="M12 6 Q13 7.5 12.8 8.5 Q12.4 9.5 12 9.5 Q11.6 9.5 11.2 8.5 Q11 7.5 12 6Z"
      fill="currentColor"
      opacity="0.12"
    />
    {/* Light rays */}
    <path d="M8 7 L7 6.5" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" opacity="0.2" />
    <path d="M16 7 L17 6.5" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" opacity="0.2" />
    {/* Candle base */}
    <path d="M9 21 L15 21" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
  </svg>
);

/** Two figures connected by a bridge/arc — connection tent symbol */
export const IconConnect = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("", className)}>
    {/* Left figure */}
    <circle cx="7" cy="8" r="2" stroke="currentColor" strokeWidth="1" />
    <path d="M7 10 L7 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M5 12 L7 11" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
    {/* Right figure */}
    <circle cx="17" cy="8" r="2" stroke="currentColor" strokeWidth="1" />
    <path d="M17 10 L17 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M19 12 L17 11" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
    {/* Connecting arc — the bond of fellowship */}
    <path
      d="M9 9 Q12 4 15 9"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
      fill="none"
      opacity="0.45"
      strokeDasharray="2 2"
    />
    {/* Heart at apex of arc */}
    <path
      d="M12 5.5 Q12.8 4.5 13 5.2 Q13.2 5.9 12 7 Q10.8 5.9 11 5.2 Q11.2 4.5 12 5.5Z"
      fill="currentColor"
      opacity="0.2"
    />
    {/* Ground */}
    <path d="M4 18 L20 18" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" opacity="0.12" />
  </svg>
);

/** Open book with water/river — Bible + Baptism symbol */
export const IconBibleWater = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("", className)}>
    {/* Book spine */}
    <path d="M12 5 L12 15" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
    {/* Left page */}
    <path
      d="M4 6 Q8 4.5 12 5 L12 15 Q8 14.5 4 16Z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Right page */}
    <path
      d="M20 6 Q16 4.5 12 5 L12 15 Q16 14.5 20 16Z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Text lines on left page */}
    <line x1="6" y1="8" x2="10" y2="7.6" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
    <line x1="6" y1="10" x2="10" y2="9.6" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
    {/* Cross on right page */}
    <line x1="16" y1="7" x2="16" y2="11" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
    <line x1="14.5" y1="8.5" x2="17.5" y2="8.5" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
    {/* Water waves below — river baptism */}
    <path
      d="M5 19 Q7 17.5 9 19 Q11 20.5 13 19 Q15 17.5 17 19 Q19 20.5 21 19"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
      fill="none"
      opacity="0.35"
    />
    <path
      d="M3 21 Q5 19.5 7 21 Q9 22.5 11 21 Q13 19.5 15 21 Q17 22.5 19 21"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeLinecap="round"
      fill="none"
      opacity="0.18"
    />
  </svg>
);

/** Calendar with cross watermark — Day Details symbol */
export const IconCalendarSacred = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("", className)}>
    {/* Calendar body */}
    <rect x="3" y="5" width="18" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
    {/* Top binding clips */}
    <line x1="8" y1="3" x2="8" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="16" y1="3" x2="16" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    {/* Header divider */}
    <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
    {/* Date: "8" */}
    <text x="12" y="17" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="serif" opacity="0.7" fontWeight="300">
      8
    </text>
    {/* Subtle cross watermark behind date */}
    <line x1="12" y1="11" x2="12" y2="19" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
    <line x1="8" y1="14.5" x2="16" y2="14.5" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
  </svg>
);

/** Eye with cross iris — Vision symbol */
export const IconVisionEye = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("", className)}>
    {/* Eye shape */}
    <path
      d="M2 12 Q6 6 12 6 Q18 6 22 12 Q18 18 12 18 Q6 18 2 12Z"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Iris circle */}
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
    {/* Pupil */}
    <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.2" />
    {/* Cross within iris — spiritual sight */}
    <line x1="12" y1="9" x2="12" y2="15" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
    <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
    {/* Light ray */}
    <path d="M12 3 L12 5" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" opacity="0.15" />
  </svg>
);

/** Open hands offering upward — Support symbol */
export const IconOffering = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("", className)}>
    {/* Left palm */}
    <path
      d="M4 16 Q4 12 7 10 L10 10 Q11 10 11 11 L11 14"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Right palm */}
    <path
      d="M20 16 Q20 12 17 10 L14 10 Q13 10 13 11 L13 14"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Gift/seed above palms */}
    <circle cx="12" cy="7" r="2" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    <path d="M12 5 L12 4" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.3" />
    {/* Upward motion lines */}
    <path d="M10 7 L9 5.5" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" opacity="0.2" />
    <path d="M14 7 L15 5.5" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" opacity="0.2" />
    {/* Ground connection */}
    <path d="M6 20 L18 20" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" opacity="0.1" />
  </svg>
);

/** Seedling/sprout with question — Exploring Faith symbol */
export const IconSeedlingQuestion = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("", className)}>
    {/* Stem */}
    <path d="M12 22 L12 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    {/* Left leaf */}
    <path
      d="M12 16 Q8 14 7 10 Q10 11 12 14"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinejoin="round"
      fill="none"
      opacity="0.6"
    />
    {/* Right leaf */}
    <path
      d="M12 13 Q16 11 17 7 Q14 8 12 11"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinejoin="round"
      fill="none"
      opacity="0.6"
    />
    {/* Question mark above — gentle curiosity */}
    <path
      d="M10.5 4 Q10.5 2 12 2 Q13.5 2 13.5 3.5 Q13.5 5 12 5.5"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      fill="none"
      opacity="0.45"
    />
    <circle cx="12" cy="7.5" r="0.5" fill="currentColor" opacity="0.35" />
    {/* Soil dots */}
    <circle cx="9" cy="22" r="0.4" fill="currentColor" opacity="0.12" />
    <circle cx="15" cy="22" r="0.4" fill="currentColor" opacity="0.12" />
  </svg>
);

/** Scroll/parchment with marks — FAQ symbol */
export const IconScrollFaq = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("", className)}>
    {/* Scroll body */}
    <path
      d="M6 4 Q4 4 4 6 L4 18 Q4 20 6 20 L18 20 Q20 20 20 18 L20 8 L16 4Z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Fold corner */}
    <path d="M16 4 L16 8 L20 8" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" opacity="0.5" />
    {/* Text lines */}
    <line x1="7" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
    <line x1="7" y1="13" x2="14" y2="13" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
    <line x1="7" y1="16" x2="15" y2="16" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
    {/* Question dot accent */}
    <circle cx="17" cy="16" r="0.6" fill="currentColor" opacity="0.2" />
  </svg>
);

/** Dove carrying message — Contact symbol */
export const IconDoveMessage = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("", className)}>
    {/* Dove body */}
    <path
      d="M12 14 Q10 12 6 9 Q4 8 3 6 Q5 7 7 7 Q5 5 4 3 Q7 5 9 6 Q10 4 12 3 Q14 4 15 6 Q17 5 20 3 Q19 5 17 7 Q19 7 21 6 Q20 8 18 9 Q14 12 12 14Z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Eye */}
    <circle cx="13" cy="6" r="0.5" fill="currentColor" opacity="0.4" />
    {/* Olive branch / message */}
    <path d="M12 14 Q12.5 16 13 18" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />
    {/* Small envelope at end of branch */}
    <rect x="11" y="18" width="4" height="3" rx="0.3" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
    <path d="M11 18 L13 19.5 L15 18" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
  </svg>
);

/** Scroll cue — gentle downward arrow with cross detail, replaces generic ChevronDown */
export const IconScrollCue = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn("", className)}>
    {/* Cross at top */}
    <line x1="8" y1="1" x2="8" y2="5" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
    <line x1="6" y1="3" x2="10" y2="3" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.3" />
    {/* Arrow chevron */}
    <path d="M4 10 L8 14 L12 10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    {/* Second chevron — parallax depth */}
    <path d="M5 7 L8 10 L11 7" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />
  </svg>
);

/** Tiny calendar mark — replaces generic Calendar icon at 10px */
export const IconCalendarMicro = ({ size = 10, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none" className={cn("", className)}>
    <rect x="1" y="2.5" width="8" height="6.5" rx="0.8" stroke="currentColor" strokeWidth="0.7" />
    <line x1="3" y1="1" x2="3" y2="3.5" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
    <line x1="7" y1="1" x2="7" y2="3.5" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
    <line x1="1" y1="4.5" x2="9" y2="4.5" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
    {/* Cross watermark inside */}
    <line x1="5" y1="5.5" x2="5" y2="8" stroke="currentColor" strokeWidth="0.25" opacity="0.15" />
    <line x1="3.5" y1="6.5" x2="6.5" y2="6.5" stroke="currentColor" strokeWidth="0.25" opacity="0.15" />
  </svg>
);

/** Tiny clock — replaces generic Clock icon */
export const IconClockMicro = ({ size = 10, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none" className={cn("", className)}>
    <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="0.7" />
    {/* Hour hand */}
    <line x1="5" y1="5" x2="5" y2="2.5" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
    {/* Minute hand */}
    <line x1="5" y1="5" x2="7" y2="5" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    {/* Center dot */}
    <circle cx="5" cy="5" r="0.4" fill="currentColor" opacity="0.5" />
  </svg>
);

/** Tiny map pin — replaces generic MapPin icon */
export const IconPinMicro = ({ size = 10, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none" className={cn("", className)}>
    <path d="M5 1 Q8 1 8 4 Q8 6.5 5 9.5 Q2 6.5 2 4 Q2 1 5 1Z" stroke="currentColor" strokeWidth="0.7" strokeLinejoin="round" />
    {/* Inner circle */}
    <circle cx="5" cy="4" r="1.2" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
  </svg>
);

/** Hamburger menu — three lines with cross-like proportions */
export const IconMenuBrand = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("", className)}>
    <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="4" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    <line x1="4" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/** Close X — formed as two crossing lines, echoing a cross rotated 45° */
export const IconCloseBrand = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("", className)}>
    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/** Sunrise marker — for morning schedule slot */
export const IconSunrise = ({ size = 12, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" className={cn("", className)}>
    {/* Horizon line */}
    <line x1="1" y1="9" x2="11" y2="9" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    {/* Half sun rising */}
    <path d="M3.5 9 Q3.5 5 6 5 Q8.5 5 8.5 9" stroke="currentColor" strokeWidth="0.7" fill="none" />
    {/* Rays */}
    <line x1="6" y1="2.5" x2="6" y2="4" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.5" />
    <line x1="3" y1="4" x2="4" y2="5" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" opacity="0.35" />
    <line x1="9" y1="4" x2="8" y2="5" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" opacity="0.35" />
  </svg>
);

/** High noon marker — full sun for afternoon schedule slot */
export const IconNoon = ({ size = 12, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" className={cn("", className)}>
    {/* Sun circle */}
    <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="0.7" />
    {/* Rays — 8 directions */}
    <line x1="6" y1="1" x2="6" y2="2.5" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" opacity="0.5" />
    <line x1="6" y1="9.5" x2="6" y2="11" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" opacity="0.5" />
    <line x1="1" y1="6" x2="2.5" y2="6" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" opacity="0.5" />
    <line x1="9.5" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" opacity="0.5" />
    <line x1="2.5" y1="2.5" x2="3.7" y2="3.7" stroke="currentColor" strokeWidth="0.3" strokeLinecap="round" opacity="0.3" />
    <line x1="8.3" y1="8.3" x2="9.5" y2="9.5" stroke="currentColor" strokeWidth="0.3" strokeLinecap="round" opacity="0.3" />
    <line x1="9.5" y1="2.5" x2="8.3" y2="3.7" stroke="currentColor" strokeWidth="0.3" strokeLinecap="round" opacity="0.3" />
    <line x1="2.5" y1="9.5" x2="3.7" y2="8.3" stroke="currentColor" strokeWidth="0.3" strokeLinecap="round" opacity="0.3" />
  </svg>
);

/** Sunset marker — sun descending below horizon for evening schedule slot */
export const IconSunset = ({ size = 12, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" className={cn("", className)}>
    {/* Horizon line */}
    <line x1="1" y1="7" x2="11" y2="7" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    {/* Half sun setting */}
    <path d="M3.5 7 Q3.5 3 6 3 Q8.5 3 8.5 7" stroke="currentColor" strokeWidth="0.7" fill="none" />
    {/* Rays below horizon — reflected light */}
    <line x1="4" y1="8.5" x2="8" y2="8.5" stroke="currentColor" strokeWidth="0.3" strokeLinecap="round" opacity="0.2" />
    <line x1="4.5" y1="9.5" x2="7.5" y2="9.5" stroke="currentColor" strokeWidth="0.25" strokeLinecap="round" opacity="0.12" />
    {/* Single upward ray */}
    <line x1="6" y1="1" x2="6" y2="2" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" opacity="0.3" />
  </svg>
);

/** Bespoke arrow — editorial right-pointing arrow with cross-notch tail */
export const IconArrowRight = ({ size = 12, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" className={cn("", className)}>
    {/* Shaft */}
    <line x1="1" y1="6" x2="9" y2="6" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
    {/* Arrowhead */}
    <path d="M7 3.5 L10 6 L7 8.5" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Cross-notch on tail — brand signature */}
    <line x1="2.5" y1="4.5" x2="2.5" y2="7.5" stroke="currentColor" strokeWidth="0.35" strokeLinecap="round" opacity="0.3" />
  </svg>
);

/** Tiny inline arrow for compact link indicators */
export const IconArrowMicro = ({ size = 8, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 8 8" fill="none" className={cn("inline-block", className)}>
    <line x1="1" y1="4" x2="6" y2="4" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
    <path d="M4.5 2 L7 4 L4.5 6" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);
