import { mutationField } from "nexus";

import { userService } from "../users-service";

export const createUserMutation = mutationField((t) => {
  t.nonNull.field("createUser", {
    type: "User",
    args: {
      data: "CreateUserInput",
    },
    resolve(_, { data }, ctx) {
      return userService.create(data);
      // return ctx.prisma.user.create({
      //   data,
      //   select: {
      //     id: true,
      //   },
      // });
    },
  });
});
