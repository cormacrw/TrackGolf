import { Router } from 'express'
import { findAllMatches } from './matches'
import { findUserMatches } from './user'
import { testSecure } from './test'
import { authMiddleware } from 'middleware'
import { authLogin } from './auth'

const secureRouter = Router()

// DO NOT REMOVE
authMiddleware.register(secureRouter)

testSecure.register(secureRouter)
findAllMatches.register(secureRouter)
findUserMatches.register(secureRouter)

authLogin.register(secureRouter)

export default secureRouter