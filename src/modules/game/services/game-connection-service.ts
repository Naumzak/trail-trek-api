import { Injectable } from '@nestjs/common';

@Injectable()
export class GameConnectionService {
  private readonly games = new Map<
    string,
    Array<{ characterId: string; userId: string }>
  >();

  async connectToGame({ userId, gameId, characterId }) {
    if (!this.games.has(gameId)) {
      this.games.set(gameId, []);
    }

    const game = this.games.get(gameId);

    if (game.some((user) => user.userId === userId)) {
      return { userId, gameId };
    }

    this.games.get(gameId).push({ userId, characterId });

    return { userId, gameId };
  }

  async disconnectFromGame({
    userId,
    gameId,
  }: {
    userId: string;
    gameId: string;
  }) {
    if (!this.games.has(gameId)) {
      return;
    }

    const game = this.games.get(gameId);
    const userIndex = game.findIndex((user) => user.userId === userId);

    if (userIndex !== -1) {
      game.splice(userIndex, 1);
    }

    if (game.length === 0) {
      this.games.delete(gameId);
    }
  }

  async getUsersForGame(
    gameId: string,
  ): Promise<{ characterId: string; userId: string }[]> {
    return Array.from(this.games.get(gameId) || []);
  }
}
