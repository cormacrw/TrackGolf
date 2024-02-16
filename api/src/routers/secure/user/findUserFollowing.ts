import { prisma } from '../../../db/client'
import { Router } from 'express'

const register = (router: Router) => {
  router.get('/user/:userId/following', async (req, res) => {
    const following = await prisma.follow.findMany({
      where: {
        userId: req.params.userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        followedUser: true
      }
    })

    res.send({ following })
  })
}

export default { register }