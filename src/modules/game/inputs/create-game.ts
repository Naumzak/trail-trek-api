import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateGameInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
