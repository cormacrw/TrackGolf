import { prisma } from 'db/client'
import { Router } from 'express'
import { TypedRequestBody } from 'types/TypedRequestBody'

const register = (router: Router) => {
  router.get('/user/:userId/matches', async (req, res) => {
    try {
      const matches = await prisma.match.findMany({
        where: {
          userId: req.params.userId
        }
      })
      res.send({
        matches
      })
    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }

  })
}

export default { register }