import { ApiResponse } from 'apisauce'
import { Api } from '../../api'
import { SearchUsersResponse, SetUsernameResponse, UserMatchStatsResponse, UserMatchesResponse } from './userApi.types'

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

  async fetchMatches (userId: string, offset: number = 0, limit: number = 10): Promise<UserMatchesResponse | undefined> {
    try {
      await this.api.setToken()
      const response: ApiResponse<UserMatchesResponse> = await this.api.apisauce.get(`/user/${userId}/matches?offset=${offset}&limit=${limit}`)

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
}