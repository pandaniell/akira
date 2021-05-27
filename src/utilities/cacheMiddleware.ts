import type { Prisma } from "@prisma/client"
import { redis } from "../redis"

type CacheMiddlewareOptions = {
  model: Prisma.ModelName
  action: Prisma.PrismaAction
  keys?: string[]
  defaultValues?: Record<string, unknown>
  ttlInSeconds: number
}

export const cacheMiddleware =
  ({
    model,
    action,
    keys,
    defaultValues,
    ttlInSeconds,
  }: CacheMiddlewareOptions): Prisma.Middleware =>
  async (params, next) => {
    if (params.model !== model || action !== params.action) {
      return next(params)
    }

    // Return early if caching should only happen when specific keys are selected
    // but the current query does not include all of them
    if (keys) {
      const selectedKeys = Object.keys(params.args.select)
      const match = selectedKeys.every((key) => keys.includes(key))

      if (!match) {
        return next(params)
      }
    }

    let result
    const key = `${params.model}:${params.action}:${JSON.stringify(
      params.args
    )}`

    result = await redis.hgetall(key)

    if (!Object.keys(result).length) {
      try {
        result = await next(params)
      } catch (err) {
        if (err.name !== "NotFoundError") {
          throw err
        }

        if (!defaultValues) {
          throw new Error(
            `${err.message}. Either handle the case of undefined by removing \`rejectOnNotFound\` or pass in \`defaultValues\`.`
          )
        }

        result = defaultValues
      }

      await redis.hmset(key, result)

      if (ttlInSeconds) {
        redis.expire(key, ttlInSeconds)
      }
    }

    return result
  }
