import { cn } from "@/lib/utils";

interface EditorialImageProps {
  src: string;
  alt: string;
  caption?: string;
  variant?: "inset" | "bleed";
  className?: string;
}

const EditorialImage = ({
  src,
  alt,
  caption,
  variant = "inset",
  className,
}: EditorialImageProps) => {
  if (variant === "bleed") {
    return (
      <figure className={cn("relative w-[100vw] left-1/2 -translate-x-1/2 h-[40vh] overflow-x-clip overflow-y-hidden", className)}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover animate-[slow-zoom_25s_ease-out_forwards]"
        />
        {/* Top + bottom gradient fade into background */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
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
        {caption && (
          <figcaption className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-sans uppercase tracking-[0.2em] text-foreground/70 z-10">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className={cn("group relative max-w-3xl w-full mx-auto overflow-hidden", className)}>
      <div className="relative border border-border/40 shadow-sm group-hover:shadow-md transition-shadow duration-500 overflow-hidden">
        {/* Gold left accent */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px] z-10"
          style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.3), hsl(var(--gold-warm) / 0.1))" }}
        />
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground pl-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default EditorialImage;
