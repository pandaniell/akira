import type { Command } from "../../utilities/loadCommandsAndEvents"

export const command: Command = {
  description: "Ping",
  execute: (message) => message.reply("🏓 Pong"),
}
