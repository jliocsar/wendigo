import type { GraphQLContext } from "../../lib/wendigo-graphql";

export const ctx = async () => {
  return {};
};

export type TContext = GraphQLContext<typeof ctx>;
