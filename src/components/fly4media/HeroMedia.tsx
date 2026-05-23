import { useEffect, useRef, useState } from "react";

interface VideoSource {
  src: string;
  type: string;
  media?: string;
}

interface Props {
  image: string;
  alt: string;
  /** Single src (legacy) — use `sources` for multi-format / responsive */
  videoSrc?: string;
  sources?: VideoSource[];
  /** Optional second clip — first clip plays once, then this takes over and loops */
  nextSources?: VideoSource[];
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

/**
 * Cinematic hero media layer.
 * - Poster paints first (acts as LCP), first video fades in on `canplay`
 * - When `nextSources` is provided, BOTH videos are mounted simultaneously.
 *   The second clip is preloaded silently while the first is playing, then we
 *   cross-fade between them on `ended` — no poster flash, no gap.
 * - Pauses when offscreen (battery/GPU)
 * - Honors prefers-reduced-motion + Save-Data
 */
export default function HeroMedia({
  image,
  alt,
  videoSrc,
  sources,
  nextSources,
  className = "",
  priority = false,
  width = 1920,
  height = 1080,
}: Props) {
  const firstRef = useRef<HTMLVideoElement>(null);
  const nextRef = useRef<HTMLVideoElement>(null);
  const [firstReady, setFirstReady] = useState(false);
  const [nextReady, setNextReady] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [phase, setPhase] = useState<"first" | "next">("first");

  const firstSources: VideoSource[] =
    sources && sources.length > 0
      ? sources
      : videoSrc
        ? [{ src: videoSrc, type: "video/mp4" }]
        : [];

  const hasSequence = !!(nextSources && nextSources.length > 0);

  // Respect reduced motion + save-data
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const saveData = conn?.saveData === true;
    const slow = conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g";
    if (reduce || saveData || slow) setEnabled(false);
  }, []);

  // Pause when offscreen
  useEffect(() => {
    if (!enabled) return;
    const active = phase === "next" ? nextRef.current : firstRef.current;
    const inactive = phase === "next" ? firstRef.current : nextRef.current;
    if (inactive) inactive.pause();
    if (!active) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) active.play().catch(() => {});
        else active.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(active);
    return () => io.disconnect();
  }, [enabled, phase]);

  const handleFirstEnded = () => {
    if (!hasSequence) return;
    const v = nextRef.current;
    if (v) v.play().catch(() => {});
    setPhase("next");
  };

  const showFirst = enabled && firstSources.length > 0;
  const showNext = enabled && hasSequence;

  return (
    <>
      <img
        src={image}
        alt={alt}
        width={width}
        height={height}
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
        style={{ transform: "translateZ(0)" }}
      />

      {/* First clip — visible until it ends */}
      {showFirst && (
        <video
          ref={firstRef}
          poster={image}
          autoPlay
          muted
          loop={!hasSequence}
          playsInline
          preload="auto"
          disableRemotePlayback
          disablePictureInPicture
          aria-hidden="true"
          onCanPlay={() => setFirstReady(true)}
          onEnded={handleFirstEnded}
          className={`absolute inset-0 w-full h-full object-cover ${className}`}
          style={{
            opacity: firstReady && phase === "first" ? 1 : 0,
            transition: "opacity 800ms cubic-bezier(0.22, 1, 0.36, 1)",
            transform: "translateZ(0)",
            willChange: "opacity",
            zIndex: 1,
          }}
        >
          {firstSources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} media={s.media} />
          ))}
        </video>
      )}

      {/* Second clip — preloads silently behind the first, then cross-fades up */}
      {showNext && (
        <video
          ref={nextRef}
          poster={image}
          muted
          loop
          playsInline
          preload="auto"
          disableRemotePlayback
          disablePictureInPicture
          aria-hidden="true"
          onCanPlay={() => setNextReady(true)}
          className={`absolute inset-0 w-full h-full object-cover ${className}`}
          style={{
            opacity: phase === "next" && nextReady ? 1 : 0,
            transition: "opacity 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
            transform: "translateZ(0)",
            willChange: "opacity",
            zIndex: 2,
          }}
        >
          {nextSources!.map((s) => (
            <source key={s.src} src={s.src} type={s.type} media={s.media} />
          ))}
        </video>
      )}
    </>
  );
}
