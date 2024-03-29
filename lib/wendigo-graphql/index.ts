import type { ContextThunk } from "@apollo/server";
import {
  GraphQLObjectType,
  GraphQLSchema,
  type GraphQLFieldConfig,
  type ThunkObjMap,
} from "graphql";

type TOperation<TContext extends ContextThunk> = ThunkObjMap<
  GraphQLFieldConfig<any, Awaited<ReturnType<TContext>>, any>
>;
type TSchemaOptions<TContext extends ContextThunk> = {
  query?: TOperation<TContext>;
  mutation?: TOperation<TContext>;
};

// type TSchemaOptions<TContext extends ContextThunk> = {
//   query?: ThunkObjMap<
//     GraphQLFieldConfig<any, Awaited<ReturnType<TContext>>, any>
//   >;
//   mutation?: ThunkObjMap<
//     GraphQLFieldConfig<any, Awaited<ReturnType<TContext>>, any>
//   >;
// };

export function createSubgraphSchema<
  TContext extends ContextThunk,
  TOptions extends TSchemaOptions<TContext> = TSchemaOptions<TContext>
>(options: TOptions) {
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
