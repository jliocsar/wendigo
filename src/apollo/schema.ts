import { GraphQLString } from "graphql";

import { createSubgraphSchema } from "../../lib/wendigo-graphql";
import type { TContext } from "./context";

export const schema = createSubgraphSchema<TContext>({
  query: {
    hello: {
      type: GraphQLString,
      args: {
        name: { type: GraphQLString },
      },
      resolve: (parent, args, ctx) => ctx.shishi,
    },
  },
  mutation: {
    hello: {
      type: GraphQLString,
      args: {
        name: { type: GraphQLString },
      },
      resolve: (parent, args, ctx) => `Hello, ${args.name}!`,
    },
  },
});
