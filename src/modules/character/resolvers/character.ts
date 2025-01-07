import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CharacterService } from '../services/character.service';
import { CreateCharacterOutput } from '../outputs /create-character';
import { Auth } from '../../auth/decorators/auth.decorator';
import { CreateCharacterInput } from '../inputs/create-character';

@Resolver()
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {}

  @Query(() => [CreateCharacterOutput], { name: 'characters' })
  @Auth()
  async getCharacters(@Context() context): Promise<CreateCharacterOutput[]> {
    const userId = context.req.user?.id;
    return this.characterService.getCharacters({ userId });
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
}
