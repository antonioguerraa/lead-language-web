import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import SectionWrapper from "../layout/SectionWrapper";
import SplitText from "../reactbits/SplitText";
import AnimatedContent from "../reactbits/AnimatedContent";
import FadeContent from "../reactbits/FadeContent";
import { offerContent } from "../../data/content";

export default function Offer() {
  return (
    <SectionWrapper id="oferta">
      <div className="mb-12 text-center sm:mb-16">
        <SplitText
          text={offerContent.headline}
          className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          splitType="words"
          delay={60}
          duration={0.5}
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />
        <p className="mx-auto max-w-2xl text-base text-text-secondary sm:text-lg">
          {offerContent.subheadline}
        </p>
      </div>

      <AnimatedContent distance={60}>
        <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8 md:p-10">
          {/* Value stack */}
          <div className="mb-8 flex flex-col gap-4 sm:gap-5">
            {offerContent.valueStack.map((item, i) => (
              <div key={i} className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <span className="text-sm text-text-primary sm:text-base">{item.item}</span>
                </div>
                <span className="shrink-0 text-sm text-text-muted line-through sm:text-base">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="mb-8 border-t border-white/10" />

          {/* Total */}
          <div className="mb-6 text-center">
            <p className="mb-1 text-base text-text-secondary sm:text-lg">
              Valor total:{" "}
              <span className="text-text-muted line-through">
                {offerContent.totalValue}
              </span>
            </p>
            <p className="text-2xl font-extrabold text-accent sm:text-3xl md:text-4xl">
              {offerContent.actualPrice}
            </p>
          </div>

          {/* Risk reversal */}
          <FadeContent delay={0.3} blur>
            <p className="mb-8 text-center text-sm text-text-muted">
              {offerContent.riskReversal}
            </p>
          </FadeContent>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/simulador"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 cursor-pointer sm:px-8 sm:py-4 sm:text-base bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 w-full sm:w-auto"
            >
              {offerContent.ctaButton}
            </Link>
          </div>
        </div>
      </AnimatedContent>
    </SectionWrapper>
  );
}
