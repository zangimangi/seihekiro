import {
  createBot,
  getBotIdFromToken,
  startBot,
  InteractionResponseTypes,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";

import "$std/dotenv/load.ts";

const BotToken = Deno.env.get("BOT_TOKEN")!;

const bot = createBot({
  token: BotToken,
  botId: getBotIdFromToken(BotToken) as bigint,
  intents: 513,

  events: {
    ready: async (bot, payload) => {
      console.log(`${payload.user.username} is ready!`);

      // グローバルコマンド登録（ID不要）
      await bot.helpers.upsertGlobalApplicationCommands([
        {
          name: "s",
          description: "start command",
        },
      ]);
    },

    interactionCreate: async (bot, interaction) => {
      if (interaction.type === 2 && interaction.data?.name === "s") {
        await bot.helpers.sendInteractionResponse(
          interaction.id,
          interaction.token,
          {
            type: InteractionResponseTypes.ChannelMessageWithSource,
            data: {
              content: "start",
            },
          },
        );
      }
    },
  },
});

startBot(bot);

// ホスティング対策
Deno.serve(() => new Response("Bot is running"));

// 常時起動
Deno.cron("Continuous Request", "*/2 * * * *", () => {
    console.log("running...");
});
