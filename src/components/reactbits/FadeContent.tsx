import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";

interface FadeContentProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  blur?: boolean;
  className?: string;
  threshold?: number;
}

export default function FadeContent({
  children,
  duration = 0.8,
  delay = 0,
  blur = false,
  className = "",
  threshold = 0.1,
}: FadeContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        filter: blur ? "blur(8px)" : "none",
      }}
      animate={
        isInView
          ? { opacity: 1, filter: "blur(0px)" }
          : { opacity: 0, filter: blur ? "blur(8px)" : "none" }
      }
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
