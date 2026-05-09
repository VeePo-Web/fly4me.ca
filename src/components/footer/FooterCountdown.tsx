import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const easeHeavy: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Pulsing colon — CSS-only animation */
const ColonPulse = () => (
  <span
    className="text-background/40 font-light text-base md:text-xl mx-0.5 select-none animate-[colon-pulse_2s_ease-in-out_infinite]"
    aria-hidden="true"
  >
    :
  </span>
);

/** Individual digit with flip animation */
const FlipDigit = ({ value, label }: { value: string; label: string }) => (
  <div className="relative" aria-label={`${value} ${label}`}>
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        className="relative font-serif text-xl sm:text-2xl md:text-4xl font-light text-background/85 leading-none tabular-nums select-none inline-block"
        style={{ fontFeatureSettings: '"liga" 1', minWidth: "1.1ch", textAlign: "center" }}
        initial={{ opacity: 0, y: 8, rotateX: -45, color: "hsl(var(--gold-warm) / 0.35)" }}
        animate={{ opacity: 1, y: 0, rotateX: 0, color: "hsl(var(--background) / 0.85)" }}
        exit={{ opacity: 0, y: -8, rotateX: 45 }}
        transition={{ duration: 0.35, ease: easeHeavy }}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  </div>
);

/** Living countdown to August 8, 2026 — compact column version */
const FooterCountdown = () => {
  const eventDate = useMemo(() => new Date("2026-08-08T11:00:00-06:00"), []);

  const calcRemaining = () => {
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      total: diff,
    };
  };

  const [remaining, setRemaining] = useState(calcRemaining);

  useEffect(() => {
    const interval = setInterval(() => setRemaining(calcRemaining()), 1000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (remaining.total <= 0) return null;

  const segments = [
    { value: remaining.days, label: "days", pad: false },
    { value: remaining.hours, label: "hrs", pad: true },
    { value: remaining.minutes, label: "min", pad: true },
    { value: remaining.seconds, label: "sec", pad: true },
  ];

  return (
    <ScrollReveal delay={0.15} weight="light">
      <div className="relative z-10 flex flex-col items-center md:items-start">
        {/* Eyebrow */}
        <p
          className="text-[8px] font-sans uppercase tracking-[0.3em] text-background/60 mb-3"
          style={{ fontFeatureSettings: '"cv02"' }}
        >
          every second draws us closer
        </p>

        <div className="flex items-baseline flex-wrap gap-1.5 sm:gap-2 md:gap-2">
          {segments.map((seg, i) => {
            const display = seg.pad ? String(seg.value).padStart(2, "0") : String(seg.value);
            const digits = display.split("");
            return (
              <div key={seg.label} className="flex items-baseline gap-1 md:gap-1.5">
                <div className="flex" style={{ perspective: 200 }}>
                  {digits.map((digit, di) => (
                    <FlipDigit key={`${seg.label}-${di}-${digit}`} value={digit} label={seg.label} />
                  ))}
                </div>
                <span
                  className="text-[8px] md:text-[8px] font-sans uppercase tracking-[0.2em] text-background/75"
                  style={{ fontFeatureSettings: '"cv02"' }}
                >
                  {seg.label}
                </span>
                {i < segments.length - 1 && <ColonPulse />}
              </div>
            );
          })}
        </div>

        {/* Whisper label */}
        <div className="relative mt-3">
          <span
            className="text-[9px] font-sans uppercase tracking-[0.2em] text-background/65"
            style={{ fontFeatureSettings: '"cv02"' }}
          >
            until we gather
          </span>
          <div
            className="absolute -bottom-1 left-1/4 right-1/4 h-px"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold-warm) / 0.12), transparent)" }}
            aria-hidden="true"
          />
        </div>
      </div>
    </ScrollReveal>
  );
};

export default FooterCountdown;