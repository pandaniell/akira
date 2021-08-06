import type { Command } from "../../utilities/loadCommandsAndEvents"

export const command: Command<[question: string | null, answers: string[]]> = {
  description: "command:poll.desc",
  clientPermissions: ["ADD_REACTIONS", "READ_MESSAGE_HISTORY"],
  memberPermissions: "same-as-client",
  argsRequired: true,
  usage: "command:poll.usage",
  resolveArgs: async (args) =>
    [args.single(), args.many().map((token) => token.value)] as const,

  execute: async (message, [question, ...answers], prisma, t) => {
    if (answers.length < 2 || answers.length > 10) {
      const invalidAnswersResponse = t("command:poll.invalid")

      return message.channel.send(invalidAnswersResponse)
    }
  },
}
