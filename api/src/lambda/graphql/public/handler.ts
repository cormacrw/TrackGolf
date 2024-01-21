import { ApolloServer, gql } from 'apollo-server-lambda'
import schema from '../../../schema/public'
import types from '../../../schema/public/gql/schema.gql'

const server = new ApolloServer({
  typeDefs: types,
  resolvers: schema,
});

export const handle = server.createHandler()

