import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { UserModel } from './UserStore'
import { api } from 'app/services/api/api'

/**
 * Model description here for TypeScript hints.
 */
export const SearchUserStoreModel = types
  .model("SearchUserStore")
  .props({
    users: types.array(UserModel)
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async search(searchTerm: string) {
      const res = await api.user().findByUsername(searchTerm)

      self.setProp('users', (res?.users || []) as any)
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface SearchUserStore extends Instance<typeof SearchUserStoreModel> {}
export interface SearchUserStoreSnapshotOut extends SnapshotOut<typeof SearchUserStoreModel> {}
export interface SearchUserStoreSnapshotIn extends SnapshotIn<typeof SearchUserStoreModel> {}
export const createSearchUserStoreDefaultModel = () => types.optional(SearchUserStoreModel, {})
