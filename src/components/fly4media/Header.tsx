import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/fly4media-mark.png";
import MenuOverlay from "./MenuOverlay";

interface Props {
  onContact: () => void;
}

export default function Header({ onContact }: Props) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    let pending = false;
    let lastY = window.scrollY;

    const apply = () => {
      const y = window.scrollY;
      const progress = Math.min(Math.max(y / 120, 0), 1);
      headerRef.current?.style.setProperty("--nav-progress", progress.toFixed(3));

      if (y > 240 && y - lastY > 4) setHidden(true);
      else if (lastY - y > 4 || y < 80) setHidden(false);
      lastY = y;
      pending = false;
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Close menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 inset-x-0 z-50 nav-surface-quiet ${
          hidden && !open ? "nav-hidden" : ""
        }`}
      >
        {/* Subtle top scrim — only visible while wordmark is white (over hero media) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/25 to-transparent"
          style={{ opacity: `calc(1 - var(--nav-progress))` }}
        />

        <div className="relative container-x flex items-center justify-between h-16 md:h-20">
          {/* Brand — logo + wordmark, ink that crossfades white → foreground via --nav-progress */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 group nav-ink"
            data-cursor="hover"
            aria-label="Fly4MEdia — home"
          >
            <img
              src={logo}
              alt=""
              width={32}
              height={32}
              className="size-7 md:size-8 object-contain transition-[transform,filter] duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.06] nav-mark-shadow"
            />
            <span className="t-nav">Fly4MEdia</span>
          </Link>

          {/* Menu trigger — two hairlines that shift on hover, single word */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            data-cursor="hover"
            className="group flex items-center gap-3 nav-ink"
          >
            <span className="relative block w-[22px] h-[10px]">
              <span className="absolute left-0 right-0 top-[1px] h-px bg-current transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-[2px]" />
              <span className="absolute left-0 right-0 bottom-[1px] h-px bg-current transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-x-[2px]" />
            </span>
            <span className="t-nav">Menu</span>
          </button>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} onContact={onContact} />
    </>
  );
}
