import { prisma } from '../../../db/client'
import { Router } from 'express'

const register = (router: Router) => {
  router.get('/user/:userId/matches', async (req, res) => {
    const { limit, offset, sort } = req.query
    const matches = await prisma.match.findMany({
      where: {
        userId: req.params.userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: offset ? Number(offset) : undefined,
      take: limit ? Number(limit) : undefined
    })

    res.send({ matches })
  })
}

export default { register }