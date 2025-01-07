import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class GetCharactersByGameId {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly gameId: string;
}
