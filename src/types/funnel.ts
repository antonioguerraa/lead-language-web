export interface AnalysisResult {
  academy_name: string;
  academy_location: string;
  languages: string[];
  target_audience: string;
  content_strategy: {
    hooks: string[];
    content_ideas: string[];
    pain_points: string[];
  };
  campaign_strategy: {
    ad_copies: string[];
    targeting: string[];
    audiences: string[];
  };
  scaling_plan: {
    month_1: string;
    month_2: string;
    month_3: string;
    kpis: string[];
  };
}

export type FunnelStep =
  | "url-input"
  | "loading"
  | "step-contenido"
  | "step-campana"
  | "step-leads"
  | "step-resumen"
  | "confirmation";

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
}

export interface FunnelState {
  step: FunnelStep;
  url: string;
  analysis: AnalysisResult | null;
  leadForm: LeadFormData;
  error: string | null;
}
