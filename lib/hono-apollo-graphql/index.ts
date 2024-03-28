import "reflect-metadata";
import { Hono, type HonoRequest } from "hono";
import { cors } from "hono/cors";
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
type GraphQLModule<Context extends BaseContext> = ServerModule &
  ContextModule<Context>;

type ApolloOptions<
  Path extends string = "/graphql",
  Context extends BaseContext = BaseContext
> = {
  app?: Hono;
  path?: Path;
  root: Promise<GraphQLModule<Context>>;
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
  let app = options.app;

  if (!app) {
    app = new Hono();
    app.use(cors());
  }

  const path = options.path ?? "/graphql";
  let context: ContextThunk<Context>;
  let gqlModule: GraphQLModule<Context>;
  let server: ApolloServer;

  app.on(["GET", "POST"], path, async (ctx) => {
    const body = await parseBody(ctx.req);

    // lazy loads the server on the first request
    // TODO: this might be skippable if a header is present
    if (!gqlModule) {
      gqlModule = await options.root;
      server = gqlModule.server;
      server.assertStarted("Server failed to start");
      context = gqlModule.context ?? (async () => ({}));
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
