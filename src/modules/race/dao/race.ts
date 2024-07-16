import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RaceEntity } from '../entities/race.entity';

@Injectable()
export class RaceDao extends Repository<RaceEntity> {
  constructor(
    @InjectRepository(RaceEntity) repository: Repository<RaceEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
