export interface Match {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
  type: string
  userScore: number
  userPossession: number | null
  userXG: number | null
  userShots: number | null
  userPenalties: number | null
  opponentScore: number | null
  opponentXG: number | null
  opponentShots: number | null
  opponentPenalties: number | null
  userYellows: number | null
  userReds: number | null
  minutes: number | null
}

export interface MatchCreateResponse {
  match: Match
}