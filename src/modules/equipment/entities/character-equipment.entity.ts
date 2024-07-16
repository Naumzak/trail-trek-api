import { Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { GameEntity } from '../../game/entities/game.entity';
import { CharacterEntity } from '../../character/entities/character.entity';

// export class CharacterEquipmentEntity {
//   @Column()
//   equipmentId: string;
//
//   @Column()
//   characterId: string;
//
//   @ManyToOne(() => CharacterEntity, (character) => character.characterEquipment)
//   public character: UserEntity;
//
//   @ManyToOne(() => GameEntity, (game) => game.userGames)
//   public equipment: GameEntity;
// }
