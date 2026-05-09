import { ReactNode, Children, isValidElement } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import ScrollProgress from "./ScrollProgress";
import TextReveal from "./TextReveal";



interface SubPageProps {
  title: string;
  hubTitle: string;
  hubPath: string;
  children: ReactNode;
}

const SubPage = ({ title, hubTitle, hubPath, children }: SubPageProps) => (
  <>
  <ScrollProgress />
  <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 relative">
    {/* Ghost cross watermark */}
    <div className="absolute right-4 md:right-0 top-20 pointer-events-none" aria-hidden="true">
      <div className="relative">
        <div className="w-px h-20 bg-foreground/[0.025] animate-cross-breathe" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-14 h-px bg-foreground/[0.025] animate-cross-breathe" />
      </div>
    </div>

    {/* Breadcrumb */}
    <ScrollReveal weight="light">
      <nav
        className="flex flex-wrap items-center gap-1 sm:gap-1.5 text-xs font-sans uppercase tracking-[0.12em] text-muted-foreground mb-10"
        style={{ fontFeatureSettings: '"cv02"' }}
        aria-label="Breadcrumb"
      >
        <Link to="/" className="hover:text-foreground transition-colors duration-300 link-reveal pb-0.5">Home</Link>
        <ChevronRight size={10} strokeWidth={1.5} className="text-muted-foreground/40" />
        <Link to={hubPath} className="hover:text-foreground transition-colors duration-300 link-reveal pb-0.5">{hubTitle}</Link>
        <ChevronRight size={10} strokeWidth={1.5} className="text-muted-foreground/40" />
        <span className="text-foreground/70">{title}</span>
      </nav>
    </ScrollReveal>

    <h1
      className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-4"
      style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
    >
      <TextReveal delay={0.3}>{title}</TextReveal>
    </h1>

    {/* Editorial separator — refined double-line with dot */}
    <div
      className="flex items-center gap-2 mb-12 animate-[separator-in_0.8s_cubic-bezier(0.16,1,0.3,1)_0.5s_both]"
      aria-hidden="true"
    >
      <div className="w-8 h-px bg-primary/30" />
      <div className="size-1 rounded-full bg-primary/20" />
      <div className="w-3 h-px bg-primary/15" />
    </div>

    <div className="space-y-14">
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;
        // Skip wrapping nav components that have their own ScrollReveal
        const type = child.type as any;
        const displayName = type?.displayName || type?.name || "";
        const isNavComponent = displayName.includes("Nav") || 
          (typeof type === "function" && /Nav$/.test(type.name || ""));
        if (isNavComponent) return child;
        return (
          <ScrollReveal key={index} delay={index * 0.12} direction="up" weight="normal">
            {child}
          </ScrollReveal>
        );
      })}
    </div>

    {/* Back to hub link at bottom */}
    <ScrollReveal delay={0.3}>
      <div className="mt-20 pt-8 border-t border-border/30">
        <Link
          to={hubPath}
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors duration-300 group"
          style={{ fontFeatureSettings: '"cv02"' }}
        >
          <ChevronRight size={10} strokeWidth={1.5} className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to {hubTitle}
        </Link>
      </div>
    </ScrollReveal>
  </div>
  </>
);

export default SubPage;
