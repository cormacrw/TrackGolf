import { gql } from '@apollo/client'
import { UserStats } from '../secureSchema'

export const GET_USER_STATS = gql`
  query GetUserStats ($userId: String!) {
    getUserStats(userId: $userId) {
      gamesCount
      wins
      draws
      losses
      winRate
      averagePossession
      rageQuits
      averageUserXG
      averageOpponentXG
      averageUserShots
      averageOpponentShots
      averageUserGoals
      averageOpponentGoals
      totalUserXG
      totalOpponentXG
      totalUserShots
      totalOpponentShots
      totalUserGoals
      totalOpponentGoals
    }
  }
`

export type GetUserStatsResponse = {
  getUserStats: UserStats
}