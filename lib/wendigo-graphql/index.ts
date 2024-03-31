import * as path from "node:path";
import { Glob } from "bun";

import { makeSchema as makeNexusSchema } from "nexus";
import type { GraphQLSchemaExtensions } from "graphql";
import type { NexusFeaturesInput, NexusPlugin } from "nexus/dist/core";
import type { ContextThunk } from "@apollo/server";
import * as scalar from "./scalar";

export type GraphQLContext<Context extends ContextThunk> = Awaited<
  ReturnType<Context>
>;

type TMakeSchemaOptions<
  TOutput extends string = string,
  TTypesRoot extends string = string
> = {
  typesRoot: TTypesRoot;
  output: TOutput;
  extensions?: GraphQLSchemaExtensions;
  features?: NexusFeaturesInput;
  plugins?: NexusPlugin[];
};

export async function makeSchema<TOptions extends TMakeSchemaOptions>(
  options: TOptions
) {
  const { output, typesRoot } = options;
  const glob = new Glob("**/*/graphql/**/*-{mutation,query,type}.ts");
  const files = Array.from(glob.scanSync({ cwd: typesRoot }));
  const types: Record<string, any> = [];

  for (const file of files) {
    const absFilePath = path.resolve(typesRoot, file);
    const module = await import(absFilePath);
    const values = Object.values(module);
    for (const value of values) {
      types.push(value);
    }
  }

  const scalars = Object.values(scalar);
  for (const scalar of scalars) {
    types.push(scalar);
  }

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
