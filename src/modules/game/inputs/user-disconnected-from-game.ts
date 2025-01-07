import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UserDisconnectedFromGameInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly gameId: string;
}
