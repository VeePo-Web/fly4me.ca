import { Link } from "react-router-dom";
import logo from "@/assets/fly4media-mark.png";

interface Props {
  onContact: () => void;
}

export default function Footer({ onContact }: Props) {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container-x py-14 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5 mb-5">
            <img src={logo} alt="" width={28} height={28} className="size-6 object-contain" />
            <span className="text-base font-medium tracking-tight">Fly4MEdia</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            A premium aerial cinematography studio based in Alberta, Canada.
            Available worldwide.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Studio
          </p>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/work" className="hover:text-foreground/70 transition-colors">Work</Link></li>
            <li><Link to="/services" className="hover:text-foreground/70 transition-colors">Services</Link></li>
            <li><Link to="/about" className="hover:text-foreground/70 transition-colors">About</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Contact
          </p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="mailto:hello@fly4media.com" className="hover:text-foreground/70 transition-colors">
                hello@fly4media.com
              </a>
            </li>
            <li>Calgary · Alberta · Canada</li>
            <li>
              <button onClick={onContact} className="underline underline-offset-4 hover:no-underline">
                Start a project ↗
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        <span>© {new Date().getFullYear()} Fly4MEdia. All rights reserved.</span>
        <span>Cinematic Aerial Cinematography</span>
      </div>
    </footer>
  );
}
