import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm ${
        hover
          ? "transition-all duration-300 hover:border-primary/30 hover:bg-white/10"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
