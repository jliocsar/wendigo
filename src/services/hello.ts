import type { Nullable } from "../types";

class HelloService {
  public greet(name: Nullable<string>) {
    return `Hello, ${name || "World"}!`;
  }
}

export const helloService = new HelloService();
