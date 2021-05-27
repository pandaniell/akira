import type { Message } from "discord.js"
import { Args, fail, finish, loop1Async, loopAsync, Result, step } from "lexure"
import type { ValueOf } from "./misc"

type Parser<T> = (x: string) => Result<T, ValueOf<typeof ParseError>>

export const ParseError = {
  PARSE_FAILURE: 0, // A general parse error e.g. invalid input.
  NO_INPUT_GIVEN: 1, // No input was given.
  TOO_MANY_TRIES: 2, // Took too many tries to give a good input.
} as const

function makeLoopStrategy<T>(
  expected: string,
  runParser: Parser<T>,
  message: Message
) {
  let retries = 0

  return {
    getInput: async () => {
      if (retries >= 2) {
        return fail(ParseError.TOO_MANY_TRIES)
      }

      retries++

      const input = await message.channel
        .awaitMessages((m) => m.author.id === message.author.id, {
          max: 1,
          time: 10000,
        })
        .then((collected) => collected.first()?.content)

      if (!input) {
        return fail(ParseError.NO_INPUT_GIVEN)
      }

      return step(input)
    },
    parse: async (input: string) => {
      const res = runParser(input)

      if (res.success) {
        return finish(res.value)
      }

      await message.channel.send(
        `Invalid input ${input}, please give a valid ${expected}:`
      )

      return fail(ParseError.PARSE_FAILURE)
    },
  }
}

function loopParse<T>(
  expected: string,
  runParser: Parser<T>,
  message: Message
) {
  return (initialInput: string) => {
    return loopAsync(
      initialInput,
      makeLoopStrategy(expected, runParser, message)
    )
  }
}

async function loop1Parse<T>(
  expected: string,
  runParser: Parser<T>,
  message: Message
) {
  await message.channel.send(`No input given, please give a valid ${expected}:`)

  return loop1Async(makeLoopStrategy(expected, runParser, message))
}

export async function singleParseWithLoop<T>(
  args: Args,
  expected: string,
  parser: Parser<T>,
  message: Message
) {
  return (
    (await args.singleParseAsync(loopParse(expected, parser, message))) ??
    (await loop1Parse(expected, parser, message))
  )
}
