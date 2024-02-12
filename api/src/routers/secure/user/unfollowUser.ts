import { prisma } from '../../../db/client'
import { Router } from 'express'

const register = (router: Router) => {
  router.post('/user/:userId/unfollow', async (req, res) => {
    const { userId: followerUserId } = req.body
    const { userId: followeeUserId } = req.params

    const existingFollow = await prisma.follow.findFirst({
      where: {
        userId: followerUserId,
        followedUserId: followeeUserId
      }
    })

    if (!existingFollow) {
      res.status(400).send({ message: 'NOT_FOLLOWING' })
      return
    }

    const follow = await prisma.follow.delete({
      where: {
        id: existingFollow.id
      }
    })

    res.send({ message: 'SUCCESS' })
  })
}

export default { register }