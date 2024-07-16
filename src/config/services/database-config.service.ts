import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../../modules/user/entities/user.entity';
import { GameEntity } from '../../modules/game/entities/game.entity';
import { UserGameEntity } from '../../modules/game/entities/user-game.entity';
import { CharacterEntity } from '../../modules/character/entities/character.entity';
import { ClassEntity } from '../../modules/class/entities/class.entity';
import { RaceEntity } from '../../modules/race/entities/race.entity';
import { EquipmentEntity } from '../../modules/equipment/entities/equipment.entity';
export class DatabaseConfigService {
  get(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: '127.0.0.1',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'trail-trek',

      entities: [
        UserEntity,
        GameEntity,
        UserGameEntity,
        CharacterEntity,
        ClassEntity,
        RaceEntity,
        EquipmentEntity,
      ],

      migrationsTableName: 'migration',

      migrations: ['src/migration/*.ts'],

      autoLoadEntities: true,
      synchronize: true,
    };
  }
}

const databaseConfigService = new DatabaseConfigService();

export { databaseConfigService };
