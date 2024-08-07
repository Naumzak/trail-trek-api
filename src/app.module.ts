import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigService } from './config/services/database-config.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { GameModule } from './modules/game/game.module';
import { CharacterModule } from './modules/character/character.module';
import { ClassModule } from './modules/class/class.module';
import { RaceModule } from './modules/race/race.module';
import { AuthModule } from './modules/auth/auth.module';
import { SubraceModule } from './modules/subrace/subrace.module';
import { EquipmentModule } from './modules/equipment/equipment.module';
import { JwtService } from '@nestjs/jwt';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfigService.get()),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
      installSubscriptionHandlers: true,
    }),
    RedisModule,
    UserModule,
    GameModule,
    CharacterModule,
    ClassModule,
    RaceModule,
    AuthModule,
    SubraceModule,
    EquipmentModule,
  ],
  controllers: [AppController],
  providers: [JwtService],
})
export class AppModule {}
