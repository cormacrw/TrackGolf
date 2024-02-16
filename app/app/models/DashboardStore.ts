import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { api } from 'app/services/api/api'
import { MatchModel } from './MatchStore'
import { FilterStoreModel, createFilterStoreDefaultModel } from './FilterStore'
import { StatsModel, responseToStatsModel } from './StatsModel'

/**
 * Model description here for TypeScript hints.
 */
export const DashboardStoreModel = types
  .model("DashboardStore")
  .props({
    // FILTERS
    filters: FilterStoreModel,
    stats: StatsModel,
    recentMatches: types.array(MatchModel)
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async fetchStats (userId: string) {
      try {
        const response = await api.user().fetchStats(userId, self.filters.from, self.filters.to, self.filters.type)
        self.setProp('stats', responseToStatsModel(response))
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
  filters: createFilterStoreDefaultModel(),
  stats: {
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
    totalOpponentShots: 0,
    wins: 0,
    draws: 0,
    rageQuits: 0
  }
})
