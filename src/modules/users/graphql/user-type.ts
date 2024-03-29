import { User as UserModel } from "nexus-prisma";
import { inputObjectType, objectType } from "nexus";

export const User = objectType({
  name: UserModel.$name,
  description: UserModel.$description,
  definition(t) {
    t.field(UserModel.id);
  },
});

export const CreateUserInput = inputObjectType({
  name: "CreateUserInput",
  definition(t) {
    t.nonNull.string("id");
  },
});
