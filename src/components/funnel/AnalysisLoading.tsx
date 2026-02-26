import { motion } from "motion/react";
import LoadingSpinner from "../ui/LoadingSpinner";
import { funnelContent } from "../../data/funnel-content";

export default function AnalysisLoading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-[70vh] flex flex-col items-center justify-center"
    >
      <LoadingSpinner messages={funnelContent.loading.messages} />
    </motion.div>
  );
}
