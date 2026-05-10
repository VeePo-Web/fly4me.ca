import { useEffect, useRef, useState } from "react";


const SESSION_KEY = "f4m:intro:v2";
const HOLD_MS = 2050;
const FADE_MS = 550;

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

      <div className="relative flex flex-col items-center px-6 text-center">
        {/* slogan — the brand thesis (Phase 2) */}
        <span
          className="block text-white t-headline-1 intro-word"
          style={{ maxWidth: "22ch" }}
        >
          Perspective Changes Everything.
        </span>

        {/* brand stack (Phase 4) */}
        <span className="mt-14 block h-px w-16 origin-center bg-white/25 intro-hairline" />

        <span className="mt-7 block text-white t-headline-3 intro-brand">
          Fly4MEdia
        </span>
        <span className="mt-3 block text-white/55 t-micro intro-descriptor">
          A cinematic perspective studio
        </span>

        {/* restrained light sweep across the stack */}
        <span className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute inset-y-0 -left-1/2 w-1/2 intro-sweep bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)]" />
        </span>
      </div>
    </div>
  );
};

export default Intro;
