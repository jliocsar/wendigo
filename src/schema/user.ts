import { builder } from "../builder";
import { userService } from "../services";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    name: t.exposeString("name", {
      nullable: true,
    }),
  }),
});

builder.queryType({
  fields: (t) => ({
    findUserById: t.prismaField({
      type: "User",
      args: {
        id: t.arg.id(),
      },
      resolve: (query, root, args, ctx, info) => {
        return userService.greet(args.id);
      },
    }),
  }),
});
