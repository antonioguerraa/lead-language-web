import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right";
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 0.6,
  ease = "power2.out",
  splitType = "words",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  textAlign = "center",
  onLetterAnimationComplete,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLSpanElement[]>([]);

  const splitContent = useCallback(() => {
    if (splitType === "chars") return text.split("");
    if (splitType === "words") return text.split(" ");
    return [text];
  }, [text, splitType]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = elementsRef.current.filter(Boolean);

    gsap.set(elements, from);

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: `top ${100 - threshold * 100}%`,
      once: true,
      onEnter: () => {
        gsap.to(elements, {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          onComplete: onLetterAnimationComplete,
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [text, delay, duration, ease, from, to, threshold, onLetterAnimationComplete]);

  const parts = splitContent();

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ textAlign, display: "flex", flexWrap: "wrap", justifyContent: textAlign === "center" ? "center" : textAlign === "right" ? "flex-end" : "flex-start" }}
    >
      {parts.map((part, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) elementsRef.current[i] = el;
          }}
          style={{ display: "inline-block", opacity: 0 }}
        >
          {part}
          {splitType === "words" && i < parts.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </div>
  );
}
