import { Quote } from "lucide-react";
import SectionWrapper from "../layout/SectionWrapper";
import SplitText from "../reactbits/SplitText";
import FadeContent from "../reactbits/FadeContent";
import GlassCard from "../ui/GlassCard";
import { testimonialsContent } from "../../data/content";

export default function Testimonials() {
  return (
    <SectionWrapper id="testimonios">
      <div className="mb-12 text-center sm:mb-16">
        <SplitText
          text={testimonialsContent.headline}
          className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          splitType="words"
          delay={60}
          duration={0.5}
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />
        <p className="mx-auto max-w-2xl text-base text-text-secondary sm:text-lg">
          {testimonialsContent.subheadline}
        </p>
      </div>

      <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
        {testimonialsContent.testimonials.map((t, i) => (
          <FadeContent key={i} delay={i * 0.15} blur>
            <GlassCard className="flex h-full flex-col">
              <Quote size={28} className="mb-4 text-primary/40" />
              <p className="mb-6 flex-1 text-sm text-text-primary leading-relaxed italic sm:text-base">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-white">{t.author}</p>
                <p className="text-sm text-text-muted">{t.role}</p>
              </div>
            </GlassCard>
          </FadeContent>
        ))}
      </div>
    </SectionWrapper>
  );
}
