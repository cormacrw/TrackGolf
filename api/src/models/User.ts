import TrackUTTable from '../db/TrackUTTable'
import { User } from '../types/schema'
import { generateUUID } from '../utils/uuid'

export default class UserModel {
  static async createGoogleUser (email: string, username: string, googleId: string): Promise<User> {
    const user: User = {
      tutPk: `user:${generateUUID()}`,
      tutSk: 'metadata:user',
      email,
      username,
      googleId
    }

    await TrackUTTable.putItem(user)

    return user
  }

  static async findByEmail (email: string): Promise<User> {
    const filterExpression = 'email = :email'
    const expressionValues = {
      ':email': {
        S: email
      }
    }

    const res = await TrackUTTable.scan(filterExpression, expressionValues)

    return res[0] as User
  }
}