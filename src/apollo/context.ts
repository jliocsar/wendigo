import type { GraphQLContext } from "../../lib/wendigo-graphql";
import { prisma } from "../db/client";

export const ctx = async () => {
  return { prisma };
};

export type TContext = GraphQLContext<typeof ctx>;
