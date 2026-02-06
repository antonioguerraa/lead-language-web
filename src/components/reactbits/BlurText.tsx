import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export default function BlurText({
  text,
  delay = 100,
  animateBy = "words",
  direction = "top",
  className = "",
  tag = "p",
}: BlurTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const elements = animateBy === "words" ? text.split(" ") : text.split("");

  const yFrom = direction === "top" ? -20 : 20;

  const Tag = tag;

  return (
    <Tag ref={ref as React.RefObject<never>} className={`flex flex-wrap ${className}`}>
      {elements.map((el, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(10px)", y: yFrom }}
          animate={
            isInView
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: "blur(10px)", y: yFrom }
          }
          transition={{
            duration: 0.4,
            delay: i * (delay / 1000),
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {el}
          {animateBy === "words" && i < elements.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
