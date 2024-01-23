import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
/**
 * Model description here for TypeScript hints.
 */
export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    isLoggedIn: types.optional(types.boolean, false),
    accessToken: types.maybe(types.string),
    refreshToken: types.maybe(types.string)
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setTokens (accessToken: string, refreshToken: string) {
      self.accessToken = accessToken
      self.refreshToken = refreshToken
    },
    login () {
      self.isLoggedIn = true
    },
    signout () {
      self.isLoggedIn = false
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface AuthStore extends Instance<typeof AuthStoreModel> {}
export interface AuthStoreSnapshotOut extends SnapshotOut<typeof AuthStoreModel> {}
export interface AuthStoreSnapshotIn extends SnapshotIn<typeof AuthStoreModel> {}
export const createAuthStoreDefaultModel = () => types.optional(AuthStoreModel, {})
