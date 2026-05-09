import { useState, type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ContactModal from "./ContactModal";

interface Props {
  children: ReactNode;
  /** Hides the floating button if false (e.g. on home where hero already has CTAs). */
  showFloating?: boolean;
}

export default function PageShell({ children, showFloating = true }: Props) {
  const [open, setOpen] = useState(false);
  const openContact = () => setOpen(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onContact={openContact} />
      <main>{typeof children === "function" ? (children as never)({ openContact }) : children}</main>
      <Footer onContact={openContact} />

      {showFloating && (
        <button
          onClick={openContact}
          aria-label="Start a project"
          className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 bg-foreground text-background text-xs md:text-sm font-medium px-5 py-3 md:px-6 md:py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:opacity-90 transition-opacity"
        >
          Start a project ↗
        </button>
      )}

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
