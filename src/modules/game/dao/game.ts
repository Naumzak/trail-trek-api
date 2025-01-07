import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
<<<<<<<< HEAD:src/modules/character/dao/race.ts
import { RaceEntity } from '../entities/race.entity';

@Injectable()
export class RaceDao extends Repository<RaceEntity> {
  constructor(
    @InjectRepository(RaceEntity) repository: Repository<RaceEntity>,
========
import { GameEntity } from '../entities/game.entity';

@Injectable()
export class GameDao extends Repository<GameEntity> {
  constructor(
    @InjectRepository(GameEntity) repository: Repository<GameEntity>,
>>>>>>>> b4d8cae (Updated project):src/modules/game/dao/game.ts
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
