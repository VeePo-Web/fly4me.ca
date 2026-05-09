import { useReveal } from "./useReveal";
import type { Project } from "@/data/projects";

export default function CaseStudyGallery({ project }: { project: Project }) {
  return (
    <section className="bg-background pb-24 md:pb-40">
      <div className="container-x grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-y-32">
        {project.gallery.map((img, i) => (
          <GalleryImage key={i} src={img.src} alt={img.alt} ratio={img.ratio} index={i} />
        ))}
      </div>
    </section>
  );
}

function GalleryImage({
  src,
  alt,
  ratio,
  index,
}: {
  src: string;
  alt: string;
  ratio: "wide" | "portrait" | "square";
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  // Alternate offsets for editorial composition
  const layout =
    ratio === "wide"
      ? "md:col-span-12"
      : index % 2 === 0
        ? "md:col-span-7 md:col-start-1"
        : "md:col-span-6 md:col-start-7";
  const aspect =
    ratio === "wide" ? "aspect-[16/9]" : ratio === "portrait" ? "aspect-[4/5]" : "aspect-square";
  return (
    <div ref={ref} className={`reveal group ${layout}`}>
      <div className={`media-frame ${aspect}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          width={ratio === "wide" ? 1920 : 1280}
          height={ratio === "wide" ? 1080 : 1600}
          className="media-img"
        />
      </div>
    </div>
  );
}
