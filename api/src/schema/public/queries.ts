import { QueryResolvers } from './types/schema'
import pkg from '../../../package.json'

const queries: QueryResolvers = {
  readVersion () {
    return pkg.version
  }
}

export default queries