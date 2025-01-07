import { BadRequestException, Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/services/redis.service';
import { IGameUser } from '../interfaces/game-user';

@Injectable()
export class GameConnectionService {
  constructor(private readonly redisService: RedisService) {}

  async connectToGame({ userId, gameId, characterId }) {
    const gameData = await this.redisService.get(gameId);

    if (!gameData) {
      await this.redisService.set(gameId, []);
    }

    const users = gameData ? (JSON.parse(gameData) as IGameUser[]) : [];

    const userAlreadyExist = users.some((user) => user.userId === userId);

    if (userAlreadyExist) {
      const userIndex = users.findIndex((user) => user.userId === userId);

      if (userIndex !== -1) {
        users.splice(userIndex, 1);
      }
    }

    users.push({ userId, characterId });
    await this.redisService.set(gameId, users);

    const otherUsers = users.filter((user) => user.userId !== userId);

    return otherUsers;
  }

  async disconnectFromGame({
    userId,
    gameId,
  }: {
    userId: string;
    gameId: string;
  }) {
    const gameData = await this.redisService.get(gameId);

    if (!gameData) {
      throw new BadRequestException('Wrong game Id');
    }

    const users = JSON.parse(gameData) as IGameUser[];

    const userIndex = users.findIndex((user) => user.userId === userId);

    if (userIndex !== -1) {
      users.splice(userIndex, 1);
    }

    if (users.length === 0) {
      await this.redisService.delete(gameId);
    } else {
      await this.redisService.set(gameId, users);
    }

    return users;
  }

  async getUsersForGame(gameId: string): Promise<IGameUser[]> {
    const gameData = await this.redisService.get(gameId);

    if (!gameData) {
      throw new BadRequestException('Wrong game Id');
    }

    const users = JSON.parse(gameData) as IGameUser[];
    return users;
  }
}
