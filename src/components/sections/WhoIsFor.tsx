import { Check, X } from "lucide-react";
import SectionWrapper from "../layout/SectionWrapper";
import SplitText from "../reactbits/SplitText";
import AnimatedContent from "../reactbits/AnimatedContent";
import { whoIsForContent } from "../../data/content";

export default function WhoIsFor() {
  return (
    <SectionWrapper id="para-quien" background="dark">
      <div className="mb-12 text-center sm:mb-16">
        <SplitText
          text={whoIsForContent.headline}
          className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          splitType="words"
          delay={60}
          duration={0.5}
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 md:gap-8">
        {/* For you */}
        <AnimatedContent distance={40}>
          <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
            <h3 className="mb-5 text-lg font-bold text-accent sm:mb-6 sm:text-xl">
              {whoIsForContent.forYou.title}
            </h3>
            <ul className="flex flex-col gap-3 sm:gap-4">
              {whoIsForContent.forYou.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check
                    size={20}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <span className="text-sm text-text-primary sm:text-base">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedContent>

        {/* Not for you */}
        <AnimatedContent distance={40} delay={0.15}>
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 sm:p-8">
            <h3 className="mb-5 text-lg font-bold text-red-400 sm:mb-6 sm:text-xl">
              {whoIsForContent.notForYou.title}
            </h3>
            <ul className="flex flex-col gap-3 sm:gap-4">
              {whoIsForContent.notForYou.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X
                    size={20}
                    className="mt-0.5 shrink-0 text-red-400"
                  />
                  <span className="text-sm text-text-primary sm:text-base">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedContent>
      </div>
    </SectionWrapper>
  );
}
