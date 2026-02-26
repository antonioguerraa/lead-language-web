export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  academy_name: string;
  academy_url: string;
  academy_location: string;
  languages: string;
  funnel_data: string;
  status: string;
  notes: string;
  created_at: string;
}

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

export interface CreateLeadBody {
  name: string;
  email: string;
  phone: string;
  academy_name: string;
  academy_url: string;
  academy_location: string;
  languages: string;
  funnel_data: string;
}

export interface UpdateLeadBody {
  status?: string;
  notes?: string;
}
