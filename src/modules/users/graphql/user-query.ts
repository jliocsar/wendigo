import { nonNull, queryField, stringArg } from "nexus";

import { userService } from "../users-service";

export const usersQuery = queryField((t) => {
  t.nonNull.list.nonNull.field("users", {
    type: "User",
    args: {
      skip: "Int",
      take: "Int",
    },
    resolve(_, { skip, take }, ctx) {
      return userService.findAll({ skip, take });
    },
  });
});

export const userQueryField = queryField((t) => {
  t.nullable.field("user", {
    type: "User",
    args: {
      id: nonNull(stringArg()),
    },
    resolve(_, { id }, ctx) {
      return userService.findById(id);
    },
  });
});
