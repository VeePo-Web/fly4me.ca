import { useEffect, useMemo, useRef, useState } from "react";
import mark from "@/assets/fly4media-mark.png";

/**
 * Fly4MEdia cinematic intro — v5 "Suspend"
 *
 * Seven beats. JS owns the timeline; CSS owns the per-element keyframes.
 * No blur. No skip. Calm pacing with a true "time stands still" hold.
 *
 *   1 anchor    0–800ms        Drone mark fades in dead-center.
 *   2 frame     800–1600ms     Viewfinder brackets snap in.
 *   3 slogan    1600–3400ms    Center-out letter cascade (opacity + rise).
 *   4 suspend   3400–5400ms    Everything holds. Hairline draws.
 *                              Mark ring pulses once. Stack breathes.
 *                              Counter lands at 100 and rests.
 *   5 brand     5400–7000ms    Slogan softens; rule reframes wide;
 *                              wordmark + descriptor clip-wipe in.
 *   6 dissolve  7000–8600ms    Stack scales up; aperture parts;
 *                              seam flares across the meeting line.
 */

const SESSION_KEY = "f4m:intro:v5";
const SLOGAN = "Perspective Changes Everything.";

// Beat durations (ms)
const T_ANCHOR = 800;
const T_FRAME = 800;
const T_SLOGAN = 1800;
const T_SUSPEND = 2000;
const T_BRAND = 1600;
const T_DISSOLVE = 1600;

// Absolute timeline marks
const T_FRAME_START = T_ANCHOR;                          //  800
const T_SLOGAN_START = T_FRAME_START + T_FRAME;          // 1600
const T_SUSPEND_START = T_SLOGAN_START + T_SLOGAN;       // 3400
const T_BRAND_START = T_SUSPEND_START + T_SUSPEND;       // 5400
const T_DISSOLVE_START = T_BRAND_START + T_BRAND;        // 7000
const T_TOTAL = T_DISSOLVE_START + T_DISSOLVE;           // 8600

const HERO_HANDOFF_LEAD = 280;
const LETTER_STEP_MS = 48;

// Counter ticks 0→100 across the cascade and lands at suspend-start.
const COUNTER_START = T_SLOGAN_START + 400;              // 2000
const COUNTER_DURATION = 1400;                           // ends ~3400

type Phase = "anchor" | "frame" | "slogan" | "suspend" | "brand" | "dissolve";

export const INTRO_SESSION_KEY = SESSION_KEY;
export const INTRO_HERO_REVEAL_AT_MS = T_DISSOLVE_START - HERO_HANDOFF_LEAD;

const REPLAY_KEY = "f4m:intro:replay";

