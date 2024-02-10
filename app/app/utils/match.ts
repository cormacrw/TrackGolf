import { MatchItem } from 'app/models'

export const getResult = (match: MatchItem): 'W' | 'D' | 'L' => {
  const userScore = match.userScore || 0
  const opponentScore = match.opponentScore || 0
  if (userScore > opponentScore) {
    return 'W'
  } else if (userScore < opponentScore) {
    return 'L'
  } else {
    return 'D'
  }
}