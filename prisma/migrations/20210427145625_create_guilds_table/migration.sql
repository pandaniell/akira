-- CreateEnum
CREATE TYPE "Language" AS ENUM ('en', 'nl');

-- CreateTable
CREATE TABLE "guilds" (
    "id" TEXT NOT NULL,
    "prefix" TEXT NOT NULL DEFAULT E'!a ',
    "language" "Language" NOT NULL DEFAULT E'en',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    PRIMARY KEY ("id")
);
