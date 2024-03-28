import { Hono } from "hono";
import { cors } from "hono/cors";

import { createApolloHandler } from "../lib/hono-apollo-graphql";

const app = new Hono();
const apollo = await createApolloHandler({
  server: import("./server"),
  context: async () => {
    return {
      shishi: "coco",
    };
  },
});

app.use("/*", cors());

app.mount("/graphql", apollo);

export default app;
