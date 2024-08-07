import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ConnectToGameOutput {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  characterId: string;
}
