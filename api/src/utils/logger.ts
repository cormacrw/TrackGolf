import winston from 'winston'
import { format } from 'winston'

const logFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
)


const logger = winston.createLogger({
  // format: logFormat,
  transports: [
    new winston.transports.Console()
  ]
})

export default logger