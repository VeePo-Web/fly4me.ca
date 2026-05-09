import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useContactPanel } from "@/contexts/ContactPanelContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ContactPanelTrigger = () => {
  const { isOpen, openPanel } = useContactPanel();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Delay appearance by 1s
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Hide when footer is in view
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observerRef.current.observe(footer);
    return () => observerRef.current?.disconnect();
  }, []);

  // Hide on /contact page
  const hidden = location.pathname === "/contact" || isOpen || !visible || footerVisible;

  return (
    <TooltipProvider delayDuration={400}>
      <AnimatePresence>
        {!hidden && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-4 sm:right-6 z-50"
            style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => openPanel()}
                  className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-shadow duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 animate-[contact-pulse_8s_ease-in-out_infinite_3s]"
                  aria-label="Contact us"
                >
                  <MessageCircle className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="font-sans text-xs">
                Get in touch
              </TooltipContent>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </TooltipProvider>
  );
};

export default ContactPanelTrigger;
