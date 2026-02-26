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
      await upsertGuildApplicationCommands(
              APPLICATION_ID,
              GUILD_ID,
              [
                {
                  name: "s",
                  description: "start command",
                },
              ],
            );
          },

          async interactionCreate(bot, interaction) {
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

Deno.cron("Continuous Request", "*/2 * * * *", () => {
    console.log("running...");
});