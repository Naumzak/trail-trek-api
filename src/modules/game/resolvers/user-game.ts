import {
  Args,
  Context,
  Mutation,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { UserGameService } from '../services/user-game.service';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AddUserToGameInput } from '../inputs/add-user-to-game';
import { UserGameOutput } from '../outputs/user-game';
import { ConnectToGameOutput } from '../outputs/connectToGame';
import { ConnectToGameInput } from '../inputs/connect-to-game';
import { DisconnectFromGameOutput } from '../outputs/disconnectFromGame';
import { PubSub } from 'graphql-subscriptions';
import { GameConnectionService } from '../services/game-connection-service';
import { withCancel } from '../../utils/withCancel';
import { UserConnectedToGame } from '../inputs/user-connected-to-game';
import { UserDisconnectedFromGame } from '../inputs/user-disconnected-from-game';

const pubSub = new PubSub();

@Resolver()
export class UserGameResolver {
  constructor(
    private readonly userGameService: UserGameService,
    private readonly gameConnectionService: GameConnectionService,
  ) {}

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

  @Mutation(() => [ConnectToGameOutput])
  @Auth()
  async connectToGame(
    @Args('input') input: ConnectToGameInput,
    @Context() context,
  ): Promise<ConnectToGameOutput[]> {
    const userId = context.req.user?.id;
    const { gameId, characterId } = input;

    const users = await this.gameConnectionService.connectToGame({
      gameId,
      userId,
      characterId,
    });

    await pubSub.publish('userConnected', {
      userConnected: { userId, gameId, characterId },
    });

    return users;
  }

  @Subscription(() => ConnectToGameOutput, {
    filter: (payload, variables) => {
      return payload.userConnected.gameId === variables.input.gameId;
    },
  })
  userConnected(@Args('input') input: UserConnectedToGame) {
    const { gameId, userId } = input;
    return withCancel(pubSub.asyncIterator('userConnected'), () =>
      pubSub.publish('userDisconnected', {
        userDisconnected: { userId, gameId },
      }),
    );
  }

  @Subscription(() => DisconnectFromGameOutput, {
    filter: (payload, variables) => {
      return payload.userDisconnected.gameId === variables.input.gameId;
    },
  })
  userDisconnected(@Args('input') input: UserDisconnectedFromGame) {
    return pubSub.asyncIterator('userDisconnected');
  }
}
