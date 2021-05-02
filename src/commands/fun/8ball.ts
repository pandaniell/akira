import { Message } from "discord.js"
import { Args, err, ok } from "lexure"
import type { Command } from "../../utilities/loadCommandsAndEvents"
import { ParseError, singleParseWithLoop } from "../../utilities/parser"

function parseNumber(x: string) {
  const n = Number(x)

  return isNaN(n) ? err(ParseError.PARSE_FAILURE) : ok(n)
}

export async function addCommand(args: Args, message: Message) {
  const n1 = await singleParseWithLoop(args, "number", parseNumber, message)
  if (!n1.success) {
    return n1.error
  }

  const n2 = await singleParseWithLoop(args, "number", parseNumber, message)
  if (!n2.success) {
    return n2.error
  }

  return n1.value + n2.value
}

export const command: Command<number> = {
  name: "8ball",
  description: "commands:8ball.desc",
  clientPermissions: ["READ_MESSAGE_HISTORY"],
  argsRequired: true,
  usage: "commands:8ball.usage",
  resolveArgs: addCommand,

  execute: async (message, _args, _prisma, t) => {
    const answers = t("commands:8ball.answers")
    const answer = answers[Math.floor(Math.random() * answers.length)]

    message.lineReplyNoMention(answer)
  },
}
