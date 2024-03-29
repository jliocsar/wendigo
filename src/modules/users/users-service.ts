import type { Nullable } from "../../../lib/types";
import type { TCreateUserInput } from "./users-types";

class UserService {
  private readonly users = [{ id: "1" }, { id: "2" }];

  async findById(id: string) {
    return this.users.find((user) => user.id === id) ?? null;
  }

  async findAll({
    skip,
    take,
  }: {
    skip?: Nullable<number>;
    take?: Nullable<number>;
  }) {
    if (skip && take) {
      return this.users.slice(skip, skip + take);
    }
    if (skip) {
      return this.users.slice(skip);
    }
    return this.users;
  }

  async create(data?: Nullable<TCreateUserInput>) {
    if (!data) {
      throw new Error("Invalid data");
    }
    this.users.push(data);
    return data;
  }
}

export const userService = new UserService();
