import { Hono, type HonoRequest } from "hono";
import { cors } from "hono/cors";
import {
  ApolloServer,
  HeaderMap,
  type ContextThunk,
  type HTTPGraphQLRequest,
  type BaseContext,
} from "@apollo/server";
import type { GraphQLSchema } from "graphql";

type TServerModule = {
  server: ApolloServer;
};
type TContextModule<TContext extends BaseContext> = {
  ctx: ContextThunk<TContext>;
};
type TSchemaModule = {
  schema: GraphQLSchema;
};
type TGraphQLModule<TContext extends BaseContext> = TServerModule &
  TSchemaModule &
  TContextModule<TContext>;

type TApolloOptions<
  TPath extends string = "/graphql",
  TContext extends BaseContext = BaseContext
> = {
  app?: Hono;
  path?: TPath;
  root: Promise<TGraphQLModule<TContext>>;
};

async function parseBody(req: HonoRequest) {
  if (req.method !== "POST") {
    return undefined;
  }

  const body = await req.json();
  return body;
}

export async function apollo<
  TPath extends string = "/graphql",
  TContext extends BaseContext = BaseContext
>(options: TApolloOptions<TPath, TContext>) {
  let app = options.app;

  if (!app) {
    app = new Hono();
    app.use(cors());
  }

  const path = options.path ?? "/graphql";
  let context: ContextThunk<TContext>;
  let gqlModule: TGraphQLModule<TContext>;
  let server: ApolloServer;

  app.on(["GET", "POST"], path, async (ctx) => {
    const body = await parseBody(ctx.req);

    // lazy loads the server on the first request
    // TODO: this might be skippable if a header is present
    if (!gqlModule) {
      gqlModule = await options.root;
      server = gqlModule.server;
      server.assertStarted("Server failed to start");
      context = gqlModule.ctx ?? (async () => ({}));
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
