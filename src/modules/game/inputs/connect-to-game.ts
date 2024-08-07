import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ConnectToGameInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly gameId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly characterId: string;
}
