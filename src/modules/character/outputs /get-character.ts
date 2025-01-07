import { Field, ObjectType } from '@nestjs/graphql';
import { EquipmentOutput } from '../../equipment/outputs/equipment';
import { SubraceOutput } from '../outputs/subrace';
import { RaceOutput } from '../outputs/race';
import { CharacterClassOutput } from '../outputs/character-class';

@ObjectType()
export class GetCharacterOutput {
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

  @Field(() => [EquipmentOutput])
  equipments: EquipmentOutput[];
}
