import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateTripInput {
  @Field(() => String)
  @IsUUID()
  readonly id: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @MaxLength(100)
  @MinLength(5)
  @IsOptional()
  readonly name?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  @IsOptional()
  readonly location?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsUrl()
  @IsOptional()
  readonly img?: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  readonly distance?: number;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  readonly startDate?: Date;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  readonly finishDate?: Date;
}
