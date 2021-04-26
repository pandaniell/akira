declare namespace NodeJS {
  interface ProcessEnv {
    CLIENT_ID: string
    CLIENT_SECRET: string
    TOKEN: string
    DATABASE_URL: string
    REDIS_URL: string
    SERVER_URL: string
    SESSION_SECRET: string
  }
}
