import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { api } from 'app/services/api/api'
import { fetchAuthSession, signOut } from 'aws-amplify/auth'
import User from 'app/services/api/models/user'
/**
 * Model description here for TypeScript hints.
 */
export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    isLoggedIn: types.optional(types.boolean, false)
  })
  .actions(withSetPropAction)
  .views((self) => ({
    
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async login (): Promise<User | undefined> {
      const user = await api.auth().login()

      console.log(user)
      
      if (user?.id) {
        self.setProp('isLoggedIn', true)
      }
      return user
    },
    async logout () {
      await signOut()
      self.setProp('isLoggedIn', false)
    },
    async checkLogin () {
      try {
        const session = await fetchAuthSession()
        return !!session.tokens?.idToken
      } catch (error) {
        return false
      }
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface AuthStore extends Instance<typeof AuthStoreModel> {}
export interface AuthStoreSnapshotOut extends SnapshotOut<typeof AuthStoreModel> {}
export interface AuthStoreSnapshotIn extends SnapshotIn<typeof AuthStoreModel> {}
export const createAuthStoreDefaultModel = () => types.optional(AuthStoreModel, {})
