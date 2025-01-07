import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from '../entities/class.entity';

@Injectable()
export class CharacterClassDao extends Repository<ClassEntity> {
  constructor(
    @InjectRepository(ClassEntity) repository: Repository<ClassEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
