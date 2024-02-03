import { Router } from 'express'
import { verifier } from 'utils/jwtVerifier'
import logger from 'utils/logger'

const register = (router: Router) => {
  router.use(async (req, res, next) => {
    logger.info('IN AUTH')
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
      res.sendStatus(401)
      return
    }

    const token = req.headers.authorization.split(' ')[1]
    logger.info('TOKEN: ' + token)
    try {
      const payload = await verifier.verify(token)
      logger.info('JWT PAYLOAD:')
      logger.info(payload)
      res.locals.email = payload.email
      next()
    } catch (error) {
      console.log(error)
      logger.error('AUTH FAILED')
      res.sendStatus(401)
    }
  })
}

export default { register }