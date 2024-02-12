import { prisma } from '../../../db/client'
import { Router } from 'express'

const register = (router: Router) => {
  router.get('/user/:userId/followers', async (req, res) => {
    const followers = await prisma.follow.findMany({
      where: {
        followedUserId: req.params.userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        followedUser: true
      }
    })

    res.send({ followers })
  })
}

export default { register }