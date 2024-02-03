import { ApisauceInstance } from 'apisauce'
import { Api } from '../../api'

export default class UserAPI {
  api: Api

  constructor (apiInst: Api) {
    this.api = apiInst
  }
}