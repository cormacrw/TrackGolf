import TrackUTTable from '../db/TrackUTTable'
import { SignInGoogleUser } from '../schema/public/types/schema'
import { User, UserStats } from '../schema/secure/types/schema'
import UserStatsTracker from '../utils/UserStatsTracker'
import { generateUUID } from '../utils/uuid'
import AuthModel from './Auth'
import MatchModel from './Match'

export default class UserModel {
  static async signInGoogleUser (email: string, googleId: string): Promise<SignInGoogleUser> {
    let user = await this.findByEmail(email)
    if (!user) {
      user = await this.createGoogleUser(email, googleId)
    }

    return {
      user,
      auth: AuthModel.createTokens(user)
    }
  }

  static async createGoogleUser (email: string, googleId: string): Promise<User> {
    const userId = generateUUID()
    const user: User = {
      tutPk: `user:${userId}`,
      tutSk: 'metadata:user',
      userId,
      email,
      username: '',
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

  static async getMatchStats (userId: string): Promise<UserStats> {
    const matches = await MatchModel.findByUserId(userId)
    const statTracker = new UserStatsTracker()

    statTracker.processMatches(matches)
    return statTracker.getUserStats()
  }
}