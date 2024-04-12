import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsDate } from 'class-validator';

@ObjectType()
export class TripOutput {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => String)
  location: string;

  @Field(() => String, { nullable: true })
  img: string;

  @Field(() => Int)
  distance: number;

  @Field(() => Date)
  @IsDate()
  startDate: Date;

  @Field(() => Date)
  @IsDate()
  finishDate: Date;
}
