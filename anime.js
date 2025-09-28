import { Router } from "express";
import { getAnimeList, getAnimeDetails } from "./scraper.js";

const router = Router();

// lista de animes
router.get("/", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const animes = await getAnimeList(page);
    res.json(animes);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar lista de animes" });
  }
});

// detalhes de um anime
router.get("/details", async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: "Parâmetro ?url= é obrigatório" });

    const details = await getAnimeDetails(url);
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar detalhes do anime" });
  }
});

export default router;