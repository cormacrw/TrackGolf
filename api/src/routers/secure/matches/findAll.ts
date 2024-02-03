import { prisma } from 'db/client'
import { Router } from 'express'

const register = (router: Router) => {
  router.get('/matches', async (req, res) => {
    const matches = await prisma.match.findMany()
    res.send({
      matches
    })
  })
}

export default { register }