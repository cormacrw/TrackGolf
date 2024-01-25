import MatchModel from '../../models/Match'
import UserModel from '../../models/User'
import { QueryResolvers } from './types/schema'

const queries: QueryResolvers = {
  getUserByEmail: async (_, {email}) => {
    const user = await UserModel.findByEmail(email)
    return user
  },
  getMatchesByUser: async (_, { userId }, ) => {
    const matches = await MatchModel.findByUserId(userId)

    return matches
  },
  getUserStats: async (_, { userId }, ) => {
    const userStats = await UserModel.getMatchStats(userId)

    return userStats
  },
}

export default queries