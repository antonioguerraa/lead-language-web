import { Router } from "express";
import { scrapeWebsite } from "../services/scraper.js";
import { analyzeAcademy } from "../services/gemini.js";

const router = Router();

router.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url || typeof url !== "string") {
    res.status(400).json({ error: "URL es obligatoria" });
    return;
  }

  try {
    console.log(`[Analyze] Scraping: ${url}`);
    const scraped = await scrapeWebsite(url);

    console.log(`[Analyze] Scraped: "${scraped.title}" — sending to Gemini`);
    const analysis = await analyzeAcademy(scraped);

    console.log(`[Analyze] Done: ${analysis.academy_name}`);
    res.json(analysis);
  } catch (error) {
    console.error("[Analyze] Error:", error);
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    res.status(500).json({ error: `Error al analizar: ${message}` });
  }
});

export default router;
