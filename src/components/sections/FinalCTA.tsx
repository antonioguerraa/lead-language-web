import { Link } from "react-router-dom";
import SectionWrapper from "../layout/SectionWrapper";
import BlurText from "../reactbits/BlurText";
import FadeContent from "../reactbits/FadeContent";
import { finalCtaContent } from "../../data/content";

export default function FinalCTA() {
  return (
    <SectionWrapper id="final-cta" background="gradient">
      <div className="relative mx-auto max-w-2xl text-center">
        {/* Glow — constrained */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[100px] sm:h-[400px] sm:w-[400px]" />
        </div>

        <div className="relative z-10">
          <BlurText
            text={finalCtaContent.headline}
            animateBy="words"
            direction="top"
            delay={100}
            className="mb-6 justify-center text-3xl font-extrabold text-white sm:text-4xl md:text-5xl"
            tag="h2"
          />

          <FadeContent delay={0.5} blur>
            <p className="mb-10 text-base text-text-secondary sm:text-lg">
              {finalCtaContent.subheadline}
            </p>
          </FadeContent>

          <FadeContent delay={0.8}>
            <Link
              to="/simulador"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 cursor-pointer sm:px-8 sm:py-4 sm:text-base bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5"
            >
              {finalCtaContent.ctaButton}
            </Link>
          </FadeContent>

          <FadeContent delay={1}>
            <p className="mt-10 text-xs text-text-muted sm:mt-12 sm:text-sm">
              Sin contratos, sin permanencia.
            </p>
          </FadeContent>
        </div>
      </div>
    </SectionWrapper>
  );
}
