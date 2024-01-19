import TrackUTTable from '../db/TrackUTTable'
import { Match, MatchInput } from '../types/schema'
import { generateUUID } from '../utils/uuid'

export default class MatchModel {
  static async createMatch (input: MatchInput): Promise<Match> {
    const matchId = generateUUID()
    const match: Match = {
      tutPk: `user:${input.userId}`,
      tutSk: `match:${matchId}`,
      matchId,
      ...input
    }

    await TrackUTTable.putItem(match)

    return match
  }

  static async findByUserId (userId: string): Promise<Match[]> {
    const matches = await TrackUTTable.queryPKBeginsWithSK(`user:${userId}`, 'match:')

    return matches as Match[]
  }
}