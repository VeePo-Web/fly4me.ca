import { useReveal } from "./useReveal";
import CinematicMedia from "./CinematicMedia";
import type { Project, GalleryItem } from "@/data/projects";

export default function CaseStudyGallery({ project }: { project: Project }) {
  return (
    <section className="bg-background pb-24 md:pb-40">
      <div className="container-x grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-y-32">
        {project.gallery.map((item, i) => (
          <GalleryTile key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

function GalleryTile({ item, index }: { item: GalleryItem; index: number }) {
  const ref = useReveal<HTMLDivElement>();
  const layout =
    item.ratio === "wide"
      ? "md:col-span-12"
      : index % 2 === 0
        ? "md:col-span-7 md:col-start-1"
        : "md:col-span-6 md:col-start-7";
  const aspect =
    item.ratio === "wide"
      ? "aspect-[16/9]"
      : item.ratio === "portrait"
        ? "aspect-[4/5]"
        : "aspect-square";
  return (
    <div ref={ref} className={`reveal group ${layout}`}>
      <div className={`media-frame ${aspect}`}>
        <CinematicMedia
          image={item.src}
          alt={item.alt}
          sources={item.videoSources}
          objectPosition={item.objectPosition}
          width={item.ratio === "wide" ? 1920 : 1280}
          height={item.ratio === "wide" ? 1080 : 1600}
        />
      </div>
    </div>
  );
}
