import { Field, ObjectType } from '@nestjs/graphql';
import { CharacterClassOutput } from '../outputs/character-class';
import { RaceOutput } from '../outputs/race';
import { SubraceOutput } from '../outputs/subrace';

@ObjectType()
export class CreateCharacterOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  userId: string;

  @Field(() => CharacterClassOutput)
  class: CharacterClassOutput;

  @Field(() => RaceOutput)
  race: RaceOutput;

  @Field(() => SubraceOutput)
  subrace: SubraceOutput;
}
