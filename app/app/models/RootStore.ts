import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { SearchUserStoreModel } from "./SearchUserStore"
import { DashboardStoreModel, createDashboardStoreDefaultModel } from "./DashboardStore"
import { WizardStoreModel, createWizardStoreDefaultModel } from "./WizardStore"
import { MatchStoreModel } from "./MatchStore"
import { AppStoreModel } from "./AppStore"
import { UserStoreModel, createUserStoreDefaultModel } from "./UserStore"
import { AuthStoreModel } from "./AuthStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  searchUserStore: types.optional(SearchUserStoreModel, {} as any),
  dashboardStore: types.optional(DashboardStoreModel, createDashboardStoreDefaultModel()),
  wizardStore: types.optional(WizardStoreModel, createWizardStoreDefaultModel()),
  matchStore: types.optional(MatchStoreModel, {} as any),
  appStore: types.optional(AppStoreModel, {} as any),
  userStore: types.optional(UserStoreModel, createUserStoreDefaultModel()),
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
