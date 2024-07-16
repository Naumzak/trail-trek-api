import { Injectable } from '@nestjs/common';
import { GameDao } from '../dao/game';
import { GameEntity } from '../entities/game.entity';
import { UserGameService } from './user-game.service';
import { ICreateGameParams } from '../interfaces/create-game-params';

@Injectable()
export class GameService {
  constructor(
    private readonly gameDao: GameDao,
    private readonly userGameService: UserGameService,
  ) {}

  async createGame({ name, userId }: ICreateGameParams): Promise<GameEntity> {
    const game = this.gameDao.create({
      name,
    });

    await this.gameDao.save(game);

    await this.userGameService.addUserToGame({
      connectionString: game.connectionString,
      userId,
    });

    return game;
  }
}
