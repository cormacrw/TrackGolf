import auth from './auth'
import errorHandler from './errorHandler'
import logger from './logger'

export const authMiddleware = auth
export const loggerMiddleware = logger
export const errorMiddleware = errorHandler