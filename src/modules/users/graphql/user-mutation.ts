import { mutationField } from "nexus";

export const CreateUserMutation = mutationField((t) => {
  t.nonNull.field("createUser", {
    type: "User",
    args: {
      // data: "UserCreateInput",
    },
    resolve(_, { data }, ctx) {
      return ctx.prisma.user.create({
        data,
      });
    },
  });
});
