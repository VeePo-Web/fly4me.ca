import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let raf = 0;
    let pending = false;
    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        pending = false;
      });
    };
    onScroll();
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
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,backdrop-filter,padding,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled || open
          ? "bg-background/75 backdrop-blur-md border-b border-border/60"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div
        className={`container-x flex items-center justify-between transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? "h-14 md:h-16" : "h-16 md:h-20"
        }`}
      >
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
            className="size-6 md:size-7 object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[8deg]"
          />
          <span className="text-[15px] md:text-base font-medium tracking-tight">
            Fly4MEdia
          </span>
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
            className={`block w-5 h-px bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "-translate-y-[1px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-b border-border/60 transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container-x py-8 flex flex-col gap-6" aria-label="Mobile">
          {NAV.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-3xl font-medium tracking-tight text-foreground"
              style={{
                animation: open
                  ? `page-enter-fade 480ms cubic-bezier(0.22,1,0.36,1) ${80 + i * 70}ms both`
                  : undefined,
              }}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleContact}
            className="text-left text-3xl font-medium tracking-tight text-foreground"
            style={{
              animation: open
                ? `page-enter-fade 480ms cubic-bezier(0.22,1,0.36,1) ${80 + NAV.length * 70}ms both`
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
