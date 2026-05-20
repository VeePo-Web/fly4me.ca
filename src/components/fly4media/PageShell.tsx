import { useState, type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ContactModal from "./ContactModal";
import { usePageEnter } from "@/hooks/usePageEnter";

type ChildArg = { openContact: () => void };

interface Props {
  children: ReactNode | ((args: ChildArg) => ReactNode);
}

export default function PageShell({ children }: Props) {
  const [open, setOpen] = useState(false);
  const openContact = () => setOpen(true);
  usePageEnter();
  /* useScrollVelocity removed — it powered the scroll-blur on .media-img
     which degraded 4K drone footage. The blur is gone; the hook is gone. */

  const rendered = typeof children === "function" ? children({ openContact }) : children;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onContact={openContact} />
      <main>{rendered}</main>
      <Footer onContact={openContact} />
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
