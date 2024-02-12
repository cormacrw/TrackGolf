import winston from 'winston'
import { format } from 'winston'

const logFormat = format.combine(
  format.timestamp(),
  format.json()
)


const logger = winston.createLogger({
  format: logFormat,
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({filename: 'logs/error/error.log', level: 'error'}),
    // new winston.transports.File({filename: 'logs/info/activity.log', level: 'info'})
  ],
})

export default logger