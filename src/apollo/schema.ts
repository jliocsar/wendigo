import * as path from "node:path";

import { makeSchema } from "../../lib/wendigo-graphql";

export const schema = await makeSchema({
  typesRoot: path.resolve(import.meta.dir, "..", "modules"),
  output: import.meta.dir,
});
