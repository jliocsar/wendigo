import kyselyExtension from "prisma-extension-kysely";
import { PrismaClient } from "@prisma/client";
import {
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from "kysely";

export function createPrismaClient<DB>() {
  const client = new PrismaClient();
  return client.$extends(
    kyselyExtension({
      kysely: (driver) =>
        new Kysely<DB>({
          dialect: {
            // This is where the magic happens!
            createDriver: () => driver,
            // Don't forget to customize these to match your database!
            createAdapter: () => new PostgresAdapter(),
            createIntrospector: (db) => new PostgresIntrospector(db),
            createQueryCompiler: () => new PostgresQueryCompiler(),
          },
          plugins: [
            // Add your favorite plugins here!
          ],
        }),
    })
  );
}
