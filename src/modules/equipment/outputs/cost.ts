import { Field, ObjectType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { CoinType } from '../../common/enum/coin';

@ObjectType()
export class CostOutput {
  @Field(() => Number)
  quantity: number;

  @Field(() => CoinType)
  @IsEnum(CoinType, { each: true })
  unit: string;
}
