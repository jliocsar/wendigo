import { User as UserModel } from "nexus-prisma";
import { inputObjectType, objectType } from "nexus";

export const User = objectType({
  name: UserModel.$name,
  description: UserModel.$description,
  definition(t) {
    t.field(UserModel.id);
    t.field(UserModel.firstName);
    t.field(UserModel.lastName);
    t.field(UserModel.createdAt);
    t.field(UserModel.updatedAt);
  },
});

export const CreateUserInput = inputObjectType({
  name: "CreateUserInput",
  definition(t) {
    t.nonNull.field(UserModel.id);
    t.nonNull.field(UserModel.firstName);
    t.field(UserModel.lastName);
  },
});
