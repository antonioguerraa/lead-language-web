import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 cursor-pointer sm:px-8 sm:py-4 sm:text-base";

  const variants = {
    primary:
      "bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5",
    secondary:
      "border-2 border-primary text-primary hover:bg-primary/10 hover:-translate-y-0.5",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
