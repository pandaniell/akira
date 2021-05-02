import Fuse from "fuse.js"
import i18next from "i18next"
import { Args, Lexer, longStrategy, Parser } from "lexure"
import type { Event } from "../utilities/loadCommandsAndEvents"
import { logger } from "../utilities/logger"
import { ParseError } from "../utilities/parser"

export const event: Event<"message"> = {
  async run(message, _client, commands, prisma) {
    const { author, guild, channel, client, cleanContent } = message

    if (author.bot || !guild || channel.type !== "text" || !client.user) {
      return
    }

    const clientPermissions = channel.permissionsFor(client.user)

    if (!clientPermissions?.has("SEND_MESSAGES")) {
      return
    }

    const config = await prisma.guild.findUnique({
      where: {
        id: guild.id,
      },
      select: {
        prefix: true,
        language: true,
      },
      rejectOnNotFound: true,
    })

    const lexer = new Lexer(cleanContent)
    const res = lexer.lexCommand(s => (s.startsWith(config.prefix) ? 1 : null))

    if (!res) {
      return
    }

    const tokens = res[1]
    const parser = new Parser(tokens()).setUnorderedStrategy(longStrategy())
    const out = parser.parse()
    const args = new Args(out)
    const commandName = args.single()

    if (!commandName) {
      return
    }

    const t = i18next.getFixedT(config.language)

    const command = commands.get(commandName.toLowerCase())

    if (!command) {
      // Do nothing if provided commandName only contains a single character
      const isRepeatedChar = new Set([...commandName]).size === 1

      if (isRepeatedChar) {
        return
      }

      const fuse = new Fuse([...commands.keys()])
      const [searchResult] = fuse.search(commandName.toLowerCase(), {
        limit: 1,
      })

      let response = t("validation:command.invalid", { command: commandName })

      if (searchResult) {
        response += t("validation:command.suggestion", {
          prefix: config.prefix,
          suggested: searchResult.item,
        })
      }

      return message.channel.send(response)
    }

    if (command.clientPermissions) {
      const missingPermissions = clientPermissions.missing(
        command.clientPermissions
      )

      if (missingPermissions.length) {
        const response = t("validation:permissions.client", {
          permissions: missingPermissions.join(", "),
        })

        return message.channel.send(response)
      }
    }

    if (command.memberPermissions) {
      const memberPermissions = channel.permissionsFor(author)

      const missingPermissions = memberPermissions?.missing(
        command.memberPermissions === "same-as-client"
          ? clientPermissions
          : memberPermissions
      )

      if (missingPermissions?.length) {
        const response = t("validation:permissions.user", {
          permissions: missingPermissions.join(", "),
        })

        return message.channel.send(response)
      }
    }

    if (typeof command.resolveArgs === "function") {
      const resolvedArgs = await command.resolveArgs(args, message)

      if (resolvedArgs === ParseError.PARSE_FAILURE) {
        return logger.warn("parse error")
      }

      if (resolvedArgs === ParseError.NO_INPUT_GIVEN) {
        return logger.warn("No input given")
      }

      if (resolvedArgs === ParseError.TOO_MANY_TRIES) {
        return logger.warn("Too many retries")
      }

      if (command.argsRequired) {
        const response = t("validation:command.usage", {
          prefix: config.prefix,
          commandName: command.name,
          usage: t(command.usage),
        })

        return message.channel.send(response)
      }

      return command.execute(message, resolvedArgs, prisma, t)
    }

    return command.execute(message, args, prisma, t)
  },
}
