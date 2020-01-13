import { Resolvers } from "~/@types/Graphql"
import { CounterMutation, CounterQuery } from "./Counter"

export const resolvers: Resolvers = {
  Query: {
    ...CounterQuery
  },
  Mutation: {
    ...CounterMutation
  }
}
