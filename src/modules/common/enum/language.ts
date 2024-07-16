import { registerEnumType } from '@nestjs/graphql';

export enum Language {
  COMMON = 'Common',
  DWARVISH = 'Dwarvish',
  ELVISH = 'Elvish',
  GIANT = 'Giant',
  GNOMISH = 'Gnomish',
  GOBLIN = 'Goblin',
  HALFLING = 'Halfling',
  ORC = 'Orc',
  ABYSSAL = 'Abyssal',
  CELESTIAL = 'Celestial',
  DRACONIC = 'Draconic',
  DEEP_SPEECH = 'Deep Speech',
  INFERNAL = 'Infernal',
  PRIMORDIAL = 'Primordial',
  SYLVAN = 'Sylvan',
  UNDERCOMMON = 'Undercommon',
}

registerEnumType(Language, { name: 'Language' });
