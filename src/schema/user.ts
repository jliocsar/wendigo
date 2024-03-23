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
    hello: t.string({
      args: {
        id: t.arg.id(),
      },
      resolve: (parent, { id }) => {
        return userService.greet(id);
      },
    }),
  }),
});
