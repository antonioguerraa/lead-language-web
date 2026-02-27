import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import analyzeRouter from "./routes/analyze.js";
import leadsRouter from "./routes/leads.js";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/analyze", analyzeRouter);
app.use("/api/leads", leadsRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Serve frontend static files (cwd is server/, dist is one level up)
const clientDist = path.resolve(process.cwd(), "../dist");
app.use(express.static(clientDist));

// SPA fallback — any non-API route serves index.html
app.get("{*path}", (_req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
});
