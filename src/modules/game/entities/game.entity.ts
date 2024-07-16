import { Entity, Column, OneToMany } from 'typeorm';
import { UserGameEntity } from './user-game.entity';
import { BaseEntity } from '../../common/entity/base.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('game')
export class GameEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({
    type: 'uuid',
    unique: true,
    nullable: false,
    default: () => uuidv4(),
  })
  connectionString: string;

  @OneToMany(() => UserGameEntity, (userGame) => userGame.game)
  public userGames: UserGameEntity[];
}
