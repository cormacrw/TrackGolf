/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import Config from "../../config"
import type {
  ApiConfig,
} from "./api.types"
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client' 

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
export class PublicAPI {
  clientInst: ApolloClient<NormalizedCacheObject>
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.clientInst = new ApolloClient({
      uri: config.url + '/graphql',
      cache: new InMemoryCache()
    })
  }

}

// Singleton instance of the API for convenience
export const api = new PublicAPI()
