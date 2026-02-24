import {
  createBot,
  getBotIdFromToken,
  startBot
} from "@discordeno/mod.ts";

import "$std/dotenv/load.ts";

const BotToken: string = Deno.env.get("BOT_TOKEN")!;

const bot = createBot({
  token: BotToken,
  botId: getBotIdFromToken(BotToken) as bigint,

  events: {

    ready: async (bot, payload) => {

      console.log(`${payload.user.username} is ready!`);

      // スラッシュコマンド登録
      await bot.helpers.upsertGlobalApplicationCommands([
        {
          name: "s",
          description: "SEIHEKIROコマンド",
          options: [
            {
              name: "hekiro",
              description: "開始",
              type: 1,
              options: [
                {
                  name: "count",
                  description: "人数",
                  type: 4,
                  required: true
                }
              ]
            }
          ]
        }
      ]);

    },

    interactionCreate: async (bot, interaction) => {

      console.log("interaction received");

      if (interaction.data?.name !== "s") return;

      const sub = interaction.data.options?.[0];

      if (sub?.name !== "hekiro") return;

      const count = sub.options?.[0].value as number;

      await bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: 4,
          data: {
            content: `SEIHEKIRO開始：${count}人`
          }
        }
      );
    }

  }
});

await startBot(bot);