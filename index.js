import { Telegraf } from "telegraf";
import axios from "axios";

const bot = new Telegraf(process.env.BOT_TOKEN);

// Quando o usuário digitar /start
bot.start(async (ctx) => {
  const userId = ctx.from.id;
  const userCode = `tg_${userId}`; // cada usuário vira um user_code

  // cria usuário na API iGameWin (se não existir)
  try {
    await axios.post("https://igamewin.com/api/v1", {
      method: "user_create",
      agent_code: process.env.IGAME_AGENT,
      agent_token: process.env.IGAME_TOKEN,
      user_code: userCode,
      is_demo: true
    });
  } catch (err) {
    console.log("Usuário já existe ou erro:", err.response?.data);
  }

  // gera link do jogo (ex: Sweet Bonanza / DogHouse)
  const launch = await axios.post("https://igamewin.com/api/v1", {
    method: "game_launch",
    agent_code: process.env.IGAME_AGENT,
    agent_token: process.env.IGAME_TOKEN,
    user_code: userCode,
    provider_code: "PRAGMATIC",
    game_code: "vs20doghouse", // aqui é o famoso doghouse (tigrinho style)
    lang: "pt"
  });

  const launchUrl = launch.data.launch_url;

  await ctx.reply(
    "🐯 Bem-vindo ao Jogo do Tigrinho!\nClique no botão abaixo pra jogar 🎰",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🎮 Jogar agora",
              web_app: { url: launchUrl } // abre dentro do Telegram
            }
          ]
        ]
      }
    }
  );
});

bot.launch();