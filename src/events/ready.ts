import type { Event } from "../utilities/loadCommandsAndEvents"
import { logger } from "../utilities/logger"

export const event: Event<"ready"> = {
  run: async (client) => logger.info(`🤖 ${client.user!.username} is ready`),
}
