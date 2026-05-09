import { useState, type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ContactModal from "./ContactModal";
import { usePageEnter } from "@/hooks/usePageEnter";

type ChildArg = { openContact: () => void };

interface Props {
  children: ReactNode | ((args: ChildArg) => ReactNode);
  showFloating?: boolean;
}

export default function PageShell({ children, showFloating = true }: Props) {
  const [open, setOpen] = useState(false);
  const openContact = () => setOpen(true);
  usePageEnter();

  const rendered = typeof children === "function" ? children({ openContact }) : children;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onContact={openContact} />
      <main>{rendered}</main>
      <Footer onContact={openContact} />

      {showFloating && (
        <button
          onClick={openContact}
          aria-label="Start a project"
          data-cursor="hover"
          className="btn-primary group fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 !px-5 !py-3 md:!px-6 md:!py-3.5 text-xs md:text-sm rounded-full"
        >
          <span>Start a project</span>
          <span className="link-arrow">↗</span>
        </button>
      )}

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
