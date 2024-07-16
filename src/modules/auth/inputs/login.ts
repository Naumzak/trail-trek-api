import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsString()
  @MaxLength(80)
  @MinLength(5)
  @IsNotEmpty()
  readonly email: string;

  @Field(() => String)
  @IsString()
  @MaxLength(40)
  @MinLength(8)
  @IsNotEmpty()
  readonly password: string;
}
