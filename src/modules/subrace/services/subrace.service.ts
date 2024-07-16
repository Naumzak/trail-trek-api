import { Injectable } from '@nestjs/common';
import { SubraceDao } from '../dao/subrace';
import { SubraceEntity } from '../entities/subrace.entity';

@Injectable()
export class SubraceService {
  constructor(private readonly subraceDao: SubraceDao) {}

  async getSubraceById(id: string): Promise<SubraceEntity> {
    const subrace = await this.subraceDao.findOneBy({ id });

    return subrace;
  }
}
