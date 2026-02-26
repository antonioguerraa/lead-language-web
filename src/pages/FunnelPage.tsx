import { useEffect } from "react";
import { useFunnelState } from "../hooks/useFunnelState";
import FunnelLayout from "../components/funnel/FunnelLayout";
import UrlInputPage from "../components/funnel/UrlInputPage";
import AnalysisLoading from "../components/funnel/AnalysisLoading";
import StepContenido from "../components/funnel/StepContenido";
import StepCampana from "../components/funnel/StepCampana";
import StepLeads from "../components/funnel/StepLeads";
import StepResumen from "../components/funnel/StepResumen";
import FunnelConfirmation from "../components/funnel/FunnelConfirmation";

const stepToNumber: Record<string, number> = {
  "step-contenido": 1,
  "step-campana": 2,
  "step-leads": 3,
  "step-resumen": 3,
};

export default function FunnelPage() {
  const {
    state,
    setStep,
    setLeadForm,
    startAnalysis,
    submitLeadForm,
    goBack,
    reset,
  } = useFunnelState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state.step]);

  const showSteps = [
    "step-contenido",
    "step-campana",
    "step-leads",
    "step-resumen",
  ].includes(state.step);

  const showBack = state.step !== "url-input" && state.step !== "loading" && state.step !== "confirmation";

  return (
    <FunnelLayout
      currentStep={stepToNumber[state.step] || 1}
      showSteps={showSteps}
      showBack={showBack}
      onBack={goBack}
    >
      {state.step === "url-input" && (
        <UrlInputPage onSubmit={startAnalysis} error={state.error} />
      )}

      {state.step === "loading" && <AnalysisLoading />}

      {state.step === "step-contenido" && state.analysis && (
        <StepContenido
          analysis={state.analysis}
          onNext={() => setStep("step-campana")}
        />
      )}

      {state.step === "step-campana" && state.analysis && (
        <StepCampana
          analysis={state.analysis}
          onNext={() => setStep("step-leads")}
        />
      )}

      {state.step === "step-leads" && state.analysis && (
        <StepLeads
          analysis={state.analysis}
          onNext={() => setStep("step-resumen")}
        />
      )}

      {state.step === "step-resumen" && state.analysis && (
        <StepResumen
          analysis={state.analysis}
          leadForm={state.leadForm}
          onLeadFormChange={setLeadForm}
          onSubmit={submitLeadForm}
          error={state.error}
        />
      )}

      {state.step === "confirmation" && (
        <FunnelConfirmation onReset={reset} />
      )}
    </FunnelLayout>
  );
}
