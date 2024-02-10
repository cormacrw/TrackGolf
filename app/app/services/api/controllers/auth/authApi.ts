import { ApiResponse, ApisauceInstance } from 'apisauce'
import { ApiLoginResponse } from './authApi.types'
import { Api } from '../../api'
import User from '../../models/user'

export default class AuthAPI {
  api: Api

  constructor (apiInst: Api) {
    this.api = apiInst
  }

  async login (): Promise<User | undefined> {
    try {
      await this.api.setToken()
      const response: ApiResponse<ApiLoginResponse> = await this.api.apisauce.post('/login')

      return response.data?.user
    } catch (error) {
      console.log(error)
      return undefined
    }
  }
}