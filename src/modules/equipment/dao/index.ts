import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipmentEntity } from '../entities/equipment.entity';

@Injectable()
export class EquipmentDao extends Repository<EquipmentEntity> {
  constructor(
    @InjectRepository(EquipmentEntity) repository: Repository<EquipmentEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
