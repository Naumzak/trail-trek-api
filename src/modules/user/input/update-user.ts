import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  @IsUUID()
  readonly id: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @MaxLength(40)
  @MinLength(4)
  @IsNotEmpty()
  readonly name: string;
}
