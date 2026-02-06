import { useState, type FormEvent } from "react";
import { Send, CheckCircle } from "lucide-react";
import SectionWrapper from "../layout/SectionWrapper";
import BlurText from "../reactbits/BlurText";
import FadeContent from "../reactbits/FadeContent";
import { finalCtaContent, heroContent } from "../../data/content";
import { CONTACT_EMAIL } from "../../utils/constants";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      "Test Gratuito 14 Días"
    )}&body=${encodeURIComponent(
      `Hola, me interesa el test gratuito de 14 días.\n\nMi email: ${email}`
    )}`;

    setSubmitted(true);
  };

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
            {submitted ? (
              <div className="flex flex-col items-center gap-3">
                <CheckCircle size={48} className="text-accent" />
                <p className="text-xl font-semibold text-accent">
                  {finalCtaContent.confirmationText}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={finalCtaContent.emailPlaceholder}
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-text-muted backdrop-blur-sm outline-none transition-colors focus:border-primary sm:px-5 sm:py-4 sm:text-base"
                />
                <button
                  type="submit"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25 sm:px-6 sm:py-4 sm:text-base"
                >
                  <Send size={16} className="sm:h-[18px] sm:w-[18px]" />
                  {finalCtaContent.submitButton}
                </button>
              </form>
            )}
          </FadeContent>

          <FadeContent delay={1}>
            <p className="mt-10 text-xs text-text-muted sm:mt-12 sm:text-sm">
              {heroContent.ctaPrimary} — Sin contratos, sin permanencia.
            </p>
          </FadeContent>
        </div>
      </div>
    </SectionWrapper>
  );
}
