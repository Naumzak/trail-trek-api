import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TripEntity } from '../../trip/entities/trip.entity';
export class DatabaseConfigService {
  get(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: '127.0.0.1',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'trail-trek',

      entities: [TripEntity],

      migrationsTableName: 'migration',

      migrations: ['src/migration/*.ts'],

      autoLoadEntities: true,
      synchronize: true,
    };
  }
}

const databaseConfigService = new DatabaseConfigService();

export { databaseConfigService };
