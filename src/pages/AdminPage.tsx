import { useState, useEffect, useCallback } from "react";
import { fetchLeads, updateLead } from "../utils/api";

interface Lead {
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

const STATUS_OPTIONS = ["nuevo", "contactado", "en proceso", "convertido", "descartado"];

export default function AdminPage() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingNotes, setEditingNotes] = useState<number | null>(null);
  const [notesValue, setNotesValue] = useState("");

  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchLeads(user, pass);
      setLeads(data);
      setError("");
    } catch {
      setError("Error al cargar los leads");
    } finally {
      setLoading(false);
    }
  }, [user, pass]);

  useEffect(() => {
    if (loggedIn) {
      loadLeads();
    }
  }, [loggedIn, loadLeads]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetchLeads(user, pass);
      setLoggedIn(true);
      setError("");
    } catch {
      setError("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateLead(id, { status }, user, pass);
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status } : l))
      );
    } catch {
      setError("Error al actualizar");
    }
  };

  const handleSaveNotes = async (id: number) => {
    try {
      await updateLead(id, { notes: notesValue }, user, pass);
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, notes: notesValue } : l))
      );
      setEditingNotes(null);
    } catch {
      setError("Error al guardar notas");
    }
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="bg-white/5 border border-white/10 rounded-xl p-8 w-full max-w-sm"
        >
          <h1 className="text-2xl font-bold text-text-primary mb-6 text-center">
            Panel de Administración
          </h1>
          <div className="space-y-4">
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Usuario"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
              required
            />
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
              required
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold bg-primary hover:bg-primary-light text-white transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-text-primary">
            Leads ({leads.length})
          </h1>
          <div className="flex gap-3">
            <button
              onClick={loadLeads}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-text-primary text-sm transition-all cursor-pointer"
            >
              Actualizar
            </button>
            <button
              onClick={() => setLoggedIn(false)}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted text-sm transition-all cursor-pointer"
            >
              Salir
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        {loading ? (
          <p className="text-text-muted">Cargando...</p>
        ) : leads.length === 0 ? (
          <p className="text-text-muted">No hay leads todavía.</p>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white/5 border border-white/10 rounded-xl p-5"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-text-primary truncate">
                        {lead.name}
                      </h3>
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusChange(lead.id, e.target.value)
                        }
                        className="text-xs px-2 py-1 rounded bg-white/10 text-text-secondary border border-white/10 focus:outline-none"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s} className="bg-navy">
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                      <p className="text-text-secondary">
                        <span className="text-text-muted">Email: </span>
                        {lead.email}
                      </p>
                      <p className="text-text-secondary">
                        <span className="text-text-muted">Tel: </span>
                        {lead.phone || "—"}
                      </p>
                      <p className="text-text-secondary">
                        <span className="text-text-muted">Academia: </span>
                        {lead.academy_name || "—"}
                      </p>
                      <p className="text-text-secondary">
                        <span className="text-text-muted">Ubicación: </span>
                        {lead.academy_location || "—"}
                      </p>
                      <p className="text-text-secondary">
                        <span className="text-text-muted">Web: </span>
                        {lead.academy_url ? (
                          <a
                            href={lead.academy_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {lead.academy_url}
                          </a>
                        ) : (
                          "—"
                        )}
                      </p>
                      <p className="text-text-secondary">
                        <span className="text-text-muted">Idiomas: </span>
                        {lead.languages || "—"}
                      </p>
                    </div>
                    <p className="text-text-muted text-xs mt-2">
                      {new Date(lead.created_at).toLocaleString("es-ES")}
                    </p>
                  </div>

                  <div className="w-full md:w-64 shrink-0">
                    {editingNotes === lead.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={notesValue}
                          onChange={(e) => setNotesValue(e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-text-primary text-sm focus:outline-none focus:border-primary resize-none"
                          placeholder="Notas..."
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveNotes(lead.id)}
                            className="text-xs px-3 py-1 rounded bg-accent text-white cursor-pointer"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => setEditingNotes(null)}
                            className="text-xs px-3 py-1 rounded bg-white/10 text-text-muted cursor-pointer"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingNotes(lead.id);
                          setNotesValue(lead.notes);
                        }}
                        className="text-sm text-text-muted hover:text-text-secondary transition-colors text-left cursor-pointer"
                      >
                        {lead.notes || "Añadir notas..."}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
