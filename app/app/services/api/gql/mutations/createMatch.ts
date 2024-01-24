import { gql } from '@apollo/client'
import { Match } from '../secureSchema'

export const CREATE_MATCH = gql`
  mutation CreateMatch (
    $userId: String!
    $userScore: Int
    $userPossession: Int
    $userXG: Float
    $userShots: Int
    $userPenalties: Int
    $opponentScore: Int
    $opponentXG: Float
    $opponentShots: Int
    $opponentPenalties: Int
    $userYellows: Int
    $userReds: Int
    $minutes: Int
    $type: String
  ) {
    createMatch(input: {
      userId: $userId
      userScore: $userScore
      userPossession: $userPossession
      userXG: $userXG
      userShots: $userShots
      userPenalties: $userPenalties
      opponentScore: $opponentScore
      opponentXG: $opponentXG
      opponentShots: $opponentShots
      opponentPenalties: $opponentPenalties
      userYellows: $userYellows
      userReds: $userReds
      minutes: $minutes
      type: $type
    }) {
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
    }
  }
`

export type CreateMatchResponse = {
  createMatch: Match
}