import { Match } from '../match/matchApi.types'

export interface SetUsernameResponse {
  success: boolean
  message: 'USERNAME_IS_PROFANE' | 'USERNAME_ALREADY_SET' | 'USERNAME_EXISTS' | 'USERNAME_TOO_LONG' | 'INVALID_USER'
}

export const USERNAME_MESSAGE_MAP = {
  'USERNAME_IS_PROFANE': 'Username should not include any profanity',
  'USERNAME_ALREADY_SET': 'Username already set',
  'USERNAME_EXISTS': 'Username already exists',
  'USERNAME_TOO_LONG': 'Username is too long',
  'INVALID_USER': 'invalid user'
}

export interface UserMatchStatsResponse {
  stats: {
    _avg: {
      minutes: number
      opponentScore: number
      opponentShots: number
      opponentXG: number
      userPossession: number
      userScore: number
      userShots: number
      userXG: number
    }
    _count: {
      id: number
    },
    _sum: {
      userScore: null
      opponentScore: null
      userShots: null
      opponentShots: null
    }
  }
}

export interface UserMatchesResponse {
  matches: Match[]
}