import { joinTokens } from "lexure"
import type { Command } from "../../utilities/loadCommandsAndEvents"

export const command: Command<string> = {
  name: "8ball",
  description: "commands:8ball.desc",
  clientPermissions: ["READ_MESSAGE_HISTORY"],
  argsRequired: true,
  usage: "commands:8ball.usage",
  resolveArgs: async (args) => joinTokens(args.many(), " ", false),

  execute: async (message, input, _prisma, t) => {
    if (!input.endsWith("?")) {
      const invalidInputResponse = t("commands:8ball.invalid")

      return message.channel.send(invalidInputResponse)
    }

    const answers = t("commands:8ball.answers")
    const answer = answers[Math.floor(Math.random() * answers.length)]

    if (!answer) {
      throw new Error("no answer")
    }

    return message.lineReplyNoMention(answer)
  },
}
