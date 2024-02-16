import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const SearchUserStoreModel = types
  .model("SearchUserStore")
  .props({
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface SearchUserStore extends Instance<typeof SearchUserStoreModel> {}
export interface SearchUserStoreSnapshotOut extends SnapshotOut<typeof SearchUserStoreModel> {}
export interface SearchUserStoreSnapshotIn extends SnapshotIn<typeof SearchUserStoreModel> {}
export const createSearchUserStoreDefaultModel = () => types.optional(SearchUserStoreModel, {})
