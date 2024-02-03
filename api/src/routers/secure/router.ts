import { Router } from 'express'
import { authMiddleware } from '../../middleware'
import { authLogin } from './auth'
import findUserMatches from './user/findUserMatches'
import setUserUsername from './user/setUserUsername'
import getUserStats from './user/getUserStats'
import findAllMatches from './matches/findAllMatches'
import createMatch from './matches/createMatch'
import deleteMatch from './matches/deleteMatch'

const secureRouter = Router()

// DO NOT REMOVE
authMiddleware.register(secureRouter)

// testSecure.register(secureRouter)

findUserMatches.register(secureRouter)
setUserUsername.register(secureRouter)
getUserStats.register(secureRouter)

findAllMatches.register(secureRouter)
createMatch.register(secureRouter)
deleteMatch.register(secureRouter)

authLogin.register(secureRouter)

export default secureRouter