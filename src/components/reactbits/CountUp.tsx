import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  suffix?: string;
  onEnd?: () => void;
}

export default function CountUp({
  to,
  from = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  suffix = "",
  onEnd,
}: CountUpProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inViewRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(inViewRef, { once: true, margin: "-50px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || !startWhen || hasAnimated) return;

    setHasAnimated(true);
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        let formatted = Math.round(value).toString();
        if (separator) {
          formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        }
        node.textContent = formatted + suffix;
      },
      onComplete: onEnd,
    });

    return () => controls.stop();
  }, [isInView, startWhen, from, to, duration, separator, suffix, hasAnimated, onEnd]);

  return (
    <span ref={inViewRef} className={className}>
      <span ref={nodeRef}>{from}{suffix}</span>
    </span>
  );
}
