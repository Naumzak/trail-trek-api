import { Field, ObjectType } from '@nestjs/graphql';
import { UserOutput } from '../../user/outputs/user';
import { GameOutput } from './game';

@ObjectType()
export class UserGameOutput {
  @Field(() => UserOutput)
  user: UserOutput;

  @Field(() => GameOutput)
  game: GameOutput;
}
