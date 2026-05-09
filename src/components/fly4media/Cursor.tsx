import { useEffect, useRef } from "react";

/**
 * Subtle desktop-only ring cursor. Additive — native cursor remains visible.
 * Single rAF loop, mix-blend-difference for monochrome inversion.
 */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ring = ringRef.current;
    if (!ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let raf = 0;
    let ready = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!ready) {
        ready = true;
        ring.classList.add("is-ready");
      }
      const target = e.target as HTMLElement | null;
      const isHover = !!target?.closest(
        '[data-cursor="hover"], a, button, input, textarea, [role="button"]',
      );
      ring.classList.toggle("is-hover", isHover);
    };

    const tick = () => {
      cx += (mx - cx) * 0.22;
      cy += (my - cy) * 0.22;
      ring.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ringRef} className="cursor-ring" aria-hidden="true" />;
}
