import { queryType } from "nexus";

export const UsersQuery = queryType({
  definition(t) {
    t.nonNull.list.nonNull.field("users", {
      type: "User",
      resolve(_, __, ctx) {
        return ctx.prisma.user.findMany();
      },
    });
  },
});
