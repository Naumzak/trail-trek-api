import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CharacterService } from '../services/character.service';
import { CreateCharacterOutput } from '../outputs /create-character';
import { Auth } from '../../auth/decorators/auth.decorator';
import { CreateCharacterInput } from '../inputs/create-character';
import { GetCharacterInput } from '../inputs/get-character';
import { GetCharacterOutput } from '../outputs /get-character';
import { GetCharactersByGameId } from '../inputs/get-characters-by-game-id';

@Resolver()
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {}

  @Query(() => [CreateCharacterOutput], { name: 'characters' })
  @Auth()
  async getCharacters(@Context() context): Promise<CreateCharacterOutput[]> {
    const userId = context.req.user?.id;
    return this.characterService.getCharacters({ userId });
  }

  @Query(() => [CreateCharacterOutput], { name: 'charactersByGameId' })
  @Auth()
  async getCharactersByGameId(
    @Context() context,
    @Args('input') input: GetCharactersByGameId,
  ): Promise<CreateCharacterOutput[]> {
    const userId = context.req.user?.id;
    const gameId = input.gameId;
    return this.characterService.getCharactersByGameId({ userId, gameId });
  }

  @Mutation(() => CreateCharacterOutput)
  @Auth()
  async createCharacter(
    @Args('input') input: CreateCharacterInput,
    @Context() context,
  ): Promise<CreateCharacterOutput> {
    const userId = context.req.user?.id;
    return this.characterService.createCharacter({ ...input, userId });
  }
  @Query(() => GetCharacterOutput, { name: 'character' })
  @Auth()
  async getCharacter(
    @Args('input') input: GetCharacterInput,
  ): Promise<GetCharacterOutput> {
    return this.characterService.getCharacter(input);
  }
}
