import { apollo } from "../lib/hono-apollo-graphql";
import { setup } from "./setup";

const app = await apollo({
  root: import("./apollo"),
});

// Run any setup code for stuff like database connections, secrets loading etc.
await setup();

export default app;
