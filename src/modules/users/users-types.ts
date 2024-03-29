import type { FieldType } from "nexus";

export type TCreateUserInput = FieldType<"Mutation", "createUser">;
export type TUser = NonNullable<FieldType<"Query", "user">>;
