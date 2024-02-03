import { ApiResponse, ApisauceInstance } from 'apisauce'
import { ApiLoginResponse } from './authApi.types'
import { Api } from '../../api'

export default class AuthAPI {
  api: Api

  constructor (apiInst: Api) {
    this.api = apiInst
  }

  async login () {
    try {
      await this.api.setToken()
      console.log('calling api!')
      const response: ApiResponse<ApiLoginResponse> = await this.api.apisauce.post('/login')
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}