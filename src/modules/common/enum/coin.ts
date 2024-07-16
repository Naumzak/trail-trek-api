import { registerEnumType } from '@nestjs/graphql';

export enum CoinType {
  COPPER = 'CP',
  SILVER = 'SP',
  GOLD = 'GP',
  PLATINUM = 'PP',
}

registerEnumType(CoinType, { name: 'CoinType' });
