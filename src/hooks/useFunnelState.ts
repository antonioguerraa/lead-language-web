import { useState, useCallback } from "react";
import type { FunnelState, FunnelStep, LeadFormData } from "../types/funnel";
import { analyzeAcademy, submitLead } from "../utils/api";

const initialState: FunnelState = {
  step: "url-input",
  url: "",
  analysis: null,
  leadForm: { name: "", email: "", phone: "" },
  error: null,
};

export function useFunnelState() {
  const [state, setState] = useState<FunnelState>(initialState);

  const setStep = useCallback((step: FunnelStep) => {
    setState((prev) => ({ ...prev, step, error: null }));
  }, []);

  const setUrl = useCallback((url: string) => {
    setState((prev) => ({ ...prev, url }));
  }, []);

  const setLeadForm = useCallback((form: Partial<LeadFormData>) => {
    setState((prev) => ({
      ...prev,
      leadForm: { ...prev.leadForm, ...form },
    }));
  }, []);

  const startAnalysis = useCallback(async (url: string) => {
    setState((prev) => ({ ...prev, step: "loading", url, error: null }));

    try {
      const analysis = await analyzeAcademy(url);
      setState((prev) => ({ ...prev, analysis, step: "step-contenido" }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      setState((prev) => ({ ...prev, step: "url-input", error: message }));
    }
  }, []);

  const submitLeadForm = useCallback(async () => {
    if (!state.analysis) return;

    try {
      await submitLead({
        name: state.leadForm.name,
        email: state.leadForm.email,
        phone: state.leadForm.phone,
        academy_name: state.analysis.academy_name,
        academy_url: state.url,
        academy_location: state.analysis.academy_location,
        languages: state.analysis.languages.join(", "),
        funnel_data: JSON.stringify(state.analysis),
      });

      setState((prev) => ({ ...prev, step: "confirmation" }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      setState((prev) => ({ ...prev, error: message }));
    }
  }, [state.analysis, state.leadForm, state.url]);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const goBack = useCallback(() => {
    const stepOrder: FunnelStep[] = [
      "url-input",
      "loading",
      "step-contenido",
      "step-campana",
      "step-leads",
      "step-resumen",
      "confirmation",
    ];
    const currentIndex = stepOrder.indexOf(state.step);
    if (currentIndex > 0) {
      // Skip loading when going back
      const prevStep =
        stepOrder[currentIndex - 1] === "loading"
          ? "url-input"
          : stepOrder[currentIndex - 1];
      setState((prev) => ({ ...prev, step: prevStep, error: null }));
    }
  }, [state.step]);

  return {
    state,
    setStep,
    setUrl,
    setLeadForm,
    startAnalysis,
    submitLeadForm,
    goBack,
    reset,
  };
}
