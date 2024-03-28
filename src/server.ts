import { ApolloServer } from "@apollo/server";

export const server = new ApolloServer({
  typeDefs: `
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => "Hello World",
    },
  },
  introspection: true,
});

server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();
