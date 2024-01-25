import { gql } from '@apollo/client'
import { Match } from '../secureSchema'

export const GET_MATCHES_BY_USER = gql`
  query GetMatchesByUser ($userId: String!) {
    getMatchesByUser(userId: $userId) {
      assists
      matchId
      opponentPenalties
      opponentScore
      opponentShots
      opponentXG
      scorers
      tutPk
      tutSk
      userPenalties
      userPossession
      userReds
      userScore
      userShots
      userYellows
      type
      
    }
  }
`

export type GetMatchesByUserResponse = {
    getMatchesByUser: Match[]
}