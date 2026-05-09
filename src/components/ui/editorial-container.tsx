import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EditorialContainerProps {
  children: ReactNode;
  className?: string;
  layout?: "center" | "split" | "sidebar" | "wide";
}

export const EditorialContainer = ({ 
  children, 
  className,
  layout = "center" 
}: EditorialContainerProps) => {
  return (
    <div 
      className={cn(
        "w-full mx-auto py-16 md:py-24 px-6",
        layout === "center" && "max-w-5xl flex flex-col items-center text-center",
        layout === "split" && "max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start",
        layout === "sidebar" && "max-w-5xl grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-12 lg:gap-24 items-start",
        layout === "wide" && "max-w-7xl flex flex-col items-center text-center",
        className
      )}
    >
      {children}
    </div>
  );
};
