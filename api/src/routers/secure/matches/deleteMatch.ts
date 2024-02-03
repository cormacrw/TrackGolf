import { prisma } from '../../../db/client'
import { Router } from 'express'

const register = (router: Router) => {
  router.delete('/matches/:matchId', async (req, res) => {
    const { matchId } = req.params

    await prisma.match.delete({ where: { id: matchId } })
    res.send({
      success: true
    })
  })
}

export default { register }