import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from '../entities/game.entity';

@Injectable()
export class GameDao extends Repository<GameEntity> {
  constructor(
    @InjectRepository(GameEntity) repository: Repository<GameEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
