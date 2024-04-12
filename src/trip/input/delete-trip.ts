import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class DeleteTripInput {
  @Field(() => String)
  @IsString()
  readonly id: string;
}
