import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Fly4MEdia cinematic intro — v3
 *
 * Five phases, each with intent and its own easing register. The JS owns the
 * timeline; CSS owns the per-element animation (delays passed inline where
 * sequencing matters). No springs. No bounces. Premium cinema doesn't bounce.
 *
 *   1 dark      0–650ms        Pure black, grain + warm pulse
 *   2 slogan    650–2050ms     Letter-by-letter, center-out cascade
 *   3 hold      2050–3250ms    Stillness. Light sweep crosses once.
 *   4 brand     3250–4850ms    Slogan softens (stays), hairline reframes wide,
 *                              "Fly4MEdia" rises, descriptor follows
 *   5 dissolve  4850–6200ms    Stack zooms 1.00 → 1.04 + blurs 0 → 6px while
 *                              the veil clears. Hero takes over underneath.
 */

const SESSION_KEY = "f4m:intro:v3";
const SLOGAN = "Perspective Changes Everything.";

// Phase durations (ms)
const T_DARK = 650;
const T_SLOGAN = 1400;
const T_HOLD = 1200;
const T_BRAND = 1600;
const T_DISSOLVE = 1350;

// Absolute timeline marks
const T_SLOGAN_START = T_DARK;                          //  650
const T_HOLD_START = T_SLOGAN_START + T_SLOGAN;         // 2050
const T_BRAND_START = T_HOLD_START + T_HOLD;            // 3250
const T_DISSOLVE_START = T_BRAND_START + T_BRAND;       // 4850
const T_TOTAL = T_DISSOLVE_START + T_DISSOLVE;          // 6200

// Hero handoff fires this many ms before the veil unmounts so the hero
// composition can land *during* the dissolve, not after a beat of black.
const HERO_HANDOFF_LEAD = 200;

// Center-out letter cascade step
const LETTER_STEP_MS = 32;

type Phase = "dark" | "slogan" | "hold" | "brand" | "dissolve";

export const INTRO_SESSION_KEY = SESSION_KEY;
export const INTRO_HERO_REVEAL_AT_MS = T_DISSOLVE_START - HERO_HANDOFF_LEAD;

const Intro = () => {
  const [mounted, setMounted] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.location.pathname !== "/") return false;
    if (new URLSearchParams(window.location.search).has("nointro")) return false;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
    if (sessionStorage.getItem(SESSION_KEY)) return false;
    return true;
  });
  const [phase, setPhase] = useState<Phase>("dark");
  const finishedRef = useRef(false);

  // Center-out delays: middle letters lead, edges trail.
  const letters = useMemo(() => {
    const chars = Array.from(SLOGAN);
    const center = (chars.length - 1) / 2;
    return chars.map((ch, i) => ({
      ch,
      delay: Math.round(Math.abs(i - center) * LETTER_STEP_MS),
    }));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("intro-active");

    const dispatchExit = () => {
      window.dispatchEvent(new CustomEvent("f4m:intro:exit"));
    };

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setMounted(false);
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("intro-active");
    };

    const skipNow = () => {
      if (finishedRef.current) return;
      dispatchExit();
      finish();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") skipNow();
    };

    // Trigger slogan phase on the next frame so the "dark" phase paints first.
    const timers = [
      window.setTimeout(() => setPhase("slogan"), 16),
      window.setTimeout(() => setPhase("hold"), T_HOLD_START),
      window.setTimeout(() => setPhase("brand"), T_BRAND_START),
      window.setTimeout(() => setPhase("dissolve"), T_DISSOLVE_START),
      window.setTimeout(dispatchExit, T_TOTAL - HERO_HANDOFF_LEAD),
      window.setTimeout(finish, T_TOTAL),
    ];

    window.addEventListener("keydown", onKey);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("intro-active");
    };
  }, [mounted]);

  if (!mounted) return null;

  const dissolving = phase === "dissolve";
  const dim = phase === "brand" || phase === "dissolve";
  const wide = phase === "brand" || phase === "dissolve";

  const onSkipClick = () => {
    if (finishedRef.current) return;
    window.dispatchEvent(new CustomEvent("f4m:intro:exit"));
    finishedRef.current = true;
    setMounted(false);
    document.body.style.overflow = "";
    document.body.classList.remove("intro-active");
  };

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] will-change-[opacity] ${
        dissolving ? "intro-veil-out" : ""
      }`}
    >
      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
      {/* drifting fog — desktop only */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block opacity-[0.18] intro-fog bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(255,255,255,0.5),transparent_70%)]" />
      {/* film grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      <div
        className={`relative flex flex-col items-center px-6 text-center ${
          dissolving ? "intro-stack-zoom" : ""
        }`}
      >
        {/* Slogan — center-out letter cascade */}
        <h1
          className={`text-white t-headline-1 select-none ${
            dim ? "intro-slogan-soften" : ""
          }`}
          style={{ maxWidth: "22ch" }}
        >
          {letters.map((l, i) => (
            <span
              key={i}
              className="intro-letter"
              style={{
                animationDelay: `${T_SLOGAN_START + l.delay}ms`,
                whiteSpace: l.ch === " " ? "pre" : undefined,
              }}
            >
              {l.ch}
            </span>
          ))}
        </h1>

        {/* Hairline — strikes after the cascade, reframes wider during brand phase */}
        <span
          className={`mt-14 block h-px bg-white/30 intro-hairline ${
            wide ? "is-wide" : ""
          }`}
        />

        {/* Brand stack — only mounts when brand phase begins so animations are pristine */}
        {(phase === "brand" || phase === "dissolve") && (
          <>
            <span
              className="mt-7 block text-white t-headline-3 intro-brand-rise"
              style={{ animationDelay: "180ms" }}
            >
              Fly4MEdia
            </span>
            <span
              className="mt-3 block text-white/55 t-micro intro-descriptor-rise"
              style={{ animationDelay: "420ms" }}
            >
              A cinematic perspective studio
            </span>
          </>
        )}

        {/* Light sweep — one calm pass during the hold */}
        <span className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute inset-y-0 -left-1/2 w-1/2 intro-sweep bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)]" />
        </span>
      </div>

      {/* Skip — Esc, Enter, or click */}
      <button
        type="button"
        onClick={onSkipClick}
        className="absolute bottom-8 right-8 text-white t-micro intro-skip hover:opacity-100 transition-opacity"
        aria-label="Skip intro"
      >
        Skip
      </button>
    </div>
  );
};

export default Intro;
