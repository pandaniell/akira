import { logger } from "../utilities/logger"
import type { Event } from "../utilities/loadCommandsAndEvents"

export const event: Event<"ready"> = {
  run: async (client) => logger.info(`🤖 ${client.user!.username} is ready`),
}
