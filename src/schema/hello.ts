import { builder } from "../builder";
import { helloService } from "../services";

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (parent, { name }) => {
        return helloService.greet(name);
      },
    }),
  }),
});
