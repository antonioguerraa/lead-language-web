import type { InputHTMLAttributes } from "react";

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function GlassInput({ label, className = "", ...props }: GlassInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-text-secondary mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 rounded-lg
          bg-white/5 border border-white/10
          text-text-primary placeholder:text-text-muted
          focus:outline-none focus:border-primary focus:bg-white/10
          transition-all duration-200
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
