import type { User } from "../../db/generated/types";

export type TUser = User;
export type TCreateUserInput = Omit<Required<TUser>, "createdAt" | "updatedAt">;
export type TUpdateUserInput = Omit<Partial<TCreateUserInput>, "id">;
