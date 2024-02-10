import { ApiResponse } from 'apisauce'
import { Api } from '../../api'
import { WizardModel } from 'app/models'
import { MatchCreateResponse } from './matchApi.types'

export default class MatchAPI {
  api: Api

  constructor (apiInst: Api) {
    this.api = apiInst
  }

  async create (match: WizardModel, userId: string) {
    try {
      await this.api.setToken()
      const response: ApiResponse<MatchCreateResponse> = await this.api.apisauce.post('/matches', {
        match: {
          userId,
          ...match
        }
      })

      console.log(response)

      return response.data?.match
    } catch (error) {
      console.log(error)
      return undefined
    }
  }
}