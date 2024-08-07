import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UserConnectedToGame {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly gameId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly userId: string;
}
