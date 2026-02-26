import { motion } from "motion/react";
import type { AnalysisResult } from "../../types/funnel";
import { funnelContent } from "../../data/funnel-content";

interface StepContenidoProps {
  analysis: AnalysisResult;
  onNext: () => void;
}

export default function StepContenido({ analysis, onNext }: StepContenidoProps) {
  const { stepContenido } = funnelContent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <div className="mb-8">
        <p className="text-primary font-semibold mb-2">{stepContenido.subtitle}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
          {stepContenido.title}
        </h2>
        <p className="text-text-secondary text-lg">{stepContenido.intro}</p>
      </div>

      {/* Hooks */}
      <Section title={stepContenido.sections.hooks.title}>
        <ul className="space-y-3">
          {analysis.content_strategy.hooks.slice(0, 3).map((hook, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-text-primary bg-white/5 rounded-lg px-4 py-3 border border-white/5"
            >
              "{hook}"
            </motion.li>
          ))}
        </ul>
      </Section>

      {/* Content Ideas */}
      <Section title={stepContenido.sections.contentIdeas.title}>
        <ul className="space-y-3">
          {analysis.content_strategy.content_ideas.slice(0, 3).map((idea, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-text-primary bg-white/5 rounded-lg px-4 py-3 border border-white/5"
            >
              {idea}
            </motion.li>
          ))}
        </ul>
      </Section>

      {/* Pain Points */}
      <Section title={stepContenido.sections.painPoints.title}>
        <ul className="space-y-3">
          {analysis.content_strategy.pain_points.slice(0, 3).map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="text-text-primary bg-white/5 rounded-lg px-4 py-3 border border-white/5"
            >
              {point}
            </motion.li>
          ))}
        </ul>
      </Section>

      {/* Methodology */}
      <div className="mt-10 bg-primary/10 border border-primary/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-text-primary mb-4">
          {stepContenido.methodology.title}
        </h3>
        <ul className="space-y-3">
          {stepContenido.methodology.points.map((point, i) => (
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
          {stepContenido.button}
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
