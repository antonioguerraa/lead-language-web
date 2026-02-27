import { Router } from "express";
import db from "../db.js";
import { basicAuth } from "./auth.js";
import { sendLeadNotification, sendLeadConfirmation } from "../services/email.js";
import type { CreateLeadBody, UpdateLeadBody, Lead } from "../types.js";

const router = Router();

// POST /api/leads — Save a new lead (public)
router.post("/", async (req, res) => {
  const body: CreateLeadBody = req.body;

  if (!body.name || !body.email) {
    res.status(400).json({ error: "Nombre y email son obligatorios" });
    return;
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO leads (name, email, phone, academy_name, academy_url, academy_location, languages, funnel_data)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      body.name,
      body.email,
      body.phone || "",
      body.academy_name || "",
      body.academy_url || "",
      body.academy_location || "",
      body.languages || "",
      body.funnel_data || "{}"
    );

    // Send emails (non-blocking)
    const lead = {
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      academy_name: body.academy_name || "",
      academy_url: body.academy_url || "",
      academy_location: body.academy_location || "",
    };
    sendLeadNotification(lead).catch((err) => console.error("[Email] Admin notification failed:", err));
    sendLeadConfirmation(lead).catch((err) => console.error("[Email] Lead confirmation failed:", err));

    res.status(201).json({ id: result.lastInsertRowid, status: "ok" });
  } catch (error) {
    console.error("[Leads] Error saving:", error);
    res.status(500).json({ error: "Error al guardar el lead" });
  }
});

// GET /api/leads — List all leads (auth required)
router.get("/", basicAuth, (_req, res) => {
  try {
    const leads = db
      .prepare("SELECT * FROM leads ORDER BY created_at DESC")
      .all() as Lead[];
    res.json(leads);
  } catch (error) {
    console.error("[Leads] Error listing:", error);
    res.status(500).json({ error: "Error al listar leads" });
  }
});

// PATCH /api/leads/:id — Update lead (auth required)
router.patch("/:id", basicAuth, (req, res) => {
  const { id } = req.params;
  const body: UpdateLeadBody = req.body;

  const fields: string[] = [];
  const values: (string | number)[] = [];

  if (body.status !== undefined) {
    fields.push("status = ?");
    values.push(body.status);
  }
  if (body.notes !== undefined) {
    fields.push("notes = ?");
    values.push(body.notes);
  }

  if (fields.length === 0) {
    res.status(400).json({ error: "Nada que actualizar" });
    return;
  }

  values.push(Number(id));

  try {
    const stmt = db.prepare(
      `UPDATE leads SET ${fields.join(", ")} WHERE id = ?`
    );
    stmt.run(...values);
    res.json({ status: "ok" });
  } catch (error) {
    console.error("[Leads] Error updating:", error);
    res.status(500).json({ error: "Error al actualizar" });
  }
});

export default router;
