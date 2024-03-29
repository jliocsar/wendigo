import { makeSchema } from "../../lib/wendigo-graphql";
import { User, UsersQuery } from "../modules/users/graphql";

export const schema = makeSchema({
  output: import.meta.dir,
  types: [User, UsersQuery],
});
