import { Router } from 'express'
import logger from '../utils/logger'

const register = (router: Router) => {
  router.use(async (req, res, next) => {
    logger.info(`[${req.method}] ${req.path}`)
    next()
  })
}

export default { register }