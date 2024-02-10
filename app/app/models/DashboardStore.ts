import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { api } from 'app/services/api/api'
import { MatchModel } from './MatchStore'

/**
 * Model description here for TypeScript hints.
 */
export const DashboardStoreModel = types
  .model("DashboardStore")
  .props({
    // FILTERS
    from: types.string,
    to: types.string,
    // STATS
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

    recentMatches: types.array(MatchModel)
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async fetchStats (userId: string) {
      try {
        const response = await api.user().fetchStats(userId, self.from, self.to)
        self.setProp('averageMinutes', response?.stats._avg.minutes || 0)
        self.setProp('averageOpponentScore', response?.stats._avg.opponentScore || 0)
        self.setProp('averageOpponentShots', response?.stats._avg.opponentShots || 0)
        self.setProp('averageOpponentXG', response?.stats._avg.opponentXG || 0)
        self.setProp('averageUserPossession', response?.stats._avg.userPossession || 0)
        self.setProp('averageUserScore', response?.stats._avg.userScore || 0)
        self.setProp('averageUserShots', response?.stats._avg.userShots || 0)
        self.setProp('averageUserXG', response?.stats._avg.userXG || 0)
        self.setProp('matchesCount', response?.stats._count.id || 0)
        self.setProp('totalUserScore', response?.stats._sum.userScore || 0)
        self.setProp('totalOpponentScore', response?.stats._sum.opponentScore || 0)
        self.setProp('totalUserShots', response?.stats._sum.userShots || 0)
        self.setProp('totalOpponentShots', response?.stats._sum.opponentShots || 0)
      } catch (error) {
        console.log(error)
      }
    },
    async fetchRecentMatches (userId: string) {
      const matches = await api.user().fetchMatches(userId, 0, 5)
      self.setProp('recentMatches', matches?.matches as any)
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface DashboardStore extends Instance<typeof DashboardStoreModel> {}
export interface DashboardStoreSnapshotOut extends SnapshotOut<typeof DashboardStoreModel> {}
export interface DashboardStoreSnapshotIn extends SnapshotIn<typeof DashboardStoreModel> {}
export const createDashboardStoreDefaultModel = () => ({
  from: '2024-01-01',
  to: '2024-12-30',

  averageMinutes: 0,
  averageOpponentScore: 0,
  averageOpponentShots: 0,
  averageOpponentXG: 0,
  averageUserPossession: 0,
  averageUserScore: 0,
  averageUserShots: 0,
  averageUserXG: 0,
  matchesCount: 0,
  totalUserScore: 0,
  totalOpponentScore: 0,
  totalUserShots: 0,
  totalOpponentShots: 0
})
