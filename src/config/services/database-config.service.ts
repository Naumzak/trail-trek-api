import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../../modules/user/entities/user.entity';
import { GameEntity } from '../../modules/game/entities/game.entity';
import { UserGameEntity } from '../../modules/game/entities/user-game.entity';
import { CharacterEntity } from '../../modules/character/entities/character.entity';
import { EquipmentEntity } from '../../modules/equipment/entities/equipment.entity';
import { ClassEntity } from '../../modules/character/entities/class.entity';
import { RaceEntity } from '../../modules/character/entities/race.entity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { SubraceEntity } from '../../modules/character/entities/subrace.entity';
import { EnvKeys } from '../enum/envKeys';
import { ConfigService } from '@nestjs/config';
export class DatabaseConfigService {
  get(): TypeOrmModuleOptions & { entities: EntityClassOrSchema[] } {
    const configService = new ConfigService();
    return {
      type: 'postgres',

      host: configService.get(EnvKeys.POSTGRES_HOST),
      port: +configService.get(EnvKeys.POSTGRES_PORT),
      username: configService.get(EnvKeys.POSTGRES_USERNAME),
      password: configService.get(EnvKeys.POSTGRES_PASSWORD),
      database: configService.get(EnvKeys.POSTGRES_DATABASE),

      entities: [
        UserEntity,
        GameEntity,
        UserGameEntity,
        CharacterEntity,
        ClassEntity,
        RaceEntity,
        EquipmentEntity,
        SubraceEntity,
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
