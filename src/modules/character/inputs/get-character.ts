import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class GetCharacterInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly characterId: string;
}
