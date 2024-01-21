import { ApolloServer, gql } from 'apollo-server-lambda'
import schema from '../../../schema/secure'
import types from '../../../schema/secure/gql/schema.gql'

const server = new ApolloServer({
  typeDefs: types,
  resolvers: schema,
});

export const handle = server.createHandler()

