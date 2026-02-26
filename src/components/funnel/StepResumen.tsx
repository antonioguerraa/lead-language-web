import { motion } from "motion/react";
import type { AnalysisResult, LeadFormData } from "../../types/funnel";
import { funnelContent } from "../../data/funnel-content";
import GlassInput from "../ui/GlassInput";

interface StepResumenProps {
  analysis: AnalysisResult;
  leadForm: LeadFormData;
  onLeadFormChange: (form: Partial<LeadFormData>) => void;
  onSubmit: () => void;
  error: string | null;
}

export default function StepResumen({
  analysis,
  leadForm,
  onLeadFormChange,
  onSubmit,
  error,
}: StepResumenProps) {
  const { stepResumen } = funnelContent;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <div className="mb-8">
        <p className="text-primary font-semibold mb-2">{stepResumen.subtitle}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
          {stepResumen.title}
        </h2>
      </div>

      {/* Summary Cards */}
      <div className="space-y-4 mb-10">
        <SummaryCard
          title={stepResumen.sections.contenido}
          items={[
            `${analysis.content_strategy.hooks.length} hooks personalizados`,
            `${analysis.content_strategy.content_ideas.length} ideas de contenido`,
            `${analysis.content_strategy.pain_points.length} puntos de dolor identificados`,
          ]}
          delay={0}
        />
        <SummaryCard
          title={stepResumen.sections.campana}
          items={[
            `${analysis.campaign_strategy.ad_copies.length} anuncios listos`,
            `${analysis.campaign_strategy.targeting.length} criterios de segmentación`,
            `Retargeting en 7 segundos + UGC`,
          ]}
          delay={0.1}
        />
        <SummaryCard
          title={stepResumen.sections.leads}
          items={[
            "Llamada en menos de 5 minutos",
            "Plan de 3 meses personalizado",
            `${analysis.scaling_plan.kpis.length} KPIs monitorizados`,
          ]}
          delay={0.2}
        />
      </div>

      {/* Pitch */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/20 rounded-xl p-8 mb-10"
      >
        <h3 className="text-2xl font-bold text-text-primary mb-6">
          {stepResumen.pitch.title}
        </h3>
        <ul className="space-y-4 mb-6">
          {stepResumen.pitch.points.slice(0, 3).map((point, i) => (
            <li key={i} className="text-text-secondary leading-relaxed">
              {point}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Lead Capture Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-white/5 border border-white/10 rounded-xl p-8"
      >
        <h3 className="text-xl font-bold text-text-primary mb-2">
          {stepResumen.pitch.cta}
        </h3>
        <p className="text-text-muted mb-6">{stepResumen.pitch.description}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <GlassInput
            type="text"
            value={leadForm.name}
            onChange={(e) => onLeadFormChange({ name: e.target.value })}
            placeholder={stepResumen.form.namePlaceholder}
            required
          />
          <GlassInput
            type="email"
            value={leadForm.email}
            onChange={(e) => onLeadFormChange({ email: e.target.value })}
            placeholder={stepResumen.form.emailPlaceholder}
            required
          />
          <GlassInput
            type="tel"
            value={leadForm.phone}
            onChange={(e) => onLeadFormChange({ phone: e.target.value })}
            placeholder={stepResumen.form.phonePlaceholder}
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={!leadForm.name || !leadForm.email}
            className="
              w-full py-4 rounded-lg font-semibold text-lg
              bg-accent hover:bg-accent-hover text-white
              transition-all duration-200
              disabled:opacity-40 disabled:cursor-not-allowed
              cursor-pointer
            "
          >
            {stepResumen.form.button}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

function SummaryCard({
  title,
  items,
  delay,
}: {
  title: string;
  items: string[];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white/5 border border-white/10 rounded-xl p-5"
    >
      <h4 className="text-lg font-semibold text-text-primary mb-3">{title}</h4>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-text-secondary text-sm">
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
