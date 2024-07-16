import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GameOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  connectionString: string;
}
