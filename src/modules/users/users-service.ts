import type { Nullable } from "../../../lib/types";
import { prisma } from "../../db/client";

import type { TCreateUserInput } from "./users-types";

class UserService {
  async findById(id: string) {
    const query = prisma.$kysely
      .selectFrom("User")
      .selectAll()
      .where("id", "=", id);
    return query.execute();
  }

  async findAll({
    skip,
    take,
  }: {
    skip?: Nullable<number>;
    take?: Nullable<number>;
  }) {
    const query = prisma.$kysely
      .selectFrom("User")
      .selectAll()
      .orderBy("id", "asc");
    if (skip && take) {
      query.limit(take).offset(skip);
    }
    if (skip) {
      query.offset(skip);
    }
    return query.execute();
  }

  async create(data?: Nullable<TCreateUserInput>) {
    if (!data) {
      throw new Error("Invalid data");
    }
    const [user] = await prisma.$kysely
      .insertInto("User")
      .values(data)
      .returning(["id"])
      .execute();
    return user;
  }
}

export const userService = new UserService();
