import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { WizardStoreModel } from "./WizardStore"
import { MatchStoreModel } from "./MatchStore"
import { AppStoreModel } from "./AppStore"
import { UserStoreModel } from "./UserStore"
import { AuthStoreModel } from "./AuthStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  wizardStore: types.optional(WizardStoreModel, {} as any),
  matchStore: types.optional(MatchStoreModel, {} as any),
  appStore: types.optional(AppStoreModel, {} as any),
  userStore: types.optional(UserStoreModel, {} as any),
  authStore: types.optional(AuthStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
