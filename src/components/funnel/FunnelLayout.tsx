import type { ReactNode } from "react";
import { LOGO_URL } from "../../utils/constants";
import StepIndicator from "../ui/StepIndicator";

interface FunnelLayoutProps {
  children: ReactNode;
  currentStep?: number;
  showSteps?: boolean;
  onBack?: () => void;
  showBack?: boolean;
}

export default function FunnelLayout({
  children,
  currentStep = 1,
  showSteps = false,
  onBack,
  showBack = false,
}: FunnelLayoutProps) {
  return (
    <div className="min-h-screen bg-navy">
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBack && onBack && (
              <button
                onClick={onBack}
                className="text-text-muted hover:text-text-primary transition-colors text-sm"
              >
                Atrás
              </button>
            )}
            <a href="/">
              <img src={LOGO_URL} alt="Lead Language" className="h-8" />
            </a>
          </div>
          {showSteps && <StepIndicator currentStep={currentStep} />}
        </div>
      </header>

      <main className="pt-20 pb-16 px-4">
        <div className="max-w-3xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
