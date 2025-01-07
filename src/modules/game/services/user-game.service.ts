import { ConflictException, Injectable } from '@nestjs/common';
import { GameDao } from '../dao/game';
import { UserGameDao } from '../dao/user-game';
import { UserGameEntity } from '../entities/user-game.entity';
import { IAddUserToGameParams } from '../interfaces/add-user-to-game-params';

@Injectable()
export class UserGameService {
  constructor(
    private readonly userGameDao: UserGameDao,
    private readonly gameDao: GameDao,
  ) {}

  async addUserToGame({
    userId,
    connectionString,
  }: IAddUserToGameParams): Promise<UserGameEntity | null> {
    const game = await this.gameDao.findOne({
      relations: ['userGames'],
      where: { connectionString },
    });

    const userAlreadyExist = game.userGames?.some(
      (userGame) => userGame.userId === userId,
    );

    if (userAlreadyExist) {
      throw new ConflictException('User is already in this game');
    }

    const createdUserGame = await this.userGameDao.save({
      userId,
      gameId: game.id,
    });

    return await this.userGameDao.findOne({
      where: { id: createdUserGame.id },
      relations: ['user', 'game'],
    });
  }
}
