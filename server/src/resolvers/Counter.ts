import { MutationResolvers, QueryResolvers } from "~/@types/Graphql"

export const CounterQuery: QueryResolvers = {
  counter: (_, args, context) => {
    const { counters } = context
    return counters.find(counter => counter.id === args.id)
  }
}

export const CounterMutation: MutationResolvers = {
  counter: (_, args, context) => {
    const record = context.counters.find(counter => counter.id === args.id)
    if (record) {
      record.count = args.count
    }
    return record
  }
}
