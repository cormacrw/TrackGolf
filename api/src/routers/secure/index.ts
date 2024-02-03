import { Router } from 'express'
import { createMatch, deleteMatch, findAllMatches } from './matches'
import { findUserMatches, getUserStats, setUserUsername } from './user'
import { testSecure } from './test'
import { authMiddleware } from 'middleware'
import { authLogin } from './auth'

const secureRouter = Router()

// DO NOT REMOVE
authMiddleware.register(secureRouter)

testSecure.register(secureRouter)

findUserMatches.register(secureRouter)
setUserUsername.register(secureRouter)
getUserStats.register(secureRouter)

findAllMatches.register(secureRouter)
createMatch.register(secureRouter)
deleteMatch.register(secureRouter)

authLogin.register(secureRouter)

export default secureRouter