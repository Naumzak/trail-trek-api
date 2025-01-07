import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GameService } from '../services/game.service';
import { GameOutput } from '../outputs/game';
import { Auth } from '../../auth/decorators/auth.decorator';
import { CreateGameInput } from '../inputs/create-game';

@Resolver()
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @Mutation(() => GameOutput)
  @Auth()
  async createGame(
    @Args('input') input: CreateGameInput,
    @Context() context,
  ): Promise<GameOutput> {
    const userId = context.req.user?.id;
    return this.gameService.createGame({ ...input, userId });
  }
}
