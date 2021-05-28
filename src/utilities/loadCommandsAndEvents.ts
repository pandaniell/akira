import type { PrismaClient } from "@prisma/client"
import {
  Client,
  ClientEvents,
  Collection,
  Message,
  PermissionResolvable,
} from "discord.js"
import type { TFunction } from "i18next"
import type { Args } from "lexure"
import { parse, sep } from "path"
import { logger } from "./logger"
import { globAsync, ValueOf } from "./misc"
import type { ParseError } from "./parser"

type LoadCommandsAndEventsOptions = Record<
  "commandsBaseDir" | "eventsBaseDir",
  string
>

type CommandExample = {
  usage: string
  description: string
}

type CommandWithArgsProps<T> = {
  argsRequired: boolean
  usage: string
  examples?: CommandExample[]
  resolveArgs(
    args: Args,
    message: Message
  ): Promise<Readonly<T> | (string | null) | ValueOf<typeof ParseError>>
}

export type Command<T = void> = {
  name?: string
  aliases?: string[]
  category?: string
  description: string
  clientPermissions?: PermissionResolvable[]
  memberPermissions?: PermissionResolvable[] | "same-as-client"
  execute: (
    message: Message,
    args: T,
    prisma: PrismaClient,
    t: TFunction
  ) => Promise<unknown>
  // eslint-disable-next-line @typescript-eslint/ban-types
} & (T extends void ? {} : CommandWithArgsProps<T>)

export type Event<T extends keyof ClientEvents> = {
  name?: T
  run: (
    ...args: [
      ...ClientEvents[T],
      Client,
      PrismaClient,
      Collection<string, Command<unknown>>
    ]
  ) => Promise<unknown>
}

export async function loadCommandsAndEvents({
  commandsBaseDir,
  eventsBaseDir,
}: LoadCommandsAndEventsOptions) {
  const commands = new Collection<string, Command<unknown>>()
  const events: Array<Event<keyof ClientEvents>> = []

  const commandPaths = await globAsync(commandsBaseDir)

  for (const commandPath of commandPaths) {
    const { command }: Partial<Record<"command", Command<unknown>>> =
      await import(commandPath)

    if (!command) {
      throw new Error(
        `File ${commandPath} must export a named object "command"`
      )
    }

    const parsedCommandPath = parse(commandPath)
    const commandName = command.name ?? parsedCommandPath.name
    const category = command.category ?? parsedCommandPath.dir.split(sep).pop()
    const populatedCommand = { ...command, name: commandName, category }

    commands.set(commandName, populatedCommand)
    command.aliases?.forEach((alias) => commands.set(alias, populatedCommand))

    logger.info(`✅ Successfully loaded ${commandName} command`)
  }

  const eventsPaths = await globAsync(eventsBaseDir)

  for (const eventPath of eventsPaths) {
    const { event }: Partial<Record<"event", Event<keyof ClientEvents>>> =
      await import(eventPath)

    if (!event) {
      throw new Error(`File ${eventPath} must export a named object "event"`)
    }

    const parsedEventPath = parse(eventPath)
    const eventName = event.name ?? (parsedEventPath.name as keyof ClientEvents)

    events.push({ ...event, name: eventName })

    logger.info(`✅ Successfully loaded ${eventName} event`)
  }

  return { commands, events }
}
