import {
  Resolver,
  Query,
  Arg,
  Args,
  Mutation,
  Authorized,
  Ctx,
} from "type-graphql";
import { NewUserInput, User, UserArgs } from "./types/user";
import type { UserService } from "../users-service";

class UserNotFoundError extends Error {
  constructor(id: string) {
    super(`User with id ${id} not found`);
  }
}

@Resolver(User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => User)
  async user(@Arg("id") id: string) {
    const user = await this.userService.findById(id);
    if (user === undefined) {
      throw new UserNotFoundError(id);
    }
    return user;
  }

  @Query((returns) => [User])
  recipes(@Args() { skip, take }: UserArgs) {
    return this.userService.findAll({ skip, take });
  }

  @Mutation((returns) => User)
  @Authorized()
  addUser(@Arg("newUserData") newUserData: NewUserInput): Promise<User> {
    return this.userService.addNew(newUserData);
  }

  // @Mutation((returns) => Boolean)
  // @Authorized(Roles.Admin)
  // async removeRecipe(@Arg("id") id: string) {
  //   try {
  //     await this.userService.removeById(id);
  //     return true;
  //   } catch {
  //     return false;
  //   }
  // }
}
