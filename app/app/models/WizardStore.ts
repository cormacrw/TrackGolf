import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { api } from 'app/services/api/api'

const WizardModel = types.model({
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
  userReds: types.maybe(types.number)
}).actions(withSetPropAction)

export interface WizardModel extends Instance<typeof WizardModel> {}

/**
 * Model description here for TypeScript hints.
 */
export const WizardStoreModel = types
  .model("WizardStore")
  .props({
    wizard: WizardModel
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    default () {
      self.setProp('wizard', createWizardStoreDefaultModel().wizard)
    },
    async create (userId: string) {
      await api.match().create(self.wizard, userId)
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface WizardStore extends Instance<typeof WizardStoreModel> {}
export interface WizardStoreSnapshotOut extends SnapshotOut<typeof WizardStoreModel> {}
export interface WizardStoreSnapshotIn extends SnapshotIn<typeof WizardStoreModel> {}
export const createWizardStoreDefaultModel = () => ({
  wizard: {
    type: '',
    minutes: 0,
    userScore: 0,
    userPossession: 50,
    userXG: 0,
    userShots: 0,
    userPenalties: 0,
    opponentScore: 0,
    opponentXG: 0,
    opponentShots: 0,
    opponentPenalties: 0,
    userYellows: 0,
    userReds: 0
  }
})
