import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const MatchStoreModel = types
  .model("MatchStore")
  .props({
    
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface MatchStore extends Instance<typeof MatchStoreModel> {}
export interface MatchStoreSnapshotOut extends SnapshotOut<typeof MatchStoreModel> {}
export interface MatchStoreSnapshotIn extends SnapshotIn<typeof MatchStoreModel> {}
export const createMatchStoreDefaultModel = () => types.optional(MatchStoreModel, {})
