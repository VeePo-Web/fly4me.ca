/** Full-bleed cinematic image break — pure CSS, no JS animations. */

interface ImageInterstitialProps {
  src: string;
  alt: string;
  verse?: string;
  reference?: string;
  translation?: string;
  height?: string;
  /** CSS color for the top gradient fade (default: hsl(var(--background))) */
  bgFrom?: string;
  /** CSS color for the bottom gradient fade (default: hsl(var(--background))) */
  bgTo?: string;
  /** CSS object-position for the image (default: "center") */
  objectPosition?: string;
}

const ImageInterstitial = ({
  src,
  alt,
  verse,
  reference,
  translation = "NIV",
  height,
  bgFrom = "hsl(var(--background))",
  bgTo = "hsl(var(--background))",
  objectPosition = "center",
}: ImageInterstitialProps) => {
  const resolvedHeight = height ?? (verse ? "40vh" : "35vh");

  return (
    <div className="relative w-full overflow-hidden" style={{ height: resolvedHeight }}>
      {/* Image with slow zoom */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover animate-[slow-zoom_25s_ease-out_forwards]"
        style={{ objectPosition }}
      />

      {/* Top gradient fade */}
      <div
        className="absolute inset-x-0 top-0 h-1/3 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, ${bgFrom}, transparent)` }}
      />

      {/* Bottom gradient fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${bgTo}, transparent)` }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background) / 0.5) 100%)" }}
      />

      {/* Film grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Optional scripture overlay */}
      {verse && (
        <>
          {/* Dark radial scrim behind text for readability */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.12) 60%, transparent 85%)" }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
            {/* Gold diamond */}
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="mb-4" aria-hidden="true">
              <rect
                x="4" y="0.5"
                width="5" height="5"
                rx="0.5"
                transform="rotate(45 4 0.5)"
                stroke="hsl(var(--gold-warm))"
                strokeWidth="0.5"
                fill="hsl(var(--gold-warm))"
                fillOpacity="0.15"
              />
            </svg>
            <p
              className="font-serif text-lg md:text-xl font-light italic text-white/90 max-w-xl leading-relaxed"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6), 0 0 30px rgba(0,0,0,0.3)" }}
            >
              "{verse}"
            </p>
            {reference && (
              <span
                className="mt-3 font-sans text-[10px] uppercase tracking-[0.2em] text-white/70"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
              >
                {reference} <span className="text-white/45">&middot; {translation}</span>
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageInterstitial;
