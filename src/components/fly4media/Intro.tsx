import { useEffect, useRef, useState } from "react";
import mark from "@/assets/fly4media-mark.png";

/**
 * Fly4MEdia intro — v6 "Aperture"
 *
 * Three beats, one crossfade. Total ~3.8s.
 *
 *   0     →  500    mark fade in           (opacity 0 → 0.9)
 *   500   →  1400   hairline draws         (scaleX 0 → 1, 96px wide)
 *   1400  →  2100   slogan fades in        (opacity 0 → 0.65)
 *   2100  →  3000   HOLD                   (everything still)
 *   3000  →  3700   intro layer fades out  (opacity 1 → 0)
 *
 * Hero begins its own reveal at 2800ms so the crossfade overlaps cleanly.
 */

const SESSION_KEY = "f4m:intro:v7";
const REPLAY_KEY = "f4m:intro:replay";

const T_HAIRLINE = 500;
const T_TEXT = 1400;
const T_HOLD_END = 3000;
const T_FADE = 700;
const T_TOTAL = T_HOLD_END + T_FADE; // 3700

export const INTRO_SESSION_KEY = SESSION_KEY;
export const INTRO_HERO_REVEAL_AT_MS = 2800;

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
  const [exiting, setExiting] = useState(false);
  const [runId, setRunId] = useState(0);
  const finishedRef = useRef(false);

  useEffect(() => {
    const onReplay = () => {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
      sessionStorage.removeItem(SESSION_KEY);
      finishedRef.current = false;
      setExiting(false);
      setRunId((n) => n + 1);
      setMounted(true);
    };
    window.addEventListener("f4m:intro:replay", onReplay);
    return () => window.removeEventListener("f4m:intro:replay", onReplay);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("intro-active");

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setMounted(false);
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("intro-active");
    };

    const timers = [
      window.setTimeout(
        () => window.dispatchEvent(new CustomEvent("f4m:intro:exit")),
        INTRO_HERO_REVEAL_AT_MS,
      ),
      window.setTimeout(() => setExiting(true), T_HOLD_END),
      window.setTimeout(finish, T_TOTAL),
    ];

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("intro-active");
    };
  }, [mounted, runId]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] ${
        exiting ? "intro-layer-out" : ""
      }`}
    >
      <div className="flex flex-col items-center px-6 text-center">
        <img
          src={mark}
          alt=""
          width={28}
          height={28}
          className="intro-mark h-7 w-7"
          style={{ filter: "brightness(0) invert(1)" }}
        />
        <span className="intro-hairline mt-7 block h-px bg-white/55" />
        <p
          className="mt-7 select-none"
          style={{
            fontSize: "13px",
            letterSpacing: "0.12em",
            fontWeight: 400,
            lineHeight: 1.4,
          }}
        >
          <span className="intro-word-1 text-white">Perspective</span>{" "}
          <span className="intro-word-2 text-white">changes everything.</span>
        </p>

      </div>
    </div>
  );
};

export default Intro;
