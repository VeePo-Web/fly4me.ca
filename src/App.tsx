import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";

import { ContactPanelProvider } from "./contexts/ContactPanelContext";
import ContactPanelTrigger from "./components/ContactPanelTrigger";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import VeilIntro from "./components/VeilIntro";
const LazyContactPanel = lazy(() => import("./components/ContactPanel"));
import Index from "./pages/Index";
import DayDetails from "./pages/DayDetails";
import Schedule from "./pages/day-details/Schedule";
import ParkingMap from "./pages/day-details/ParkingMap";
import Weather from "./pages/day-details/Weather";
import AccessibilityPage from "./pages/day-details/Accessibility";
import FoodTrucks from "./pages/day-details/FoodTrucks";
import Guidelines from "./pages/day-details/Guidelines";
import WhatToBring from "./pages/day-details/WhatToBring";
import Vision from "./pages/Vision";
import Mission from "./pages/vision/Mission";
import Unity from "./pages/vision/Unity";
import ChurchHistory from "./pages/vision/ChurchHistory";
import Partners from "./pages/vision/Partners";
import Support from "./pages/Support";
import Volunteer from "./pages/support/Volunteer";
import ChurchPartner from "./pages/support/ChurchPartner";
import Donate from "./pages/support/Donate";
import Prayer from "./pages/support/Prayer";
import Faith from "./pages/Faith";
import GetConnected from "./pages/faith/GetConnected";
import FaithQuestions from "./pages/faith/FaithQuestions";
import ContactPastor from "./pages/faith/ContactPastor";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Testimony from "./pages/Testimony";
import VolunteerSignup from "./pages/VolunteerSignup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/day-details" element={<DayDetails />} />
        <Route path="/day-details/schedule" element={<Schedule />} />
        <Route path="/day-details/parking-map" element={<ParkingMap />} />
        <Route path="/day-details/weather" element={<Weather />} />
        <Route path="/day-details/accessibility" element={<AccessibilityPage />} />
        <Route path="/day-details/food-trucks" element={<FoodTrucks />} />
        <Route path="/day-details/guidelines" element={<Guidelines />} />
        <Route path="/day-details/what-to-bring" element={<WhatToBring />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/vision/mission" element={<Mission />} />
        <Route path="/vision/unity" element={<Unity />} />
        <Route path="/vision/church-history" element={<ChurchHistory />} />
        <Route path="/vision/partners" element={<Partners />} />
        <Route path="/support" element={<Support />} />
        <Route path="/support/volunteer" element={<Volunteer />} />
        <Route path="/support/church-partner" element={<ChurchPartner />} />
        <Route path="/support/donate" element={<Donate />} />
        <Route path="/support/prayer" element={<Prayer />} />
        <Route path="/faith" element={<Faith />} />
        <Route path="/faith/get-connected" element={<GetConnected />} />
        <Route path="/faith/questions" element={<FaithQuestions />} />
        <Route path="/faith/contact-pastor" element={<ContactPastor />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/testimony" element={<Testimony />} />
        <Route path="/volunteer-signup" element={<VolunteerSignup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ContactPanelProvider>
          <VeilIntro />
          <SmoothScrollProvider>
            <AnimatedRoutes />
          </SmoothScrollProvider>
          <ContactPanelTrigger />
          <Suspense fallback={null}>
            <LazyContactPanel />
          </Suspense>
        </ContactPanelProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
