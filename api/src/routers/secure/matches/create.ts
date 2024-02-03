import { prisma } from 'db/client'
import { Router } from 'express'
import { TypedRequestBody } from 'types/TypedRequestBody'

interface CreateMatchRequestBody {
  match: {
    userId: string
    type: string
    userScore: number
    userPossession: number
    userXG: number
    userShots: number
    userPenalties: number
    opponentScore: number
    opponentXG: number
    opponentShots: number
    opponentPenalties: number
    userYellows: number
    userReds: number
    minutes: number
  }
}

const register = (router: Router) => {
  router.post('/matches', async (req: TypedRequestBody<CreateMatchRequestBody>, res) => {
    const { match } = req.body

    if (!match) {
      res.sendStatus(400)
      return
    }

    const newMatch = await prisma.match.create({
      data: match
    })
    res.send({
      match: newMatch
    })
  })
}

export default { register }