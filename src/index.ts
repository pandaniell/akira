import fastifySession from "@mgcrea/fastify-session"
import RedisStore from "@mgcrea/fastify-session-redis-store"
import { Language, PrismaClient } from "@prisma/client"
import { ApolloServer } from "apollo-server-fastify"
import { Intents, Client } from "discord.js"
import "dotenv/config"
import "make-promises-safe"
import fastify from "fastify"
import fastifyCookie from "fastify-cookie"
import fastifyCors from "fastify-cors"
import fastifyPassport from "fastify-passport"
import fs from "fs/promises"
import { applyMiddleware } from "graphql-middleware"
import i18next from "i18next"
import Backend from "i18next-fs-backend"
import Strategy, { Profile } from "passport-discord"
import { join, parse } from "path"
import { __DEV__, COOKIE_NAME, SESSION_TTL } from "./constants"
import type { Context } from "./context"
import { permissions } from "./permissions"
import { redis } from "./redis"
import { schema } from "./schema"
import { cacheMiddleware } from "./utilities/cacheMiddleware"
import { loadCommandsAndEvents } from "./utilities/loadCommandsAndEvents"
import { logger } from "./utilities/logger"
import { globAsync } from "./utilities/misc"

const main = async () => {
  const prisma = new PrismaClient({
    log: __DEV__ ? ["query", "error"] : ["info", "warn"],
  })

  prisma.$use(
    cacheMiddleware({
      model: "Guild",
      action: "findUnique",
      keys: ["prefix", "language"],
      defaultValues: {
        prefix: process.env.PREFIX,
        language: Language.en,
      },
      ttlInSeconds: 15,
    })
  )

  const paths = await globAsync(`${join(process.cwd(), "locales")}/**/*.json`)

  const namespaces = paths.map(path => {
    const { name } = parse(path)

    return name
  })

  await i18next.use(Backend).init({
    preload: await fs.readdir(join(process.cwd(), "locales")),
    fallbackLng: Language.en,
    ns: [...new Set(namespaces)],
    backend: {
      loadPath: join(process.cwd(), "locales", "{{lng}}", "{{ns}}.json"),
    },
  })

  const intents = new Intents(Intents.ALL).remove([
    "DIRECT_MESSAGE_TYPING",
    "GUILD_MESSAGE_TYPING",
    "GUILD_PRESENCES",
  ])

  const client = new Client({
    disableMentions: "all",
    ws: { intents },
    partials: ["CHANNEL", "MESSAGE", "REACTION"],
    restRequestTimeout: 60000,
  })

  const { commands, events } = await loadCommandsAndEvents({
    commandsBaseDir: join(__dirname, "commands"),
    eventsBaseDir: join(__dirname, "events"),
  })

  events.forEach(({ eventName, listenOnce, run }) => {
    client[listenOnce ? "once" : "on"](eventName, (...args) =>
      run(...args, client, commands, prisma)
    )
  })

  const apolloServer = new ApolloServer({
    schema: applyMiddleware(schema, permissions),
    context: (request: Omit<Context, "prisma">) => ({ ...request, prisma }),
    playground: {
      // @TODO: customize playground options
      settings: {
        "request.credentials": "same-origin",
      },
    },
    tracing: __DEV__,
  })

  fastifyPassport.registerUserSerializer<Profile, Profile>(
    async profile => profile
  )

  fastifyPassport.registerUserDeserializer<Profile, Profile>(
    async profile => profile
  )

  fastifyPassport.use(
    new Strategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/auth/discord/callback`,
        scope: ["identify", "guilds"],
      },
      async (_accessToken, _refreshToken, profile, done) => {
        return done(undefined, profile)
      }
    )
  )

  fastify({ logger })
    .register(fastifyCors, {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
    .register(fastifyCookie)
    .register(fastifySession, {
      cookieName: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        ttl: SESSION_TTL,
      }),
      cookie: {
        domain: process.env.COOKIE_DOMAIN,
        httpOnly: true,
        maxAge: SESSION_TTL,
        sameSite: "strict",
        secure: !__DEV__,
      },
      key: Buffer.from(process.env.SESSION_KEY, "base64"),
      saveUninitialized: false,
    })
    .register(fastifyPassport.initialize())
    .register(fastifyPassport.secureSession())
    .register(apolloServer.createHandler({ cors: false }))
    .get(
      "/auth/discord",
      {
        preValidation: fastifyPassport.authenticate("discord"),
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      async () => {}
    )
    .get(
      "/auth/discord/callback",
      {
        preValidation: fastifyPassport.authenticate("discord"),
      },
      async (_request, reply) => reply.send("You may now close this window.")
    )
    .listen(process.env.PORT ?? 4000, "0.0.0.0")

  client.login(process.env.TOKEN)
}

main()
