import { Field, ObjectType } from '@nestjs/graphql';
import { EquipmentCategory } from '../enum/equipmentCategory';
import { IsEnum } from 'class-validator';

@ObjectType()
export class EquipmentOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => EquipmentCategory)
  @IsEnum(EquipmentCategory, { each: true })
  category: string;

  @Field(() => String)
  description: string;
}
