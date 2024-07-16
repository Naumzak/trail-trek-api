import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubraceEntity } from '../entities/subrace.entity';

@Injectable()
export class SubraceDao extends Repository<SubraceEntity> {
  constructor(
    @InjectRepository(SubraceEntity) repository: Repository<SubraceEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
