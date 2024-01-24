import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const WizardStoreModel = types
  .model("WizardStore")
  .props({
    type: types.maybe(types.string),
    minutes: types.maybe(types.number),
    userScore: types.maybe(types.number),
    userPossession: types.maybe(types.number),
    userXG: types.maybe(types.number),
    userShots: types.maybe(types.number),
    userPenalties: types.maybe(types.number),
    opponentScore: types.maybe(types.number),
    opponentXG: types.maybe(types.number),
    opponentShots: types.maybe(types.number),
    opponentPenalties: types.maybe(types.number),
    userYellows: types.maybe(types.number),
    userReds: types.maybe(types.number),
    scorers: types.maybe(types.array(types.string)),
    assists: types.maybe(types.array(types.string))
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    default () {
      self.type = undefined
      self.minutes = 90
      self.userScore = 0
      self.userPossession = 50
      self.userXG = 0
      self.userShots = 0
      self.userPenalties = 0
      self.opponentScore = 0
      self.opponentXG = 0
      self.opponentShots = 0
      self.opponentPenalties = 0
      self.userYellows = 0
      self.userReds = 0
      self.scorers?.clear()
      self.assists?.clear()
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface WizardStore extends Instance<typeof WizardStoreModel> {}
export interface WizardStoreSnapshotOut extends SnapshotOut<typeof WizardStoreModel> {}
export interface WizardStoreSnapshotIn extends SnapshotIn<typeof WizardStoreModel> {}
export const createWizardStoreDefaultModel = () => types.optional(WizardStoreModel, {})
