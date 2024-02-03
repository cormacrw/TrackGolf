import { prisma } from 'db/client'
import { Router } from 'express'
import { TypedRequestBody } from 'types/TypedRequestBody'

/**
 * Check if user exists if not create them
 * @param router 
 */
const register = (router: Router) => {
  router.post('/login', async (req, res) => {
    const user = await prisma.user.findFirst({ where: { email: res.locals.email }})

    if (user) {
      res.send({ user })
    } else {
      const newUser = await prisma.user.create({ data: { email: res.locals.email }})

      res.send({ user: newUser })
    }
  })
}

export default { register }