import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserGameEntity } from '../entities/user-game.entity';

@Injectable()
export class UserGameDao extends Repository<UserGameEntity> {
  constructor(
    @InjectRepository(UserGameEntity) repository: Repository<UserGameEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
