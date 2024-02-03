import { Express, NextFunction, Request, Response } from 'express'
import logger from 'utils/logger'

const register = (app: Express) => {
  app.use('/', (err: Error, req: Request, res: Response, next: NextFunction): void => {
    logger.error(`[ERROR] ${err}`)
    res.sendStatus(500)
  })
}

export default { register }