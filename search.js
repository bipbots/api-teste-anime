import { Router } from "express";
import { searchAnime } from "./scraper.js";

const router = Router();

// busca anime por nome
router.get("/", async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ error: "Parâmetro ?q= é obrigatório" });

    const results = await searchAnime(q);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar anime" });
  }
});

export default router;