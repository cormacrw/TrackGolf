import UserModel from '../models/User'
import { QueryResolvers } from '../types/schema'

const queries: QueryResolvers = {
  getUserByEmail: async (_, {email}, {}) => {
    const user = await UserModel.findByEmail(email)
    return user
  }
}

export default queries