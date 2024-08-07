import { Entity, Column, OneToMany, Generated } from 'typeorm';
import { UserGameEntity } from './user-game.entity';
import { BaseEntity } from '../../common/entity/base.entity';

@Entity('game')
export class GameEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({
    type: 'uuid',
    unique: true,
    nullable: false,
  })
  @Generated('uuid')
  connectionString: string;

  @OneToMany(() => UserGameEntity, (userGame) => userGame.game)
  public userGames: UserGameEntity[];
}
