import { gql } from "apollo-server"

export const typeDefs = gql`
  type Counter {
    id: ID!
    count: Int!
  }

  type Query {
    counter(id: ID!): Counter
  }

  type Mutation {
    counter(id: ID!, count: Int!): Counter
  }
`
