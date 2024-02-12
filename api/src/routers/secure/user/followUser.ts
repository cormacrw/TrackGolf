import { prisma } from '../../../db/client'
import { Router } from 'express'

const register = (router: Router) => {
  router.post('/user/:userId/follow', async (req, res) => {
    const { userId: followerUserId } = req.body
    const { userId: followeeUserId } = req.params

    const existingFollow = await prisma.follow.findFirst({
      where: {
        userId: followerUserId,
        followedUserId: followeeUserId
      }
    })

    if (existingFollow) {
      res.status(400).send({ message: 'ALREADY_FOLLOWING' })
      return
    }

    const follow = await prisma.follow.create({
      data: {
        userId: followerUserId,
        followedUserId: followeeUserId
      }
    })

    res.send({ follow })
  })
}

export default { register }