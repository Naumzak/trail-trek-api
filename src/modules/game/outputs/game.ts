import { Field, ObjectType } from '@nestjs/graphql';
import { UserGameOutput } from './user-game';

@ObjectType()
export class GameOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  connectionString: string;

  @Field(() => [UserGameOutput])
  userGames: any;
}
