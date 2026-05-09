import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page not found — Fly4MEdia";
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
          Error / 404
        </p>
        <h1 className="text-5xl md:text-7xl font-medium tracking-[-0.04em] leading-[1] mb-6">
          Lost signal.
        </h1>
        <p className="text-base text-muted-foreground mb-10">
          The page you&rsquo;re looking for has drifted out of frame.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3.5 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Return home <span>↗</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
