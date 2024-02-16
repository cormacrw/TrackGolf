import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { UserItem, UserModel } from './UserStore'
import { api } from 'app/services/api/api'
import { StatsModel, responseToStatsModel } from './StatsModel'
import { FilterStoreModel, createFilterStoreDefaultModel } from './FilterStore'
import { MatchModel } from './MatchStore'
/**
 * Model description here for TypeScript hints.
 */
export const SocialStoreModel = types
  .model("SocialStore")
  .props({
    users: types.array(UserModel),
    followingUsers: types.array(UserModel),
    currentUser: types.maybe(types.reference(UserModel, {
      // given an identifier, find the user
      get(identifier, parent) {
        return [...parent?.users, ...parent?.followingUsers].find((u: UserItem) => u.id === identifier) || null
      },
      // given a user, produce the identifier that should be stored
      set(value) {
          return value.id
      }
    })),
    currentUserStats: types.maybe(StatsModel),
    currentUserRecentMatches: types.array(MatchModel),
    filters: FilterStoreModel
  })
  .actions(withSetPropAction)
  .views((self) => ({
    isFollowingUser (userId: string) {
      return self.followingUsers.findIndex(u => u.id === userId) > -1
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    clearUsers () {
      self.setProp('users', [])
    },
    async search(searchTerm: string) {
      const res = await api.user().findByUsername(searchTerm)

      self.setProp('users', (res?.users || []) as any)
    },
    setCurrentUser (user: UserItem) {
      self.setProp('currentUser', user.id)
    },
    async fetchStats (userId: string) {
      try {
        const response = await api.user().fetchStats(userId, self.filters.from, self.filters.to, self.filters.type)
        self.setProp('currentUserStats', responseToStatsModel(response))
      } catch (error) {
        console.log(error)
      }
    },
    async fetchRecentMatches (userId: string) {
      const matches = await api.user().fetchMatches(userId, 0, 5)
      self.setProp('currentUserRecentMatches', matches?.matches as any)
    },
    async fetchFollowingUsers (userId: string) {
      const response = await api.user().findUserFollowing(userId)
      const users = response?.following.map(f => f.followedUser) || []
      self.setProp('followingUsers', users)
    },
    async followUser (userId: string) {

    },
    async unfollowUser (userId: string) {
      
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface SocialStore extends Instance<typeof SocialStoreModel> {}
export interface SocialStoreSnapshotOut extends SnapshotOut<typeof SocialStoreModel> {}
export interface SocialStoreSnapshotIn extends SnapshotIn<typeof SocialStoreModel> {}
export const createSocialStoreDefaultModel = () => ({
  users: [],
  filters: createFilterStoreDefaultModel(),
})
