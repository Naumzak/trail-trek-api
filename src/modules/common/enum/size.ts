import { registerEnumType } from '@nestjs/graphql';

export enum Size {
  SMALL = 'small',
  MEDIUM = 'medium',
}

registerEnumType(Size, { name: 'Size' });
