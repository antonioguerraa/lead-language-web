import type { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  background?: "default" | "dark" | "gradient";
}

export default function SectionWrapper({
  id,
  children,
  className = "",
  background = "default",
}: SectionWrapperProps) {
  const bgClasses = {
    default: "bg-navy",
    dark: "bg-navy-light",
    gradient: "bg-gradient-to-b from-navy via-navy-light to-navy",
  };

  return (
    <section id={id} className={`py-16 sm:py-20 md:py-28 overflow-hidden ${bgClasses[background]} ${className}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
