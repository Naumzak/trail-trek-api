import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UserConnectedToGameInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly gameId: string;
}
