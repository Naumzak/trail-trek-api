import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserGameOutput {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  gameId: string;
}
