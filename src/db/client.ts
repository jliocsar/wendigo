import { createPrismaClient } from "../../lib/prisma-client";
import type { DB } from "./generated/types";

export const prisma = createPrismaClient<DB>();
