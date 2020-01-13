import { ApolloServer } from "apollo-server"
import { typeDefs } from "~/@types/Schema"
import { contexts } from "~/contexts"
import { resolvers } from "~/resolvers"

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ ...contexts })
})

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀 Server ready at ${url}`)
})
