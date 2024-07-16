import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacterEntity } from '../entities/character.entity';

@Injectable()
export class CharacterDao extends Repository<CharacterEntity> {
  constructor(
    @InjectRepository(CharacterEntity) repository: Repository<CharacterEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
