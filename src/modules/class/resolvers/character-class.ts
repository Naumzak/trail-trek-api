import { Query, Resolver } from '@nestjs/graphql';
import { CharacterClassOutput } from '../outputs/character-class';
import { CharacterClassService } from '../services/character-class.service';

@Resolver()
export class RaceResolver {
  constructor(private readonly characterClassService: CharacterClassService) {}

  @Query(() => [CharacterClassOutput], { name: 'classes' })
  async getClasses(): Promise<CharacterClassOutput[]> {
    return this.characterClassService.getClasses();
  }
}
