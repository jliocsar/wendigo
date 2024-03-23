import type { Nullable } from "../types";

class UserService {
  private readonly users = [
    {
      id: 1,
      name: "Alice",
      email: "alice@email.com",
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@email.com",
    },
  ];

  public greet(id: Nullable<string | number>) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new Error("User not found");
    }
    return `Hello, ${user.name || "World"}!`;
  }
}

export const userService = new UserService();
