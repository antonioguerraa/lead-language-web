import { Target, Mail, BarChart3 } from "lucide-react";
import SectionWrapper from "../layout/SectionWrapper";
import SplitText from "../reactbits/SplitText";
import AnimatedContent from "../reactbits/AnimatedContent";
import { howItWorksContent } from "../../data/content";

const iconMap = {
  target: Target,
  mail: Mail,
  "bar-chart-3": BarChart3,
};

export default function HowItWorks() {
  return (
    <SectionWrapper id="como-funciona" background="dark">
      <div className="mb-12 text-center sm:mb-16">
        <SplitText
          text={howItWorksContent.headline}
          className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          splitType="words"
          delay={60}
          duration={0.5}
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />
        <p className="mx-auto max-w-2xl text-base text-text-secondary sm:text-lg">
          {howItWorksContent.subheadline}
        </p>
      </div>

      <div className="relative mx-auto max-w-3xl">
        {/* Vertical dashed line */}
        <div className="absolute top-0 left-8 hidden h-full w-px border-l-2 border-dashed border-primary/30 md:block" />

        <div className="flex flex-col gap-12">
          {howItWorksContent.steps.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <AnimatedContent key={i} delay={i * 0.2} distance={60}>
                <div className="flex gap-4 sm:gap-6">
                  {/* Step number circle */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-navy-light sm:h-16 sm:w-16">
                    <span className="text-xl font-bold text-primary">
                      {step.number}
                    </span>
                  </div>

                  <div className="pt-2">
                    <div className="mb-2 flex items-center gap-3">
                      <Icon size={20} className="text-primary-light" />
                      <h3 className="text-xl font-bold text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedContent>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
