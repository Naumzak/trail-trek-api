import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from './entities/game.entity';
import { UserGameEntity } from './entities/user-game.entity';
import { GameDao } from './dao/game';
import { UserGameDao } from './dao/user-game';
import { GameService } from './services/game.service';
import { UserGameService } from './services/user-game.service';
import { GameResolver } from './resolvers/game';
import { UserGameResolver } from './resolvers/user-game';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { GameConnectionService } from './services/game-connection-service';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity, UserGameEntity]), UserModule],
  providers: [
    JwtService,
    GameDao,
    UserGameDao,
    GameService,
    UserGameService,
    GameResolver,
    UserGameResolver,
    GameConnectionService,
  ],
  exports: [],
})
export class GameModule {}
