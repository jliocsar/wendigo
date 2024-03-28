# 🧣 wendigo

[![Hono][hono-badge]][hono-url]
[![Apollo GraphQL][apollo-badge]][apollo-url]
[![Prisma][prisma-badge]][prisma-url]
[![PostgreSQL][postgres-badge]][postgres-url]
[![Zod][zod-badge]][zod-url]

This repository is a boilerplate for:

- [Hono][hono-url]
- [GraphQL (w/ Apollo)][apollo-url]
- [PostgreSQL][postgres-url]
- [Prisma][prisma-url]
- [Zod][zod-url]

## Hono + GraphQL Integration

- `lib/hono-apollo-graphql` exports the `apollo()` helper to bootstrap a [Hono](https://www.npmjs.com/package/hono) app, which then serves a [Apollo Server](https://www.npmjs.com/package/@apollo/server) under the `"/graphql"` path.
- The `apollo()` helper receives a `root` key, which is an `import()` call to any folder that has an `index.ts` exporting:
  - `server` -- The instance of the `new ApolloServer(...)`;
  - `context` -- The context function for the Apollo server (i.e. the `ContextThunk`).
- You can also provide your own Hono app on the `apollo()` call.
  - The default app already uses the following middlewares:
    - `cors()`

## Database

WIP

## Validations

WIP

[hono-badge]: https://img.shields.io/badge/hono-161618?style=flat-square&logo=hono&logoColor=E36002
[hono-url]: https://hono.dev/top
[apollo-badge]: https://img.shields.io/badge/apollo-311C87?style=flat-square&logo=apollo-graphql&logoColor=ffffff
[apollo-url]: https://www.apollographql.com/
[postgres-badge]: https://img.shields.io/badge/postgres-4169E1?style=flat-square&logo=postgresql&logoColor=ffffff
[postgres-url]: https://www.postgresql.org/
[prisma-badge]: https://img.shields.io/badge/prisma-2D3748?style=flat-square&logo=prisma&logoColor=ffffff
[prisma-url]: https://www.prisma.io/
[zod-badge]: https://img.shields.io/badge/zod-3E67B1?style=flat-square&logo=zod&logoColor=ffffff
[zod-url]: https://zod.dev/
