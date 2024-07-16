import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class DeleteUserInput {
  @Field(() => String)
  @IsUUID()
  readonly id: string;
}
