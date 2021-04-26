import type { PrismaClient } from "@prisma/client"
import type {
  Client,
  ClientEvents,
  Message,
  PermissionResolvable,
} from "discord.js"
import type { TFunction } from "i18next"
import { parse, sep } from "path"
import { logger } from "./logger"
import { globAsync } from "./misc"

type CommandExample = {
  usage: string
  description: string
}

type CommandWithArgsProps<Args> = {
  args: true
  argsRequired: boolean
  usage: string
  examples?: CommandExample[]
  resolveArgs(args: string[], message: Message): Promise<Args>
}

export type Command<Args = void> = {
  name?: string
  aliases?: string[]
  category?: string
  description: string
  clientPermissions?: PermissionResolvable[]
  memberPermissions?: PermissionResolvable[] | "same-as-client"
  execute(
    message: Message,
    args: Args,
    prisma: PrismaClient,
    t: TFunction
  ): Promise<unknown>
  // eslint-disable-next-line @typescript-eslint/ban-types
} & (Args extends void ? {} : CommandWithArgsProps<Args>)

export type Event<T extends keyof ClientEvents> = {
  eventName?: T
  listenOnce?: boolean
  run(
    ...args: [
      ...ClientEvents[T],
      Client,
      Map<string, Command<unknown>>,
      PrismaClient
    ]
  ): Promise<unknown>
}

type CommandModule = {
  command: Command<unknown>
}

type EventModule = {
  event: Event<keyof ClientEvents>
}

type Module = CommandModule | EventModule

type BaseDirectories = {
  commandsBaseDir: string
  eventsBaseDir: string
}

type EventWithRequiredEventName = Omit<
  Event<keyof ClientEvents>,
  "eventName"
> & {
  eventName: NonNullable<Event<keyof ClientEvents>["eventName"]>
}

type CommandsAndEvents = {
  commands: Map<string, Command<unknown>>
  events: Array<EventWithRequiredEventName>
}

const isCommandModule = (module: Module): module is CommandModule => {
  return "command" in module
}

const isEventModule = (module: Module): module is EventModule => {
  return "event" in module
}

export const loadCommandsAndEvents = async ({
  commandsBaseDir,
  eventsBaseDir,
}: BaseDirectories) => {
  const filePaths = await globAsync(
    `{${commandsBaseDir},${eventsBaseDir}}/**/*.{ts,js}`
  )

  const commandsAndEvents = filePaths.reduce<Promise<CommandsAndEvents>>(
    async (accumulator, path) => {
      const { commands, events } = await accumulator
      const module: Module = await import(path)
      const parsedPath = parse(path)

      if (isEventModule(module)) {
        const eventName =
          module.event.eventName ?? (parsedPath.name as keyof ClientEvents)

        events.push({ ...module.event, eventName })
        logger.info(`✅ Successfully loaded event ${eventName}`)
      } else if (isCommandModule(module)) {
        const category = parsedPath.dir.split(sep).pop()
        const name = module.command.name ?? parsedPath.name

        const command = { ...module.command, name, category }

        commands.set(name, command)
        module.command.aliases?.forEach(alias => commands.set(alias, command))
        logger.info(`✅ Successfully loaded command ${name}`)
      } else {
        throw new Error(
          `File ${path} must export a named object "command" or "event"`
        )
      }

      return { commands, events }
    },
    Promise.resolve({ commands: new Map(), events: [] })
  )

  return commandsAndEvents
}
