import { Hono } from "hono";
import {
  ApolloServer,
  HeaderMap,
  type ContextThunk,
  type HTTPGraphQLRequest,
  type BaseContext,
} from "@apollo/server";

type ServerModule = {
  server: ApolloServer;
};
type ContextModule<Context extends BaseContext> = {
  context: ContextThunk<Context>;
};

type ApolloOptions<Context extends BaseContext> = {
  server: Promise<ServerModule>;
  context?: ContextThunk<Context> | Promise<ContextModule<Context>>;
};

export async function createApolloHandler<Context extends BaseContext>(
  options: ApolloOptions<Context>
) {
  const app = new Hono();
  const context = options.context
    ? options.context instanceof Promise
      ? (await options.context).context
      : options.context
    : async () => ({});
  let serverModule: ServerModule;
  let server: ApolloServer;

  app.on(["GET", "POST"], "/", async (ctx) => {
    // lazy loads the server on the first request
    // TODO: this might be skippable if a header is present
    if (!serverModule) {
      serverModule = await options.server;
      server = serverModule.server;
    }

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
      search: new URL(ctx.req.url).search ?? "",
      body: await ctx.req.parseBody(),
    };
    server.assertStarted("Server failed to start");
    const res = await server.executeHTTPGraphQLRequest({
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

  return app.fetch;
}
