import TrackUTTable from '../db/TrackUTTable'
import { Match, MatchInput, UserStats } from '../schema/secure/types/schema'
import { generateUUID } from './uuid'
import MatchModel from '../models/Match'

export default class UserStatsTracker {
  private gamesCount: number
  private wins: number
  private draws: number
  private losses: number
  private winRate: number
  private averagePossession: number
  private rageQuits: number
  private averageUserXG: number
  private averageOpponentXG: number
  private averageUserShots: number
  private averageOpponentShots: number
  private averageUserGoals: number
  private averageOpponentGoals: number
  private totalUserXG: number
  private totalOpponentXG: number
  private totalUserShots: number
  private totalOpponentShots: number
  private totalUserGoals: number
  private totalOpponentGoals: number
  private totalPossession: number

  constructor () {
    this.gamesCount = 0
    this.wins = 0
    this.draws = 0
    this.losses = 0
    this.winRate = 0
    this.averagePossession = 0
    this.rageQuits = 0
    this.averageUserXG = 0
    this.averageOpponentXG = 0
    this.averageUserShots = 0
    this.averageOpponentShots = 0
    this.averageUserGoals = 0
    this.averageOpponentGoals = 0
    this.totalUserXG = 0
    this.totalOpponentXG = 0
    this.totalUserShots = 0
    this.totalOpponentShots = 0
    this.totalUserGoals = 0
    this.totalOpponentGoals = 0
    this.totalPossession = 0
  }

  processMatches (matches: Match[]) {
    matches.forEach(match => {
      this.gamesCount++
      if ((match.userScore || 0) > (match.opponentScore || 0)) {
        this.wins++
      } else if ((match.userScore || 0) < (match.opponentScore || 0)) {
        this.losses++
      } else {
        this.draws++
      }

      this.totalUserGoals += match.userScore || 0
      this.totalOpponentGoals += match.opponentScore || 0

      this.totalUserShots += match.userShots || 0
      this.totalOpponentShots += match.opponentShots || 0

      this.totalUserXG += match.userXG || 0
      this.totalOpponentXG += match.opponentXG || 0

      this.totalPossession += match.userPossession || 0
    })

    this.winRate = this.roundNumber(this.wins / this.gamesCount)
    this.averagePossession = this.roundNumber(this.totalPossession / this.gamesCount)


    this.averageOpponentGoals = this.roundNumber(this.totalOpponentGoals / this.gamesCount)
    this.averageOpponentShots = this.roundNumber(this.totalOpponentShots / this.gamesCount)
    this.averageOpponentXG = this.roundNumber(this.totalOpponentXG / this.gamesCount)

    this.averageUserGoals = this.roundNumber(this.totalUserGoals / this.gamesCount)
    this.averageUserShots = this.roundNumber(this.totalUserShots / this.gamesCount)
    this.averageUserXG = this.roundNumber(this.totalUserXG / this.gamesCount)
  }

  getUserStats (): UserStats {
    return {
      gamesCount: this.gamesCount,
      winRate: this.winRate,
      wins: this.wins,
      draws: this.draws,
      losses: this.losses,
      averagePossession: this.averagePossession,
      rageQuits: this.rageQuits,
      averageUserXG: this.averageUserXG,
      averageOpponentXG: this.averageOpponentXG,
      averageUserShots: this.averageUserShots,
      averageOpponentShots: this.averageOpponentShots,
      averageUserGoals: this.averageUserGoals,
      averageOpponentGoals: this.averageOpponentGoals,
      totalUserXG: this.totalUserXG,
      totalOpponentXG: this.totalOpponentXG,
      totalUserShots: this.totalUserShots,
      totalOpponentShots: this.totalOpponentShots,
      totalUserGoals: this.totalUserGoals,
      totalOpponentGoals: this.totalOpponentGoals
    }
  }

  roundNumber (number: number) {
    return Math.round(number * 100) / 100
  }
}