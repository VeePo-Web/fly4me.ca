import { useEffect, useRef, useState } from "react";
import mark from "@/assets/fly4media-mark.png";

const SESSION_KEY = "f4m:intro:v1";
const HOLD_MS = 1700;
const FADE_MS = 500;

const Intro = () => {
  const [mounted, setMounted] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.location.pathname !== "/") return false;
    if (new URLSearchParams(window.location.search).has("nointro")) return false;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
    if (sessionStorage.getItem(SESSION_KEY)) return false;
    return true;
  });
  const [exiting, setExiting] = useState(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    if (!mounted) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setExiting(true);
      window.setTimeout(() => {
        setMounted(false);
        document.body.style.overflow = prevOverflow;
      }, FADE_MS);
    };

    const skip = () => {
      if (finishedRef.current) return;
      finish();
    };

    const holdTimer = window.setTimeout(finish, HOLD_MS);
    const skipEvents: (keyof WindowEventMap)[] = ["keydown", "wheel", "touchstart", "click"];
    skipEvents.forEach((e) => window.addEventListener(e, skip, { passive: true }));

    return () => {
      window.clearTimeout(holdTimer);
      skipEvents.forEach((e) => window.removeEventListener(e, skip));
      document.body.style.overflow = prevOverflow;
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] will-change-[opacity] ${
        exiting ? "intro-veil-out" : ""
      }`}
    >
      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
      {/* drifting fog (desktop only) */}
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

      <div className="relative flex flex-col items-center">
        {/* mark */}
        <div className="relative intro-mark">
          <img
            src={mark}
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 object-contain"
            style={{ filter: "drop-shadow(0 0 24px rgba(255,255,255,0.08))" }}
          />
          {/* light sweep over mark */}
          <span className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="absolute inset-y-0 -left-1/2 w-1/2 intro-sweep bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)]" />
          </span>
        </div>

        {/* hairline */}
        <span className="block mt-6 h-px w-20 origin-center bg-white/20 intro-hairline" />

        {/* wordmark */}
        <span className="mt-6 text-white text-[15px] sm:text-[17px] font-medium intro-word">
          Fly4MEdia
        </span>

        {/* eyebrow */}
        <span className="mt-3 text-white/45 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] intro-eyebrow">
          Aerial Cinematography · Alberta
        </span>
      </div>
    </div>
  );
};

export default Intro;
