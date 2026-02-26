import type { AnalysisResult } from "../types/funnel";

export async function analyzeAcademy(url: string): Promise<AnalysisResult> {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Error al analizar la web");
  }

  return response.json();
}

export async function submitLead(lead: {
  name: string;
  email: string;
  phone: string;
  academy_name: string;
  academy_url: string;
  academy_location: string;
  languages: string;
  funnel_data: string;
}): Promise<{ id: number }> {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Error al enviar los datos");
  }

  return response.json();
}

export async function fetchLeads(
  user: string,
  pass: string
): Promise<
  Array<{
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
  }>
> {
  const response = await fetch("/api/leads", {
    headers: {
      Authorization: "Basic " + btoa(`${user}:${pass}`),
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener leads");
  }

  return response.json();
}

export async function updateLead(
  id: number,
  data: { status?: string; notes?: string },
  user: string,
  pass: string
): Promise<void> {
  const response = await fetch(`/api/leads/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${user}:${pass}`),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el lead");
  }
}
