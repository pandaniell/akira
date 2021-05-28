import type { Message } from "discord.js"
import type { TFunction } from "i18next"
import { Args, fail, finish, loop1Async, loopAsync, Result, step } from "lexure"
import type { ValueOf } from "./misc"

type Parser<T> = (
  input: string,
  message: Message
) => Promise<Result<T, ValueOf<typeof ParseError>>>

type LoopOptions<T> = {
  expected: string
  runParser: Parser<T>
  message: Message
  t: TFunction
}

export const ParseError = {
  PARSE_FAILURE: 0, // A general parse error e.g. invalid input.
  NO_INPUT_GIVEN: 1, // No input was given.
  TOO_MANY_TRIES: 2, // Took too many tries to give a good input.
} as const

function makeLoopStrategy<T>({
  expected,
  runParser,
  message,
  t,
}: LoopOptions<T>) {
  let retries = 0
  let latestMessage = message

  return {
    getInput: async () => {
      if (retries >= 2) {
        return fail(ParseError.TOO_MANY_TRIES)
      }

      retries++

      const input = await message.channel
        .awaitMessages((m) => m.author.id === message.author.id, {
          max: 1,
          time: 30 * 1000,
        })
        .then((messages) => {
          latestMessage = messages.first() ?? message

          return messages.first()?.content
        })

      if (!input) {
        return fail(ParseError.NO_INPUT_GIVEN)
      }

      return step(input)
    },
    parse: async (input: string) => {
      const res = await runParser(input, latestMessage)

      if (res.success) {
        return finish(res.value)
      }

      await message.channel.send(
        `${t("validation.lexure.invalid")} ${t(expected)}`
      )

      return fail(ParseError.PARSE_FAILURE)
    },
  }
}

function loopParse<T>(options: LoopOptions<T>) {
  return (initialInput: string) => {
    return loopAsync(initialInput, makeLoopStrategy(options))
  }
}

async function loop1Parse<T>(options: LoopOptions<T>) {
  const { expected, message, t } = options

  await message.channel.send(`${t("validation.lexure.invalid")} ${t(expected)}`)

  return loop1Async(makeLoopStrategy(options))
}

export async function singleParseWithLoop<T>(
  options: LoopOptions<T> & Record<"args", Args>
) {
  return (
    (await options.args.singleParseAsync(loopParse(options))) ??
    (await loop1Parse(options))
  )
}
