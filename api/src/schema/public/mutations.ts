import MatchModel from '../../models/Match'
import UserModel from '../../models/User'
import { MutationResolvers } from './types/schema'

const mutations: MutationResolvers = {
  signInGoogleUser: async (_, { email, googleId }) => {
    const user = await UserModel.signInGoogleUser(email, googleId)

    return user
  }
}

export default mutations