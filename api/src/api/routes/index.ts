import { verifySession } from 'supertokens-node/recipe/session/framework/express'
import { Router } from 'express'
import { create as createRound } from './round/create'
import { list as listRounds } from './round/list'
import { get as getUser } from './user/get'
import { _delete as deleteRound } from './round/delete'

export default () => {
  const router = Router()

  router.use(verifySession())

  router.post('/round', createRound)
  router.delete('/round/:id', deleteRound)
  router.get('/rounds', listRounds)

  router.get('/user', getUser)

  router.get('/test', (req, res) => {
    res.json({
      message: 'Hello, world!'
    })
  })

  return router
}
