import { registerEnumType } from '@nestjs/graphql';

export enum EquipmentCategory {
  ADVENTURING_GEAR = 'Adventuring Gear',
  TOOLS = 'Tools',
  MOUNTS_AND_VEHICLES = 'Mounts and Vehicles',
  WEAPON = 'Weapon',
  ARMOR = 'Armor',
}

registerEnumType(EquipmentCategory, { name: 'EquipmentCategory' });
