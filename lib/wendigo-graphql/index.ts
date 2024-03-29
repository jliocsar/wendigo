import type { ContextThunk } from "@apollo/server";
import {
  GraphQLObjectType,
  GraphQLSchema,
  type GraphQLFieldConfig,
  type ThunkObjMap,
} from "graphql";

type TSchemaOptions<TContext extends ContextThunk, TArgs = any> = {
  query?: ThunkObjMap<
    GraphQLFieldConfig<unknown, Awaited<ReturnType<TContext>>, TArgs>
  >;
  mutation?: ThunkObjMap<
    GraphQLFieldConfig<unknown, Awaited<ReturnType<TContext>>, TArgs>
  >;
};

export function createSubgraphSchema<
  TContext extends ContextThunk,
  TArgs = unknown
>(options: TSchemaOptions<TContext, TArgs>) {
  return new GraphQLSchema({
    ...(options.query && {
      query: new GraphQLObjectType({
        name: "RootQueryType",
        fields: options.query,
      }),
    }),
    ...(options.mutation && {
      mutation: new GraphQLObjectType({
        name: "RootMutationType",
        fields: options.mutation,
      }),
    }),
  });
}
