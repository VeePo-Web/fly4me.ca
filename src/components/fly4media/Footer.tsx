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
          <p className="t-meta text-muted-foreground max-w-xs">
            A cinematic perspective studio. We help brands, places, and stories
            be seen — and remembered.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="t-eyebrow text-muted-foreground mb-4">
            Studio
          </p>
          <ul className="space-y-2.5 t-body">
            <li><Link to="/work" data-cursor="hover" className="link-underline">Work</Link></li>
            <li><Link to="/services" data-cursor="hover" className="link-underline">Services</Link></li>
            <li><Link to="/about" data-cursor="hover" className="link-underline">About</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="t-eyebrow text-muted-foreground mb-4">
            Contact
          </p>
          <ul className="space-y-2.5 t-body">
            <li>
              <a href="mailto:hello@fly4media.com" data-cursor="hover" className="link-underline">
                hello@fly4media.com
              </a>
            </li>
            <li className="text-muted-foreground">Calgary · Alberta · Canada</li>
            <li>
              <button onClick={onContact} data-cursor="hover" className="group inline-flex items-center gap-1.5">
                <span className="link-underline">Start a project</span>
                <span className="link-arrow">↗</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 t-micro text-muted-foreground">
        <span>© {new Date().getFullYear()} Fly4MEdia. All rights reserved.</span>
        <span>Cinematic perspective studio · Alberta</span>
      </div>
    </footer>
  );
}
