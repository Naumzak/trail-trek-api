import { Column } from 'typeorm';
import { CoinType } from '../../common/enum/coin';

export class Cost {
  @Column()
  quantity: number;

  @Column({
    type: 'enum',
    enum: CoinType,
  })
  unit: CoinType;
}
