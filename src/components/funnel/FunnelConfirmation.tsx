import { motion } from "motion/react";
import { Calendar } from "lucide-react";
import { funnelContent } from "../../data/funnel-content";

const CALENDLY_URL = "https://calendly.com/leadlanguage";

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
      <p className="text-text-muted text-sm mb-8 max-w-md">
        {confirmation.subtext}
      </p>

      <div className="flex flex-col items-center gap-4 mb-6">
        <p className="text-text-secondary text-sm font-medium">
          Habla con nosotros directamente
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-2
            px-8 py-3.5 rounded-xl font-semibold
            bg-accent text-white
            hover:bg-accent-hover hover:-translate-y-0.5
            shadow-lg shadow-accent/25 hover:shadow-accent/40
            transition-all duration-300
          "
        >
          <Calendar className="h-5 w-5" />
          Agendar una llamada
        </a>
      </div>

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
