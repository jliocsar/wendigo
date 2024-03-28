import { cors } from "hono/cors";

import { apollo } from "../lib/hono-apollo-graphql";

const app = await apollo({
  server: import("./server"),
  context: import("./context"),
});

app.use("/*", cors());

export default app;
