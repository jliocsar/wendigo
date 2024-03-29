import { ApolloServer } from "@apollo/server";

import { schema } from "./schema";

export const server = new ApolloServer({
  introspection: process.env.NODE_ENV === "development",
  schema,
});

server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();
