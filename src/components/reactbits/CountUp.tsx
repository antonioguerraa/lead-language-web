import { useEffect, useRef, useState, useCallback } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
  separator?: string;
  suffix?: string;
}

export default function CountUp({
  to,
  from = 0,
  duration = 2,
  className = "",
  separator = "",
  suffix = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(`${from}${suffix}`);
  const hasAnimated = useRef(false);

  const formatNumber = useCallback(
    (value: number) => {
      let formatted = Math.round(value).toString();
      if (separator) {
        formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      }
      return formatted + suffix;
    },
    [separator, suffix]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const startTime = performance.now();
          const durationMs = duration * 1000;

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = from + (to - from) * eased;
            setDisplay(formatNumber(current));

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [from, to, duration, formatNumber]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
