import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateCharacterInput {
  @Field(() => String)
  @IsString()
  @MaxLength(40)
  @MinLength(4)
  @IsNotEmpty()
  readonly name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly classId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly raceId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly subraceId: string;
}
