import glob from "glob"
import { promisify } from "util"
import type { Command } from "./loadCommandsAndEvents"

export type ValueOf<T> = T[keyof T]

type CommandMap = { [category: string]: Array<Command<unknown>> }

export const globAsync = promisify(glob)

export function sortCommandsByCategory(commands: Array<Command<unknown>>) {
  const commandMap: CommandMap = {}

  for (const command of commands.values()) {
    const category = command.category ?? ""
    const commandMapEntry = commandMap[category]

    if (commandMapEntry) {
      const commandInCategory = commandMapEntry.some(
        (cmd) => cmd.name !== cmd.name
      )

      if (!commandInCategory) {
        commandMapEntry.push(command)
      }
    } else {
      commandMap[category] = [command]
    }
  }

  return Object.entries(commandMap).map(([category, categorisedCommands]) => ({
    category,
    commands: categorisedCommands,
  }))
}
