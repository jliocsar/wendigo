import { User as UserModel } from "nexus-prisma";
import { objectType } from "nexus";

export const User = objectType({
  name: UserModel.$name,
  description: UserModel.$description,
  definition(t) {
    t.field(UserModel.id);
  },
});
