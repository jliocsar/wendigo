import { apollo } from "../lib/hono-apollo-graphql";

const app = await apollo({
  root: import("./apollo"),
});

export default app;
