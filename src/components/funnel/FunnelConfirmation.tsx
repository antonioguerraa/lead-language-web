import { motion } from "motion/react";
import { funnelContent } from "../../data/funnel-content";

interface FunnelConfirmationProps {
  onReset: () => void;
}

export default function FunnelConfirmation({ onReset }: FunnelConfirmationProps) {
  const { confirmation } = funnelContent;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center"
    >
      <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6">
        <span className="text-accent text-3xl">✓</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
        {confirmation.headline}
      </h1>
      <p className="text-text-secondary text-lg mb-3 max-w-md">
        {confirmation.message}
      </p>
      <p className="text-text-muted text-sm mb-10 max-w-md">
        {confirmation.subtext}
      </p>

      <button
        onClick={onReset}
        className="
          px-8 py-3 rounded-lg font-semibold
          bg-white/10 hover:bg-white/15 text-text-primary
          transition-all duration-200 cursor-pointer
        "
      >
        {confirmation.button}
      </button>
    </motion.div>
  );
}
