import { ApiResponse } from 'apisauce'
import { Api } from '../../api'
import { FindUserFollowingResponse, FollowUserResponse, SearchUsersResponse, SetUsernameResponse, UnfollowUserResponse, UserMatchStatsResponse, UserMatchesResponse } from './userApi.types'

export default class UserAPI {
  api: Api

  constructor (apiInst: Api) {
    this.api = apiInst
  }

  async setUsername (userId: string, username: string): Promise<SetUsernameResponse | undefined> {
    try {
      await this.api.setToken()
      const response: ApiResponse<SetUsernameResponse> = await this.api.apisauce.put(`/user/${userId}/username`, { username })

      return response.data || undefined
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  async fetchStats (userId: string, from: string, to: string, type: string): Promise<UserMatchStatsResponse | undefined> {
    try {
      await this.api.setToken()

      let url = `/user/${userId}/stats?from=${from}&to=${to}`

      if (type !== 'All') {
        url += `&type=${encodeURI(type)}`
      }

      console.log(url)
      const response: ApiResponse<UserMatchStatsResponse> = await this.api.apisauce.get(url, {}, {
        
      })

      if (!response.ok) {
        console.log(response.originalError)
      }

      return response.data || undefined
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  async fetchMatches (userId: string, offset: number = 0, limit: number = 10, from: string, to: string, type: string): Promise<UserMatchesResponse | undefined> {
    try {
      await this.api.setToken()

      let url = `/user/${userId}/matches?offset=${offset}&limit=${limit}&from=${from}&to=${to}`

      if (type !== 'All') {
        url += `&type=${encodeURI(type)}`
      }

      console.log(url)

      const response: ApiResponse<UserMatchesResponse> = await this.api.apisauce.get(url)

      if (!response.ok) {
        console.log(response.originalError)
      }

      return response.data || undefined
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  async findByUsername (username: string): Promise<SearchUsersResponse | undefined> {
    try {
      await this.api.setToken()
      const response: ApiResponse<SearchUsersResponse> = await this.api.apisauce.get(`/users/search?query=${encodeURI(username)}`)

      if (!response.ok) {
        console.log(response.originalError)
      }

      return response.data || undefined
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  async findUserFollowing (userId: string): Promise<FindUserFollowingResponse | undefined> {
    try {
      await this.api.setToken()
      const response: ApiResponse<FindUserFollowingResponse> = await this.api.apisauce.get(`/user/${userId}/following`)

      if (!response.ok) {
        console.log(response.originalError)
      }

      return response.data || undefined
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  async followUser (userId: string, userToFollowId: string): Promise<FollowUserResponse | undefined> {
    try {
      await this.api.setToken()
      const response: ApiResponse<FollowUserResponse> = await this.api.apisauce.post(`/user/${userToFollowId}/follow`, {
        userId
      })

      if (!response.ok) {
        console.log(response.originalError)
      }

      console.log(JSON.stringify(response, null, 2))

      return response.data || undefined
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  async unfollowUser (userId: string, userToUnfollowId: string): Promise<UnfollowUserResponse | undefined> {
    try {
      await this.api.setToken()
      const response: ApiResponse<UnfollowUserResponse> = await this.api.apisauce.post(`/user/${userToUnfollowId}/unfollow`, {
        userId
      })

      console.log(JSON.stringify(response, null, 2))

      if (!response.ok) {
        console.log(response.originalError)
      }

      return response.data || undefined
    } catch (error) {
      console.log(error)
      return undefined
    }
  }
}