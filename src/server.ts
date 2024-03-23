import { Elysia } from "elysia";
import { apollo } from "@elysiajs/apollo";
import schema from "./schema";

export const app = new Elysia().use(apollo({ schema }));
