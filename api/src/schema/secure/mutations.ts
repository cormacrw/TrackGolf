import MatchModel from '../../models/Match'
import UserModel from '../../models/User'
import { MutationResolvers } from './types/schema'

const mutations: MutationResolvers = {
  createMatch: async (_, { input }) => {
    const match = await MatchModel.createMatch(input)

    return match
  }
}

export default mutations