import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { User } from '../services/api/gql/publicSchema'
/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    email: types.maybe(types.string),
    googleId: types.maybe(types.string),
    tutPk: types.maybe(types.string),
    tutSk: types.maybe(types.string),
    userId: types.maybe(types.string),
    username: types.maybe(types.string)
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setUser (user: User) {
      self.email = user.email  || ''
      self.googleId = user.googleId  || ''
      self.tutPk = user.tutPk  || ''
      self.userId = user.userId  || ''
      self.username = user.username  || ''
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshotOut extends SnapshotOut<typeof UserStoreModel> {}
export interface UserStoreSnapshotIn extends SnapshotIn<typeof UserStoreModel> {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
