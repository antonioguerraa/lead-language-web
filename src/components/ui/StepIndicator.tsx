interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export default function StepIndicator({
  currentStep,
  totalSteps = 3,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <div key={step} className="flex items-center gap-3">
            <div
              className={`
                w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold
                transition-all duration-300
                ${
                  isActive
                    ? "bg-primary text-white scale-110"
                    : isCompleted
                      ? "bg-accent text-white"
                      : "bg-white/10 text-text-muted"
                }
              `}
            >
              {isCompleted ? "✓" : step}
            </div>
            {step < totalSteps && (
              <div
                className={`w-12 h-0.5 transition-all duration-300 ${
                  isCompleted ? "bg-accent" : "bg-white/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
