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

import { AuthModule } from './modules/auth/auth.module';

import { EquipmentModule } from './modules/equipment/equipment.module';
import { JwtService } from '@nestjs/jwt';
import { RedisModule } from './modules/redis/redis.module';
import { ConfigModule } from '@nestjs/config';

const env =
  {
    test: 'test.env',
  }[process.env.NODE_ENV] || '.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: env,
    }),
    TypeOrmModule.forRoot(databaseConfigService.get()),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      subscriptions: {
        'graphql-ws': {
          onConnect: (context: any) => {
            const { connectionParams, extra } = context;
            extra.token = { token: connectionParams?.authToken };
          },
        },
        // 'subscriptions-transport-ws': true,
      },
    }),
    RedisModule,
    UserModule,
    GameModule,
    CharacterModule,
    AuthModule,
    EquipmentModule,
  ],
  controllers: [AppController],
  providers: [JwtService],
})
export class AppModule {}
