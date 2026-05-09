import { useState } from "react";
import Header from "@/components/fly4media/Header";
import Hero from "@/components/fly4media/Hero";
import FeaturedWork from "@/components/fly4media/FeaturedWork";
import BrandStatement from "@/components/fly4media/BrandStatement";
import Services from "@/components/fly4media/Services";
import Divider from "@/components/fly4media/Divider";
import CaseStudyTeaser from "@/components/fly4media/CaseStudyTeaser";
import CTA from "@/components/fly4media/CTA";
import Footer from "@/components/fly4media/Footer";
import ContactModal from "@/components/fly4media/ContactModal";
import Intro from "@/components/fly4media/Intro";

const Index = () => {
  const [open, setOpen] = useState(false);
  const openContact = () => setOpen(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onContact={openContact} />
      <main>
        <Hero onContact={openContact} />
        <FeaturedWork />
        <BrandStatement />
        <Services />
        <Divider />
        <CaseStudyTeaser />
        <CTA onContact={openContact} />
      </main>
      <Footer onContact={openContact} />

      <button
        onClick={openContact}
        aria-label="Start a project"
        className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 bg-foreground text-background text-xs md:text-sm font-medium px-5 py-3 md:px-6 md:py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:opacity-90 transition-opacity"
      >
        Start a project ↗
      </button>

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Index;
