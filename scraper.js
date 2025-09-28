import axios from "axios";
import * as cheerio from "cheerio";

const BASE = "https://sushianimes.com.br";

// lista de animes
export async function getAnimeList(page = 1) {
  const url = `${BASE}/animes?page=${page}`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  let lista = [];
  $("a[href^='/anime/']").each((i, el) => {
    const nome = $(el).text().trim();
    let link = $(el).attr("href");
    if (link && !link.startsWith("http")) link = BASE + link;
    lista.push({ nome, link });
  });

  return lista;
}

// detalhes do anime
export async function getAnimeDetails(detalheUrl) {
  const fullUrl = detalheUrl.startsWith("http") ? detalheUrl : `${BASE}${detalheUrl}`;
  const { data } = await axios.get(fullUrl);
  const $ = cheerio.load(data);

  const titulo = $("h1").first().text().trim();
  let linkRepro = $("iframe").attr("src")
    || $("video source").attr("src")
    || $("a.play-btn, .botao-play").attr("href");

  if (linkRepro && !linkRepro.startsWith("http")) {
    linkRepro = BASE + linkRepro;
  }

  return { titulo, linkRepro: linkRepro || "Não encontrado" };
}

// busca anime por nome
export async function searchAnime(query) {
  const url = `${BASE}/pesquisar/${encodeURIComponent(query)}`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  let resultados = [];
  $("a[href^='/anime/']").each((i, el) => {
    const nome = $(el).text().trim();
    let link = $(el).attr("href");
    if (link && !link.startsWith("http")) link = BASE + link;
    resultados.push({ nome, link });
  });

  return resultados;
}