import { Hono, type HonoRequest } from "hono";
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

type ApolloOptions<
  Path extends string = "/graphql",
  Context extends BaseContext = BaseContext
> = {
  server: Promise<ServerModule>;
  app?: Hono;
  path?: Path;
  context?: ContextThunk<Context> | Promise<ContextModule<Context>>;
};

async function parseBody(req: HonoRequest) {
  if (req.method !== "POST") {
    return undefined;
  }

  const body = await req.json();
  return body;
}

export async function apollo<
  Path extends string = "/graphql",
  Context extends BaseContext = BaseContext
>(options: ApolloOptions<Path, Context>) {
  const app = options.app ?? new Hono();
  const path = options.path ?? "/graphql";
  const context = options.context
    ? options.context instanceof Promise
      ? (await options.context).context
      : options.context
    : async () => ({});
  let serverModule: ServerModule;
  let server: ApolloServer;

  app.on(["GET", "POST"], path, async (ctx) => {
    const body = await parseBody(ctx.req);

    // lazy loads the server on the first request
    // TODO: this might be skippable if a header is present
    if (!serverModule) {
      serverModule = await options.server;
      server = serverModule.server;
      server.assertStarted("Server failed to start");
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
      method: ctx.req.method,
      search: new URL(ctx.req.url).search ?? "",
      body,
    };
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

  return app;
}
