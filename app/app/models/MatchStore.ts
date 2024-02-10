import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { api } from 'app/services/api/api'


export const MatchModel = types.model({
  id: types.string,
  userId: types.string,
  createdAt: types.string,
  updatedAt: types.string,
  type: types.string,
  userScore: types.maybe(types.number),
  userXG: types.maybe(types.number),
  userShots: types.maybe(types.number),
  userPenalties: types.maybe(types.number),
  opponentScore: types.maybe(types.number),
  opponentXG: types.maybe(types.number),
  opponentShots: types.maybe(types.number),
  opponentPenalties: types.maybe(types.number),
  userYellows: types.maybe(types.number),
  userReds: types.maybe(types.number),
  minutes: types.maybe(types.number)
})

export interface MatchItem extends Instance<typeof MatchModel> {}


/**
 * Model description here for TypeScript hints.
 */
export const MatchStoreModel = types
  .model("MatchStore")
  .props({
    matches: types.array(MatchModel)
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async fetchMatches (userId: string) {
      const response = await api.user().fetchMatches(userId, 0, 10000)

      self.setProp('matches', response?.matches as any)
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface MatchStore extends Instance<typeof MatchStoreModel> {}
export interface MatchStoreSnapshotOut extends SnapshotOut<typeof MatchStoreModel> {}
export interface MatchStoreSnapshotIn extends SnapshotIn<typeof MatchStoreModel> {}
export const createMatchStoreDefaultModel = () => types.optional(MatchStoreModel, {})
