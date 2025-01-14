import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class AddUserToGameInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly connectionString: string;
}
