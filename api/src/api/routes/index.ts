import { Router } from 'express'
import { create } from './round/create'
import { list } from './round/list'

export default () => {
  const router = Router()

  router.post('/round/create', create)
  router.get('/round/list', list)

  return router
}
