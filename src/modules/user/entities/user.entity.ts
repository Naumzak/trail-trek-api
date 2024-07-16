import { Column, Entity, OneToMany } from 'typeorm';
import { UserGameEntity } from '../../game/entities/user-game.entity';
import { CharacterEntity } from '../../character/entities/character.entity';
import { BaseEntity } from '../../common/entity/base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => UserGameEntity, (userGame) => userGame.user, {
    cascade: true,
  })
  public userGames: UserGameEntity[];

  @OneToMany(() => CharacterEntity, (character) => character.user, {
    cascade: true,
  })
  public userCharacters: CharacterEntity[];
}
