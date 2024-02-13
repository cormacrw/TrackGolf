import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import User from 'app/services/api/models/user'
import { api } from 'app/services/api/api'
import { SetUsernameResponse } from 'app/services/api/controllers/user/userApi.types'

export const UserModel = types.model({
  email: types.string,
  createdAt: types.string,
  updatedAt: types.string,
  id: types.string,
  username: types.maybe(types.string)
})

export interface UserItem extends Instance<typeof UserModel> {}

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    user: UserModel
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setUser (user: User) {
      self.user = {
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        id: user.id
      }
    },
    async setUsername (username: string): Promise<SetUsernameResponse | undefined> {
      if (!self.user?.id) {
        return { success: false, message: 'INVALID_USER' }
      }
      const response = await api.user().setUsername(self.user.id, username)

      if (response?.success) {
        self.user.username = username
      }
      
      return response
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshotOut extends SnapshotOut<typeof UserStoreModel> {}
export interface UserStoreSnapshotIn extends SnapshotIn<typeof UserStoreModel> {}
export const createUserStoreDefaultModel = () => ({
  user: {
    id: '',
    email: '',
    createdAt: '',
    updatedAt: ''
  }
})
