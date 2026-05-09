import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import ScrollProgress from "./ScrollProgress";

interface PageShellProps {
  children: ReactNode;
  transparentHeader?: boolean;
}

const BASE = "Worship in the Park";

const pageTitles: Record<string, string> = {
  "/": BASE,
  "/day-details": `Day Details — ${BASE}`,
  "/day-details/schedule": `Schedule — ${BASE}`,
  "/day-details/parking-map": `Parking & Map — ${BASE}`,
  "/day-details/weather": `Weather Plan — ${BASE}`,
  "/day-details/accessibility": `Accessibility — ${BASE}`,
  "/day-details/food-trucks": `Food Trucks — ${BASE}`,
  "/day-details/guidelines": `Event Guidelines — ${BASE}`,
  "/day-details/what-to-bring": `What to Bring — ${BASE}`,
  "/vision": `Vision — ${BASE}`,
  "/vision/mission": `Vision & Mission — ${BASE}`,
  "/vision/unity": `Unity Across Churches — ${BASE}`,
  "/vision/church-history": `Church History — ${BASE}`,
  "/vision/partners": `Partnered Churches — ${BASE}`,
  "/support": `Support — ${BASE}`,
  "/support/volunteer": `Volunteer — ${BASE}`,
  "/support/church-partner": `Church Partner — ${BASE}`,
  "/support/donate": `Donate — ${BASE}`,
  "/support/prayer": `Prayer — ${BASE}`,
  "/faith": `Exploring Faith — ${BASE}`,
  "/faith/get-connected": `Get Connected — ${BASE}`,
  "/faith/questions": `Faith Questions — ${BASE}`,
  "/faith/contact-pastor": `Contact a Church — ${BASE}`,
  "/faq": `FAQ — ${BASE}`,
  "/contact": `Contact — ${BASE}`,
  "/testimony": `Share Your Story — ${BASE}`,
  "/volunteer-signup": `Volunteer Sign-Up — ${BASE}`,
};

const PageShell = ({ children, transparentHeader = false }: PageShellProps) => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  // Update document title per route for SEO
  useEffect(() => {
    document.title = pageTitles[pathname] || `${BASE} — August 8, 2026 · Cochrane, AB`;
  }, [pathname]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Scroll progress — gold reading bar; subtle on homepage */}
        <div className={pathname === "/" ? "opacity-50" : ""}>
          <ScrollProgress />
        </div>
        {/* Skip-to-content — WCAG 2.1 keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:px-4 focus:py-2 focus:text-xs focus:font-sans focus:uppercase focus:tracking-[0.15em] focus:bg-foreground focus:text-background focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Skip to content
        </a>
        <Header transparent={transparentHeader} />
        {!transparentHeader && <div className="h-16" aria-hidden="true" />}
        <main id="main-content" className="flex-1" role="main">{children}</main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default PageShell;
