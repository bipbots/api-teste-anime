import express from "express";
import animeRoutes from "./routes/anime.js";
import searchRoutes from "./routes/search.js";

const app = express();
const PORT = 3000;

app.use("/anime", animeRoutes);
app.use("/search", searchRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Sushi API rodando em http://localhost:${PORT}`);
});
