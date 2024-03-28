import { apollo } from "../lib/hono-apollo-graphql";

const app = await apollo({
  root: import("./graphql"),
});

export default app;
