import { Hono } from "hono";

import { server } from "./server";
import { apollo } from "../lib/hono-apollo-graphql";

const app = new Hono();
const { graphql, startApolloServer } = apollo({
  server,
  context: async () => {
    return {
      shishi: "coco",
    };
  },
});

app.mount("/graphql", graphql);

await startApolloServer();

export default app;
