import { prisma } from '../../../db/client'
import { Router } from 'express'
import BadWordFilter from 'bad-words'

const register = (router: Router) => {
  router.put('/user/:userId/username', async (req, res) => {
    try {
      const { userId } = req.params
      const { username } = req.body
      // TODO check that user has the same email as whats in the id token
      const user = await prisma.user.findFirst({ where: { id: userId } })

      if (!user) {
        res.status(400).send({
          message: 'INVALID_USER'
        })
        return
      }

      if (user.username === username) {
        res.status(400).send({
          message: 'USERNAME_ALREADY_SET'
        })
        return
      }

      const usernameUser = await prisma.user.findFirst({ where: { username } })
      if (usernameUser) {
        res.status(400).send({
          message: 'USERNAME_EXISTS'
        })
        return
      }

      const filter = new BadWordFilter()
      if (filter.isProfane(username)) {
        res.status(400).send({
          message: 'USERNAME_IS_PROFANE'
        })
        return
      }

      if (username.length > 32) {
        res.status(400).send({
          message: 'USERNAME_TOO_LONG'
        })
        return
      }

      await prisma.user.update({
        where: { id: userId },
        data: { username }
      })

      res.send({ success: true })
    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }

  })
}

export default { register }