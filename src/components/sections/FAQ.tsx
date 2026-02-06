import SectionWrapper from "../layout/SectionWrapper";
import SplitText from "../reactbits/SplitText";
import AnimatedContent from "../reactbits/AnimatedContent";
import Accordion from "../ui/Accordion";
import { faqContent } from "../../data/content";

export default function FAQ() {
  return (
    <SectionWrapper id="faq">
      <div className="mb-12 text-center sm:mb-16">
        <SplitText
          text={faqContent.headline}
          className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          splitType="words"
          delay={60}
          duration={0.5}
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />
      </div>

      <AnimatedContent distance={40}>
        <div className="mx-auto max-w-3xl">
          <Accordion items={faqContent.questions} />
        </div>
      </AnimatedContent>
    </SectionWrapper>
  );
}