const Intro = () => {
  const [mounted, setMounted] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.location.pathname !== "/") return false;
    if (new URLSearchParams(window.location.search).has("nointro")) return false;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
    if (sessionStorage.getItem(REPLAY_KEY)) {
      sessionStorage.removeItem(REPLAY_KEY);
      sessionStorage.removeItem(SESSION_KEY);
      return true;
    }
    if (sessionStorage.getItem(SESSION_KEY)) return false;
    return true;
  });
  const [phase, setPhase] = useState<Phase>("anchor");
  const [counter, setCounter] = useState(0);
  const [runId, setRunId] = useState(0);
  const finishedRef = useRef(false);

  useEffect(() => {
    const onReplay = () => {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
      sessionStorage.removeItem(SESSION_KEY);
      finishedRef.current = false;
      setPhase("anchor");
      setCounter(0);
      setRunId((n) => n + 1);
      setMounted(true);
    };
    window.addEventListener("f4m:intro:replay", onReplay);
    return () => window.removeEventListener("f4m:intro:replay", onReplay);
  }, []);

  // Center-out delays.
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

    const timers = [
      window.setTimeout(() => setPhase("frame"), T_FRAME_START),
      window.setTimeout(() => setPhase("slogan"), T_SLOGAN_START),
      window.setTimeout(() => setPhase("suspend"), T_SUSPEND_START),
      window.setTimeout(() => setPhase("brand"), T_BRAND_START),
      window.setTimeout(() => setPhase("dissolve"), T_DISSOLVE_START),
      window.setTimeout(dispatchExit, T_TOTAL - HERO_HANDOFF_LEAD),
      window.setTimeout(finish, T_TOTAL),
    ];

    // Counter rAF — ticks 00 → 100 across COUNTER_DURATION.
    let raf = 0;
    const startCounter = window.setTimeout(() => {
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / COUNTER_DURATION);
        const eased = 1 - Math.pow(1 - p, 4);
        setCounter(Math.round(eased * 100));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, COUNTER_START);

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(startCounter);
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("intro-active");
    };
  }, [mounted, runId]);

  if (!mounted) return null;

  const framed = phase !== "anchor";
  const opened = phase === "suspend" || phase === "brand" || phase === "dissolve";
  const suspending = phase === "suspend";
  const dim = phase === "brand" || phase === "dissolve";
  const wide = phase === "brand" || phase === "dissolve";
  const dissolving = phase === "dissolve";
  const counterVisible = phase === "slogan" || phase === "suspend";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
    >
      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
      {/* drifting fog */}
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

      {/* Viewfinder brackets — snap in during beat 2, nudge outward in suspend */}
      <Brackets framed={framed} opened={opened} />

      <div
        className={`relative flex flex-col items-center px-6 text-center ${
          suspending ? "intro-stack-breath" : ""
        } ${dissolving ? "intro-stack-zoom" : ""}`}
      >
        {/* Drone mark + suspend ring pulse */}
        <div className="relative mb-8">
          <img
            src={mark}
            alt=""
            width={64}
            height={64}
            className={`intro-mark relative z-10 h-12 w-12 md:h-14 md:w-14 ${
              framed ? "is-framed" : ""
            }`}
            style={{ filter: "brightness(0) invert(1)" }}
          />
          {suspending && (
            <span
              className="intro-mark-ring pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 md:h-24 md:w-24"
            />
          )}
        </div>

        {/* Slogan — center-out letter cascade (no blur) */}
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

        {/* Frame counter */}
        <span
          className={`intro-counter mt-6 block text-white/40 tabular-nums ${
            counterVisible ? "is-on" : "is-off"
          }`}
          style={{
            fontSize: "11px",
            letterSpacing: "0.18em",
            fontWeight: 500,
          }}
        >
          {counter.toString().padStart(2, "0")} / 100
        </span>

        {/* Hairline — draws from center in suspend, reframes wider in brand */}
        <span
          className={`mt-12 block h-px bg-white/30 intro-hairline ${
            opened ? "is-drawn" : ""
          } ${wide ? "is-wide" : ""}`}
        />

        {/* Brand stack — clip-wipe in during beat 5 */}
        {(phase === "brand" || phase === "dissolve") && (
          <>
            <span
              className="mt-7 block text-white t-headline-3 intro-clip-wipe"
              style={{ animationDelay: "200ms" }}
            >
              Fly4MEdia
            </span>
            <span
              className="mt-3 block text-white/55 t-micro intro-clip-wipe"
              style={{ animationDelay: "520ms" }}
            >
              A cinematic perspective studio
            </span>
          </>
        )}

        {/* Light sweep — one calm pass across the suspend */}
        <span className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute inset-y-0 -left-1/2 w-1/2 intro-sweep bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)]" />
        </span>
      </div>

      {/* Aperture — two black panels part vertically on dissolve */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[#0a0a0a] ${
          dissolving ? "intro-aperture-top" : ""
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[#0a0a0a] ${
          dissolving ? "intro-aperture-bottom" : ""
        }`}
      />
      {/* Seam flare at the parting line */}
      {dissolving && (
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-px intro-seam-flare bg-white" />
      )}
    </div>
  );
};

/* Viewfinder L-brackets — four corners, staggered snap-in */
const Brackets = ({ framed, opened }: { framed: boolean; opened: boolean }) => {
  const corners = [
    { pos: "top-10 left-10 md:top-14 md:left-14", borders: "border-t border-l", nudge: opened ? "-translate-x-1.5 -translate-y-1.5" : "" },
    { pos: "top-10 right-10 md:top-14 md:right-14", borders: "border-t border-r", nudge: opened ? "translate-x-1.5 -translate-y-1.5" : "" },
    { pos: "bottom-10 left-10 md:bottom-14 md:left-14", borders: "border-b border-l", nudge: opened ? "-translate-x-1.5 translate-y-1.5" : "" },
    { pos: "bottom-10 right-10 md:bottom-14 md:right-14", borders: "border-b border-r", nudge: opened ? "translate-x-1.5 translate-y-1.5" : "" },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute h-7 w-7 md:h-9 md:w-9 border-white/25 transition-transform duration-[1400ms] ${c.borders} ${c.pos} intro-bracket ${framed ? "is-in" : ""} ${c.nudge}`}
          style={{
            animationDelay: `${T_FRAME_START + i * 80}ms`,
            transitionTimingFunction: "cubic-bezier(0.7, 0, 0.3, 1)",
          }}
        />
      ))}
    </>
  );
};

export default Intro;
