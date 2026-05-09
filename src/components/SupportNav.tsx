import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ArrowLeft, HandHeart, Church, DollarSign, Heart } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const allLinks = [
  { to: "/support/volunteer", label: "Volunteer", icon: HandHeart },
  { to: "/support/church-partner", label: "Church Partner", icon: Church },
  { to: "/support/donate", label: "Donate", icon: DollarSign },
  { to: "/support/prayer", label: "Prayer", icon: Heart },
];

const SupportNav = () => {
  const { pathname } = useLocation();
  const siblings = allLinks.filter((l) => l.to !== pathname);

  return (
    <ScrollReveal delay={0.15}>
      <nav aria-label="More ways to support" className="border-t border-border/40 pt-10 mt-4">
        <div className="mb-8 animate-[fade-in_0.4s_cubic-bezier(0.16,1,0.3,1)_both]">
          <Link
            to="/support"
            className="group relative flex items-center gap-3 border border-border/30 bg-muted/20 hover:bg-muted/40 px-4 py-3.5 transition-all duration-300 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500 group-hover:w-[3px]"
              style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.4), hsl(var(--gold-warm) / 0.15))" }}
            />
            <ArrowLeft size={14} strokeWidth={1.5} className="text-muted-foreground/70 group-hover:text-foreground/70 group-hover:-translate-x-0.5 transition-all duration-300 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground">Support</p>
              <p className="text-[10px] text-muted-foreground truncate">All ways to serve and give</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="relative" aria-hidden="true">
            <div className="w-px h-3 bg-primary/15 mx-auto" />
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-px bg-primary/15" />
          </div>
          <p
            className="text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground"
            style={{ fontFeatureSettings: '"cv02"' }}
          >
            More ways to support
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {siblings.map((link, i) => (
            <div
              key={link.to}
              className="animate-[fade-in_0.4s_cubic-bezier(0.16,1,0.3,1)_both]"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <Link
                to={link.to}
                className="group relative inline-flex items-center gap-2 border border-border/30 bg-muted/20 hover:bg-muted/40 hover:border-primary/15 px-3.5 py-2.5 text-xs text-muted-foreground hover:text-foreground transition-all duration-300 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1 focus-visible:ring-offset-background"
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-[1.5px] transition-all duration-500 group-hover:w-[2px]"
                  style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.3), hsl(var(--gold-warm) / 0.1))" }}
                  aria-hidden="true"
                />
                <link.icon size={13} strokeWidth={1.3} className="flex-shrink-0 opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                {link.label}
                <ArrowRight size={10} strokeWidth={1.5} className="opacity-0 -ml-1 group-hover:opacity-60 group-hover:ml-0 transition-all duration-200" />
              </Link>
            </div>
          ))}
        </div>
      </nav>
    </ScrollReveal>
  );
};

export default SupportNav;
