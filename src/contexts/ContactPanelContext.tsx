import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type ContactPathway = "general" | "church-partner" | "pastor" | "volunteer" | "prayer" | "donate" | null;

interface ContactPanelState {
  isOpen: boolean;
  activePathway: ContactPathway;
  openPanel: (pathway?: ContactPathway) => void;
  closePanel: () => void;
  setPathway: (pathway: ContactPathway) => void;
}

const ContactPanelContext = createContext<ContactPanelState | undefined>(undefined);

export const ContactPanelProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePathway, setActivePathway] = useState<ContactPathway>(null);

  const openPanel = useCallback((pathway: ContactPathway = null) => {
    setActivePathway(pathway);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);
    setActivePathway(null);
    document.body.style.overflow = "";
  }, []);

  const setPathway = useCallback((pathway: ContactPathway) => {
    setActivePathway(pathway);
  }, []);

  return (
    <ContactPanelContext.Provider value={{ isOpen, activePathway, openPanel, closePanel, setPathway }}>
      {children}
    </ContactPanelContext.Provider>
  );
};

export const useContactPanel = () => {
  const ctx = useContext(ContactPanelContext);
  if (!ctx) throw new Error("useContactPanel must be used within ContactPanelProvider");
  return ctx;
};
