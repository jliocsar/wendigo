import { inputObjectType, intArg, nonNull, queryField, queryType } from "nexus";

export const usersQuery = queryField((t) => {
  t.nonNull.list.nonNull.field("users", {
    type: "User",
    resolve(_, __, ctx) {
      return ctx.prisma.user.findMany();
    },
  });
});

export const userQueryField = queryField((t) => {
  t.nullable.field("user", {
    type: "User",
    args: {
      id: nonNull(intArg()),
    },
    resolve(_, { id }, ctx) {
      return ctx.prisma.user.findUnique({
        where: { id: id.toString() },
      });
    },
  });
});

export const userCreateInput = inputObjectType({
  name: "UserCreateInput",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("email");
  },
});
