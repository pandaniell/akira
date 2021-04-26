declare namespace NodeJS {
  interface ProcessEnv {
    CLIENT_ID: string
    CLIENT_SECRET: string
    TOKEN: string
    DATABASE_URL: string
    REDIS_URL: string
    CORS_ORIGIN: string
    COOKIE_DOMAIN: string
    SESSION_KEY: string
    SERVER_URL: string
  }
}
