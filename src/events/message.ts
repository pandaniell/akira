import Fuse from "fuse.js"
import i18next from "i18next"
import type { Event } from "../utilities/loadCommandsAndEvents"

export const event: Event<"message"> = {
  async run(message, _client, commands, prisma) {
    const { author, guild, channel, client, content } = message

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

    const [commandName, ...args] = content
      .slice(config.prefix.length)
      .trim()
      .split(/ +/)

    if (!content.startsWith(config.prefix)) {
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
          suggested: searchResult.item,
          prefix: config.prefix,
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

    if (command.args) {
      const resolvedArgs = await command.resolveArgs(args, message)

      if (!resolvedArgs && command.argsRequired) {
        const response = t("validation:command.usage", {
          prefix: config.prefix,
          command: command.name,
          usage: t(command.usage),
        })

        return message.channel.send(response)
      }

      return command.execute(message, resolvedArgs, prisma, t)
    }

    return command.execute(message, args, prisma, t)
  },
}
