import { motion } from "motion/react";
import type { AnalysisResult } from "../../types/funnel";
import { funnelContent } from "../../data/funnel-content";

interface StepCampanaProps {
  analysis: AnalysisResult;
  onNext: () => void;
}

export default function StepCampana({ analysis, onNext }: StepCampanaProps) {
  const { stepCampana } = funnelContent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <div className="mb-8">
        <p className="text-primary font-semibold mb-2">{stepCampana.subtitle}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
          {stepCampana.title}
        </h2>
        <p className="text-text-secondary text-lg">{stepCampana.intro}</p>
      </div>

      {/* Ad Copies */}
      <Section title={stepCampana.sections.adCopies.title}>
        <div className="space-y-4">
          {analysis.campaign_strategy.ad_copies.slice(0, 2).map((copy, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-white/5 rounded-xl p-5 border border-white/5"
            >
              <p className="text-xs text-text-muted mb-2 uppercase tracking-wide">
                Anuncio {i + 1}
              </p>
              <p className="text-text-primary leading-relaxed">{copy}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Targeting */}
      <Section title={stepCampana.sections.targeting.title}>
        <ul className="space-y-3">
          {analysis.campaign_strategy.targeting.slice(0, 3).map((target, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-text-primary bg-white/5 rounded-lg px-4 py-3 border border-white/5"
            >
              {target}
            </motion.li>
          ))}
        </ul>
      </Section>

      {/* Audiences */}
      <Section title={stepCampana.sections.audiences.title}>
        <div className="grid gap-4">
          {analysis.campaign_strategy.audiences.slice(0, 2).map((audience, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.15 }}
              className="bg-white/5 rounded-lg px-4 py-3 border border-white/5 text-text-primary"
            >
              {audience}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Methodology */}
      <div className="mt-10 bg-primary/10 border border-primary/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-text-primary mb-4">
          {stepCampana.methodology.title}
        </h3>
        <ul className="space-y-3">
          {stepCampana.methodology.points.map((point, i) => (
            <li key={i} className="text-text-secondary leading-relaxed">
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={onNext}
          className="
            px-8 py-4 rounded-lg font-semibold text-lg
            bg-accent hover:bg-accent-hover text-white
            transition-all duration-200 cursor-pointer
          "
        >
          {stepCampana.button}
        </button>
      </div>
    </motion.div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-text-primary mb-4">{title}</h3>
      {children}
    </div>
  );
}
