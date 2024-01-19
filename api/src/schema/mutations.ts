import UserModel from '../models/User'
import { MutationResolvers } from '../types/schema'

const mutations: MutationResolvers = {
  createUser: async (_, { input }, ) => {
    const user = await UserModel.createGoogleUser(input.email, input.username, input.googleId)

    return user
  }
}

export default mutations