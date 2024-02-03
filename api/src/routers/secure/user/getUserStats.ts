import { prisma } from '../../../db/client'
import { Router } from 'express'
import { isValid } from 'date-fns'

const register = (router: Router) => {
  router.get('/user/:userId/stats', async (req, res) => {
    const { from, to, type } = req.query

    if (from && !isValid(new Date(from as string))) {
      res.status(400).send({ message: 'INVALID_FROM_DATE' })
      return
    }

    if (to && !isValid(new Date(to as string))) {
      res.status(400).send({ message: 'INVALID_TO_DATE' })
      return
    }

    const stats = await prisma.match.aggregate({
      _avg: {
        minutes: true,
        opponentScore: true,
        opponentShots: true,
        opponentXG: true,
        userPossession: true,
        userScore: true,
        userShots: true,
        userXG: true
      },
      _count: {
        id: true
      },
      _sum: {
        userScore: true,
        opponentScore: true,
        userShots: true,
        opponentShots: true
      },
      where: {
        userId: req.params.userId,
        createdAt: {
          lte: new Date(to as string),
          gte: new Date(from as string)
        }
      }
    })

    res.send({ stats })
  })
}

export default { register }