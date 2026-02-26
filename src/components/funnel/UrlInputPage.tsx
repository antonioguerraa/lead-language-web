import { useState } from "react";
import { motion } from "motion/react";
import { funnelContent } from "../../data/funnel-content";
import GlassInput from "../ui/GlassInput";

interface UrlInputPageProps {
  onSubmit: (url: string) => void;
  error: string | null;
}

export default function UrlInputPage({ onSubmit, error }: UrlInputPageProps) {
  const [url, setUrl] = useState("");
  const { urlInput } = funnelContent;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center"
    >
      <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-4 leading-tight">
        {urlInput.headline}
      </h1>
      <p className="text-text-secondary text-lg md:text-xl mb-10 max-w-xl">
        {urlInput.subheadline}
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg flex flex-col gap-4"
      >
        <GlassInput
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={urlInput.placeholder}
          required
          className="text-center text-lg py-4"
        />

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={!url.trim()}
          className="
            w-full py-4 rounded-lg font-semibold text-lg
            bg-accent hover:bg-accent-hover text-white
            transition-all duration-200
            disabled:opacity-40 disabled:cursor-not-allowed
            cursor-pointer
          "
        >
          {urlInput.button}
        </button>

        <p className="text-text-muted text-sm">{urlInput.hint}</p>
      </form>
    </motion.div>
  );
}
