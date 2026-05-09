import { useEffect, useState } from "react";
import logo from "@/assets/fly4media-mark.png";

interface Props {
  onContact: () => void;
}

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header({ onContact }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    if (href === "#contact") {
      onContact();
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 group"
          aria-label="Fly4MEdia — home"
        >
          <img
            src={logo}
            alt=""
            width={28}
            height={28}
            className="size-6 md:size-7 object-contain"
          />
          <span className="text-[15px] md:text-base font-medium tracking-tight">Fly4MEdia</span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {NAV.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
        >
          <span
            className={`block w-5 h-px bg-foreground transition-transform duration-300 ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-foreground transition-transform duration-300 ${
              open ? "-translate-y-[1px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-b border-border/60 transition-[max-height,opacity] duration-500 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container-x py-6 flex flex-col gap-5">
          {NAV.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className="text-left text-2xl font-medium tracking-tight text-foreground"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
