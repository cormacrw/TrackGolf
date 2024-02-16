import { UserMatchStatsResponse } from 'app/services/api/controllers/user/userApi.types'
import { Instance, types } from 'mobx-state-tree'

export const StatsModel = types.model({
  averageMinutes: types.number,
  averageOpponentScore: types.number,
  averageOpponentShots: types.number,
  averageOpponentXG: types.number,
  averageUserPossession: types.number,
  averageUserScore: types.number,
  averageUserShots: types.number,
  averageUserXG: types.number,
  matchesCount: types.number,
  totalUserScore: types.number,
  totalOpponentScore: types.number,
  totalUserShots: types.number,
  totalOpponentShots: types.number,
  wins: types.number,
  rageQuits: types.number,
  draws: types.number,
})

export interface StatsItem extends Instance<typeof StatsModel> {}

export const responseToStatsModel = (response?: UserMatchStatsResponse): StatsItem => {
  return {
    averageMinutes: response?.stats._avg.minutes || 0,
    averageOpponentScore: response?.stats._avg.opponentScore || 0,
    averageOpponentShots: response?.stats._avg.opponentShots || 0,
    averageOpponentXG: response?.stats._avg.opponentXG || 0,
    averageUserPossession: response?.stats._avg.userPossession || 0,
    averageUserScore: response?.stats._avg.userScore || 0,
    averageUserShots: response?.stats._avg.userShots || 0,
    averageUserXG: response?.stats._avg.userXG || 0,
    matchesCount: response?.stats._count.id || 0,
    totalUserScore: response?.stats._sum.userScore || 0,
    totalOpponentScore: response?.stats._sum.opponentScore || 0,
    totalUserShots: response?.stats._sum.userShots || 0,
    totalOpponentShots: response?.stats._sum.opponentShots || 0,
    wins: response?.stats.wins || 0,
    rageQuits: response?.stats.rageQuits || 0,
    draws: response?.stats.draws || 0,
  }
}