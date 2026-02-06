import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedContentProps {
  children: ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
}

export default function AnimatedContent({
  children,
  distance = 80,
  direction = "vertical",
  duration = 0.8,
  delay = 0,
  threshold = 0.1,
  className = "",
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromVars: gsap.TweenVars =
      direction === "vertical"
        ? { y: distance, opacity: 0 }
        : { x: distance, opacity: 0 };

    const toVars: gsap.TweenVars =
      direction === "vertical"
        ? { y: 0, opacity: 1, duration, delay, ease: "power2.out" }
        : { x: 0, opacity: 1, duration, delay, ease: "power2.out" };

    gsap.set(el, fromVars);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: `top ${100 - threshold * 100}%`,
      once: true,
      onEnter: () => gsap.to(el, toVars),
    });

    return () => trigger.kill();
  }, [distance, direction, duration, delay, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
