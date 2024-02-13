import { prisma } from '../../../db/client'
import { Router } from 'express'

const register = (router: Router) => {
  router.get('/users/search', async (req, res) => {
    const { query } = req.query

    if (!query) {
      res.status(400).send({ message: 'NO_QUERY' })
      return
    }

    const qry = query as string

    if (qry.length < 4) {
      res.status(400).send({ message: 'QUERY_TOO_SHORT' })
      return
    }

    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: qry,
          mode: 'insensitive'
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.send({ users })
  })
}

export default { register }