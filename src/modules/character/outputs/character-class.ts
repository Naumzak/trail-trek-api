import { Field, ObjectType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { Dice } from '../../common/enum/dice';

@ObjectType()
export class CharacterClassOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  image: string;

  @Field(() => String)
  name: string;

  @Field(() => Dice)
  @IsEnum(Dice, { each: true })
  hitDice: Dice;
}
