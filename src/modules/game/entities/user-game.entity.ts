import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { GameEntity } from './game.entity';
import { BaseEntity } from '../../common/entity/base.entity';

@Entity('user_game')
export class UserGameEntity extends BaseEntity {
  @Column()
  userId: string;

  @Column()
  gameId: string;

  @ManyToOne(() => UserEntity, (user) => user.userGames)
  public user: UserEntity;

  @ManyToOne(() => GameEntity, (game) => game.userGames)
  public game: GameEntity;
}
