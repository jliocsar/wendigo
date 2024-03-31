import { Kind } from "graphql";
import { scalarType } from "nexus";

export const DateTimeScalar = scalarType({
  name: "DateTime",
  asNexusMethod: "date",
  description: "Date custom scalar type",
  parseValue(value) {
    // TODO: Validate with Zod?
    return new Date(value as string | number);
  },
  serialize(value) {
    return (value as Date).toISOString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  },
});
