import { TrendingUp } from "lucide-react";
import SectionWrapper from "../layout/SectionWrapper";
import SplitText from "../reactbits/SplitText";
import AnimatedContent from "../reactbits/AnimatedContent";
import { colaboracionContent } from "../../data/content";

export default function Colaboracion() {
  const c = colaboracionContent;

  return (
    <SectionWrapper id="colaboracion" background="dark">
      <div className="mb-12 text-center sm:mb-16">
        <SplitText
          text={c.headline}
          className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          splitType="words"
          delay={60}
          duration={0.5}
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />
        <p className="mx-auto max-w-2xl text-base text-text-secondary sm:text-lg">
          {c.intro}
        </p>
      </div>

      <AnimatedContent distance={40}>
        <div className="mx-auto max-w-3xl">
          {/* Main model callout */}
          <div className="relative mb-8 overflow-hidden rounded-2xl border border-primary/30 bg-primary/10 p-8 text-center sm:p-10">
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <TrendingUp className="h-6 w-6 text-primary-light" />
                </div>
                <span className="text-5xl font-extrabold text-white">20%</span>
              </div>
              <p className="mx-auto max-w-xl text-base text-text-secondary sm:text-lg">
                {c.model}
              </p>
            </div>
          </div>

          {/* Conclusion + post-period */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-lg font-semibold text-white">{c.conclusion}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm leading-relaxed text-text-secondary">
                {c.postPeriod}
              </p>
            </div>
          </div>
        </div>
      </AnimatedContent>
    </SectionWrapper>
  );
}
