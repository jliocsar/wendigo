import { GraphQLString } from "graphql";

import { createSubgraphSchema } from "../../lib/wendigo-graphql";
import type { context } from "./context";

export const schema = createSubgraphSchema<typeof context>({
  query: {
    hello: {
      type: GraphQLString,
      resolve: (a, b, c) => c.shishi,
    },
  },
});
