import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserGameService } from '../services/user-game.service';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AddUserToGameInput } from '../inputs/add-user-to-game';
import { UserGameOutput } from '../outputs/user-game';

@Resolver()
export class UserGameResolver {
  constructor(private readonly userGameService: UserGameService) {}

  @Mutation(() => UserGameOutput)
  @Auth()
  async addUserToGame(
    @Args('input') input: AddUserToGameInput,
    @Context() context,
  ): Promise<UserGameOutput> {
    const userId = context.req.user?.id;
    return this.userGameService.addUserToGame({
      userId,
      connectionString: input.connectionString,
    });
  }
}
