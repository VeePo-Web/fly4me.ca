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
        <p className="t-eyebrow text-muted-foreground mb-6">
          Error / 404
        </p>
        <h1 className="t-display-1 mb-6">
          Lost signal.
        </h1>
        <p className="t-lede text-muted-foreground mb-10">
          The page you&rsquo;re looking for has drifted out of frame.
        </p>
        <Link to="/" className="btn-primary">
          <span className="t-button">Return home</span>
          <span aria-hidden>↗</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
