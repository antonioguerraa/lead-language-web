import BlurText from "../reactbits/BlurText";
import FadeContent from "../reactbits/FadeContent";
import Button from "../ui/Button";
import { heroContent } from "../../data/content";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      {/* Radial gradient glow — constrained to prevent overflow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px] sm:h-[600px] sm:w-[600px]" />
        <div className="absolute bottom-0 left-1/4 h-[200px] w-[200px] rounded-full bg-accent/10 blur-[100px] sm:h-[300px] sm:w-[300px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
        <BlurText
          text={heroContent.headline}
          animateBy="words"
          direction="top"
          delay={120}
          className="mb-6 justify-center text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-7xl"
          tag="h1"
        />

        <FadeContent duration={0.8} delay={0.8} blur>
          <p className="mx-auto mb-10 max-w-2xl text-base text-text-secondary sm:text-lg md:text-xl">
            {heroContent.subheadline}
          </p>
        </FadeContent>

        <FadeContent duration={0.6} delay={1.2}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="#final-cta" variant="primary">
              {heroContent.ctaPrimary}
            </Button>
            <Button href="#como-funciona" variant="secondary">
              {heroContent.ctaSecondary}
            </Button>
          </div>
        </FadeContent>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-navy to-transparent" />
    </section>
  );
}
