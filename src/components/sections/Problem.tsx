import { Clock, TrendingDown, Users, HelpCircle } from "lucide-react";
import SectionWrapper from "../layout/SectionWrapper";
import SplitText from "../reactbits/SplitText";
import AnimatedContent from "../reactbits/AnimatedContent";
import GlassCard from "../ui/GlassCard";
import { problemContent } from "../../data/content";

const iconMap = {
  clock: Clock,
  "trending-down": TrendingDown,
  "users-x": Users,
  "help-circle": HelpCircle,
};

export default function Problem() {
  return (
    <SectionWrapper id="problema">
      <div className="mb-12 text-center sm:mb-16">
        <SplitText
          text={problemContent.headline}
          className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl"
          splitType="words"
          delay={60}
          duration={0.5}
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />
        <p className="mx-auto max-w-2xl text-base text-text-secondary sm:text-lg">
          {problemContent.subheadline}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {problemContent.painPoints.map((point, i) => {
          const Icon = iconMap[point.icon];
          return (
            <AnimatedContent key={i} delay={i * 0.15} distance={60}>
              <GlassCard className="h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon size={24} className="text-primary-light" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {point.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {point.text}
                </p>
              </GlassCard>
            </AnimatedContent>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
