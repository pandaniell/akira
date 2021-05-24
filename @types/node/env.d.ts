declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production"
    PORT: string
    DISCORD_TOKEN: string
    DISCORD_CLIENT_ID: string
    DISCORD_CLIENT_SECRET: string
    DISCORD_BOT_PREFIX: string
    DATABASE_URL: string
    REDIS_URL: string
    SERVER_URL: string
    CORS_ORIGIN: string
    COOKIE_DOMAIN: string
    SESSION_KEY: string
  }
}
