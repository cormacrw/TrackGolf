import { ApisauceInstance } from 'apisauce'
import { Api } from '../../api'

export default class MatchAPI {
  api: Api

  constructor (apiInst: Api) {
    this.api = apiInst
  }
}