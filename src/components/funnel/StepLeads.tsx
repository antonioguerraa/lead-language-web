import { motion } from "motion/react";
import type { AnalysisResult } from "../../types/funnel";
import { funnelContent } from "../../data/funnel-content";

interface StepLeadsProps {
  analysis: AnalysisResult;
  onNext: () => void;
}

export default function StepLeads({ analysis, onNext }: StepLeadsProps) {
  const { stepLeads } = funnelContent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <div className="mb-8">
        <p className="text-primary font-semibold mb-2">{stepLeads.subtitle}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
          {stepLeads.title}
        </h2>
        <p className="text-text-secondary text-lg">{stepLeads.intro}</p>
      </div>

      {/* Process */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-text-primary mb-4">
          {stepLeads.sections.process.title}
        </h3>
        <ol className="space-y-3">
          {stepLeads.sections.process.points.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-3 text-text-primary bg-white/5 rounded-lg px-4 py-3 border border-white/5"
            >
              <span className="text-accent font-bold shrink-0">{i + 1}.</span>
              {point}
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Scaling Plan */}
      <div className="mt-10">
        <h3 className="text-xl font-bold text-text-primary mb-4">
          {stepLeads.scalingTitle}
        </h3>
        <div className="space-y-4">
          {[
            { label: "Mes 1", text: analysis.scaling_plan.month_1 },
            { label: "Mes 2", text: analysis.scaling_plan.month_2 },
            { label: "Mes 3", text: analysis.scaling_plan.month_3 },
          ].map((month, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="bg-white/5 rounded-xl p-5 border border-white/5"
            >
              <p className="text-accent font-semibold text-sm mb-2">
                {month.label}
              </p>
              <p className="text-text-primary leading-relaxed">{month.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Methodology */}
      <div className="mt-10 bg-primary/10 border border-primary/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-text-primary mb-4">
          {stepLeads.methodology.title}
        </h3>
        <ul className="space-y-3">
          {stepLeads.methodology.points.map((point, i) => (
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
          {stepLeads.button}
        </button>
      </div>
    </motion.div>
  );
}
