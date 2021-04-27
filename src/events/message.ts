import i18next from "i18next"
import type { Event } from "../utilities/loadCommandsAndEvents"
import { logger } from "../utilities/logger"

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

    const command = commands.get(commandName.toLowerCase())

    if (!command) {
      return logger.warn(`Command ${commandName} does not exist`)
    }

    if (command.clientPermissions) {
      const missingPermissions = clientPermissions.missing(
        command.clientPermissions
      )

      if (missingPermissions.length) {
        return logger.warn(`${client.user.username} is missing permissions`)
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
        return logger.warn(`${author.username} is missing permissions`)
      }
    }

    const t = i18next.getFixedT(config.language)

    if (command.args) {
      const resolvedArgs = await command.resolveArgs(args, message)

      if (!resolvedArgs && command.argsRequired) {
        return logger.warn(
          `Invalid argument(s) provided for this command, the correct usage would be: \`${config.prefix}${command.name} ${command.usage}\``
        )
      }

      return command.execute(message, resolvedArgs, prisma, t)
    }

    return command.execute(message, args, prisma, t)
  },
}
