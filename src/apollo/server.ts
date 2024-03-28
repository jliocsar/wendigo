import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";

import { resolvers } from "./resolvers";

export const schema = await buildSchema({
  resolvers,
});
export const server = new ApolloServer({
  introspection: process.env.NODE_ENV === "development",
  schema,
});

server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();
