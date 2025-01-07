import { Injectable } from '@nestjs/common';
import { RaceDao } from '../dao/race';
import { RaceEntity } from '../entities/race.entity';

@Injectable()
export class RaceService {
  constructor(private readonly raceDao: RaceDao) {}

  async getRaces(): Promise<RaceEntity[]> {
    const raceEntities = await this.raceDao.find({ relations: ['subraces'] });
    return raceEntities;
  }

  async getRaceById(id: string): Promise<RaceEntity> {
    const raceEntity = await this.raceDao.findOneBy({ id });
    return raceEntity;
  }
}
