import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import Lenis from "lenis";
import { useLocation } from "react-router-dom";

const SmoothScrollContext = createContext<Lenis | null>(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

const SmoothScrollProvider = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const instance = new Lenis({
      lerp: 0.07,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.7,
      touchMultiplier: 1.5,
    });

    lenisRef.current = instance;
    setLenis(instance);

    const raf = (time: number) => {
      instance.raf(time);
      requestAnimationFrame(raf);
    };
    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // Reset scroll on route change
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [location.pathname]);

  return (
    <SmoothScrollContext.Provider value={lenis}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScrollProvider;
