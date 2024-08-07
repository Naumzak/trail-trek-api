import { Field, ObjectType } from '@nestjs/graphql';
import { CharacterClassOutput } from '../../class/outputs/character-class';
import { RaceOutput } from '../../race/outputs/race';
import { SubraceOutput } from '../../subrace/outputs/subrace';
import { EquipmentOutput } from '../../equipment/outputs/equipment';

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
