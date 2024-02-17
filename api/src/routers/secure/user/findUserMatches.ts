import { prisma } from '../../../db/client'
import { Router } from 'express'
import { isValid } from 'date-fns'

const register = (router: Router) => {
  router.get('/user/:userId/matches', async (req, res) => {
    const {
      limit,
      offset,
      sort,
      from,
      to,
      type
    } = req.query

    if (from && !isValid(new Date(from as string))) {
      res.status(400).send({ message: 'INVALID_FROM_DATE' })
      return
    }

    if (to && !isValid(new Date(to as string))) {
      res.status(400).send({ message: 'INVALID_TO_DATE' })
      return
    }

    const matches = await prisma.match.findMany({
      where: {
        userId: req.params.userId,
        createdAt: {
          ...(to ? { lte: new Date(to as string) } : {}),
          ...(from ? { gte: new Date(from as string) } : {})
        },
        ...(type ? { type: type as string } : {})
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