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
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

/**
 * Cinematic hero media layer.
 * - Poster paints first (acts as LCP), video fades in on `canplay`
 * - Pauses when offscreen (battery/GPU)
 * - Honors prefers-reduced-motion + Save-Data
 * - Order <source> by preference: WebM → MP4, mobile media-query first
 */
export default function HeroMedia({
  image,
  alt,
  videoSrc,
  sources,
  className = "",
  priority = false,
  width = 1920,
  height = 1080,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(true);

  const allSources: VideoSource[] =
    sources && sources.length > 0
      ? sources
      : videoSrc
        ? [{ src: videoSrc, type: "video/mp4" }]
        : [];

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
    const el = videoRef.current;
    if (!el || !enabled) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  const showVideo = enabled && allSources.length > 0;

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
      {showVideo && (
        <video
          ref={videoRef}
          poster={image}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disableRemotePlayback
          // @ts-expect-error non-standard but widely supported
          disablePictureInPicture
          aria-hidden="true"
          onCanPlay={() => setReady(true)}
          className={`absolute inset-0 w-full h-full object-cover ${className}`}
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)",
            transform: "translateZ(0)",
            willChange: "opacity",
          }}
        >
          {allSources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} media={s.media} />
          ))}
        </video>
      )}
    </>
  );
}
