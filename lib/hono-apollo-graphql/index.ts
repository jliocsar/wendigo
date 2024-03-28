import { Hono } from "hono";
import {
  ApolloServer,
  HeaderMap,
  type ContextThunk,
  type HTTPGraphQLRequest,
  type BaseContext,
} from "@apollo/server";
import { server } from "../../src/server";

type ApolloOptions<Context extends BaseContext> = {
  server: ApolloServer;
  context?: ContextThunk<Context>;
};

export function apollo<Context extends BaseContext>(
  options: ApolloOptions<Context>
) {
  const app = new Hono();
  const context = options.context ?? (async () => ({}));

  app.on(["GET", "POST"], "/", async (ctx) => {
    const graphQLRequestHeaders = new HeaderMap();

    for (const [key, value] of Object.entries(ctx.req.header())) {
      if (value !== undefined) {
        graphQLRequestHeaders.set(
          key,
          Array.isArray(value) ? value.join(", ") : value
        );
      }
    }

    const httpGraphQLRequest: HTTPGraphQLRequest = {
      headers: graphQLRequestHeaders,
      method: ctx.req.method.toUpperCase(),
      search: "",
      body: await ctx.req.parseBody(),
    };
    const res = await options.server.executeHTTPGraphQLRequest({
      httpGraphQLRequest,
      context,
    });

    const responseHeaders: Record<string, string> = {};

    for (const [key, value] of res.headers) {
      responseHeaders[key] = value;
    }

    if (!("string" in res.body)) {
      return new Response("Something went wrong", {
        status: 500,
      });
    }

    return new Response(res.body.string, {
      status: res.status,
      headers: responseHeaders,
    });
  });

  return {
    startApolloServer: server.start.bind(server),
    graphql: app.fetch.bind(app),
  };
}
