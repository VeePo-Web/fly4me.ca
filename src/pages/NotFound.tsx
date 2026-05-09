import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    document.title = "Page Not Found — Worship in the Park";
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden">
      {/* Radial warmth — off-center for asymmetry */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 60% at 35% 55%, hsl(var(--primary) / 0.025), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Ghost cross watermark — CSS draw-in */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="relative">
          <div
            className="w-px h-64 bg-foreground/[0.03] animate-[scale-y-in_1.2s_cubic-bezier(0.76,0,0.24,1)_0.2s_both]"
            style={{ transformOrigin: "top" }}
          />
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 h-px bg-foreground/[0.03] animate-[scale-x-in_1s_cubic-bezier(0.76,0,0.24,1)_0.5s_both]"
          />
          {/* Intersection dot */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-1 rounded-full bg-foreground/[0.04] animate-[fade-in_0.4s_ease_0.9s_both]"
          />
        </div>
      </div>

      <div className="relative z-10 text-center px-6">
        {/* Giant ghost numeral */}
        <span
          className="block font-serif text-[8rem] md:text-[12rem] font-light leading-none text-foreground/[0.04] select-none animate-[blur-in_1.4s_cubic-bezier(0.16,1,0.3,1)_both]"
          aria-hidden="true"
        >
          404
        </span>

        <h1
          className="font-serif text-2xl md:text-3xl font-light text-foreground -mt-4 mb-3 animate-[fade-in_0.8s_cubic-bezier(0.16,1,0.3,1)_0.3s_both]"
          style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
        >
          Page Not Found
        </h1>

        {/* Editorial separator */}
        <div
          className="flex items-center justify-center gap-2 mb-6 animate-[separator-in_0.8s_cubic-bezier(0.16,1,0.3,1)_0.5s_both]"
          style={{ transformOrigin: "center" }}
          aria-hidden="true"
        >
          <div className="w-6 h-px bg-primary/20" />
          <div className="size-1 rounded-full bg-primary/15" />
          <div className="w-6 h-px bg-primary/20" />
        </div>

        <p
          className="text-sm text-muted-foreground mb-10 max-w-sm mx-auto leading-relaxed animate-[fade-in_0.6s_cubic-bezier(0.16,1,0.3,1)_0.6s_both]"
        >
          The path you followed doesn&rsquo;t lead here. But the invitation still stands.
        </p>

        <div className="animate-[fade-in_0.6s_cubic-bezier(0.16,1,0.3,1)_0.8s_both]">
          <Link
            to="/"
            className="inline-block font-sans text-xs uppercase tracking-[0.2em] font-medium border border-border/60 text-foreground px-8 py-3.5 hover:bg-foreground hover:text-background hover:border-foreground active:scale-[0.98] transition-all duration-300 group"
          >
            <span className="inline-flex items-center gap-2">
              <span className="transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
              Return Home
            </span>
          </Link>
        </div>

        <div
          className="flex items-center justify-center gap-4 mt-6 animate-[fade-in_0.5s_cubic-bezier(0.16,1,0.3,1)_1s_both]"
        >
          <Link
            to="/faq"
            className="text-[11px] font-sans uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors duration-300"
            style={{ fontFeatureSettings: '"cv02"' }}
          >
            FAQ
          </Link>
          <span className="w-px h-3 bg-border/30" aria-hidden="true" />
          <Link
            to="/contact"
            className="text-[11px] font-sans uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors duration-300"
            style={{ fontFeatureSettings: '"cv02"' }}
          >
            Contact
          </Link>
        </div>

        <p
          className="font-serif italic text-sm text-muted-foreground/70 mt-16 max-w-xs mx-auto animate-[fade-in_0.8s_cubic-bezier(0.16,1,0.3,1)_1.2s_both]"
          style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
        >
          &ldquo;I am the way, the truth, and the life.&rdquo;
          <span
            className="block text-[10px] not-italic tracking-[0.35em] uppercase text-muted-foreground/60 font-sans mt-2"
            style={{ fontFeatureSettings: '"cv02"' }}
          >
            John 14 : 6
          </span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
