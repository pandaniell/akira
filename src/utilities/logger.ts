import ecsFormat from "@elastic/ecs-pino-format"
import pinoElastic from "pino-elasticsearch"
import pino from "pino"

ecsFormat()

function streamToElastic() {
  return pinoElastic({
    consistency: "one",
    node: process.env["BONSAI_URL"],
    "es-version": 7,
  })
}

const prettyPrint = {
  colorize: true,
  ignore: "hostname,pid",
  translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
}

export const logger = pino(
  {
    name: process.env["npm_package_name"],
    ...(__DEV__ ? { prettyPrint } : ecsFormat),
  },
  !__DEV__ && streamToElastic()
)
