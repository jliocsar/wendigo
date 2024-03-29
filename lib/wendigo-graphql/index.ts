import * as path from "node:path";

import { makeSchema as makeNexusSchema } from "nexus";
import type { GraphQLSchemaExtensions } from "graphql";
import type { NexusFeaturesInput, NexusPlugin } from "nexus/dist/core";
import type { ContextThunk } from "@apollo/server";

export type GraphQLContext<Context extends ContextThunk> = Awaited<
  ReturnType<Context>
>;

type TMakeSchemaOptions<
  TOutput extends string = string,
  TTypes extends any[] = any[]
> = {
  types: TTypes;
  output: TOutput;
  extensions?: GraphQLSchemaExtensions;
  features?: NexusFeaturesInput;
  plugins?: NexusPlugin[];
};

export function makeSchema<TOptions extends TMakeSchemaOptions>(
  options: TOptions
) {
  const { output, types } = options;
  const schema = makeNexusSchema({
    types,
    extensions: options.extensions,
    features: options.features,
    plugins: options.plugins,
    contextType: {
      module: path.resolve(output, "context.ts"),
      export: "TContext",
    },
    outputs: {
      schema: path.resolve(output, "generated/schema.gen.graphql"),
      typegen: path.resolve(output, "generated/nexus-types.gen.ts"),
    },
  });

  return schema;
}
