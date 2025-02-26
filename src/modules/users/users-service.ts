import type { Nullable } from "../../../lib/types";
import { prisma } from "../../db/client";

import type { TCreateUserInput } from "./users-types";

class UserService {
  async findById(id: string) {
    const query = prisma.$kysely
      .selectFrom("User")
      .selectAll()
      .where("id", "=", id);
    const [user] = await query.execute();
    return user;
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

  async update(id: string, data: Nullable<TCreateUserInput>) {
    if (!data) {
      throw new Error("Invalid data");
    }
    const [user] = await prisma.$kysely
      .updateTable("User")
      .set(data)
      .where("id", "=", id)
      .returningAll()
      .execute();
    return user;
  }

  async create(data?: Nullable<TCreateUserInput>) {
    if (!data) {
      throw new Error("Invalid data");
    }
    const [user] = await prisma.$kysely
      .insertInto("User")
      .values(data)
      .returningAll()
      .execute();
    return user;
  }
}

export const userService = new UserService();
