import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsUrl,
  IsNumber,
  IsDate,
} from 'class-validator';

@InputType()
export class CreateTripInput {
  @Field(() => String)
  @IsString()
  @MaxLength(100)
  @MinLength(5)
  @IsNotEmpty()
  readonly name: string;

  @Field(() => String)
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  readonly location: string;

  @Field(() => String)
  @IsString()
  @IsUrl()
  readonly img: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  readonly distance: number;

  @Field(() => Date)
  @IsDate()
  readonly startDate: Date;

  @Field(() => Date)
  @IsDate()
  readonly finishDate: Date;
}
