import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DisconnectFromGameOutput {
  @Field(() => String)
  userId: string;
}
