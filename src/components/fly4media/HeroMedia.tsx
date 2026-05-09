interface Props {
  image: string;
  alt: string;
  videoSrc?: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

/**
 * Renders a still image today; drop in `videoSrc` later for autoplay loop.
 * No layout changes required when real footage arrives.
 */
export default function HeroMedia({
  image,
  alt,
  videoSrc,
  className = "",
  priority = false,
  width = 1920,
  height = 1080,
}: Props) {
  if (videoSrc) {
    return (
      <video
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
        src={videoSrc}
        poster={image}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
      />
    );
  }
  return (
    <img
      src={image}
      alt={alt}
      width={width}
      height={height}
      fetchPriority={priority ? "high" : "auto"}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
    />
  );
}
