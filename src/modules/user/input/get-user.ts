import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class GetUserInput {
  @Field(() => String)
  @IsUUID()
  readonly id: string;
}
