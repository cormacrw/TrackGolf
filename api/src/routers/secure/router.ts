import { Router } from 'express'
import { authMiddleware } from '../../middleware'
import { authLogin } from './auth'
import findUserMatches from './user/findUserMatches'
import setUserUsername from './user/setUserUsername'
import getUserStats from './user/getUserStats'
import findAllMatches from './matches/findAllMatches'
import createMatch from './matches/createMatch'
import deleteMatch from './matches/deleteMatch'
import searchUsersByUsername from './user/searchUsersByUsername'
import followUser from './user/followUser'
import unfollowUser from './user/unfollowUser'
import findUserFollowers from './user/findUserFollowers'
import findUserFollowing from './user/findUserFollowing'

const secureRouter = Router()

// DO NOT REMOVE
authMiddleware.register(secureRouter)

// testSecure.register(secureRouter)

findUserMatches.register(secureRouter)
setUserUsername.register(secureRouter)
getUserStats.register(secureRouter)
searchUsersByUsername.register(secureRouter)
followUser.register(secureRouter)
unfollowUser.register(secureRouter)

findUserFollowers.register(secureRouter)
findUserFollowing.register(secureRouter)

findAllMatches.register(secureRouter)
createMatch.register(secureRouter)
deleteMatch.register(secureRouter)

authLogin.register(secureRouter)

export default secureRouter