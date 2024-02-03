/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import {
  ApisauceInstance,
  create,
} from "apisauce"
import Config from "../../config"
import type {
  ApiConfig,
} from "./api.types"
import MatchAPI from './controllers/match/matchApi'
import UserAPI from './controllers/user/userApi'
import AuthAPI from './controllers/auth/authApi'
import { fetchAuthSession } from 'aws-amplify/auth'

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig
  matchApi: MatchAPI
  userApi: UserAPI
  authApi: AuthAPI

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },

    })

    this.userApi = new UserAPI(this)
    this.matchApi = new MatchAPI(this)
    this.authApi = new AuthAPI(this)
  }

  async setToken () {
    try {
      const session = await fetchAuthSession()
      if (session.tokens?.idToken) {
        this.apisauce.setHeader('Authorization', `Bearer ${session.tokens.idToken}`)
      } else {
        throw new Error()
      }
    } catch (error) {
      
    }
  }

  match () {
    return this.matchApi
  }

  auth () {
    return this.authApi
  }

  user () {
    return this.userApi
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
