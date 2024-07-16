import { Query, Resolver } from '@nestjs/graphql';
import { RaceService } from '../services/race.service';
import { RaceOutput } from '../outputs/race';

@Resolver()
export class RaceResolver {
  constructor(private readonly raceService: RaceService) {}

  @Query(() => [RaceOutput], { name: 'races' })
  async getRaces(): Promise<RaceOutput[]> {
    return this.raceService.getRaces();
  }
}
