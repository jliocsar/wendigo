import { ArgsType, Field, ID, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field((type) => ID)
  id!: string;

  @Field()
  firstName!: string;

  @Field({ nullable: true })
  lastName?: string;
}

@InputType()
export class NewUserInput {
  @Field()
  firstName!: string;

  @Field({ nullable: true })
  lastName?: string;
}

@ArgsType()
export class UserArgs {
  @Field((type) => Int)
  skip: number = 0;

  @Field((type) => Int)
  take: number = 25;
}
