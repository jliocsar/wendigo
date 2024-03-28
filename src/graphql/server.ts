import { ApolloServer } from "@apollo/server";

export const server = new ApolloServer({
  introspection: process.env.NODE_ENV === "development",
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
});

server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();
