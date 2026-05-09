import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/fly4media-mark.png";

interface Props {
  onContact: () => void;
}

const NAV: { label: string; to: string }[] = [
  { label: "Work", to: "/work" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
];

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

      // Direction-aware hide (only past 240px)
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

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  const handleContact = () => {
    setOpen(false);
    onContact();
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 inset-x-0 z-50 nav-surface ${
        hidden && !open ? "nav-hidden" : ""
      } ${open ? "bg-background/90" : ""}`}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20 nav-compress">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 group"
          data-cursor="hover"
          aria-label="Fly4MEdia — home"
        >
          <img
            src={logo}
            alt=""
            width={28}
            height={28}
            className="size-6 md:size-7 object-contain transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:rotate-[8deg]"
          />
          <span className="t-nav">Fly4MEdia</span>
        </Link>

        <nav className="hidden md:flex items-center gap-9" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              data-cursor="hover"
              className={`link-underline t-nav transition-colors duration-300 ${
                isActive(item.to)
                  ? "text-foreground is-active"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleContact}
            data-cursor="hover"
            className="link-underline t-nav text-foreground/70 hover:text-foreground transition-colors"
          >
            Contact
          </button>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          data-cursor="hover"
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
        >
          <span
            className={`block w-5 h-px bg-foreground transition-transform duration-500 ease-[var(--ease-out-soft)] ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-foreground transition-transform duration-500 ease-[var(--ease-out-soft)] ${
              open ? "-translate-y-[1px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-b border-border/60 transition-[max-height,opacity] duration-500 ease-[var(--ease-out-soft)] ${
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container-x py-8 flex flex-col gap-6" aria-label="Mobile">
          {NAV.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              className="t-headline-2 text-foreground"
              style={{
                animation: open
                  ? `page-enter-fade 480ms var(--ease-out-soft) ${80 + i * 70}ms both`
                  : undefined,
              }}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleContact}
            className="t-headline-2 text-left text-foreground"
            style={{
              animation: open
                ? `page-enter-fade 480ms var(--ease-out-soft) ${80 + NAV.length * 70}ms both`
                : undefined,
            }}
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}
